import { Content } from "../components/Content/Content";
import { Form } from "../components/Form/Form";
import { Header } from "../components/Header/Header";
import { HeaderItem } from "../components/Header/HeaderItem";

export default function Cadastro(){
    return(
        <>
            <Header>
                <HeaderItem 
                    item_link="/"
                    item_text="Início"
                />

                <HeaderItem 
                    item_link="https://youtube.com/"
                    item_text="YouTube"
                />
            </Header>
            
            <Content>
                <Form />
            </Content>
        </>
    );
}