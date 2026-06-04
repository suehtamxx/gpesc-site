import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const BRAND = {
  yellow: 'var(--brand-yellow)',
  red: 'var(--brand-red)',
  blue: 'var(--brand-blue)',
  green: 'var(--brand-green)',
};

export default function ContatoPage() {
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
              <span className="text-[var(--ink)]">Contato</span>
            </nav>

            <h1
              className="text-[clamp(2rem,5vw,3.5rem)] leading-[1] font-semibold tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Contato
            </h1>

            <div className="flex gap-6 text-xs font-mono text-[var(--ink)]/40 mt-4">
              <span>Publicado: 20/01/2025</span>
              <span>Atualizado: 05/02/2025</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-12 gap-12">
          {/* Sidebar */}
          <aside className="md:col-span-3 hidden md:block">
            <div className="flex h-1.5 mb-6">
              <div className="flex-1" style={{ background: BRAND.yellow }} />
              <div className="flex-1" style={{ background: BRAND.red }} />
              <div className="flex-1" style={{ background: BRAND.blue }} />
              <div className="flex-1" style={{ background: BRAND.green }} />
            </div>
            <span className="text-xs font-mono uppercase tracking-[0.15em] text-[var(--ink)]/40">
              Fale conosco
            </span>
          </aside>

          {/* Contact card */}
          <div className="md:col-span-9">
            <div className="rounded-2xl border border-[var(--ink)]/10 overflow-hidden max-w-lg">
              <div className="h-1" style={{ background: BRAND.red }} />
              <div className="p-6 md:p-8">
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-[var(--ink)]/40 mb-4">
                  E-mail institucional
                </p>
                <a
                  href="mailto:obsesp@ufpi.edu.br"
                  className="text-xl md:text-2xl font-semibold tracking-tight hover:opacity-70 transition"
                  style={{ fontFamily: 'var(--font-display)', color: BRAND.red }}
                >
                  obsesp@ufpi.edu.br
                </a>
                <p className="mt-4 text-sm text-[var(--ink)]/55 leading-relaxed">
                  Para dúvidas, informações ou colaborações com o Observatório de Epidemiologia e Saúde Pública da UFPI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}