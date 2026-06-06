'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function AcessoPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    if (error) {
      setErro('Email ou senha incorretos. Verifique seus dados.')
      setCarregando(false)
      return
    }
    router.push('/obsep-painel')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex justify-center gap-1 mb-4">
            <div className="h-2 w-8 rounded-full" style={{ background: 'var(--brand-yellow)' }} />
            <div className="h-2 w-8 rounded-full" style={{ background: 'var(--brand-red)' }} />
            <div className="h-2 w-8 rounded-full" style={{ background: 'var(--brand-blue)' }} />
            <div className="h-2 w-8 rounded-full" style={{ background: 'var(--brand-green)' }} />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Painel ObsESP
          </h1>
          <p className="text-sm text-[var(--ink)]/50 mt-1">Acesso restrito a administradores</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-[var(--ink)]/50 mb-1.5">Email</label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required
              placeholder="seu@email.com"
              className="w-full px-4 py-3 rounded-xl border border-[var(--ink)]/15 bg-transparent text-[var(--ink)] placeholder:text-[var(--ink)]/25 focus:outline-none focus:border-[var(--brand-blue)] transition text-sm" />
          </div>
          <div>
            <label htmlFor="senha" className="block text-xs font-mono uppercase tracking-wider text-[var(--ink)]/50 mb-1.5">Senha</label>
            <input id="senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-[var(--ink)]/15 bg-transparent text-[var(--ink)] placeholder:text-[var(--ink)]/25 focus:outline-none focus:border-[var(--brand-blue)] transition text-sm" />
          </div>
          {erro && <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{erro}</div>}
          <button type="submit" disabled={carregando}
            className="w-full py-3 rounded-xl font-semibold text-sm text-white transition disabled:opacity-60"
            style={{ background: 'var(--brand-blue)' }}>
            {carregando ? 'Entrando...' : 'Entrar no painel'}
          </button>
        </form>

        <p className="text-center text-xs text-[var(--ink)]/30 mt-8 font-mono">
          <a href="/" className="hover:text-[var(--ink)]/60 transition">← Voltar ao site</a>
        </p>
      </div>
    </div>
  )
}
