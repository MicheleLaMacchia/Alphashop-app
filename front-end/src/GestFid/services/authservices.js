import axios from "axios";

export const saveUserInfo = (username, password) => {
  sessionStorage.setItem("user", username);

  let basicAuthHeader = "Basic " + window.btoa(username + ":" + password);

  setupAxiosInterceptors(basicAuthHeader);
};

export const cleanUserInfo = () => sessionStorage.removeItem("user");

export const getUserInfo = () => sessionStorage.getItem("user");

export const isLogged = () => {
  let user = getUserInfo();
  if (user === null) {
    return false;
  } else {
    return true;
  }
};

export const setupAxiosInterceptors = (basicAuthHeader) => {
  axios.interceptors.request.use((config) => {
    if (isLogged) {
      config.headers.authorization = basicAuthHeader;
    }
    return config;
  });
};
