import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [{ count: totalBoletins }, { count: totalMembros }, { count: totalPublicacoes }] = await Promise.all([
    supabase.from('boletins').select('*', { count: 'exact', head: true }),
    supabase.from('membros').select('*', { count: 'exact', head: true }),
    supabase.from('publicacoes').select('*', { count: 'exact', head: true }),
  ])

  const cards = [
    { label: 'Boletins', count: totalBoletins ?? 0, href: '/obsep-painel/boletins', cor: 'var(--brand-blue)', icon: '📋', desc: 'Boletins epidemiológicos publicados' },
    { label: 'Membros', count: totalMembros ?? 0, href: '/obsep-painel/membros', cor: 'var(--brand-yellow)', icon: '👥', desc: 'Pesquisadores da equipe editorial' },
    { label: 'Publicações', count: totalPublicacoes ?? 0, href: '/obsep-painel/publicacoes', cor: 'var(--brand-green)', icon: '📄', desc: 'Artigos e outras publicações' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Bem-vindo ao painel
        </h1>
        <p className="text-sm text-[var(--ink)]/50 mt-1">
          Aqui você gerencia todo o conteúdo do site ObsESP.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {cards.map(card => (
          <Link key={card.href} href={card.href}
            className="group rounded-2xl border border-[var(--ink)]/10 overflow-hidden hover:-translate-y-0.5 transition-transform">
            <div className="h-1" style={{ background: card.cor }} />
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <span className="text-2xl">{card.icon}</span>
                <span className="text-3xl font-bold font-mono" style={{ color: card.cor }}>{card.count}</span>
              </div>
              <p className="font-semibold text-sm mb-1">{card.label}</p>
              <p className="text-xs text-[var(--ink)]/40">{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-[var(--ink)]/10 p-6">
        <h2 className="font-semibold text-sm mb-4" style={{ fontFamily: 'var(--font-display)' }}>Ações rápidas</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/obsep-painel/boletins/novo"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition hover:opacity-90"
            style={{ background: 'var(--brand-blue)' }}>
            + Novo boletim
          </Link>
          <Link href="/obsep-painel/membros"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-[var(--ink)]/15 hover:border-[var(--ink)] transition">
            + Adicionar membro
          </Link>
          <Link href="/obsep-painel/publicacoes"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-[var(--ink)]/15 hover:border-[var(--ink)] transition">
            + Nova publicação
          </Link>
        </div>
      </div>
    </div>
  )
}
