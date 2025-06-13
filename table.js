const endpoint = "https://sheet.best/api/sheets/YOUR-ID-HERE"; // 👈 replace with your real URL

function addClient() {
  const name = document.getElementById("clientName").value.trim();
  const phone = document.getElementById("clientPhone").value.trim();
  const dateTime = document.getElementById("clientDateTime").value;

  if (!name || !phone || !dateTime) {
    alert("Please fill out all fields.");
    return;
  }

  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      phone: phone,
      dateTime: dateTime,
      completed: false
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log("Response:", data);
    alert("Client added successfully!");
    document.getElementById("clientName").value = '';
    document.getElementById("clientPhone").value = '';
    document.getElementById("clientDateTime").value = '';
  })
  .catch(error => {
    console.error("Error:", error);
    alert("Something went wrong.");
  });
}
