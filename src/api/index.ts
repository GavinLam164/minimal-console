import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Notification } from 'element-ui';
import qs from 'qs';
import Router from '@/router/index';

const instance = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

instance.defaults.transformRequest = [
  (param, headers) => {
    switch (headers['Content-Type']) {
      case 'application/x-www-form-urlencoded':
        return qs.stringify(param);
      case 'application/json':
        return JSON.stringify(param);
      default:
        return param;
    }
  },
];

instance.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
};


instance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const headers = { ...config.headers };
    headers.token = window.localStorage.getItem('token') || '';
    return {
      ...config,
      headers,
    };
  },
  (err) => Promise.reject(err),
);

instance.interceptors.response.use((resp: AxiosResponse): AxiosResponse => {
  const { data } = resp;
  if (data.code !== 200) {
    Notification.error(data.msg);
    throw new Error(data.msg);
  }
  return data;
}, (err) => {
  Notification.closeAll();
  if (err.request.status === 401) {
    Notification.error('登录超时');
    Router.push({
      name: 'Login',
    });
  }
  Promise.reject(err);
});

export const get = (url: string, params?: any, option?: AxiosRequestConfig) => instance.get(url, { params, ...option });
export const post = (url: string, params?: any, option?: AxiosRequestConfig) => instance.post(url, params, option);
export default {};
