import Base from "@/app/components/base/base";
import Menu from "./components/menu/menu";
import Link from "next/link";

interface HomeProps{
    text: string; 
    path: string | undefined;
    className?: string | undefined;
}

export default function Home(props: HomeProps) {
    return(
            <Base component={<Menu type={1}></Menu>}></Base>
    );
}