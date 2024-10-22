// importação de dependências:
import { useEffect, useState } from "react";
import { useFormik } from "formik";

//importação de funções:
import { formatar_datas } from "@/src/scripts/formatar_datas";

//bibliotecas de componentes:
import { Accordion, AccordionItem, Button, DatePicker, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea, Tooltip, useDisclosure } from "@nextui-org/react";
import { NumericFormat, PatternFormat } from "react-number-format";

//bibliotecas de ícones:
import { CircleDollarSign, CircleHelp, Info, MapPin, RefreshCwOff, RotateCw, Search, Weight } from "lucide-react";

export function FormMisto() {
  // variáveis do modal:
  const [quilos, setQuilos] = useState(""); //variável do moda
  const [tonelada, setTonelada] = useState(""); //variável do modal

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // funções do Formil
  const formik = useFormik({
    initialValues: {
      // dados básicos do contrato
      data_de_contrato: null,
      transacao: "",
      produto: "",
      safra: "",
      municipio: "",

      //dados de volume e valor:
      volume: ""
    },
    onSubmit: (values) => {
      const dados_formatados = {
        ...values,
        data_de_contrato: values.data_de_contrato ? formatar_datas(values.data_de_contrato) : null,
      };

    // Aqui você pode enviar `formattedData` para o banco de dados
    alert(JSON.stringify(dados_formatados, null, 2));
    console.log(typeof(values.data_de_contrato));
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

  return (
    <>
      <h1 className="text-xl">Cadastro de contrato com preço fixado</h1>
      <form onSubmit={formik.handleSubmit} className="bg-[#101010] mt-5 mb-10 flex flex-col gap-5 p-5 rounded-xl">
        <Accordion selectionMode="multiple" variant="bordered" isCompact={true}>
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
            </div>
            {/**fim da div container do acordeão*/}
          </AccordionItem>
          {/*fim do acordeão 2*/}
        </Accordion>
        <Button type="submit">
          Salvar
        </Button>
      </form>
    </>
  );
}
