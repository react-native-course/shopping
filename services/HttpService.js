import axios from 'axios';
//constants
import { BASE_URL } from '../constants/ApiUrls';

const apiService = axios.create({
  baseURL: BASE_URL
});

const requestInterceptor = (config) => {
  // config.headers['Authorization'] = `Bearer ${getCookie('ACCESS_TOKEN')}`;
  return config;
};

const requestInterceptorError = (error) => {
  console.log('response interceptor error', error);
  return Promise.reject(error);
};

const responseInterceptor = (response) => {
  // console.log('response interceptor', response);
  return response;
};

const responseInterceptorError = (error) => {
  console.log('response interceptor error', error.response);
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

export { apiService };
