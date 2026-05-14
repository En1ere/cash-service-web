'use client'
import { ModalsProvider } from '@/app/providers/DSModalProvider'
import { AuthProvider } from '@/app/providers/AuthProvider'
import ModalsHost from '@/components/UI/Modal/DSModalsHost'
import {ReactNode} from "react";
import {UserProvider} from "@/app/providers/UsersProvider";
import {UserInitializer} from "@/components/features/users/UsersInitializer";
import {AuthListener} from "@/components/features/auth/AuthListener";

export default function GlobalProviders({ children }: { children: ReactNode }) {

    return (
        <AuthProvider>
            <UserProvider>
                <AuthListener />
                <UserInitializer />
                <ModalsProvider>
                    {children}
                    <ModalsHost />
                </ModalsProvider>
            </UserProvider>
        </AuthProvider>
    )
}