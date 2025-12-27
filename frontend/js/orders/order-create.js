let items = [];

async function loadProducts() {
  const products = await apiGet("/products");

  const div = document.getElementById("products");
  products.forEach(p => {
    div.innerHTML += `
      <div>
        ${p.name} - R$ ${p.price}
        <button onclick="addItem(${p.id})">+</button>
      </div>
    `;
  });
}

function addItem(productId) {
  const item = items.find(i => i.productId === productId);
  item ? item.quantity++ : items.push({ productId, quantity: 1 });
}

async function createOrder() {
  const order = {
    customerId: Number(customerId.value),
    items
  };

  const result = await apiPost("/orders", order);
  alert("Pedido criado: " + result.id);
}

loadProducts();