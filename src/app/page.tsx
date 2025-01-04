import Container from "@/app/components/containers/containers";
import '@/app/home/home.css';


export default function HomePage() {
    const children: React.ReactNode = (
        <div className="home"> 
            <div className="header-components">
                <Container type={"welcome"} classname="border-normal welcome"/>
                <Container type={"saldo"} classname="saldo"/>
            </div>
            <div className="body-components" >
                <Container type={"menu"} classname="border-gradient menu"/>
                <Container type={"nova-transacao"} classname="border-gradient nova-transacao"/>
                <Container type={"extrato-simplificado"} classname="extrato"/>
            </div>

        </div>
    );
    return(
        <>  
            {children}
        </>
    );
}