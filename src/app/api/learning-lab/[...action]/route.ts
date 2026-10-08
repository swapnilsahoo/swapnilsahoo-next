import { z } from "zod";
import { getLabAuth, LabHttpError, requireActor } from "@/features/learning-lab/server/auth";
import { getDatabase, LabUnavailable } from "@/features/learning-lab/server/database";
import {
  adminMutation,
  adminRecords,
  audit,
  completeLesson,
  csv,
  learnerRecords,
  parse,
  saveEnquiry,
  setCertificatePrivacy,
  submitAssignment,
  verifyCertificate,
} from "@/features/learning-lab/server/service";
export const runtime = "nodejs";
const response = (data: unknown, status = 200) =>
  Response.json(data, { status, headers: { "Cache-Control": "no-store", Vary: "Cookie" } });
function originCheck(request: Request) {
  const expected = new URL(process.env.LAB_BASE_URL || request.url).origin;
  if (request.headers.get("origin") !== expected)
    throw new LabHttpError(403, "This request must come from the Lab website.");
}
async function body(request: Request) {
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    throw new LabHttpError(415, "Send a JSON request.");
  if (Number(request.headers.get("content-length")) > 80000)
    throw new LabHttpError(413, "Submission is too large.");
  const reader = request.body?.getReader();
  if (!reader) throw new LabHttpError(400, "The request could not be read.");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 80000) {
        await reader.cancel();
        throw new LabHttpError(413, "Submission is too large.");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch {
    throw new LabHttpError(400, "The request could not be read.");
  }
}
async function handle(request: Request, context: { params: Promise<{ action: string[] }> }) {
  try {
    const { action } = await context.params,
      path = action.join("/");
    if (path === "checkout" || path === "payments/webhook")
      return response(
        {
          ok: false,
          error:
            "Payments are disabled pending operator, merchant, programme, policy and tax approval.",
        },
        409
      );
    if (request.method === "GET") {
      if (action[0] === "verify" && action.length === 2) {
        const record = await verifyCertificate(action[1]);
        return record
          ? response({ ok: true, certificate: record })
          : response({ ok: false, error: "Certificate not found." }, 404);
      }
      const actor = await requireActor(
        request.headers,
        path.startsWith("admin") ? "admin" : undefined
      );
      if (path === "learner")
        return response({ ok: true, actor, programmes: await learnerRecords(actor) });
      if (path === "admin") return response({ ok: true, actor, data: await adminRecords() });
      if (path === "admin/export") {
        const kind = new URL(request.url).searchParams.get("kind") || "leads",
          records = await adminRecords();
        const fields =
          kind === "submissions"
            ? ["id", "name", "email", "programme_slug", "score", "approved", "submitted_at"]
            : kind === "enrolments"
              ? ["id", "name", "email", "programme_slug", "attendance_percent", "status"]
              : [
                  "id",
                  "kind",
                  "name",
                  "email",
                  "programme_slug",
                  "organisation",
                  "marketing_consent",
                  "status",
                  "created_at",
                ];
        const rows =
          kind === "submissions"
            ? records.submissions
            : kind === "enrolments"
              ? records.enrolments
              : records.leads;
        await audit(actor, "data.export", kind);
        return new Response(
          csv(
            rows.filter((x) => !x.is_demo),
            fields
          ),
          {
            headers: {
              "Content-Type": "text/csv; charset=utf-8",
              "Content-Disposition": `attachment; filename="learning-lab-${["leads", "submissions", "enrolments"].includes(kind) ? kind : "leads"}.csv"`,
              "Cache-Control": "no-store",
            },
          }
        );
      }
      throw new LabHttpError(404, "Unknown request.");
    }
    originCheck(request);
    const data = await body(request);
    if (path === "enquiries") {
      // Trust platform proxy headers only when running on that platform.
      const ip = process.env.VERCEL
        ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0] || "unknown"
        : "local";
      return response(await saveEnquiry(data, ip));
    }
    const actor = await requireActor(
      request.headers,
      path.startsWith("admin/") ? "admin" : undefined,
      path === "change-password"
    );
    if (path === "change-password") {
      const v = parse(
        z.object({
          currentPassword: z.string().min(1).max(128),
          newPassword: z.string().min(12).max(128),
        }),
        data
      );
      const authResponse = await (
        await getLabAuth()
      ).api.changePassword({
        body: { ...v, revokeOtherSessions: true },
        headers: request.headers,
        asResponse: true,
      });
      if (!authResponse.ok)
        throw new LabHttpError(
          400,
          "The password could not be changed. Check your current password and try again."
        );
      await (
        await getDatabase()
      ).execute({
        sql: "UPDATE lab_member SET must_change_password=0 WHERE user_id=?",
        args: [actor.id],
      });
      const updated = response({
        ok: true,
        message: "Password changed. Other sessions have been revoked.",
      });
      for (const cookie of authResponse.headers.getSetCookie())
        updated.headers.append("Set-Cookie", cookie);
      return updated;
    }
    if (path === "progress") return response(await completeLesson(actor, data));
    if (path === "submissions") return response(await submitAssignment(actor, data));
    if (path === "certificate-privacy") return response(await setCertificatePrivacy(actor, data));
    if (path.startsWith("admin/")) return response(await adminMutation(actor, action[1], data));
    throw new LabHttpError(404, "Unknown request.");
  } catch (error) {
    if (error instanceof LabHttpError)
      return response({ ok: false, error: error.message, fields: error.fields }, error.status);
    if (error instanceof LabUnavailable)
      return response(
        {
          ok: false,
          error:
            "The Lab service is awaiting persistent storage and secure configuration. Nothing has been submitted.",
        },
        503
      );
    if (error instanceof Error && error.message.includes("UNIQUE constraint"))
      return response(
        { ok: false, error: "This record already exists. Refresh the page before trying again." },
        409
      );
    // Log no learner text, emails, credentials or provider errors.
    console.error("Learning Lab request failed.");
    return response(
      { ok: false, error: "The service could not save this request. Please try again later." },
      503
    );
  }
}
export const GET = handle;
export const POST = handle;
