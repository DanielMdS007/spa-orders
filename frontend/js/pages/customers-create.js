const form = document.getElementById('customer-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

// Event listener 
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Clear previous errors
  Validation.clearFormErrors(form);

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  let hasError = false;

  // Validations
  if (!Validation.required(name)) {
    Validation.showError(nameInput, 'Name is required');
    hasError = true;
  }

  if (!Validation.email(email)) {
    Validation.showError(emailInput, 'Invalid email');
    hasError = true;
  }

  if (hasError) return;

  try {
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Registering...';

    const customerData = {
      name: name,
      email: email
    };

    const customer = await CustomerService.create(customerData);

    // Clean up form
    form.reset();

    // Show success modal
    document.getElementById('customer-id').textContent = `#${customer.id}`;
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();

  } catch (error) {
    console.error('Error creating customer:', error);
    
    // Email that already exists on the database
    if (error.message.includes('UNIQUE constraint failed')) {
      Validation.showError(emailInput, 'Email already exists');
    } else {
      alert('Error registering customer. Please try again.');
    }
  } finally {
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Register Customer';
  }
});