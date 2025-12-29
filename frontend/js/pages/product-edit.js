const form = document.getElementById('product-form');
const submitBtn = document.getElementById('submit-btn');
const submitText = document.getElementById('submit-text');
const submitSpinner = document.getElementById('submit-spinner');

const nameInput = document.getElementById('product-name');
const categoryInput = document.getElementById('product-category');
const priceInput = document.getElementById('product-price');
const activeInput = document.getElementById('product-active');

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

if (!productId) {
  alert('Product not found');
  window.location.href = 'list.html';
}

document.addEventListener('DOMContentLoaded', loadProduct);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  await updateProduct();
});

async function loadProduct() {
  try {
    setLoadingState(true);

    const product = await ProductService.getById(productId);

    nameInput.value = product.name;
    categoryInput.value = product.category;
    priceInput.value = (product.price / 100).toFixed(2);
    activeInput.checked = product.active === 1;

  } catch (error) {
    alert('Error loading product');
    window.location.href = 'list.html';
  } finally {
    setLoadingState(false);
  }
}

async function updateProduct() {
  try {
    setLoadingState(true);

    const priceInReais = parseFloat(priceInput.value);
    const priceInCents = Math.round(priceInReais * 100);

    const patchData = {
      name: nameInput.value.trim(),
      category: categoryInput.value,
      price: priceInCents,
      active: activeInput.checked ? 1 : 0
    };

    if (!validateProduct(patchData, priceInReais)) {
      return;
    }

    await ProductService.patch(productId, patchData);

    alert('Product updated successfully!');
    window.location.href = 'list.html';

  } catch (error) {
    alert('Error updating product');
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
    submitText.textContent = 'Updating...';
    submitSpinner.style.display = 'inline-block';
  } else {
    submitText.textContent = 'Update Product';
    submitSpinner.style.display = 'none';
  }
}
