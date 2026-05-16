'use client'

import { useRouter } from 'next/navigation'
import { useUsersStore } from '@/stores/users'

export function useUsers() {
    const router = useRouter()

    const isUserLoading = useUsersStore((s) => s.isLoading)
    const user = useUsersStore((s) => s.user)
    const getMe = useUsersStore((s) => s.getMe)
    const clearUsersStore = useUsersStore((s) => s.clear)
    const setUser = useUsersStore((s) => s.setUser)
    const setUserLoading = useUsersStore((s) => s.setIsLoading)

    const goToProfile = () => router.push('/profile')

    return {
        isUserLoading,
        user,
        getMe,
        goToProfile,
        clearUsersStore,
        setUserLoading,
        setUser,
    }
}