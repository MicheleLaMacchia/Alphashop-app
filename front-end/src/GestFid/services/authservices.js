import axios from "axios";

const server = "http://localhost:5071";
const baseUrl = "/api/clienti";

export const createBasicAuthHeader = (username, password) => {
  return "Basic " + window.btoa(username + ":" + password);
};

export const authUser = (username, password) => {
  return axios.get(`${server}${baseUrl}/auth`, {
    headers: {
      authorization: createBasicAuthHeader(username, password),
    },
  });
};

export const saveUserInfo = (username, password) => {
  sessionStorage.setItem("user", username);

  setupAxiosInterceptors(createBasicAuthHeader(username, password));
};

export const cleanUserInfo = () => {
  sessionStorage.removeItem("user");
};

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
