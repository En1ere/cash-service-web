"use client"
import React from 'react';
import cl from "./styles/AuthBlock.module.css"
import DSButton from "@/components/UI/Button/DSButton";
import {useModals} from "@/hooks/useModals";
import {useAuth} from "@/hooks/useAuth";
import UserBlock from "@/components/features/users/UserBlock";

const AuthBlock = () => {
    const {isAuthorized} = useAuth();
    const {openModal} = useModals();

    return isAuthorized ?
        <UserBlock />
        :
        <div className={cl.authBlock}>
            <DSButton onClick={() => openModal("AuthModal")}>
                Войти
            </DSButton>
        </div>
};

export default AuthBlock;