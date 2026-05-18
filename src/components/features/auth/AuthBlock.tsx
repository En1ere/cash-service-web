"use client"
import React from 'react';
import cl from "./styles/AuthBlock.module.css"
import DSButton from "@/components/UI/Button/DSButton";
import {useModals} from "@/hooks/useModals";
import UserBlock from "@/components/features/users/UserBlock";
import DSLoader from "@/components/UI/Loader/DSLoader";
import {useAuth} from "@/hooks/useAuth";
import {useUsers} from "@/hooks/useUsers";

const AuthBlock = () => {
    const {openModal} = useModals();

    const {isAuthLoading} = useAuth()
    const {user, isUserLoading} = useUsers()

    return (isAuthLoading || isUserLoading) ? <DSLoader />
        :
        user ?
        <UserBlock />
        :
        <div className={cl.authBlock}>
            <DSButton onClick={() => openModal("AuthModal")}>
                Войти
            </DSButton>
        </div>
};

export default AuthBlock;