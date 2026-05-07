import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import {getUserUUID, updateUUID} from "@/lib/uuid";

const USER_ID_HEADER = "X-User-Id";
const API_URL:string = process.env.NEXT_PUBLIC_API_URL || "";

const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const uuid = getUserUUID();
        config.headers.set(USER_ID_HEADER, uuid);
        return config;
    }
);

apiClient.interceptors.response.use(
    (response) => {
        const { data } = response;

        if (typeof data === "object" && typeof data.uuid === "string") {
            updateUUID(data.uuid);
        }

        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const request = async <T = unknown>(
    endpoint: string,
    options: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> => {
    return await apiClient.request<T>({
        url: endpoint,
        ...options,
    });
};

export const get = <T = unknown>(
    endpoint: string,
    options?: Omit<AxiosRequestConfig, "method">
) => request<T>(endpoint, { ...options, method: "GET" });

export const post = <T = unknown, D = unknown>(
    endpoint: string,
    data?: D,
    options?: Omit<AxiosRequestConfig, "method" | "data">
) => request<T>(endpoint, { ...options, method: "POST", data });

export const put = <T = unknown, D = unknown>(
    endpoint: string,
    data?: D,
    options?: Omit<AxiosRequestConfig, "method" | "data">
) => request<T>(endpoint, { ...options, method: "PUT", data });

export const del = <T = unknown>(
    endpoint: string,
    options?: Omit<AxiosRequestConfig, "method">
) => request<T>(endpoint, { ...options, method: "DELETE" });
