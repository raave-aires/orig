//bibliotecas
import { format, subDays } from "date-fns";
import { Table } from "../../Table/Table";

export function FormMisto(){
    const hoje = new Date();
    const fData = format(subDays(hoje, 3), "12.0yy-MM-dd");

    return(
        <>
            <Table />
        </>
    );
}