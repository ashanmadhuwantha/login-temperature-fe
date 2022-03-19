import axios from "axios";
import LocalStorageService from "../services/storage/localStorageService";

// LocalstorageService
const localStorageService = LocalStorageService.getService();

// Add a request interceptor
export function requestInterceptor() {
  axios.interceptors.request.use(
    config => {
      const token = localStorageService.getAccessToken();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    error => {
      Promise.reject(error);
    }
  );
}
