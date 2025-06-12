const endpoint = "https://script.google.com/macros/s/AKfycbyeSlSaQ62jv1ZCQTQ_TxRGBnGMMO-QCnMezHyfbtkhQQYL--OxpAVI1kQbxtkQboQC/exec";

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
  .then(response => response.text())
  .then(data => {
    alert("Client added successfully!");
    document.getElementById("clientName").value = '';
    document.getElementById("clientPhone").value = '';
    document.getElementById("clientDateTime").value = '';
  })
  .catch(error => {
    alert("Error submitting data. Make sure your web app is set to 'Anyone can access'.");
    console.error(error);
  });
}
