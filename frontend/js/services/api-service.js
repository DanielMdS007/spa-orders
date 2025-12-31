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

//Api service with improved error handling and logging on post
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
      //That was the main issue, handling 204 no content responses
      if (response.status === 204) {
        return { success: true };
      }
      
      const text = await response.text();
      console.log('Response text:', text);
      
      if (!text || text.trim() === '') {
        return { success: true };
      }
      
      try {
        return JSON.parse(text);
      } catch (parseError) {
        console.warn('Could not parse response as JSON:', text);
        return { success: true, raw: text };
      }
      
    } catch (error) {
      console.error('Error in POST request:', error);
      
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
  },

  async delete(path) {
    try {
      const response = await fetch(API_CONFIG.baseURL + path, {
        method: 'POST',
        headers: API_CONFIG.headers
      });
      
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }
      
      return { success: true };
      
    } catch (error) {
      console.error('Error in DELETE request:', error);
      throw error;
    }
  },

   async deleteHttp(path) {
    try {
      console.log('DELETE HTTP Request to:', API_CONFIG.baseURL + path);
      
      const response = await fetch(API_CONFIG.baseURL + path, {
        method: 'DELETE',
        headers: API_CONFIG.headers
      });
      
      console.log('DELETE Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('DELETE Error response:', errorText);
        throw new Error(`HTTP Error ${response.status}: ${errorText}`);
      }
      
      if (response.status === 204) {
        return { success: true };
      }
      
      const text = await response.text();
      return text ? JSON.parse(text) : { success: true };
      
    } catch (error) {
      console.error('Error in DELETE HTTP request:', error);
      throw error;
    }
  }

};