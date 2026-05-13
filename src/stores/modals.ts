import { create } from 'zustand'

export interface ModalsState {
    openedModals: string[]
    openModal: (modalName: string) => void
    closeModal: (modalName: string) => void
    closeAllModals: () => void
}

export const createModalsStore = () =>
    create<ModalsState>((set, get) => ({
        openedModals: [],

        openModal: (modalName: string) => {
            if(!modalName) {
                console.error("No modal provided")
            }
            else {
                set(state => ({openedModals: state.openedModals.includes(modalName) ? state.openedModals : [...state.openedModals, modalName]}))
            }
        },
        closeModal: (modalName: string) => {
            if(!modalName) {
                get().closeAllModals();
            }
            else {
                set(state => ({openedModals: state.openedModals.filter(m => m !== modalName)}))
            }
        },
        closeAllModals: () => {
            set({openedModals: []})
        },
    }))

export type ModalsStoreApi = ReturnType<typeof createModalsStore>