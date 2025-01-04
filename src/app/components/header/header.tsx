import "./header.css";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps{
    user?: string | undefined; 
    type?: string | undefined; 
}

function Logo() {
    return (
    <Link href='' className="yes-bank-header-link">
        <div className="yes-bank-header-yes">Yes</div>
        <div className="yes-bank-header-bank">Bank</div>
    </Link>);
}

export default function Header(props: HeaderProps) {

    if(props.type === 'user'){
        <header className="yes-bank-header">
            <Logo></Logo>
        </header>
    }else {
        if (props.user === "S") {
            return(
                <header className="yes-bank-header">
                    <Logo></Logo>
                    <div className="yes-bank-header-user-name">
                        Eduarda Silva Neves
                    </div>
                    <div>
                    <Link href='/user' className="yes-bank-header-link">
                        <FontAwesomeIcon icon={faUser} />
                    </Link>
                    </div>
                </header>
            )
        } else {
            return (
                <header className="yes-bank-header">
                    <Logo></Logo>
                    <div className="yes-bank-header-user-name">
                    </div>
                    <div>
                    <Link href='/user' className="yes-bank-header-link">
                        <FontAwesomeIcon icon={faUser} />
                    </Link>
                    </div>
                </header>
            );
        }
    }
    
}