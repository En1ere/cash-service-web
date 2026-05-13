'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { useStore } from 'zustand'
import {createAuthStore} from '@/stores/auth'
import {type AuthStoreApi, type AuthState } from '@/stores/auth'

const AuthContext = createContext<AuthStoreApi | null>(null)

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [store] = useState(() => createAuthStore())

    return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
}

export function useAuthStore<T>(selector: (state: AuthState) => T): T {
    const store = useContext(AuthContext)
    if (!store) {
        throw new Error('useAuthStore must be used within an AuthProvider')
    }
    return useStore(store, selector)
}