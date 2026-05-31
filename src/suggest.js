const { normalize } = require("./search");

function collectSuggestions(data) {
  return [
    ...data.symptoms.map((item) => ({ type: "symptom", id: item.id, title: item.title, aliases: item.aliases })),
    ...data.remedies.map((item) => ({ type: "remedy", id: item.id, title: item.title, aliases: item.aliases })),
    ...data.actions.map((item) => ({ type: "action", id: item.id, title: item.title, aliases: item.aliases })),
    ...(data.programs || []).map((item) => ({ type: "program", id: item.id, title: item.title, aliases: item.aliases }))
  ];
}

function suggest(query, data, limit = 8) {
  const q = normalize(query);
  if (!q) return collectSuggestions(data).slice(0, limit);
  return collectSuggestions(data)
    .map((item) => {
      const aliases = item.aliases || [];
      const exact = aliases.some((alias) => normalize(alias) === q) || normalize(item.title) === q;
      const starts = aliases.some((alias) => normalize(alias).startsWith(q)) || normalize(item.title).startsWith(q);
      const includes = aliases.some((alias) => normalize(alias).includes(q)) || normalize(item.title).includes(q);
      return { ...item, rank: exact ? 3 : starts ? 2 : includes ? 1 : 0 };
    })
    .filter((item) => item.rank > 0)
    .sort((a, b) => b.rank - a.rank || a.title.localeCompare(b.title, "ru"))
    .slice(0, limit)
    .map(({ rank, aliases, ...item }) => item);
}

module.exports = { suggest };
