import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { createClient } from '@/utils/supabase/server';
import { Membro, COR_PARA_CSS } from '@/utils/supabase/types';

const BRAND = {
    yellow: 'var(--brand-yellow)',
    red: 'var(--brand-red)',
    blue: 'var(--brand-blue)',
    green: 'var(--brand-green)',
};

export default async function SobrePage() {
    const supabase = await createClient();

    const { data } = await supabase
        .from('membros')
        .select('*')
        .eq('ativo', true)
        .order('ordem', { ascending: true });

    const membros: Membro[] = data ?? [];

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
                            <span className="text-[var(--ink)]">Apresentação</span>
                        </nav>

                        <div className="flex items-start gap-4">
                            <span
                                className="font-mono text-xs mt-1.5 px-2 py-0.5 rounded"
                                style={{ background: BRAND.yellow, color: 'var(--ink)' }}
                            >
                                01
                            </span>
                            <h1
                                className="text-[clamp(2rem,5vw,3.5rem)] leading-[1] font-semibold tracking-tight"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                Apresentação
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-12 gap-12">
                    {/* Sidebar accent */}
                    <aside className="md:col-span-3 hidden md:block">
                        <div className="flex h-1.5 mb-6">
                            <div className="flex-1" style={{ background: BRAND.yellow }} />
                            <div className="flex-1" style={{ background: BRAND.red }} />
                            <div className="flex-1" style={{ background: BRAND.blue }} />
                            <div className="flex-1" style={{ background: BRAND.green }} />
                        </div>
                        <span className="text-xs font-mono uppercase tracking-[0.15em] text-[var(--ink)]/40">
                            Sobre o observatório
                        </span>
                    </aside>

                    {/* Main text */}
                    <div className="md:col-span-9 space-y-6 text-base md:text-lg text-[var(--ink)]/80 leading-relaxed">
                        <p>
                            O <strong className="text-[var(--ink)]">Observatório de Epidemiologia e Saúde Pública (ObsESP)</strong> da
                            Universidade Federal do Piauí (UFPI) é uma iniciativa conjunta de docentes Doutores em Ciências, formados
                            pela Faculdade de Saúde Pública da Universidade de São Paulo (FSP/USP), participantes do projeto de
                            Doutorado Interinstitucional (DINTER) Nutrição em Saúde Pública 2015/2019.
                        </p>
                        <p>
                            Foi idealizado em 2021 como maneira de dar seguimento às atividades de pesquisa e vigilância
                            epidemiológica em níveis local, regional e nacional. Os pesquisadores idealizadores coordenaram o
                            "Inquérito de saúde de base populacional nos municípios de Teresina e Picos (PI) (ISAD-PI)",
                            um inquérito pioneiro no estado do Piauí, executado pela UFPI em parceria com a FSP/USP.
                        </p>
                        <p>
                            Objetivo principal é gerenciar o conhecimento científico acerca de temáticas de interesse
                            em saúde pública divulgando-o junto aos diversos atores sociais de modo útil.
                            Sendo os objetivos específicos: organizar informações sobre estudos de interesse da saúde
                            pública para comunicação eficiente de resultados que permitam o intercâmbio de conhecimento,
                            além de auxiliar gestores na tomada de decisão referente à adoção de tecnologias e
                            políticas públicas, utilizar ferramentas de divulgação para enfatizar o caráter público da
                            ciência e do conhecimento científico, com transferência e tradução da informação e interatividade
                            entre público acadêmico e não acadêmico, dar visibilidade à ciência brasileira, se tornando um
                            centro de informação e pesquisa da saúde pública, organizar documentos, referências bibliográficas
                            e outros materiais de interesse à saúde pública, divulgar e organizar eventos e demais atividades
                            que dialoguem com a saúde pública, se constituindo num repositório de experiências e práticas.
                        </p>
                        <p>
                            As ações planejadas são: promover cursos de formação, fóruns de discussão e planejamento com gestores,
                            profissionais da saúde e representantes da comunidade, feiras de exposição de conhecimento e divulgação
                            científicas, desenvolver ações voltadas para a comunidade, publicar boletins informativos com divulgação
                            de dados epidemiológicos, produzir e apresentar relatórios técnicos da situação de saúde da população de
                            Picos-PI aos gestores em saúde, firmar parceria com a Secretaria Estadual de Saúde.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}