import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { HttpErrorModel } from '../models/http-error.model';
import type { ResponseErrorModel } from '../models/response-error.model';
import { ERROR_MESSAGE } from '../constants/error-message.constants';

export const requestInterceptor = {
  onFulfilled: (config: InternalAxiosRequestConfig) => {
    return config;
  },
  onRejected: (error: any) => {
    return Promise.reject(error);
  }
};

export const responseInterceptor = {
  onFulfilled: (response: AxiosResponse) => {
    return response;
  },
  onRejected: (error: AxiosError) => {
    const httpError: HttpErrorModel = {
      message: ERROR_MESSAGE.default,
      status: error.response?.status,
      code: error.code
    };

    if (error.response?.data) {
      const data = error.response.data;
      if (typeof data === 'string') {
        httpError.message = data;
      } else {
        const responseError = data as ResponseErrorModel;
        httpError.message = responseError?.message ?? responseError?.error ?? ERROR_MESSAGE.default;
      }
    } else if (error.code === 'ECONNABORTED') {
      httpError.message = ERROR_MESSAGE.timeout;
    } else if (error.request) {
      httpError.message = ERROR_MESSAGE.connection;
    }

    console.error('HTTP Error:', httpError.message, error);

    return Promise.reject(httpError);
  }
};