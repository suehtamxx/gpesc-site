import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { createClient } from '@/utils/supabase/server';
import { Membro, COR_PARA_CSS } from '@/utils/supabase/types';

const BRAND = {
  yellow: 'var(--brand-yellow)',
  red: 'var(--brand-red)',
  blue: 'var(--brand-blue)',
  green: 'var(--brand-green)',
};

export default async function SobrePage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from('membros')
    .select('*')
    .eq('ativo', true)
    .order('ordem', { ascending: true });

  const membros: Membro[] = data ?? [];

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
              <span className="text-[var(--ink)]">Quem Somos</span>
            </nav>

            <div className="flex items-start gap-4">
              <span
                className="font-mono text-xs mt-1.5 px-2 py-0.5 rounded"
                style={{ background: BRAND.yellow, color: 'var(--ink)' }}
              >
                01
              </span>
              <h1
                className="text-[clamp(2rem,5vw,3.5rem)] leading-[1] font-semibold tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Quem Somos
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
              Universidade Federal do Piauí (UFPI) é uma iniciativa conjunta de docentes Doutores em Ciências, formados
              pela Faculdade de Saúde Pública da Universidade de São Paulo (FSP/USP), participantes do projeto de
              Doutorado Interinstitucional (DINTER) Nutrição em Saúde Pública 2015/2019.
            </p>
            <p>
              Foi idealizado em 2021 como maneira de dar seguimento às atividades de pesquisa e vigilância
              epidemiológica em níveis local, regional e nacional. Os pesquisadores idealizadores coordenaram o{' '}
              <em className="not-italic font-medium" style={{ color: BRAND.red }}>
                &ldquo;Inquérito de saúde de base populacional nos municípios de Teresina e Picos (PI) (ISAD-PI)&rdquo;
              </em>
              , um inquérito pioneiro no estado do Piauí, executado pela UFPI em parceria com a FSP/USP.
            </p>
          </div>
        </div>

        {/* Team */}
        <div className="border-t border-[var(--ink)]/10">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="flex items-end justify-between mb-10">
              <h2
                className="text-2xl md:text-3xl font-semibold tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Equipe editorial
              </h2>
              {membros.length > 0 && (
                <span className="text-xs font-mono text-[var(--ink)]/40 hidden md:block">
                  {membros.length === 1 ? '1 membro' : `${membros.length} membros`}
                </span>
              )}
            </div>

            {membros.length === 0 ? (
              <p className="text-[var(--ink)]/40 font-mono text-sm">Nenhum membro cadastrado ainda.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {membros.map((member, index) => {
                  const cores = [BRAND.yellow, BRAND.red, BRAND.blue, BRAND.green, 'var(--ink)', BRAND.yellow];
                  const acento = COR_PARA_CSS[member.foto_url ? '' : ''] ?? cores[index % cores.length];

                  return (
                    <div
                      key={member.id}
                      className="group relative rounded-2xl overflow-hidden border border-[var(--ink)]/10 hover:-translate-y-1 transition-transform"
                    >
                      {/* Photo */}
                      <div className="w-full aspect-[4/3] flex items-center justify-center text-xs font-mono text-[var(--ink)]/30 bg-[var(--ink)]/5 overflow-hidden">
                        {member.foto_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={member.foto_url}
                            alt={member.nome}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span>foto</span>
                        )}
                      </div>
                      {/* Color accent bar */}
                      <div className="h-1" style={{ background: cores[index % cores.length] }} />
                      {/* Info */}
                      <div className="p-4">
                        <p
                          className="font-semibold text-sm leading-tight mb-1"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {member.titulo ? `${member.titulo} ` : ''}{member.nome}
                        </p>
                        {member.cargo && (
                          <p className="text-xs text-[var(--ink)]/60 whitespace-pre-line leading-relaxed">
                            {member.cargo}
                          </p>
                        )}
                        {member.lattes_url && (
                          <a
                            href={member.lattes_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono text-[var(--ink)]/30 hover:text-[var(--brand-blue)] transition mt-2 block"
                          >
                            Lattes ↗
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}