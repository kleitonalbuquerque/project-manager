import axios from 'axios';

const API_URL = 'http://localhost:3000/projects';

export const getProjects = () => axios.get(API_URL);
export const getProject = (id) => axios.get(`${API_URL}/${id}`);
export const createProject = (project) => axios.post(API_URL, project);
export const updateProject = (id, project) => axios.put(`${API_URL}/${id}`, project);
export const deleteProject = (id) => axios.delete(`${API_URL}/${id}`);
