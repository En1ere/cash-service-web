'use client'

import type { ModalName } from '@/components/features/modals/modals.registry'
import { useModalsStore } from '@/stores/modals'

export function useModals(modalName?: ModalName) {
    const openedModals = useModalsStore((s) => s.openedModals)
    const openModal = useModalsStore((s) => s.openModal)
    const closeModal = useModalsStore((s) => s.closeModal)
    const closeTopModal = useModalsStore((s) => s.closeTopModal)
    const closeAllModals = useModalsStore((s) => s.closeAllModals)
    const currentModal = useModalsStore((s) => s.getTopModal())

    const isOpen = modalName ? openedModals.includes(modalName) : false
    const isTop = modalName ? currentModal === modalName : false

    return {
        isOpen,
        isTop,
        openModal,
        closeModal,
        closeTopModal,
        closeAllModals,
        currentModal,
        openedModals,
        openedCount: openedModals.length,
    }
}