import Base from "@/app/components/base/base";
import Menu from "@/app/components/menu/menu";
import Link from "next/link";

export default function Statement() {
    return(
            <Base component={<Menu type={1}></Menu>}></Base>
    );
}