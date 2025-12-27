document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("saveBtn")
    .addEventListener("click", async () => {

      const product = {
        name: document.getElementById("name").value,
        category: document.getElementById("category").value,
        price: Number(document.getElementById("price").value),
        active: document.getElementById("active").checked ? 1 : 0
      };

      const result = await apiPost("/products", product);
      alert("Produto criado: " + result.id);
    });
});