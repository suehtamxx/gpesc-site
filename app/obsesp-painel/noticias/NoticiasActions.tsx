'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NoticiasActions({ id, publicado }: { id: string; publicado: boolean }) {
  const router = useRouter()
  const supabase = createClient()
  const [carregando, setCarregando] = useState(false)
  const [confirmando, setConfirmando] = useState(false)

  async function togglePublicado() {
    setCarregando(true)
    await supabase.from('noticias').update({ publicado: !publicado }).eq('id', id)
    router.refresh()
    setCarregando(false)
  }

  async function excluir() {
    setCarregando(true)
    await supabase.from('noticias').delete().eq('id', id)
    router.refresh()
    setCarregando(false)
    setConfirmando(false)
  }

  return (
    <div className="flex items-center gap-2 shrink-0">
      <Link
        href={`/obsesp-painel/noticias/${id}/editar`}
        className="text-xs font-mono px-3 py-1.5 rounded-lg border border-[var(--ink)]/15 text-[var(--ink)]/60 hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)] transition"
      >
        Editar
      </Link>

      <button
        onClick={togglePublicado}
        disabled={carregando}
        className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition disabled:opacity-50 ${
          publicado
            ? 'border-green-200 text-green-700 hover:bg-red-50 hover:border-red-200 hover:text-red-700'
            : 'border-[var(--ink)]/15 text-[var(--ink)]/50 hover:border-green-300 hover:text-green-700'
        }`}
      >
        {publicado ? 'Despublicar' : 'Publicar'}
      </button>

      {confirmando ? (
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-[var(--ink)]/50 font-mono">Confirmar?</span>
          <button
            onClick={excluir}
            disabled={carregando}
            className="text-xs font-mono px-2.5 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50"
          >
            {carregando ? '...' : 'Sim'}
          </button>
          <button
            onClick={() => setConfirmando(false)}
            disabled={carregando}
            className="text-xs font-mono px-2.5 py-1 rounded-lg border border-[var(--ink)]/15 hover:border-[var(--ink)]/30 transition disabled:opacity-50"
          >
            Não
          </button>
        </div>
      ) : (
        <button
          onClick={() => setConfirmando(true)}
          disabled={carregando}
          className="text-xs font-mono px-3 py-1.5 rounded-lg border border-[var(--ink)]/10 text-[var(--ink)]/30 hover:border-red-200 hover:text-red-600 transition disabled:opacity-50"
        >
          Excluir
        </button>
      )}
    </div>
  )
}
