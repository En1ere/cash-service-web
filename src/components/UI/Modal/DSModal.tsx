'use client';
import React, {ReactNode} from 'react';
import cl from './DSModal.module.css'
import IconCross from "@/components/UI/Icons/IconCross";
import DSButton from "@/components/UI/Button/DSButton";

function DSModal({active, close, children}: Readonly<{active: boolean, close: () => void, children: ReactNode}>) {
    return (
        <div className={active ? `${cl.modalWrapper} ${cl.modalWrapperActive}` : cl.modalWrapper} onClick={close}>
            <div className={active ? `${cl.modal} ${cl.modalActive}` : cl.modal} onClick={e => e.stopPropagation()}>
                <DSButton variant={'empty'} onClick={close} className={cl.modalCloseIcon}>
                    <IconCross />
                </DSButton>
                {children}
            </div>
        </div>
    );
}

export default DSModal;