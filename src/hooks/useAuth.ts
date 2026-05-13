'use client'
import { useAuthStore } from '@/providers/AuthProvider'

export function useAuth() {
    const isAuthorized = useAuthStore(s => s.isAuthorized)
    const isAuthLoading = useAuthStore(s => s.isLoading)
    const user = useAuthStore(s => s.user)
    const signIn = useAuthStore(s => s.signIn)
    const signOut = useAuthStore(s => s.signOut)
    const signUp = useAuthStore(s => s.signUp)

    return {
        isAuthorized,
        isAuthLoading,
        user,
        signIn,
        signOut,
        signUp,
    }
}
