import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const BRAND = {
  yellow: 'var(--brand-yellow)',
  red: 'var(--brand-red)',
  blue: 'var(--brand-blue)',
  green: 'var(--brand-green)',
};

export default function NoticiasPage() {
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
              <span className="text-[var(--ink)]">Notícias</span>
            </nav>

            <div className="flex items-start gap-4">
              <span
                className="font-mono text-xs mt-1.5 px-2 py-0.5 rounded"
                style={{ background: 'var(--ink)', color: 'var(--paper)' }}
              >
                05
              </span>
              <h1
                className="text-[clamp(2rem,5vw,3.5rem)] leading-[1] font-semibold tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Notícias
              </h1>
            </div>

            <div className="flex gap-6 text-xs font-mono text-[var(--ink)]/40 mt-4 ml-10">
              <span>Publicado: 20/01/2025</span>
              <span>Atualizado: 05/02/2025</span>
            </div>
          </div>
        </div>

        {/* Empty state */}
        <div className="mx-auto max-w-7xl px-6 py-24 flex flex-col items-center text-center">
          <div className="flex h-1.5 w-24 mb-8">
            <div className="flex-1" style={{ background: BRAND.yellow }} />
            <div className="flex-1" style={{ background: BRAND.red }} />
            <div className="flex-1" style={{ background: BRAND.blue }} />
            <div className="flex-1" style={{ background: BRAND.green }} />
          </div>
          <p
            className="text-2xl md:text-3xl font-semibold tracking-tight mb-4 text-[var(--ink)]/70"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Em breve
          </p>
          <p className="text-sm text-[var(--ink)]/40 font-mono max-w-xs">
            As notícias e atualizações do ObsESP serão publicadas aqui em breve.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}