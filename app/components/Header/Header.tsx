// import { Cloud } from "lucide-react";

import Image from "next/image";
import Juparana from "../../../assets/imgs/juparana.png"

interface Props {
    children: React.ReactNode
}

export function Header({children}: Props){
    return(
        <header className="fixed z-50 w-screen max-h-16 bg-[#262626b3] backdrop-blur-md flex justify-center">
            <div className="w-4/5 h-16 flex items-center justify-between">
                <h1>
                    <a href="/">
                        <Image
                            src={Juparana}
                            width={184.74}
                            height={35}
                            alt="Juparanã"
                        />
                    </a>
                </h1>

                <nav className="text-white">
                    <ul className="flex gap-4">
                        {children}
                    </ul>
                </nav>
            </div>
        </header>
    );
}