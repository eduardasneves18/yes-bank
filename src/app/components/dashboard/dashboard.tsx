import "./dashboard.css";
import Header from '@/app/components/header/header';

interface DashboardProps{
    children?: React.ReactNode;
    className?: string | undefined;
}

export default function Dashboard(props: DashboardProps) {
    return(
        <>
            <main className="dashboard">
                {props.children}
            </main>
        </>
    )
}
