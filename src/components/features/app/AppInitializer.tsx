'use client'

import { useEffect, useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useUsers } from '@/hooks/useUsers'

export function AppInitializer() {
    const {
        checkAuth,
        setIsAuthorized,
        setAuthLoading,
    } = useAuth()

    const {
        user,
        getMe,
        clearUsersStore,
        setUserLoading,
    } = useUsers()

    const initializedRef = useRef(false)

    useEffect(() => {
        let active = true

        const bootstrap = async () => {
            try {
                const isAuthorized = checkAuth()

                if (!active) return

                setIsAuthorized(isAuthorized)

                if (!isAuthorized) {
                    clearUsersStore()
                    return
                }

                if (!user) {
                    await getMe()
                }
            } catch (error) {
                console.error('App initialization failed:', error)

                if (!active) return

                setIsAuthorized(false)
                clearUsersStore()
            } finally {
                if (active) {
                    setAuthLoading(false)
                    setUserLoading(false)
                    initializedRef.current = true
                }
            }
        }

        void bootstrap()

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key !== 'accessToken') {
                return
            }

            const hasToken = !!e.newValue
            setIsAuthorized(hasToken)

            if (!hasToken) {
                clearUsersStore()
                return
            }

            if (!user && initializedRef.current) {
                void getMe().catch((error) => {
                    console.error('Failed to sync user after storage change:', error)
                })
            }
        }

        window.addEventListener('storage', handleStorageChange)

        return () => {
            active = false
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [
        user,
        checkAuth,
        getMe,
        clearUsersStore,
        setIsAuthorized,
        setAuthLoading,
        setUserLoading,
    ])

    return null
}