//Importação de dependências:
import React, { SetStateAction } from 'react';
import { DateValue } from "@internationalized/date";

//Importação de componentes:
import { Accordion, AccordionItem, DatePicker, Input, Select, SelectItem } from "@nextui-org/react";

export function FormAFixar({ dataContrato, setDataContrato, transacao, setTransacao, produto, setProduto, safra, setSafra, volume, setVolume, sacas, setSacas, preco, setPreco }: Props) {
    
    const handleKeyPress = (e) => { //função para verificar o que foi digitado
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

    return (
        <>
            <h1 className="text-xl">Cadastrando contrato com preço a fixar</h1>
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
                        <Input
                            variant="faded"
                            className="max-w-64"

                            label="Volume (kg)"

                            type="number"

                            value={volume}
                            onChange={(e) => setVolume(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />

                        <Input
                            isDisabled
                            variant="faded"
                            className="max-w-52"

                            label="Sacas"

                            type="number"

                            value={sacas}
                            onChange={(e) => setSacas(e.target.value)}
                        />

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

    //preço
    preco: string,
    setPreco: (e: string) => void;
}