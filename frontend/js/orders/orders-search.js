async function carregarPedidos() {
  const pedidos = await apiGet("/orders");

  const container = document.getElementById("orders");
  pedidos.forEach(p => {
    container.innerHTML += `
      <div onclick="verPedido(${p.id})">
        Pedido #${p.id}
      </div>
    `;
  });
}

async function verPedido(id) {
  const pedido = await apiGet(`/orders/${id}`);
  console.log(pedido);
}

carregarPedidos();