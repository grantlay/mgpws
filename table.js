const endpoint = "https://api.sheetbest.com/sheets/3af1ceac-727a-45ef-8151-daa32ca54439"; // 👈 replace with your real URL

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
      name,
      phone,
      dateTime,
      completed: false
    })
  })
  .then(response => response.json())
  .then(() => {
    alert("Client added successfully!");
    document.getElementById("clientName").value = '';
    document.getElementById("clientPhone").value = '';
    document.getElementById("clientDateTime").value = '';
    loadClients(); // 🔁 Refresh the table
  })
  .catch(error => {
    console.error("Error:", error);
    alert("Something went wrong.");
  });
}

function loadClients() {
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      const tbody = document.getElementById("clientTableBody");
      tbody.innerHTML = "";

      data.forEach((client, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${client.name}</td>
          <td>${client.phone}</td>
          <td>${new Date(client.dateTime).toLocaleString()}</td>
          <td>
            <button disabled style="opacity:0.6;">✔️</button>
            <button disabled style="opacity:0.6;">🗑️</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch(error => console.error("Error loading clients:", error));
}

// Load clients when the page loads
window.onload = loadClients;
