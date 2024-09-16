import { Content } from "../components/Content/Content";
import { Form } from "../components/Form/Form";
import { TipoDeContrato } from "../components/TipoDeContrato/TipoDeContrato";


export default function Cadastro(){
    return(
        <>
            <Content>
                <TipoDeContrato />
            </Content>
        </>
    );
}