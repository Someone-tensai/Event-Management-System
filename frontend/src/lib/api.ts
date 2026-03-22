// lib/api.js
import axios from "axios";
const api_url =
  "https://event-management-system-dkri.onrender.com/api/";
const api = axios.create({
  baseURL: api_url,
  withCredentials: true,
});

export default api;
