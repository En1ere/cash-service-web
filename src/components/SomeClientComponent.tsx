'use client'
import React from 'react';
import DSButton from "@/components/UI/Button/DSButton";
import DSModal from "@/components/UI/Modal/DSModal";
import {useModal} from "@/hooks/useModal";

function SomeClientComponent() {
    const modal = useModal();
    return (
        <div>
            <DSButton variant={"primary"} onClick={modal.open}>
                Open modal
            </DSButton>
            <DSModal active={modal.active} close={modal.close}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore dolorem fugit non quos vitae. Eius eos error ex iste suscipit.
            </DSModal>
        </div>
    );
}

export default SomeClientComponent;