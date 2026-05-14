'use client'
import React, {createContext, useContext, useEffect, ReactNode, useState} from 'react'
import { useStore } from 'zustand'
import { createModalsStore } from '@/stores/modals'
import type { ModalsStoreApi, ModalsState } from '@/stores/modals'

type ModalsContextValue = ModalsStoreApi | null
const ModalsContext = createContext<ModalsContextValue>(null)

interface ModalsProviderProps {
    children: ReactNode
    disableBodyScroll?: boolean
    closeOnEsc?: boolean
}

export const ModalsProvider = ({
        children,
        disableBodyScroll = true,
        closeOnEsc = true,
    }: ModalsProviderProps) => {
        const [store] = useState(() => createModalsStore())

        const openedModals = useStore(store, s => s.openedModals)
        const closeModal = useStore(store, s => s.closeModal)

        // Блок скролла
        useEffect(() => {
            if (!disableBodyScroll) return
            const original = typeof document !== 'undefined' ? document.body.style.overflow : ''
            if (openedModals.length > 0) {
                document.body.style.overflow = 'hidden'
            } else {
                document.body.style.overflow = original || ''
            }
            return () => {
                document.body.style.overflow = original || ''
            }
        }, [openedModals.length, disableBodyScroll])

        // Слушатель Escape
        useEffect(() => {
            if (!closeOnEsc) return
            const handler = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    const modals = store.getState().openedModals;
                    const last = modals[modals.length - 1]
                    if (last) closeModal(last)
                }
            }
            window.addEventListener('keydown', handler)
            return () => window.removeEventListener('keydown', handler)
        }, [closeOnEsc, closeModal, store])

        return (
            <ModalsContext.Provider value={store}>
                {children}
            </ModalsContext.Provider>
        )
}

export function useModalsStoreFromContext<T>(selector: (s: ModalsState) => T): T {
    const ctx = useContext(ModalsContext)
    if (!ctx) throw new Error('useModalsStoreFromContext must be used within ModalsProvider')
    return useStore(ctx, selector)
}