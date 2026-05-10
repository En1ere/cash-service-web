import React, {useState} from 'react';
import cl from "./styles/AuthForm.module.css"
import DSButton from "@/components/UI/Button/DSButton";
import {post} from "@/lib/api";
import DSInput from "@/components/UI/Input/DSInput";
import {FormConstants} from "@/types/const/FormConstants";
import DSLoader from "@/components/UI/LargeLoader/DSLargeLoader";
import {PartialExcept} from "@/types/PartialExcept";

const AuthForm = ({signingIn}: {signingIn: boolean}) => {
    const signIn = async (e: PartialExcept<SubmitEvent, 'preventDefault'>) => {
        e.preventDefault();
        try {
            await post("/auth/sign-in", signInCredentials)
        }
        catch(err) {
            console.log(err)
        }
    }
    const signUp = async (e: PartialExcept<SubmitEvent, 'preventDefault'>) => {
        e.preventDefault();
        try {
            await post("/auth/sign-up", signUpCredentials)
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

    const load = true

    return (
        <div className={cl.authFormWrapper}>
            {load ? <DSLoader /> :
            <form onSubmit={signingIn ? signIn : signUp} action="">
                {signingIn ?
                    <div className={cl.authFormInputs}>
                        <DSInput
                            label={FormConstants.labels.auth}
                            value={signingIn ? signInCredentials.identifier : signUpCredentials.email}
                            onChange={e => setSignInCredentials({...signInCredentials, identifier: e.target.value})}
                            placeholder={FormConstants.placeholders.email}
                            clearCb={() => setSignInCredentials({...signInCredentials, identifier: ""})}
                        />
                        <DSInput
                            type={'password'}
                            label={FormConstants.labels.password}
                            value={signInCredentials.password}
                            onChange={e => setSignInCredentials({...signInCredentials, password: e.target.value})}
                            placeholder={FormConstants.placeholders.password}
                            clearCb={() => setSignInCredentials({...signInCredentials, password: ""})}
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
                        />
                        <DSInput
                            label={FormConstants.labels.name}
                            value={signUpCredentials.name}
                            onChange={e => setSignUpCredentials({...signUpCredentials, name: e.target.value})}
                            placeholder={FormConstants.placeholders.name}
                            clearCb={() => setSignUpCredentials({...signUpCredentials, name: ""})}
                        />
                        <DSInput
                            label={FormConstants.labels.email}
                            value={signUpCredentials.email}
                            onChange={e => setSignUpCredentials({...signUpCredentials, email: e.target.value})}
                            placeholder={FormConstants.placeholders.email}
                            clearCb={() => setSignUpCredentials({...signUpCredentials, email: ""})}
                        />
                        <DSInput
                            type={'password'}
                            label={FormConstants.labels.password}
                            value={signingIn ? signInCredentials.password : signUpCredentials.password}
                            onChange={e => setSignUpCredentials({...signUpCredentials, password: e.target.value})}
                            placeholder={FormConstants.placeholders.password}
                            clearCb={() => setSignUpCredentials({...signUpCredentials, password: ""})}
                        />
                    </div>
                }
                <DSButton
                    className={cl.sendButton} variant={"primary"}
                    type={"submit"}
                >
                    {signingIn ? "Войти" : "Зарегистрироваться"}
                </DSButton>
            </form>
            }
        </div>
    );
};

export default AuthForm;
