'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Publicacao } from '@/utils/supabase/types'

export default function AdminPublicacoesPage() {
  const supabase = createClient()
  const [publicacoes, setPublicacoes] = useState<Publicacao[]>([])
  const [form, setForm] = useState({ titulo: '', autores: '', ano: new Date().getFullYear().toString(), doi_url: '', tipo: 'artigo' })
  const [salvando, setSalvando] = useState(false)
  const [carregando, setCarregando] = useState(true)

  async function buscar() {
    const { data } = await supabase.from('publicacoes').select('*').order('ano', { ascending: false })
    setPublicacoes(data ?? [])
    setCarregando(false)
  }

  useEffect(() => { buscar() }, [])

  async function salvar(e: React.FormEvent) {
    e.preventDefault()
    if (!form.titulo) return
    setSalvando(true)
    await supabase.from('publicacoes').insert({
      titulo: form.titulo,
      autores: form.autores || null,
      ano: form.ano ? parseInt(form.ano) : null,
      doi_url: form.doi_url || null,
      tipo: form.tipo,
      publicado: true,
    })
    setForm({ titulo: '', autores: '', ano: new Date().getFullYear().toString(), doi_url: '', tipo: 'artigo' })
    await buscar()
    setSalvando(false)
  }

  async function excluir(id: string) {
    if (!confirm('Excluir esta publicação?')) return
    await supabase.from('publicacoes').delete().eq('id', id)
    await buscar()
  }

  async function togglePublicado(id: string, publicado: boolean) {
    await supabase.from('publicacoes').update({ publicado: !publicado }).eq('id', id)
    await buscar()
  }

  const labelStyle = "block text-xs font-mono uppercase tracking-wider text-[var(--ink)]/50 mb-1.5"
  const inputStyle = "w-full px-4 py-2.5 rounded-xl border border-[var(--ink)]/15 bg-transparent text-[var(--ink)] placeholder:text-[var(--ink)]/25 focus:outline-none focus:border-[var(--brand-blue)] transition text-sm"

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>Publicações</h1>
        <p className="text-sm text-[var(--ink)]/50 mt-1">Artigos científicos e outras publicações do ObsESP.</p>
      </div>

      {/* Formulário */}
      <div className="rounded-2xl border border-[var(--ink)]/10 p-6 mb-8">
        <h2 className="font-semibold text-sm mb-4" style={{ fontFamily: 'var(--font-display)' }}>Adicionar publicação</h2>
        <form onSubmit={salvar} className="space-y-4">
          <div>
            <label className={labelStyle}>Título completo *</label>
            <input value={form.titulo} onChange={e => setForm(f => ({...f, titulo: e.target.value}))} required
              placeholder="Ex: Hospitalizações por COVID-19 entre..."
              className={inputStyle} />
          </div>
          <div>
            <label className={labelStyle}>Autores e referência completa</label>
            <textarea value={form.autores} onChange={e => setForm(f => ({...f, autores: e.target.value}))} rows={2}
              placeholder="Ex: João Silva, Maria Santos (2024). Revista X, 25, e93109."
              className={`${inputStyle} resize-none`} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelStyle}>Ano</label>
              <input type="number" value={form.ano} onChange={e => setForm(f => ({...f, ano: e.target.value}))} placeholder="2024" className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Tipo</label>
              <select value={form.tipo} onChange={e => setForm(f => ({...f, tipo: e.target.value}))}
                className={`${inputStyle} bg-[var(--paper)]`}>
                <option value="artigo">Artigo</option>
                <option value="dissertacao">Dissertação</option>
                <option value="relatorio">Relatório</option>
              </select>
            </div>
            <div>
              <label className={labelStyle}>Link DOI</label>
              <input value={form.doi_url} onChange={e => setForm(f => ({...f, doi_url: e.target.value}))} placeholder="https://doi.org/..." className={inputStyle} />
            </div>
          </div>
          <button type="submit" disabled={salvando}
            className="px-6 py-2.5 rounded-xl text-sm font-medium text-white transition disabled:opacity-60"
            style={{ background: 'var(--brand-green)' }}>
            {salvando ? 'Salvando...' : '+ Adicionar publicação'}
          </button>
        </form>
      </div>

      {/* Lista */}
      {carregando ? (
        <p className="text-sm text-[var(--ink)]/40 font-mono">Carregando...</p>
      ) : publicacoes.length === 0 ? (
        <p className="text-center py-10 text-[var(--ink)]/40 text-sm">Nenhuma publicação cadastrada.</p>
      ) : (
        <div className="space-y-2">
          {publicacoes.map((p, i) => {
            const cores = ['var(--brand-red)','var(--brand-blue)','var(--brand-green)','var(--brand-yellow)']
            return (
              <div key={p.id} className={`flex gap-3 p-4 rounded-xl border transition ${p.publicado ? 'border-[var(--ink)]/10' : 'border-[var(--ink)]/5 opacity-50'}`}>
                <div className="w-1 rounded-full shrink-0 mt-1" style={{ background: cores[i % cores.length], minHeight: '40px' }} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm leading-snug mb-0.5">{p.titulo}</p>
                  {p.autores && <p className="text-xs text-[var(--ink)]/40 truncate">{p.autores}</p>}
                  <span className={`text-xs font-mono mt-1 inline-block ${p.publicado ? 'text-green-600' : 'text-[var(--ink)]/30'}`}>
                    {p.publicado ? '● Visível' : '○ Oculto'} · {p.ano}
                  </span>
                </div>
                <div className="flex gap-2 shrink-0 items-start">
                  <button onClick={() => togglePublicado(p.id, p.publicado)}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg border border-[var(--ink)]/10 hover:border-[var(--ink)]/30 transition">
                    {p.publicado ? 'Ocultar' : 'Publicar'}
                  </button>
                  <button onClick={() => excluir(p.id)}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg border border-[var(--ink)]/10 text-[var(--ink)]/30 hover:border-red-200 hover:text-red-600 transition">
                    Excluir
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
