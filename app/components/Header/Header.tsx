// import { Cloud } from "lucide-react";

import Image from "next/image";
import Juparana from "../../../assets/imgs/juparana.png"

interface Props {
    children: React.ReactNode
}

export function Header({children}: Props){
    return(
        <header className="w-screen h-16 bg-cor_de_fundo flex items-center">
            <h1>
                <Image
                    src={Juparana}
                    width={215}
                    height={40}
                    alt="Juparanã"
                />
            </h1>

            <nav className="text-white">
                <ul className="flex gap-4">
                    {children}
                </ul>
            </nav>
        </header>
    );
}