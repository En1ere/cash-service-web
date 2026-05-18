'use client'

import dynamic from 'next/dynamic'
import DSLargeLoader from '@/components/UI/LargeLoader/DSLargeLoader'

const renderModalLoader = () => <DSLargeLoader />

export const modalsRegistry = {
    AuthModal: dynamic(() => import('@/components/features/modals/AuthModal'), {
        ssr: false,
        loading: renderModalLoader,
    }),

    UserAgreementModal: dynamic(
        () => import('@/components/features/modals/UserAgreementModal'),
        {
            ssr: false,
            loading: renderModalLoader,
        }
    ),
} as const

export type ModalName = keyof typeof modalsRegistry