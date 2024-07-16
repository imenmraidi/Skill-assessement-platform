import axios from "axios";
import { globalNavigate } from "./CustomNavigate";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  credentials: "include",
});

api.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await api.post("/refreshToken");
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data.recId,
            fullname: response.data.fullname,
          })
        );
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return api(originalRequest);
      } catch (error) {
        if (error.response.status === 403) {
          originalRequest._retry = false;
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          alert("session expirée");
          globalNavigate("/");
          return Promise.reject(error);
        } else if (error.response.status === 500) {
          alert("une erreur s'est produite");
          originalRequest._retry = true;
        }
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
