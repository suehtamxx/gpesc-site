import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const BRAND = {
  yellow: 'var(--brand-yellow)',
  red: 'var(--brand-red)',
  blue: 'var(--brand-blue)',
  green: 'var(--brand-green)',
};

const publicacoes = [
  {
    titulo: 'Hospitalizações por COVID-19 entre indivíduos com doenças cardiovasculares e sua relação com indicadores de equidade',
    autores: 'Ruan Silva, Eduardo Lima, Danilla Silva, Ana Roberta Silva, Edina Oliveira, Laura Formiga, Rurrão Carvalho (2024). Rev Rene, 25, e93109.',
    doi: 'https://doi.org/10.15253/2175-6783.20242503109',
    accentColor: BRAND.red,
  },
  {
    titulo: 'Fatores interferentes na reposição de vitamina D e cálcio em idosos: Inquérito domiciliar',
    autores: 'Maísa Claro, Paloma Moura, Aline Ibiapina, Luís Eduardo Santos, Danilla Silva, Laura Formiga (2024). Revista Contexto & Saúde, 24(48), e14068.',
    doi: 'https://doi.org/10.21527/2176-7114.2024.48.14068',
    accentColor: BRAND.blue,
  },
  {
    titulo: 'ESQUADA e sua correlação com os marcadores de alimentação em inquérito de saúde: Evidências de validade',
    autores: 'Danilla Silva, Thanise Santos, Betzabeth Slater (2024). Revista Contexto & Saúde, 24(48), e14141.',
    doi: 'https://doi.org/10.21527/2176-7114.2024.48.14141',
    accentColor: BRAND.green,
  },
  {
    titulo: 'Avaliação da exposição solar e hábitos de vida associados aos níveis séricos de 25 (OH) D em adultos',
    autores: 'Marcos Silva, Estela Jesus, Marta Cordeiro, Ivanildo Costa Júnior, Danilla Silva, Lorena Miranda, Ciara Beleza, Laura Formiga (2024). CONTRIBUCIONES A LAS CIENCIAS SOCIALES, 17(10), e11730.',
    doi: 'https://doi.org/10.55905/revconv17n-10-238',
    accentColor: BRAND.yellow,
  },
  {
    titulo: 'Caracterização entre variáveis sociodemográficas e prática de atividade física entre adultos',
    autores: 'Francisca Silva, Nahada Leal, Paloma Moura, Érika Moura, Danilla Silva, Luís Eduardo Santos, Ana Klisse Araújo, Laura Formiga (2024). Revista de APS, 26, 01-13.',
    doi: 'https://doi.org/10.34019/1809-8363.2023.v26.38247/8',
    accentColor: BRAND.red,
  },
  {
    titulo: 'Quedas em idosos: Inquérito de saúde domiciliar',
    autores: 'Érika Moura, Francisca Pereira, Paloma Moura, Lorena Feitosa, Loislâyme Leal, Onged Cirino, Edina Rodrigues, Laura Formiga (2023). FOCO (Faculdade Novo Milênio), 16(6), 1-16.',
    doi: 'https://doi.org/10.54751/revistafoco.v16n6-051',
    accentColor: BRAND.blue,
  },
  {
    titulo: 'Prevalência de doenças crônicas não transmissíveis e fatores relacionados à hipertensão arterial em idosos: Inquérito domiciliar em Picos, Piauí',
    autores: 'Daniel Martírios, Thaísa Gonçalves, Maísa Laise Leal, Maísa Claro, Nahada Leal, Ana Paula Silva, Ana Klisse Araújo, Solane Moura, Ingred Cirino, Loislâyme Leal, Danilla Silva, Laura Formiga...',
    doi: '#',
    accentColor: BRAND.green,
  },
];

export default function PublicacoesPage() {
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

            <div className="flex gap-6 text-xs font-mono text-[var(--ink)]/40 mt-4 ml-10">
              <span>Publicado: 25/02/2025</span>
              <span>Atualizado: 14/12/2025</span>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="space-y-4">
            {publicacoes.map((pub, index) => (
              <article
                key={index}
                className="group flex gap-0 rounded-2xl border border-[var(--ink)]/10 overflow-hidden hover:-translate-y-0.5 transition-transform"
              >
                {/* Left accent */}
                <div className="w-1 shrink-0" style={{ background: pub.accentColor }} />

                <div className="flex-1 p-5 md:p-6">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs text-[var(--ink)]/30 mt-1 shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      {pub.doi && pub.doi !== '#' ? (
                        <a
                          href={pub.doi}
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
                      <p className="text-sm text-[var(--ink)]/55 leading-relaxed">{pub.autores}</p>
                      {pub.doi && pub.doi !== '#' && (
                        <a
                          href={pub.doi}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-[var(--ink)]/30 hover:text-[var(--brand-blue)] transition mt-2 block break-all"
                        >
                          {pub.doi}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
