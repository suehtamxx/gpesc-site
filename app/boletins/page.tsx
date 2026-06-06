import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { createClient } from '@/utils/supabase/server';
import { Boletim, COR_PARA_CSS } from '@/utils/supabase/types';

const BRAND_BLUE = 'var(--brand-blue)';

// Agrupa os boletins por ano
function agruparPorAno(boletins: Boletim[]) {
  const map = new Map<number, Boletim[]>();
  for (const b of boletins) {
    const lista = map.get(b.ano) ?? [];
    lista.push(b);
    map.set(b.ano, lista);
  }
  // Ordena os anos em ordem decrescente
  return Array.from(map.entries())
    .sort(([a], [b]) => b - a)
    .map(([ano, itens]) => ({ ano, itens }));
}

function formatarTag(b: Boletim): string {
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const inicio = b.mes_inicio ? meses[b.mes_inicio - 1] : null;
  const fim = b.mes_fim ? meses[b.mes_fim - 1] : null;
  const periodo = inicio && fim ? `${inicio}-${fim}` : (inicio ?? '');
  const vol = b.volume ? `Vol.${b.volume}` : '';
  const num = b.numero ? `Nº${b.numero}` : '';
  return [periodo, b.ano, vol, num].filter(Boolean).join(' · ');
}

export default async function BoletinsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('boletins')
    .select('*')
    .eq('publicado', true)
    .order('ano', { ascending: false })
    .order('numero', { ascending: false });

  const boletins: Boletim[] = data ?? [];
  const grupos = agruparPorAno(boletins);

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
              <span className="text-[var(--ink)]">Boletins</span>
            </nav>

            <div className="flex items-start gap-4">
              <span
                className="font-mono text-xs mt-1.5 px-2 py-0.5 rounded text-white"
                style={{ background: BRAND_BLUE }}
              >
                03
              </span>
              <h1
                className="text-[clamp(2rem,5vw,3.5rem)] leading-[1] font-semibold tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Boletins
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-6 py-16">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 mb-8 text-red-700 text-sm font-mono">
              Erro ao carregar boletins. Tente novamente mais tarde.
            </div>
          )}

          {grupos.length === 0 && !error && (
            <div className="text-center py-24 text-[var(--ink)]/40 font-mono text-sm">
              Nenhum boletim publicado ainda.
            </div>
          )}

          {grupos.map((grupo) => (
            <section key={grupo.ano} className="mb-16">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px flex-1 bg-[var(--ink)]/10" />
                <span
                  className="font-mono text-xs px-3 py-1 rounded"
                  style={{ background: BRAND_BLUE, color: 'white' }}
                >
                  {grupo.ano}
                </span>
                <div className="h-px flex-1 bg-[var(--ink)]/10" />
              </div>

              <div className="space-y-8">
                {grupo.itens.map((boletim) => {
                  const acento = COR_PARA_CSS[boletim.cor_acento ?? 'blue'] ?? BRAND_BLUE;
                  const tag = formatarTag(boletim);

                  return (
                    <article
                      key={boletim.id}
                      className="group relative rounded-2xl border border-[var(--ink)]/10 overflow-hidden hover:-translate-y-0.5 transition-transform"
                    >
                      {/* Top accent bar */}
                      <div className="h-1" style={{ background: acento }} />

                      <div className="p-6 md:p-8">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <span className="font-mono text-xs text-[var(--ink)]/40">{tag}</span>
                          {boletim.pdf_url && (
                            <a
                              href={boletim.pdf_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-mono px-3 py-1 rounded-full border border-[var(--ink)]/15 hover:border-[var(--ink)] transition shrink-0"
                            >
                              Baixar PDF ↗
                            </a>
                          )}
                        </div>

                        {/* Título */}
                        <h2
                          className="text-xl md:text-2xl font-semibold tracking-tight leading-tight mb-2"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {boletim.titulo}
                        </h2>

                        {/* Subtítulo */}
                        {boletim.subtitulo && (
                          <p className="text-base text-[var(--ink)]/70 mb-4 leading-snug">{boletim.subtitulo}</p>
                        )}

                        {/* Autores */}
                        {boletim.autores && (
                          <p className="text-sm text-[var(--ink)]/50 leading-relaxed mb-4">{boletim.autores}</p>
                        )}

                        {/* Resumo */}
                        {boletim.resumo && (
                          <div className="mt-4 pt-4 border-t border-[var(--ink)]/10 text-sm text-[var(--ink)]/70 leading-relaxed space-y-3">
                            {boletim.resumo.split('\n\n').map((paragrafo, pi) => (
                              <p key={pi}>{paragrafo}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
