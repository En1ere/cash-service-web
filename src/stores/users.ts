import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { usersApi } from '@/lib/users-api'
import type { UserDto } from '@/types/dto/user.dto'
import {toApiError} from "@/lib/api-errors";

export interface UsersState {
    isLoading: boolean
    user: UserDto | null
    getMe: () => Promise<UserDto | null>
    setIsLoading: (loading: boolean) => void
    setUser: (user: UserDto | null) => void
    clear: () => void
}

export const useUsersStore = create<UsersState>()(
    persist(
        (set) => ({
            isLoading: true,
            user: null,

            getMe: async () => {
                try {
                    set({ isLoading: true })

                    const res = await usersApi.getMe()

                    if (res.success) {
                        set({ user: res.data })
                        return res.data
                    }

                    return null
                } catch (error: unknown) {
                    console.error(toApiError(error))
                    return null
                } finally {
                    set({ isLoading: false })
                }
            },

            setIsLoading: (loading) => {
                set({ isLoading: loading })
            },

            setUser: (user) => {
                set({ user })
            },

            clear: () => {
                set({
                    user: null,
                    isLoading: false,
                })
            },
        }),
        {
            name: 'users-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ user: state.user }),
        }
    )
)