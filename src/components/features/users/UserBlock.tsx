"use client"
import React from 'react';
import cl from './styles/UserBlock.module.css'
import {useUsers} from "@/hooks/useUsers";

const AuthBlock = () => {
    const { user, goToProfile } = useUsers()

    return (
        <div className={cl.userBlock}>
            {user?.login}
            <button onClick={goToProfile}>
                goToProfile
            </button>
        </div>
    )
};

export default AuthBlock;