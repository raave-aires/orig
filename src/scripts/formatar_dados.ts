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

function formatar_dados(values) {
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
      sacas: values.sacas,
      moeda: values.moeda ,
      preco_saca: values.preco_saca ,
      valor_total: values.valor_total ,
      ptax: values.ptax ,
      data_do_ptax: values.data_do_ptax ,
      valor_convertido: values.valor_convertido ,
      data_de_pagamento: values.data_de_pagamento ? formatar_datas(values.data_de_pagamento) : null,
    },
  };

  return formatacao;
}

export { formatar_datas, formatar_dados }