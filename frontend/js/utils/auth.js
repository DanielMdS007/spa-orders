// Autenticantion functions

/**
 * verify if user is logged in
 * @returns {boolean}
 */
function isLoggedIn() {
  // Check if there is a user in localStorage
  const user = localStorage.getItem('user');
  return user !== null;
}

/**
 * Save user data to localStorage
 * @param {Object} userData - { name, email }
 */
function saveUser(userData) {
  localStorage.setItem('user', JSON.stringify(userData));
}

/**
 * Remove user data (logout)
 */
function logout() {
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

/**
 * Get logged-in user data
 * @returns {Object|null}
 */
function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

/**
 * Verify login before redirecting to profile
 * @param {Event} event
 */
function checkLoginAndRedirect(event) {
  event.preventDefault(); // Prevent default link behavior
  if (isLoggedIn()) {
    // If logged in, go to profile
    window.location.href = 'pages/profile/index.html';
  } else {
    // Not logged in, go to signup/login
    window.location.href = 'pages/auth/login.html';
  }
}