import React from 'react';
import cl from "./styles/AuthModalContent.module.css"
import AuthForm from "@/components/features/auth/AuthForm";

const AuthModalContent = () => {
    return (
        <div className={cl.auth}>
            <h2 className={cl.authTitle}>Авторизация</h2>

            <AuthForm />
        </div>
    );
};

export default AuthModalContent;