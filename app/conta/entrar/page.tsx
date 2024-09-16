export default function Entrar(){
    return(
        <main className="w-screen h-screen flex items-center justify-center">
            <section className="w-[400px] h-[400px] bg-slate-800 z-10 rounded-xl">
                <a href="/">
                    <h1>Orig</h1>
                </a>

                <div>
                    <input type="email" name="p-email" id="p-email" />
                </div>
            </section>
        </main>
    );
}