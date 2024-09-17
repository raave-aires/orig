"use client"

// Dependências:
import { useState, useEffect } from "react";
import { DateValue, parseDate, today, getLocalTimeZone } from "@internationalized/date";

//Componentes:
import { TipoDeContrato } from "../TipoDeContrato/TipoDeContrato";
import { FormAFixar } from "./FormAFixar/FormAFixar";



export function Form() {
    //Hook do tipo de contraato
    const [tipoSelecionado, setTipoSelecionado] = useState('Selecione');

    //Hooks da aba de Dados do contrato
    const hoje = (today(getLocalTimeZone())).toString() //função para obter a data atual, que será passada como valor padrão de data
    const [dataContrato, setDataContrato] = useState<DateValue>(parseDate(hoje))
    const [transacao, setTransacao] = useState("Selecione")
    const [produto, setProduto] = useState("Selecione")
    const [safra, setSafra] = useState("Selecione")
    const [volume, setVolume] = useState("")
    const [sacas, setSacas] = useState("")
    const [preco, setPreco] = useState("")

    //Função para calcular Sacas
    useEffect(()=>{
        const handleKeyUp=()=>{
            if(volume){
                const result = parseFloat(volume)/60;
                setSacas(result.toFixed(2)); // Definindo o valor de sacas com 2 casas decimais
            } else{
                setSacas("");
            }
        };

        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [volume]); // volume é a dependência do useEffect

    return (
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

                        sacas={sacas}
                        setSacas={setSacas}

                        preco={preco}
                        setPreco={setPreco}
                    /> :
                    tipoSelecionado === "Fixado" ? <p>2</p> : null
            }
        </>
    );
}