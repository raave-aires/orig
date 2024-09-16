import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Brotos from "../../assets/imgs/brotos.jpg"
import Image from "next/image";

const inter = localFont({
    src: "../../assets/fonts/inter.woff2",
    variable: "--font-inter",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Orig",
    description: "Cadastro de originação",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body className={`${inter.variable} antialiased`}>
                <Image
                    src={Brotos}
                    fill={true}
                    alt="Uma imagem mostra várias mudas verdes emergindo de um solo escuro. A perspectiva é de perto, focada nas pequenas folhas que estão crescendo. O fundo está desfocado, dando destaque às mudas no primeiro plano, que parecem delicadas e recém-germinadas. A cor verde vibrante das folhas contrasta com o solo marrom escuro."
                    className="z-0"
                />
                {children}
            </body>
        </html>
    );
}
