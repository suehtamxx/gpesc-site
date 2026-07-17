import { createClient } from '@/utils/supabase/server'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

export default async function NoticiaDetalhePage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: noticia } = await supabase
    .from('noticias')
    .select('*')
    .eq('id', id)
    .eq('publicado', true)
    .single()

  if (!noticia) notFound()

  const autores: string[] = noticia.autores
    ? noticia.autores.split('\n').map((a: string) => a.trim()).filter(Boolean)
    : []

  const paragrafos: string[] = noticia.corpo
    ? noticia.corpo.split('\n').map((p: string) => p.trim()).filter(Boolean)
    : []

  const referencias: string[] = noticia.referencias
    ? noticia.referencias.split('\n').map((r: string) => r.trim()).filter(Boolean)
    : []

  const dataPublicacao = new Date(noticia.created_at).toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })

  const dataAtualizacao = noticia.updated_at
    ? new Date(noticia.updated_at).toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
      })
    : null

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] antialiased flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="border-b border-[var(--ink)]/10">
          <div className="mx-auto max-w-3xl px-6 pt-10 pb-8">
            <nav className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] text-[var(--ink)]/50 mb-8">
              <Link href="/" className="hover:text-[var(--brand-red)] transition">ObsESP</Link>
              <span>/</span>
              <Link href="/noticias" className="hover:text-[var(--brand-red)] transition">Notícias</Link>
              <span>/</span>
              <span className="text-[var(--ink)] truncate max-w-[200px]">{noticia.titulo}</span>
            </nav>

            {/* Título */}
            <h1
              className="text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] font-semibold tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {noticia.titulo}
            </h1>

            {/* Datas */}
            <div className="flex flex-wrap gap-6 text-xs font-mono text-[var(--ink)]/40 pb-6 border-b border-[var(--ink)]/10">
              <span>Publicado: {dataPublicacao}</span>
              {dataAtualizacao && <span>Atualização mais recente: {dataAtualizacao}</span>}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-6 py-10 space-y-10">

          {/* Foto principal */}
          {noticia.foto_url && (
            <figure className="flex justify-center">
              <img
                src={noticia.foto_url}
                alt={`Foto da notícia: ${noticia.titulo}`}
                className="rounded-2xl max-h-[420px] w-auto object-cover shadow-sm"
              />
            </figure>
          )}

          {/* Autores */}
          {autores.length > 0 && (
            <section className="space-y-1">
              {autores.map((autor, i) => {
                const [nome, ...resto] = autor.split(',')
                return (
                  <p key={i} className="text-sm text-center text-[var(--ink)]/80">
                    <span className="font-semibold underline decoration-[var(--brand-red)]/40 underline-offset-2">{nome.trim()}</span>
                    {resto.length > 0 && <span className="text-[var(--ink)]/60">{`, ${resto.join(',').trim()}`}</span>}
                  </p>
                )
              })}
            </section>
          )}

          {/* Corpo da notícia */}
          {paragrafos.length > 0 && (
            <article className="space-y-5">
              {paragrafos.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-[var(--ink)] text-justify">
                  {p}
                </p>
              ))}
            </article>
          )}

          {/* Referências */}
          {referencias.length > 0 && (
            <section className="border-t border-[var(--ink)]/10 pt-8">
              <h2 className="text-sm font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Referências</h2>
              <ul className="space-y-3">
                {referencias.map((ref, i) => (
                  <li key={i} className="text-sm text-[var(--ink)]/70 leading-relaxed">
                    {ref.startsWith('http') ? (
                      <a href={ref} target="_blank" rel="noopener noreferrer" className="text-[var(--brand-blue)] hover:underline break-all">
                        {ref}
                      </a>
                    ) : (
                      ref
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Voltar */}
          <div className="pt-4 border-t border-[var(--ink)]/10">
            <Link href="/noticias" className="text-sm font-mono text-[var(--ink)]/50 hover:text-[var(--ink)] transition">
              ← Voltar para notícias
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
