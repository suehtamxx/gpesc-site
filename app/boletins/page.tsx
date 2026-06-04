import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const boletins = [
  {
    ano: '2025',
    itens: [
      {
        titulo: 'Boletim Epidemiológico, Vol. 1, No 1, Jan-Mar, 2025',
        subtitulo: 'Estado Nutricional de Idosos residentes nas cidades de Teresina e Picos no Piauí',
        autores: 'Layanne Cristina de Carvalho Lavôr, Artemizia Francisca de Sousa, Danilla Michelle Costa e Silva, Edina Araújo Rodrigues Oliveira, Laura Maria Feitosa Formiga, Rumão Batista Nunes de Carvalho, Karoline de Macêdo Gonçalves Frota.',
        resumo: `Em todo o mundo, são notáveis o envelhecimento populacional e a transição epidemiológica e nutricional, com aumento dos problemas relacionados ao excesso de peso. Desse modo, no Boletim "Estado Nutricional de idosos residentes nas cidades de Teresina e Picos no Piauí" são apresentados os dados do estado nutricional de idosos (60 anos ou mais de idade) que participaram do Inquérito de Saúde Domiciliar no Piauí (ISAD-PI). O estado nutricional foi determinado calculando-se o Índice de Massa Corporal (IMC), que avalia a proporção de peso pela altura do indivíduo (peso em quilogramas dividido pelo quadrado da altura em metros).`,
        link: '#', // TODO: link para o PDF do boletim
        linkLabel: 'Boletim_2025_1',
      },
      {
        titulo: 'Boletim Epidemiológico, Vol. 1, No 2, Abr-Jun, 2025',
        subtitulo: 'Atendimento Nutricional em Unidades Básicas de Saúde de Picos: pacientes hipertensos e diabéticos',
        autores: 'Danilla Michelle Costa e Silva, Edina Araújo Rodrigues Oliveira, Laura Maria Feitosa Formiga, Rumão Batista Nunes de Carvalho, Estela Edileusa de Jesus, Izamara Lima Portela, Vitória...',
        resumo: '', // TODO: preencher resumo
        link: '#',
        linkLabel: 'Boletim_2025_2',
      },
    ],
  },
];

export default function BoletinsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans flex flex-col">
      <Header />

      <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-10">
        {/* Datas */}
        <div className="flex gap-8 text-sm text-gray-500 border-b border-gray-200 py-3 mb-10">
          <span>Publicado: 20/01/2025 10:26</span>
          <span>Atualização mais recente: 19/03/2026 10:14</span>
        </div>

        {/* Boletins agrupados por ano */}
        {boletins.map((grupo) => (
          <section key={grupo.ano} className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{grupo.ano}</h2>

            <div className="space-y-10">
              {grupo.itens.map((boletim, index) => (
                <article key={index} className="border-b border-gray-100 pb-8">
                  {/* Título do boletim */}
                  <a href={boletim.link} className="text-blue-700 font-semibold hover:underline text-base">
                    {boletim.titulo}
                  </a>

                  {/* Subtítulo / tema */}
                  <p className="text-gray-700 text-sm mt-1 mb-4">{boletim.subtitulo}</p>

                  {/* Autores */}
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {boletim.autores}
                  </p>

                  {/* Resumo */}
                  {boletim.resumo && (
                    <div className="text-sm text-gray-700 leading-relaxed text-justify space-y-3 mb-4">
                      {boletim.resumo.split('\n\n').map((paragrafo, pi) => (
                        <p key={pi} className="indent-8">{paragrafo}</p>
                      ))}
                    </div>
                  )}

                  {/* Link para o PDF */}
                  <p className="text-sm text-gray-700 mb-1">Acesse o boletim completo abaixo:</p>
                  <a href={boletim.link} className="text-blue-700 hover:underline text-sm font-medium">
                    {boletim.linkLabel}
                  </a>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}
