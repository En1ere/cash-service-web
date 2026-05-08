import React from 'react';
import cl from "./DSLargeLoader.module.css"

const DSLargeLoader = () => {
    return (
        <div className={cl.container}>
            <div className={cl.inner}>
                <div className={cl.cube}>
                    <div className={cl.cube__inner}></div>
                </div>
                <div className={cl.cube}>
                    <div className={cl.cube__inner}></div>
                </div>
                <div className={cl.cube}>
                    <div className={cl.cube__inner}></div>
                </div>
            </div>
        </div>
    )
};

export default DSLargeLoader;