export interface ApiSuccess<T> {
    success: boolean
    data: T
}
export interface ApiError {
    success: boolean
    code: string
    message: string
    data: null
    statusCode?: number
    name?: string
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;