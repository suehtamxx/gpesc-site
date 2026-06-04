import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const publicacoes = [
  {
    titulo: 'Hospitalizações por COVID-19 entre indivíduos com doenças cardiovasculares e sua relação com indicadores de equidade',
    autores: 'Ruan Silva, Eduardo Lima, Danilla Silva, Ana Roberta Silva, Edina Oliveira, Laura Formiga, Rurrão Carvalho (2024). Hospitalizações por COVID-19 entre indivíduos com doenças cardiovasculares e sua relação com indicadores de equidade. Rev Rene, 25, e93109.',
    doi: 'https://doi.org/10.15253/2175-6783.20242503109',
  },
  {
    titulo: 'Fatores interferentes na reposição de vitamina D e cálcio em idosos: Inquérito domiciliar',
    autores: 'Maísa Claro, Paloma Moura, Aline Ibiapina, Luís Eduardo Santos, Danilla Silva, Laura Formiga (2024). Fatores interferentes na reposição de vitamina D e cálcio em idosos: Inquérito domiciliar. Revista Contexto & Saúde, 24(48), e14068.',
    doi: 'https://doi.org/10.21527/2176-7114.2024.48.14068',
  },
  {
    titulo: 'ESQUADA e sua correlação com os marcadores de alimentação em inquérito de saúde: Evidências de validade',
    autores: 'Danilla Silva, Thanise Santos, Betzabeth Slater (2024). ESQUADA e sua correlação com os marcadores de alimentação em inquérito de saúde: Evidências de validade. Revista Contexto & Saúde, 24(48), e14141.',
    doi: 'https://doi.org/10.21527/2176-7114.2024.48.14141',
  },
  {
    titulo: 'Avaliação da exposição solar e hábitos de vida associados aos níveis séricos de 25 (OH) D em adultos',
    autores: 'Marcos Silva, Estela Jesus, Marta Cordeiro, Ivanildo Costa Júnior, Danilla Silva, Lorena Miranda, Ciara Beleza, Laura Formiga (2024). Avaliação da exposição solar e hábitos de vida associados aos níveis séricos de 25 (OH) D em adultos. CONTRIBUCIONES A LAS CIENCIAS SOCIALES, 17(10), e11730.',
    doi: 'https://doi.org/10.55905/revconv17n-10-238',
  },
  {
    titulo: 'Caracterização entre variáveis sociodemográficas e prática de atividade física entre adultos',
    autores: 'Francisca Silva, Nahada Leal, Paloma Moura, Érika Moura, Danilla Silva, Luís Eduardo Santos, Ana Klisse Araújo, Laura Formiga (2024). Caracterização entre variáveis sociodemográficas e prática de atividade física entre adultos. Revista de APS, 26, 01-13.',
    doi: 'https://doi.org/10.34019/1809-8363.2023.v26.38247/8',
  },
  {
    titulo: 'Quedas em idosos: Inquérito de saúde domiciliar',
    autores: 'Érika Moura, Francisca Pereira, Paloma Moura, Lorena Feitosa, Loislâyme Leal, Onged Cirino, Edina Rodrigues, Laura Formiga (2023). Quedas em idosos: Inquérito de saúde domiciliar. FOCO (Faculdade Novo Milênio), 16(6), 1-16.',
    doi: 'https://doi.org/10.54751/revistafoco.v16n6-051',
  },
  {
    titulo: 'Prevalência de doenças crônicas não transmissíveis e fatores relacionados à hipertensão arterial em idosos: Inquérito domiciliar em Picos, Piauí',
    autores: 'Daniel Martírios, Thaísa Gonçalves, Maísa Laise Leal, Maísa Claro, Nahada Leal, Ana Paula Silva, Ana Klisse Araújo, Solane Moura, Ingred Cirino, Loislâyme Leal, Danilla Silva, Laura Formica...',
    doi: '#',
  },
];

export default function PublicacoesPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans flex flex-col">
      <Header />

      <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-blue-700">🏠 ObsESP</a>
          <span className="mx-2">›</span>
          <span className="text-gray-700">Outras Publicações ObsESP</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Outras Publicações ObsESP</h1>

        {/* Datas */}
        <div className="flex gap-8 text-sm text-gray-500 border-t border-b border-gray-200 py-3 mb-10">
          <span>Publicado: 25/02/2025 15:58</span>
          <span>Atualização mais recente: 14/12/2025 22:05</span>
        </div>

        {/* Lista de publicações */}
        <div className="space-y-6">
          {publicacoes.map((pub, index) => (
            <article key={index} className="pb-6 border-b border-gray-100">
              {/* Título clicável */}
              <a
                href={pub.doi !== '#' ? pub.doi : undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 font-semibold hover:underline text-sm leading-snug block mb-2"
              >
                {pub.titulo}
              </a>

              {/* Autores e referência */}
              <p className="text-sm text-gray-700 leading-relaxed">
                {pub.autores}{' '}
                {pub.doi && pub.doi !== '#' && (
                  <a
                    href={pub.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {pub.doi}
                  </a>
                )}
              </p>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
