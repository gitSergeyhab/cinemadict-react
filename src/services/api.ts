import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';


const BASE_URL = 'https://15.ecmascript.pages.academy/cinemaddict';
const TIMEOUT = 5000;
const AUTHORIZATION = 'Basic |,,/_Black_Metal_|../';


export const createAPI = (): AxiosInstance => {
  const api = axios.create({baseURL: BASE_URL, timeout: TIMEOUT});
  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      config.headers['Authorization'] = AUTHORIZATION;
      return config;
    },
  );

  return api;
};
