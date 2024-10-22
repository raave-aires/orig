import User from '@/src/db/models/users';
import { conectar_bd } from '@/src/db/mongo';

export async function POST(req) {
  try {
    await conectar_bd();
    const { name, email, password } = await req.json();

    const newUser = await User.create({ name, email, password });
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET() {
  try {
    await conectar_bd();
    const users = await User.find({});
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
