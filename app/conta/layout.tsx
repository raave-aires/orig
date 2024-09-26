import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";

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
                {children}
            </body>
        </html>
    );
}
