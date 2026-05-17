'use client'
import React, {useState} from 'react';
import {Tabs} from "@/types/const/SettingsTabs";
import DSButton from "@/components/UI/Button/DSButton";
import cl from './styles/Settings.module.css'

const Settings = () => {
    const [currentTab, setCurrentTab] = useState("General")
    return (
        <div>
            {Tabs.map(tab => (
                <DSButton
                    className={cl.settingsTab}
                    key={tab}
                    variant={"empty"}
                    onClick={() => setCurrentTab(tab)}
                >
                    {tab}
                </DSButton>
            ))}
        </div>
    );
};

export default Settings;