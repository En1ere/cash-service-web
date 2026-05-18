import React from 'react';
import cl from './styles/SideBar.module.css'
import {SideBarItem} from "@/types/SideBarItem";
import Link from 'next/link'
import DSIcon from "@/components/UI/Icons/DSIcon";

interface SideBarProps {
    links: SideBarItem[]
}

const SideBar = ({links}: SideBarProps) => {
    return (
        <nav className={cl.sidebar}>
            {links.map(item =>
                <Link href={item.link} key={item.title}>
                    <DSIcon name={item.icon} width={24} height={24} color="#000" />
                    {item.title}
                </Link>)}
        </nav>
    );
};

export default SideBar;