"use client"

import { useState } from "react";

interface Props {
    tipoSelecionado: string
    setTipoSelecionado: ()=>void;
}

export function TipoDeContrato({tipoSelecionado, setTipoSelecionado}: Props){
    return(
        <>
            <label htmlFor="tipo_de_contrato" className="flex flex-col gap-2 max-w-96">
                Tipo de contrato
                <select 
                    value={tipoSelecionado}
                    onChange={setTipoSelecionado}
                    name="tipo_de_contrato" id="tipo_de_contrato" className="bg-[#1d2432] rounded-lg"
                    required
                >
                    <option value="0">{tipoSelecionado}</option>
                    <option value="A fixar">Preço a fixar</option>
                    <option value="Fixado">Preço fixado</option>
                </select>
            </label>
        </>
    );
}