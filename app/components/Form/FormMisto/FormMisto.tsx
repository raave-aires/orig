//bibliotecas
import { format, subDays } from "date-fns";

export function FormMisto(){
    const hoje = new Date();
    const fData = format(subDays(hoje, 3), "MM-dd-yyyy");

    return(
        <>
            {`${fData}`}
        </>
    );
}