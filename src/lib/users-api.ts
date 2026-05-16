import { get } from '@/lib/api'
import type { ApiResponse } from '@/types/dto/general-api.dto'
import type { UserDto } from '@/types/dto/user.dto'

export const usersApi = {
    getMe(): Promise<ApiResponse<UserDto>> {
        return get<UserDto>('/users/me')
    },
}