'use client';

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const BRAND = {
  yellow: "var(--brand-yellow)",
  red: "var(--brand-red)",
  blue: "var(--brand-blue)",
  green: "var(--brand-green)",
};

const cards = [
  { title: "Quem somos", desc: "Pesquisadores, missão e história do observatório.", tag: "01", color: BRAND.yellow, fg: "var(--ink)", href: "/sobre" },
  { title: "Programas e Projetos", desc: "Linhas de pesquisa ativas, parcerias e inquéritos.", tag: "02", color: BRAND.red, fg: "white", href: "/programas-projetos" },
  { title: "Boletins", desc: "Publicações periódicas com indicadores de saúde.", tag: "03", color: BRAND.blue, fg: "white", href: "/boletins" },
  { title: "Outras publicações", desc: "Artigos, dissertações, relatórios técnicos.", tag: "04", color: BRAND.green, fg: "white", href: "/publicacoes" },
  { title: "Notícias", desc: "Atualizações, eventos e divulgação científica.", tag: "05", color: "var(--ink)", fg: "var(--paper)", href: "/noticias" },
  { title: "Links úteis", desc: "Bases de dados, DataSUS, parceiros.", tag: "06", color: "var(--paper)", fg: "var(--ink)", border: true, href: "/links-uteis" },
];

function Stat({ n, l, color, dark }: { n: string; l: string; color: string; dark?: boolean }) {
  return (
    <div
      className="aspect-square rounded-2xl p-4 flex flex-col justify-between"
      style={{ background: color, color: dark ? "var(--ink)" : "white" }}
    >
      <span className="font-mono text-[10px] uppercase tracking-wider opacity-70">{l}</span>
      <span className="text-xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>{n}</span>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] antialiased">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-20 md:pt-24 md:pb-32">
          <div className="grid md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-8">
              <h1
                className="text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] font-semibold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Observatório de Epidemiologia e Saúde Pública
              </h1>
              <p className="mt-8 max-w-xl text-base md:text-lg text-[var(--ink)]/70 leading-relaxed">
                O ObsESP é uma iniciativa de docentes doutores da UFPI — formados pela FSP/USP — dedicada à pesquisa e
                vigilância epidemiológica nos níveis local, regional e nacional.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href="/boletins" className="px-5 py-3 border border-[var(--ink)]/20 rounded-full text-sm font-medium hover:border-[var(--ink)] transition">
                  Ler último boletim
                </a>
              </div>
            </div>

            <div className="md:col-span-4 flex md:justify-end items-center">
              <img
                src="/logo.png"
                alt="Logo do Observatório de Epidemiologia e Saúde Pública"
                className="w-full max-w-xs object-contain"
              />
            </div>
          </div>
        </div>
        {/* decorative bottom rule */}
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-1.5">
            <div className="flex-1" style={{ background: BRAND.yellow }} />
            <div className="flex-1" style={{ background: BRAND.red }} />
            <div className="flex-1" style={{ background: BRAND.blue }} />
            <div className="flex-1" style={{ background: BRAND.green }} />
          </div>
        </div>
      </section>

      {/* Cards grid */}
      <section id="cards" className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Navegue pelo observatório
          </h2>
          <span className="text-xs font-mono text-[var(--ink)]/50 hidden md:block">06 seções</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <a
              key={c.tag}
              href={c.href}
              className={`group relative aspect-[4/5] p-6 rounded-2xl flex flex-col justify-between transition-transform hover:-translate-y-1 ${c.border ? "border border-[var(--ink)]/15" : ""}`}
              style={{ background: c.color, color: c.fg }}
            >
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs opacity-70">{c.tag}</span>
                <span className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition">→</span>
              </div>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                  {c.title}
                </h3>
                <p className="mt-2 text-sm opacity-80 leading-snug">{c.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Sobre / mission strip */}
      <section id="sobre" className="border-y border-[var(--ink)]/10 bg-[var(--ink)] text-[var(--paper)]">
        <div className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--paper)]/50">Missão</span>
          </div>
          <div className="md:col-span-8">
            <p className="text-2xl md:text-3xl leading-snug" style={{ fontFamily: "var(--font-display)" }}>
              Produzir e disseminar conhecimento sobre as condições de vida e saúde da população piauiense,
              subsidiando políticas públicas com <em style={{ color: BRAND.yellow }}>evidência</em>,{" "}
              <em style={{ color: BRAND.green }}>rigor</em> e{" "}
              <em style={{ color: BRAND.red }}>compromisso social</em>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}