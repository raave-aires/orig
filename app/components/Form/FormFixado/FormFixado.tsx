//dependências:
import React, { useEffect, useMemo, useState } from "react";

//componentes:
import { Spinner } from "../../Spinner/Spinner";

//bibliotecas decomponentes:
import {
  Accordion,
  AccordionItem,
  Button,
  DatePicker,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";

//bibliotecas de ícones:
import {
  CircleDollarSign,
  CircleHelp,
  Info,
  MapPin,
  RefreshCwOff,
  RotateCw,
  Search,
  Weight,
} from "lucide-react";

//bibliotecas:
import { format, subDays } from "date-fns";
import { cnpj, cpf } from "cpf-cnpj-validator";
import { DateValue, Time } from "@internationalized/date";
import { NumericFormat, PatternFormat } from "react-number-format";

export function FormFixado() {
  //variáveis de datas
  const hoje = useMemo(() => new Date(), []);
  const dia_da_semana = hoje
    .toLocaleDateString("pt-BR", { weekday: "long" })
    .toString();
  const hora = useMemo(
    () => new Time(new Date().getHours(), new Date().getMinutes()),
    []
  );
  const hora_de_atualizacao = useMemo(() => new Time(13, 30), []);
  //fim das variáveis de datas

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  //variáveis do acordeão 1: dados básicos do contrato
  const [dataContrato, setDataContrato] = useState<DateValue | undefined>();
  const [transacao, setTransacao] = useState("");
  const [produto, setProduto] = useState("");
  const [safra, setSafra] = useState("");
  const [municipio, setMunicipio] = useState("");
  //fim das variáveis do acordeão 1: dados básicos do contrato

  //variáveis do acordeão 2: volume e valor
  const [volume, setVolume] = useState("");
  const [quilos, setQuilos] = useState(""); //variável do modal
  const [tonelada, setTonelada] = useState(""); //variável do modal
  const [sacas, setSacas] = useState("");
  const [moeda, setMoeda] = useState("");

  const [dolar, setDolar] = useState("");
  const [dataChecada, setDataChecada] = useState<string | JSX.Element>(""); //campo de descrição do ptax
  const [ptax, setPtax] = useState("");
  const [iconePtax, setIconePtax] = useState<React.ReactNode>(
    <RotateCw size={20} stroke="#595960" className="hover:stroke-[#006fee]" />
  );
  const [valorConvertido, setValorConvertido] = useState("");
  const [real, setReal] = useState("");
  const [valorTotal, setValorTotal] = useState("");
  const [dataPagamento, setDataPagamento] = useState<DateValue | undefined>();
  //fim das variáveis do acordeão 2: volume e valor

  //variáveis do acordeão 3: dados de entrega
  const [filial, setFilial] = useState("");
  const [filialTerc, setFilialTerc] = useState("");
  const [armazem, setArmazem] = useState("");
  const [dataEntrega, setDataEntrega] = useState<DateValue>();
  //fim das variáveis do acordeão 3: dados de entrega

  //variáveis do acordeão 4: dados do cliente
  const [nomeDoParceiro, setNomeDoParceiro] = useState("");
  const [tipoDePessoa, setTipoDePessoa] = useState("");

  const [nCpf, setCpf] = useState("");
  const [nCnpj, setCnpj] = useState("");

  const [cep, setCep] = useState("");
  const [iconeCep, setIconeCep] = useState<React.ReactNode>(
    <Search size={20} stroke="#595960" className="hover:stroke-[#006fee]" />
  );
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  //variáveis do acordeão 4.2: dados bancários
  const [recebedor, setRecebedor] = useState("");
  const [banco, setBanco] = useState("");
  const [agencia, setAgencia] = useState("");
  const [numeroDaConta, setNumeroDaConta] = useState("");

  const [nomeRecebedorTerc, setNomeRecebedorTerc] = useState("");
  const [tipoDeRecebedorTerc, setTipoDeRecebedorTerc] = useState("");
  const [nCpfRecebedor, setCpfRecebedor] = useState("");
  const [nCnpjRecebedor, setCnpjRecebedor] = useState("");
  //fim das variáveis do acordeão 4.2: dados bancários
  //fim das variáveis do acordeão 4: dados do cliente

  //função para calcular sacas
  useEffect(() => {
    const handleKeyUp = () => {
      if (volume) {
        const fVolume = volume.replace(/\s/g, "").replace(/,/g, "."); //expressão regular para remover os espaços entre os números
        console.log(fVolume);
        const rSacas = (parseFloat(fVolume) * 1000) / 60;
        setSacas(rSacas.toFixed(2));
      } else {
        setSacas("");
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [volume]); //fim das função para calcular sacas

  //função para calcular o valor total
  useEffect(() => {
    const handleKeyUP = () => {
      if (sacas && dolar) {
        const fSacas = sacas.replace(/\s/g, ""); //expressão regular para remover os espaços entre os números
        const fDolar = parseFloat(dolar.replace(/,/g, "."));
        const rTotal = Number(fSacas) * fDolar;
        setValorTotal(rTotal.toString());
      } else if (sacas && real) {
        const fSacas = sacas.replace(/\s/g, ""); //expressão regular para remover os espaços entre os números
        const fReal = parseFloat(real.replace(/,/g, "."));
        const rTotal = Number(fSacas) * fReal;
        setValorTotal(rTotal.toString());
      } else {
        setValorTotal("");
      }
    };

    window.addEventListener("keyup", handleKeyUP);

    return () => {
      window.removeEventListener("keyup", handleKeyUP);
    };
  }, [sacas, dolar, real]); //fim da função para calcular o valor total

  //função para calcular toneladas
  useEffect(() => {
    const handleKeyUP = () => {
      if (quilos) {
        const fQuilos = quilos.replace(/\s/g, "").replace(/,/g, "."); //expressão regular para remover os espaços entre os números
        const toneladas = parseFloat(fQuilos) / 1000;
        setTonelada(toneladas.toString());
      } else {
        setTonelada("");
      }
    };

    window.addEventListener("keyup", handleKeyUP);

    return () => {
      window.removeEventListener("keyup", handleKeyUP);
    };
  }, [quilos, tonelada, setTonelada]); //fim da função para calcular toneladas

  //função de chamada da api do ptax
  useEffect(() => {
    const obter_ptax = async () => {
      try {
        if (dia_da_semana === "segunda-feira") {
          const dia_do_ptax = format(subDays(hoje, 3), "MM-dd-yyyy");
          console.log(dia_do_ptax);
          const api_url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dia_do_ptax}'&$top=100&$format=json`;
          const solicitar = await fetch(api_url);
          const resposta = await solicitar.json();
          setPtax(resposta.value[0].cotacaoVenda);
          setDataChecada(
            `O valor é referente à sexta-feira, dia ${format(
              dia_do_ptax,
              "dd/MM"
            )}.`
          );
        } else {
          if (hora.compare(hora_de_atualizacao) <= 0) {
            console.log(
              hora.compare(hora_de_atualizacao),
              "É antes de 1:30 PM"
            );
            const dia_do_ptax = format(subDays(hoje, 1), "MM-dd-yyyy");
            console.log(dia_do_ptax);
            const api_url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dia_do_ptax}'&$top=100&$format=json`;
            const solicitar = await fetch(api_url);
            const resposta = await solicitar.json();
            setPtax(resposta.value[0].cotacaoVenda);
            setDataChecada(
              `O valor é referente a ontem, dia ${format(
                dia_do_ptax,
                "dd/MM"
              )}.`
            );
          } else {
            console.log(
              hora.compare(hora_de_atualizacao),
              "É depois de 1:30 PM"
            );
            const dia_do_ptax = format(hoje, "MM-dd-yyyy");
            console.log(dia_do_ptax);
            const api_url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dia_do_ptax}'&$top=100&$format=json`;
            const solicitar = await fetch(api_url);
            const resposta = await solicitar.json();
            setPtax(resposta.value[0].cotacaoVenda);
            setDataChecada(
              `O valor é referente a hoje, dia ${format(dia_do_ptax, "dd/MM")}.`
            );
          }
        }
      } catch (error) {
        setPtax("0");
        setDataChecada(
          <Tooltip
            content={
              <div className="p-2 max-w-48 flex flex-col gap-2">
                <RefreshCwOff />
                <p className="hyphens-auto">
                  O sistema do{" "}
                  <abbr title="Banco Central do Brasil">BACEN</abbr> pode está
                  temporariamente indisponível ou enfrentando lentidões.
                </p>
                <p>
                  Recomendamos que tente{" "}
                  <a
                    href="https://www.bcb.gov.br/estabilidadefinanceira/fechamentodolar"
                    target="_blank"
                    className="text-cyan-500 hover:underline hover:underline-offset-2"
                  >
                    verificar manualmente
                  </a>{" "}
                  o PTAX.
                </p>
              </div>
            }
            className="cursor-help"
          >
            <p className="cursor-help">O BACEN não respondeu.</p>
          </Tooltip>
        );
        console.error("Erro ao obter a cotação PTAX:", error);
      }
    };

    if (moeda === "Dólar americano") {
      obter_ptax();
    } else {
      setPtax("");
    }
  }, [
    moeda,
    dia_da_semana,
    hoje,
    setPtax,
    setDataChecada,
    hora,
    hora_de_atualizacao,
  ]); // fim da função de chamada da api do ptax

  //função de cálculo de valor convertido
  useEffect(() => {
    if (ptax) {
      const fTotal = valorTotal.replace(/\s/g, "").replace(/,/g, ".");
      const resConvertido = parseFloat(fTotal) * parseFloat(ptax);
      setValorConvertido(resConvertido.toFixed(2));
    } else {
      setValorConvertido("");
    }
  }, [ptax, valorTotal, setValorConvertido]); //fim função de cálculo de valor convertido

  //função de validação do cpf
  useEffect(() => {
    const validar_documento = () => {
      if (nCpf.length >= 11) {
        const fCpf = nCpf.replace(/[.-]/g, "");
        if (cpf.isValid(fCpf)) {
          setCpf(cpf.format(fCpf));
        } else {
          alert("CPF inválido.");
          setCpf("");
        }
      } else if (nCpf.length > 14) {
        setCpf(nCpf.slice(0, 14));
      }
    };

    window.addEventListener("keyup", validar_documento);

    return () => {
      window.removeEventListener("keyup", validar_documento);
    };
  }, [nCpf, setCpf]); //fim função de validação do cpf

  //função de validação do cnpj
  useEffect(() => {
    const validar_documento = () => {
      if (nCnpj.length >= 11) {
        const fCnpj = nCnpj.replace(/[.-/]/g, "");
        if (cnpj.isValid(fCnpj)) {
          setCpf(cnpj.format(fCnpj));
        } else {
          alert("CNPJ inválido.");
          setCpf("");
        }
      } else if (nCnpj.length > 18) {
        setCpf(nCnpj.slice(0, 18));
      }
    };

    window.addEventListener("keyup", validar_documento);

    return () => {
      window.removeEventListener("keyup", validar_documento);
    };
  }, [nCnpj, setCnpj]); //fim da função de validação do cnpj

  //função de validação do cpf
  useEffect(() => {
    const validar_documento = () => {
      if (nCpfRecebedor.length >= 11) {
        const fCpfRecebedor = nCpfRecebedor.replace(/[.-]/g, "");
        if (cpf.isValid(fCpfRecebedor)) {
          setCpf(cpf.format(fCpfRecebedor));
        } else {
          alert("CPF inválido.");
          setCpf("");
        }
      } else if (nCpfRecebedor.length > 14) {
        setCpf(nCpfRecebedor.slice(0, 14));
      }
    };

    window.addEventListener("keyup", validar_documento);

    return () => {
      window.removeEventListener("keyup", validar_documento);
    };
  }, [nCpfRecebedor, setCpfRecebedor]); //fim função de validação do cpf

  //função de validação do cnpj
  useEffect(() => {
    const validar_documento = () => {
      if (nCnpjRecebedor.length >= 11) {
        const fCnpjRecebedor = nCnpjRecebedor.replace(/[.-/]/g, "");
        if (cnpj.isValid(fCnpjRecebedor)) {
          setCpf(cnpj.format(fCnpjRecebedor));
        } else {
          alert("CNPJ inválido.");
          setCpf("");
        }
      } else if (nCnpjRecebedor.length > 18) {
        setCpf(nCnpjRecebedor.slice(0, 18));
      }
    };

    window.addEventListener("keyup", validar_documento);

    return () => {
      window.removeEventListener("keyup", validar_documento);
    };
  }, [nCnpjRecebedor, setCnpjRecebedor]); //fim da função de validação do cnpj

  //função de chamada da api do cep
  const buscar_cep = async () => {
    try {
      if (cep) {
        setIconeCep(<Spinner />);
        setTimeout(async () => {
          const fCep = cep.replace(/-/g, "");
          const api_url = `https://viacep.com.br/ws/${fCep}/json`;
          const solicitar = await fetch(api_url);
          const resposta = await solicitar.json();
          setRua(resposta.logradouro);
          setBairro(resposta.bairro);
          setCidade(resposta.localidade);
          setEstado(resposta.estado);
          setIconeCep(
            <Search
              size={20}
              stroke="#595960"
              className="hover:stroke-[#006fee]"
            />
          ); // Volta ao ícone padrão
        }, 1000);
      }
    } catch (error) {
      console.log("Não deu certo.");
    }
  }; //fim da função de chamada da api do cep

  //função de atualizar o ptax
  const obter_ptax = async () => {
    setIconePtax(<Spinner />);
    setTimeout(async () => {
      try {
        if (dia_da_semana === "segunda-feira") {
          const dia_do_ptax = format(subDays(hoje, 3), "MM-dd-yyyy");
          console.log(dia_do_ptax);
          const api_url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dia_do_ptax}'&$top=100&$format=json`;
          const solicitar = await fetch(api_url);
          const resposta = await solicitar.json();
          setPtax(resposta.value[0].cotacaoVenda);
          setDataChecada(
            `O valor é referente à sexta-feira, dia ${format(
              dia_do_ptax,
              "dd/MM"
            )}.`
          );
        } else {
          if (hora.compare(hora_de_atualizacao) <= 0) {
            console.log(
              hora.compare(hora_de_atualizacao),
              "É antes de 1:30 PM"
            );
            const dia_do_ptax = format(subDays(hoje, 1), "MM-dd-yyyy");
            console.log(dia_do_ptax);
            const api_url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dia_do_ptax}'&$top=100&$format=json`;
            const solicitar = await fetch(api_url);
            const resposta = await solicitar.json();
            setPtax(resposta.value[0].cotacaoVenda);
            setDataChecada(
              `O valor é referente a ontem, dia ${format(
                dia_do_ptax,
                "dd/MM"
              )}.`
            );
          } else {
            console.log(
              hora.compare(hora_de_atualizacao),
              "É depois de 1:30 PM"
            );
            const dia_do_ptax = format(hoje, "MM-dd-yyyy");
            console.log(dia_do_ptax);
            const api_url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dia_do_ptax}'&$top=100&$format=json`;
            const solicitar = await fetch(api_url);
            const resposta = await solicitar.json();
            setPtax(resposta.value[0].cotacaoVenda);
            setDataChecada(
              `O valor é referente a hoje, dia ${format(dia_do_ptax, "dd/MM")}.`
            );
          }
        }
      } catch (error) {
        setPtax("0");
        setDataChecada(
          <Tooltip
            content={
              <div className="p-2 max-w-48 flex flex-col gap-2">
                <RefreshCwOff />
                <p className="hyphens-auto">
                  O sistema do{" "}
                  <abbr title="Banco Central do Brasil">BACEN</abbr> pode está
                  temporariamente indisponível ou enfrentando lentidões.
                </p>
                <p>
                  Recomendamos que tente{" "}
                  <a
                    href="https://www.bcb.gov.br/estabilidadefinanceira/fechamentodolar"
                    target="_blank"
                    className="text-cyan-500 hover:underline hover:underline-offset-2"
                  >
                    verificar manualmente
                  </a>{" "}
                  o PTAX.
                </p>
              </div>
            }
            className="cursor-help"
          >
            <p className="cursor-help">O BACEN não respondeu.</p>
          </Tooltip>
        );
        console.error("Erro ao obter a cotação PTAX:", error);
      }
      setIconePtax(
        <RotateCw
          size={20}
          stroke="#595960"
          className="hover:stroke-[#006fee]"
        />
      );
    }, 1000);
  }; // fim da função de atualizar o ptax

  return (
    <>
      <section className="bg-[#101010] mt-5 mb-10 flex flex-col gap-5 p-5 rounded-xl">
        {/*tela de fundo dos acordeões, tô pensando em removê-la*/}
        <h1 className="text-xl">Cadastro de contrato com preço fixado</h1>
        {/*acordeão*/}
        <Accordion selectionMode="multiple" variant="bordered" isCompact={true}>
          {/*acordeão 1: dados básicos do contrato*/}
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title="Dados básicos do contrato"
          >
            {/* Aba de inserção das informações básicas */}
            <div className="flex flex-wrap gap-4 mb-3">
              {" "}
              {/*a acordeão parece não lidar bem com classes, então pus essa div*/}
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
          {/*fim do acordeão 1*/}

          {/*acordeão 2: volume e valor*/}
          <AccordionItem
            key="2"
            aria-label="Accordion 2"
            title="Volume e valor"
          >
            <div className="flex flex-wrap gap-4 mb-3">
              <NumericFormat
                id="cVolumeF"
                customInput={Input}
                variant="faded"
                className="max-w-64"
                label="Volume (t)"
                endContent={
                  <Tooltip
                    content={
                      <div className="p-2 max-w-48">
                        <div className="text-small flex flex-col gap-2">
                          <Weight />
                          <p className="hyphens-auto">
                            O valor deste campo deve ser preenchido usando o
                            peso em toneladas (t).
                          </p>
                          <p>
                            Se precisar de um conversor de unidades,{" "}
                            <Link
                              onPress={onOpen}
                              className="text-small text-cyan-500 hover:underline hover:underline-offset-2"
                            >
                              clique aqui
                            </Link>
                            .
                          </p>
                        </div>
                      </div>
                    }
                    className="cursor-help"
                  >
                    <p className="text-[#595960] hover:text-[#006fee] cursor-help pl-2">
                      t
                    </p>
                  </Tooltip>
                }
                valueIsNumericString={true}
                thousandSeparator=" "
                decimalSeparator=","
                allowedDecimalSeparators={[",", ".", ","]}
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
              />

              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop="blur"
                size="xs"
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader>Conversor</ModalHeader>
                      <ModalBody>
                        <NumericFormat
                          customInput={Input}
                          variant="faded"
                          label="Volume em quilos (kg)"
                          valueIsNumericString={true}
                          thousandSeparator=" "
                          decimalSeparator=","
                          allowedDecimalSeparators={[",", ".", ","]}
                          decimalScale={4}
                          value={quilos}
                          onChange={(e) => setQuilos(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              onClose();
                              setVolume(tonelada);
                            }
                          }}
                        />

                        <NumericFormat
                          customInput={Input}
                          variant="faded"
                          label="Volume em toneladas (t)"
                          isDisabled
                          valueIsNumericString={true}
                          thousandSeparator=" "

                          value={tonelada}
                          onChange={(e) => setTonelada(e.target.value)}
                        />

                        <div className="flex gap-2">
                          <Info size={20} />
                          <p className="text-small">
                            O valor digitado será automaticamente atribuído ao
                            volume.
                          </p>
                        </div>
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Dispensar
                        </Button>
                        <Button
                          color="primary"
                          variant="shadow"
                          onPress={() => {
                            onClose();
                            setVolume(tonelada);
                          }}
                        >
                          Pronto
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>

              <NumericFormat
                customInput={Input}
                variant="faded"
                className="max-w-56"
                label="Sacas"
                isDisabled
                valueIsNumericString={true}
                thousandSeparator=" "
                decimalScale={0}
                value={sacas}
                onChange={(e) => setSacas(e.target.value)}
              />

              {/* Transação */}
              <Select
                variant="faded"
                className="max-w-48 min-w-40"
                label="Moeda a ser usada"
                selectedKeys={[moeda]}
                onChange={(e) => {
                  setMoeda(e.target.value),
                    setValorTotal(""),
                    setDolar(""),
                    setReal("");
                }}
              >
                <SelectItem key={"Dólar americano"}>Dólar</SelectItem>
                <SelectItem key={"Real brasileiro"}>Real</SelectItem>
              </Select>
              {/* Produto */}

              {moeda === "" ? null : moeda === "Dólar americano" ? (
                <>
                  <NumericFormat
                    customInput={Input}
                    variant="faded"
                    className="max-w-56"
                    label="Valor da saca"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">US$</span>
                      </div>
                    }
                    valueIsNumericString={true}
                    thousandSeparator=" "
                    decimalSeparator=","
                    allowedDecimalSeparators={[",", ".", ","]}
                    decimalScale={2}
                    value={dolar}
                    onChange={(e) => setDolar(e.target.value)}
                  />

                  <NumericFormat
                    customInput={Input}
                    variant="faded"
                    className="max-w-56"
                    label="Valor total"
                    isDisabled
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">US$</span>
                      </div>
                    }
                    valueIsNumericString={true}
                    thousandSeparator=" "
                    decimalSeparator=","
                    allowedDecimalSeparators={[",", ".", ","]}
                    decimalScale={2}
                    value={valorTotal}
                    onChange={(e) => setValorTotal(e.target.value)}
                  />

                  <div className="flex flex-row gap-3">
                    <NumericFormat
                      customInput={Input}
                      variant="faded"
                      className="max-w-56"
                      label="PTAX"
                      description={dataChecada}
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">
                            R$
                          </span>
                        </div>
                      }
                      endContent={
                        <div className="flex gap-2 p-2 pr-0">
                          <Tooltip
                            content={<p className="p-2">Atualizar PTAX</p>}
                          >
                            <button onClick={obter_ptax}>{iconePtax}</button>
                          </Tooltip>

                          <Tooltip
                            content={
                              <div className="p-2 max-w-48">
                                <div className="text-small flex flex-col gap-2">
                                  <CircleDollarSign />
                                  <p className="hyphens-auto">
                                    Normalmente, o PTAX é{" "}
                                    <a
                                      href="https://github.com/raave-aires/orig/wiki/Como-funciona-a-atualiza%C3%A7%C3%A3o-autom%C3%A1tica-da-taxa-de-c%C3%A2mbio-no-Orig%C3%AB%3F"
                                      target="_blank"
                                      className="text-cyan-500 hover:underline hover:underline-offset-2"
                                    >
                                      preenchido automaticamente
                                    </a>{" "}
                                    com a cotação mais recente disponibilizado
                                    pelo{" "}
                                    <abbr title="Banco Central do Brasil">
                                      BACEN
                                    </abbr>
                                    .
                                  </p>
                                  <p>
                                    Mas caso precise, verifique-o manualmente{" "}
                                    <a
                                      href="https://www.bcb.gov.br/estabilidadefinanceira/fechamentodolar"
                                      target="_blank"
                                      className="text-cyan-500 hover:underline hover:underline-offset-2"
                                    >
                                      clicando aqui
                                    </a>
                                    .
                                  </p>
                                </div>
                              </div>
                            }
                            className="cursor-help"
                          >
                            <CircleHelp
                              size={20}
                              stroke="#595960"
                              className="hover:stroke-[#006fee]"
                            />
                          </Tooltip>
                        </div>
                      }
                      valueIsNumericString={true}
                      thousandSeparator=" "
                      decimalSeparator=","
                      allowedDecimalSeparators={[",", ".", ","]}
                      decimalScale={4}
                      value={ptax}
                      onChange={(e) => setPtax(e.target.value)}
                    />
                  </div>

                  <NumericFormat
                    customInput={Input}
                    variant="faded"
                    className="max-w-64"
                    label="Valor convertido"
                    isDisabled
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">R$</span>
                      </div>
                    }
                    valueIsNumericString={true}
                    thousandSeparator=" "
                    decimalSeparator=","
                    allowedDecimalSeparators={[",", ".", ","]}
                    decimalScale={4}
                    value={valorConvertido}
                    onChange={(e) => setValorConvertido(e.target.value)}
                  />
                </>
              ) : moeda === "Real brasileiro" ? (
                <>
                  <NumericFormat
                    customInput={Input}
                    variant="faded"
                    className="max-w-56"
                    label="Valor da saca"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">R$</span>
                      </div>
                    }
                    valueIsNumericString={true}
                    thousandSeparator=" "
                    decimalSeparator=","
                    allowedDecimalSeparators={[",", ".", ","]}
                    decimalScale={4}
                    value={real}
                    onChange={(e) => setReal(e.target.value)}
                  />

                  <NumericFormat
                    customInput={Input}
                    variant="faded"
                    className="max-w-56"
                    label="Valor total"
                    isDisabled
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">R$</span>
                      </div>
                    }
                    valueIsNumericString={true}
                    thousandSeparator=" "
                    decimalSeparator=","
                    allowedDecimalSeparators={[",", ".", ","]}
                    decimalScale={4}
                    value={valorTotal}
                    onChange={(e) => setValorTotal(e.target.value)}
                  />
                </>
              ) : null}

              <DatePicker
                variant="faded"
                className="max-w-44"
                label="Data do pagamento"
                showMonthAndYearPickers
                value={dataPagamento}
                onChange={setDataPagamento}
              />
            </div>{" "}
            {/**fim da div container do acordeão*/}
          </AccordionItem>
          {/*fim do acordeão 2*/}

          {/*acordeão 3: dados de entrega*/}
          <AccordionItem
            key="3"
            aria-label="Accordion 3"
            title="Dados da entrega"
          >
            <div className="flex flex-wrap gap-4 mb-3">
              {" "}
              {/*a acordeão parece não lidar bem com classes, então pus essa div*/}
              <Select
                variant="faded"
                className="max-w-48 min-w-40"
                label="Filial"
                selectedKeys={[filial]}
                onChange={(e) => setFilial(e.target.value)}
              >
                <SelectItem key={"Paragominas - Matriz"}>
                  Paragominas - Matriz
                </SelectItem>
                <SelectItem key={"Açailândia"}>Açailândia</SelectItem>
                <SelectItem key={"Dom Eliseu"}>Dom Eliseu</SelectItem>
                <SelectItem key={"Jaú"}>Jaú</SelectItem>
                <SelectItem key={"Morro Alto"}>Morro Alto</SelectItem>
                <SelectItem key={"Rondon do Pará"}>Rondon do Pará</SelectItem>
                <SelectItem key={"Terceiro"}>Terceiro</SelectItem>
              </Select>
              {filial === "Terceiro" ? (
                <>
                  <Select
                    variant="faded"
                    className="max-w-56 min-w-40"
                    label="Terceiro"
                    selectedKeys={[filialTerc]}
                    onChange={(e) => setFilialTerc(e.target.value)}
                  >
                    <SelectItem key={"Terc Açailândia"}>
                      Terceiro - Açailândia
                    </SelectItem>
                    <SelectItem key={"Terc Dom Eliseu"}>
                      Terceiro - Dom Eliseu
                    </SelectItem>
                    <SelectItem key={"Terc Paragominas"}>
                      Terceiro - Paragominas
                    </SelectItem>
                    <SelectItem key={"Terc Rondon do Pará"}>
                      Terceiro - Rondon do Pará
                    </SelectItem>
                    <SelectItem key={"Terc Sul do Pará"}>
                      Terceiro - Sul do Pará
                    </SelectItem>
                    <SelectItem key={"Terc Tailândia"}>
                      Terceiro - Tailândia
                    </SelectItem>
                    <SelectItem key={"Terc Outros"}>
                      Outros terceiros
                    </SelectItem>
                  </Select>

                  <Input
                    variant="faded"
                    className="max-w-96 min-w-60"
                    label="Armazém"
                    value={armazem}
                    onChange={(e) => setArmazem(e.target.value)}
                  />
                </>
              ) : null}
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
          {/*fim do acordeão 3*/}

          {/*acordeão 4: dados do cliente*/}
          <AccordionItem
            key="4"
            aria-label="Accordion 4"
            title="Dados do cliente"
          >
            <div className="flex flex-wrap gap-4 mb-3">
              <Input
                variant="faded"
                className="max-w-96 min-w-60"
                label="Nome do parceiro"
                value={nomeDoParceiro}
                onChange={(e) => setNomeDoParceiro(e.target.value)}
              />

              <Select
                variant="faded"
                className="max-w-48 min-w-40"
                label="Tipo de parceiro"
                selectedKeys={[tipoDePessoa]}
                onChange={(e) => setTipoDePessoa(e.target.value)}
              >
                <SelectItem key={"Física"}>Pessoa física</SelectItem>
                <SelectItem key={"Jurídica"}>Pessoa jurídica</SelectItem>
              </Select>

              {tipoDePessoa === "" ? null : tipoDePessoa === "Física" ? (
                <Input
                  variant="faded"
                  label="CPF do parceiro"
                  className="max-w-52"
                  value={nCpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              ) : tipoDePessoa === "Jurídica" ? (
                <Input
                  variant="faded"
                  label="CNPJ  do parceiro"
                  className="max-w-52"
                  value={nCnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                />
              ) : null}

              <Accordion
                selectionMode="multiple"
                variant="bordered"
                isCompact={true}
              >
                <AccordionItem
                  key="4.1"
                  aria-label="Accordion 4.1"
                  title="Endereço do cliente"
                >
                  <div className="flex flex-wrap gap-4 mb-3">
                    <PatternFormat
                      customInput={Input}
                      variant="faded"
                      label="CEP"
                      className="max-w-48"
                      displayType="input"
                      format="#####-###"
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                      endContent={
                        <Tooltip
                          content={
                            <div className="p-2 max-w-48 flex flex-col gap-2">
                              <MapPin />
                              <p>Buscar dados do CEP digitado.</p>
                              <p>
                                Caso precise, verifique manualmente{" "}
                                <a
                                  href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                                  target="_blank"
                                  className="text-cyan-500 hover:underline hover:underline-offset-2"
                                >
                                  aqui
                                </a>
                                .
                              </p>
                            </div>
                          }
                        >
                          <button className="p-2 pr-0" onClick={buscar_cep}>
                            {iconeCep}
                          </button>
                        </Tooltip>
                      }
                    />

                    <Input
                      variant="faded"
                      label="Rua"
                      className="max-w-72"
                      value={rua}
                      onChange={(e) => setRua(e.target.value)}
                    />

                    <Input
                      variant="faded"
                      label="Nº"
                      className="max-w-32"
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
                    />

                    <Input
                      variant="faded"
                      label="Bairro"
                      className="max-w-64"
                      value={bairro}
                      onChange={(e) => setBairro(e.target.value)}
                    />

                    <Input
                      variant="faded"
                      label="Cidade"
                      className="max-w-64"
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                    />

                    <Input
                      variant="faded"
                      label="Estado"
                      className="max-w-64"
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                    />
                  </div>
                </AccordionItem>

                <AccordionItem
                  key="4.2"
                  aria-label="Accordion 4.2"
                  title="Dados bancáros"
                >
                  <div className="flex flex-wrap gap-4 mb-3">
                    <Select
                      label="Recebedor"
                      selectedKeys={[recebedor]}
                      onChange={(e) => setRecebedor(e.target.value)}
                      variant="faded"
                      className="max-w-60"
                    >
                      <SelectItem key={"Cliente"}>Conta do cliente</SelectItem>
                      <SelectItem key={"Terceiro"}>
                        Conta de terceiro
                      </SelectItem>
                    </Select>

                    {recebedor === "" ? null : recebedor === "Cliente" ? (
                      <>
                        <Input
                          variant="faded"
                          label="Nome do recebedor"
                          className="max-w-96 min-w-60"
                          isDisabled
                          value={nomeDoParceiro}
                        />

                        {tipoDePessoa === "" ? null : tipoDePessoa ===
                          "Física" ? (
                          <Input
                            variant="faded"
                            label="CPF do recebedor"
                            className="max-w-52"
                            isDisabled
                            value={nCpf}
                          />
                        ) : tipoDePessoa === "Jurídica" ? (
                          <Input
                            variant="faded"
                            label="CNPJ  do recebedor"
                            className="max-w-52"
                            isDisabled
                            value={nCnpj}
                          />
                        ) : null}

                        <Input
                          variant="faded"
                          label="Banco"
                          className="max-w-52"
                          value={banco}
                          onChange={(e) => setBanco(e.target.value)}
                        />

                        <Input
                          variant="faded"
                          label="Agência"
                          className="max-w-52"
                          value={agencia}
                          onChange={(e) => setAgencia(e.target.value)}
                        />

                        <Input
                          variant="faded"
                          label="Nº da conta"
                          className="max-w-52"
                          value={numeroDaConta}
                          onChange={(e) => setNumeroDaConta(e.target.value)}
                        />
                      </>
                    ) : recebedor === "Terceiro" ? (
                      <>
                        <Input
                          variant="faded"
                          label="Nome do recebedor"
                          className="max-w-96 min-w-60"
                          value={nomeRecebedorTerc}
                          onChange={(e) => setNomeRecebedorTerc(e.target.value)}
                        />

                        <Select
                          variant="faded"
                          className="max-w-48 min-w-40"
                          label="Tipo de parceiro"
                          selectedKeys={[tipoDeRecebedorTerc]}
                          onChange={(e) => setTipoDeRecebedorTerc(e.target.value)}
                        >
                          <SelectItem key={"Física"}>Pessoa física</SelectItem>
                          <SelectItem key={"Jurídica"}>Pessoa jurídica</SelectItem>
                        </Select>

                        {tipoDeRecebedorTerc === "" ? null : tipoDeRecebedorTerc === "Física" ? (
                          <Input
                            variant="faded"
                            label="CPF do recebedor"
                            className="max-w-52"
                            value={nCpfRecebedor}
                            onChange={(e) => setCpfRecebedor(e.target.value)}
                          />
                        ) : tipoDeRecebedorTerc === "Jurídica" ? (
                          <Input
                            variant="faded"
                            label="CNPJ  do recebedor"
                            className="max-w-52"
                            value={nCnpjRecebedor}
                            onChange={(e) => setCnpjRecebedor(e.target.value)}
                          />
                        ) : null}

                        <Input
                          variant="faded"
                          label="Banco"
                          className="max-w-52"
                          value={banco}
                          onChange={(e) => setBanco(e.target.value)}
                        />

                        <Input
                          variant="faded"
                          label="Agência"
                          className="max-w-52"
                          value={agencia}
                          onChange={(e) => setAgencia(e.target.value)}
                        />

                        <Input
                          variant="faded"
                          label="Nº da conta"
                          className="max-w-52"
                          value={numeroDaConta}
                          onChange={(e) => setNumeroDaConta(e.target.value)}
                        />
                      </>
                    ) : null}
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
          </AccordionItem>
          {/*fim do acordeão 4*/}

          <AccordionItem
            key="5"
            aria-label="Accordion 5"
            title="Outros"
          >
            <div className="flex flex-wrap gap-4 mb-3">
              <div className="flex items-center gap-2">
                <Spinner />
                <p>Tabela para adicionar as propriedades do cliente em desenvolvimento.</p>
              </div>

              <Textarea variant="faded" label="Observações sobre o contrato" placeholder="Adicione qualquer informação complementar que ache necessária. Este campo aparecerá como uma observação, mas não será adicionado ao contrato exportado."/>
            </div>
          </AccordionItem>
        </Accordion>
        {/*<div className="max-w-14">
          <Button size="md" type="submit" className="hover:bg-[#006fee]">
            Salvar
          </Button>
        </div>*/}
      </section>
    </>
  );
}
