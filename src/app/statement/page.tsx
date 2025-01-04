import Container from "@/app/components/containers/containers";
import '@/app/globals.css';
import './statement.css';

export default function Statement() {
    const children: React.ReactNode = (
        <div className="statement">
            <Container type={"menu"} classname="border-gradient menu"/>
            <Container type={"extrato-detalhado"} classname="extrato"/>
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