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
  }
};