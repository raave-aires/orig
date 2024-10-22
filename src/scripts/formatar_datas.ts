interface Data {
  day: number,
  month: number,
  year: number
}

export function formatar_datas(data: Data) {
  const { day, month, year } = data;
  // adiciona um zero à esquerda se o dia ou mês tiver apenas um dígito
  const dia = String(day).padStart(2, "0");
  const mes = String(month).padStart(2, "0");

  return `${dia}/${mes}/${year}`;
}
