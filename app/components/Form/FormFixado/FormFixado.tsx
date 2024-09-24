//dependências:
import React, { SetStateAction, useEffect, useMemo, useRef, useState } from "react";


//componentes:
import { Accordion, AccordionItem, DatePicker, Input, RadioGroup, Radio, Select, SelectItem, Tooltip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Link } from "@nextui-org/react";
import { NumericFormat, PatternFormat } from 'react-number-format';
import { CircleHelp, Info, RefreshCwOff, Weight, CircleDollarSign, Search } from 'lucide-react';

//bibliotecas
import { DateValue, getLocalTimeZone , Time, today } from "@internationalized/date";
import { format, subDays } from "date-fns";

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

    //props do acordeão 3: Dados de entrega
    filial, setFilial,
    filialTerc, setFilialTerc,
    dataEntrega, setDataEntrega,

    quilos, setQuilos, tonelada, setTonelada,
}: Props) {
    //atributos usados pelo React number format para alterar os estilos do input personalizado que está sendo usado
    const volumeInputRef = useRef<HTMLInputElement>(null);

    const input_props_volume = {
        label: "Volume (t)",
        className: "max-w-64",
        ref: {volumeInputRef}
    };
    const focar_volume= ()=>{
        if (volumeInputRef.current) {
            volumeInputRef.current.focus(); // Foca no input usando ref
            volumeInputRef.current.setSelectionRange(volumeInputRef.current.value.length, volumeInputRef.current.value.length);
        }
    }

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
        label: "PTAX",
        className: "max-w-56",
    };
    const input_props_total = {
        label: "Valor total",
        className: "w-56",
        isDisabled: true,
    }; 
    const input_props = {
        className: "max-w-64",
    }
    //fim dos atributos usados pelo React number format para alterar os estilos do input personalizado que está sendo usado

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const hoje = new Date()
    const dias_da_semana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const dia = dias_da_semana[hoje.getDay()];

    const [data_checada, setDataChecada] = useState<string | JSX.Element>("");
    const [valorConvertido, setValorConvertido] = useState("");
    const [cpf, setCpf] = useState("");
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");

    const data = today(getLocalTimeZone()).toString(); //função para obter a data atual, que será passada como valor padrão de data
    const hora = useMemo(() => new Time(new Date().getHours(), new Date().getMinutes()), []);
    const hora_de_atualizacao = useMemo(() => new Time(13, 30), []);

    //função de chamada da api do ptax
    useEffect(() => {
        const obter_ptax = async ()=>{
            try {
                if (dia === "Segunda-feira") {
                    const dia_do_ptax = format(subDays(data, 2), "MM-dd-yyyy");
                    const api_url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dia_do_ptax}'&$top=100&$format=json`;
                    const solicitar = await fetch(api_url);
                    const resposta = await solicitar.json();
                    setPtax(resposta.value[0].cotacaoVenda);
                    setDataChecada(`O valor é referente à sexta-feira, dia ${format(dia_do_ptax, "dd/MM")}.`);
                } else {
                    if (hora.compare(hora_de_atualizacao) <= 0) {
                        console.log(hora.compare(hora_de_atualizacao), 'É antes de 1:30 PM');
                        const dia_do_ptax = format(subDays(data, 0), "MM-dd-yyyy");
                        const api_url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dia_do_ptax}'&$top=100&$format=json`;
                        const solicitar = await fetch(api_url);
                        const resposta = await solicitar.json();
                        setPtax(resposta.value[0].cotacaoVenda);
                        setDataChecada(`O valor é referente a ontem, dia ${format(dia_do_ptax, "dd/MM")}.`)
                    } else {
                        console.log(hora.compare(hora_de_atualizacao), 'É depois de 1:30 PM');
                        const dia_do_ptax = format(data, "MM-dd-yyyy");
                        const api_url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dia_do_ptax}'&$top=100&$format=json`;
                        const solicitar = await fetch(api_url);
                        const resposta = await solicitar.json();
                        setPtax(resposta.value[0].cotacaoVenda);
                        setDataChecada(`O valor é referente a hoje, dia ${format(dia_do_ptax, "dd/MM")}.`);
                    }
                }
            } catch(error){
                setPtax("0")
                setDataChecada(
                    <Tooltip content={
                        <div className="p-2 max-w-48 flex flex-col gap-2">
                            <RefreshCwOff />
                            <p className="hyphens-auto">O sistema do <abbr title="Banco Central do Brasil">BACEN</abbr> pode está temporariamente indisponível ou enfrentando lentidões.</p> 
                            <p>Recomendamos que tente <a href="https://www.bcb.gov.br/estabilidadefinanceira/fechamentodolar" target="_blank" className="text-cyan-500 hover:underline hover:underline-offset-2">verificar manualmente</a> o PTAX.</p>
                        </div>
                    } className="cursor-help">
                        <p className="cursor-help">O BACEN não respondeu.</p>
                    </Tooltip>
                )
                console.error("Erro ao obter a cotação PTAX:", error);
            }
        };
    
        if (moeda === "Dólar americano") {
            obter_ptax();
        } else {
            setPtax("");
        }
    }, [moeda, dia, data, setPtax, setDataChecada, hora, hora_de_atualizacao]); // fim da função de chamada da api do ptax
    
    //função de cálculo de valor convertido
    useEffect(()=>{
        if(ptax){
            const fTotal = valor_total.replace(/\s/g, "").replace(/,/g, ".");
            const resConvertido = (parseFloat(fTotal)*parseFloat(ptax));
            setValorConvertido(resConvertido.toFixed(2));
        } else {
            setValorConvertido("");
        };
    },[ptax, valor_total, setValorConvertido]); //fim função de cálculo de valor convertido

    //função de chamada da api do cep
    useEffect(()=>{
        const buscar_cep = async ()=>{
            try {
                if(cep){
                    const fCep = cep.replace(/-/g, "");
                    const api_url = `https://viacep.com.br/ws/${fCep}/json`;
                    const solicitar = await fetch(api_url);
                    const resposta = await solicitar.json();
                    setRua(resposta.value[0].logradouro);
                }
            } catch(error){
                console.log("Não deu certo.")
            }
        };
    }, [cep]); //função de chamada da api do cep

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
                                        <div className="p-2 max-w-48">
                                            <div className="text-small flex flex-col gap-2">
                                                <Weight />
                                                <p className="hyphens-auto">O valor deste campo deve ser preenchido usando o peso em toneladas (t).</p> 
                                                <p>Se precisar de um conversor de unidades, <Link onPress={onOpen} className="text-small text-cyan-500 hover:underline hover:underline-offset-2">clique aqui</Link>.</p>
                                            </div>
                                        </div>
                                    } className="cursor-help">
                                        <p className="text-[#595960] cursor-help pl-2">t</p>
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
                                            <ModalHeader>Conversor</ModalHeader>
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
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            onClose();
                                                            setVolume(tonelada);
                                                            focar_volume();
                                                        }
                                                    }}
                                                />
                                                
                                                <NumericFormat
                                                    label="Volume em toneladas (t)"
                                                    customInput={Input}
                                                    variant="faded"
                                                    isDisabled

                                                    valueIsNumericString={true}
                                                    thousandSeparator=" "
                                                    decimalSeparator=","
                                                    
                                                    value={tonelada}
                                                    onChange={(e) => setTonelada(e.target.value)}
                                                />

                                                <div className="flex gap-2">
                                                    <Info size={20}/><p className="text-small">O valor digitado será automaticamente atribuído ao volume.</p>
                                                </div>
                                            </ModalBody>

                                            <ModalFooter>
                                                <Button color="danger" variant="light" onPress={onClose}>Dispensar</Button>
                                                <Button color="success" variant="shadow" onPress={()=> {onClose(); setVolume(tonelada);focar_volume()}}>Pronto</Button>
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

                            {moeda === "" ? null : moeda === "Dólar americano" ? (
                                <>
                                    <NumericFormat
                                        customInput={Input}
                                        {...input_props_preco}
                                        variant="faded"
                                        startContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">US$</span>
                                            </div>
                                        }
                                        valueIsNumericString={true}
                                        thousandSeparator=" "
                                        decimalSeparator=","
                                        allowedDecimalSeparators={[',','.',',']}
                                        decimalScale={4}
                                        value={dolar}
                                        onChange={(e) => setDolar(e.target.value)}
                                    />

                                    <NumericFormat
                                        customInput={Input}
                                        {...input_props_total}
                                        variant="faded"
                                        startContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">US$</span>
                                            </div>
                                        }
                                        valueIsNumericString={true}
                                        thousandSeparator=" "
                                        decimalSeparator=","
                                        allowedDecimalSeparators={[',','.',',']}
                                        decimalScale={2}
                                        value={valor_total}
                                        onChange={(e) => setValor_total(e.target.value)}
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
                                                    <div className="p-2 max-w-48">
                                                        <div className="text-small flex flex-col gap-2">
                                                            <CircleDollarSign />
                                                            <p className="hyphens-auto">Normalmente, o PTAX é <a href="https://github.com/raave-aires/orig/wiki/Como-funciona-a-atualiza%C3%A7%C3%A3o-autom%C3%A1tica-da-taxa-de-c%C3%A2mbio-no-Orig%C3%AB%3F" target="_blank" className="text-cyan-500 hover:underline hover:underline-offset-2">preenchido automaticamente</a> com a cotação mais recente disponibilizado pelo <abbr title="Banco Central do Brasil">BACEN</abbr>.</p> 
                                                            <p>Mas caso precise, verifique-o manualmente <a href="https://www.bcb.gov.br/estabilidadefinanceira/fechamentodolar" target="_blank" className="text-cyan-500 hover:underline hover:underline-offset-2">clicando aqui</a>.</p>
                                                        </div>
                                                    </div>
                                                } className="cursor-help">
                                                    <CircleHelp stroke="#595960" size={20} className="cursor-help"/>
                                                </Tooltip>
                                            }
                                            
                                            description={data_checada}
                                            valueIsNumericString={true}
                                            thousandSeparator=" "
                                            decimalScale={4}
                                            value={ptax}
                                            onChange={(e) => setPtax(e.target.value)}
                                        />   
                                    </div>
                                    
                                    <NumericFormat
                                        customInput={Input}
                                        label="Valor convertido"
                                        {...input_props}
                                        variant="faded"
                                        startContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">R$</span>
                                            </div>
                                        }
                                        isDisabled
                                        valueIsNumericString={true}
                                        thousandSeparator=" "
                                        decimalScale={4}
                                        value={valorConvertido}
                                        onChange={(e) => setValorConvertido(e.target.value)}
                                    />
                                </>
                                ) : moeda === "Real brasileiro" ? (
                                <>
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
                                </>                                    
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
                        <div className="flex flex-wrap gap-4 mb-3">
                            <Input 
                                variant="faded"
                                className="max-w-96 min-w-60"
                                label="Nome do parceiro"
                            />

                            <PatternFormat 
                                customInput={Input}
                                variant="faded"
                                label="C.P.F."
                                className="max-w-48"

                                displayType="input"
                                format="###.###.###-##"
                                value={cpf}
                                onChange={(e)=>setCpf(e.target.value)}
                            />

                            <Accordion selectionMode="multiple" variant="bordered" isCompact={true}>
                                <AccordionItem key="4.1" aria-label="Accordion 4.1" title="Endereço do cliente">
                                    <div className="flex flex-wrap gap-4 mb-3">
                                        <PatternFormat 
                                            customInput={Input}
                                            variant="faded"
                                            label="CEP"
                                            className="max-w-48"

                                            displayType="input"
                                            format="#####-###"
                                            value={cep}
                                            onChange={(e)=>setCep(e.target.value)}

                                            endContent={
                                                <button className="hover:bg-[#5959603b] p-2 rounded">
                                                    <Search size={20} stroke="#595960" className="text-cyan-500"/>
                                                </button>
                                            }
                                        />

                                        <Input
                                            variant="faded"
                                            label="Rua"
                                            className="max-w-96"

                                            value={rua}
                                            onChange={(e)=>setRua(e.target.value)}
                                        />
                                    </div>
                                </AccordionItem>

                                <AccordionItem key="4.2" aria-label="Accordion 4.2" title="Dados bancáros">
                                    <p>Teste</p>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </AccordionItem>
                    {/*fim do acordeão 4.*/}          
                </Accordion>
            </section>
        </>
    );
}

interface Props { //validação de tipos
    //props do acordeão 1: Dados básicos do contrato
    dataContrato: DateValue | undefined; setDataContrato: React.Dispatch<SetStateAction<DateValue | undefined>>;
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

    //props do acordeão 3: Dados de entrega
    filial: string; setFilial: (e: string) => void;
    filialTerc: string; setFilialTerc: (e: string) => void;
    dataEntrega: DateValue | undefined;
    setDataEntrega: React.Dispatch<SetStateAction<DateValue | undefined>>;
    
    quilos: string; setQuilos: (e: string) => void;
    tonelada: string; setTonelada: (e: string) => void;
}