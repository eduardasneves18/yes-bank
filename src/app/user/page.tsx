import Container from "@/app/components/containers/containers";
import './user.css'

export default function User() {
    const children: React.ReactNode = (
        <div className="user"> 
                <Container type={"login"} classname="login"/>
        </div>
    );
    return(
        <>  
            {children}
        </>
    );
}
