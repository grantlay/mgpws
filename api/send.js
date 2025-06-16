export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send("Only POST requests allowed");
  }

  const webhookURL = process.env.DISCORD_WEBHOOK;

  try {
    await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    res.status(200).send("Webhook sent successfully");
  } catch (err) {
    console.error("Error sending webhook:", err);
    res.status(500).send("Failed to send webhook");
  }
}
