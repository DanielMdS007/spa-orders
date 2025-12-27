async function createPayment() {
  const payment = {
    orderId: Number(orderId.value),
    amount: Number(amount.value)
  };

  const result = await apiPost("/payments", payment);
  alert("Pagamento registrado: " + result.id);
}