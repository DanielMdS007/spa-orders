
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
    
    // Chama o backend
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
//Filters
function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;
  const activeOnly = activeOnlyCheckbox.checked;

  filteredProducts = allProducts.filter(product => {
    // By name
    const matchesSearch = !searchTerm || 
      product.name.toLowerCase().includes(searchTerm);

    // By category
    const matchesCategory = !category || product.category === category;

    // By active status
    const matchesActive = !activeOnly || product.active === 1;

    return matchesSearch && matchesCategory && matchesActive;
  });

  renderProducts();
}

// Render products
function renderProducts() {
  if (filteredProducts.length === 0) {
    productsContainer.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  
  productsContainer.innerHTML = filteredProducts.map(product => `
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
          <h4 class="text-primary mb-3">${Format.price(product.price)}</h4>
          ${product.active === 1 ? `
            <button class="btn btn-primary w-100" style="background-color: #e67e22; border: none;">
              Add to Cart
            </button>
          ` : '<button class="btn btn-secondary w-100" disabled>Unavailable</button>'}
        </div>
      </div>
    </div>
  `).join('');
}

// Show loading
function showLoading() {
  loadingDiv.style.display = 'block';
  productsContainer.style.display = 'none';
  emptyState.style.display = 'none';
}

// Hide loading
function hideLoading() {
  loadingDiv.style.display = 'none';
  productsContainer.style.display = 'flex';
}