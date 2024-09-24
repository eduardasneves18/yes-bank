import "./menu.css";
import Link from "next/link";

interface MenuProps{
    type: number; // 1 => menu lateral inteiro | 2 => menu lateral diminuido
}


function MenuItens() {
    return(
        
        <ul className= "itens-menu-lateral">
            <li><Link className= "item" href='/pages/home'>Inicio</Link></li>
            <hr />
            <li><Link className= "item" href='/pages/statement'>Extrato</Link></li>
            <hr />
            <li><Link className= "item" href='/pages/home'>Cartões</Link></li>
            <hr />
            <li><Link className= "item" href='/pages/home'>Transações</Link></li>
            <hr />
            <li><Link className= "item" href='/pages/home'>Todos os serviços</Link></li>

        </ul>  
    );
}
export default function Menu(props: MenuProps) {
    
    if(props.type === 1) {
        return(
            <div className="border-components lateral-diminuido">
                <MenuItens></MenuItens> 
            </div>
        );
    } else {
        return(
            <div className="border-components lateral-inteiro">
                <MenuItens></MenuItens> 
            </div>
        );
    };

}