import type {ApiError} from "@/types/dto/general-api.dto";

export const toApiError = (error: unknown): ApiError => {
    if (
        typeof error === 'object' &&
        error !== null &&
        'success' in error &&
        'code' in error &&
        'message' in error
    ) {
        return error as ApiError
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