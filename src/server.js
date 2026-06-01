const http = require("http");
const fs = require("fs");
const path = require("path");
const { answerQuery } = require("./engine");
const { loadData } = require("./data");
const { suggest } = require("./suggest");
const { logQuery } = require("./logger");
const { handleTelegramUpdate, sendTelegramMethod } = require("./telegram");

const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const port = Number(process.env.PORT || 3000);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(body);
}

function sendText(res, status, text) {
  res.writeHead(status, { "content-type": "text/plain; charset=utf-8" });
  res.end(text);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        req.destroy();
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function safePublicPath(urlPath) {
  const pathname = decodeURIComponent(urlPath === "/" ? "/index.html" : urlPath);
  const filePath = path.normalize(path.join(publicDir, pathname));
  if (!filePath.startsWith(publicDir)) return null;
  return filePath;
}

function serveStatic(req, res, url) {
  const filePath = safePublicPath(url.pathname);
  if (!filePath || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    sendText(res, 404, "Not found");
    return;
  }
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { "content-type": contentTypes[ext] || "application/octet-stream" });
  fs.createReadStream(filePath).pipe(res);
}

function handleAnswer(req, res, url) {
  const query = url.searchParams.get("q") || "";
  if (!query.trim()) {
    sendJson(res, 400, { error: "Missing q query parameter" });
    return;
  }
  const answer = answerQuery(query);
  logQuery({ query, matchType: answer.matchType, matchId: answer.matchId, title: answer.title });
  sendJson(res, 200, answer);
}

function handleSuggest(req, res, url) {
  const query = url.searchParams.get("q") || "";
  const data = loadData();
  sendJson(res, 200, { query, suggestions: suggest(query, data) });
}

async function handleTelegramWebhook(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }
  const raw = await readBody(req);
  const update = JSON.parse(raw || "{}");
  const messages = handleTelegramUpdate(update);
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    sendJson(res, 200, { ok: true, dryRun: true, messages });
    return;
  }

  for (const message of messages) {
    await sendTelegramMethod(token, message.method, message.payload);
  }
  sendJson(res, 200, { ok: true, sent: messages.length });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  try {
    if (url.pathname === "/health") {
      sendJson(res, 200, { ok: true, service: "spinolad", time: new Date().toISOString() });
      return;
    }
    if (url.pathname === "/api/answer") {
      handleAnswer(req, res, url);
      return;
    }
    if (url.pathname === "/api/suggest") {
      handleSuggest(req, res, url);
      return;
    }
    if (url.pathname === "/telegram/webhook") {
      await handleTelegramWebhook(req, res);
      return;
    }
    serveStatic(req, res, url);
  } catch (error) {
    sendJson(res, 500, { error: error.message });
  }
});

function startServer(customPort = port) {
  return server.listen(customPort, () => {
    console.log(`Spinolad dev server: http://localhost:${customPort}`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { server, startServer };
