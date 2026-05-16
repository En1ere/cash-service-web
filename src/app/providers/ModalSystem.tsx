'use client'

import { ReactNode, useEffect } from 'react'
import { useModalsStore } from '@/stores/modals'

interface ModalsSystemProps {
    children: ReactNode
    disableBodyScroll?: boolean
    closeOnEsc?: boolean
}

export function ModalsSystem({
        children,
        disableBodyScroll = true,
        closeOnEsc = true,
    }: ModalsSystemProps) {
    const openedCount = useModalsStore((s) => s.openedModals.length)
    const closeTopModal = useModalsStore((s) => s.closeTopModal)

    useEffect(() => {
        if (!disableBodyScroll) {
            return
        }

        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = openedCount > 0 ? 'hidden' : originalOverflow || ''

        return () => {
            document.body.style.overflow = originalOverflow || ''
        }
    }, [openedCount, disableBodyScroll])

    useEffect(() => {
        if (!closeOnEsc) {
            return
        }

        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeTopModal()
            }
        }

        window.addEventListener('keydown', handler)

        return () => {
            window.removeEventListener('keydown', handler)
        }
    }, [closeOnEsc, closeTopModal])

    return <>{children}</>
}