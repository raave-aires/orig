import mongoose, { CallbackError } from "mongoose";

const esquema_do_contrato = new mongoose.Schema({
  numero_do_contrato: { type: String, unique: true }, 

  dados_basicos_do_contrato: {
    data_do_contrato: { type: String, required: true },
    tipo_de_transacao: { type: String, required: true },
    produto: { type: String, required: true },
    safra: { type: String, required: true },
    municipio: { type: String, required: true },
  },

  volume_e_valor: {
    volume: { type: Number, required: true },
  },
});

// função de atribuição automática de número do contrato:
esquema_do_contrato.pre('save', async function (next) {
  const dataAtual = new Date();
  const ano = String(dataAtual.getFullYear()).slice(-2); // pega os últimos dois dígitos do ano
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // pega o mês com dois dígitos
  const prefixo = `${ano}${mes}`; // formato base do número de contrato: "YYMM"

  try {
    const ultimo_contrato = await Contrato.findOne({
      numero_do_contrato: { $regex: `^${prefixo}-` } // verifica qual o número do último contrato criado neste mês
    }).sort({ numero_do_contrato: -1 });

    let proximo_numero = 1;

    if (ultimo_contrato) {
      // funções para extrair e incrementar o número do contrato anterior
      const partes = ultimo_contrato.numero_do_contrato.split('-');
      const ultimo_incremento = parseInt(partes[1], 10);
      proximo_numero = ultimo_incremento + 1;
    }

    // Atribuir o novo número de contrato no formato YYMM-XXXX
    this.numero_do_contrato = `${prefixo}-${String(proximo_numero).padStart(4, '0')}`;
    next();
  } catch(error){
    next(error as CallbackError); // Type assertion para evitar erro de tipagem
  }
});

const Contrato = mongoose.models.Contrato || mongoose.model('Contrato', esquema_do_contrato);
export default Contrato;
