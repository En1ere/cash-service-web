"use client"
import React from 'react';
import cl from './styles/UserBlock.module.css'
import {useUsers} from "@/hooks/useUsers";
import {useAuth} from "@/hooks/useAuth";

const AuthBlock = () => {
    const { user, goToProfile } = useUsers()
    const signOut = useAuth().signOut;

    return (
        <div className={cl.userBlock}>
            {user?.login}
            <button onClick={goToProfile}>
                goToProfile
            </button>
            <button onClick={signOut}>
                signOut
            </button>
        </div>
    )
};

export default AuthBlock;