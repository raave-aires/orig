import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Header } from "./components/Header/Header";
import { HeaderItem } from "./components/Header/HeaderItem";

const inter = localFont({
    src: "../assets/fonts/inter.woff2",
    variable: "--font-inter",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Origë",
    description: "Cadastro de originação",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" className='dark'>
            <body className={`${inter.variable} antialiased`}>
                <Header>
                    <HeaderItem 
                        item_link="/"
                        item_text="Início"
                    />

                    <HeaderItem 
                        item_link="https://github.com/raave-aires/"
                        item_text="Sobre mim"
                    />
                </Header>

                {children}
            </body>
        </html>
    );
}
