export function formatar_datas(data: any) {
  const { day, month, year } = data;
  // Adiciona um zero à esquerda se o dia ou mês tiver apenas um dígito
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");

  return `${formattedDay}/${formattedMonth}/${year}`;
}
