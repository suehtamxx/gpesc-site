import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

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
  },
  {
    titulo: 'Ações educativas para promoção de hábitos de vida saudável em escolares',
    coordenador: 'Prof.ª Edina Araújo Rodrigues Oliveira',
    vigencia: '01/01/2025 a 31/12/2026',
    descricao: `O presente projeto tem como proposta divulgar informações baseadas em evidências científicas, por meio de uma abordagem multiprofissional, sobre hábitos de vida saudável em crianças. Para tanto, pretende-se promover ações educativas a partir de dados epidemiológicos oriundos do "Inquérito de saúde de base populacional nos municípios de Teresina e Picos, no Piauí (ISAD-PI)", visando fortalecer a atenção à saúde infantil.`,
    cursos: [],
  },
];

export default function ProgramasProjetosPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans flex flex-col">
      <Header />

      <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-blue-700">🏠 ObsESP</a>
          <span className="mx-2">›</span>
          <span className="text-gray-700">Programas e Projetos ObsESP</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Programas e Projetos Obsesp</h1>

        {/* Datas */}
        <div className="flex gap-8 text-sm text-gray-500 border-t border-b border-gray-200 py-3 mb-10">
          <span>Publicado: 25/02/2025 15:56</span>
          <span>Atualização mais recente: 29/04/2025 08:54</span>
        </div>

        {/* Lista de projetos */}
        <div className="space-y-12">
          {projetos.map((projeto, index) => (
            <article key={index} className="border-b border-gray-100 pb-10">
              {/* Título do projeto */}
              <h2 className="text-base font-bold text-blue-700 mb-3">{projeto.titulo}</h2>

              {/* Coordenador */}
              <p className="text-sm font-bold text-gray-800 mb-1">
                COORDENADOR(A): Prof.ª {projeto.coordenador}
              </p>

              {/* Vigência */}
              <p className="text-sm font-bold text-gray-800 mb-4">
                VIGÊNCIA: {projeto.vigencia}.
              </p>

              {/* Descrição */}
              <p className="text-sm text-gray-700 leading-relaxed text-justify mb-5">
                {projeto.descricao}
              </p>

              {/* Cursos e eventos */}
              {projeto.cursos.length > 0 && (
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-2">CURSO E/OU EVENTOS REALIZADOS:</p>
                  <ul className="list-disc list-inside space-y-3">
                    {projeto.cursos.map((curso, ci) => (
                      <li key={ci} className="text-sm text-gray-700 leading-relaxed">
                        {curso.nome}
                        <br />
                        <span className="font-semibold">Previsão de realização: {curso.previsao}.</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
