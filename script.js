document.getElementById("quoteForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const service = document.getElementById("service").value;
  const details = document.getElementById("details").value.trim();

  // Pricing logic
  let price = "N/A";
  if (service === "1 Garbage Can") price = "$10";
  else if (service === "2 Garbage Cans") price = "$15";
  else if (service === "3+ Garbage Cans") price = "$25";

  const webhookURL = "https://discord.com/api/webhooks/1363722193112006666/VNJVHqh0-c0gII_5Zww1VOZgQAWWTra8Rzx8jBiHT2WT6PmhnIJA69OG1LAqF8aRGmjh"; // Replace with actual webhook

  const payload = {
    content: "@everyone",
    embeds: [
      {
        title: "🧾 New Quote Request",
        color: 28447,
        fields: [
          { name: "👤 Full Name", value: name || "Not provided", inline: false },
          { name: "📞 Phone Number", value: phone || "Not provided", inline: false },
          { name: "📧 Email", value: email || "Not provided", inline: false },
          { name: "🗑️ Service Requested", value: service || "Not selected", inline: false },
          { name: "📝 Additional Details", value: details || "None", inline: false },
          { name: "💰 Estimated Quote", value: price, inline: false },
        ],
        timestamp: new Date().toISOString()
      }
    ]
  };

  try {
    await fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    // Redirect with service passed in query
    window.location.href = `finished.html?service=${encodeURIComponent(service)}`;
  } catch (err) {
    console.error("Webhook Error:", err);
    alert("Something went wrong. Please try again.");
  }
});
