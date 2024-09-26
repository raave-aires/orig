//bibliotecas
import { format, subDays } from "date-fns";

export function FormMisto(){
    const hoje = new Date();
    const fData = format(subDays(hoje, 3), "12.0yy-MM-dd");

    return(
        <>
            <div className="py-5">
                <p>está parte está em desenvolvimento.</p>
                <p>&#169; {`${fData}`} raaviüs.</p>
            </div>
        </>
    );
}