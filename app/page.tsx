import { Header } from "./components/Header/Header";
import { HeaderItem } from "./components/Header/HeaderItem";

export default function Home() {
    return (
        <>
            <Header>
                <HeaderItem 
                    item_link="/cadastro"
                    item_text="Cadastrar"
                />
                
                <HeaderItem 
                    item_link="/conta/entrar"
                    item_text="Entre"
                />
            </Header>
        </>
    );
}
