'use client'
import DSButton from "@/components/UI/Button/DSButton";
import DSModal from "@/components/UI/Modal/DSModal";
import {useModal} from "@/hooks/useModal";
import {get} from "@/lib/api";
import Graph from "@/components/features/graphics/Graph";

function SomeClientComponent() {
    const modal = useModal();

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
            <DSButton variant={"secondary"} onClick={send}>
                send req
            </DSButton>
            <DSButton variant={"primary"} onClick={modal.open}>
                Open modal
            </DSButton>
            <DSModal active={modal.active} close={modal.close}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore dolorem fugit non quos vitae. Eius eos error ex iste suscipit.
            </DSModal>
            <Graph>

            </Graph>
        </div>
    );
}

export default SomeClientComponent;