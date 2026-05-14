'use client'
import { useAuthStore } from '@/app/providers/AuthProvider'
import {clearTokens} from "@/lib/tokens";
import {useUsersStore} from "@/app/providers/UsersProvider";

export function useAuth() {
    const isAuthorized = useAuthStore(s => s.isAuthorized)
    const isAuthLoading = useAuthStore(s => s.isLoading)
    const signIn = useAuthStore(s => s.signIn)
    const signOut = useAuthStore(s => s.signOut)
    const signUp = useAuthStore(s => s.signUp)
    const setIsAuthorized = useAuthStore(s => s.setIsAuthorized)
    const setIsLoading= useAuthStore(s => s.setIsLoading)
    const checkAuth = useAuthStore(s => s.checkAuth)
    const clearUsers = useUsersStore(s => s.clear)

    const signOutHandler = async() => {
        const res = await signOut();
        if(res.success) {
            clearTokens()
            clearUsers()
        }
    }

    return {
        isAuthorized,
        isAuthLoading,
        signIn,
        signOut: signOutHandler,
        signUp,
        setIsAuthorized,
        setIsLoading,
        checkAuth,
    }
}
