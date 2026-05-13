import React, {useState} from 'react';
import cl from "./styles/AuthForm.module.css"
import DSButton from "@/components/UI/Button/DSButton";
import DSInput from "@/components/UI/Input/DSInput";
import {FormConstants} from "@/types/const/FormConstants";
import {PartialExcept} from "@/types/PartialExcept";
import {useAuth} from "@/hooks/useAuth";
import {useUsers} from "@/hooks/useUsers";
import {useModals} from "@/hooks/useModals";

const AuthForm = ({signingIn}: {signingIn: boolean}) => {
    const { isAuthLoading, signIn, signUp } = useAuth()
    const { getMe } = useUsers()
    const { closeModal } = useModals()

    const signInHandler = async (e: PartialExcept<SubmitEvent, 'preventDefault'>) => {
        e.preventDefault();
        const res = await signIn(signInCredentials);
        if(res.success) {
            await getMe()
        }
        closeModal("AuthModal")
    }
    const signUpHandler = async (e: PartialExcept<SubmitEvent, 'preventDefault'>) => {
        e.preventDefault();
        const res = await signUp(signUpCredentials);
        if(res.success) {
            await getMe()
        }
        closeModal("AuthModal")
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
            <form onSubmit={signingIn ? signInHandler : signUpHandler} action="">
                {signingIn ?
                    <div className={cl.authFormInputs}>
                        <DSInput
                            label={FormConstants.labels.auth}
                            value={signingIn ? signInCredentials.identifier : signUpCredentials.email}
                            onChange={e => setSignInCredentials({...signInCredentials, identifier: e.target.value})}
                            placeholder={FormConstants.placeholders.email}
                            clearCb={() => setSignInCredentials({...signInCredentials, identifier: ""})}
                            isLoading={isAuthLoading}
                        />
                        <DSInput
                            type={'password'}
                            label={FormConstants.labels.password}
                            value={signInCredentials.password}
                            onChange={e => setSignInCredentials({...signInCredentials, password: e.target.value})}
                            placeholder={FormConstants.placeholders.password}
                            clearCb={() => setSignInCredentials({...signInCredentials, password: ""})}
                            isLoading={isAuthLoading}
                        />
                    </div>
                    :
                    <div className={cl.authFormInputs}>
                        <DSInput
                            label={FormConstants.labels.login}
                            value={signUpCredentials.login}
                            onChange={e => setSignUpCredentials({...signUpCredentials, login: e.target.value})}
                            placeholder={FormConstants.placeholders.login}
                            clearCb={() => setSignUpCredentials({...signUpCredentials, login: ""})}
                            isLoading={isAuthLoading}
                        />
                        <DSInput
                            label={FormConstants.labels.name}
                            value={signUpCredentials.name}
                            onChange={e => setSignUpCredentials({...signUpCredentials, name: e.target.value})}
                            placeholder={FormConstants.placeholders.name}
                            clearCb={() => setSignUpCredentials({...signUpCredentials, name: ""})}
                            isLoading={isAuthLoading}
                        />
                        <DSInput
                            label={FormConstants.labels.email}
                            value={signUpCredentials.email}
                            onChange={e => setSignUpCredentials({...signUpCredentials, email: e.target.value})}
                            placeholder={FormConstants.placeholders.email}
                            clearCb={() => setSignUpCredentials({...signUpCredentials, email: ""})}
                            isLoading={isAuthLoading}
                        />
                        <DSInput
                            type={'password'}
                            label={FormConstants.labels.password}
                            value={signingIn ? signInCredentials.password : signUpCredentials.password}
                            onChange={e => setSignUpCredentials({...signUpCredentials, password: e.target.value})}
                            placeholder={FormConstants.placeholders.password}
                            clearCb={() => setSignUpCredentials({...signUpCredentials, password: ""})}
                            isLoading={isAuthLoading}
                        />
                    </div>
                }
                <DSButton
                    isLoading={isAuthLoading}
                    className={cl.sendButton} variant={"primary"}
                    type={"submit"}
                >
                    {signingIn ? "Войти" : "Зарегистрироваться"}
                </DSButton>
            </form>
        </div>
    );
};

export default AuthForm;
