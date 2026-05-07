import React from 'react';
import cl from "./styles/AuthForm.module.css"
import DSButton from "@/components/UI/Button/DSButton";
import {get} from "@/lib/api";

const AuthForm = () => {
    const send = async () => {
        try {
            const res = await get("/users/me")
            console.log(res)
        }
         catch(err) {
            console.log(err)
         }
    }
    return (
        <div className={cl.authFormWrapper}>
            <DSButton onClick={send}>
                send req
            </DSButton>
        </div>
    );
};

export default AuthForm;
