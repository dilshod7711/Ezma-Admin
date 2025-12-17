import axios from "axios";
import authStore from "../store/authStore";

export const API = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_API,
});

API.interceptors.request.use((config) => {
  const access = authStore.getState().access;
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authStore.getState().logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
