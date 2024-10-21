import { Select, SelectItem } from "@nextui-org/react";

interface Props {
  tipoSelecionado: string;
  setTipoSelecionado: (e: string) => void;
}

export function TipoDeContrato({ tipoSelecionado, setTipoSelecionado }: Props) {
  return (
    <>
      <Select
        label="Tipo de contrato"
        selectedKeys={[tipoSelecionado]}
        onChange={(e) => setTipoSelecionado(e.target.value)}
        variant="faded"
        className="max-w-60"
      >
        <SelectItem key={"A fixar"}>Preço a fixar</SelectItem>
        <SelectItem key={"Fixado"}>Preço fixado</SelectItem>
        <SelectItem key={"Misto"}>Contrato misto</SelectItem>
      </Select>
    </>
  );
}
