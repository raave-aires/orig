//Importação de dependências:
import React, { SetStateAction } from 'react';
import { DateValue } from "@internationalized/date";

//Importação de componentes:
import { Accordion, AccordionItem, DatePicker, Input, Select, SelectItem, RadioGroup, Radio } from "@nextui-org/react";
import { NumericFormat } from 'react-number-format';

export function FormAFixar({ dataContrato, setDataContrato, transacao, setTransacao, produto, setProduto, safra, setSafra, volume, setVolume, sacas, setSacas, preco, setPreco, moeda, setMoeda }: Props) {
    
    const handleKeyPress = (e: { keyCode: number; preventDefault: () => void; }) => { //função para verificar o que foi digitado
        const somente_numeros = /[0-9]/;
        const tecla = String.fromCharCode(e.keyCode);
        const teclas_permitidas = [8, 46, 37, 39, 188, 190];

        if (teclas_permitidas.includes(e.keyCode)) { //verifica se o que foi digitado está na lista de teclas permitidas
            return;
        }

        if (!somente_numeros.test(tecla)) {//verifica se o que foi digitado é um número
            e.preventDefault(); //se não for, cancela o evento de entrada de dados
        }
    };

    const input_props_volume = {
        label: "Volume (t)",
        variant: ['faded'],
        className: "max-w-64"
    }

    const input_props_sacas = {
        label: "Sacas",
        variant: "faded",
        className: "max-w-64",
        isDisabled: true
    }

    return (
        <>
            <section className="bg-[#262626] mt-5 flex flex-col gap-5 p-5 rounded-xl">
                <h1 className="text-xl">Cadastro de contrato com preço a fixar</h1>
                <Accordion selectionMode="multiple" variant="splitted" isCompact={true}>
                    <AccordionItem key="1" aria-label="Accordion 1" title="Dados básicos do contrato" > {/* Aba de inserção das informações básicas */}
                        <div className="flex flex-row gap-4 mb-3">
                            <DatePicker
                                label="Data do contrato"
                                value={dataContrato}
                                onChange={setDataContrato}
                                variant="faded"
                                className="max-w-64"
                                showMonthAndYearPickers
                            />

                            {/* Transação */}
                            <Select
                                label="Tipo de transação"

                                selectedKeys={[transacao]}
                                onChange={(e) => setTransacao(e.target.value)}

                                variant="faded"
                                className="max-w-60"
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
                                label="Produto"

                                selectedKeys={[produto]}
                                onChange={(e) => setProduto(e.target.value)}

                                variant="faded"
                                className="max-w-60"
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
                                label="Safra"

                                selectedKeys={[safra]}
                                onChange={(e) => setSafra(e.target.value)}

                                variant="faded"
                                className="max-w-60"
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
                                valueIsNumericString={true}
                                thousandSeparator=" "
                                decimalSeparator=","
                                customInput={Input}
                                {...input_props_volume}
                                
                                value={volume}
                                onChange={(e) => setVolume(e.target.value)}
                                
                            />

                            <NumericFormat 
                                valueIsNumericString={true}
                                thousandSeparator=" "
                                decimalScale={0}
                                customInput={Input}
                                {...input_props_sacas}
                                
                                value={sacas}
                                onChange={(e) => setSacas(e.target.value)}
                                
                            />

                            <RadioGroup value={moeda} onChange={(e)=>setMoeda(e.target.value)}>
                                <Radio value="Dólar americano">Dólar</Radio>
                                <Radio value="Real brasileiro">Real</Radio>
                            </RadioGroup>

                            <Input
                                variant="faded"
                                className="max-w-64"

                                label="Valor/Saca"

                                type="number"

                                value={preco}
                                onChange={(e) => setPreco(e.target.value)}
                                onKeyDown={handleKeyPress}
                            />

                            
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

    //preço
    preco: string,
    setPreco: (e: string) => void;
}