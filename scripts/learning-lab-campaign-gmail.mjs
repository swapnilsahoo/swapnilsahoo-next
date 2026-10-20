import { spawn, spawnSync } from "node:child_process";
import { createInterface } from "node:readline";

// Documented Codex app-server JSONL protocol. No turns, model requests, tokens,
// raw connector endpoints, permission changes or credential extraction.
// https://learn.chatgpt.com/docs/app-server
export class CampaignGmail {
  constructor({ executable, cwd, deadline = Date.now() + 120000 }) {
    this.deadline = deadline;
    this.pending = new Map();
    this.nextId = 1;
    this.tools = new Map();
    this.catalogue = [];
    this.child = spawn(executable, ["app-server", "--stdio"], {
      cwd,
      windowsHide: true,
      stdio: ["pipe", "pipe", "ignore"],
    });
    this.child.stdin.on("error", () => {});
    this.child.on("error", () => this.fail("codex-startup-failed"));
    this.child.on("close", () => this.fail("codex-transport-closed"));
    this.lines = createInterface({ input: this.child.stdout });
    this.lines.on("line", (line) => {
      let message;
      try {
        message = JSON.parse(line);
      } catch {
        return;
      }
      if (message.method && message.id !== undefined) {
        // Interactive authorization and other server requests are never accepted.
        this.child.stdin.write(
          JSON.stringify({
            id: message.id,
            error: {
              code: -32601,
              message: "Interactive authorization is unavailable in this bounded owner task.",
            },
          }) + "\n"
        );
        this.fail("interactive-authorization-required");
        return;
      }
      const pending = this.pending.get(message.id);
      if (!pending) return;
      this.pending.delete(message.id);
      clearTimeout(pending.timer);
      if (message.error) pending.reject(new Error("documented-codex-request-refused"));
      else pending.resolve(message.result);
    });
  }
  fail(code) {
    for (const entry of this.pending.values()) {
      clearTimeout(entry.timer);
      entry.reject(new Error(code));
    }
    this.pending.clear();
  }
  async rpc(method, params) {
    if (Date.now() >= this.deadline) throw new Error("campaign-runtime-deadline");
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(
        () => {
          this.pending.delete(id);
          reject(new Error("codex-request-timeout"));
        },
        Math.min(90000, Math.max(1, this.deadline - Date.now()))
      );
      this.pending.set(id, { resolve, reject, timer });
      this.child.stdin.write(JSON.stringify({ id, method, params }) + "\n");
    });
  }
  async connect(cwd) {
    await this.rpc("initialize", {
      clientInfo: {
        name: "learning_lab_campaign",
        title: "Learning Lab bounded owner campaign",
        version: "1.0.0",
      },
    });
    this.child.stdin.write(JSON.stringify({ method: "initialized", params: {} }) + "\n");
    const started = await this.rpc("thread/start", {
      cwd,
      approvalPolicy: "never",
      sandbox: "read-only",
      ephemeral: true,
    });
    this.threadId = started?.thread?.id;
    if (typeof this.threadId !== "string") throw new Error("codex-thread-unavailable");
    const installed = await this.rpc("app/installed", {
      threadId: this.threadId,
      forceRefresh: true,
    });
    this.gmailApp = installed?.apps?.find((app) => /gmail/i.test(app.runtimeName || ""));
    let cursor = null;
    for (let page = 0; page < 5; page++) {
      const inventory = await this.rpc("mcpServerStatus/list", {
        threadId: this.threadId,
        detail: "toolsAndAuthOnly",
        limit: 100,
        cursor,
      });
      for (const server of inventory?.data || []) {
        this.catalogue.push({
          server: server.name,
          tools: Object.values(server.tools || {})
            .map((tool) => tool.name)
            .filter((name) => /gmail|profile/i.test(name || "")),
        });
        for (const tool of Object.values(server.tools || {})) {
          for (const action of [
            "get_profile",
            "search_emails",
            "read_email",
            "read_email_thread",
            "send_email",
          ]) {
            if (new RegExp(`^gmail[.]${action}$`, "i").test(tool.name || "")) {
              if (this.tools.has(action)) throw new Error("gmail-tool-not-unique");
              this.tools.set(action, {
                server: server.name,
                name: tool.name,
                schema: tool.inputSchema,
              });
            }
          }
        }
      }
      cursor = inventory?.nextCursor;
      if (!cursor) break;
    }
    if (!this.tools.has("get_profile")) throw new Error("gmail-tool-unavailable");
    return this;
  }
  async call(action, args) {
    const tool = this.tools.get(action);
    if (!tool) throw new Error("gmail-tool-unavailable");
    const result = await this.rpc("mcpServer/tool/call", {
      threadId: this.threadId,
      server: tool.server,
      tool: tool.name,
      arguments: args,
    });
    if (result?.isError) throw new Error("gmail-tool-refused");
    return result;
  }
  async close() {
    this.fail("codex-client-closed");
    this.lines.close();
    this.child.stdin.end();
    if (this.child.exitCode === null) {
      await Promise.race([
        new Promise((resolve) => this.child.once("close", resolve)),
        new Promise((resolve) => setTimeout(resolve, 1500)),
      ]);
    }
    if (this.child.exitCode === null && this.child.pid) {
      spawnSync("taskkill.exe", ["/PID", String(this.child.pid), "/T", "/F"], {
        windowsHide: true,
        stdio: "ignore",
      });
    }
  }
}
