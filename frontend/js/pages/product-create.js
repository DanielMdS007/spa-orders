const form = document.getElementById('product-form');
const submitBtn = document.getElementById('submit-btn');
const submitText = document.getElementById('submit-text');
const submitSpinner = document.getElementById('submit-spinner');

const nameInput = document.getElementById('product-name');
const categoryInput = document.getElementById('product-category');
const priceInput = document.getElementById('product-price');
const activeInput = document.getElementById('product-active');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  await createProduct();
});

async function createProduct() {
  try {
    setLoadingState(true);

    const priceInReais = parseFloat(priceInput.value);
    const priceInCents = Math.round(priceInReais * 100);

    const productData = {
      name: nameInput.value.trim(),
      category: categoryInput.value,
      price: priceInCents,
      active: activeInput.checked ? 1 : 0
    };

    if (!validateProduct(productData, priceInReais)) {
      return;
    }

    const response = await ProductService.create(productData);

    alert('Product created successfully!');
    window.location.href = 'list.html';

  } catch ( error) {
    console.error('Error creating product:', error);
    
    let errorMessage = 'Error creating product. ';
    
    if (error.message) {
      errorMessage += error.message;
    } else {
      errorMessage += 'Make sure the backend is running on http://localhost:8080';
    }
    
    alert(errorMessage);
  } finally {
    setLoadingState(false);
  }
}

function validateProduct(product, priceInReais) {
  if (!product.name || product.name.length < 3) {
    alert('Product name must have at least 3 characters.');
    nameInput.focus();
    return false;
  }

  if (!product.category) {
    alert('Please select a category.');
    categoryInput.focus();
    return false;
  }

  if (isNaN(priceInReais) || priceInReais <= 0) {
    alert('Please enter a valid price greater than zero.');
    priceInput.focus();
    return false;
  }

  if (product.price <= 0) {
    alert('Price in cents must be greater than zero.');
    priceInput.focus();
    return false;
  }

  return true;
}

function setLoadingState(isLoading) {
  submitBtn.disabled = isLoading;
  
  if (isLoading) {
    submitText.textContent = 'Creating...';
    submitSpinner.style.display = 'inline-block';
  } else {
    submitText.textContent = 'Create Product';
    submitSpinner.style.display = 'none';
  }
}