const ProductService = {
    
  //GET
  async getAll(filters = {}) {
    // Monta os parâmetros da URL
    const params = new URLSearchParams();
    
    if (filters.category) {
      params.append('category', filters.category);
    }
    
    if (filters.active !== undefined && filters.active !== null) {
      params.append('active', filters.active);
    }
    
    // Se tem parâmetros, adiciona ? na URL
    const queryString = params.toString();
    const path = queryString ? `/products?${queryString}` : '/products';
    
    return await ApiService.get(path);
  },

  //GET
  async getById(id) {
    return await ApiService.get(`/products/${id}`);
  }
};