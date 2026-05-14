import cl from "./page.module.css"
import DSButton from "@/components/UI/Button/DSButton";
import SomeClientComponent from "@/components/SomeClientComponent";
import {ModalsProvider} from "@/app/providers/DSModalProvider";

export default function Home() {
    return (
        <ModalsProvider>
            <div className={cl.page}>
                <h1 className={cl.title}>Home page</h1>
                <DSButton variant={"primary"}>Button</DSButton>
                <DSButton variant={"secondary"}>Button</DSButton>
                <DSButton variant={"outline"}>Button</DSButton>
                <DSButton variant={"ghost"}>Button</DSButton>
                <DSButton variant={"destructive"}>Button</DSButton>
                <SomeClientComponent />
            </div>
        </ModalsProvider>
    );
}
