import mongoose from "mongoose";

const uri = process.env.BANCO_DE_DADOS;
let conectado = false; // a fins de evitar reconexões desnecessárias

export async function conectar_bd() {
  if(!uri) throw new Error("A variável de conexão ao banco de dados não está definida.");
  if(conectado) return;

  try {
    await mongoose.connect(uri);
    conectado = true;
    console.log("Conectado ao banco de dados.");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados: ", error);
  }
}
