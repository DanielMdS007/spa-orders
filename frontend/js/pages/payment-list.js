let allPayments = [];
let filteredPayments = [];

const orderIdInput = document.getElementById('order-id-input');
const clearFiltersBtn = document.getElementById('clear-filters-btn');
const paymentsContainer = document.getElementById('payments-container');
const loadingDiv = document.getElementById('loading');
const emptyState = document.getElementById('empty-state');

document.addEventListener('DOMContentLoaded', () => {
  loadPayments();
  setupEventListeners();
});

function setupEventListeners() {
  orderIdInput.addEventListener('input', filterPayments);
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', clearFilters);
  }
}

async function loadPayments() {
  try {
    showLoading();
    allPayments = await PaymentService.getAll();
    filteredPayments = [...allPayments];
    filterPayments();
  } catch (error) {
    console.error('Error loading payments:', error);
    alert('Error loading payments. Make sure the backend is running on http://localhost:8080');
  } finally {
    hideLoading();
  }
}

function filterPayments() {
  const orderId = orderIdInput.value.trim();

  filteredPayments = allPayments.filter(payment => {
    const matchesOrder = !orderId || payment.order_id.toString().includes(orderId);
    return matchesOrder;
  });

  renderPayments();
}

function clearFilters() {
  orderIdInput.value = '';
  filterPayments();
}

function renderPayments() {
  if (filteredPayments.length === 0) {
    paymentsContainer.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  
  paymentsContainer.innerHTML = filteredPayments.map(payment => {
    const formattedAmount = formatPrice(payment.amount_cents);
    const formattedDate = formatDateTime(payment.paidAt);
    
    return `
      <div class="col">
        <div class="card h-100 shadow-sm" style="cursor: pointer; transition: transform 0.2s;" 
             onmouseover="this.style.transform='translateY(-5px)'" 
             onmouseout="this.style.transform='translateY(0)'"
             onclick="viewPaymentDetails(${payment.id})">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h5 class="card-title">Payment #${payment.id}</h5>
              <span class="badge bg-success">PAID</span>
            </div>
            <p class="card-text text-muted small mb-1">
              <strong>Order ID:</strong> #${payment.order_id}
            </p>
            <p class="card-text text-muted small mb-1">
              <strong>Method:</strong> ${payment.method || 'N/A'}
            </p>
            <p class="card-text text-muted small mb-3">
              <strong>Paid At:</strong> ${formattedDate}
            </p>
            <h4 class="text-primary mb-3">${formattedAmount}</h4>
            <div class="d-grid">
              <button class="btn btn-primary" style="background-color: #0813af; border: none;" onclick="event.stopPropagation(); viewPaymentDetails(${payment.id})">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function viewPaymentDetails(paymentId) {
  window.location.href = `view.html?id=${paymentId}`;
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
  loadingDiv.style.display = 'block';
  paymentsContainer.style.display = 'none';
  emptyState.style.display = 'none';
}

function hideLoading() {
  loadingDiv.style.display = 'none';
  paymentsContainer.style.display = 'flex';
}