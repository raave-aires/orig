# Como funciona a atualização automática da taxa de câmbio no Origë?
O Origë realiza a atualização automática da taxa de câmbio sempre que o usuário seleciona a moeda dólar. Essa atualização é realizada por meio de uma consulta ao [Banco Central do Brasil](https://www.bcb.gov.br) (BACEN), que fornece o valor mais recente do PTAX (Taxa de câmbio de referência).

### Por que, em alguns casos, o valor apresentado é referente ao dia anterior?

O PTAX é calculado diariamente pelo BACEN com base na média das taxas informadas pelas instituições financeiras ao longo do dia. Consequentemente, o valor final da taxa de câmbio para um determinado dia é definido apenas ao final do dia útil bancário.

Assim sendo, a atualização do PTAX pelo BACEN ocorre geralmente entre 13h e 14h (horário de Brasília). E sabendo disso, o Origë foi projetado para verificar o horário atual e apresentar o valor mais recente disponível.

#### Mensagem de alerta:
- **Valor referente ao dia anterior:** Caso a consulta seja realizada antes da atualização do PTAX, será exibida uma mensagem informando que o valor apresentado é referente ao dia anterior
  > "O valor é referente a ontem, DD/MM."

- **Valor de hoje:** Após a atualização do PTAX, será exibida uma mensagem confirmando que o valor mais recente é o de hoje, por exemplo: 
  > "Este é o valor mais recente."

Observe, entretanto, que a periodicidade da atualização do PTAX pode variar e está sujeita a alterações por parte do BACEN.