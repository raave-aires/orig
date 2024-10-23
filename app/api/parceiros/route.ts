// importação de funções:
import { conectar_bd } from '@/src/db/mongo';

// importação de modelos:
import Parceiro from '@/src/db/models/parceiro';

export async function POST(request: Request) {
  try {
    await conectar_bd();

    const dados = await request.json()
    const novo_parceiro = await Parceiro.create(dados);

    return new Response(JSON.stringify(novo_parceiro), { status: 201 });
  } catch (error) {
    console.error("Houve um erro ao criar o contrato: ", error);
    
    const mensagem_de_erro = (error as Error).message || "Erro desconhecido"; 
    
    return new Response(JSON.stringify({ error: mensagem_de_erro }), { status: 500 });
  }
}