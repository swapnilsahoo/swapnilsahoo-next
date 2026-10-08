"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { LabActor } from "../server/auth";
import { useLabHydrated } from "./useLabHydrated";

export const workspaceField =
  "lab-field w-full min-w-0 rounded-xl border border-ink-300 bg-white px-4 py-3 text-sm text-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 dark:border-ink-600 dark:bg-ink-950 dark:text-ink-100";
export const workspaceButton =
  "lab-button min-h-11 cursor-pointer rounded-full disabled:cursor-not-allowed disabled:opacity-50";
export type LabResponse = {
  ok: boolean;
  error?: string;
  message?: string;
  fields?: Record<string, string>;
};

export async function readLabResponse<T extends LabResponse>(response: Response): Promise<T> {
  let payload: T;
  try {
    payload = (await response.json()) as T;
  } catch {
    throw new Error(
      "The service returned an unreadable response. Nothing has been confirmed saved."
    );
  }
  if (!response.ok || !payload.ok) {
    const details = payload.fields
      ? Object.entries(payload.fields)
          .map(([field, message]) => `${field}: ${message}`)
          .join(" ")
      : "";
    throw new Error(
      `${payload.error || "The request could not be completed."}${details ? ` ${details}` : ""}`
    );
  }
  return payload;
}

export async function postLab<T extends LabResponse = LabResponse>(
  path: string,
  body: unknown
): Promise<T> {
  const response = await fetch(`/api/learning-lab/${path}`, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return readLabResponse<T>(response);
}

export function useLabQuery<T extends LabResponse>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [revision, setRevision] = useState(0);
  const reload = useCallback(() => {
    setLoading(true);
    setRevision((value) => value + 1);
  }, []);
  useEffect(() => {
    let active = true;
    fetch(`/api/learning-lab/${path}`, { credentials: "same-origin", cache: "no-store" })
      .then(readLabResponse<T>)
      .then((result) => {
        if (active) {
          setData(result);
          setError("");
        }
      })
      .catch(() => {
        if (active)
          setError(
            "This workspace could not load. Check that you are signed in and try again. Unsaved work has not been submitted."
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [path, revision]);
  return { data, error, loading, reload };
}

export function WorkspaceStatus({ message, error = false }: { message: string; error?: boolean }) {
  return (
    <p
      className={`lab-status min-h-6 text-sm leading-relaxed ${error ? "text-red-800 dark:text-red-300" : "text-ink-600 dark:text-ink-300"}`}
      role={error ? "alert" : "status"}
    >
      {message}
    </p>
  );
}

export function WorkspaceActions({ actor }: { actor: LabActor }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function signOut() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/learning-lab/auth/sign-out", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });
      if (!response.ok)
        throw new Error("Sign out failed. Try again before leaving a shared device.");
      router.replace("/learning-lab/login");
      router.refresh();
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Sign out failed.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm">
          Signed in as {actor.name}
          {actor.isDemo ? " · synthetic demo account" : ""}
        </span>
        {actor.role === "admin" && (
          <a href="/learning-lab/admin" className="lab-text-link">
            Administration
          </a>
        )}
        <a href="/learning-lab/learner" className="lab-text-link">
          Learner workspace
        </a>
        <button
          type="button"
          className={`${workspaceButton} lab-button-secondary`}
          disabled={busy}
          onClick={signOut}
        >
          {busy ? "Signing out…" : "Sign out"}
        </button>
      </div>
      {error && <WorkspaceStatus message={error} error />}
    </div>
  );
}

export function ChangePassword({ actor }: { actor: LabActor }) {
  const hydrated = useLabHydrated();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (form.get("newPassword") !== form.get("confirmPassword")) {
      setError("The new passwords do not match.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await postLab("change-password", {
        currentPassword: String(form.get("currentPassword")),
        newPassword: String(form.get("newPassword")),
      });
      router.refresh();
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "The password could not be changed.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="max-w-xl space-y-6">
      <WorkspaceActions actor={actor} />
      <div className="lab-callout">
        <h2>Replace your temporary password</h2>
        <p>
          Change the password provided by the operator before accessing programme records. Use a
          unique password of at least 12 characters.
        </p>
      </div>
      <form method="post" onSubmit={submit} className="space-y-5">
        <div>
          <label htmlFor="lab-current-password" className="mb-2 block text-sm font-medium">
            Current temporary password
          </label>
          <input
            id="lab-current-password"
            name="currentPassword"
            type="password"
            autoComplete="current-password"
            required
            maxLength={128}
            className={workspaceField}
          />
        </div>
        <div>
          <label htmlFor="lab-new-password" className="mb-2 block text-sm font-medium">
            New password
          </label>
          <input
            id="lab-new-password"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={12}
            maxLength={128}
            className={workspaceField}
          />
        </div>
        <div>
          <label htmlFor="lab-confirm-password" className="mb-2 block text-sm font-medium">
            Confirm new password
          </label>
          <input
            id="lab-confirm-password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={12}
            maxLength={128}
            className={workspaceField}
          />
        </div>
        <WorkspaceStatus message={error} error={Boolean(error)} />
        <button className={workspaceButton} disabled={busy || !hydrated}>
          {busy ? "Changing password…" : "Change password"}
        </button>
      </form>
    </div>
  );
}
