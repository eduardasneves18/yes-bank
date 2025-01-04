import "./menu.css";
import Link from "next/link";

function MenuItens() {
    return(
        <ul className= "itens-menu-lateral">
            <li><Link className= "item" href=''>Página inicial</Link></li>
            <hr />
            <li><Link className= "item" href='/statement'>Extrato Detalhado</Link></li>
            <hr />
            <li><Link className= "item" href=''>Cartões</Link></li>
            <hr />
            <li><Link className= "item" href='/transaction'>Nova Transação</Link></li>
            <hr />
            <li><Link className= "item" href=''>Todos os serviços</Link></li>
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