// lib/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://event-management-system-production-330a.up.railway.app/api/",
  withCredentials : true
});

export default api;
