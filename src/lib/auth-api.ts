import { post } from '@/lib/api'
import type { ApiResponse } from '@/types/dto/general-api.dto'
import type { SignInPayload, SignInResponse } from '@/types/dto/signIn.dto'
import type { SignUpPayload, SignUpResponse } from '@/types/dto/signUp.dto'
import type { RefreshTokenPayload, RefreshTokenResponse } from '@/lib/api'

export const authApi = {
    signIn(credentials: SignInPayload): Promise<ApiResponse<SignInResponse>> {
        return post<SignInResponse, SignInPayload>('/auth/sign-in', credentials)
    },

    signUp(credentials: SignUpPayload): Promise<ApiResponse<SignUpResponse>> {
        return post<SignUpResponse, SignUpPayload>('/auth/sign-up', credentials)
    },

    signOut(): Promise<ApiResponse<unknown>> {
        return post<unknown>(
            '/auth/sign-out',
            undefined,
            {
                skipAuthRefresh: true,
            }
        )
    },

    refreshToken(payload: RefreshTokenPayload): Promise<ApiResponse<RefreshTokenResponse>> {
        return post<RefreshTokenResponse, RefreshTokenPayload>(
            '/auth/refresh-token',
            payload,
            {
                skipAuthHeader: true,
                skipAuthRefresh: true,
            }
        )
    },
}