'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function BoletinsActions({ id, publicado }: { id: string; publicado: boolean }) {
  const router = useRouter()
  const supabase = createClient()
  const [carregando, setCarregando] = useState(false)

  async function togglePublicado() {
    setCarregando(true)
    await supabase.from('boletins').update({ publicado: !publicado }).eq('id', id)
    router.refresh()
    setCarregando(false)
  }

  async function excluir() {
    if (!confirm('Tem certeza que deseja excluir este boletim? Esta ação não pode ser desfeita.')) return
    setCarregando(true)
    await supabase.from('boletins').delete().eq('id', id)
    router.refresh()
    setCarregando(false)
  }

  return (
    <div className="flex items-center gap-2 shrink-0">
      <Link href={`/obsesp-painel/boletins/${id}/editar`}
        className="text-xs font-mono px-3 py-1.5 rounded-lg border border-[var(--ink)]/15 text-[var(--ink)]/60 hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)] transition">
        Editar
      </Link>
      <button onClick={togglePublicado} disabled={carregando}
        className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition disabled:opacity-50 ${
          publicado
            ? 'border-green-200 text-green-700 hover:bg-red-50 hover:border-red-200 hover:text-red-700'
            : 'border-[var(--ink)]/15 text-[var(--ink)]/50 hover:border-green-300 hover:text-green-700'
        }`}>
        {publicado ? 'Despublicar' : 'Publicar'}
      </button>
      <button onClick={excluir} disabled={carregando}
        className="text-xs font-mono px-3 py-1.5 rounded-lg border border-[var(--ink)]/10 text-[var(--ink)]/30 hover:border-red-200 hover:text-red-600 transition disabled:opacity-50">
        Excluir
      </button>
    </div>
  )
}
