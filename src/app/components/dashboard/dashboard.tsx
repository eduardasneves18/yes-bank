import "./dashboard.css";

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
