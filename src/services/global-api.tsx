import { apiRequest } from "@/utils/api";

export const fetchDataApi = (params: object, token: any, daleman = false, url: string) =>
    apiRequest({
        url: process.env.NEXT_PUBLIC_API_DALEMAN + url,
        method: 'GET',
        path: '/',
        params,
        token: token,
        daleman
    })

export const deletedDataApi = (params: object, token: any, daleman = false, url: string) =>
    apiRequest({
        url: process.env.NEXT_PUBLIC_API_DALEMAN + url,
        method: 'DELETE',
        path: '/',
        params,
        token: token,
        daleman
    })


export const postDataApi = (params: object, token: string, daleman = false, url: string) =>
    apiRequest({
        url: process.env.NEXT_PUBLIC_API_DALEMAN + url,
        method: 'POST',
        path: '/',
        params,
        token: token,
        daleman
    })

export const postDataApiFile = (params: FormData, token: any, daleman = false, url: string) => {
    const MONETIZE_DASHBOARD_API_URL = `${process.env.NEXT_PUBLIC_API_DALEMAN}`; //NEXT_PUBLIC_API_BASE_URL
    const MONETIZE_DASHBOARD_API_URL_DALEMAN = `${process.env.NEXT_PUBLIC_API_DALEMAN}`;
    const CORE_API = `${process.env.NEXT_PUBLIC_API_CORE}/video/api`; //NEXT_PUBLIC_API_BASE_URL
    const API_KEY = `${process.env.NEXT_PUBLIC_API_APIKEY}`;
    const API_KEY_CORE = `${process.env.NEXT_PUBLIC_API_APIKEY_CORE}`;
    const baseUrl = () => {
        if (daleman) {
            return `${MONETIZE_DASHBOARD_API_URL_DALEMAN}`;
        }
        return `${MONETIZE_DASHBOARD_API_URL}`;
    };
    return fetch(`${baseUrl()}` + url, {
        method: "POST",
        headers: {
            "Authorization": token,
            "apikey": `${API_KEY}`
        },
        body: params,
    }).then((response) => response.json())
        .then((data) => data)
        .catch((err) => {
            console.info("[ERROR] Api Request: ", err);
            throw new Error('Auth is requierd to access this resource')
        });

}

export const postApi = (params: FormData, token: any, daleman = false, url: string) => {
    const MONETIZE_DASHBOARD_API_URL = `${process.env.NEXT_PUBLIC_API_DALEMAN}`; //NEXT_PUBLIC_API_BASE_URL
    const MONETIZE_DASHBOARD_API_URL_DALEMAN = `${process.env.NEXT_PUBLIC_API_DALEMAN}`;
    const CORE_API = `${process.env.NEXT_PUBLIC_API_CORE}/video/api`; //NEXT_PUBLIC_API_BASE_URL
    const API_KEY = `${process.env.NEXT_PUBLIC_API_APIKEY}`;
    const API_KEY_CORE = `${process.env.NEXT_PUBLIC_API_APIKEY_CORE}`;
    const baseUrl = () => {
        if (daleman) {
            return `${MONETIZE_DASHBOARD_API_URL_DALEMAN}`;
        }
        return `${MONETIZE_DASHBOARD_API_URL}`;
    };
    return fetch(`${baseUrl()}` + url, {
        method: "POST",
        headers: {
            "Authorization": token,
            "apikey": `${API_KEY}`
        },
        body: params,
    }).then((response) => response.json())
        .then((data) => data)
        .catch((err) => {
            console.info("[ERROR] Api Request: ", err);
            throw new Error('Auth is requierd to access this resource')
        });

}