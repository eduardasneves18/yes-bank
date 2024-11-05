import "./menu.css";
import Link from "next/link";

function MenuItens() {
    return(
        <ul className= "itens-menu-lateral">
            <li><Link className= "item" href='/pages/home'>Página inicial</Link></li>
            <hr />
            <li><Link className= "item" href='/pages/statement'>Extrato Detalhado</Link></li>
            <hr />
            <li><Link className= "item" href='/pages/home'>Cartões</Link></li>
            <hr />
            <li><Link className= "item" href='/pages/transaction'>Nova Transação</Link></li>
            <hr />
            <li><Link className= "item" href='/pages/home'>Todos os serviços</Link></li>
        </ul>  
    );
}
export default function Menu() {
    return(
        <div className="lateral-diminuido">
            <MenuItens></MenuItens> 
        </div>
    );
}