import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const teamMembers = [
  {
    name: 'Danilla Michelle Costa e Silva',
    role: 'Coordenadora do ObsESP\nDocente de Nutrição (CSHNB/UFPI)\nDoutora em Ciências (PPGNSP-FSP/USP)',
    image: null, // TODO: adicionar foto
  },
  {
    name: 'Edina Araújo Rodrigues Oliveira',
    role: 'Coordenadora Ajunta do ObsESP\nDocente de Enfermagem (CSHNB/UFPI)\nDoutora em Ciências (PPGNSP-FSP/USP)',
    image: null,
  },
  {
    name: 'Laura Maria Feitosa Formiga',
    role: 'Docente de Enfermagem (CSHNB/UFPI)\nDoutora em Ciências (PPGNSP-FSP/USP)',
    image: null,
  },
  {
    name: 'Membro 4',
    role: 'Cargo / Instituição',
    image: null,
  },
  {
    name: 'Membro 5',
    role: 'Cargo / Instituição',
    image: null,
  },
  {
    name: 'Membro 6',
    role: 'Cargo / Instituição',
    image: null,
  },
];

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans flex flex-col">
      <Header />

      <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-blue-700">🏠 ObsESP</a>
          <span className="mx-2">›</span>
          <span className="text-gray-700">Quem Somos ObsESP</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Quem Somos ObsESP</h1>

        {/* Datas */}
        <div className="flex gap-8 text-sm text-gray-500 border-t border-b border-gray-200 py-3 mb-8">
          <span>Publicado: 20/01/2025 11:04</span>
          <span>Atualização mais recente: 14/02/2025 07:49</span>
        </div>

        {/* Logo centralizada */}
        <div className="flex justify-center mb-8">
          {/* TODO: substituir pelo logo real do ObsESP */}
          <div className="w-48 h-32 bg-gray-100 border border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 text-sm">
            Logo ObsESP
          </div>
        </div>

        {/* Texto institucional */}
        <div className="text-gray-700 leading-relaxed space-y-4 text-justify">
          <p>
            O Observatório de Epidemiologia e Saúde Pública (ObsESP) da Universidade Federal do Piauí (UFPI) é uma iniciativa
            conjunta de docentes Doutores em Ciências, formados pela Faculdade de Saúde Pública da Universidade de São Paulo
            (FSP/USP), participantes do projeto de Doutorado Interinstitucional (DINTER) Nutrição em Saúde Pública 2015/2019.
          </p>
          <p>
            Foi idealizado em 2021 como maneira de dar seguimento às atividades de pesquisa e vigilância epidemiológica em
            níveis local, regional e nacional. Os pesquisadores idealizadores coordenaram o &ldquo;Inquérito de saúde de base
            populacional nos municípios de Teresina e Picos (PI) (ISAD-PI)&rdquo;, um inquérito pioneiro no estado do Piauí,
            executado pela UFPI em parceria com a FSP/USP, que objetivou analisar as condições de vida e saúde da população
            residente nas duas cidades piauienses.
          </p>
        </div>

        {/* Divider */}
        <hr className="my-10 border-gray-200" />

        {/* Equipe Editorial */}
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-6">Equipe editorial</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                {/* Foto */}
                <div className="w-40 h-44 bg-gray-100 border border-dashed border-gray-300 rounded overflow-hidden mb-3 flex items-center justify-center text-gray-400 text-xs">
                  {/* TODO: substituir por <Image> com a foto real */}
                  Foto
                </div>
                {/* Nome e cargo */}
                <p className="font-bold text-gray-800 text-sm">{member.name}</p>
                <p className="text-gray-600 text-xs mt-1 whitespace-pre-line leading-relaxed">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}