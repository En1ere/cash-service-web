import 'axios'

declare module 'axios' {
    export interface AxiosRequestConfig {
        skipAuthHeader?: boolean
        skipAuthRefresh?: boolean
        skipErrorNormalization?: boolean
        _retry?: boolean
    }
}