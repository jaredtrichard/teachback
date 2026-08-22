#!/usr/bin/env node
/**
 * Optional file-backed user store. Not required for the kit — localStorage
 * already survives refresh. Start only if you want a file you can inspect:
 *
 *   node server/store-server.mjs
 *
 * Writes gitignored data/users/<id>.json
 */
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(root, "data", "users");
const port = Number(process.env.TB_STORE_PORT || 8787);
const host = process.env.TB_STORE_HOST || "127.0.0.1";

function send(res, status, body, type) {
  const payload = type === "text" ? String(body) : JSON.stringify(body);
  res.writeHead(status, {
    "content-type": type === "text" ? "text/plain; charset=utf-8" : "application/json; charset=utf-8",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,PUT,DELETE,OPTIONS",
    "access-control-allow-headers": "content-type",
  });
  res.end(payload);
}

function userPath(id) {
  if (!/^[A-Za-z0-9._@-]{1,80}$/.test(id)) return null;
  return path.join(dataDir, `${id}.json`);
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    send(res, 204, "");
    return;
  }
  const url = new URL(req.url || "/", `http://${host}:${port}`);
  if (url.pathname === "/health") {
    send(res, 200, { ok: true, adapter: "file" });
    return;
  }
  const match = url.pathname.match(/^\/v1\/users\/([^/]+)$/);
  if (!match) {
    send(res, 404, { error: "not found" });
    return;
  }
  const file = userPath(decodeURIComponent(match[1]));
  if (!file) {
    send(res, 400, { error: "bad user id" });
    return;
  }
  try {
    if (req.method === "GET") {
      try {
        const text = await fs.readFile(file, "utf8");
        send(res, 200, JSON.parse(text));
      } catch (err) {
        if (err && err.code === "ENOENT") send(res, 404, { error: "no user state" });
        else throw err;
      }
      return;
    }
    if (req.method === "PUT") {
      const body = await readBody(req);
      await fs.mkdir(dataDir, { recursive: true });
      await fs.writeFile(file, `${JSON.stringify(body, null, 2)}\n`);
      send(res, 200, body);
      return;
    }
    if (req.method === "DELETE") {
      try {
        await fs.unlink(file);
      } catch (err) {
        if (!err || err.code !== "ENOENT") throw err;
      }
      send(res, 204, "");
      return;
    }
    send(res, 405, { error: "method not allowed" });
  } catch (err) {
    send(res, 500, { error: err instanceof Error ? err.message : "server error" });
  }
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  server.listen(port, host, () => {
    process.stdout.write(`tb-store file adapter on http://${host}:${port}\n`);
  });
}

export { server, dataDir };
