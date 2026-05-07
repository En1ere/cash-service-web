import React from 'react';
import cl from '@/styles/Header.module.css'
import AuthBlock from "@/components/features/auth/AuthBlock";

const Header = () => {
    return (
        <header className={cl.header}>
            <div className={cl.title}>
                Header
            </div>
            <div >
                <AuthBlock />
            </div>
        </header>
    );
};

export default Header;