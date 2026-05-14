"use client"
import {useEffect} from "react";
import {useUsersStore} from "@/app/providers/UsersProvider";
import {useAuthStore} from "@/app/providers/AuthProvider";

export function UserInitializer() {
    const user = useUsersStore(s => s.user)
    const getMe = useUsersStore(s => s.getMe)
    const setUserLoading = useUsersStore(s => s.setIsLoading)
    const setAuthLoading = useAuthStore(s => s.setIsLoading)
    const checkAuth = useAuthStore(s => s.checkAuth)

    useEffect(() => {
        if (!user && checkAuth()) {
            getMe().catch((err) => {
                console.error('Failed to load user:', err)
            })
        }
        setUserLoading(false)
        setAuthLoading(false)
    }, [user, getMe, checkAuth, setUserLoading, setAuthLoading])

    return null
}