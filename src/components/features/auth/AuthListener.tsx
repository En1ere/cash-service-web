'use client'
import { useEffect } from 'react'
import {useAuthStore} from "@/app/providers/AuthProvider";
import {useUsersStore} from "@/app/providers/UsersProvider";

export function AuthListener() {
    const setIsAuthorized = useAuthStore(s => s.setIsAuthorized)
    const clearUsersStore = useUsersStore(s => s.clear)
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'accessToken') {
                const token = localStorage.getItem('accessToken')
                setIsAuthorized(!!token)

                if(!token) {
                    clearUsersStore()
                }
            }
        }

        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [clearUsersStore, setIsAuthorized])

    return null
}