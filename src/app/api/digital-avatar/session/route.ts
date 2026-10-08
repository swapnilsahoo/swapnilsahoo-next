import {
  AvatarHttpError,
  createAvatarSession,
  endAvatarSession,
} from "@/features/digital-avatar/server";

export const runtime = "nodejs";

function reply(body: unknown, status: number, cookie?: string) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, private",
      Vary: "Cookie, Origin",
      "Referrer-Policy": "no-referrer",
      ...(cookie ? { "Set-Cookie": cookie } : {}),
    },
  });
}

function failure(error: unknown) {
  return error instanceof AvatarHttpError
    ? reply({ error: error.message }, error.status)
    : reply(
        { error: "The video guide is temporarily unavailable. Please use the website guide." },
        503
      );
}

export async function POST(request: Request) {
  try {
    const result = await createAvatarSession(request);
    return reply(result.session, 201, result.cookie);
  } catch (error) {
    return failure(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const result = await endAvatarSession(request);
    return reply({ ended: true }, 200, result.cookie);
  } catch (error) {
    return failure(error);
  }
}
