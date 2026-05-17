'use client'

import React from 'react';
import cl from './styles/SideBar.module.css'
import {SideBarItem} from "@/types/SideBarItem";
import Link from 'next/link'
import DSIcon from "@/components/UI/Icons/DSIcon";
import {usePathname} from "next/navigation";

interface SideBarProps {
    links: SideBarItem[]
}

const SideBar = ({ links }: SideBarProps) => {
    const pathname = usePathname()

    return (
        <nav className={cl.sidebar}>
            {links.map((item) => {
                const isActive = pathname === item.link

                return (
                    <Link
                        className={`${cl.sidebarItem} ${isActive ? cl.active : ''}`}
                        href={item.link}
                        key={item.title}
                    >
                        <DSIcon name={item.icon} width={24} height={24} color={isActive ? "#8F76F5" : "#827a9d"} />
                        {item.title}
                    </Link>
                )
            })}
        </nav>
    )
}

export default SideBar;