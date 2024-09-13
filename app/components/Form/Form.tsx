import { Datepicker, Select } from "flowbite-react";

export function Form(){
    return(
        <>
            <h2 className="text-2xl select-none">Cadastro de originação</h2>
                <form action="" className="mt-4 flex flex-wrap gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="dContrato">Data de contrato</label>
                        <Datepicker 
                            language="pt-BR" 
                            title="Data do contrato"
                            labelTodayButton="Hoje" 
                            labelClearButton="Limpar"
                            id="dContrato"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="dPagamento">Data de pagamento</label>
                        <Datepicker 
                            language="pt-BR" 
                            title="Data do pagamento"
                            labelTodayButton="Hoje" 
                            labelClearButton="Limpar"
                            id="dPagamento"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="transacao">Transação</label>
                        <Select id="transacao" name="Transação" required>
                            <option value="">Selecione</option>
                            <option value="Compra">Compra</option>
                            <option value="Venda">Venda</option>
                            <option value="Troca">Troca</option>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="produto">Produto</label>
                        <Select id="produto" name="Produto" required>
                            <option value="">Selecione</option>
                            <option value="Compra">Soja</option>
                            <option value="Venda">Milho</option>
                            <option value="Troca">Outro</option>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="safra">Safra</label>
                        <Select id="safra" name="Safra" required>
                            <option value="">Selecione</option>
                            <option value="Compra">Soja</option>
                            <option value="Venda">Milho</option>
                            <option value="Troca">Outro</option>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="frete">Frete</label>
                        <Select id="frete" name="Frete" required>
                            <option value="">Selecione</option>
                            <option value="Compra">FOB</option>
                            <option value="Venda">CIF</option>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2 w-3/5">
                        <label htmlFor="parceiro">Parceiro</label>
                        <input type="text" name="parceiro" id="parceiro" placeholder="Digite o nome do parceiro" className="w-3/5"/>
                    </div>
                </form>
        </>
    );
}