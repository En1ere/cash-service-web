export interface ApiSuccess<T> {
    success: true
    data: T
}
export interface ApiError {
    success: false
    code: string
    message: string
    data: null
    statusCode?: number
    name?: string
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;