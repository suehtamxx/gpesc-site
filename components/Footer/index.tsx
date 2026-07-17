// src/components/Footer/index.tsx

export function Footer() {
    return(
        <footer className="bg-gray-900 text-gray-400 py-10 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-semibold text-gray-300 mb-2">GPESC - Grupo de Pesquisa</p>
          <p className="text-sm">&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
          <p className="text-sm mt-2 text-blue-400">ISSN: Em processo de solicitação</p>
        </div>
        </footer>
    )
}