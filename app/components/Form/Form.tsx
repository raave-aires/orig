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
                        dataContrato={dataContrato}
                        setDataContrato={setDataContrato}
                        visual={visual_padrao}
                    /> : 
                tipoSelecionado === "Fixado" ? <p>2</p> : null
            }
        </>
    );
}