'use client'
import { ModalsProvider } from '@/providers/DSModalProvider'
import { AuthProvider } from '@/providers/AuthProvider'
import ModalsHost from '@/components/UI/Modal/DSModalsHost'
import {ReactNode} from "react";
import {UserProvider} from "@/providers/UsersProvider";

export default function ProvidersWrapper({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <UserProvider>
                <ModalsProvider>
                    {children}
                    <ModalsHost />
                </ModalsProvider>
            </UserProvider>
        </AuthProvider>
    )
}