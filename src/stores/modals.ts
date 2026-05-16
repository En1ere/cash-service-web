import { create } from 'zustand'
import type { ModalName } from '@/components/features/modals/modals.registry'

export interface ModalsState {
    openedModals: ModalName[]
    isOpen: (modalName: ModalName) => boolean
    getTopModal: () => ModalName | null
    openModal: (modalName: ModalName) => void
    closeModal: (modalName: ModalName) => void
    closeTopModal: () => void
    closeAllModals: () => void
}

export const useModalsStore = create<ModalsState>()((set, get) => ({
    openedModals: [],

    isOpen: (modalName) => {
        return get().openedModals.includes(modalName)
    },

    getTopModal: () => {
        const { openedModals } = get()
        return openedModals.length > 0 ? openedModals[openedModals.length - 1] : null
    },

    openModal: (modalName) => {
        set((state) => ({
            openedModals: state.openedModals.includes(modalName)
                ? state.openedModals
                : [...state.openedModals, modalName],
        }))
    },

    closeModal: (modalName) => {
        set((state) => ({
            openedModals: state.openedModals.filter((name) => name !== modalName),
        }))
    },

    closeTopModal: () => {
        const topModal = get().getTopModal()

        if (!topModal) {
            return
        }

        get().closeModal(topModal)
    },

    closeAllModals: () => {
        set({ openedModals: [] })
    },
}))