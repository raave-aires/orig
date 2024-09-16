//Dependências:
import { DateValue } from "@internationalized/date";

//Componentes:
import { DatePicker, Select, SelectItem } from "@nextui-org/react";

interface Props {
    // datas de contrato
    dataContrato: DateValue,
    setDataContrato: DateValue,
    visual: string,

    //tipo de transação
    transacao: string,
    setTransacao: (e: string) => void;

    //tipo de produto
    produto: string,
    setProduto: (e: string) => void;

    //safra
    safra: string,
    setSafra: (e: string) => void;
}

export function FormAFixar({ dataContrato, setDataContrato, visual, transacao, setTransacao, produto, setProduto, safra, setSafra }: Props) {
    return (
        <section className="mt-5 flex flex-col gap-3">
            <h1 className="text-xl">Cadastrando contrato com preço a fixar</h1>

            <div className="flex flex-row gap-4"> {/* Aba de inserção das informações básicas */}
                <DatePicker
                    label="Data do contrato"
                    value={dataContrato}
                    onChange={setDataContrato}
                    variant={visual}
                    className="max-w-64"
                    showMonthAndYearPickers
                />

                {/* Transação */}
                <Select
                    label="Tipo de transação"

                    selectedKeys={[transacao]}
                    onChange={(e) => setTransacao(e.target.value)}

                    variant={visual}
                    className="max-w-60"
                >
                    <SelectItem key={"Compra"}>
                        Compra
                    </SelectItem>
                    <SelectItem key={"Venda"}>
                        Venda
                    </SelectItem>
                    <SelectItem key={"Troca"}>
                        Troca
                    </SelectItem>
                </Select>

                {/* Produto */}
                <Select
                    label="Produto"

                    selectedKeys={[produto]}
                    onChange={(e) => setProduto(e.target.value)}

                    variant={visual}
                    className="max-w-60"
                >
                    <SelectItem key={"Soja"}>
                        Soja
                    </SelectItem>
                    <SelectItem key={"Milho"}>
                        Milho
                    </SelectItem>
                    <SelectItem key={"Sementes"}>
                        Sementes
                    </SelectItem>
                </Select>

                {/* Safra */}
                <Select
                    label="Safra"

                    selectedKeys={[safra]}
                    onChange={(e) => setSafra(e.target.value)}

                    variant={visual}
                    className="max-w-60"
                >
                    <SelectItem key={"2024/2025"}>
                        2024/2025
                    </SelectItem>
                    <SelectItem key={"2025/2026"}>
                        2025/2026
                    </SelectItem>
                    <SelectItem key={"2026/2027"}>
                        2026/2027
                    </SelectItem>
                    <SelectItem key={"2027/2028"}>
                        2027/2028
                    </SelectItem>
                </Select>
            </div>

            <div> {/* Aba de inserção das informações de quantidade e valor */}
            </div>
        </section>
    );
}