import axios from 'axios';

const API_URL = 'http://localhost:3000/activities';

export const getActivities = () => axios.get(API_URL);
export const getActivity = (id) => axios.get(`${API_URL}/${id}`);
export const createActivity = (activity) => axios.post(API_URL, activity);
export const updateActivity = (id, activity) => axios.put(`${API_URL}/${id}`, activity);
export const deleteActivity = (id) => axios.delete(`${API_URL}/${id}`);
