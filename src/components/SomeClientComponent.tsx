'use client'
import React from 'react';
import DSButton from "@/components/UI/Button/DSButton";
import {get} from "@/lib/api";
import DSLoader from "@/components/UI/Loader/DSLoader";
import DSLargeLoader from "@/components/UI/LargeLoader/DSLargeLoader";
import cl from "@/styles/SomeClientComponent.module.css"

function SomeClientComponent() {

    const send = async () => {
        try {
            const res = await get(`/users/me`);
            console.log(res);
        }
        catch(err) {
            console.log(err)
        }
    }
    return (
        <div>
            <div className={cl.loaders}>
                <DSLoader />
                <DSLargeLoader />
            </div>
            <DSButton variant={"secondary"} onClick={send}>
                send req
            </DSButton>
        </div>
    );
}

export default SomeClientComponent;