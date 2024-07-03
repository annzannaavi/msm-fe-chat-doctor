import axios, {AxiosRequestConfig} from "axios";

export const MONETIZE_DASHBOARD_API_URL = `${process.env.NEXT_PUBLIC_API_DALEMAN}`; //NEXT_PUBLIC_API_BASE_URL
export const MONETIZE_DASHBOARD_API_URL_DALEMAN = `${process.env.NEXT_PUBLIC_API_DALEMAN}`;
export const CORE_API = `${process.env.NEXT_PUBLIC_API_CORE}/video/api`; //NEXT_PUBLIC_API_BASE_URL
export const API_KEY = `${process.env.NEXT_PUBLIC_API_APIKEY}`;
export const API_KEY_CORE = `${process.env.NEXT_PUBLIC_API_APIKEY_CORE}`;

interface apiRequestType {
  url?: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  timeout?: number;
  headers?: object;
  data?: object;
  params?: object;
  path: string;
  apiVersion?: string;
  noDefaultParams?: boolean;
  daleman?: boolean;
  token?: string | undefined;
  paramsKey?: string;
}


export const apiRequest = async ({
  url,
  method,
  timeout,
  headers,
  data,
  params,
  path,
  apiVersion,
  noDefaultParams,
  daleman = false,
  token,
  paramsKey
}: apiRequestType) => {
  const baseUrl = () => {
    if (url) {
      return `${url}`;
    }
  };

  const defaultParams = {};
  let mergedParams = { ...defaultParams, ...params };

  const config: AxiosRequestConfig = {
    method,
    url: `${baseUrl()}`+path, // add path soon
    timeout: 10000,
    params: mergedParams,
    headers: {
      token: token ,
      Authorization: `Bearer ${token}`,
    },
  };

  if (headers) {
    config.headers = { ...config.headers, ...headers };
  }

  if (data) {
    config.data = data;
  }

  if (timeout) {
    config.timeout = timeout;
  }

  if (noDefaultParams) {
    config.params = params;
  }

  console.log({config})
  return axios(config)
    .then((res) => res)
    .catch((err) => {
      console.info("[ERROR] Api Request: ", err);
      // throw err;
      throw new Error('Auth is requierd to access this resource')
    });
};
