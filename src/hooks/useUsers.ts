'use client'
import { useUsersStore } from '@/app/providers/UsersProvider'
import { useRouter } from "next/navigation";

export function useUsers() {
    const router = useRouter();
    const isUserLoading = useUsersStore(s => s.isLoading)
    const user = useUsersStore(s => s.user)
    const getMe = useUsersStore(s => s.getMe)
    const clear = useUsersStore(s => s.clear)

    const goToProfile = typeof window !== 'undefined'
        ? () => router.push('/profile')
        : () => {}

    return {
        isUserLoading,
        user,
        getMe,
        goToProfile,
        clear
    }
}