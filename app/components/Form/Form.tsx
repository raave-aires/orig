"use client";

// dependências:
import { useState, useEffect } from "react";
import { DateValue, parseDate, today, getLocalTimeZone } from "@internationalized/date";
import { format, subDays } from "date-fns";

//componentes:
import { TipoDeContrato } from "../TipoDeContrato/TipoDeContrato";
import { FormAFixar } from "./FormAFixar/FormAFixar";
import { FormFixado } from "./FormFixado/FormFixado";

export function Form() {
    //hook do tipo de contraato
    const [tipoSelecionado, setTipoSelecionado] = useState("");

    //hooks da aba de Dados do contrato a fixar
    const hoje = today(getLocalTimeZone()).toString(); //função para obter a data atual, que será passada como valor padrão de data
    const [dataContrato, setDataContrato] = useState<DateValue | undefined>();
    const [transacao, setTransacao] = useState("");
    const [produto, setProduto] = useState("");
    const [safra, setSafra] = useState("");
    const [volume, setVolume] = useState("");
    const [sacas, setSacas] = useState("");
    const [moeda, setMoeda] = useState("");

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
    //hooks do acordeão 3: Dados de entrega
    const [filialF, setFilialF] = useState("");
    const [filialTercF, setFilialTercF] = useState("");

    //cálculos de datas
    const ontemDesc = format(subDays(hojeF, 0), "dd/MM"); // data a ser exibida na descrição
    const ontem: string = format(subDays(hojeF, 0), "MM-dd-yyyy"); //data formatada pra ser usada na api do bacen
    const [dataEntregaF, setDataEntregaF] = useState<DateValue>();

    //funções para calcular Sacas
    useEffect(() => {
        const handleKeyUp = () => {
            if (volume) {
                const volumeSemSeparadores = volume.replace(/\s/g, ""); //expressão regular para remover os espaços entre os números
                const result = (Number(volumeSemSeparadores) * 1000) / 60;
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
                const volumeSemSeparadoresF = volumeF.replace(/\s/g, ""); //expressão regular para remover os espaços entre os números
                const rSacas = (Number(volumeSemSeparadoresF) * 1000) / 60;
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
            if (volumeF && dolarF) {
                const fVolume = volumeF.replace(/\s/g, ""); //expressão regular para remover os espaços entre os números
                const fDolar = parseFloat(dolarF);
                const rTotal = Number(fVolume) * fDolar;
                setValor_total(rTotal.toString());
            } else if (volumeF && realF) {
                const fVolume = volumeF.replace(/\s/g, ""); //expressão regular para remover os espaços entre os números
                const fReal = parseFloat(realF);
                const rTotal = Number(fVolume) * fReal;
                setValor_total(rTotal.toString());
            } else {
                setValor_total("");
            }
        };

        window.addEventListener("keyup", handleKeyUP);

        return () => {
            window.removeEventListener("keyup", handleKeyUP);
        };
    }, [volumeF, dolarF, realF]); //fim da função para calcular o valor total

    //função de chamada da api do ptax
    useEffect(() => {
        const obter_ptax = async (dia: string) => {
            const api_url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dia}'&$top=100&$format=json`;
            const solicitar = await fetch(api_url);
            const resposta = await solicitar.json();
            setPtaxF(resposta.value[0].cotacaoVenda);
        };

        if (moedaF === "Dólar americano") {
            obter_ptax(ontem);
        } else {
            setPtaxF("");
        }
    }, [moedaF, ontem, setPtaxF]); //fim da função de chamada da api do ptax

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
                    ontem={ontemDesc}
                    
                    //props do acordeão 3: Dados de entrega
                    filial={filialF}
                    setFilial={setFilialF}
                    filialTerc={filialTercF}
                    setFilialTerc={setFilialTercF}
                    dataEntrega={dataEntregaF}
                    setDataEntrega={setDataEntregaF}
                />
            ) : null}
        </>
    );
}
