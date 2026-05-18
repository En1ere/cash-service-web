import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { authApi } from '@/lib/auth-api'
import type { ApiResponse } from '@/types/dto/general-api.dto'
import type { SignInPayload, SignInResponse } from '@/types/dto/signIn.dto'
import type { SignUpPayload, SignUpResponse } from '@/types/dto/signUp.dto'
import {toApiError} from "@/lib/api-errors";

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

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthorized: false,
            isLoading: true,

            signIn: async (credentials) => {
                try {
                    set({ isLoading: true })

                    const res = await authApi.signIn(credentials)

                    if (res.success) {
                        set({ isAuthorized: true })
                    }

                    return res
                } catch (error: unknown) {
                    return toApiError(error)
                } finally {
                    set({ isLoading: false })
                }
            },

            signOut: async () => {
                try {
                    set({ isLoading: true })

                    const res = await authApi.signOut()

                    if (res.success) {
                        set({ isAuthorized: false })
                    }

                    return res
                } catch (error: unknown) {
                    return toApiError(error)
                } finally {
                    set({ isLoading: false })
                }
            },

            signUp: async (credentials) => {
                try {
                    set({ isLoading: true })
                    return await authApi.signUp(credentials)
                } catch (error: unknown) {
                    return toApiError(error)
                } finally {
                    set({ isLoading: false })
                }
            },

            setIsAuthorized: (authorized) => {
                set({ isAuthorized: authorized })
            },

            setIsLoading: (loading) => {
                set({ isLoading: loading })
            },

            checkAuth: () => {
                if (typeof window === 'undefined') {
                    return false
                }

                const token = localStorage.getItem('accessToken')
                const isAuthorized = !!token
                set({ isAuthorized })
                return isAuthorized
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ isAuthorized: state.isAuthorized }),
        }
    )
)