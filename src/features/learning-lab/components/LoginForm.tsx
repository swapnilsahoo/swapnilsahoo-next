"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { workspaceButton, workspaceField, WorkspaceStatus } from "./WorkspaceControls";
import { useLabHydrated } from "./useLabHydrated";

export function LoginForm({ available = true }: { available?: boolean }) {
  const hydrated = useLabHydrated();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/learning-lab/auth/sign-in/email", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(form.get("email")).trim(),
          password: String(form.get("password")),
          rememberMe: false,
        }),
      });
      if (!response.ok) {
        if (response.status === 429)
          throw new Error("Too many sign-in attempts. Please wait a few minutes and try again.");
        if (response.status >= 500)
          throw new Error(
            "Sign in is awaiting secure service configuration or is temporarily unavailable. No account has been created."
          );
        throw new Error(
          "Sign in did not succeed. Check the email and password supplied by the operator."
        );
      }
      const records = await fetch("/api/learning-lab/learner", {
        credentials: "same-origin",
        cache: "no-store",
      });
      let next = "/learning-lab/learner";
      if (records.ok) {
        const payload = (await records.json()) as { actor?: { role?: string } };
        if (payload.actor?.role === "admin") next = "/learning-lab/admin";
      }
      router.replace(next);
      router.refresh();
    } catch (failure) {
      setError(
        failure instanceof Error ? failure.message : "Sign in could not be completed. Try again."
      );
    } finally {
      setBusy(false);
    }
  }
  if (!available)
    return (
      <aside className="lab-callout">
        <h2>Workspace opening soon</h2>
        <p>
          Private access will open after secure service setup and participant provisioning. The
          public demonstration lessons are available now. No account has been created.
        </p>
        <Link href="/learning-lab/programmes" className="lab-text-link">
          Explore the demonstration lessons →
        </Link>
      </aside>
    );
  return (
    <form
      method="post"
      onSubmit={submit}
      className="lab-form max-w-xl space-y-5"
      aria-describedby="lab-login-help"
    >
      <p id="lab-login-help" className="lab-muted">
        Accounts are provisioned by the operator for an agreed pilot. Registering interest does not
        create an account. Password reset by email is not enabled; contact the operator privately if
        access is lost.
      </p>
      <div>
        <label htmlFor="lab-login-email" className="mb-2 block text-sm font-medium">
          Email
        </label>
        <input
          id="lab-login-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          maxLength={254}
          className={workspaceField}
        />
      </div>
      <div>
        <label htmlFor="lab-login-password" className="mb-2 block text-sm font-medium">
          Password
        </label>
        <input
          id="lab-login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          maxLength={128}
          className={workspaceField}
        />
      </div>
      <WorkspaceStatus message={error} error={Boolean(error)} />
      <button className={workspaceButton} disabled={busy || !hydrated}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
      <noscript>Enable JavaScript to sign in securely. No password has been sent.</noscript>
    </form>
  );
}
