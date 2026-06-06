/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { BASE_URL, TOKEN } from '../consts.ts';
import { storage } from '../utils/localStorage.ts';
import UserStore from '../store/userStore.ts';

const $api = axios.create({
  baseURL: BASE_URL,
});

const requestInterceptor = (config: InternalAxiosRequestConfig<AxiosResponse>) => {
  const token = storage.get(TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const responseInterceptor = async (error: AxiosError) => {
  const config = error.config;
  //@ts-ignore
  if (error?.response?.status === 401 && error.config && !error.config!._isRetry) {
    //@ts-ignore
    config!._isRetry = true;
    try {
      await UserStore.renew();
      if (config) return $api.request(config);
    } catch (e) {
      console.error(e);
    }
  }
  throw error;
};

$api.interceptors.request.use(requestInterceptor);

$api.interceptors.response.use((config) => config, responseInterceptor);

export default $api;
