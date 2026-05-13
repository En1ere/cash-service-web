import React, {useState} from 'react';
import cl from "../auth/styles/AuthModalContent.module.css"
import AuthForm from "@/components/features/auth/AuthForm";
import DSButton from "@/components/UI/Button/DSButton";

const AuthModal = () => {
    const [signIn, setSignIn] = useState(true)
    return (
        <div className={cl.auth}>
            <h2 className={cl.authTitle}>
                {signIn ? "Авторизация" : "Регистрация"}
            </h2>

            <AuthForm signingIn={signIn} />

            <div className={cl.registrationBlock}>
                {signIn ? "Нет аккаунта?" : "Уже зарегистрированы?"}
                <DSButton
                    onClick={() => setSignIn(!signIn)}
                    className={cl.registrationButton} variant={"empty"}
                >
                    {signIn ? "Зарегистрироваться" : "Войти"}
                </DSButton>
            </div>
        </div>
    );
};

export default AuthModal;
