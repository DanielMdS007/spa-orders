const PaymentService = {
    
  // GET 
  async getAll() {
    return await ApiService.get('/payments');
  },

  // GET 
  async getById(id) {
    return await ApiService.get(`/payments/${id}`);
  },

  // POST 
  async create(paymentData) {
    return await ApiService.post('/payments', paymentData);
  },
  
  async getByOrderId(orderId) {
  const response = await fetch(`${API_BASE_URL}/payments?orderId=${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error('Payment not found');
  }
  
  return await response.json();
}
};