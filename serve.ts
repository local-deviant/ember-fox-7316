// Friday Beacon — tiny static server for local testing only.
// Serves app/ at http://localhost:8080. Not part of the hand-in.

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const appDir = join(dirname(fileURLToPath(new URL(import.meta.url))), "app");

const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png"
};

const server = createServer(async (req, res) => {
  const rawPath = decodeURIComponent(new URL(req.url ?? "/", "http://localhost").pathname);
  const rel = normalize(rawPath === "/" ? "index.html" : rawPath.replace(/^\//, ""));
  if (rel.startsWith("..")) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  try {
    const body = await readFile(join(appDir, rel));
    res.writeHead(200, { "Content-Type": TYPES[extname(rel)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
});

server.listen(8080, () => console.log("Friday Beacon serving app/ at http://localhost:8080"));
