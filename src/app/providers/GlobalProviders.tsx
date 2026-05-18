'use client'

import { ReactNode } from 'react'
import { ModalsSystem } from '@/app/providers/ModalSystem'
import DSModal from '@/components/UI/Modal/DSModal'
import { AppInitializer } from '@/components/features/app/AppInitializer'

export default function GlobalProviders({ children }: { children: ReactNode }) {
    return (
        <ModalsSystem>
            <AppInitializer />
            {children}
            <DSModal />
        </ModalsSystem>
    )
}