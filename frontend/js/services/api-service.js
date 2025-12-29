const ApiService = {
  async get(path) {
    try {
      const response = await fetch(API_CONFIG.baseURL + path);
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro na requisição GET:', error);
      throw error;
    }
  },

  async post(path, data) {
    try {
      const response = await fetch(API_CONFIG.baseURL + path, {
        method: 'POST',
        headers: API_CONFIG.headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro na requisição POST:', error);
      throw error;
    }
  },

    async patch(endpoint, data = null) {
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' }
    };
    if (data) {
      options.body = JSON.stringify(data);
    }
    const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, options);
    if (!response.ok) throw new Error('Request failed');
    return await response.json();
  }

  

};