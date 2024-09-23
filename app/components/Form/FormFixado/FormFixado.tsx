//dependências:
import React, { SetStateAction, useRef } from "react";
import { DateValue } from "@internationalized/date";

//componentes:
import { Accordion, AccordionItem, DatePicker, Input, RadioGroup, Radio, Select, SelectItem, Tooltip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Link} from "@nextui-org/react";
import { NumericFormat } from 'react-number-format';
import { CircleHelp } from 'lucide-react';

export function FormFixado({
    //props do acordeão 1: Dados básicos do contrato
    dataContrato, setDataContrato,
    transacao, setTransacao,
    produto, setProduto,
    safra, setSafra,
    municipio, setMunicipio,
    
    //props do acordeão 2: Volume e valor
    volume, setVolume,
    sacas, setSacas,
    moeda, setMoeda,
    dolar, setDolar,
    real, setReal,
    ptax, setPtax,
    valor_total, setValor_total,
    dataPagamento, setDataPagamento,
    ontem,

    //props do acordeão 3: Dados de entrega
    filial, setFilial,
    filialTerc, setFilialTerc,
    dataEntrega, setDataEntrega,

    quilos, setQuilos, tonelada, setTonelada,
}: Props) {

    const cVolumeFRef = useRef(null);
    //atributos usados pelo React number format para alterar os estilos do input personalizado que está sendo usado
    const input_props_volume = {
        label: "Volume (t)",
        className: "max-w-64",
        ref:{cVolumeFRef}
    };
    const input_props_sacas = {
        label: "Sacas",
        className: "max-w-56",
        isDisabled: true,
    };
    const input_props_preco = {
        label: "Valor da saca",
        className: "max-w-56",
    };
    const input_props_ptax = {
        label: "Ptax",
        className: "max-w-56",
    };
    const input_props_total = {
        label: "Valor total",
        className: "w-56",
        isDisabled: true,
    }; 
    const input_props_quilos = {
        label: "Volume em quilos (kg)",
        // className: "max-w-64",
    };
    const input_props_tonelada = {
        label: "Volume em toneladas (t)",
        // className: "max-w-64",
    };
    //fim dos atributos usados pelo React number format para alterar os estilos do input personalizado que está sendo usado

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <section className="bg-[#101010] mt-5 flex flex-col gap-5 p-5 rounded-xl"> {/*tela de fundo dos acordeões, tô pensando em removê-la*/}
                <h1 className="text-xl">Cadastro de contrato com preço fixado</h1>
                <Accordion selectionMode="multiple" variant="bordered" isCompact={true}>
                    <AccordionItem key="1" aria-label="Accordion 1" title="Dados básicos do contrato">
                        {" "}
                        {/* Aba de inserção das informações básicas */}
                        <div className="flex flex-wrap gap-4 mb-3"> {/*a acordeão parece não lidar bem com classes, então pus essa div*/}
                            <DatePicker
                                variant="faded"
                                className="max-w-44"
                                label="Data do contrato"
                                showMonthAndYearPickers
                                value={dataContrato}
                                onChange={setDataContrato}
                            />

                            {/* Transação */}
                            <Select
                                variant="faded"
                                className="max-w-48 min-w-40"
                                label="Tipo de transação"
                                selectedKeys={[transacao]}
                                onChange={(e) => setTransacao(e.target.value)}
                            >
                                <SelectItem key={"Compra"}>Compra</SelectItem>
                                <SelectItem key={"Venda"}>Venda</SelectItem>
                                <SelectItem key={"Troca"}>Troca</SelectItem>
                            </Select>

                            {/* Produto */}
                            <Select
                                variant="faded"
                                className="max-w-60"
                                label="Produto"
                                selectedKeys={[produto]}
                                onChange={(e) => setProduto(e.target.value)}
                            >
                                <SelectItem key={"Soja"}>Soja</SelectItem>
                                <SelectItem key={"Milho"}>Milho</SelectItem>
                                <SelectItem key={"Sementes"}>Sementes</SelectItem>
                            </Select>

                            {/* Safra */}
                            <Select
                                variant="faded"
                                className="max-w-40"
                                label="Safra"
                                selectedKeys={[safra]}
                                onChange={(e) => setSafra(e.target.value)}
                            >
                                <SelectItem key={"2024/2025"}>2024/2025</SelectItem>
                                <SelectItem key={"2025/2026"}>2025/2026</SelectItem>
                                <SelectItem key={"2026/2027"}>2026/2027</SelectItem>
                                <SelectItem key={"2027/2028"}>2027/2028</SelectItem>
                            </Select>

                            <Select
                                variant="faded"
                                className="max-w-48 min-w-40"
                                label="Município"
                                selectedKeys={[municipio]}
                                onChange={(e) => setMunicipio(e.target.value)}
                            >
                                <SelectItem key={"Açailândia"}>Açailândia</SelectItem>
                                <SelectItem key={"Dom Eliseu"}>Dom Eliseu</SelectItem>
                                <SelectItem key={"Paragominas"}>Paragominas</SelectItem>
                                <SelectItem key={"Rondon do Pará"}>Rondon do Pará</SelectItem>
                                <SelectItem key={"Tailândia"}>Tailândia</SelectItem>
                            </Select>
                        </div>
                    </AccordionItem>
                    {/*fim do acordeão 1, e, ao que parece, o acordeão pai não gosta de comentários. ps: só tem selects aqui*/}

                    <AccordionItem key="2" aria-label="Accordion 2" title="Volume e valor">
                        <div className="flex flex-wrap gap-4 mb-3"> {/*a acordeão parece não lidar bem com classes, então pus essa div*/}
                            {" "}
                            {/* Aba de inserção das informações de quantidade e valor */}
                            <NumericFormat
                                id="cVolumeF"

                                customInput={Input}
                                {...input_props_volume}
                                variant="faded"
                                endContent={
                                    <Tooltip content={
                                        <div className="p-2 max-w-44">
                                            <div className="text-small">O valor deste campo deve ser preenchido usando o peso em toneladas (t). Se precisar de um conversor de unidades, <Link onPress={onOpen} className="text-small text-cyan-500 hover:underline hover:underline-offset-2">clique aqui</Link>.</div>
                                        </div>
                                    } className="cursor-help">
                                        <p className="text-[#595960]">t</p>
                                    </Tooltip>
                                }

                                valueIsNumericString={true}
                                thousandSeparator=" "
                                decimalSeparator=","
                                allowedDecimalSeparators={[',','.',',']}
                                value={volume}
                                onChange={(e) => setVolume(e.target.value)}
                            />

                            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" size="xs">
                                <ModalContent>
                                    {(onClose) => (
                                        <>
                                            <ModalHeader>Título</ModalHeader>
                                            <ModalBody>
                                                <NumericFormat
                                                    label= "Volume em quilos (kg)"
                                                    customInput={Input}
                                                    
                                                    variant="faded"

                                                    valueIsNumericString={true}
                                                    thousandSeparator=" "
                                                    decimalSeparator=","

                                                    value={quilos}
                                                    onChange={(e) => setQuilos(e.target.value)}
                                                />

                                                <NumericFormat
                                                    customInput={Input}
                                                    {...input_props_tonelada}
                                                    variant="faded"
                                                    isDisabled

                                                    valueIsNumericString={true}
                                                    thousandSeparator=" "
                                                    decimalSeparator=","
                                                    
                                                    value={tonelada}
                                                    onChange={(e) => setTonelada(e.target.value)}
                                                />
                                            </ModalBody>

                                            <ModalFooter>
                                                <Button color="danger" variant="light" onPress={onClose}>Dispensar</Button>
                                                <Button color="success" variant="shadow" onPress={(e)=> {onClose(); setVolume(tonelada); cVolumeFRef.current.focus()}}>Pronto</Button>
                                            </ModalFooter>
                                        </>
                                    )}
                                </ModalContent>
                            </Modal>

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
                            <RadioGroup value={moeda} onChange={(e) => {setMoeda(e.target.value),setValor_total(""),setDolar(""),setReal("")}}
                            >
                                <Radio value="Dólar americano">Dólar</Radio>
                                <Radio value="Real brasileiro">Real</Radio>
                            </RadioGroup>

                            <NumericFormat
                                customInput={Input}
                                {...input_props_total}
                                variant="faded"
                                startContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">R$</span>
                                    </div>
                                }
                                valueIsNumericString={true}
                                thousandSeparator=" "
                                decimalScale={4}
                                value={valor_total}
                                onChange={(e) => setValor_total(e.target.value)}
                            />

                            {moeda === "" ? null : moeda === "Dólar americano" ? (
                                <>
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

                                    <div className="flex flex-row gap-3">
                                        <NumericFormat
                                            customInput={Input}
                                            {...input_props_ptax}
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
                                                    <CircleHelp stroke="#595960" size={20} className="cursor-help"/>
                                                </Tooltip>
                                            }
                                            
                                            description={`O valor é referente a ontem, ${ontem}`}
                                            valueIsNumericString={true}
                                            thousandSeparator=" "
                                            decimalScale={4}
                                            value={ptax}
                                            onChange={(e) => setPtax(e.target.value)}
                                        />   
                                    </div>
                                    
                                </>
                                ) : moeda === "Real brasileiro" ? (
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

                            <DatePicker
                                variant="faded"
                                className="max-w-44"
                                label="Data do pagamento"
                                showMonthAndYearPickers
                                value={dataPagamento}
                                onChange={setDataPagamento}
                            />
                        </div> {/**fim da div container do acordeão*/}
                    </AccordionItem>
                    {/*fim do acordeão 2. ps: sem inputs soltos aqui*/}

                    <AccordionItem key="3" aria-label="Accordion 3" title="Dados da entrega">
                        <div className="flex flex-wrap gap-4 mb-3"> {/*a acordeão parece não lidar bem com classes, então pus essa div*/}
                            <Select
                                variant="faded"
                                className="max-w-48 min-w-40"
                                label="Filial"
                                selectedKeys={[filial]}
                                onChange={(e) => setFilial(e.target.value)}
                            >
                                <SelectItem key={"Paragominas - Matriz"}>Paragominas - Matriz</SelectItem>
                                <SelectItem key={"Açailândia"}>Açailândia</SelectItem>
                                <SelectItem key={"Dom Eliseu"}>Dom Eliseu</SelectItem>
                                <SelectItem key={"Jaú"}>Jaú</SelectItem>
                                <SelectItem key={"Morro Alto"}>Morro Alto</SelectItem>
                                <SelectItem key={"Rondon do Pará"}>Rondon do Pará</SelectItem>
                                <SelectItem key={"Terceiro"}>Terceiro</SelectItem>
                            </Select>

                            {filial === "Terceiro" ? 
                                (
                                <>
                                    <Select
                                        variant="faded"
                                        className="max-w-56 min-w-40"
                                        label="Terceiro"
                                        selectedKeys={[filialTerc]}
                                        onChange={(e) => setFilialTerc(e.target.value)}
                                    >
                                        <SelectItem key={"Terc Açailândia"}>Terceiro - Açailândia</SelectItem>
                                        <SelectItem key={"Terc Dom Eliseu"}>Terceiro - Dom Eliseu</SelectItem>
                                        <SelectItem key={"Terc Paragominas"}>Terceiro - Paragominas</SelectItem>
                                        <SelectItem key={"Terc Rondon do Pará"}>Terceiro - Rondon do Pará</SelectItem>
                                        <SelectItem key={"Terc Sul do Pará"}>Terceiro - Sul do Pará</SelectItem>
                                        <SelectItem key={"Terc Tailândia"}>Terceiro - Tailândia</SelectItem>
                                        <SelectItem key={"Terc Outros"}>Outros terceiros</SelectItem>
                                    </Select>

                                    <Input
                                        variant="faded"
                                        className="max-w-96 min-w-60"
                                        label="Armazém"
                                    />
                                </>
                                ) : null
                            }

                            <DatePicker
                                variant="faded"
                                className="max-w-44"
                                label="Data da entrega"
                                showMonthAndYearPickers
                                value={dataEntrega}
                                onChange={setDataEntrega}
                            />
                        </div>
                        
                    </AccordionItem>
                    {/*fim do acordeão 3.*/}

                    <AccordionItem key="4" aria-label="Accordion 4" title="Dados do cliente">

                    </AccordionItem>
                    {/*fim do acordeão 4.*/}          
                </Accordion>
            </section>
        </>
    );
}

interface Props { //validação de tipos
    //props do acordeão 1: Dados básicos do contrato
    dataContrato:DateValue | undefined; setDataContrato: React.Dispatch<SetStateAction<DateValue | undefined>>;
    transacao: string; setTransacao: (e: string) => void;
    produto: string; setProduto: (e: string) => void;
    safra: string; setSafra: (e: string) => void;
    municipio: string; setMunicipio: (e: string) => void;

    //props do acordeão 2: Volume e valor
    volume: string; setVolume: (e: string) => void;
    sacas: string; setSacas: (e: string) => void;
    moeda: string; setMoeda: (e: string) => void;
    dolar: string; setDolar: (e: string) => void;
    real: string; setReal: (e: string) => void;
    ptax: string; setPtax: (e: string) => void;
    valor_total: string; setValor_total: (e: string) => void;
    dataPagamento:DateValue | undefined; setDataPagamento: React.Dispatch<SetStateAction<DateValue | undefined>>;
    ontem: string;

    //props do acordeão 3: Dados de entrega
    filial: string; setFilial: (e: string) => void;
    filialTerc: string; setFilialTerc: (e: string) => void;
    dataEntrega: DateValue | undefined;
    setDataEntrega: React.Dispatch<SetStateAction<DateValue | undefined>>;
    
    quilos: string; setQuilos: (e: string) => void;
    tonelada: string; setTonelada: (e: string) => void;
}
