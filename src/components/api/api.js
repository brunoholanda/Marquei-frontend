import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:3333/api/',
});

// Adiciona um interceptador de requisições
api.interceptors.request.use(config => {
  // Recupera o token do armazenamento local
  const token = localStorage.getItem('authToken');
  
  if (token) {
    // Se o token existe, inclui o cabeçalho de Autorização
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, error => {
  // Em caso de erro na requisição
  return Promise.reject(error);
});

export default api;
