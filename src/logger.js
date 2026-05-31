const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const logDir = path.join(root, "logs");
const logFile = path.join(logDir, "queries.jsonl");

function logQuery(entry) {
  fs.mkdirSync(logDir, { recursive: true });
  const line = JSON.stringify({ ts: new Date().toISOString(), ...entry }) + "\n";
  fs.appendFileSync(logFile, line, "utf8");
}

module.exports = { logQuery };
