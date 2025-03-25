import {BaseQueryFn} from '@reduxjs/toolkit/query';
import axios, {AxiosRequestConfig, AxiosError} from 'axios';

const api = axios.create({
  baseURL: 'https://mock.apidog.com/m1/523540-0-default/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async config => {
  return config;
});

api.interceptors.response.use(
  response => response.data,
  (error: AxiosError) => {
    if (error.response) {
      return Promise.reject({
        message: 'Server error occurred',
        status: error.response.status,
      });
    } else if (error.request) {
      return Promise.reject({message: 'Network error. Please try again.'});
    } else {
      return Promise.reject({message: error.message});
    }
  },
);

const axiosBaseQuery =
  (): BaseQueryFn<AxiosRequestConfig, unknown, unknown> =>
  async ({url, method, data, params}) => {
    try {
      const result = await api({url: `${url}`, method, data, params});
      return {data: result};
    } catch (error: any) {
      return {
        error: error.response ? error.response.data : {message: error.message},
      };
    }
  };

export default axiosBaseQuery;
