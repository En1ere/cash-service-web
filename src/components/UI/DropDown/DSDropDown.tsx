import React, {ReactNode, useState} from 'react';
import cl from "./DSDropDown.module.css"
import {DropDownItem} from "@/types/DropDownItem";

interface DSDropDownProps {
    children: ReactNode,
    items: DropDownItem[],
}

const DSDropDown = ({children, items}: DSDropDownProps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <button className={cl.dropDownWrapper} onClick={() => setIsOpen(!isOpen)}>
            {children}
            <div className={`${cl.listWrapper} ${isOpen && cl.open}`}>
                {items.map(item =>
                    <span key={item.title} className={`${cl.item} ${isOpen && cl.open}`} onClick={item.action}>
                        {item.title}
                    </span>
                )}
            </div>
        </button>
    )
}

export default DSDropDown