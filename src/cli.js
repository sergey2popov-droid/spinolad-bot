const { answerQuery } = require("./engine");

function main() {
  const query = process.argv.slice(2).join(" ").trim();
  if (!query) {
    console.log("Напишите запрос. Пример: npm run ask -- \"болит желудок\"");
    process.exit(0);
  }

  console.log(answerQuery(query).text);
}

main();
