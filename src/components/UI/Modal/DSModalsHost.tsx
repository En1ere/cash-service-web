'use client'
import dynamic from 'next/dynamic'
import React from "react";
import {useModals} from "@/hooks/useModals";
import DSModal from "@/components/UI/Modal/DSModal";
import DSLargeLoader from "@/components/UI/LargeLoader/DSLargeLoader";

const AuthModal = dynamic(
    () => import('@/components/features/modals/AuthModal'),
    {
        ssr: false,
        loading: () => <DSLargeLoader />
    })

const MODALS_MAP: Record<string, React.ComponentType> = {
    AuthModal,
};
type ModalName = keyof typeof MODALS_MAP;

export default function ModalsHost() {
    const {currentModal, closeModal} = useModals()
    const ModalComponent = MODALS_MAP[currentModal as ModalName];

    if (!ModalComponent) {
        return null;
    }

    return (
        <DSModal active={!!currentModal} close={() => closeModal(currentModal)}>
            <ModalComponent />
        </DSModal>
    )
}