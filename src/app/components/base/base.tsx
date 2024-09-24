import Image from "next/image";
import "./base.css";
import Header from '@/app/components/header/header';

interface BaseProps{
    component?: any | undefined; 
    path?: string | undefined;
    className?: string | undefined;
}

export default function Base(props: BaseProps) {
    return(
        <div >
            <div>
                <Header user="N"></Header>
                {/* <Header className="header-item" path={`/finance/expense/`} text='Gastos'></Header>
                <Header className="header-item" path={`/finance/economy/`} text='Economias'></Header>
                <Header className="header-item" path={`/finance/salary/`} text='Proventos'></Header> */}
            </div> 
            <div className="base">
                {props.component}
            </div>
        </div>
             
    )

}
