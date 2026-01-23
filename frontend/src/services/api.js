import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config) => {

    
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response.status === 401){

        }
        return Promise.reject(error);
    }
)
export default api;