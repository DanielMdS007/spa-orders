async function createCustomer() {
  const customer = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value
  };

  console.log("Enviando:", customer);

  const created = await apiPost("/customers", customer);

  document.getElementById("result").innerText =
    "Cliente criado com ID: " + created.id;
}