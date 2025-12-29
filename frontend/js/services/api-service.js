const ApiService = {
  async get(path) {
    try {
      const response = await fetch(API_CONFIG.baseURL + path);
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }
      const text = await response.text();
      return text ? JSON.parse(text) : null;
    } catch (error) {
      console.error('Error in GET request:', error);
      throw error;
    }
  },

  async post(path, data) {
    try {
      console.log('POST Request to:', API_CONFIG.baseURL + path);
      console.log('Data:', data);
      
      const response = await fetch(API_CONFIG.baseURL + path, {
        method: 'POST',
        headers: API_CONFIG.headers,
        body: JSON.stringify(data)
      });
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP Error ${response.status}: ${errorText}`);
      }
      
      const text = await response.text();
      console.log('Response text:', text);
      
      return text ? JSON.parse(text) : { success: true };
      
    } catch (error) {
      console.error('Error in POST request:', error);
      
      // Handle CORS errors specifically
      if (error.message === 'Failed to fetch') {
        throw new Error('Cannot connect to server. Make sure the backend is running on http://localhost:8080 and CORS is configured.');
      }
      
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
    const text = await response.text();
    return text ? JSON.parse(text) : { success: true };
  }
};