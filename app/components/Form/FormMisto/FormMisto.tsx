// importação de dependências
import { useFormik } from "formik";

//bibliotecas de componentes:
import { Button, DatePicker, Select, SelectItem } from "@nextui-org/react";

function formatar_datas(data: any) {
  const { day, month, year } = data;
  // Adiciona um zero à esquerda se o dia ou mês tiver apenas um dígito
  const formattedDay = String(day).padStart(2, '0');
  const formattedMonth = String(month).padStart(2, '0');
  
  return `${formattedDay}/${formattedMonth}/${year}`;
}

export function FormMisto() {
  const formik = useFormik({
    initialValues: {
      data_de_contrato: null,
      transacao: ""
    },
    onSubmit: (values) => {
      const dados_formatados = {
        ...values,
        data_de_contrato: values.data_de_contrato ? formatar_datas(values.data_de_contrato) : null,
      };

    // Aqui você pode enviar `formattedData` para o banco de dados
    alert(JSON.stringify(dados_formatados, null, 2));
    },

    
  });

  return (
    <>
      <h1 className="text-xl">Cadastro de contrato com preço fixado</h1>
      <form onSubmit={formik.handleSubmit}>
        <DatePicker
          id="data_de_contrato"

          variant="faded"
          className="max-w-44"
          label="Data do contrato"
          showMonthAndYearPickers

          value={formik.values.data_de_contrato}
          onChange={(date) => formik.setFieldValue("data_de_contrato", date)}
        />

        <Select
          id="transacao"
          
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

        <Button type="submit">
          Enviar
        </Button>
      </form>
    </>
  );
}
