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
    categoria: 'Produção Hospitalar (SIH/SUS)',
    accentColor: BRAND.blue,
    links: [
      {
        label: 'Dados Consolidados AIH (RD) — por local de internação',
        url: 'http://tabnet.datasus.gov.br/cgi/tabcgi.exe?sih/cnv/qipi.def',
        desc: 'A partir de 2008',
      },
      {
        label: 'Dados Consolidados AIH (RD) — por local de residência',
        url: 'http://tabnet.datasus.gov.br/cgi/deftohtm.exe?sih/cnv/qrpi.def',
        desc: 'A partir de 2008',
      },
    ],
  },
  {
    categoria: 'Produção Ambulatorial (SIA/SUS)',
    accentColor: BRAND.green,
    links: [
      {
        label: 'Por local de atendimento',
        url: 'http://tabnet.datasus.gov.br/cgi/deftohtm.exe?sia/cnv/qapi.def',
        desc: 'A partir de 2008',
      },
      {
        label: 'Por local de residência',
        url: 'http://tabnet.datasus.gov.br/cgi/deftohtm.exe?sia/cnv/qbpi.def',
        desc: 'A partir de 2008',
      },
    ],
  },
  {
    categoria: 'Imunizações',
    accentColor: BRAND.yellow,
    links: [
      {
        label: 'Doses Aplicadas — Brasil',
        url: 'http://tabnet.datasus.gov.br/cgi/dhdat.exe?bd_pni/dpnibr.def',
        desc: 'Programa Nacional de Imunizações (PNI)',
      },
      {
        label: 'Cobertura Vacinal — Brasil',
        url: 'http://tabnet.datasus.gov.br/cgi/dhdat.exe?bd_pni/cpnibr.def',
        desc: 'Programa Nacional de Imunizações (PNI)',
      },
    ],
  },
  {
    categoria: 'Agravos e Doenças (SINAN)',
    accentColor: BRAND.red,
    links: [
      {
        label: 'Casos de Hanseníase',
        url: 'http://tabnet.datasus.gov.br/cgi/tabcgi.exe?sinannet/cnv/hanswpi.def',
        desc: 'Desde 2001 — Sistema de Informação de Agravos de Notificação',
      },
      {
        label: 'Casos de Tuberculose',
        url: 'http://tabnet.datasus.gov.br/cgi/tabcgi.exe?sinannet/cnv/tubercpi.def',
        desc: 'Desde 2001 — Sistema de Informação de Agravos de Notificação',
      },
    ],
  },
  {
    categoria: 'Nutrição, Nascimentos e Mortalidade',
    accentColor: BRAND.blue,
    links: [
      {
        label: 'Estado Nutricional (SISVAN)',
        url: 'https://sisaps.saude.gov.br/sisvan/relatoriopublico/index',
        desc: 'Sistema de Vigilância Alimentar e Nutricional',
      },
      {
        label: 'Nascidos Vivos (SINASC)',
        url: 'http://tabnet.datasus.gov.br/cgi/deftohtm.exe?sinasc/cnv/nvpi.def',
        desc: 'Desde 1994',
      },
      {
        label: 'Mortalidade — CID-10',
        url: 'http://tabnet.datasus.gov.br/cgi/deftohtm.exe?sim/cnv/obt10pi.def',
        desc: 'Desde 1996 — geral',
      },
      {
        label: 'População Residente',
        url: 'https://datasus.saude.gov.br/populacao-residente',
        desc: 'DataSUS — estimativas populacionais',
      },
    ],
  },
  {
    categoria: 'Inquéritos e Vigilância',
    accentColor: BRAND.green,
    links: [
      {
        label: 'PNS — Pesquisa Nacional de Saúde',
        url: 'https://www.ibge.gov.br/estatisticas/sociais/saude/9160-pesquisa-nacional-de-saude.html?=&t=o-que-e',
        desc: 'IBGE — dados sobre condições de saúde da população brasileira',
      },
      {
        label: 'Vigitel',
        url: 'https://svs.aids.gov.br/download/Vigitel/',
        desc: 'Vigilância de Fatores de Risco e Proteção para Doenças Crônicas por Inquérito Telefônico',
      },
      {
        label: 'SISAB — Atenção Básica',
        url: 'https://sisab.saude.gov.br/paginas/acessoRestrito/relatorio/federal/saude/RelSauProducao.xhtml',
        desc: 'Sistema de Informação em Saúde para a Atenção Básica',
      },
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
              <span>Bases de dados, sistemas e inquéritos de saúde pública</span>
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
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className="font-semibold text-sm leading-snug"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {link.label}
                      </span>
                      <span className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition text-lg shrink-0">↗</span>
                    </div>
                    <p className="text-xs text-[var(--ink)]/55 leading-snug">{link.desc}</p>
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