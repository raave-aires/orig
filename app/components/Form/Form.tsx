"use client";

// dependências:
import { useState } from "react";

//componentes:
import { TipoDeContrato } from "../TipoDeContrato/TipoDeContrato";
import { FormAFixar } from "./FormAFixar/FormAFixar";
import { FormFixado } from "./FormFixado/FormFixado";
import { FormMisto } from "./FormMisto/FormMisto";

export function Form() {
    //hook do tipo de contraato
    const [tipoSelecionado, setTipoSelecionado] = useState("");

    return (
        <>
            <TipoDeContrato
                tipoSelecionado={tipoSelecionado}
                setTipoSelecionado={setTipoSelecionado}
            />

            {tipoSelecionado === "0" ? null : tipoSelecionado === "A fixar" ? (
                <FormAFixar />
            ) : tipoSelecionado === "Fixado" ? (
                <FormFixado />
            ) : tipoSelecionado === "Misto" ? (
                <FormMisto />
            ) : null }
        </>
    );
}
