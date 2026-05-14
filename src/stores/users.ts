import { UserDto } from "@/types/dto/user.dto";
import { ApiResponse } from "@/types/dto/general-api.dto";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as api from "@/lib/api";

export interface UsersState {
    isLoading: boolean
    user: UserDto | null
    getMe: () => Promise<UserDto | null>
    setIsLoading: (loading: boolean) => void
    clear: () => void
}

export const createUsersStore = () =>
    create<UsersState>()(
        persist(
            (set, get) => ({
                isLoading: true,
                user: null,

                getMe: async () => {
                    try {
                        set({ isLoading: true })
                        const res: ApiResponse<UserDto> = await api.get('/users/me')

                        if (res.success) {
                            set({ user: res.data })
                        }

                        return get().user;
                    }
                    catch (err) {
                        console.error(err)
                        return null
                    }
                    finally {
                        set({ isLoading: false })
                    }
                },
                setIsLoading: (loading: boolean) => {
                    set({ isLoading: loading })
                },
                clear: () => {
                    set({ user: null })
                    set({ isLoading: false })
                }
            }),
            {
                name: 'users-storage',
                storage: createJSONStorage(() => localStorage),
                partialize: (state) => ({ user: state.user })
            }
        )
    )

export type UsersStoreApi = ReturnType<typeof createUsersStore>