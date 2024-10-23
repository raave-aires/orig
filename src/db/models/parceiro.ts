import mongoose from 'mongoose';

const esquema_de_parceiro = new mongoose.Schema({
  nome_do_parceiro: { type: String, required: true },
  tipo_de_parceiro: { type: String, required: true },
  cpf_cnpj: { type: String, required: true, unique: true}
});

export default mongoose.models.Parceiro || mongoose.model('Parceiro', esquema_de_parceiro);
