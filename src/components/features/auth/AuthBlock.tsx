"use client"
import React from 'react';
import cl from "./styles/AuthBlock.module.css"
import DSButton from "@/components/UI/Button/DSButton";
import DSModal from "@/components/UI/Modal/DSModal";
import {useModal} from "@/hooks/useModal";
import AuthModalContent from "@/components/features/auth/AuthModalContent";

const AuthBlock = () => {
    const modal = useModal();

    return (
        <div className={cl.authBlock}>
            <DSButton onClick={modal.open}>
                Войти
            </DSButton>

            <DSModal active={modal.active} close={modal.close}>
                <AuthModalContent />
            </DSModal>
        </div>
    );
};

export default AuthBlock;