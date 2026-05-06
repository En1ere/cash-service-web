import React from 'react';
import cl from '@/styles/Header.module.css'

const Header = () => {
    return (
        <header className={cl.header}>
            <div className={cl.title}>
                Header
            </div>
            <div className={cl.title}>
                Auth Block
            </div>
        </header>
    );
};

export default Header;