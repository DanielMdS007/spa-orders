const OrderService = {
  //GET all orders with optional filters
  async getAll(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `/orders?${queryString}` : '/orders';
    return await ApiService.get(url);
  },
  //GET order by id
  async getById(id) {
    return await ApiService.get(`/orders/${id}`);
  },
  //POST order
  async create(orderData) {
    return await ApiService.post('/orders', orderData);
  },
  //POST order item
  async addItem(orderId, itemData) {
    return await ApiService.post(`/orders/${orderId}`, itemData);
  },

  //PATCH order status
  async cancel(orderId) {
    return await ApiService.patch(`/orders/${orderId}/cancel`);
  }

};
