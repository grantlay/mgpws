const endpoint = "https://script.google.com/macros/s/AKfycbyeSlSaQ62jv1ZCQTQ_TxRGBnGMMO-QCnMezHyfbtkhQQYL--OxpAVI1kQbxtkQboQC/exec";

function addClient() {
  const name = document.getElementById("clientName").value.trim();
  const phone = document.getElementById("clientPhone").value.trim();
  const dateTime = document.getElementById("clientDateTime").value;

  if (!name || !phone || !dateTime) {
    alert("Please fill out all fields.");
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("dateTime", dateTime);
  formData.append("completed", "false");

  fetch(endpoint, {
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(data => {
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
