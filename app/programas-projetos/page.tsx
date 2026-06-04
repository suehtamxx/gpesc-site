import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const BRAND = {
  yellow: 'var(--brand-yellow)',
  red: 'var(--brand-red)',
  blue: 'var(--brand-blue)',
  green: 'var(--brand-green)',
};

const projetos = [
  {
    titulo: 'Exposição de fatores epidemiológicos que influenciam na saúde de adultos e idosos',
    coordenador: 'Prof.ª Laura Maria Feitosa Formiga.',
    vigencia: '01/01/2025 a 31/12/2026',
    descricao: `Este projeto tem como foco realizar ações de divulgação de dados epidemiológicos das condições de saúde da população adulta e idosa do estado do Piauí. Esse público apresenta vulnerabilidade para o desenvolvimento de doenças crônicas, tornando essencial a disseminação de informações sobre aspectos clínicos, antropométricos, estilo de vida e ingestão alimentar. O foco é fornecer orientações adequadas e encaminhar, quando necessário, a profissionais especializados, contribuindo para a prevenção de riscos e complicações.`,
    cursos: [
      {
        nome: 'Atividade de extensão: Produção de folder educativo para os adultos e idosos sobre a prática de atividades saudáveis. Destinado ao corpo discente e docente do CSHNB/UFPI, aos adultos, idosos e profissionais da saúde do município de Picos-PI.',
        previsao: '2023',
      },
      {
        nome: 'Curso de extensão: "Doenças crônicas na fase adulta e terceira idade". Destinado aos profissionais da área de saúde, ao corpo docente e discente dos cursos da área de saúde do CSHNB/UFPI e de outras instituições de ensino.',
        previsao: '2026',
      },
    ],
    accentColor: BRAND.red,
    tag: '02',
  },
  {
    titulo: 'Ações educativas para promoção de hábitos de vida saudável em escolares',
    coordenador: 'Prof.ª Edina Araújo Rodrigues Oliveira',
    vigencia: '01/01/2025 a 31/12/2026',
    descricao: `O presente projeto tem como proposta divulgar informações baseadas em evidências científicas, por meio de uma abordagem multiprofissional, sobre hábitos de vida saudável em crianças. Para tanto, pretende-se promover ações educativas a partir de dados epidemiológicos oriundos do "Inquérito de saúde de base populacional nos municípios de Teresina e Picos, no Piauí (ISAD-PI)", visando fortalecer a atenção à saúde infantil.`,
    cursos: [],
    accentColor: BRAND.green,
    tag: '02',
  },
];

export default function ProgramasProjetosPage() {
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
              <span className="text-[var(--ink)]">Programas e Projetos</span>
            </nav>

            <div className="flex items-start gap-4">
              <span
                className="font-mono text-xs mt-1.5 px-2 py-0.5 rounded text-white"
                style={{ background: BRAND.red }}
              >
                02
              </span>
              <h1
                className="text-[clamp(2rem,5vw,3.5rem)] leading-[1] font-semibold tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Programas e Projetos
              </h1>
            </div>

            <div className="flex gap-6 text-xs font-mono text-[var(--ink)]/40 mt-4 ml-10">
              <span>Publicado: 25/02/2025</span>
              <span>Atualizado: 29/04/2025</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-6 py-16 space-y-8">
          {projetos.map((projeto, index) => (
            <article
              key={index}
              className="rounded-2xl border border-[var(--ink)]/10 overflow-hidden hover:-translate-y-0.5 transition-transform"
            >
              {/* Top accent bar */}
              <div className="h-1" style={{ background: projeto.accentColor }} />

              <div className="p-6 md:p-8">
                {/* Número + Título */}
                <div className="flex items-start gap-3 mb-4">
                  <span className="font-mono text-xs text-[var(--ink)]/30 mt-1.5 shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2
                    className="text-xl md:text-2xl font-semibold tracking-tight leading-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {projeto.titulo}
                  </h2>
                </div>

                {/* Metadados */}
                <div className="flex flex-wrap gap-4 mb-5 ml-7">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--ink)]/50">
                    <span style={{ color: projeto.accentColor }}>●</span>
                    COORD.: {projeto.coordenador}
                  </span>
                  <span className="text-xs font-mono text-[var(--ink)]/50">
                    VIGÊNCIA: {projeto.vigencia}
                  </span>
                </div>

                {/* Descrição */}
                <p className="text-sm md:text-base text-[var(--ink)]/70 leading-relaxed mb-6 ml-7">
                  {projeto.descricao}
                </p>

                {/* Cursos e eventos */}
                {projeto.cursos.length > 0 && (
                  <div className="ml-7 pt-5 border-t border-[var(--ink)]/10">
                    <p className="text-xs font-mono uppercase tracking-[0.15em] text-[var(--ink)]/40 mb-4">
                      Cursos e eventos realizados
                    </p>
                    <ul className="space-y-4">
                      {projeto.cursos.map((curso, ci) => (
                        <li
                          key={ci}
                          className="flex gap-3 text-sm text-[var(--ink)]/70 leading-relaxed"
                        >
                          <span className="shrink-0 mt-0.5 font-mono text-[var(--ink)]/30">
                            {String(ci + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <span>{curso.nome}</span>
                            <br />
                            <span className="text-xs font-mono text-[var(--ink)]/50 mt-1 block">
                              Previsão de realização: {curso.previsao}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
