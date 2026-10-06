import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const BRAND = {
    yellow: 'var(--brand-yellow)',
    red: 'var(--brand-red)',
    blue: 'var(--brand-blue)',
    green: 'var(--brand-green)',
};

export default function ExpedientePage() {
    return (
        <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] antialiased flex flex-col">
            <Header />

            <main className="flex-grow">
                <div className="border-b border-[var(--ink)]/10">
                    <div className="mx-auto max-w-7xl px-6 pt-12 pb-10">
                        <nav className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] text-[var(--ink)]/50 mb-8">
                            <a href="/" className="hover:text-[var(--brand-red)] transition">ObsESP</a>
                            <span>/</span>
                            <span className="text-[var(--ink)]">Expediente</span>
                        </nav>

                        <div className="flex items-start gap-4">
                            <span
                                className="font-mono text-xs mt-1.5 px-2 py-0.5 rounded"
                                style={{ background: BRAND.blue, color: 'white' }}
                            >
                                INFO
                            </span>
                            <h1
                                className="text-[clamp(2rem,5vw,3.5rem)] leading-[1] font-semibold tracking-tight"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                Expediente
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-12 gap-12">
                    <aside className="md:col-span-3 hidden md:block">
                        <div className="flex h-1.5 mb-6">
                            <div className="flex-1" style={{ background: BRAND.yellow }} />
                            <div className="flex-1" style={{ background: BRAND.red }} />
                            <div className="flex-1" style={{ background: BRAND.blue }} />
                            <div className="flex-1" style={{ background: BRAND.green }} />
                        </div>
                        <span className="text-xs font-mono uppercase tracking-[0.15em] text-[var(--ink)]/40">
                            Informações
                        </span>
                    </aside>

                    <div className="md:col-span-9 space-y-12 text-[var(--ink)]/80">

                        {/* Seção Editora */}
                        <section>
                            <h2
                                className="text-xl md:text-2xl font-semibold mb-4 text-[var(--ink)]"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                Editora
                            </h2>
                            <div className="space-y-1 text-base md:text-lg leading-relaxed">
                                <p>Observatório em Epidemiologia e Saúde Pública (ObsESP)</p>
                                <p>Universidade Federal do Piauí – UFPI</p>
                                <p>Campus Senador Helvídio Nunes de Barros (CSHNB)</p>
                                <p>Rua Cícero Duarte, nº 905 - Bairro Junco</p>
                                <p>CEP: 64607-670 | Picos – PI</p>
                            </div>
                        </section>

                        {/* Seção Conselho Editorial */}
                        <section>
                            <h2
                                className="text-xl md:text-2xl font-semibold mb-4 text-[var(--ink)]"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                Conselho Editorial
                            </h2>
                            <ul className="space-y-2 text-base md:text-lg leading-relaxed">
                                <li>Danilla Michelle Costa e Silva</li>
                                <li>Edina Araújo Rodrigues Oliveira</li>
                                <li>Laura Maria Feitosa Formiga</li>
                                <li>Rumão Batista Nunes de Carvalho</li>
                                <li>Ruan Everton de Souza Silva</li>
                            </ul>
                        </section>

                        {/* Seção Periodicidade */}
                        <section>
                            <h2
                                className="text-xl md:text-2xl font-semibold mb-4 text-[var(--ink)]"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                Periodicidade
                            </h2>
                            <p className="text-base md:text-lg leading-relaxed">
                                Trimestral
                            </p>
                        </section>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}