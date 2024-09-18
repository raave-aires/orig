# 1. Orig
Um projeto por [Raavë Aires](https://github.com/raave-aires).

## 1.1. Ideia.
A ideia motriz por trás do Orig nasceu a partir do dia-a-dia da área de Commodities e logística[^1] da [Juparanã](http://juparana.com.br) e das ferramentas usadas nele. 

### 1.1.1. O problema. 
Atualmente, todos os processos de coleta de dados básicos de contratos, verificação de dados coletados, registro em sistemas, escritura e, por fim, revalidação de dados dos contratos e feito manualmente, seguindo mais ou menos o esquema:  
1.  Um originador[^2] recolhe as informações negociadas com o cliente em uma planilha do Excel.
2. Recolhidas as informações, o originador envia por e-mail as informações que estarão no contrato, entre elas:
- Se é um contrato com preço fixo ou a fixar.[^3]
- O tipo de transação a ser realizado, seja ela compra, venda ou troca[^4].
        - 


da foi tentar fazer com que a interação de envio de dados para contratos entre originadores e quem ativamente estará processando esses dados fosse simplificada. Mas, para entendermos isso precisamos rever o processo como ele está antes do Orig.

[^1]: Área da empresa responsável por negociações de compra e venda, firmação de contratos etc. Mas este projeto focaliza a parte de negociações e contratos.
[^2]: Originadores são as pessoas que tratam diretamente com os clientes, negociado quantidades, formas de pagamanento etc.
[^3]: Contratos de preço fixo são aqueles em que o preço dos grãos é definido na data de contratação seguindo a cotação/preço comercial do grão e do dólar (caso o contrato tenha sido firmado em dólar) no dia em que o contrato foi feito. Já o contrato com preço a fixar estabele uma quantidade e um prazo máximo para fixação de preço do grão a ser transacionado e do dólar, assim, o comprador ou vendedor pode escolher a cotação/preço comercial em um dia específico para ser usado no contrato, esse processo de escolha é chamado de fixação.
[^4]: Ou Baratto, é uma espécie de contratação semelhante a um empréstimo, um produto recebe uma quantia em dinheiro antecipadamente e, em troca, se compromete a entregar uma quantidade de grão até uma data limite.