// lib/api.js
import axios from "axios";
const api_url =
  "https://event-management-system-production-330a.up.railway.app/api/";
const api = axios.create({
  baseURL: api_url,
  withCredentials: true,
});

export default api;
