//Importação de dependências:
import React, { SetStateAction } from 'react';
import { DateValue } from "@internationalized/date";

//Importação de componentes:
import { Accordion, AccordionItem, DatePicker, Input, Select, SelectItem, RadioGroup, Radio } from "@nextui-org/react";
import { NumericFormat } from 'react-number-format';

export function FormFixado({ dataContrato, setDataContrato, transacao, setTransacao, produto, setProduto, safra, setSafra, volume, setVolume, sacas, setSacas, moeda, setMoeda, dolar,setDolar, real, setReal, ptax, setPtax, ontem }: Props) {
    const input_props_volume = {
        label: "Volume (t)",
        className: "max-w-64",
    }

    const input_props_sacas = {
        label: "Sacas",
        className: "max-w-64",
        isDisabled: true
    }

    const input_props_preco = {
        label: "Valor da saca",
        className: "max-w-64",
    }

    const input_props_ptax = {
        label: "Ptax",
        className: "max-w-64",
    }

    return (
        <>
            <section className="bg-[#101010] mt-5 flex flex-col gap-5 p-5 rounded-xl">
                <h1 className="text-xl">Cadastro de contrato com preço fixado</h1>
                <Accordion selectionMode="multiple" variant="bordered" isCompact={true}>
                    <AccordionItem key="1" aria-label="Accordion 1" title="Dados básicos do contrato" > {/* Aba de inserção das informações básicas */}
                        <div className="flex flex-row gap-4 mb-3">
                            <DatePicker
                                variant="faded"
                                className="max-w-64"
                                label="Data do contrato"
                                showMonthAndYearPickers

                                value={dataContrato}
                                onChange={setDataContrato}
                            />

                            {/* Transação */}
                            <Select
                                variant="faded"
                                className="max-w-60"
                                label="Tipo de transação"

                                selectedKeys={[transacao]}
                                onChange={(e) => setTransacao(e.target.value)}
                            >
                                <SelectItem key={"Compra"}>
                                    Compra
                                </SelectItem>
                                <SelectItem key={"Venda"}>
                                    Venda
                                </SelectItem>
                                <SelectItem key={"Troca"}>
                                    Troca
                                </SelectItem>
                            </Select>

                            {/* Produto */}
                            <Select
                                variant="faded"
                                className="max-w-60"
                                label="Produto"

                                selectedKeys={[produto]}
                                onChange={(e) => setProduto(e.target.value)}

                            >
                                <SelectItem key={"Soja"}>
                                    Soja
                                </SelectItem>
                                <SelectItem key={"Milho"}>
                                    Milho
                                </SelectItem>
                                <SelectItem key={"Sementes"}>
                                    Sementes
                                </SelectItem>
                            </Select>

                            {/* Safra */}
                            <Select
                                variant="faded"
                                className="max-w-60"
                                label="Safra"

                                selectedKeys={[safra]}
                                onChange={(e) => setSafra(e.target.value)}

                            >
                                <SelectItem key={"2024/2025"}>
                                    2024/2025
                                </SelectItem>
                                <SelectItem key={"2025/2026"}>
                                    2025/2026
                                </SelectItem>
                                <SelectItem key={"2026/2027"}>
                                    2026/2027
                                </SelectItem>
                                <SelectItem key={"2027/2028"}>
                                    2027/2028
                                </SelectItem>
                            </Select>
                        </div>
                    </AccordionItem>

                    <AccordionItem key="2" aria-label="Accordion 2" title="Volume e valor">
                        <div className="flex flex-row gap-4 mb-3"> {/* Aba de inserção das informações de quantidade e valor */}
                            <NumericFormat 
                                customInput={Input}
                                {...input_props_volume}
                                variant="faded"
                                endContent={
                                    <div className="pointer-events-none flex items-center">
                                      <span className="text-default-400 text-small">t</span>
                                    </div>
                                }

                                valueIsNumericString={true}
                                thousandSeparator=" "
                                decimalSeparator=","
                                
                                value={volume}
                                onChange={(e) => setVolume(e.target.value)}
                            />

                            <NumericFormat 
                                customInput={Input}
                                {...input_props_sacas}
                                variant="faded"

                                valueIsNumericString={true}
                                thousandSeparator=" "
                                decimalScale={0}
                                
                                value={sacas}
                                onChange={(e) => setSacas(e.target.value)}
                            />

                            <RadioGroup value={moeda} onChange={(e)=>setMoeda(e.target.value)}>
                                <Radio value="Dólar americano">Dólar</Radio>
                                <Radio value="Real brasileiro">Real</Radio>
                            </RadioGroup>

                            {
                                moeda === "" ? null : moeda === "Dólar americano" ? 
                                (<>
                                    <NumericFormat
                                        customInput={Input}
                                        {...input_props_preco}
                                        variant="faded"
                                        startContent={
                                            <div className="pointer-events-none flex items-center">
                                              <span className="text-default-400 text-small">$</span>
                                            </div>
                                        }

                                        valueIsNumericString={true}
                                        thousandSeparator=" "
                                        decimalScale={4}

                                        value={dolar}
                                        onChange={(e) => setDolar(e.target.value)}
                                    />

                                    <NumericFormat
                                        customInput={Input}
                                        {...input_props_ptax}
                                        variant="faded"
                                        startContent={
                                            <div className="pointer-events-none flex items-center">
                                              <span className="text-default-400 text-small">R$</span>
                                            </div>
                                        }
                                        description={`O valor é referente a ${ontem}`}

                                        valueIsNumericString={true}
                                        thousandSeparator=" "
                                        decimalScale={4}

                                        value={ptax}
                                        onChange={(e) => setPtax(e.target.value)}
                                    />
                                </>                                    
                                ) : moeda === "Real brasileiro" ? 
                                (
                                    <NumericFormat
                                        customInput={Input}
                                        {...input_props_preco}
                                        variant="faded"
                                        startContent={
                                            <div className="pointer-events-none flex items-center">
                                              <span className="text-default-400 text-small">R$</span>
                                            </div>
                                        }
                                        
                                        valueIsNumericString={true}
                                        thousandSeparator=" "
                                        decimalScale={4}

                                        value={real}
                                        onChange={(e) => setReal(e.target.value)}
                                    />
                                ) : null
                            }
                        </div>
                    </AccordionItem>
                </Accordion>
            </section>
        </>
    );
}

interface Props {
    // datas de contrato
    dataContrato: DateValue,
    setDataContrato: React.Dispatch<SetStateAction<DateValue>>,

    //tipo de transação
    transacao: string,
    setTransacao: (e: string) => void;

    //tipo de produto
    produto: string,
    setProduto: (e: string) => void;

    //safra
    safra: string,
    setSafra: (e: string) => void;

    //volume
    volume: string,
    setVolume: (e: string) => void;

    //sacas
    sacas: string,
    setSacas: (e: string) => void;

    //moeda
    moeda: string
    setMoeda: (e: string) => void;

    //dolar
    dolar: string;
    setDolar: (e: string) => void;

    //real
    real: string;
    setReal: (e: string) => void;

    //Ptax
    ptax: string;
    setPtax: (e: string) => void;

    ontem: string;
}