const CustomerService = {
  
  //GET
  async getAll() {
    return await ApiService.get('/customers');
  },

  //GET
  async getById(id) {
    return await ApiService.get(`/customers/${id}`);
  },

  //POST
  async create(customerData) {
    return await ApiService.post('/customers', customerData);
  },

  //DELETE
  async delete(id) {
    return await ApiService.delete(`/customers/delete/${id}`);
  }


};