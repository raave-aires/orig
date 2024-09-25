// import { Cloud } from "lucide-react";

import Image from "next/image";
import Orid from "../../../assets/svgs/ōrig.svg";

interface Props {
  children: React.ReactNode;
}

export function Header({ children }: Props) {
  return (
    <header className="fixed z-50 w-screen max-h-16 bg-[#262626b3] backdrop-blur-md flex justify-center">
      <div className="w-4/5 h-16 flex items-center justify-between">
        <h1>
          <a href="/">
            <Image src={Orid} width={70} height={35} alt="Juparanã" />
          </a>
        </h1>

        <nav className="text-white">
          <ul className="flex gap-4">{children}</ul>
        </nav>
      </div>
    </header>
  );
}
