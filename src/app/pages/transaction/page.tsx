import Container from "@/app/components/containers/containers";
import '@/app/globals.css';
import '@/app/pages/home/home.css';
import './transaction.css'

export default function Transaction() {
    const children: React.ReactNode = (
        <div className="transaction"> 
                <Container type={"menu"} classname="border-gradient menu"/>
                <Container type={"nova-transacao"} classname="border-gradient nova-transacao"/>

            <div className="saldo-cartao-colum"> 
                <Container type={"saldo"} classname="saldo"/>
                <Container type={"cartao"} classname="cartao"/>
            </div>
        </div>
    );
    return(
        <>  
            {children}
        </>
    );
}
