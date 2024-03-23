import axios from 'axios';
import { BASE_URL } from '../../config'; // Importa BASE_URL de config.js

// Cria uma instância do axios com o baseURL obtido de config.js
const api = axios.create({
  baseURL: BASE_URL, // Utiliza BASE_URL importado
});

// Configura um interceptor de requisição para adicionar o token de autenticação
// ao cabeçalho de Authorization, se o token existir.
api.interceptors.request.use(config => {
  const token = sessionStorage.getItem('authToken');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, error => {
  return Promise.reject(error);
});

export default api;


/*const api = axios.create({
  baseURL: 'https://marquei.com.br/api/',
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

export default api;*/