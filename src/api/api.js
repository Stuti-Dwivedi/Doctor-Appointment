import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9000/api",
});

api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
