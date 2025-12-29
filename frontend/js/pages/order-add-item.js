let allProducts = [];
let filteredProducts = [];
let cart = [];
let currentProduct = null;
let orderId = null;

const productSearch = document.getElementById('product-search');
const categoryFilter = document.getElementById('category-filter');
const productsContainer = document.getElementById('products-container');
const loadingDiv = document.getElementById('loading');
const emptyState = document.getElementById('empty-state');

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  orderId = urlParams.get('orderId');
  
  if (!orderId) {
    alert('No order ID provided');
    window.location.href = 'list.html';
    return;
  }
  
  await validateOrderStatus();
  
  document.getElementById('order-number').textContent = `#${orderId}`;
  document.getElementById('back-button').href = `details.html?id=${orderId}`;
  
  loadProducts();
  setupEventListeners();
});

function setupEventListeners() {
  productSearch.addEventListener('input', filterProducts);
  categoryFilter.addEventListener('change', filterProducts);
}

async function validateOrderStatus() {
  try {
    const order = await OrderService.getById(orderId);
    
    if (order.status === 'PAID') {
      alert('Cannot add items to a paid order');
      window.location.href = `details.html?id=${orderId}`;
      return;
    }
    
    if (order.status === 'CANCELLED') {
      alert('Cannot add items to a cancelled order');
      window.location.href = `details.html?id=${orderId}`;
      return;
    }
  } catch (error) {
    console.error('Error validating order:', error);
    alert('Error loading order information');
    window.location.href = 'list.html';
  }
}

async function loadProducts() {
  try {
    showLoading();
    
    allProducts = await ProductService.getAll({ active: 1 });
    filteredProducts = [...allProducts];
    
    filterProducts();
    
  } catch (error) {
    console.error('Error loading products:', error);
    alert('Error loading products. Make sure the backend is running.');
  } finally {
    hideLoading();
  }
}

function filterProducts() {
  const searchTerm = productSearch.value.toLowerCase().trim();
  const category = categoryFilter.value;

  filteredProducts = allProducts.filter(product => {
    const matchesSearch = !searchTerm || product.name.toLowerCase().includes(searchTerm);
    const matchesCategory = !category || product.category === category;
    return matchesSearch && matchesCategory && product.active === 1;
  });

  renderProducts();
}

function renderProducts() {
  if (filteredProducts.length === 0) {
    productsContainer.innerHTML = '';
    emptyState.style.display = 'block';
    productsContainer.style.display = 'none';
    return;
  }

  emptyState.style.display = 'none';
  productsContainer.style.display = 'flex';
  
  productsContainer.innerHTML = filteredProducts.map(product => {
    const cartItem = cart.find(item => item.productId === product.id);
    const isSelected = cartItem !== undefined;
    const quantity = cartItem ? cartItem.quantity : 0;
    
    return `
      <div class="col">
        <div class="card product-card h-100 ${isSelected ? 'selected' : ''}" 
             onclick="selectProduct(${product.id})">
          ${isSelected ? `<div class="quantity-badge">${quantity}</div>` : ''}
          <div class="card-body">
            <h6 class="card-title">${product.name}</h6>
            <p class="card-text text-muted small">${capitalizeCategory(product.category)}</p>
            <h5 class="text-primary">${formatPrice(product.price)}</h5>
            ${isSelected ? 
              '<small class="text-success"><strong>✓ Selected</strong></small>' : 
              '<small class="text-muted">Click to add</small>'
            }
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function selectProduct(productId) {
  currentProduct = allProducts.find(p => p.id === productId);
  
  if (!currentProduct) return;
  
  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    document.getElementById('quantity-input').value = existingItem.quantity;
  } else {
    document.getElementById('quantity-input').value = 1;
  }
  
  document.getElementById('modal-product-name').textContent = currentProduct.name;
  document.getElementById('modal-product-price').textContent = formatPrice(currentProduct.price);
  
  const modal = new bootstrap.Modal(document.getElementById('quantityModal'));
  modal.show();
}

function confirmQuantity() {
  const quantity = parseInt(document.getElementById('quantity-input').value);
  
  if (!currentProduct || !quantity || quantity < 1) {
    alert('Please enter a valid quantity');
    return;
  }
  
  const existingItemIndex = cart.findIndex(item => item.productId === currentProduct.id);
  
  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity = quantity;
  } else {
    cart.push({
      productId: currentProduct.id,
      quantity: quantity,
      name: currentProduct.name,
      unitPrice: currentProduct.price
    });
  }
  
  updateCartDisplay();
  renderProducts();
  
  bootstrap.Modal.getInstance(document.getElementById('quantityModal')).hide();
}

function updateCartDisplay() {
  const emptyCart = document.getElementById('empty-cart');
  const cartItems = document.getElementById('cart-items');
  const cartItemsList = document.getElementById('cart-items-list');
  
  if (cart.length === 0) {
    emptyCart.style.display = 'block';
    cartItems.style.display = 'none';
    return;
  }
  
  emptyCart.style.display = 'none';
  cartItems.style.display = 'block';
  
  let total = 0;
  
  cartItemsList.innerHTML = cart.map((item, index) => {
    const itemTotal = item.quantity * item.unitPrice;
    total += itemTotal;
    
    return `
      <div class="mb-3 p-2 border rounded">
        <div class="d-flex justify-content-between align-items-start mb-1">
          <strong>${item.name}</strong>
          <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${index})">
            ✕
          </button>
        </div>
        <div class="d-flex justify-content-between text-muted small">
          <span>Qty: ${item.quantity} × ${formatPrice(item.unitPrice)}</span>
          <strong>${formatPrice(itemTotal)}</strong>
        </div>
      </div>
    `;
  }).join('');
  
  document.getElementById('cart-total').textContent = formatPrice(total);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
  renderProducts();
}

function clearCart() {
  if (confirm('Are you sure you want to clear all items?')) {
    cart = [];
    updateCartDisplay();
    renderProducts();
  }
}

async function addItemsToOrder() {
  if (cart.length === 0) {
    alert('Please add at least one product');
    return;
  }
  
  try {
    for (const item of cart) {
      await OrderService.addItem(orderId, {
        productId: item.productId,
        quantity: item.quantity
      });
    }
    
    alert(`${cart.length} item(s) added to order #${orderId} successfully!`);
    window.location.href = `details.html?id=${orderId}`;
    
  } catch (error) {
    console.error('Error adding items:', error);
    alert('Error adding items to order. Please try again.');
  }
}

function capitalizeCategory(category) {
  const categories = {
    'ELETRONICOS': 'Hair Appliances',
    'COSMETICOS': 'Cosmetics',
    'ACESSORIOS': 'Accessories'
  };
  return categories[category] || category;
}

function formatPrice(cents) {
  if (!cents && cents !== 0) return 'R$ 0,00';
  const reais = cents / 100;
  return `R$ ${reais.toFixed(2).replace('.', ',')}`;
}

function showLoading() {
  loadingDiv.style.display = 'block';
  productsContainer.style.display = 'none';
  emptyState.style.display = 'none';
}

function hideLoading() {
  loadingDiv.style.display = 'none';
}