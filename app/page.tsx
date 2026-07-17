import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/Header/Card';
import { HeroSection } from '@/components/Header/HeroSection';

export default function Home() {
  const sections = [
    { icon: '👥', title: 'QUEM SOMOS', href: '/sobre' },
    { icon: '📁', title: 'PROGRAMAS E PROJETOS', href: '/programas-projetos' },
    { icon: '📄', title: 'BOLETINS', href: '/boletins' },
    { icon: '📚', title: 'OUTRAS PUBLICAÇÕES', href: '/publicacoes' },
    { icon: '📰', title: 'NOTÍCIAS', href: '/noticias' },
    { icon: '🔗', title: 'LINKS ÚTEIS', href: '/links-uteis' },
    { icon: '📧', title: 'CONTATO', href: '/contato' },
    { icon: '👔', title: 'EQUIPE EDITORIAL', href: '/equipe' },
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section) => (
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
        <section className="max-w-6xl mx-auto px-4 py-12 border-t border-gray-200 mt-12">
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