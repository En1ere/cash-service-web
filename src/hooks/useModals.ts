'use client'
import { useModalsStoreFromContext } from '@/app/providers/DSModalProvider'

export function useModals(modalName: string = "") {
    const openedModals = useModalsStoreFromContext(s => s.openedModals)
    const openModal = useModalsStoreFromContext(s => s.openModal)
    const closeModal = useModalsStoreFromContext(s => s.closeModal)
    const closeAllModals = useModalsStoreFromContext(s => s.closeAllModals)

    const currentModal = useModalsStoreFromContext(
        state => (state.openedModals[state.openedModals.length - 1] ?? null)
    )

    const isOpen = modalName ? openedModals.includes(modalName) : false
    const isTop = currentModal === modalName

    return {
        isOpen,
        isTop,
        openModal,
        closeModal,
        closeAllModals,
        currentModal,
        openedCount: openedModals.length,
        openedModals,
    }
}
