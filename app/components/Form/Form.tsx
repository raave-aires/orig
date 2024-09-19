"use client";

// Dependências:
import { useState, useEffect } from "react";
import {
  DateValue,
  parseDate,
  today,
  getLocalTimeZone,
} from "@internationalized/date";

//Componentes:
import { TipoDeContrato } from "../TipoDeContrato/TipoDeContrato";
import { FormAFixar } from "./FormAFixar/FormAFixar";
import { FormFixado } from "./FormFixado/FormFixado";

export function Form() {
  //Hook do tipo de contraato
  const [tipoSelecionado, setTipoSelecionado] = useState("");

  //Hooks da aba de Dados do contrato
  const hoje = today(getLocalTimeZone()).toString(); //função para obter a data atual, que será passada como valor padrão de data
  const [dataContrato, setDataContrato] = useState<DateValue>(parseDate(hoje));
  const [transacao, setTransacao] = useState("");
  const [produto, setProduto] = useState("");
  const [safra, setSafra] = useState("");
  const [volume, setVolume] = useState("");
  const [sacas, setSacas] = useState("");
  const [moeda, setMoeda] = useState("");

  const hojeF = today(getLocalTimeZone()).toString(); //função para obter a data atual, que será passada como valor padrão de data
  const [dataContratoF, setDataContratoF] = useState<DateValue>(parseDate(hojeF));
  const [transacaoF, setTransacaoF] = useState("");
  const [produtoF, setProdutoF] = useState("");
  const [safraF, setSafraF] = useState("");
  const [volumeF, setVolumeF] = useState("");
  const [sacasF, setSacasF] = useState("");
  const [moedaF, setMoedaF] = useState("");
  const [dolarF,setDolarF] = useState("");
  const [realF,setRealF] = useState("");
  const [ptaxF,setPtaxF] = useState("");

  //Função para calcular Sacas
  useEffect(() => {
    const handleKeyUp = () => {
      if (volume) {
        const volumeSemSeparadores = volume.replace(/\s/g, ""); //expressão regular para remover os espaços entre os números
        const result = Number(volumeSemSeparadores) / 60;
        setSacas(result.toFixed(2));
      } else {
        setSacas("");
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [volume]); // volume é a dependência do useEffect

  useEffect(() => {
    const handleKeyUp = () => {
      if (volumeF) {
        const volumeSemSeparadoresF = volumeF.replace(/\s/g, ""); //expressão regular para remover os espaços entre os números
        const result = Number(volumeSemSeparadoresF) / 60;
        setSacasF(result.toFixed(2));
      } else {
        setSacasF("");
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [volumeF]);

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
          ontem={hojeF}
        />
      ) : null}
    </>
  );
}
