const Validation = {
  required(value) {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim() !== '';
    return true;
  },

  email(email) {
    if (!email) return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  positiveNumber(value) {
    const num = parseFloat(value);
    return !isNaN(num) && num > 0;
  },

  positiveInteger(value) {
    const num = parseInt(value);
    return !isNaN(num) && num > 0 && Number.isInteger(num);
  },

  minLength(value, min) {
    return value && value.length >= min;
  },

  showError(input, message) {
    input.classList.add('is-invalid');
    
    const existingError = input.parentElement.querySelector('.invalid-feedback');
    if (existingError) {
      existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    input.parentElement.appendChild(errorDiv);
  },

  clearError(input) {
    input.classList.remove('is-invalid');
    const errorDiv = input.parentElement.querySelector('.invalid-feedback');
    if (errorDiv) {
      errorDiv.remove();
    }
  },

  clearFormErrors(form) {
    const inputs = form.querySelectorAll('.is-invalid');
    inputs.forEach(input => this.clearError(input));
  }
};