"use client"
import React from 'react';
import cl from "./styles/AuthBlock.module.css"
import DSButton from "@/components/UI/Button/DSButton";
import {useModals} from "@/hooks/useModals";
import UserBlock from "@/components/features/users/UserBlock";
import {useAuthStore} from "@/app/providers/AuthProvider";
import {useUsersStore} from "@/app/providers/UsersProvider";
import DSLoader from "@/components/UI/Loader/DSLoader";

const AuthBlock = () => {
    const {openModal} = useModals();

    const isAuthLoading = useAuthStore(s => s.isLoading)
    const isUserLoading = useUsersStore(s => s.isLoading)
    const user = useUsersStore(s => s.user)

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