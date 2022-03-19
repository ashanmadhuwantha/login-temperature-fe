
import axios from "axios";

import { authService } from "./authService";

import LocalStorageService from "../services/storage/localStorageService";

const API_URL = process.env.REACT_APP_API_URL;
console.log(process.env.REACT_APP_API_URL)

const localStorageService = LocalStorageService.getService();

//Add a response interceptor

export function responseInterceptor() {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },

    function (error) {
      const originalRequest = error.config;

      if (
        error.response.status === 401 &&
        originalRequest.url === API_URL + `auth/refresh-token`
      ) {
        localStorage.removeItem("access_token");
        localStorageService.clearToken();
        return Promise.reject(error);
      }
      if (
        error.response.status === 400 &&
        originalRequest.url === API_URL + `auth/refresh-token`
      ) {
        localStorage.removeItem("access_token");
        localStorageService.clearToken();
        return Promise.reject(error);
      }
      if (
        error.response.status === 500 &&
        originalRequest.url === API_URL + `auth/refresh-token`
      ) {
        localStorage.removeItem("access_token");
        localStorageService.clearToken();
        return Promise.reject(error);
      }
      if (
        error.response.status === 401 &&
        originalRequest.url === API_URL + `auth/login`
      ) {
        localStorage.removeItem("access_token");
        return Promise.reject(error);
      }

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refresh_token = localStorageService.getRefreshToken();

        return axios
          .post(API_URL + `auth/refresh-token`, {
            refresh_token: refresh_token,
          })
          .then((res) => {
            if (res.status === 200) {
              localStorageService.setToken(res.data);
              axios.defaults.headers.common["Authorization"] =
                "Bearer " + localStorageService.getAccessToken();
              return axios(originalRequest);
            }
          });
      }
      return Promise.reject(error);
    }
  );
}
