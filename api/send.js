// pages/api/sendQuote.js

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const webhookURL = process.env.DISCORD_WEBHOOK;

  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) throw new Error("Failed to send to webhook");

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error sending webhook:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
}
