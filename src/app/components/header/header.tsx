import "./header.css";
import Link from "next/link";

interface HeaderProps{
    user: string | undefined; 
}

function Logo() {
    return (
    <Link href='/' className="header-link">
        <div className="header-yes">Yes</div>
        <div className="header-bank">Bank</div>
    </Link>);
}
export default function Header(props: HeaderProps) {
    if (props.user === "N") {
        return(
            <div className="header">
                <Logo></Logo>
                <div className="header-user-name">
                    Eduarda Silva Neves
                </div>
            </div>
        )
    } else {
        <div className="header">
            <Logo></Logo>
            <div className="header-user-name">
                {props.user}
            </div>
        </div>
    };
    
}