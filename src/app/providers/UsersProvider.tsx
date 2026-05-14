'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { useStore } from 'zustand'
import { createUsersStore } from '@/stores/users'
import { type UsersStoreApi, type UsersState } from '@/stores/users'

const UsersContext = createContext<UsersStoreApi | null>(null)

interface UsersProviderProps {
    children: ReactNode
}

export const UserProvider: React.FC<UsersProviderProps> = ({ children }) => {
    const [store] = useState(() => createUsersStore())

    return <UsersContext.Provider value={store}>{children}</UsersContext.Provider>
}

export function useUsersStore<T>(selector: (state: UsersState) => T): T {
    const store = useContext(UsersContext)
    if (!store) {
        throw new Error('useUsersStore must be used within an UserProvider')
    }
    return useStore(store, selector)
}