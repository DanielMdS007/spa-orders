document.addEventListener("DOMContentLoaded", carregarProdutos);

async function carregarProdutos() {
  try {
    const produtos = await apiGet("/products");

    const tbody = document.getElementById("productsTable");
    tbody.innerHTML = "";

    produtos.forEach(p => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>R$ ${p.price}</td>
        <td>${p.active === 1 ? "Sim" : "Não"}</td>
      `;

      tbody.appendChild(tr);
    });
  } catch (e) {
    console.error(e);
    alert("Erro ao carregar produtos");
  }
}