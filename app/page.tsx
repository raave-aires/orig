import {Providers} from "./providers";

import { Header } from "../src/components/Header/Header";
import { HeaderItem } from "../src/components/Header/HeaderItem";

export default function Home() {
    return (
        <>
            <Providers>
                <Header>
                    <HeaderItem 
                        item_link="/cadastro"
                        item_text="Cadastrar"
                        target="_self"
                    />
                    
                    <HeaderItem 
                        item_link="/conta/entrar"
                        item_text="Entre"
                        target="_self"
                    />
                </Header>
            </Providers>
        </>
    );
}
