import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { requestInterceptor, responseInterceptor } from '../interceptors/error.interceptor';
import { httpConfig } from '../config/http.config';

const api = axios.create({
    baseURL: httpConfig.baseURL,
    withCredentials: httpConfig.withCredentials,
    timeout: httpConfig.timeout,
});

api.interceptors.request.use(
  requestInterceptor.onFulfilled,
  requestInterceptor.onRejected
);

api.interceptors.response.use(
  responseInterceptor.onFulfilled,
  responseInterceptor.onRejected
);

export const get = async (url: string): Promise<AxiosResponse<any, any> | undefined> => {
  return await api.get(url);
}

export const post = async (url: string, config: AxiosRequestConfig) => {
  return await api.post(url, config);
}