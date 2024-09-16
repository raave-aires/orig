import {Select, SelectSection, SelectItem} from "@nextui-org/react";

interface Props {
    tipoSelecionado: string
    setTipoSelecionado: (e: string) => void;
    visual: string
}

export function TipoDeContrato({tipoSelecionado, setTipoSelecionado, visual}: Props){
    
    return(
        <>
            <Select
                label="Tipo de contrato"
                
                selectedKeys={[tipoSelecionado]}
                onChange={(e)=>setTipoSelecionado(e.target.value)}

                variant={visual}
                className="max-w-60"
            >
                <SelectItem key={"A fixar"}>
                    Preço a fixar
                </SelectItem>
                <SelectItem key={"Fixado"}>
                    Preço fixado
                </SelectItem>
            </Select>
        </>
    );
}