import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com", // 之後換成你的後端網址
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
