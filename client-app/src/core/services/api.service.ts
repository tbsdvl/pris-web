import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { requestInterceptor, responseInterceptor } from '../interceptors/error.interceptor';
import { httpConfig } from '../config/http.config';

const api = axios.create({
    baseURL: httpConfig.baseURL,
    timeout: httpConfig.timeout,
    withCredentials: true,
});

api.interceptors.request.use(
  requestInterceptor.onFulfilled,
  requestInterceptor.onRejected
);

api.interceptors.response.use(
  responseInterceptor.onFulfilled,
  responseInterceptor.onRejected
);

export const get = async (url: string, token: string): Promise<AxiosResponse<any, any> | undefined> => {
  return await api.get(url, { headers: { Authorization: 'Bearer ' + token }});
}

export const post = async (url: string, config: AxiosRequestConfig) => {
  return await api.post(url, config);
}