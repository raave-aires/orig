import Image from "next/image";

import { Header } from "@/assets/components/Header/Header";

import { BrainCircuit } from 'lucide-react';

export default function Home() {
    return (
        <Header 
            img_src={BrainCircuit}
        />
    );
}
