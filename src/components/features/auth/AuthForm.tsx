import React, {useState} from 'react';
import cl from "./styles/AuthForm.module.css"
import DSButton from "@/components/UI/Button/DSButton";
import {post} from "@/lib/api";
import DSInput from "@/components/UI/Input/DSInput";

const AuthForm = ({signingIn}: {signingIn: boolean}) => {
    const signIn = async () => {
        try {
            const response = await post("/auth/sign-in", signInCredentials)
        }
        catch(err) {
            console.log(err)
        }
    }
    const signUp = async () => {
        try {
            const response = await post("/auth/sign-up", signUpCredentials)
        }
        catch(err) {
            console.log(err)
        }
    }

    const [signInCredentials, setSignInCredentials] = useState({
        identifier: "",
        password: ""
    });
    const [signUpCredentials, setSignUpCredentials] = useState({
        login: "",
        name: "",
        email: "",
        password: ""
    });

    return (
        <div className={cl.authFormWrapper}>
            {signingIn ?
                <div className={cl.authFormInputs}>
                    <DSInput
                        value={signingIn ? signInCredentials.identifier : signUpCredentials.email}
                        onChange={e => setSignInCredentials({...signInCredentials, identifier: e.target.value})}
                        placeholder={'Логин или email'}
                    />
                    <DSInput
                        value={signInCredentials.password}
                        onChange={e => setSignInCredentials({...signInCredentials, password: e.target.value})}
                        placeholder={'Пароль'}
                    />
                </div>
                :
                <div className={cl.authFormInputs}>
                    <DSInput
                        value={signUpCredentials.login}
                        onChange={e => setSignUpCredentials({...signUpCredentials, login: e.target.value})}
                        placeholder={"Логин"}
                    />
                    <DSInput
                        value={signUpCredentials.name}
                        onChange={e => setSignUpCredentials({...signUpCredentials, name: e.target.value})}
                        placeholder={"Имя"}
                    />
                    <DSInput
                        value={signUpCredentials.email}
                        onChange={e => setSignUpCredentials({...signUpCredentials, email: e.target.value})}
                        placeholder={'Email'}
                    />
                    <DSInput
                        value={signingIn ? signInCredentials.password : signUpCredentials.password}
                        onChange={e => setSignUpCredentials({...signUpCredentials, password: e.target.value})}
                        placeholder={'Пароль'}
                    />
                </div>
            }
            <DSButton className={cl.sendButton} variant={"secondary"} onClick={signingIn ? signIn : signUp}>
                {signingIn ? "Войти" : "Зарегистрироваться"}
            </DSButton>
        </div>
    );
};

export default AuthForm;
