//dependências
import React, { useState, useEffect } from 'react';
import { Input, RadioGroup, Radio, Tooltip } from "@nextui-org/react";
import { NumericFormat } from 'react-number-format';

//bibliotecas
import { today, getLocalTimeZone, Time } from "@internationalized/date";
import { format, subDays } from "date-fns";

//personalização
import { CircleHelp } from 'lucide-react';

export function FormMisto() {
    const hoje = new Date()
    const dias_da_semana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const dia = dias_da_semana[hoje.getDay()];

    const data = today(getLocalTimeZone()).toString(); //função para obter a data atual, que será passada como valor padrão de data
    const hora = new Time(new Date().getHours(), new Date().getMinutes());
    const hora_de_atualizacao = new Time(13, 30);

    const [ptax, setPtax] = useState("");
    const [dolar, setDolar] = useState("");
    const [real, setReal] = useState("");
    const [moeda, setMoeda] = useState("");
    const [data_checada, setData_checada] = useState("");

    //função de chamada da api do ptax
    useEffect(() => {
        const obter_ptax = async ()=>{
            if(dia==="Segunda-feira"){
                const dia_do_ptax: string = format(subDays(data, 2), "MM-dd-yyyy");
                const api_url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dia_do_ptax}'&$top=100&$format=json`;
                const solicitar = await fetch(api_url);
                const resposta = await solicitar.json();
                setPtax(resposta.value[0].cotacaoVenda);
                setData_checada(`O valor é referente à sexta-feira, dia ${format(dia_do_ptax,"dd/MM")}`)
            } else {
                if(hora.compare(hora_de_atualizacao) <= 0 ){
                    console.log(hora.compare(hora_de_atualizacao), 'É antes de 1:30 PM');
                    const dia_do_ptax: string = format(subDays(data, 0), "MM-dd-yyyy");
                    const api_url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dia_do_ptax}'&$top=100&$format=json`;
                    const solicitar = await fetch(api_url);
                    const resposta = await solicitar.json();
                    setPtax(resposta.value[0].cotacaoVenda);
                    setData_checada(`O valor é referente a ontem, dia ${format(dia_do_ptax,"dd/MM")}`)
                    
                } else {
                    console.log(hora.compare(hora_de_atualizacao), 'É depois de 1:30 PM');
                    const dia_do_ptax: string = format(data, "MM-dd-yyyy");
                    const api_url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dia_do_ptax}'&$top=100&$format=json`;
                    const solicitar = await fetch(api_url);
                    const resposta = await solicitar.json();
                    setPtax(resposta.value[0].cotacaoVenda);
                    setData_checada(`O valor é referente a hoje, dia ${format(dia_do_ptax,"dd/MM")}`)
                };
            };
        };

        if (moeda === "Dólar americano") {
            obter_ptax();
        } else {
            setPtax("");
        }
    }, [moeda, dia, data, setPtax, setData_checada]); //fim da função de chamada da api do ptax

    return (
        <>
            <RadioGroup value={moeda} onChange={(e) => { setMoeda(e.target.value) }}>
                <Radio value="Dólar americano">Dólar</Radio>
                <Radio value="Real brasileiro">Real</Radio>
            </RadioGroup>

            <NumericFormat
                customInput={Input}
                variant="faded"
                startContent={
                    <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">R$</span>
                    </div>
                }
                endContent={
                    <Tooltip content={
                        <div className="p-2 max-w-44">
                            <div className="text-small">O Ptax é <a href="https://github.com/raave-aires/orig/wiki/Como-funciona-a-atualiza%C3%A7%C3%A3o-autom%C3%A1tica-da-taxa-de-c%C3%A2mbio-no-Orig%C3%AB%3F" target="_blank" className="text-cyan-500 hover:underline hover:underline-offset-2">preenchido automaticamente</a> com a cotação mais recente. Mas caso precise, verifique manualmente <a href="https://www.bcb.gov.br/estabilidadefinanceira/fechamentodolar" target="_blank" className="text-cyan-500 hover:underline hover:underline-offset-2">clicando aqui</a>.</div>
                        </div>
                    } className="cursor-help">
                        <CircleHelp stroke="#595960" size={20} className="cursor-help" />
                    </Tooltip>
                }

                description={`${data_checada}`}
                valueIsNumericString={true}
                thousandSeparator=" "
                decimalScale={4}
                value={ptax}
                onChange={(e) => setPtax(e.target.value)}
            />
        </>
    );
}

interface Props {
    ptax: string;
    setPtax: (e: string) => void;
}