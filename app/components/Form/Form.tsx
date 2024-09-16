"use client"

// Dependências:
import { useState } from "react";
import { DateValue, parseDate, today, getLocalTimeZone } from "@internationalized/date";

//Componentes:
import { TipoDeContrato } from "../TipoDeContrato/TipoDeContrato";
import { FormAFixar } from "./FormAFixar/FormAFixar";

export function Form(){
    //Hook do tipo de contraato
    const [tipoSelecionado, setTipoSelecionado] = useState('Selecione');

    //Hooks da aba de Dados do contrato
    const hoje = (today(getLocalTimeZone())).toString() //função para obter a data atual, que será passada como valor padrão de data
    const [dataContrato, setDataContrato] = useState<DateValue>(parseDate(hoje))
    const [transacao, setTransacao] = useState("Selecione")
    const [produto, setProduto] = useState("Selecione")
    const [safra, setSafra] = useState("Selecione")
    const [volume, setVolume] = useState("")

    return(
        <>
            <TipoDeContrato 
                tipoSelecionado={tipoSelecionado}
                setTipoSelecionado={setTipoSelecionado}
            />

            {tipoSelecionado === "0" ? null : 
                tipoSelecionado === "A fixar" ? 
                    <FormAFixar 
                        dataContrato={dataContrato}
                        setDataContrato={setDataContrato}
                        
                        transacao={transacao}
                        setTransacao={setTransacao}

                        produto={produto}
                        setProduto={setProduto}

                        safra={safra}
                        setSafra={setSafra}

                        volume={volume}
                        setVolume={setVolume}
                    /> : 
                tipoSelecionado === "Fixado" ? <p>2</p> : null
            }
        </>
    );
}