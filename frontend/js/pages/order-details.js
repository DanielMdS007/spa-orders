let currentOrder = null;

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get('id');
  
  if (!orderId) {
    showError('No order ID provided');
    return;
  }
  
  loadOrderDetails(orderId);
});

async function loadOrderDetails(orderId) {
  try {
    showLoading();
    
    // GET /orders/{id} - Returns order with items
    currentOrder = await OrderService.getById(orderId);
    
    displayOrderDetails(currentOrder);
    
  } catch (error) {
    console.error('Error loading order details:', error);
    showError('Failed to load order details. Please try again.');
  }
}

function displayOrderDetails(order) {
  document.getElementById('page-title').textContent = `Order #${order.id}`;
  
  document.getElementById('order-id').textContent = `#${order.id}`;
  document.getElementById('customer-id').textContent = order.customerId;
  document.getElementById('order-status').innerHTML = getStatusBadge(order.status);
  document.getElementById('created-at').textContent = formatDateTime(order.createdAt);
  
  displayOrderItems(order.items);
  
  displayPaymentActions(order.status);
  
  displayAddItemButton(order.status);
  
  hideLoading();
  document.getElementById('order-content').style.display = 'block';
}

function displayOrderItems(items) {
  const tableBody = document.getElementById('items-table-body');
  const emptyState = document.getElementById('items-empty-state');
  
  if (!items || items.length === 0) {
    tableBody.innerHTML = '';
    emptyState.style.display = 'block';
    document.getElementById('total-amount').textContent = 'R$ 0,00';
    return;
  }
  
  emptyState.style.display = 'none';
  
  let totalAmount = 0;
  
  tableBody.innerHTML = items.map(item => {
    totalAmount += item.total;
    
    return `
      <tr>
        <td><strong>#${item.id}</strong></td>
        <td>Product #${item.productId}</td>
        <td class="text-center">${item.quantity}</td>
        <td class="text-end">${formatPrice(item.unitPrice)}</td>
        <td class="text-end"><strong>${formatPrice(item.total)}</strong></td>
      </tr>
    `;
  }).join('');
  
  // Update total amount
  document.getElementById('total-amount').textContent = formatPrice(totalAmount);
}

function getStatusBadge(status) {
  const statusColors = {
    'NEW': 'bg-primary',
    'PAID': 'bg-success',
    'PROCESSING': 'bg-warning text-dark',
    'COMPLETED': 'bg-success',
    'CANCELLED': 'bg-danger'
  };
  
  const color = statusColors[status] || 'bg-secondary';
  return `<span class="badge ${color}">${status}</span>`;
}

function displayAddItemButton(status) {
  const addItemButton = document.querySelector('button[onclick="addItemToOrder()"]');
  
  if (!addItemButton) return;
  
  if (status === 'PAID' || status === 'CANCELLED') {
    addItemButton.style.display = 'none';
  } else {
    addItemButton.style.display = 'block';
  }
}

function addItemToOrder() {
  if (!currentOrder) return;
  
  if (currentOrder.status === 'PAID') {
    alert('Cannot add items to a paid order');
    return;
  }
  
  if (currentOrder.status === 'CANCELLED') {
    alert('Cannot add items to a cancelled order');
    return;
  }
  
  window.location.href = `add-item.html?orderId=${currentOrder.id}`;
}

function displayPaymentActions(status) {
  const paymentActionsDiv = document.getElementById('payment-actions');
  
  if (status === 'NEW') {
    // Apenas cria o botão, não chama payOrder() automaticamente
    paymentActionsDiv.innerHTML = `
      <button class="btn btn-success w-100" style="background-color: #0813af; border: none;" onclick="payOrder()">
        💳 Pay Order
      </button>
    `;
  } else if (status === 'PAID') {
    paymentActionsDiv.innerHTML = `
      <button class="btn btn-info w-100" style="background-color: #08af2cff; border: none;" onclick="seePayment()">
        👁️ See Payment
      </button>
    `;
  } else {
    paymentActionsDiv.innerHTML = '';
  }
}

async function payOrder() {
  if (!currentOrder) {
    alert('No order loaded');
    return;
  }

  try { 
    // Redirect to payment creation page with orderId
    window.location.href = `../payments/create.html?orderId=${currentOrder.id}`;
  } catch(error) {
    console.error('Error redirecting to payment page:', error);
    alert('Error redirecting to payment page. Please try again.');
  }
}

async function seePayment() {
  if (!currentOrder) {
    alert('No order loaded');
    return;
  }
  
  try {
    // GET /payments/id - Get payment for this order
    const payment = await PaymentService.getById(currentOrder.id);
    
    // Redirect to payment view page
    window.location.href = `../payments/view.html?id=${payment.id}`;
    
  } catch (error) {
    console.error('Error loading payment details:', error);
    alert('Error loading payment details. Please try again.');
  }
}

function formatPrice(cents) {
  if (!cents && cents !== 0) return 'R$ 0,00';
  const reais = cents / 100;
  return `R$ ${reais.toFixed(2).replace('.', ',')}`;
}

function formatDateTime(dateString) {
  if (!dateString) return '-';
  
  const date = new Date(dateString);
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function showLoading() {
  document.getElementById('loading').style.display = 'block';
  document.getElementById('error-state').style.display = 'none';
  document.getElementById('order-content').style.display = 'none';
}

function hideLoading() {
  document.getElementById('loading').style.display = 'none';
}

function showError(message) {
  document.getElementById('error-message').textContent = message;
  document.getElementById('error-state').style.display = 'block';
  document.getElementById('loading').style.display = 'none';
  document.getElementById('order-content').style.display = 'none';
}