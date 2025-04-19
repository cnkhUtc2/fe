import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "https://be-xrlo.onrender.com/api";

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.log("No token found in localStorage or sessionStorage");
    }
    console.log("Authorization header:", config.headers["Authorization"]);
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
