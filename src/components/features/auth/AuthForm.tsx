import React, {useState} from 'react';
import cl from "./styles/AuthForm.module.css"
import DSButton from "@/components/UI/Button/DSButton";
import {post} from "@/lib/api";
import DSInput from "@/components/UI/Input/DSInput";
import {formEnums} from "@/types/enums/FormEnums";

const AuthForm = ({signingIn}: {signingIn: boolean}) => {
    const signIn = async () => {
        try {
            await post("/auth/sign-in", signInCredentials)
        }
        catch(err) {
            console.log(err)
        }
    }
    const signUp = async () => {
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

    return (
        <div className={cl.authFormWrapper}>
            {signingIn ?
                <div className={cl.authFormInputs}>
                    <DSInput
                        label={formEnums.labels.auth}
                        value={signingIn ? signInCredentials.identifier : signUpCredentials.email}
                        onChange={e => setSignInCredentials({...signInCredentials, identifier: e.target.value})}
                        placeholder={formEnums.placeholders.email}
                        clearCb={() => setSignInCredentials({...signInCredentials, identifier: ""})}
                    />
                    <DSInput
                        type={'password'}
                        label={formEnums.labels.password}
                        value={signInCredentials.password}
                        onChange={e => setSignInCredentials({...signInCredentials, password: e.target.value})}
                        placeholder={formEnums.placeholders.password}
                        clearCb={() => setSignInCredentials({...signInCredentials, password: ""})}
                    />
                </div>
                :
                <div className={cl.authFormInputs}>
                    <DSInput
                        label={formEnums.labels.login}
                        value={signUpCredentials.login}
                        onChange={e => setSignUpCredentials({...signUpCredentials, login: e.target.value})}
                        placeholder={formEnums.placeholders.login}
                        clearCb={() => setSignUpCredentials({...signUpCredentials, login: ""})}
                    />
                    <DSInput
                        label={formEnums.labels.name}
                        value={signUpCredentials.name}
                        onChange={e => setSignUpCredentials({...signUpCredentials, name: e.target.value})}
                        placeholder={formEnums.placeholders.name}
                        clearCb={() => setSignUpCredentials({...signUpCredentials, name: ""})}
                    />
                    <DSInput
                        label={formEnums.labels.email}
                        value={signUpCredentials.email}
                        onChange={e => setSignUpCredentials({...signUpCredentials, email: e.target.value})}
                        placeholder={formEnums.placeholders.email}
                        clearCb={() => setSignUpCredentials({...signUpCredentials, email: ""})}
                    />
                    <DSInput
                        type={'password'}
                        label={formEnums.labels.password}
                        value={signingIn ? signInCredentials.password : signUpCredentials.password}
                        onChange={e => setSignUpCredentials({...signUpCredentials, password: e.target.value})}
                        placeholder={formEnums.placeholders.password}
                        clearCb={() => setSignUpCredentials({...signUpCredentials, password: ""})}
                    />
                </div>
            }
            <DSButton
                className={cl.sendButton} variant={"primary"}
                onClick={signingIn ? signIn : signUp}
            >
                {signingIn ? "Войти" : "Зарегистрироваться"}
            </DSButton>
        </div>
    );
};

export default AuthForm;
