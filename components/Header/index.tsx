import Link from 'next/link';

const BRAND = {
  yellow: "var(--brand-yellow)",
  red: "var(--brand-red)",
  blue: "var(--brand-blue)",
  green: "var(--brand-green)",
};

export function Header() {
  return (
    <header className="border-b border-[var(--ink)]/10">
      {/* Top mini-bar UFPI */}
      <div className="border-b border-[var(--ink)]/10 bg-[var(--ink)] text-[var(--paper)]/80 text-xs">
        <div className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-between font-mono tracking-wide">
          <span>UFPI · Campus Senador Helvídio Nunes de Barros · Picos / PI</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="/logo.png"
            alt="Logo do Observatório de Epidemiologia e Saúde Pública"
            className="h-14 w-auto object-contain"
          />
        </div>
        <nav className="hidden md:flex items-center gap-7 text-sm">
          <Link href="/sobre" className="hover:text-[var(--brand-red)] transition">Sobre</Link>
          <Link href="/programas-projetos" className="hover:text-[var(--brand-red)] transition">Programas</Link>
          <Link href="/boletins" className="hover:text-[var(--brand-red)] transition">Boletins</Link>
          <Link href="/noticias" className="hover:text-[var(--brand-red)] transition">Notícias</Link>
          <Link href="/contato" className="px-3 py-1.5 bg-[var(--ink)] text-[var(--paper)] rounded-full text-xs font-medium hover:bg-[var(--brand-red)] transition">Contato</Link>
        </nav>
      </div>
    </header>
  );
}