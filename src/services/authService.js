import axios from "axios";
import LocalStorageService from "./storage/localStorageService";
export const authService = {
  register,
  login,
  getTemp,
  logout
};

const API_URL = process.env.REACT_APP_API_URL;

function login(email, password) {
  return axios
    .post(API_URL + `auth/login`, { email: email, password: password })
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("access_token", user.data.access_token);
      localStorage.setItem("refresh_token", user.data.refresh_token);
      return user;
    })
    .catch(function (error) {
      return error.response;
    });
}

function register(user) {

  return axios({
    method: "post",
    url: API_URL + `auth/signup`,
    data: user,
  })
    .then(function (response) {
      return response;
    })
    .catch((error) => {
      return error;
    });
}


function getTemp(hottest) {

  return axios({
    method: "get",
    url: API_URL + `auth/getTemp`,
    params:{
      hottest: hottest
    }
  })
    .then(function (response) {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

function logout() {
  return axios
    .get(API_URL + `auth/logout`)
    .then((user) => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("first_name");
      localStorage.removeItem("last_name");
      localStorage.removeItem("organization_name");
      LocalStorageService.clearToken();
      return user;
    })
    .catch(function (error) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("first_name");
      localStorage.removeItem("last_name");
      localStorage.removeItem("organization_name");
      LocalStorageService.clearToken();
      return error.response;
    });
}
