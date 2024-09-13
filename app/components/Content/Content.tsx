import React from "react";

interface Props {
    children: React.ReactNode
}

export function Content({children}: Props){
    return(
        <main className="relative top-20 max-w-screen h-screen bg-cor_de_fundo flex justify-center">
            <section className="w-4/5 p-8">
                {children}
            </section>
        </main>
    );
}