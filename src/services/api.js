import axios from "axios";

const getHeader = () => {
  let token = window.localStorage.getItem("auth_token");

  if (token == null) {
    return {};
  }
  return {
    Authorization: "Bearer " + token,
    Accept: "application/json",
  };
};

const api = axios.create({
  baseURL: "http://192.168.1.53:8888/api",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const headers = getHeader();
    config.headers = {
      ...config.headers,
      ...headers,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
