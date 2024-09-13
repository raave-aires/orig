import { Header } from "./components/Header/Header";
import Nuvem from "../assets/svgs/cloud.svg"

export default function Home() {
    return (
        <Header 
            img_src={Nuvem}
            img_desc="Ícone de nuvem"
        />
    );
}
