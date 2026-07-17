import Link from 'next/link';

export function Header() {
  return(
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-5 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-extrabold text-blue-900 tracking-tight cursor-pointer hover:text-blue-700 transition">ObsESP</h1>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-600 hover:text-blue-700 font-medium transition">Início</Link>
          <Link href="/sobre" className="text-gray-600 hover:text-blue-700 font-medium transition">Sobre</Link>
          <Link href="/programas-projetos" className="text-gray-600 hover:text-blue-700 font-medium transition">Programas</Link>
          <Link href="/boletins" className="text-gray-600 hover:text-blue-700 font-medium transition">Boletins</Link>
          <Link href="/equipe" className="text-gray-600 hover:text-blue-700 font-medium transition">Equipe</Link>
          <Link href="/contato" className="text-gray-600 hover:text-blue-700 font-medium transition">Contato</Link>
        </nav>
      </div>
    </header>
  );
}