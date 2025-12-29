let allOrders = [];
let filteredOrders = [];

const customerIdInput = document.getElementById('customer-id-input');
const statusFilter = document.getElementById('status-filter');
const ordersContainer = document.getElementById('orders-container');
const loadingDiv = document.getElementById('loading');
const emptyState = document.getElementById('empty-state');

document.addEventListener('DOMContentLoaded', () => {
  loadOrders();
  setupEventListeners();
});

function setupEventListeners() {
  customerIdInput.addEventListener('input', filterOrders);
  statusFilter.addEventListener('change', filterOrders);
}


async function loadOrders() {
  try {
    showLoading();
    
    allOrders = await OrderService.getAll();
    filteredOrders = [...allOrders];
    
    filterOrders();
    
  } catch (error) {
    console.error('Error loading orders:', error);
    alert('Error loading orders. Make sure the backend is running.');
  } finally {
    hideLoading();
  }
}

function filterOrders() {
  const customerId = customerIdInput.value.trim();
  const status = statusFilter.value;

  filteredOrders = allOrders.filter(order => {
    const matchesCustomer = !customerId || order.customerId === parseInt(customerId);
    const matchesStatus = !status || order.status === status;
    return matchesCustomer && matchesStatus;
  });

  renderOrders();
}

function renderOrders() {
  if (filteredOrders.length === 0) {
    ordersContainer.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  
  ordersContainer.innerHTML = filteredOrders.map(order => {
    const statusBadge = getStatusBadge(order.status);
    const showAddItem = order.status !== 'PAID' && order.status !== 'CANCELLED';
    const showCancel = order.status !== 'PAID' && order.status !== 'CANCELLED';
    
    return `
      <div class="col">
        <div class="card h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h5 class="card-title mb-0">Order #${order.id}</h5>
              ${statusBadge}
            </div>
            
            <p class="card-text text-muted mb-2">
              <small>Customer ID: ${order.customerId}</small>
            </p>
            
            <p class="card-text text-muted mb-2">
              <small>Items: ${order.itemCount || 0}</small>
            </p>
            
            <p class="card-text mb-3">
              <strong>${formatPrice(order.total || 0)}</strong>
            </p>
            
            <p class="card-text text-muted mb-3">
              <small>${formatDateTime(order.createdAt)}</small>
            </p>
            
            <div class="d-flex gap-2 flex-wrap">
              <a href="details.html?id=${order.id}" class="btn btn-sm btn-primary" style="background-color: #e67e22; border: none;">
                View Details
              </a>
              ${showAddItem ? `
                <a href="add-item.html?orderId=${order.id}" class="btn btn-sm btn-outline-primary">
                  + Add Item
                </a>
              ` : ''}
              ${showCancel ? `
                <button class="btn btn-sm btn-outline-danger" onclick="cancelOrder(${order.id})">
                  Cancel Order
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

async function cancelOrder(orderId) {
  if (!confirm(`Are you sure you want to cancel order #${orderId}?`)) {
    return;
  }
  
  try {
    await OrderService.cancel(orderId);
    alert(`Order #${orderId} cancelled successfully!`);
    loadOrders();
  } catch (error) {
    console.error('Error cancelling order:', error);
    
    let errorMessage = 'Error cancelling order: ';
    if (error.message) {
      errorMessage += error.message;
    } else {
      errorMessage += 'Please try again.';
    }
    alert(errorMessage);
  }
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
  ordersContainer.innerHTML = '';
  emptyState.style.display = 'none';
}

function hideLoading() {
  loadingDiv.style.display = 'none';
}