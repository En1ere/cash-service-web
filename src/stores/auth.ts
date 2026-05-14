import { create } from 'zustand'
import { SignInPayload, SignInResponse } from '@/types/dto/signIn.dto'
import { SignUpPayload, SignUpResponse } from '@/types/dto/signUp.dto'
import { ApiResponse } from '@/types/dto/general-api.dto'
import { post } from '@/lib/api'
import {createJSONStorage, persist} from "zustand/middleware";

export interface AuthState {
    isAuthorized: boolean
    isLoading: boolean
    signIn: (credentials: SignInPayload) => Promise<ApiResponse<SignInResponse>>
    signOut: () => Promise<ApiResponse<unknown>>
    signUp: (credentials: SignUpPayload) => Promise<ApiResponse<SignUpResponse>>
    setIsAuthorized: (authorized: boolean) => void
    setIsLoading: (loading: boolean) => void
    checkAuth: () => boolean
}

export const createAuthStore = () =>
    create<AuthState>()(
        persist(
            (set) => ({
                isAuthorized: false,
                isLoading: true,

                signIn: async (credentials: SignInPayload): Promise<ApiResponse<SignInResponse>> => {
                    try {
                        set({isLoading: true})
                        const res: ApiResponse<SignInResponse> = await post('/auth/sign-in', credentials)
                        if (res.success) {
                            set({isAuthorized: true})
                        }
                        return res
                    } catch (err: unknown) {
                        return err as ApiResponse<SignInResponse>
                    } finally {
                        set({isLoading: false})
                    }
                },
                signOut: async (): Promise<ApiResponse<unknown>> => {
                    try {
                        set({isLoading: true})
                        const res = await post('/auth/sign-out')
                        if (res.success) {
                            set({isAuthorized: false})
                        }
                        return res
                    } catch (err) {
                        return err as ApiResponse<unknown>
                    } finally {
                        set({isLoading: false})
                    }
                },
                signUp: async (credentials: SignUpPayload): Promise<ApiResponse<SignUpResponse>> => {
                    try {
                        set({isLoading: true})
                        return await post('/auth/sign-up', credentials)
                    } catch (err: unknown) {
                        return err as ApiResponse<SignUpResponse>
                    } finally {
                        set({isLoading: false})
                    }
                },
                setIsAuthorized: (authorized: boolean) => {
                    set({ isAuthorized: authorized })
                },
                setIsLoading: (loading: boolean) => {
                    set({ isLoading: loading })
                },
                checkAuth: () => {
                    const token = localStorage.getItem('accessToken')
                    set({ isAuthorized: !!token })
                    return !!token
                },
            }),
            {
                name: 'auth-storage',
                storage: createJSONStorage(() => localStorage),
                partialize: (state) => ({ isAuthorized: state.isAuthorized })
            }
        )
    )

export type AuthStoreApi = ReturnType<typeof createAuthStore>