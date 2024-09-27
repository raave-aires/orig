//bibliotecas
import { format, subDays } from "date-fns";
import { PropertiesTable } from "../../Table/PropertiesTable";

export function FormMisto(){
    const hoje = new Date();
    const fData = format(subDays(hoje, 3), "12.0yy-MM-dd");

    return(
        <>
            <PropertiesTable />
        </>
    );
}