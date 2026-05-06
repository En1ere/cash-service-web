import cl from "./page.module.scss"
import DSButton from "../components/UI/button/DSButton";

export default function Home() {
  return (
    <div className={cl.page}>
        Home page

        <DSButton disabled variant={"primary"}>Button</DSButton>
        <DSButton disabled variant={"secondary"}>Button</DSButton>
        <DSButton disabled variant={"outline"}>Button</DSButton>
        <DSButton disabled variant={"ghost"}>Button</DSButton>
        <DSButton disabled variant={"destructive"}>Button</DSButton>
    </div>
  );
}
