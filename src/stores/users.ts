import {UserDto} from "@/types/dto/user.dto";
import {ApiResponse} from "@/types/dto/general-api.dto";
import {create} from "zustand";
import * as api from "@/lib/api";

export interface UsersState {
    isLoading: boolean
    user: UserDto| null
    getMe: () => Promise<UserDto|null>
}

export const createUsersStore = () => create<UsersState>((set, get) => ({
    isLoading: false,
    user: null,

    getMe: async() => {
        try {
            set({ isLoading: true })
            const res: ApiResponse<UserDto> = await api.get('/users/me')

            if (res.success) {
                set({ user: res.data })
            }

            return get().user;
        }
        catch(err) {
            console.error(err)
            return null
        }
        finally {
            set({ isLoading: false })
        }
    }
}))

export type UsersStoreApi = ReturnType<typeof createUsersStore>