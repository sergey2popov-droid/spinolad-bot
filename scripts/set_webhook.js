const token = process.env.TELEGRAM_BOT_TOKEN;
const baseUrl = process.env.APP_BASE_URL;

async function main() {
  if (!token) throw new Error("Missing TELEGRAM_BOT_TOKEN");
  if (!baseUrl) throw new Error("Missing APP_BASE_URL");

  const webhookUrl = `${baseUrl.replace(/\/$/, "")}/telegram/webhook`;
  const response = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ url: webhookUrl })
  });
  const json = await response.json();
  if (!response.ok || !json.ok) {
    throw new Error(`setWebhook failed: ${JSON.stringify(json)}`);
  }
  console.log(JSON.stringify({ ok: true, webhookUrl }, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
