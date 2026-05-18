import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios'

import { useAuthStore } from '@/stores/auth'
import { useUsersStore } from '@/stores/users'
import { getUserUUID, updateUUID } from '@/lib/uuid'
import {
    getAccessToken,
    getRefreshToken,
    setAuthTokens,
    clearTokens,
} from '@/lib/tokens'
import type { ApiError, ApiResponse, ApiSuccess } from '@/types/dto/general-api.dto'

const USER_ID_HEADER = 'X-User-Id'
const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

export interface RefreshTokenPayload {
    token: string
}

export interface RefreshTokenResponse {
    accessToken: string
    refreshToken: string
}

const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
})

let refreshPromise: Promise<string> | null = null

const isApiSuccess = <T>(response: ApiResponse<T>): response is ApiSuccess<T> => {
    return response.success
}

const isApiError = <T>(response: ApiResponse<T>): response is ApiError => {
    return !response.success
}

const clearSession = (): void => {
    clearTokens()
    useAuthStore.getState().setIsAuthorized(false)
    useUsersStore.getState().clear()
}

const normalizeError = (error: unknown): ApiError => {
    if (axios.isAxiosError<ApiError>(error)) {
        const responseData = error.response?.data

        if (responseData && isApiError(responseData)) {
            return {
                ...responseData,
                statusCode: responseData.statusCode ?? error.response?.status,
                name: responseData.name ?? error.name,
            }
        }

        return {
            success: false,
            code: 'NETWORK_ERROR',
            message: error.message || 'Network Error',
            data: null,
            statusCode: error.response?.status,
            name: error.name,
        }
    }

    if (error instanceof Error) {
        return {
            success: false,
            code: 'UNKNOWN_ERROR',
            message: error.message,
            data: null,
            name: error.name,
        }
    }

    return {
        success: false,
        code: 'UNKNOWN_ERROR',
        message: 'Unknown error',
        data: null,
    }
}

const syncUuidFromHeaders = (response: AxiosResponse<unknown>): void => {
    const nextUuid = response.headers[USER_ID_HEADER.toLowerCase()]

    if (typeof nextUuid === 'string' && nextUuid.length > 0) {
        updateUUID(nextUuid)
    }
}

const syncTokensFromPayload = (
    response: AxiosResponse<ApiResponse<unknown>>
): void => {
    const payload = response.data

    if (!isApiSuccess(payload) || typeof payload.data !== 'object' || payload.data === null) {
        return
    }

    const maybeTokens = payload.data as Partial<RefreshTokenResponse>

    if (
        typeof maybeTokens.accessToken === 'string' &&
        typeof maybeTokens.refreshToken === 'string'
    ) {
        setAuthTokens(maybeTokens.accessToken, maybeTokens.refreshToken)
    }
}

const refreshAccessToken = async (): Promise<string> => {
    if (!refreshPromise) {
        const refreshToken = getRefreshToken()

        if (!refreshToken) {
            clearSession()
            throw {
                success: false,
                code: 'NO_REFRESH_TOKEN',
                message: 'No refresh token',
                data: null,
            } satisfies ApiError
        }

        refreshPromise = axios
            .post<ApiResponse<RefreshTokenResponse>>(
                `${API_URL}/auth/refresh-token`,
                { token: refreshToken } satisfies RefreshTokenPayload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                syncUuidFromHeaders(response)

                const payload = response.data

                if (isApiError(payload)) {
                    throw payload
                }

                setAuthTokens(payload.data.accessToken, payload.data.refreshToken)
                useAuthStore.getState().setIsAuthorized(true)

                return payload.data.accessToken
            })
            .catch((error: unknown) => {
                clearSession()
                throw normalizeError(error)
            })
            .finally(() => {
                refreshPromise = null
            })
    }

    return refreshPromise
}

apiClient.interceptors.request.use((config) => {
    config.headers = config.headers ?? {}
    config.headers[USER_ID_HEADER] = getUserUUID()

    if (!config.skipAuthHeader) {
        const token = getAccessToken()

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
    }

    return config
})

apiClient.interceptors.response.use(
    (response) => {
        syncUuidFromHeaders(response)
        syncTokensFromPayload(response as AxiosResponse<ApiResponse<unknown>>)

        return response
    },
    async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config

        if (!originalRequest) {
            return Promise.reject(normalizeError(error))
        }

        const isUnauthorized = error.response?.status === 401
        const shouldSkipRefresh = originalRequest.skipAuthRefresh === true

        if (
            isUnauthorized &&
            !originalRequest._retry &&
            !shouldSkipRefresh
        ) {
            originalRequest._retry = true

            try {
                const newAccessToken = await refreshAccessToken()

                originalRequest.headers = originalRequest.headers ?? {}
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

                return apiClient(originalRequest)
            } catch (refreshError: unknown) {
                return Promise.reject(normalizeError(refreshError))
            }
        }

        return Promise.reject(normalizeError(error))
    }
)

const unwrapResponse = <T>(response: ApiResponse<T>): ApiResponse<T> => {
    if (isApiError(response)) {
        throw response
    }

    return response
}

const request = async <T = unknown>(
    endpoint: string,
    options: AxiosRequestConfig = {}
): Promise<ApiResponse<T>> => {
    try {
        const response = await apiClient.request<ApiResponse<T>>({
            url: endpoint,
            ...options,
        })

        return unwrapResponse(response.data)
    } catch (error: unknown) {
        if (options.skipErrorNormalization) {
            return Promise.reject(error)
        }

        return Promise.reject(normalizeError(error))
    }
}

export const get = <T = unknown>(
    endpoint: string,
    options?: Omit<AxiosRequestConfig, 'method'>
): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, { ...options, method: 'GET' })
}

export const post = <T = unknown, D = unknown>(
    endpoint: string,
    data?: D,
    options?: Omit<AxiosRequestConfig, 'method' | 'data'>
): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, { ...options, method: 'POST', data })
}

export const put = <T = unknown, D = unknown>(
    endpoint: string,
    data?: D,
    options?: Omit<AxiosRequestConfig, 'method' | 'data'>
): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, { ...options, method: 'PUT', data })
}

export const del = <T = unknown>(
    endpoint: string,
    options?: Omit<AxiosRequestConfig, 'method'>
): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, { ...options, method: 'DELETE' })
}

export { apiClient, clearSession }