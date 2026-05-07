import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
    AxiosError,
} from "axios";
import { getUserUUID, updateUUID } from "@/lib/uuid";
import {
    getAccessToken,
    getRefreshToken,
    setAuthTokens,
    clearTokens
} from "@/lib/tokens";

const USER_ID_HEADER = "X-User-Id";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
    config.headers[USER_ID_HEADER] = getUserUUID();

    const token = getAccessToken();
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
});

apiClient.interceptors.response.use(
    (response) => {
        const { data } = response.data;

        if (data?.accessToken) {
            setAuthTokens(
                data.accessToken,
                data.refreshToken
            );
        }

        if(typeof data?.uuid === "string") {
            updateUUID(data.uuid);
        }

        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = getRefreshToken();
                if (!refreshToken) throw new Error('No refresh token');

                const { data } = await axios.post(`${API_URL}/auth/refresh-token`,
                    { token: refreshToken },
                    { headers: { "Content-Type": "application/json" } }
                );

                setAuthTokens(data.accessToken, data.refreshToken);

                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return apiClient(originalRequest);
            } catch {
                clearTokens();
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

const request = async <T = unknown>(
    endpoint: string,
    options: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> => apiClient.request<T>({ url: endpoint, ...options });

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
