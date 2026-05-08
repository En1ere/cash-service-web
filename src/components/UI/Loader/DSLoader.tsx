import React from 'react';
import cl from "./DSLoader.module.css"

const DSLoader = () => {
    return (
        <div className={cl.container}>
            <div className={cl.inner}>
                <div className={cl.line} />
                <div className={cl.line} />
                <div className={cl.line} />
                <div className={cl.line} />
            </div>
        </div>
    )
};

export default DSLoader;