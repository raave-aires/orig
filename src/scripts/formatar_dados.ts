interface Data {
  day: number,
  month: number,
  year: number
}

function formatar_datas(data: Data ) {
  const { day, month, year } = data;
  // adiciona um zero à esquerda se o dia ou mês tiver apenas um dígito
  const dia = String(day).padStart(2, "0");
  const mes = String(month).padStart(2, "0");

  return `${dia}/${mes}/${year}`;
}

export function formatar_dados(values) {
  const formatacao = {
    dados_basicos_do_contrato: {
      data_do_contrato: values.data_de_contrato ? formatar_datas(values.data_de_contrato) : null,
      tipo_de_transacao: values.transacao,
      produto: values.produto,
      safra: values.safra,
      municipio: values.municipio,
    },
    volume_e_valor: {
      volume: values.volume,
    },
  };

  return formatacao;
}