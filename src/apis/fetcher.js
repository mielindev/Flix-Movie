import axios from "axios";
import { BASE_LINK, TOKEN_CYBERSOFT } from "../constants";

const fetcher = axios.create({
  baseURL: BASE_LINK,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
  },
});

// Interceptor Api

fetcher.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("user")) {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      config.headers.Authorization = `Bearer ${currentUser.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default fetcher;
