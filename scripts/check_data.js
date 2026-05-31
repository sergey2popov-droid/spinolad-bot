const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dataDir = path.join(root, "data");
const publicDir = path.join(root, "public");

const banned = [
  "вылечит",
  "лечит гастрит",
  "лечит язву",
  "заменяет врача",
  "заменяет лекарства",
  "рубает сахар",
  "снимает риск на"
];

function readJson(name) {
  const file = path.join(dataDir, name);
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function scanBanned(name, value, errors) {
  const text = JSON.stringify(value).toLowerCase();
  for (const phrase of banned) {
    if (text.includes(phrase)) errors.push(`${name}: banned phrase "${phrase}"`);
  }
}

function checkSourcesExist(items, sources, name, errors) {
  const ids = new Set(sources.map((source) => source.id));
  for (const item of items) {
    for (const sourceId of item.sources || []) {
      if (!ids.has(sourceId)) errors.push(`${name}:${item.id} references missing source "${sourceId}"`);
    }
  }
}

const errors = [];
const sources = readJson("sources.json");
const symptoms = readJson("symptom_guides.json");
const remedies = readJson("remedies.json");
const actions = readJson("actions_exercises.json");
const programs = readJson("programs.json");
const illustrations = readJson("illustrations.json");

try {
  assert(sources.length >= 8, "sources.json should contain at least 8 sources");
  assert(symptoms.length >= 8, "symptom_guides.json should contain at least 8 guides");
  assert(remedies.length >= 20, "remedies.json should contain at least 20 remedies");
  assert(actions.length >= 10, "actions_exercises.json should contain at least 10 actions");
  assert(programs.length >= 4, "programs.json should contain at least 4 programs");
  assert(illustrations.length >= 4, "illustrations.json should contain at least 4 illustrations");

  for (const symptom of symptoms) {
    for (const key of ["id", "title", "aliases", "plain_explanation", "red_flags", "folk_recipes", "foods_drinks", "actions", "symptom_work", "cautions", "sources"]) {
      if (!symptom[key] || (Array.isArray(symptom[key]) && symptom[key].length === 0)) {
        errors.push(`symptom:${symptom.id || "unknown"} missing ${key}`);
      }
    }
  }

  for (const remedy of remedies) {
    for (const key of ["id", "type", "title", "aliases", "supports", "recipe", "use", "caution", "sources"]) {
      if (!remedy[key] || (Array.isArray(remedy[key]) && remedy[key].length === 0)) {
        errors.push(`remedy:${remedy.id || "unknown"} missing ${key}`);
      }
    }
  }

  for (const action of actions) {
    for (const key of ["id", "title", "aliases", "supports", "protocol", "mechanism", "track", "caution", "sources"]) {
      if (!action[key] || (Array.isArray(action[key]) && action[key].length === 0)) {
        errors.push(`action:${action.id || "unknown"} missing ${key}`);
      }
    }
  }

  for (const program of programs) {
    for (const key of ["id", "title", "duration_days", "aliases", "area", "intro", "red_flags", "days", "adaptation", "sources"]) {
      if (!program[key] || (Array.isArray(program[key]) && program[key].length === 0)) {
        errors.push(`program:${program.id || "unknown"} missing ${key}`);
      }
    }
    for (const day of program.days || []) {
      for (const key of ["day", "focus", "steps", "recovery", "tracking"]) {
        if (!day[key] || (Array.isArray(day[key]) && day[key].length === 0)) {
          errors.push(`program:${program.id || "unknown"} day missing ${key}`);
        }
      }
    }
  }

  const actionIds = new Set(actions.map((action) => action.id));
  for (const illustration of illustrations) {
    for (const key of ["id", "action_id", "title", "asset_path", "style", "frame_1", "frame_2", "text_cue", "avoid"]) {
      if (!illustration[key] || (Array.isArray(illustration[key]) && illustration[key].length === 0)) {
        errors.push(`illustration:${illustration.id || "unknown"} missing ${key}`);
      }
    }
    if (illustration.action_id && !actionIds.has(illustration.action_id)) {
      errors.push(`illustration:${illustration.id} references missing action "${illustration.action_id}"`);
    }
    for (const frameKey of ["frame_1", "frame_2"]) {
      const frame = illustration[frameKey] || {};
      for (const key of ["caption", "description"]) {
        if (!frame[key]) errors.push(`illustration:${illustration.id || "unknown"} ${frameKey} missing ${key}`);
      }
    }
    if (illustration.asset_path) {
      const assetPath = path.normalize(path.join(publicDir, illustration.asset_path));
      if (!assetPath.startsWith(publicDir) || !fs.existsSync(assetPath)) {
        errors.push(`illustration:${illustration.id} asset missing "${illustration.asset_path}"`);
      }
    }
  }

  checkSourcesExist(symptoms, sources, "symptom", errors);
  checkSourcesExist(remedies, sources, "remedy", errors);
  checkSourcesExist(actions, sources, "action", errors);
  checkSourcesExist(programs, sources, "program", errors);

  scanBanned("sources", sources, errors);
  scanBanned("symptoms", symptoms, errors);
  scanBanned("remedies", remedies, errors);
  scanBanned("actions", actions, errors);
  scanBanned("programs", programs, errors);
  scanBanned("illustrations", illustrations, errors);

  if (errors.length) {
    console.error(errors.join("\n"));
    process.exit(1);
  }

  console.log(JSON.stringify({
    ok: true,
    sources: sources.length,
    symptomGuides: symptoms.length,
    remedies: remedies.length,
    actions: actions.length,
    programs: programs.length,
    illustrations: illustrations.length
  }, null, 2));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
