let allProducts = [];
let filteredProducts = [];

const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const activeOnlyCheckbox = document.getElementById('active-only');
const productsContainer = document.getElementById('products-container');
const loadingDiv = document.getElementById('loading');
const emptyState = document.getElementById('empty-state');

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  setupEventListeners();
});

function setupEventListeners() {
  searchInput.addEventListener('input', filterProducts);
  categoryFilter.addEventListener('change', filterProducts);
  activeOnlyCheckbox.addEventListener('change', filterProducts);
}

async function loadProducts() {
  try {
    showLoading();
    
    allProducts = await ProductService.getAll();
    filteredProducts = [...allProducts];
    
    filterProducts();
    
  } catch (error) {
    console.error('Error loading products:', error);
    alert('Error loading products. Make sure the backend is running on http://localhost:8080');
  } finally {
    hideLoading();
  }
}

function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;
  const activeOnly = activeOnlyCheckbox.checked;

  filteredProducts = allProducts.filter(product => {
    const matchesSearch = !searchTerm || 
      product.name.toLowerCase().includes(searchTerm);

    const matchesCategory = !category || product.category === category;

    const matchesActive = !activeOnly || product.active === 1;

    return matchesSearch && matchesCategory && matchesActive;
  });

  renderProducts();
}

function renderProducts() {
  if (filteredProducts.length === 0) {
    productsContainer.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  
  productsContainer.innerHTML = filteredProducts.map(product => {
    const formattedPrice = Format.price(product.price);
    
    return `
      <div class="col">
        <div class="card h-100 ${product.active === 0 ? 'opacity-50' : ''}">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h5 class="card-title">${product.name}</h5>
              ${product.active === 1 ? 
                '<span class="badge bg-success">Active</span>' : 
                '<span class="badge bg-secondary">Inactive</span>'
              }
            </div>
            <p class="card-text text-muted small">${Format.capitalize(product.category)}</p>
            <h4 class="text-primary mb-3">${formattedPrice}</h4>
            ${product.active === 1 ? `
            ` : '<button class="btn btn-secondary w-100" disabled>Unavailable</button>'}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function showLoading() {
  loadingDiv.style.display = 'block';
  productsContainer.style.display = 'none';
  emptyState.style.display = 'none';
}

function hideLoading() {
  loadingDiv.style.display = 'none';
  productsContainer.style.display = 'flex';
}