"use client"

// Dependências:
import { useState } from "react";

//Componentes:
import { TipoDeContrato } from "../TipoDeContrato/TipoDeContrato";
import {DatePicker} from "@nextui-org/date-picker";

export function Form(){
    const [tipoSelecionado, setTipoSelecionado] = useState('Selecione');
    
    return(
        <>
            <TipoDeContrato 
                tipoSelecionado={tipoSelecionado}
                setTipoSelecionado={setTipoSelecionado}
            />
            <DatePicker/>
            {tipoSelecionado === "0" ? null : 
                tipoSelecionado === "A fixar" ? <p>1</p> : 
                tipoSelecionado === "Fixado" ? <p>2</p> : null
            }

            
            
        </>
    );
}