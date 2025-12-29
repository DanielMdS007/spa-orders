const ProductService = {
    
  //GET
  async getAll(filters = {}) {

    const params = new URLSearchParams();
    
    if (filters.category) {
      params.append('category', filters.category);
    }
    
    if (filters.active !== undefined && filters.active !== null) {
      params.append('active', filters.active);
    }
    
    const queryString = params.toString();
    const path = queryString ? `/products?${queryString}` : '/products';
    
    return await ApiService.get(path);
  },

  //GET
  async getById(id) {
    return await ApiService.get(`/products/${id}`);
  },
  //POST
  async create(product) {
    return await ApiService.post('/products', product);
  },

  //DELETE
  async delete(id) {
    return await ApiService.delete(`/products/delete/${id}`);
  },
  //PATCH
  async patch(id, productData) {
    return await ApiService.patch(`/products/${id}`, productData);
  }
};