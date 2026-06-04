import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const BRAND = {
  yellow: 'var(--brand-yellow)',
  red: 'var(--brand-red)',
  blue: 'var(--brand-blue)',
  green: 'var(--brand-green)',
};

const linksGrupos = [
  {
    categoria: 'Bases de dados',
    accentColor: BRAND.blue,
    links: [
      { label: 'DataSUS', url: 'https://datasus.saude.gov.br/', desc: 'Dados do Sistema Único de Saúde' },
      { label: 'IBGE', url: 'https://www.ibge.gov.br/', desc: 'Instituto Brasileiro de Geografia e Estatística' },
    ],
  },
  {
    categoria: 'Parceiros institucionais',
    accentColor: BRAND.red,
    links: [
      { label: 'FSP/USP', url: 'https://www.fsp.usp.br/', desc: 'Faculdade de Saúde Pública — USP' },
      { label: 'UFPI', url: 'https://www.ufpi.br/', desc: 'Universidade Federal do Piauí' },
    ],
  },
];

export default function LinksUteisPage() {
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
              <span className="text-[var(--ink)]">Links Úteis</span>
            </nav>

            <div className="flex items-start gap-4">
              <span
                className="font-mono text-xs mt-1.5 px-2 py-0.5 rounded border border-[var(--ink)]/15"
                style={{ color: 'var(--ink)' }}
              >
                06
              </span>
              <h1
                className="text-[clamp(2rem,5vw,3.5rem)] leading-[1] font-semibold tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Links Úteis
              </h1>
            </div>

            <div className="flex gap-6 text-xs font-mono text-[var(--ink)]/40 mt-4 ml-10">
              <span>Publicado: 20/01/2025</span>
              <span>Atualizado: 05/02/2025</span>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="mx-auto max-w-7xl px-6 py-16 space-y-12">
          {linksGrupos.map((grupo, gi) => (
            <section key={gi}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: grupo.accentColor }} />
                <h2
                  className="text-lg font-semibold tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {grupo.categoria}
                </h2>
                <div className="h-px flex-1 bg-[var(--ink)]/10" />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {grupo.links.map((link, li) => (
                  <a
                    key={li}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-2 rounded-2xl border border-[var(--ink)]/10 p-5 hover:-translate-y-0.5 transition-transform"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="font-semibold text-base"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {link.label}
                      </span>
                      <span className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition text-lg">↗</span>
                    </div>
                    <p className="text-sm text-[var(--ink)]/55 leading-snug">{link.desc}</p>
                    <div className="h-0.5 rounded-full mt-1" style={{ background: grupo.accentColor }} />
                  </a>
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