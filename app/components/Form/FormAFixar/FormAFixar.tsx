//Componentes:
import { DatePicker } from "@nextui-org/react";

export function FormAFixar({dataContrato, setDataContrato, visual}) {
    return (
        <section className="mt-5 flex flex-col gap-3">
            <h1 className="text-xl">Cadastrando contrato com preço a fixar</h1>

            <div className="flex flex-row gap-2"> {/* Aba de inserção das informações */}
                    <DatePicker 
                        label="Data do contrato"
                        value={dataContrato} 
                        onChange={setDataContrato} 
                        variant={visual}
                        className="max-w-64"
                        showMonthAndYearPickers
                    />
            </div>
        </section>
    );
}