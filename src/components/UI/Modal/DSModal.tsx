'use client';
import React, {ReactNode, useEffect, useState} from 'react';
import cl from './DSModal.module.css'
import IconCross from "@/components/UI/Icons/IconCross";
import DSButton from "@/components/UI/Button/DSButton";

interface DSModalProps {
    active: boolean;
    close: () => void;
    children: ReactNode;
}

function DSModal({active, close, children}: DSModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (active) {
            const raf = requestAnimationFrame(() => setIsVisible(true));
            return () => cancelAnimationFrame(raf);
        } else {
            const t = setTimeout(() => setIsVisible(false), 200);
            return () => clearTimeout(t);
        }
    }, [active]);

    const closeModal = () => {
        setIsVisible(false)
        const t = setTimeout(() => close(), 200);
        return () => clearTimeout(t);
    }

    return (
        <div className={isVisible ? `${cl.modalWrapper} ${cl.modalWrapperActive}` : cl.modalWrapper} onClick={closeModal}>
            <div className={isVisible ? `${cl.modal} ${cl.modalActive}` : cl.modal} onClick={e => e.stopPropagation()}>
                <DSButton variant={'empty'} onClick={closeModal} className={cl.modalCloseIcon}>
                    <IconCross />
                </DSButton>
                {children}
            </div>
        </div>
    );
}

export default DSModal;