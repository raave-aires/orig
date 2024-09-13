import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { HeaderItem } from "./HeaderItem";

interface Props {
    img_src: string,
    img_desc: string,
}

export function Header({img_src, img_desc}: Props){
    return(
        <header className="w-screen h-16 bg-cor_de_fundo flex items-center">
            <Image 
                src={img_src}
                alt={img_desc}
                width={24}
                height={24}
            />

            <nav>
                <ul>
                    <HeaderItem 
                        item_link='https://google.com/'
                        item_text="Google"
                    />
                </ul>
            </nav>
        </header>
    );
}