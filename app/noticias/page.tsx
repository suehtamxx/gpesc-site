import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

const BRAND = {
  yellow: 'var(--brand-yellow)',
  red: 'var(--brand-red)',
  blue: 'var(--brand-blue)',
  green: 'var(--brand-green)',
}

export default async function NoticiasPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('noticias')
    .select('id, titulo, corpo, created_at')
    .eq('publicado', true)
    .order('created_at', { ascending: false })

  const noticias = data ?? []

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] antialiased flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Page hero */}
        <div className="border-b border-[var(--ink)]/10">
          <div className="mx-auto max-w-7xl px-6 pt-12 pb-10">
            <nav className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] text-[var(--ink)]/50 mb-8">
              <Link href="/" className="hover:text-[var(--brand-red)] transition">ObsESP</Link>
              <span>/</span>
              <span className="text-[var(--ink)]">Notícias</span>
            </nav>

            <div className="flex items-start gap-4">
              <span
                className="font-mono text-xs mt-1.5 px-2 py-0.5 rounded"
                style={{ background: 'var(--ink)', color: 'var(--paper)' }}
              >
                05
              </span>
              <h1
                className="text-[clamp(2rem,5vw,3.5rem)] leading-[1] font-semibold tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Notícias
              </h1>
            </div>
          </div>
        </div>

        {/* Lista de notícias */}
        <div className="mx-auto max-w-3xl px-6 py-16">
          {noticias.length === 0 ? (
            <div className="flex flex-col items-center text-center py-24">
              <div className="flex h-1.5 w-24 mb-8">
                <div className="flex-1" style={{ background: BRAND.yellow }} />
                <div className="flex-1" style={{ background: BRAND.red }} />
                <div className="flex-1" style={{ background: BRAND.blue }} />
                <div className="flex-1" style={{ background: BRAND.green }} />
              </div>
              <p
                className="text-2xl md:text-3xl font-semibold tracking-tight mb-4 text-[var(--ink)]/70"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Em breve
              </p>
              <p className="text-sm text-[var(--ink)]/40 font-mono max-w-xs">
                As notícias e atualizações do ObsESP serão publicadas aqui em breve.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-[var(--ink)]/10">
              {noticias.map((n: { id: string; titulo: string; corpo: string | null; created_at: string }) => {
                const trecho = n.corpo
                  ? n.corpo.replace(/\n/g, ' ').trim().slice(0, 160) + (n.corpo.length > 160 ? '...' : '')
                  : null

                const data = new Date(n.created_at).toLocaleDateString('pt-BR', {
                  day: '2-digit', month: 'long', year: 'numeric', timeZone: 'America/Sao_Paulo'
                })

                return (
                  <li key={n.id}>
                    <Link
                      href={`/noticias/${n.id}`}
                      className="group block py-7 hover:bg-[var(--ink)]/[0.02] -mx-4 px-4 rounded-xl transition"
                    >
                      <p className="text-xs font-mono text-[var(--ink)]/40 mb-2">{data}</p>
                      <h2
                        className="text-xl font-semibold tracking-tight leading-snug group-hover:text-[var(--brand-red)] transition mb-2"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {n.titulo}
                      </h2>
                      {trecho && (
                        <p className="text-sm text-[var(--ink)]/60 leading-relaxed">
                          {trecho}
                        </p>
                      )}
                      <span className="mt-3 inline-block text-xs font-mono text-[var(--brand-red)] group-hover:translate-x-1 transition-transform">
                        Ler notícia →
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}