import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';


export default function SobrePage() {

    return (

        <div className="min-h-screen bg-white text-gray-800 font-sans flex flex-col">
            <Header />

            <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-10">
                {/* Breadcrumb */}
                <nav className="text-sm text-gray-500 mb-6">
                    <a href="/" className="hover:text-blue-700">🏠 ObsESP</a>
                    <span className="mx-2">›</span>
                    <span className="text-gray-700">Links Úteis</span>
                </nav>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">Links Úteis</h1>

                {/* Datas */}
                <div className="flex gap-8 text-sm text-gray-500 border-t border-b border-gray-200 py-3 mb-8">
                    <span>Publicado: 20/01/2025 10:27</span>
                    <span>Atualização mais recente: 05/02/2025 13:19</span>
                </div>

                {/* Links úteis */}
                <div className="text-gray-700 leading-relaxed space-y-4 text-justify">
                   
                </div>
            </main>

            <Footer />
        </div>
    );
}