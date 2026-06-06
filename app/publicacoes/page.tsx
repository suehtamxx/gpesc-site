import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { createClient } from '@/utils/supabase/server';
import { Publicacao, COR_PARA_CSS } from '@/utils/supabase/types';

const BRAND = {
  yellow: 'var(--brand-yellow)',
  red: 'var(--brand-red)',
  blue: 'var(--brand-blue)',
  green: 'var(--brand-green)',
};

const CORES_SEQUENCIA = [BRAND.red, BRAND.blue, BRAND.green, BRAND.yellow];

export default async function PublicacoesPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from('publicacoes')
    .select('*')
    .eq('publicado', true)
    .order('ano', { ascending: false });

  const publicacoes: Publicacao[] = data ?? [];

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
              <span className="text-[var(--ink)]">Outras Publicações</span>
            </nav>

            <div className="flex items-start gap-4">
              <span
                className="font-mono text-xs mt-1.5 px-2 py-0.5 rounded text-white"
                style={{ background: BRAND.green }}
              >
                04
              </span>
              <h1
                className="text-[clamp(2rem,5vw,3.5rem)] leading-[1] font-semibold tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Outras Publicações
              </h1>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="mx-auto max-w-7xl px-6 py-16">
          {publicacoes.length === 0 ? (
            <p className="text-center py-24 text-[var(--ink)]/40 font-mono text-sm">
              Nenhuma publicação cadastrada ainda.
            </p>
          ) : (
            <div className="space-y-4">
              {publicacoes.map((pub, index) => {
                const acento = CORES_SEQUENCIA[index % CORES_SEQUENCIA.length];

                return (
                  <article
                    key={pub.id}
                    className="group flex gap-0 rounded-2xl border border-[var(--ink)]/10 overflow-hidden hover:-translate-y-0.5 transition-transform"
                  >
                    {/* Left accent */}
                    <div className="w-1 shrink-0" style={{ background: acento }} />

                    <div className="flex-1 p-5 md:p-6">
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs text-[var(--ink)]/30 mt-1 shrink-0">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="flex-1 min-w-0">
                          {pub.doi_url ? (
                            <a
                              href={pub.doi_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block font-semibold text-base leading-snug mb-2 hover:opacity-70 transition"
                              style={{ fontFamily: 'var(--font-display)' }}
                            >
                              {pub.titulo} ↗
                            </a>
                          ) : (
                            <p
                              className="font-semibold text-base leading-snug mb-2"
                              style={{ fontFamily: 'var(--font-display)' }}
                            >
                              {pub.titulo}
                            </p>
                          )}
                          {pub.autores && (
                            <p className="text-sm text-[var(--ink)]/55 leading-relaxed">{pub.autores}</p>
                          )}
                          {pub.doi_url && (
                            <a
                              href={pub.doi_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-mono text-[var(--ink)]/30 hover:text-[var(--brand-blue)] transition mt-2 block break-all"
                            >
                              {pub.doi_url}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
