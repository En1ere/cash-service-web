'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { modalsRegistry, type ModalName } from '@/components/features/modals/modals.registry'
import { useModals } from '@/hooks/useModals'
import cl from './DSModal.module.css'
import DSButton from '@/components/UI/Button/DSButton'
import DSIcon from '@/components/UI/Icons/DSIcon'

interface ModalFrameProps {
    modalName: ModalName
    isTopModal: boolean
    close: () => void
    children: ReactNode
}

function ModalFrame({
        modalName,
        isTopModal,
        close,
        children,
    }: ModalFrameProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const raf = requestAnimationFrame(() => setIsVisible(true))
        return () => cancelAnimationFrame(raf)
    }, [])

    const handleClose = () => {
        if (!isTopModal) {
            return
        }

        setIsVisible(false)

        window.setTimeout(() => {
            close()
        }, 200)
    }

    return (
        <div
            className={isVisible ? `${cl.modalWrapper} ${cl.modalWrapperActive}` : cl.modalWrapper}
            onClick={handleClose}
            aria-hidden={!isTopModal}
            data-modal-name={modalName}
            style={{ zIndex: 1000 }}
        >
            <div
                className={isVisible ? `${cl.modal} ${cl.modalActive}` : cl.modal}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal={isTopModal}
            >
                <DSButton
                    variant="empty"
                    onClick={handleClose}
                    className={cl.modalCloseIcon}
                    disabled={!isTopModal}
                >
                    <DSIcon name="IconCross" />
                </DSButton>
                {children}
            </div>
        </div>
    )
}

export default function DSModal() {
    const { openedModals, currentModal, closeModal } = useModals()

    if (openedModals.length === 0) {
        return null
    }

    return (
        <>
            {openedModals.map((modalName, index) => {
                const ModalComponent = modalsRegistry[modalName]

                if (!ModalComponent) {
                    return null
                }

                const isTopModal =
                    currentModal === modalName && index === openedModals.length - 1

                return (
                    <ModalFrame
                        key={`${modalName}-${index}`}
                        modalName={modalName}
                        isTopModal={isTopModal}
                        close={() => closeModal(modalName)}
                    >
                        <ModalComponent />
                    </ModalFrame>
                )
            })}
        </>
    )
}