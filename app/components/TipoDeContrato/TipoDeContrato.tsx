interface Props {
    tipoSelecionado: string
    setTipoSelecionado: (e: string) => void;
}

export function TipoDeContrato({tipoSelecionado, setTipoSelecionado}: Props){
    return(
        <>
            <label htmlFor="tipo_de_contrato" className="flex flex-col gap-2 max-w-60">
                Tipo de contrato
                <select 
                    value={tipoSelecionado}
                    onChange={(e)=>setTipoSelecionado(e.target.value)}
                    name="tipo_de_contrato" id="tipo_de_contrato" className="bg-cinza_escuro rounded-lg border-cinza_de_borda focus:ring-transparent"
                    required
                >
                    <option value="0" className="hidden">Selecione</option>
                    <option value="A fixar">Preço a fixar</option>
                    <option value="Fixado">Preço fixado</option>
                </select>
            </label>
        </>
    );
}