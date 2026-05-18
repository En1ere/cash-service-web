'use client'
import React, { useState } from 'react';
import DSButton from "@/components/UI/Button/DSButton";
import {get} from "@/lib/api";

import DSLoader from "@/components/UI/Loader/DSLoader";
import DSLargeLoader from "@/components/UI/LargeLoader/DSLargeLoader";
import cl from "@/styles/SomeClientComponent.module.css"
import DSPopover from './UI/Popover/DSPopover';
import Graph from "@/components/features/graphics/Graph";
import {useModals} from "@/hooks/useModals";
import DSModal from '@/components/UI/Modal/DSModal'

function SomeClientComponent() {
    const modal = useModals();
    const [isOpen, setIsOpen] = useState(false)

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
            <DSButton variant={"primary"} onClick={modal.open}>
                Open modal
            </DSButton>
            <DSModal active={modal.active} close={modal.close}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore dolorem fugit non quos vitae. Eius eos error ex iste suscipit.
            </DSModal>

            <DSButton variant={"primary"} onClick={() => setIsOpen(true)}>
                Тестовый поповер
            </DSButton>

            {isOpen && (
                <DSPopover parentElement="#testst" position="down-center" size="m" zIndex={1}
                        onOutsideClick={(value) => {
                        setIsOpen(value)
                    }}
                >
                    <p>Контент поповера</p>
                </DSPopover>
            )}
            <Graph>

            </Graph>
        </div>
    );
}

export default SomeClientComponent;