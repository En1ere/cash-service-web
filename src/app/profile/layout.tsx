import React from "react";
import SideBar from "@/components/features/users/profile/SideBar";
import {SideBarItem} from "@/types/SideBarItem";
import cl from './ProfilePage.module.css'

export default function ProfileLayout({children}: Readonly<{children: React.ReactNode}>) {
    const SIDEBAR_LINKS: SideBarItem[] = [
        {
            title: "Dashboard",
            link: "/profile/dashboard",
            icon: "IconHome",
        },
        {
            title: "Settings",
            link: "/profile/settings",
            icon: "IconSettings",
        }
    ]

    return (
        <div className={cl.profile}>
            <SideBar links={SIDEBAR_LINKS} />
            <div className={cl.profileContent}>
                {children}
            </div>
        </div>
    );
}
