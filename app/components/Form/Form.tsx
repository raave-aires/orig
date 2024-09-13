import { Datepicker, Select } from "flowbite-react";

export function Form(){
    return(
        <>
            <section>
                <h2 className="text-2xl select-none">Cadastro de originação</h2>

                <form action="" className="mt-3 flex flex-col gap-5">
                    <section>
                        <h3 className="text-lg">Dados de compra</h3>
                        <div className="flex flex-wrap gap-3">
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
                                    <option value="Compra">2023/2024</option>
                                    <option value="Venda">2024/2025</option>
                                    <option value="Troca">2025/2026</option>
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

                            <div className="flex flex-col gap-2">
                                <label htmlFor="volume">Volume</label>
                                <input type="number" name="volume" id="volume" placeholder="Digite a quantidade de grãos da transação" className="w-[250px] text-black"/>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="sacs">Sacas</label>
                                <input type="number" name="sacs" id="sacs" className="w-[150px] text-black" disabled={true}/>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="preco">Preço/Sc</label>
                                <input type="number" name="preco" id="preco" className="w-[150px] text-black"/>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="armazem">Armazém</label>
                                <Select id="armazem" name="Safra" required>
                                    <option value="">Selecione o armazém de recebimento</option>
                                    <option value="Paragominas - Matriz">Paragominas - Matriz</option>
                                    <option value="Morro Alto">Morro Alto</option>
                                    <option value="Dom Eliseu">Dom Eliseu</option>
                                    <option value="Rondon do Pará">Rondon do Pará</option>
                                    <option value="Açailândia">Açailândia</option>
                                </Select>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-lg select-none">Dados do parceiro</h2>
                        <div className="flex flex-wrap gap-5">
                            <div className="flex flex-col gap-2 w-3/5">
                                <label htmlFor="parceiro">Parceiro</label>
                                <input type="text" name="parceiro" id="parceiro" placeholder="Digite o nome do parceiro" className="w-3/5 text-black"/>
                            </div>
                        </div>
                    </section>
                </form>
            </section>
        </>
    );
}