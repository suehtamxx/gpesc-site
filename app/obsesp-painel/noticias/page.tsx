import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function AdminNoticiasPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('noticias')
    .select('id, titulo, publicado, created_at')
    .order('created_at', { ascending: false })

  const noticias = data ?? []

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Notícias
          </h1>
          <p className="text-sm text-[var(--ink)]/50 mt-1">
            {noticias.length} notícia{noticias.length !== 1 ? 's' : ''} cadastrada{noticias.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/obsesp-painel/noticias/novo"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition hover:opacity-90"
          style={{ background: 'var(--brand-red)' }}
        >
          + Nova notícia
        </Link>
      </div>

      {noticias.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-dashed border-[var(--ink)]/15">
          <p className="text-4xl mb-3">📰</p>
          <p className="text-sm text-[var(--ink)]/50 mb-4">Nenhuma notícia cadastrada ainda.</p>
          <Link
            href="/obsesp-painel/noticias/novo"
            className="text-sm font-medium px-4 py-2 rounded-xl border border-[var(--ink)]/15 hover:border-[var(--ink)] transition"
          >
            Cadastrar a primeira notícia
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {noticias.map((n: { id: string; titulo: string; publicado: boolean; created_at: string }) => (
            <div key={n.id} className="flex items-center gap-4 p-4 rounded-xl border border-[var(--ink)]/10 hover:border-[var(--ink)]/20 transition">
              <div className="w-2 h-10 rounded-full shrink-0" style={{ background: 'var(--brand-red)' }} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm leading-snug truncate">{n.titulo}</p>
                <p className="text-xs text-[var(--ink)]/40 font-mono mt-0.5">
                  {new Date(n.created_at).toLocaleDateString('pt-BR')}
                  {' · '}
                  <span className={n.publicado ? 'text-green-600' : 'text-[var(--ink)]/30'}>
                    {n.publicado ? '● Publicado' : '○ Rascunho'}
                  </span>
                </p>
              </div>
              <Link
                href={`/noticias/${n.id}`}
                target="_blank"
                className="text-xs font-mono text-[var(--ink)]/40 hover:text-[var(--ink)] transition px-2"
              >
                ↗ Ver
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
