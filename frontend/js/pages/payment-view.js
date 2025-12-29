let currentPayment = null;

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const paymentId = urlParams.get('id');
  
  if (!paymentId) {
    showError('No payment ID provided');
    return;
  }
  
  loadPaymentDetails(paymentId);
});

async function loadPaymentDetails(paymentId) {
  try {
    showLoading();
    
    // GET /payments/{id}
    currentPayment = await PaymentService.getById(paymentId);
    
    displayPaymentDetails(currentPayment);
    
  } catch (error) {
    console.error('Error loading payment details:', error);
    showError('Failed to load payment details. Please try again.');
  }
}

function displayPaymentDetails(payment) {
  // Update page title
  document.getElementById('page-title').textContent = `Payment #${payment.id}`;
  
  // Display payment information
  document.getElementById('payment-id').textContent = `#${payment.id}`;
  document.getElementById('order-id').innerHTML = `<a href="../orders/view.html?id=${payment.order_id}">#${payment.order_id}</a>`;
  document.getElementById('paid-at').textContent = formatDateTime(payment.paidAt);
  document.getElementById('payment-amount').textContent = formatPrice(payment.amount_cents);
  
  // Display additional info if available
  displayAdditionalInfo(payment);
  
  // Update view order button
  document.getElementById('view-order-btn').href = `../orders/view.html?id=${payment.order_id}`;
  
  // Show content
  hideLoading();
  document.getElementById('payment-content').style.display = 'block';
}

function displayAdditionalInfo(payment) {
  const additionalInfoDiv = document.getElementById('additional-info');
  
  let infoHtml = '';
  
  if (payment.method) {
    infoHtml += `
      <div class="mb-2">
        <strong>Payment Method:</strong> ${payment.method}
      </div>
    `;
  }
  
  if (payment.transactionId) {
    infoHtml += `
      <div class="mb-2">
        <strong>Transaction ID:</strong> ${payment.transactionId}
      </div>
    `;
  }
  
  if (infoHtml) {
    additionalInfoDiv.innerHTML = infoHtml;
  } else {
    additionalInfoDiv.innerHTML = '<p class="text-muted">No additional information available.</p>';
  }
}

function getStatusBadge(status) {
  const statusColors = {
    'PAID': 'bg-success',
    'PENDING': 'bg-warning text-dark',
    'CANCELLED': 'bg-danger'
  };
  
  const color = statusColors[status] || 'bg-secondary';
  return `<span class="badge ${color}">${status}</span>`;
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
  document.getElementById('payment-content').style.display = 'none';
}

function hideLoading() {
  document.getElementById('loading').style.display = 'none';
}

function showError(message) {
  document.getElementById('error-message').textContent = message;
  document.getElementById('error-state').style.display = 'block';
  document.getElementById('loading').style.display = 'none';
  document.getElementById('payment-content').style.display = 'none';
}