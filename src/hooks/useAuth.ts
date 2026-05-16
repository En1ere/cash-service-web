'use client'

import { useAuthStore } from '@/stores/auth'
import { clearTokens } from '@/lib/tokens'
import {useUsersStore} from "@/stores/users";

export function useAuth() {
    const isAuthorized = useAuthStore((s) => s.isAuthorized)
    const isAuthLoading = useAuthStore((s) => s.isLoading)
    const signIn = useAuthStore((s) => s.signIn)
    const signOut = useAuthStore((s) => s.signOut)
    const signUp = useAuthStore((s) => s.signUp)
    const setIsAuthorized = useAuthStore((s) => s.setIsAuthorized)
    const setAuthLoading = useAuthStore((s) => s.setIsLoading)
    const checkAuth = useAuthStore((s) => s.checkAuth)

    const signOutHandler = async () => {
        await signOut()
        clearTokens()
        useUsersStore.getState().clear()
        useAuthStore.getState().setIsAuthorized(false)
    }

    return {
        isAuthorized,
        isAuthLoading,
        signIn,
        signOut: signOutHandler,
        signUp,
        setIsAuthorized,
        setAuthLoading,
        checkAuth,
    }
}