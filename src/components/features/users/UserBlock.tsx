"use client"
import React from 'react';
import cl from './styles/UserBlock.module.css'
import {useUsers} from "@/hooks/useUsers";
import {useAuth} from "@/hooks/useAuth";
import Image, {StaticImageData} from 'next/image';
import avatarPlug from "@/assets/img/profile/profile-plug.png"
import DSDropDown from "@/components/UI/DropDown/DSDropDown";
import IconDropDown from "@/components/UI/Icons/IconDropDown";
import {DropDownItem} from "@/types/DropDownItem";

const AuthBlock = () => {
    const { user, goToProfile } = useUsers()
    const signOut = useAuth().signOut;

    const DROP_DOWN_ITEMS: DropDownItem[] = [
        {
            title: "Профиль",
            action: goToProfile
        },
        {
            title: "Выйти",
            action: signOut
        }
    ]

    const getUserName = () => `${user?.name} ${user?.lastName ?? ""}`
    const getUserAvatar: () => string|StaticImageData = () => user?.avatar ?? avatarPlug

    return (
            <DSDropDown items={DROP_DOWN_ITEMS}>
                <div className={cl.userBlock}>
                    <div className={cl.avatar}>
                        <Image
                            src={getUserAvatar()}
                            alt="Аватар пользователя"
                        />
                    </div>
                    <div className={cl.name}>
                        <span>
                            {getUserName()}
                        </span>
                                <span>
                            {user?.login}
                        </span>
                    </div>
                    <div>
                        <IconDropDown />
                    </div>
                </div>
            </DSDropDown>
    )
};

export default AuthBlock;