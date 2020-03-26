import axios from 'axios';
//constants
import { APP_CONFIG } from './Config';

const apiService = axios.create({
  baseURL: APP_CONFIG.API.base
});

const AuthApiServie = axios.create({
  baseURL: APP_CONFIG.API.firbaseAuthBase
});

//app request interceptors
const requestInterceptor = (config) => {
  // config.headers['Authorization'] = `Bearer ${getCookie('ACCESS_TOKEN')}`;
  return config;
};

const requestInterceptorError = (error) => {
  console.log('request interceptor error', error);
  return Promise.reject(error);
};

//auth request interceptors
const authRequestInterceptor = (config) => {
  return config;
};

const authRequestInterceptorError = (error) => {
  console.log('auth request interceptor error', error);
  return Promise.reject(error);
};

//app response interceptors
const responseInterceptor = (response) => {
  // console.log('response interceptor', response);
  return response;
};

const responseInterceptorError = (error) => {
  console.log('response interceptor error', error.response);
  return Promise.reject(error);
};

//auth response interceptors
const authResponseInterceptor = (response) => {
  // console.log('response interceptor', response);
  return response;
};

const authResponseInterceptorError = (error) => {
  console.log('auth response interceptor error', error.response);
  return Promise.reject(error);
};

apiService.interceptors.request.use(
  requestInterceptor,
  requestInterceptorError
);

apiService.interceptors.response.use(
  responseInterceptor,
  responseInterceptorError
);

AuthApiServie.interceptors.request.use(
  authRequestInterceptor,
  authRequestInterceptorError
);

AuthApiServie.interceptors.response.use(
  authResponseInterceptor,
  authResponseInterceptorError
);

export { apiService, AuthApiServie };
