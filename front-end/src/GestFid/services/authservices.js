import axios from "axios";

const server = "http://localhost:9100";
/*
const createBasicAuthHeader = (username, password) => {
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

export const setupAxiosInterceptors = (basicAuthHeader) => {
  axios.interceptors.request.use((config) => {
    if (isLogged) {
      config.headers.authorization = basicAuthHeader;
    }
    return config;
  });
};
*/

export const USER = "ROLE_USER";
export const ADMIN = "ROLE_ADMIN";

const createJWTAuthToken = (token) => {
  return "Bearer " + token;
};

export const JWTAuthUser = (username, password) => {
  return axios.post(`${server}/auth`, {
    username,
    password,
  });
};

export const saveUserInfo = (username, token) => {
  sessionStorage.setItem("user", username);
  sessionStorage.setItem("token", token);

  //  setupAxiosInterceptors(createJWTAuthToken(token));
};

export const cleanUserInfo = () => {
  sessionStorage.clear();
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

export const setupAxiosInterceptors = (token) => {
  axios.interceptors.request.use((config) => {
    if (isLogged) {
      config.headers.authorization = token;
    }
    return config;
  });
};
