import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const BRAND = {
  yellow: 'var(--brand-yellow)',
  red: 'var(--brand-red)',
  blue: 'var(--brand-blue)',
  green: 'var(--brand-green)',
};

const boletins = [
  {
    ano: '2025',
    itens: [
      {
        titulo: 'Boletim Epidemiológico, Vol. 1, No 1, Jan-Mar, 2025',
        subtitulo: 'Estado Nutricional de Idosos residentes nas cidades de Teresina e Picos no Piauí',
        autores:
          'Layanne Cristina de Carvalho Lavôr, Artemizia Francisca de Sousa, Danilla Michelle Costa e Silva, Edina Araújo Rodrigues Oliveira, Laura Maria Feitosa Formiga, Rumão Batista Nunes de Carvalho, Karoline de Macêdo Gonçalves Frota.',
        resumo: `Em todo o mundo, são notáveis o envelhecimento populacional e a transição epidemiológica e nutricional, com aumento dos problemas relacionados ao excesso de peso. Desse modo, no Boletim "Estado Nutricional de idosos residentes nas cidades de Teresina e Picos no Piauí" são apresentados os dados do estado nutricional de idosos (60 anos ou mais de idade) que participaram do Inquérito de Saúde Domiciliar no Piauí (ISAD-PI). O estado nutricional foi determinado calculando-se o Índice de Massa Corporal (IMC), que avalia a proporção de peso pela altura do indivíduo (peso em quilogramas dividido pelo quadrado da altura em metros).`,
        link: '#',
        linkLabel: 'Boletim_2025_1',
        accentColor: BRAND.blue,
        tag: '03 · 2025 · Vol.1 Nº1',
      },
      {
        titulo: 'Boletim Epidemiológico, Vol. 1, No 2, Abr-Jun, 2025',
        subtitulo: 'Atendimento Nutricional em Unidades Básicas de Saúde de Picos: pacientes hipertensos e diabéticos',
        autores:
          'Danilla Michelle Costa e Silva, Edina Araújo Rodrigues Oliveira, Laura Maria Feitosa Formiga, Rumão Batista Nunes de Carvalho, Estela Edileusa de Jesus, Izamara Lima Portela, Vitória...',
        resumo: '',
        link: '#',
        linkLabel: 'Boletim_2025_2',
        accentColor: BRAND.green,
        tag: '03 · 2025 · Vol.1 Nº2',
      },
    ],
  },
];

export default function BoletinsPage() {
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
                style={{ background: BRAND.blue }}
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

            <div className="flex gap-6 text-xs font-mono text-[var(--ink)]/40 mt-4 ml-10">
              <span>Publicado: 20/01/2025</span>
              <span>Atualizado: 19/03/2026</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-6 py-16">
          {boletins.map((grupo) => (
            <section key={grupo.ano} className="mb-16">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px flex-1 bg-[var(--ink)]/10" />
                <span
                  className="font-mono text-xs px-3 py-1 rounded"
                  style={{ background: BRAND.blue, color: 'white' }}
                >
                  {grupo.ano}
                </span>
                <div className="h-px flex-1 bg-[var(--ink)]/10" />
              </div>

              <div className="space-y-8">
                {grupo.itens.map((boletim, index) => (
                  <article
                    key={index}
                    className="group relative rounded-2xl border border-[var(--ink)]/10 overflow-hidden hover:-translate-y-0.5 transition-transform"
                  >
                    {/* Top accent bar */}
                    <div className="h-1" style={{ background: boletim.accentColor }} />

                    <div className="p-6 md:p-8">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <span className="font-mono text-xs text-[var(--ink)]/40">{boletim.tag}</span>
                        <a
                          href={boletim.link}
                          className="text-xs font-mono px-3 py-1 rounded-full border border-[var(--ink)]/15 hover:border-[var(--ink)] transition"
                        >
                          {boletim.linkLabel} ↗
                        </a>
                      </div>

                      {/* Título */}
                      <a href={boletim.link}>
                        <h2
                          className="text-xl md:text-2xl font-semibold tracking-tight leading-tight mb-2 hover:opacity-70 transition"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {boletim.titulo}
                        </h2>
                      </a>

                      {/* Subtítulo */}
                      <p className="text-base text-[var(--ink)]/70 mb-4 leading-snug">{boletim.subtitulo}</p>

                      {/* Autores */}
                      <p className="text-sm text-[var(--ink)]/50 leading-relaxed mb-4">{boletim.autores}</p>

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
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
