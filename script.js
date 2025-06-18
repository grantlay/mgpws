document.getElementById("quoteForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  // Check if TOS checkbox is checked
  const tosCheckbox = document.getElementById("agreeTOS");
  if (!tosCheckbox || !tosCheckbox.checked) {
    alert("You must agree to the Terms of Service before submitting.");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const service = document.getElementById("service").value;
  const details = document.getElementById("details").value.trim();
  const jobTime = document.getElementById("jobTime").value; // ✅ grab job time

  // Pricing logic
  let price = "N/A";
  if (service === "1 Garbage Can") price = "⭐Only $5";
  else if (service === "2 Garbage Cans") price = "⭐Only $10";
  else if (service === "3+ Garbage Cans") price = "⭐Only $15";

  const webhookURL = "https://discord.com/api/webhooks/1363722193112006666/VNJVHqh0-c0gII_5Zww1VOZgQAWWTra8Rzx8jBiHT2WT6PmhnIJA69OG1LAqF8aRGmjh";

  const payload = {
    content: "@everyone",
    embeds: [
      {
        title: "🧾 New Quote Request",
        color: 2654208,
        fields: [
          { name: "👤 Full Name", value: name || "Not provided", inline: false },
          { name: "📞 Phone Number", value: phone || "Not provided", inline: false },
          { name: "🏠 Address", value: address || "Not provided", inline: false },
          { name: "🗑️ Service Requested", value: service || "Not selected", inline: false },
          { name: "💬 Job Time", value: jobTime || "Not set", inline: false }, // ✅ included here
          { name: "📝 Additional Details", value: details || "None", inline: false },
          { name: "💰 Estimated Quote", value: price, inline: false },
          { name: "✅ TOS Agreement", value: "Agreed", inline: false }
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

    // Redirect with quote info
    window.location.href = `finished.html?service=${encodeURIComponent(service)}`;
  } catch (err) {
    console.error("Webhook Error:", err);
    alert("Something went wrong. Please try again.");
  }
});
