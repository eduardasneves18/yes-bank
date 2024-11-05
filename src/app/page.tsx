import RootLayout from "./layout";

interface HomeProps{
    text?: string; 
    path?: string | undefined;
    className?: string | undefined;
}

export default function Home(props: HomeProps) {
    return(
        <RootLayout>
            {""}
        </RootLayout>
    );
}