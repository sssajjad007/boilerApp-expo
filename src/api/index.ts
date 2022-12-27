import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Alert } from 'react-native';
import { add, remove, retrieve } from '../core/mmkv';

const STORAGE_TOKEN: string = 'token';
const STORAGE_REFRESHTOKEN: string = 'refreshToken';
let TokenStorage: any = null;
export const config: AxiosRequestConfig<any> = {
  baseURL: 'https://vms.delino.com',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'cache-control': 'no-cache',
  },
};
export const authParams = {
  //   apiToken: 'WrZsrR0E8W6uuvNIAFbtesKqcfWEMvrrcImnlmHtS9IRPmXdlqYYGw1ohsQM552M',
  //   clientSecret: 'MZ0TNC0swsGFk6gbfCdvtZHRukZyFntu',
  //   ClientKey: 'sf5fcvQD$6Y8(EH2$GBtAfrqV$zhZvG5',
  DeviceType: 'mobileApp',
};
export const api: AxiosInstance = axios.create(config);
export const apiAuth: AxiosInstance = axios.create(config);

export const isNetworkError = (err: { isAxiosError: any; code: string }) => {
  let result = false;
  if (err.isAxiosError) {
    // err.response
    if (err.code === 'ERR_NETWORK' || err.code === 'ECONNABORTED') {
      result = true;
    } else {
      result = false;
    }
  }
  return result;
};

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (isNetworkError(error)) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(api(originalRequest));
        }, 2500);
      });
    }

    return Promise.reject(error);
  }
);

let queueRequests: any[] = [];
let isRefreshing: boolean = false;

apiAuth.interceptors.response.use(
  function (response) {
    return response;
  },
  function async(error) {
    const originalRequest = error.config;

    if (error.code === 'ERR_CANCELED') {
      return error;
    }

    if (originalRequest.url === '/token/CreateToken' && error.message === 'Network Error') {
      return Promise.reject(error);
    }

    if (isNetworkError(error)) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(apiAuth(originalRequest));
        }, 2500);
      });
    }

    if (error.response?.status === 401 && originalRequest) {
      if (!isRefreshing) {
        refreshTokenRequest();
      }
      return new Promise((resolve) => {
        queueRequests.push((token: string) => {
          originalRequest.headers = { ...originalRequest.headers };
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(axios(originalRequest));
        });
      });
    }
    return Promise.reject(error);
  }
);
// TODO: ask Hamid about this code
// const getAuthorizationHeader = () => (TokenStorage ? getBearer(TokenStorage) : false);
// const getBearer = (token: any) => `Bearer ${token}`;
// apiAuth.interceptors.request.use((request) => {
//   const authorization = getAuthorizationHeader();
//   console.log(TokenStorage);
//   if (authorization && request.headers) {
//     request.headers.Authorization = authorization;
//   }
//   return request;
// });

export const setAuth = ({ token, refreshToken }: { token: string; refreshToken: string }, saveStorage = true) => {
  apiAuth.defaults.headers.Authorization = `Bearer ${token}`;
  TokenStorage = token;
  if (saveStorage) {
    add(STORAGE_TOKEN, token);
    add(STORAGE_REFRESHTOKEN, refreshToken);
  }
};
export const removeAuth = () => {
  apiAuth.defaults.headers.Authorization = '';
  remove(STORAGE_TOKEN);
  remove(STORAGE_REFRESHTOKEN);
};

const refreshTokenRequest = async () => {
  isRefreshing = true;
  try {
    const refToken = retrieve(STORAGE_REFRESHTOKEN, 'string');
    const response = await api.post('token/CreateRefreshToken', {
      ...authParams,
      refreshtoken: refToken,
    });
    if (response) {
      const {
        data: { token, refreshToken },
      } = response;
      setAuth({ token, refreshToken });
      isRefreshing = false;
      refreshQueueRequests(token);

      queueRequests = [];
    } else {
      remove(STORAGE_TOKEN);
      remove(STORAGE_REFRESHTOKEN);
      isRefreshing = false;
      queueRequests = [];
    }
  } catch (e) {
    console.error(e);
    remove(STORAGE_TOKEN);
    remove(STORAGE_REFRESHTOKEN);
    isRefreshing = false;
    queueRequests = [];
    //dispatch(failRefreshTokenAction(true));
    // TODO: ask Hamid about how to handle this error
    // Alert.alert('refresh token faild, reload page is goes here...');
  }
};
function refreshQueueRequests(token: any) {
  if (queueRequests.length === 0) {
    return false;
  }
  queueRequests.map((cb) => cb(token));
  return true;
}
