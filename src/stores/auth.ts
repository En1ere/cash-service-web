import { create } from 'zustand'
import { SignInPayload, SignInResponse } from '@/types/dto/signIn.dto'
import { SignUpPayload, SignUpResponse } from '@/types/dto/signUp.dto'
import { UserDto } from '@/types/dto/user.dto'
import { ApiResponse } from '@/types/dto/general-api.dto'
import { post } from '@/lib/api'

export interface AuthState {
    isAuthorized: boolean
    isLoading: boolean
    user: UserDto | null
    signIn: (credentials: SignInPayload) => Promise<ApiResponse<SignInResponse>>
    signOut: () => Promise<void>
    signUp: (credentials: SignUpPayload) => Promise<ApiResponse<SignUpResponse>>
}

export const createAuthStore = () =>
    create<AuthState>((set) => ({
        isAuthorized: false,
        isLoading: false,
        user: null,

        signIn: async (credentials: SignInPayload): Promise<ApiResponse<SignInResponse>> => {
            try {
                set({ isLoading: true })
                const res: ApiResponse<SignInResponse> = await post('/auth/sign-in', credentials)
                if (res.success) {
                    set({ isAuthorized: true })
                }
                return res
            } catch (err: unknown) {
                return err as ApiResponse<SignInResponse>
            } finally {
                set({ isLoading: false })
            }
        },

        signOut: async (): Promise<void> => {
            try {
                set({ isLoading: true })
                const res = await post('/auth/logout')
                if (res.success) {
                    set({ isAuthorized: false, user: null })
                }
            } catch (err) {
                console.log(err)
            } finally {
                set({ isLoading: false })
            }
        },

        signUp: async (credentials: SignUpPayload): Promise<ApiResponse<SignUpResponse>> => {
            try {
                set({ isLoading: true })
                return await post('/auth/sign-up', credentials)
            } catch (err: unknown) {
                return err as ApiResponse<SignUpResponse>
            } finally {
                set({ isLoading: false })
            }
        },
    }))

export type AuthStoreApi = ReturnType<typeof createAuthStore>