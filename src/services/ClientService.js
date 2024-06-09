import axios from 'axios';

const API_URL = 'http://localhost:3000/clients';

export const getClients = () => axios.get(API_URL);
export const getClient = (id) => axios.get(`${API_URL}/${id}`);
export const createClient = (client) => axios.post(API_URL, client);
export const updateClient = (id, client) => axios.put(`${API_URL}/${id}`, client);
export const deleteClient = (id) => axios.delete(`${API_URL}/${id}`);
