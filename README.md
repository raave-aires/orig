# Origë
Um projeto por [Raavë Aires](https://github.com/raave-aires).

## 1. Ideia.
A ideia motriz por trás do Origë nasceu a partir do dia-a-dia da área de Commodities e logística[^1] da [Juparanã](http://juparana.com.br) e das ferramentas usadas nele. 

### 1.1. Problema. 
Atualmente, todos os processos de coleta de dados básicos de contratos, verificação de dados coletados, registro em sistemas, escritura e, por fim, revalidação de dados dos contratos e feito manualmente, seguindo mais ou menos o esquema:  
1.  *Um originador[^2] recolhe as informações negociadas com o cliente em uma planilha do Excel.*
2. *Recolhidas as informações, o originador envia por e-mail as informações que estarão no contrato, entre elas:*
- Se é um contrato com preço fixo ou a fixar.[^3]
- O tipo de transação a ser realizado, seja ela compra, venda ou troca[^4].
- O produto a ser transacionado, isto é, qual o grão.
- A safra aqual se refere a troca, isto é, o ano de plantio e o ano de colheita.[^5]
- A quantidade de grãos, entregue em toneladas e sacas[^6].
- O armazém onde será feita a entrega dos grãos.
- Preço e a moeda usada na transação. Esta informação varia a depender do tipo de contrato, isto é, se é fixo ou a fixar.
- O tipo de frete, que na verdade é o tipo de romaneio a ser realizado, se é recebimento nos armazéns ou envio a partir destes.
- As datas de contrato, data limite de entrega e data limite de pagamento e, em contratos a fixar, a data limite de fixação do preço.
- Dados civis e bancários do cliente.
- Caso o cliente faça parte de uma cooperativa, esteja negociando a venda com um sócio ou só prefira receber o pagamento em uma conta bancária de terceiro, os dados bancários de quem receberá o pagamento com ou por ele.
- Dados da(s) propriedade(s) nas quais o plantio foi feito, a fins de serem analisados junto aos orgãos ambientais.
- Outras informações complementares e/ou pertinentes.
3. *Um analista de commodities vai receber e revisar os dados, e fazer checagem das propriedades.*
4. *O analista registrará os dados em Excel e no sistema ERP.*
5. . O analista emitirá parecer sobre a negociação. Caso esteja tudo certo com as propriedades, o contrato será emitido; caso não esteja, os processos adequados seguirão.
6. *Estando tudo certo, o analista passará os dados do contrato para um documento.*
7. *O documento é enviado para revisão manual dos supervisores, que deverão aprová-lo e devolvê-lo para retificação.*
8. O contrato é enviado via plataforma de assinaturas.
9. O processo segue para a equipe financeira da empresa.

Foram destacados em itálico todos os pontos identificados onde o Origë pode trazer melhoria.

Em todo esse processo, há diferentes pontos onde é necessária a verificação manual, e pontos onde é necessário fazer uma tripla inserção, verificação e/ou correção de dados. Portanto:

### 1.2. Proposta.
Foi a fins de fazer com que a interação de envio de dados para contratos entre os originadores e os analistas (quem ativamente estará processando esses dados) fosse simplificada que surgiu a ideia do Origë, um app onde os dados dos contratos serão recolhidos e ficarão registrados. 

Com o Origë, o fluxo do processo se tornaria: 
1.  *Um originador recolhe as informações negociadas com o cliente e registra no Origë.*
2. *Um analista de commodities acessa o Origë e revisar os dados, e faz a checagem das propriedades.*
3. O analista emitirá parecer sobre a negociação. 
4. *Estando as informações do contrato registrada no banco de dados do Origë, o analista pode exportar os os dados em Excel e para um documento.*
5. . *Tendo sido gerado automaticamente, a necessidade de verificação se torna quase nula, mas também pode ser feita automaticamente comparado o que está no arquivo com o que está no banco de dados.*
6. O contrato é enviado via plataforma de assinaturas.
7. O processo segue para a equipe financeira da empresa.

Processos de alteração e/ou retificação futura precisarão apenas serem feitos uma vez, dentro do Origë e então serem exportadas.

## 2. Tecnologias usadas atualmente no Origë.
O Origë está sendo desenvolvido usando: 
- [Yarn](https://yarnpkg.com) como gerenciador de pacotes;
- [TypeScript](https://www.typescriptlang.org) como linguagem de programação;
- [Next.js](https://nextjs.org) como framework de desenvolvimento web;
- [React](https://react.dev) como biblioteca de componetização;
- [TailwindCSS](https://tailwindcss.com) como biblioteca de estilos.

Além destas tecnologias como base, são atualmente usadas também:
- As bibliotecas de componentes React + TailwindCSS [NextUI](https://nextui.org) e [MUI](https://mui.com);
- O componente [React number format](https://s-yadav.github.io/react-number-format/docs/intro/), como elemento input com formatação automática de números.
- A biblioteca de ícones [Lucide Icons](https://lucide.dev/icons/);
- A família de fontes [Inter](https://rsms.me/inter) como tipografia;

Implementações futuras:
- [Formik](https://formik.org) como biblioteca de validação de formulários feitos em React.
   
[^1]: Área da empresa responsável por negociações de compra e venda, firmação de contratos etc. Mas este projeto focaliza a parte de negociações e contratos.
[^2]: Originadores são as pessoas que tratam diretamente com os clientes, negociado quantidades, formas de pagamanento etc.
[^3]: Contratos de preço fixo são aqueles em que o preço dos grãos é definido na data de contratação seguindo a cotação/preço comercial do grão e do dólar (caso o contrato tenha sido firmado em dólar) no dia em que o contrato foi feito. Já o contrato com preço a fixar estabele uma quantidade e um prazo máximo para fixação de preço do grão a ser transacionado e do dólar, assim, o comprador ou vendedor pode escolher a cotação/preço comercial em um dia específico para ser usado no contrato, esse processo de escolha é chamado de fixação.
[^4]: Ou Baratto, é uma espécie de contratação semelhante a um empréstimo, um produto recebe uma quantia em dinheiro antecipadamente e, em troca, se compromete a entregar uma quantidade de grão até uma data limite.
[^5]: Exemplo: A safra 2024/2025 se refere às plantações feitas em 2024 que serão colhidas em 2025.
[^6]: Uma saca pesa 60kg.