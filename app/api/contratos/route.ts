// importação de funções:
import { conectar_bd } from "@/src/db/mongo";

// importação de modelos:
import Contrato from "@/src/db/models/contratos";

export async function POST(request: Request) {
  try {
    await conectar_bd();
    console.log("Conexão com o banco de dados estabelecida.");
    
    const dados = await request.json();
    const novo_contrato = await Contrato.create(dados);

    return new Response(JSON.stringify(novo_contrato), { status: 201 });
  } catch (error) {
    console.error("Houve um erro ao criar o contrato: ", error);
    
    const mensagem_de_erro = (error as Error).message || "Erro desconhecido"; 
    
    return new Response(JSON.stringify({ error: mensagem_de_erro }), { status: 500 });
  }
}

