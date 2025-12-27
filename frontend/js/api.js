const API_URL = "http://localhost:8080";

async function apiGet(path) {
  const response = await fetch(API_URL + path);
  return response.json();
}

async function apiPost(path, data) {
  const response = await fetch(API_URL + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error("Erro ao criar");
  }
  
  return response.json();
}