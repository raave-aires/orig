"use client";

// dependências:
import { useState, useEffect } from "react";
import { DateValue, today, getLocalTimeZone } from "@internationalized/date";
import { format, subDays } from "date-fns";

//componentes:
import { TipoDeContrato } from "../TipoDeContrato/TipoDeContrato";
import { FormAFixar } from "./FormAFixar/FormAFixar";
import { FormFixado } from "./FormFixado/FormFixado";
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
    const [municipioF, setMunicipioF] = useState("");

    //hooks da aba de Dados do contrato fixado
    const hojeF = today(getLocalTimeZone()).toString(); //função para obter a data atual, que será passada como valor padrão de data
    const [dataContratoF, setDataContratoF] = useState<DateValue | undefined>();
    const [transacaoF, setTransacaoF] = useState("");
    const [produtoF, setProdutoF] = useState("");
    const [safraF, setSafraF] = useState("");
    const [volumeF, setVolumeF] = useState("");
    const [sacasF, setSacasF] = useState("");
    const [moedaF, setMoedaF] = useState("");
    const [dolarF, setDolarF] = useState("");
    const [realF, setRealF] = useState("");
    const [ptaxF, setPtaxF] = useState("");
    const [valor_total, setValor_total] = useState("");
    const [dataPagamentoF, setDataPagamentoF] = useState<DateValue | undefined>();

    //hooks do acordeão 3: Dados de entrega
    const [filialF, setFilialF] = useState("");
    const [filialTercF, setFilialTercF] = useState("");

    //cálculos de datas
    const [dataEntregaF, setDataEntregaF] = useState<DateValue>();

    const [quilosF, setQuilosF] = useState("")
    const [toneladaF, setToneladaF] = useState("")

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

    useEffect(() => {
        const handleKeyUp = () => {
            if (volumeF) {
                const volumeSemSeparadoresF = volumeF.replace(/\s/g, "").replace(/,/g, "."); //expressão regular para remover os espaços entre os números
                console.log(volumeSemSeparadoresF)
                const rSacas = (parseFloat(volumeSemSeparadoresF) * 1000) / 60;
                setSacasF(rSacas.toFixed(2));
            } else {
                setSacasF("");
            }
        };

        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [volumeF]); // fim das função para calcular sacas no fixado

    //função para calcular o valor total
    useEffect(() => {
        const handleKeyUP = () => {
            if (sacasF && dolarF) {
                const fSacas = sacasF.replace(/\s/g, ""); //expressão regular para remover os espaços entre os números
                const fDolar = parseFloat(dolarF);
                const rTotal = Number(fSacas) * fDolar;
                setValor_total(rTotal.toString());
            } else if (sacasF && realF) {
                const fSacas = sacasF.replace(/\s/g, ""); //expressão regular para remover os espaços entre os números
                const fReal = parseFloat(realF);
                const rTotal = Number(fSacas) * fReal;
                setValor_total(rTotal.toString());
            } else {
                setValor_total("");
            }
        };

        window.addEventListener("keyup", handleKeyUP);

        return () => {
            window.removeEventListener("keyup", handleKeyUP);
        };
    }, [sacasF, dolarF, realF]); //fim da função para calcular o valor total

    //função para calcular toneladas
    useEffect(()=> {
        const handleKeyUP = ()=>{
            if(quilosF){
                const fQuilos = quilosF.replace(/\s/g, "").replace(/,/g, "."); //expressão regular para remover os espaços entre os números
                const toneladas = Number(fQuilos)/1000;
                setToneladaF(toneladas.toString());
            } else {
                setToneladaF("");
            };
        }
        
        window.addEventListener("keyup", handleKeyUP);

        return () => {
            window.removeEventListener("keyup", handleKeyUP);
        };
    }, [quilosF, toneladaF, setToneladaF]); //fim da função para calcular toneladas

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
                <FormFixado
                    dataContrato={dataContratoF}
                    setDataContrato={setDataContratoF}
                    transacao={transacaoF}
                    setTransacao={setTransacaoF}
                    produto={produtoF}
                    setProduto={setProdutoF}
                    safra={safraF}
                    setSafra={setSafraF}
                    municipio={municipioF}
                    setMunicipio={setMunicipioF}
                    
                    //props do acordeão 2: Volume e valor
                    volume={volumeF}
                    setVolume={setVolumeF}
                    sacas={sacasF}
                    setSacas={setSacasF}
                    moeda={moedaF}
                    setMoeda={setMoedaF}
                    dolar={dolarF}
                    setDolar={setDolarF}
                    real={realF}
                    setReal={setRealF}
                    ptax={ptaxF}
                    setPtax={setPtaxF}
                    valor_total={valor_total}
                    setValor_total={setValor_total}
                    dataPagamento={dataPagamentoF}
                    setDataPagamento={setDataPagamentoF}

                    //props do acordeão 3: Dados de entrega
                    filial={filialF}
                    setFilial={setFilialF}
                    filialTerc={filialTercF}
                    setFilialTerc={setFilialTercF}
                    dataEntrega={dataEntregaF}
                    setDataEntrega={setDataEntregaF}

                    quilos={quilosF}
                    setQuilos={setQuilosF}
                    tonelada={toneladaF}
                    setTonelada={setToneladaF}
                />
            ) : tipoSelecionado === "Misto" ? (
                <p>Teste</p>
            ) : null }
        </>
    );
}
