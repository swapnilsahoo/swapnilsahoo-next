import { spawn } from "node:child_process";

// A foreground, workstation-only production preview; no deployment or DNS changes.
const unconfigured = process.argv.includes("--unconfigured");
const port = unconfigured ? 3112 : 3111;
const env = {
  ...process.env,
  LAB_BASE_URL: `http://localhost:${port}`,
  LAB_LOCAL_MODE: unconfigured ? "false" : "true",
};
if (unconfigured) {
  env.LAB_DATABASE_URL = "";
  env.LAB_DATABASE_AUTH_TOKEN = "";
  env.LAB_AUTH_SECRET = "";
} else env.LAB_DATABASE_URL = "file:.data/learning-lab.db";
if (env.VERCEL) throw new Error("This helper is restricted to a local workstation.");
const child = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "--hostname", "localhost", "--port", String(port)],
  { env, stdio: "inherit", windowsHide: true }
);
child.on("exit", (code) => {
  process.exitCode = code || 0;
});
child.on("error", () => {
  console.error("Local production preview could not start.");
  process.exitCode = 1;
});
process.on("SIGINT", () => child.kill("SIGINT"));
process.on("SIGTERM", () => child.kill("SIGTERM"));
