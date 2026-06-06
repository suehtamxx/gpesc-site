'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

const NAV = [
  { href: '/obsep-painel', label: 'Dashboard', icon: '⌂' },
  { href: '/obsep-painel/boletins', label: 'Boletins', icon: '📋' },
  { href: '/obsep-painel/membros', label: 'Membros', icon: '👥' },
  { href: '/obsep-painel/publicacoes', label: 'Publicações', icon: '📄' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/obsep-acesso')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-[var(--ink)]/10 flex flex-col">
        <div className="px-5 py-6 border-b border-[var(--ink)]/10">
          <div className="flex gap-0.5 mb-3">
            {['var(--brand-yellow)','var(--brand-red)','var(--brand-blue)','var(--brand-green)'].map(c => (
              <div key={c} className="h-1.5 flex-1 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <p className="font-semibold text-sm" style={{ fontFamily: 'var(--font-display)' }}>Painel Admin</p>
          <p className="text-xs text-[var(--ink)]/40 font-mono">ObsESP</p>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV.map(item => {
            const ativo = item.href === '/obsep-painel'
              ? pathname === '/obsep-painel'
              : pathname.startsWith(item.href)
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition ${
                  ativo
                    ? 'bg-[var(--ink)]/8 font-medium'
                    : 'text-[var(--ink)]/60 hover:bg-[var(--ink)]/5 hover:text-[var(--ink)]'
                }`}>
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="px-3 py-4 border-t border-[var(--ink)]/10 space-y-1">
          <Link href="/" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[var(--ink)]/50 hover:text-[var(--ink)] transition">
            <span>↗</span> Ver site
          </Link>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[var(--ink)]/50 hover:text-red-600 transition text-left">
            <span>→</span> Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
