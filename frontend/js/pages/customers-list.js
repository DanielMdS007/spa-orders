let allCustomers = [];
let filteredCustomers = [];

const searchInput = document.getElementById('search-input');
const customersContainer = document.getElementById('customers-container');
const customersTbody = document.getElementById('customers-tbody');
const loadingDiv = document.getElementById('loading');
const emptyState = document.getElementById('empty-state');

document.addEventListener('DOMContentLoaded', () => {
  loadCustomers();
  setupEventListeners();
});

function setupEventListeners() {
  searchInput.addEventListener('input', filterCustomers);
}

async function loadCustomers() {
  try {
    showLoading();
    allCustomers = await CustomerService.getAll();
    filteredCustomers = [...allCustomers];
    filterCustomers();
  } catch (error) {
    console.error('Error loading customers:', error);
    alert('Error loading customers. Make sure the backend is running.');
  } finally {
    hideLoading();
  }
}

// Filters
function filterCustomers() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  filteredCustomers = allCustomers.filter(customer => {
    const matchesSearch = !searchTerm || 
      customer.name.toLowerCase().includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm);

    return matchesSearch;
  });

  renderCustomers();
}

function renderCustomers() {
  if (filteredCustomers.length === 0) {
    customersContainer.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  customersContainer.style.display = 'block';

  customersTbody.innerHTML = filteredCustomers.map(customer => `
    <tr>
      <td><strong>#${customer.id}</strong></td>
      <td>${customer.name}</td>
      <td>${customer.email}</td>
      <td>${Format.dateTime(customer.createdAt)}</td>
      <td class="text-center">
        <button class="btn btn-sm btn-outline-primary" onclick="viewCustomerOrders(${customer.id})">
          View Orders
        </button>
      </td>
    </tr>
  `).join('');
}

function viewCustomerOrders(customerId) {
  window.location.href = `../orders/list.html?customerId=${customerId}`;
}

function showLoading() {
  loadingDiv.style.display = 'block';
  customersContainer.style.display = 'none';
  emptyState.style.display = 'none';
}

function hideLoading() {
  loadingDiv.style.display = 'none';
}

window.viewCustomerOrders = viewCustomerOrders;