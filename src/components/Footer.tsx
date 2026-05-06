import React from 'react';
import cl from '@/styles/Footer.module.css'

const Footer = () => {
    return (
        <footer className={cl.footer}>
            <div className={cl.title}>
                Footer
            </div>
            <div className={cl.title}>
                © 2026. Все права защищены.
            </div>
        </footer>
    );
};

export default Footer;