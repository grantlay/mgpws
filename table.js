const endpoint = "https://api.sheetbest.com/sheets/3af1ceac-727a-45ef-8151-daa32ca54439"; // 👈 replace with your real URL
function addClient() {
  const name = document.getElementById("clientName").value.trim();
  const phone = document.getElementById("clientPhone").value.trim();
  const dateTime = document.getElementById("clientDateTime").value;
  const id = Date.now().toString();

  if (!name || !phone || !dateTime) {
    alert("Please fill out all fields.");
    return;
  }

  fetch(endpoint, {
    method: "POST",
    body: new URLSearchParams({
      action: "add",
      name,
      phone,
      dateTime,
      completed: "false",
      id
    })
  })
    .then(response => response.text())
    .then(() => {
      alert("Client added successfully!");
      document.getElementById("clientName").value = '';
      document.getElementById("clientPhone").value = '';
      document.getElementById("clientDateTime").value = '';
      loadClients();
    })
    .catch(error => {
      console.error("Error adding client:", error);
      alert("Something went wrong.");
    });
}

function loadClients() {
  fetch("https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/gviz/tq?tqx=out:json") // Replace with your Google Sheet "Published to web" URL
    .then(res => res.text())
    .then(text => {
      const json = JSON.parse(text.substring(47).slice(0, -2));
      const tbody = document.getElementById("clientTableBody");
      tbody.innerHTML = "";

      const headers = json.table.cols.map(col => col.label.toLowerCase());
      const rows = json.table.rows;

      rows.forEach(row => {
        const client = {};
        row.c.forEach((cell, i) => {
          client[headers[i]] = cell ? cell.v : "";
        });

        const rowElement = document.createElement("tr");
        if (client.completed === "true") rowElement.classList.add("completed");

        rowElement.innerHTML = `
          <td>${client.name}</td>
          <td>${client.phone}</td>
          <td>${formatDate(client.dateTime)}</td>
          <td>
            <button onclick="markComplete('${client.id}')">✔️</button>
            <button onclick="deleteClient('${client.id}')">🗑️</button>
          </td>
        `;
        tbody.appendChild(rowElement);
      });
    })
    .catch(err => console.error("Error loading clients:", err));
}

function deleteClient(id) {
  fetch(endpoint, {
    method: "POST",
    body: new URLSearchParams({
      action: "delete",
      id
    })
  })
    .then(() => loadClients())
    .catch(error => console.error("Error deleting:", error));
}

function markComplete(id) {
  fetch(endpoint, {
    method: "POST",
    body: new URLSearchParams({
      action: "complete",
      id
    })
  })
    .then(() => loadClients())
    .catch(error => console.error("Error marking complete:", error));
}

function formatDate(dateStr) {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Invalid date";
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return "Invalid date";
  }
}

window.onload = loadClients;
