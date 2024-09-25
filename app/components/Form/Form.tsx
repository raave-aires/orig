"use client";

// dependências:
import { useState, useEffect } from "react";
import { DateValue } from "@internationalized/date";

//componentes:
import { TipoDeContrato } from "../TipoDeContrato/TipoDeContrato";
import { FormAFixar } from "./FormAFixar/FormAFixar";
import { FormFixado } from "./FormFixado/FormFixado";
import { FormMisto } from "./FormMisto/FormMisto";
// import { FormMisto } from "./FormMisto/FormMisto";

export function Form() {
    //hook do tipo de contraato
    const [tipoSelecionado, setTipoSelecionado] = useState("");

    //hooks da aba de Dados do contrato a fixar
    const [dataContrato, setDataContrato] = useState<DateValue | undefined>();
    const [transacao, setTransacao] = useState("");
    const [produto, setProduto] = useState("");
    const [safra, setSafra] = useState("");
    const [volume, setVolume] = useState("");
    const [sacas, setSacas] = useState("");
    const [moeda, setMoeda] = useState("");
    
    //funções para calcular Sacas
    useEffect(() => {
        const handleKeyUp = () => {
            if (volume) {
                const volumeSemSeparadores = volume.replace(/\s/g, "").replace(/,/g, "."); //expressão regular para remover os espaços entre os números
                const result = (parseFloat(volumeSemSeparadores) * 1000) / 60;
                setSacas(result.toFixed(2));
            } else {
                setSacas("");
            }
        };

        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [volume]); // fim das função para calcular sacas no a fixar

    return (
        <>
            <TipoDeContrato
                tipoSelecionado={tipoSelecionado}
                setTipoSelecionado={setTipoSelecionado}
            />

            {tipoSelecionado === "0" ? null : tipoSelecionado === "A fixar" ? (
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
                    sacas={sacas}
                    setSacas={setSacas}
                    moeda={moeda}
                    setMoeda={setMoeda}
                />
            ) : tipoSelecionado === "Fixado" ? (
                <FormFixado />
            ) : tipoSelecionado === "Misto" ? (
                <FormMisto />
            ) : null }
        </>
    );
}
