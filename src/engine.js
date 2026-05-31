const { loadData } = require("./data");
const { search } = require("./search");
const { formatResult } = require("./format");

function answerQuery(query) {
  const data = loadData();
  const result = search(query, data);
  const illustration = result?.type === "action"
    ? (data.illustrations || []).find((item) => item.action_id === result.item.id) || null
    : null;
  return {
    query,
    matchType: result?.type || "none",
    matchId: result?.item?.id || null,
    title: result?.item?.title || null,
    text: formatResult(result, data),
    illustration: illustration && {
      title: illustration.title,
      assetPath: illustration.asset_path,
      textCue: illustration.text_cue
    }
  };
}

module.exports = { answerQuery };
