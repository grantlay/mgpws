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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      phone,
      dateTime,
      completed: "false",
      id: Date.now().toString()
    })
  })
    .then(response => response.json())
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
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      const tbody = document.getElementById("clientTableBody");
      tbody.innerHTML = "";

      data.forEach(client => {
        const row = document.createElement("tr");
        if (client.completed === "true") row.classList.add("completed");

        row.innerHTML = `
          <td>${client.name}</td>
          <td>${client.phone}</td>
          <td>${formatDate(client.dateTime)}</td>
          <td>
            <button onclick="markComplete('${client.id}')">✔️</button>
            <button onclick="deleteClient('${client.id}')">🗑️</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch(error => console.error("Error loading clients:", error));
}

function deleteClient(id) {
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      const filtered = data.filter(client => client.id !== id);
      updateSheet(filtered);
    });
}

function markComplete(id) {
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      const updated = data.map(client => {
        if (client.id === id) {
          client.completed = client.completed === "true" ? "false" : "true";
        }
        return client;
      });
      updateSheet(updated);
    });
}

function updateSheet(clients) {
  fetch(endpoint, { method: "DELETE" })
    .then(() => {
      return fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clients.map(client => ({
          name: client.name,
          phone: client.phone,
          dateTime: client.dateTime,
          completed: client.completed,
          id: client.id
        })))
      });
    })
    .then(() => loadClients())
    .catch(error => console.error("Error updating sheet:", error));
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
