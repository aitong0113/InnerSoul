import axios from "axios";

const API_BASE = "http://localhost:3001";

export const getUsers = () => axios.get(`${API_BASE}/users`);
export const getDiaries = () => axios.get(`${API_BASE}/diaries`);
