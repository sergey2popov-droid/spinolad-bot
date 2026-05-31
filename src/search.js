function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replaceAll("ё", "е")
    .trim();
}

function scoreAliases(query, aliases = []) {
  const q = normalize(query);
  if (!q) return 0;
  let score = 0;
  for (const alias of aliases) {
    const a = normalize(alias);
    if (a === q) score = Math.max(score, 100);
    else if (q.includes(a)) score = Math.max(score, 80);
    else if (a.includes(q)) score = Math.max(score, 65);
    else if (q.split(/\s+/).some((word) => word.length > 2 && a.includes(word))) score = Math.max(score, 35);
  }
  return score;
}

function bestMatch(query, items) {
  return items
    .map((item) => ({ item, score: scoreAliases(query, item.aliases) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)[0]?.item || null;
}

function search(query, data) {
  const symptom = bestMatch(query, data.symptoms);
  const remedy = bestMatch(query, data.remedies);
  const action = bestMatch(query, data.actions);
  const program = bestMatch(query, data.programs || []);
  const ranked = [
    program && { type: "program", item: program, score: scoreAliases(query, program.aliases) },
    symptom && { type: "symptom", item: symptom, score: scoreAliases(query, symptom.aliases) },
    remedy && { type: "remedy", item: remedy, score: scoreAliases(query, remedy.aliases) },
    action && { type: "action", item: action, score: scoreAliases(query, action.aliases) }
  ].filter(Boolean).sort((a, b) => b.score - a.score);
  return ranked[0] || null;
}

module.exports = { normalize, search };
