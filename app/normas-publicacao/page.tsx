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
                {/* Page hero */}
                <div className="border-b border-[var(--ink)]/10">
                    <div className="mx-auto max-w-7xl px-6 pt-12 pb-10">
                        {/* Breadcrumb */}
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

                {/* Content */}
                <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-12 gap-12">
                    {/* Sidebar accent */}
                    <aside className="md:col-span-3 hidden md:block">
                        <div className="flex h-1.5 mb-6">
                            <div className="flex-1" style={{ background: BRAND.yellow }} />
                            <div className="flex-1" style={{ background: BRAND.red }} />
                            <div className="flex-1" style={{ background: BRAND.blue }} />
                            <div className="flex-1" style={{ background: BRAND.green }} />
                        </div>
                        <span className="text-xs font-mono uppercase tracking-[0.15em] text-[var(--ink)]/40">
                            Sobre o observatório
                        </span>
                    </aside>

                    {/* Main text */}
                    <div className="md:col-span-9 space-y-6 text-base md:text-lg text-[var(--ink)]/80 leading-relaxed">
                        <p>
                            O <strong className="text-[var(--ink)]">Observatório de Epidemiologia e Saúde Pública (ObsESP)</strong> da
                            UFPI surgiu com o objetivo de dar continuidade às atividades de pesquisa e vigilância epidemiológica,
                            promovendo a divulgação do conhecimento científico e sua aproximação com a sociedade.
                        </p>
                        <p>
                            Em consonância com essa trajetória, as submissões são exclusivas para integrantes do ObsESP e devem
                            contemplar trabalhos resultantes das pesquisas desenvolvidas pelo grupo.
                        </p>
                        <p>
                            O observatório está aberto a parcerias, devendo, para tal, grupos interessados entrarem em contato por
                            meio do email:{' '}
                            <a
                                href="mailto:xxxxx"
                                className="font-medium text-[var(--brand-blue)] hover:underline"
                            >
                                obsesp@ufpi.edu.br
                            </a>.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}