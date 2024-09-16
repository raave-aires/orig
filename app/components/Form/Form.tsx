"use client"

// Dependências:
import { useState } from "react";
import { DateValue, parseDate, today, getLocalTimeZone } from "@internationalized/date";

//Componentes:
import { TipoDeContrato } from "../TipoDeContrato/TipoDeContrato";
import { FormAFixar } from "./FormAFixar/FormAFixar";

export function Form(){
    //visuais dos campos
    const visual_padrao = "faded";

    //Hook do tipo de contraato
    const [tipoSelecionado, setTipoSelecionado] = useState('Selecione');

    //Hooks da aba de Dados do contrato
    let hoje = (today(getLocalTimeZone())).toString() //função para obter a data atual, que será passada como valor padrão de data
    const [dataContrato, setDataContrato] = useState<DateValue>(parseDate(hoje))
    const [transacao, setTransacao] = useState("Selecione")
    const [produto, setProduto] = useState("Selecione")
    const [safra, setSafra] = useState("Selecione")

    return(
        <>
            <TipoDeContrato 
                tipoSelecionado={tipoSelecionado}
                setTipoSelecionado={setTipoSelecionado}
                visual={visual_padrao}
            />

            {tipoSelecionado === "0" ? null : 
                tipoSelecionado === "A fixar" ? 
                    <FormAFixar 
                        visual={visual_padrao}

                        dataContrato={dataContrato}
                        setDataContrato={setDataContrato}
                        
                        transacao={transacao}
                        setTransacao={setTransacao}

                        produto={produto}
                        setProduto={setProduto}

                        safra={safra}
                        setSafra={setSafra}
                    /> : 
                tipoSelecionado === "Fixado" ? <p>2</p> : null
            }
        </>
    );
}