import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Boletim } from '@/utils/supabase/types'
import BoletimsActions from './BoletinsActions'

export default async function AdminBoletinsPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('boletins')
    .select('*')
    .order('ano', { ascending: false })
    .order('numero', { ascending: false })

  const boletins: Boletim[] = data ?? []

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Boletins
          </h1>
          <p className="text-sm text-[var(--ink)]/50 mt-1">
            {boletins.length} boletim{boletins.length !== 1 ? 's' : ''} cadastrado{boletins.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link href="/obsep-painel/boletins/novo"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition hover:opacity-90"
          style={{ background: 'var(--brand-blue)' }}>
          + Novo boletim
        </Link>
      </div>

      {boletins.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-dashed border-[var(--ink)]/15">
          <p className="text-4xl mb-3">📋</p>
          <p className="text-sm text-[var(--ink)]/50 mb-4">Nenhum boletim cadastrado ainda.</p>
          <Link href="/obsep-painel/boletins/novo"
            className="text-sm font-medium px-4 py-2 rounded-xl border border-[var(--ink)]/15 hover:border-[var(--ink)] transition">
            Cadastrar o primeiro boletim
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {boletins.map(b => (
            <div key={b.id} className="flex items-center gap-4 p-4 rounded-xl border border-[var(--ink)]/10 hover:border-[var(--ink)]/20 transition">
              <div className="w-2 h-10 rounded-full shrink-0" style={{ background: `var(--brand-${b.cor_acento ?? 'blue'})` }} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm leading-snug truncate">{b.titulo}</p>
                <p className="text-xs text-[var(--ink)]/40 font-mono mt-0.5">
                  {b.ano}{b.volume ? ` · Vol.${b.volume}` : ''}{b.numero ? ` Nº${b.numero}` : ''}
                  {' · '}
                  <span className={b.publicado ? 'text-green-600' : 'text-[var(--ink)]/30'}>
                    {b.publicado ? '● Publicado' : '○ Rascunho'}
                  </span>
                </p>
              </div>
              <BoletimsActions id={b.id} publicado={b.publicado} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
