import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/Header/Card';
import { HeroSection } from '@/components/Header/HeroSection';

const IconQuemSomos = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" className="w-14 h-14">
    <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM609.3 512l-137.8 0c5.4-9.4 8.6-20.3 8.6-32l0-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2l61.4 0C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
  </svg>
);

const IconProgramas = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-14 h-14">
    <path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z" />
  </svg>
);

const IconBoletins = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" className="w-12 h-12">
    <path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM80 64l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L80 96c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm16 96l192 0c8.8 0 16 7.2 16 16l0 128c0 8.8-7.2 16-16 16L96 384c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm0 32l0 96 192 0 0-96L96 256z" />
  </svg>
);

const IconPublicacoes = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" className="w-14 h-14">
    <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM288 368a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm211.3-43.3c-6.2-6.2-16.4-6.2-22.6 0L416 385.4l-28.7-28.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l40 40c6.2 6.2 16.4 6.2 22.6 0l72-72c6.2-6.2 6.2-16.4 0-22.6z" />
  </svg>
);

const IconNoticias = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-14 h-14">
    <path d="M96 96c0-35.3 28.7-64 64-64L512 32c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64l-352 0c-35.3 0-64-28.7-64-64L96 96zM0 120c0-13.3 10.7-24 24-24s24 10.7 24 24l0 304c0 35.3 28.7 64 64 64l368 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L112 512C50.1 512 0 461.9 0 400L0 120zM224 208c0-8.8 7.2-16 16-16l224 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-224 0c-8.8 0-16-7.2-16-16zm16 80l224 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-224 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 80l224 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-224 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zM160 200a40 40 0 1 1 80 0 40 40 0 1 1 -80 0z" />
  </svg>
);

const IconLinks = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" className="w-14 h-14">
    <path d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3l0-84.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 11.2 66 30 91.5L254.4 344c-1.7-12.7-2.4-25.7-2.4-39c0-60.2 21.4-115.4 56.9-158.5L264 128.7c-34.1 14.4-61.1 41.5-55.6 67.7zM80 352l-48 0c-26.5 0-32 32-32 32L0 480c0 17.7 14.3 32 32 32l96 0 0-160c0 0 0 0 0 0L80 352zm368 0c0 0 0 0 0 0l0 160 96 0c17.7 0 32-14.3 32-32l0-96c0 0-5.5-32-32-32l-48 0-48 0zm32-48c19.6-25.5 31.2-57.5 31.2-92 0-42-17.2-80-45.1-107.6L421.5 152c16.3 19.1 26.5 43.8 26.5 71 0 60.7-49.3 110-110 110-60.7 0-110-49.3-110-110 0-27.2 10.2-52 26.5-71L209.7 104.4C181.8 132 164.7 170 164.7 212c0 34.5 11.6 66.5 31.2 92l-67.4 0c-2.4-14-3.5-28.4-3.5-43.3C125 159 185 96 260.4 88l91.2 0C427 96 487 159 487 260.7c0 14.9-1.1 29.3-3.5 43.3l-3.5 0-48 0z" />
  </svg>
);

const IconContato = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-12 h-12">
    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
  </svg>
);

export default function Home() {
  const sections = [
    { icon: <IconQuemSomos />, title: 'QUEM SOMOS', href: '/sobre' },
    { icon: <IconProgramas />, title: 'PROGRAMAS E PROJETOS', href: '/programas-projetos' },
    { icon: <IconBoletins />, title: 'BOLETINS', href: '/boletins' },
    { icon: <IconPublicacoes />, title: 'OUTRAS PUBLICAÇÕES', href: '/publicacoes' },
    { icon: <IconNoticias />, title: 'NOTÍCIAS', href: '/noticias' },
    { icon: <IconLinks />, title: 'LINKS ÚTEIS', href: '/links-uteis' },
    { icon: <IconContato />, title: 'CONTATO', href: '/contato' },
  ];

  const firstRow = sections.slice(0, 4);
  const secondRow = sections.slice(4);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section com Logo e Descrição */}
        <HeroSection
          title="ObsESP"
          subtitle="Observatório de Epidemiologia e Saúde Pública"
        >
          <p className="text-gray-600 max-w-3xl">
            Iniciativa conjunta de docentes Doutores em Ciências para acompanhar atividades de pesquisa
            e vigilância epidemiológica em níveis local, regional e nacional.
          </p>
        </HeroSection>

        {/* Grade de Cards */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          {/* Primeira linha: 4 cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {firstRow.map((section) => (
              <Card
                key={section.href}
                icon={section.icon}
                title={section.title}
                href={section.href}
              />
            ))}
          </div>
          {/* Segunda linha: 3 cards centralizados */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-center">
            {secondRow.map((section) => (
              <Card
                key={section.href}
                icon={section.icon}
                title={section.title}
                href={section.href}
              />
            ))}
          </div>
        </section>

        {/* Últimas Publicações */}
        <section className="max-w-6xl mx-auto px-4 py-12 border-t border-gray-200 mt-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Artigos Recentes</h2>
            <a href="/publicacoes" className="text-blue-700 hover:text-blue-900 text-sm font-semibold">Ver todos →</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <article key={i} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">Vol. 1 • Num. 1 • 2026</span>
                <h3 className="text-xl font-bold text-gray-900 mt-3 mb-3">Impacto das Estratégias Nutricionais na Recuperação Muscular</h3>
                <p className="text-gray-600 text-sm mb-4">Este estudo analisa os efeitos de diferentes abordagens dietéticas no pós-treino, destacando a síntese proteica...</p>
                <a href="#" className="text-blue-800 font-semibold hover:text-blue-600 transition">Ler artigo →</a>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}