
import User from '@/src/db/models/users';
import { conectar_bd } from '@/src/db/mongo';

export async function POST(request: Request) {
  try {
    await conectar_bd();
    console.log('Conexão com o banco de dados estabelecida.');
    const res = await request.json()

    const newUser = await User.create(res);

    return new Response(newUser, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

