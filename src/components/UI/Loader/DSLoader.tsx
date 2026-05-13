import React from 'react';
import cl from "./DSLoader.module.css"
import {StyleVariants} from "@/types/StyleVariants";

const DSLoader = ({variant = 'primary'}: Readonly<{variant?: StyleVariants}>) => {
    return (
        <div className={`${cl.container} ${cl[variant]}`}>
            <div className={`${cl.inner} ${cl[variant]}`}>
                <div className={`${cl.line} ${cl[variant]}`} />
                <div className={`${cl.line} ${cl[variant]}`} />
                <div className={`${cl.line} ${cl[variant]}`} />
                <div className={`${cl.line} ${cl[variant]}`} />
            </div>
        </div>
    )
};

export default DSLoader;