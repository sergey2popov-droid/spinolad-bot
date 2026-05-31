const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dataDir = path.join(root, "data");

function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(dataDir, name), "utf8"));
}

function loadData() {
  return {
    sources: readJson("sources.json"),
    symptoms: readJson("symptom_guides.json"),
    remedies: readJson("remedies.json"),
    actions: readJson("actions_exercises.json"),
    programs: readJson("programs.json"),
    illustrations: readJson("illustrations.json")
  };
}

module.exports = { loadData };
