// importação de dependências:
import { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import { Time } from "@internationalized/date";
import { format, subDays } from "date-fns";
import { cnpj, cpf } from "cpf-cnpj-validator";

//importação de funções:
import { formatar_dados } from "@/src/scripts/formatar_dados";

//bibliotecas de componentes:
import { Accordion, AccordionItem, Button, DatePicker, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea, Tooltip, useDisclosure } from "@nextui-org/react";
import { NumericFormat, PatternFormat } from "react-number-format";
import { Spinner } from "../../Spinner/Spinner";

// bibliotecas de ícones:
import { CircleDollarSign, CircleHelp, Info, MapPin, RefreshCwOff, RotateCw, Search, Weight } from "lucide-react";

export function FormMisto() {
  // variáveis de datas
  const hoje = useMemo(() => new Date(), []);
  const dia_da_semana = hoje.toLocaleDateString("pt-BR", { weekday: "long" }).toString();
  const hora = useMemo(() => new Time(new Date().getHours(), new Date().getMinutes()),[]);
  const hora_de_atualizacao = useMemo(() => new Time(13, 30), []);
  // fim das variáveis de datas

  // variáveis do modal:
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [quilos, setQuilos] = useState(""); //variável do moda
  const [tonelada, setTonelada] = useState(""); //variável do modal
  // fim das variáveis o modal

  const [dataChecada, setDataChecada] = useState<string | JSX.Element>(""); //campo de descrição do ptax
  const [iconePtax, setIconePtax] = useState<React.ReactNode>(
    <RotateCw size={20} stroke="#595960" className="hover:stroke-[#006fee]" />
  );
  const [iconeCep, setIconeCep] = useState<React.ReactNode>(
    <Search size={20} stroke="#595960" className="hover:stroke-[#006fee]" />
  );

  // funções do Formik
  const formik = useFormik({
    initialValues: {
      // dados básicos do contrato
      data_de_contrato: null,
      transacao: "",
      produto: "",
      safra: "",
      municipio: "",
  
      // dados de volume e valor:
      volume: "",
      sacas: "",
      moeda: "",
      preco_saca: "",
      valor_total: "",
      ptax: "",
      data_do_ptax: "",
      valor_convertido: "",
      data_de_pagamento: null,

      // dados de entrega:
      filial: "",
      terceiro: false,
      filial_terceira: "",
      armazem: "",
      data_de_entrega: null,

      //dados do cliente:
      nome_do_parceiro: "",
      tipo_de_pessoa: "",
      cpf: "",
      cnpj: "",

      // endereço do cliente: 
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",

      // dados bancários:
      recebedor: "",
      nome_do_recebedor: "",
      tipo_de_recebedor: "",
      cpf_do_recebedor: "",
      cnpj_do_recebedor: "",
      banco: "",
      agencia: "",
      numero_da_conta: ""
    },
    onSubmit: (values) => {
      const dados_formatados = formatar_dados(values)
  
      alert(JSON.stringify(dados_formatados, null, 2));
    },
  });

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

  //função para calcular sacas
  useEffect(() => {
    const handleKeyUp = () => {
      const volume = formik.values.volume;
      if (volume) {
        const fVolume = volume.replace(/\s/g, "").replace(/,/g, "."); //expressão regular para remover os espaços entre os números
        console.log(fVolume);
        const rSacas = (parseFloat(fVolume) * 1000) / 60;
        formik.setFieldValue("sacas", rSacas.toFixed(2));
      } else {
          formik.setFieldValue("sacas", "");
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [formik, formik.values.volume]); //fim das função para calcular sacas

  //função para calcular o valor total
  useEffect(() => {
    const handleKeyUP = () => {
      const nSacas = formik.values.sacas;
      const pSacas = formik.values.preco_saca;

      if (nSacas && pSacas) {
        const fSacas = nSacas.replace(/\s/g, ""); //expressão regular para remover os espaços entre os números
        const fPreco = parseFloat(pSacas.replace(/,/g, "."));
        const rTotal = Number(fSacas) * fPreco;
        formik.setFieldValue("valor_total", rTotal.toString());
      } else {
        formik.setFieldValue("valor_total", "");
      }
    };

    window.addEventListener("keyup", handleKeyUP);

    return () => {
      window.removeEventListener("keyup", handleKeyUP);
    };
  }, [formik, formik.values.sacas, formik.values.preco_saca]); //fim da função para calcular o valor total

  //função de chamada automática da api do ptax
  useEffect(() => {
    const obter_ptax = async () => {
      try {
        if (dia_da_semana === "segunda-feira") {
          const dia_do_ptax = format(subDays(hoje, 3), "MM-dd-yyyy");
          console.log(dia_do_ptax);
          const api_url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dia_do_ptax}'&$top=100&$format=json`;
          const solicitar = await fetch(api_url);
          const resposta = await solicitar.json();
          formik.setFieldValue("ptax", resposta.value[0].cotacaoVenda);
          setDataChecada(
            `O valor é referente à sexta-feira, dia ${format(
              dia_do_ptax,
              "dd/MM"
            )}.`
          );
        } else if (dia_da_semana === "sábado"){
            const dia_do_ptax = format(subDays(hoje, 1), "MM-dd-yyyy");
            console.log(dia_do_ptax);
            const api_url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dia_do_ptax}'&$top=100&$format=json`;
            const solicitar = await fetch(api_url);
            const resposta = await solicitar.json();
            formik.setFieldValue("ptax", resposta.value[0].cotacaoVenda);
            setDataChecada(
              `O valor é referente à sexta-feira, dia ${format(
                dia_do_ptax,
                "dd/MM"
              )}.`
            );
        } else if (dia_da_semana === "domingo"){
          const dia_do_ptax = format(subDays(hoje, 2), "MM-dd-yyyy");
          console.log(dia_do_ptax);
          const api_url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dia_do_ptax}'&$top=100&$format=json`;
          const solicitar = await fetch(api_url);
          const resposta = await solicitar.json();
          formik.setFieldValue("ptax", resposta.value[0].cotacaoVenda);
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
            formik.setFieldValue("ptax", resposta.value[0].cotacaoVenda);
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
            formik.setFieldValue("ptax", resposta.value[0].cotacaoVenda);
            setDataChecada(
              `O valor é referente a hoje, dia ${format(dia_do_ptax, "dd/MM")}.`
            );
          }
        }
      } catch (error) {
        formik.setFieldValue("ptax", "0");
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
                  Recomendamos que tente
                  <a
                    href="https://www.bcb.gov.br/estabilidadefinanceira/fechamentodolar"
                    target="_blank"
                    className="text-cyan-500 hover:underline hover:underline-offset-2"
                  >
                    verificar manualmente
                  </a>
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

    if (formik.values.moeda === "Dólar americano") {
      obter_ptax();
    } else {
      formik.setFieldValue("ptax", "");
    }
  }, [ formik, formik.values.moeda, dia_da_semana, hoje, setDataChecada, hora, hora_de_atualizacao,
  ]); // fim da função de chamada automática da api do ptax
  
  //função de chamada manual da api do ptax
  const obter_ptax = async () => {
    setDataChecada("");
    formik.setFieldValue("ptax", "");
    setIconePtax(<Spinner />);
    setTimeout(async () => {
      try {
        if (dia_da_semana === "segunda-feira") {
          const dia_do_ptax = format(subDays(hoje, 3), "MM-dd-yyyy");
          console.log(dia_do_ptax);
          const api_url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dia_do_ptax}'&$top=100&$format=json`;
          const solicitar = await fetch(api_url);
          const resposta = await solicitar.json();
          formik.setFieldValue("ptax", resposta.value[0].cotacaoVenda);
          setDataChecada(
            `O valor é referente à sexta-feira, dia ${format(
              dia_do_ptax,
              "dd/MM"
            )}.`
          );
        } else if (dia_da_semana === "sábado"){
            const dia_do_ptax = format(subDays(hoje, 1), "MM-dd-yyyy");
            console.log(dia_do_ptax);
            const api_url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dia_do_ptax}'&$top=100&$format=json`;
            const solicitar = await fetch(api_url);
            const resposta = await solicitar.json();
            formik.setFieldValue("ptax", resposta.value[0].cotacaoVenda);
            setDataChecada(
              `O valor é referente à sexta-feira, dia ${format(
                dia_do_ptax,
                "dd/MM"
              )}.`
            );
        } else if (dia_da_semana === "domingo"){
          const dia_do_ptax = format(subDays(hoje, 2), "MM-dd-yyyy");
          console.log(dia_do_ptax);
          const api_url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dia_do_ptax}'&$top=100&$format=json`;
          const solicitar = await fetch(api_url);
          const resposta = await solicitar.json();
          formik.setFieldValue("ptax", resposta.value[0].cotacaoVenda);
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
            formik.setFieldValue("ptax", resposta.value[0].cotacaoVenda);
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
            formik.setFieldValue("ptax", resposta.value[0].cotacaoVenda);
            setDataChecada(
              `O valor é referente a hoje, dia ${format(dia_do_ptax, "dd/MM")}.`
            );
          }
        }
      } catch (error) {
        formik.setFieldValue("ptax", "0");
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
                  Recomendamos que tente
                  <a
                    href="https://www.bcb.gov.br/estabilidadefinanceira/fechamentodolar"
                    target="_blank"
                    className="text-cyan-500 hover:underline hover:underline-offset-2"
                  >
                    verificar manualmente
                  </a>
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
  }; // fim da função de chamada manual da api do ptax

  //função de cálculo de valor convertido
  useEffect(() => {
    const vPtax = formik.values.ptax;
    const vTotal = formik.values.valor_total;

    if (vPtax) {
      const fTotal = vTotal.replace(/\s/g, "").replace(/,/g, ".");
      const resConvertido = parseFloat(fTotal) * parseFloat(vPtax);
      formik.setFieldValue("valor_convertido", resConvertido.toFixed(2));
    } else {
      formik.setFieldValue("valor_convertido", "");
    }
  }, [formik, formik.values.ptax, formik.values.valor_total]); //fim função de cálculo de valor convertido

  //função de validação do cpf
  useEffect(() => {
    const validar_documento = () => {
      const nCpf = formik.values.cpf;
      if (nCpf.length >= 11) {
        const fCpf = nCpf.replace(/[.-]/g, "");
        if (cpf.isValid(fCpf)) {
          formik.setFieldValue("cpf", cpf.format(fCpf));
        } else {
          alert("CPF inválido.");
          formik.setFieldValue("cpf", "");
        }
      } else if (nCpf.length > 14) {
        formik.setFieldValue("cpf", nCpf.slice(0, 14));
      }
    };

    window.addEventListener("keyup", validar_documento);

    return () => {
      window.removeEventListener("keyup", validar_documento);
    };
  }, [formik, formik.values.cpf]); //fim função de validação do cpf

  //função de validação do cnpj
  useEffect(() => {
    const validar_documento = () => {
      const nCnpj = formik.values.cnpj;
      if (nCnpj.length >= 11) {
        const fCnpj = nCnpj.replace(/[.-/]/g, "");
        if (cnpj.isValid(fCnpj)) {
          formik.setFieldValue("cnpj", cnpj.format(fCnpj));
        } else {
          alert("CNPJ inválido.");
          formik.setFieldValue("cnpj", "");
        }
      } else if (nCnpj.length > 18) {
        formik.setFieldValue("cnpj", nCnpj.slice(0, 18));
      }
    };

    window.addEventListener("keyup", validar_documento);

    return () => {
      window.removeEventListener("keyup", validar_documento);
    };
  }, [formik, formik.values.cnpj]); //fim da função de validação do cnpj

  //função de chamada da api do cep
  const buscar_cep = async () => {
    try {
      const cep = formik.values.cep;
      if (cep) {
        setIconeCep(<Spinner />);
        setTimeout(async () => {
          const fCep = cep.replace(/-/g, "");
          const api_url = `https://viacep.com.br/ws/${fCep}/json`;
          const solicitar = await fetch(api_url);
          const resposta = await solicitar.json();
          formik.setFieldValue("rua", resposta.logradouro);
          formik.setFieldValue("bairro", resposta.bairro);
          formik.setFieldValue("cidade", resposta.localidade);
          formik.setFieldValue("estado", resposta.estado);
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

  return (
    <>
      <h1 className="text-xl">Cadastro de contrato com preço fixado</h1>
      <form onSubmit={formik.handleSubmit} className="bg-[#101010] mt-5 mb-10 flex flex-col gap-5 p-5 rounded-xl">
        <Accordion selectionMode="multiple" variant="bordered" isCompact={true}>
          {/*acordeão 1: dados básicos do contrato*/}
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title="Dados básicos do contrato"
          >
            <div className="flex flex-wrap gap-4 mb-3">
              <DatePicker
                id="data_de_contrato"
                isRequired
                variant="faded"
                className="max-w-44"
                label="Data do contrato"
                showMonthAndYearPickers

                value={formik.values.data_de_contrato}
                onChange={(date) => formik.setFieldValue("data_de_contrato", date)}
              />

              <Select
                id="transacao"
                isRequired
                variant="faded"
                className="max-w-48 min-w-40"
                label="Tipo de transação"
                selectedKeys={[formik.values.transacao]}
                onChange={(e) => formik.setFieldValue("transacao", e.target.value)}
              >
                <SelectItem key={"Compra"}>Compra</SelectItem>
                <SelectItem key={"Venda"}>Venda</SelectItem>
                <SelectItem key={"Troca"}>Troca</SelectItem>
              </Select>

              <Select
                id="produto"
                isRequired
                variant="faded"
                className="max-w-60"
                label="Produto"

                selectedKeys={[formik.values.produto]}
                onChange={(e) => formik.setFieldValue("produto", e.target.value)}
              >
                <SelectItem key={"Soja em grãos"}>Soja em grãos</SelectItem>
                <SelectItem key={"Milho em grãos"}>Milho em grãos</SelectItem>
                <SelectItem key={"Sementes"}>Sementes</SelectItem>
              </Select>
              
              <Select
                id="safra"
                isRequired
                variant="faded"
                className="max-w-40"
                label="Safra"
                selectedKeys={[formik.values.safra]}
                onChange={(e) => formik.setFieldValue("safra", e.target.value)}
              >
                <SelectItem key={"2024/2025"}>2024/2025</SelectItem>
                <SelectItem key={"2025/2026"}>2025/2026</SelectItem>
                <SelectItem key={"2026/2027"}>2026/2027</SelectItem>
                <SelectItem key={"2027/2028"}>2027/2028</SelectItem>
              </Select>

              <Select
                id="municipio"
                isRequired
                variant="faded"
                className="max-w-48 min-w-40"
                label="Município"
                selectedKeys={[formik.values.municipio]}
                onChange={(e) => formik.setFieldValue("municipio", e.target.value)}
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
                value={formik.values.volume}
                onChange={(e) => formik.setFieldValue("volume", e.target.value)}
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
                              formik.setFieldValue("volume", tonelada);
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
                            formik.setFieldValue("volume", tonelada);
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
                id="sacas"
                name="Sacas"

                customInput={Input}
                variant="faded"
                className="max-w-56"
                label="Sacas"
                isDisabled
                valueIsNumericString={true}
                thousandSeparator=" "
                decimalScale={0}
                value={formik.values.sacas}
                onChange={(e) => formik.setFieldValue("sacas", e.target.value)}
              />

              {/* Transação */}
              <Select
                variant="faded"
                className="max-w-48 min-w-40"
                label="Moeda a ser usada"
                selectedKeys={[formik.values.moeda]}
                onChange={(e) => {
                  formik.setFieldValue("moeda", e.target.value),
                    formik.setFieldValue("valor_total", ""),
                    formik.setFieldValue("preco_saca", "")
                }}
              >
                <SelectItem key={"Dólar americano"}>Dólar</SelectItem>
                <SelectItem key={"Real brasileiro"}>Real</SelectItem>
              </Select>
              {/* Produto */}

              {formik.values.moeda === "" ? null : formik.values.moeda === "Dólar americano" ? (
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
                    value={formik.values.preco_saca}
                    onChange={(e) => formik.setFieldValue("preco_saca", e.target.value)}
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
                    value={formik.values.valor_total}
                    onChange={(e) => formik.setFieldValue("valor_total", e.target.value)}
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
                      value={formik.values.ptax}
                      onChange={(e) => formik.setFieldValue("ptax", e.target.value)}
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
                    value={formik.values.valor_convertido}
                    onChange={(e) => formik.setFieldValue("valor_convertido", e.target.value)}
                  />
                </>
              ) : formik.values.moeda === "Real brasileiro" ? (
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
                    value={formik.values.preco_saca}
                    onChange={(e) => formik.setFieldValue("preco_saca", e.target.value)}
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
                    value={formik.values.valor_total}
                    onChange={(e) => formik.setFieldValue("valor_total", e.target.value)}
                  />
                </>
              ) : null}

              <DatePicker
                id="data_de_pagamento"
                isRequired
                variant="faded"
                className="max-w-44"
                label="Data do pagamento"
                showMonthAndYearPickers

                value={formik.values.data_de_pagamento}
                onChange={(date) => formik.setFieldValue("data_de_pagamento", date)}
              />
            </div>
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
                selectedKeys={[formik.values.filial]}
                onChange={(e) => formik.setFieldValue("filial", e.target.value)}
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
              {formik.values.filial === "Terceiro" ? (
                <>
                  <Select
                    variant="faded"
                    className="max-w-56 min-w-40"
                    label="Terceiro"
                    selectedKeys={[formik.values.filial_terceira]}
                    onChange={(e) => formik.setFieldValue("filial_terceira", e.target.value)}
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
                    value={formik.values.armazem}
                    onChange={(e) => formik.setFieldValue("armazem", e.target.value)}
                  />
                </>
              ) : null}
              <DatePicker
                variant="faded"
                className="max-w-44"
                label="Data da entrega"
                showMonthAndYearPickers
                value={formik.values.data_de_entrega}
                onChange={(date) => formik.setFieldValue("data_de_entrega", date)}
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
                value={formik.values.nome_do_parceiro}
                onChange={(e) => formik.setFieldValue("nome_do_parceiro", e.target.value)}
              />

              <Select
                variant="faded"
                className="max-w-48 min-w-40"
                label="Tipo de parceiro"
                selectedKeys={[formik.values.tipo_de_pessoa]}
                onChange={(e) => formik.setFieldValue("tipo_de_pessoa", e.target.value)}
              >
                <SelectItem key={"Física"}>Pessoa física</SelectItem>
                <SelectItem key={"Jurídica"}>Pessoa jurídica</SelectItem>
              </Select>

              {formik.values.tipo_de_pessoa === "" ? null : formik.values.tipo_de_pessoa === "Física" ? (
                <Input
                  variant="faded"
                  label="CPF do parceiro"
                  className="max-w-52"
                  value={formik.values.cpf}
                  onChange={(e) => formik.setFieldValue("cpf", e.target.value)}
                />
              ) : formik.values.tipo_de_pessoa === "Jurídica" ? (
                <Input
                  variant="faded"
                  label="CNPJ  do parceiro"
                  className="max-w-52"
                  value={formik.values.cnpj}
                  onChange={(e) => formik.setFieldValue("cnpj", e.target.value)}
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
                      value={formik.values.cep}
                      onChange={(e) => formik.setFieldValue("cep", e.target.value)}
                      endContent={
                        <Tooltip
                          content={
                            <div className="p-2 max-w-48 flex flex-col gap-2">
                              <MapPin />
                              <p>Buscar dados do CEP digitado.</p>
                              <p>
                                Caso precise, verifique manualmente
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
                      value={formik.values.rua}
                      onChange={(e) => formik.setFieldValue("rua", e.target.value)}
                    />

                    <Input
                      variant="faded"
                      label="Nº"
                      className="max-w-32"
                      value={formik.values.numero}
                      onChange={(e) => formik.setFieldValue("numero", e.target.value)}
                    />

                    <Input
                      variant="faded"
                      label="Bairro"
                      className="max-w-64"
                      value={formik.values.bairro}
                      onChange={(e) => formik.setFieldValue("bairro", e.target.value)}
                    />

                    <Input
                      variant="faded"
                      label="Cidade"
                      className="max-w-64"
                      value={formik.values.cidade}
                      onChange={(e) => formik.setFieldValue("cidade", e.target.value)}
                    />

                    <Input
                      variant="faded"
                      label="Estado"
                      className="max-w-64"
                      value={formik.values.estado}
                      onChange={(e) => formik.setFieldValue("estado", e.target.value)}
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
                      selectedKeys={[formik.values.recebedor]}
                      onChange={(e) => formik.setFieldValue("recebedor", e.target.value)}
                      variant="faded"
                      className="max-w-60"
                    >
                      <SelectItem key={"Cliente"}>Conta do cliente</SelectItem>
                      <SelectItem key={"Terceiro"}>
                        Conta de terceiro
                      </SelectItem>
                    </Select>

                    {formik.values.recebedor === "" ? null : formik.values.recebedor === "Cliente" ? (
                      <>
                        <Input
                          variant="faded"
                          label="Nome do recebedor"
                          className="max-w-96 min-w-60"
                          isDisabled
                          value={formik.values.nome_do_parceiro}
                        />

                        {formik.values.tipo_de_pessoa === "" ? null : formik.values.tipo_de_pessoa ===
                          "Física" ? (
                          <Input
                            variant="faded"
                            label="CPF do recebedor"
                            className="max-w-52"
                            isDisabled
                            value={formik.values.cpf}
                          />
                        ) : formik.values.tipo_de_pessoa === "Jurídica" ? (
                          <Input
                            variant="faded"
                            label="CNPJ  do recebedor"
                            className="max-w-52"
                            isDisabled
                            value={formik.values.cnpj}
                          />
                        ) : null}

                        <Input
                          variant="faded"
                          label="Banco"
                          className="max-w-52"
                          value={formik.values.banco}
                          onChange={(e) => formik.setFieldValue("banco", e.target.value)}
                        />

                        <Input
                          variant="faded"
                          label="Agência"
                          className="max-w-52"
                          value={formik.values.agencia}
                          onChange={(e) => formik.setFieldValue("agencia", e.target.value)}
                        />

                        <Input
                          variant="faded"
                          label="Nº da conta"
                          className="max-w-52"
                          value={formik.values.numero_da_conta}
                          onChange={(e) => formik.setFieldValue("numero_da_conta", e.target.value)}
                        />
                      </>
                    ) : formik.values.recebedor === "Terceiro" ? (
                      <>
                        <Input
                          variant="faded"
                          label="Nome do recebedor"
                          className="max-w-96 min-w-60"
                          value={formik.values.nome_do_recebedor}
                          onChange={(e) => formik.setFieldValue("nome_do_recebedor", e.target.value)}
                        />

                        <Select
                          variant="faded"
                          className="max-w-48 min-w-40"
                          label="Tipo de parceiro"
                          selectedKeys={[formik.values.tipo_de_recebedor]}
                          onChange={(e) => formik.setFieldValue("tipo_de_recebedor", e.target.value)}
                        >
                          <SelectItem key={"Física"}>Pessoa física</SelectItem>
                          <SelectItem key={"Jurídica"}>Pessoa jurídica</SelectItem>
                        </Select>

                        {formik.values.tipo_de_recebedor === "" ? null : formik.values.tipo_de_recebedor === "Física" ? (
                          <Input
                            variant="faded"
                            label="CPF do recebedor"
                            className="max-w-52"
                            value={formik.values.cpf_do_recebedor}
                            onChange={(e) => formik.setFieldValue("cpf_do_recebedor", e.target.value)}
                          />
                        ) : formik.values.tipo_de_recebedor === "Jurídica" ? (
                          <Input
                            variant="faded"
                            label="CNPJ  do recebedor"
                            className="max-w-52"
                            value={formik.values.cnpj_do_recebedor}
                            onChange={(e) => formik.setFieldValue("cnpj_do_recebedor", e.target.value)}
                          />
                        ) : null}

                        <Input
                          variant="faded"
                          label="Banco"
                          className="max-w-52"
                          value={formik.values.banco}
                          onChange={(e) => formik.setFieldValue("banco", e.target.value)}
                        />

                        <Input
                          variant="faded"
                          label="Agência"
                          className="max-w-52"
                          value={formik.values.agencia}
                          onChange={(e) => formik.setFieldValue("agencia", e.target.value)}
                        />

                        <Input
                          variant="faded"
                          label="Nº da conta"
                          className="max-w-52"
                          value={formik.values.numero_da_conta}
                          onChange={(e) => formik.setFieldValue("numero_da_conta", e.target.value)}
                        />
                      </>
                    ) : null}
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
          </AccordionItem>
          {/*fim do acordeão 4*/}

          {/*acordeão 5: outros*/}
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
          {/*fim do acordeão 5*/}
        </Accordion>
        <Button type="submit">
          Salvar
        </Button>
      </form>
    </>
  );
}
