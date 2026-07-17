'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Membro } from '@/utils/supabase/types'

const CORES = ['yellow', 'red', 'blue', 'green']

export default function AdminMembrosPage() {
  const supabase = createClient()
  const fotoInputRef = useRef<HTMLInputElement>(null)

  const [membros, setMembros] = useState<Membro[]>([])
  const [form, setForm] = useState({
    nome: '', titulo: '', cargo: '', lattes_url: '', ordem: '',
  })
  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [fotoArquivo, setFotoArquivo] = useState<File | null>(null)
  const [fotoPreview, setFotoPreview] = useState<string | null>(null)
  const [salvando, setSalvando] = useState(false)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [confirmandoExcluir, setConfirmandoExcluir] = useState<string | null>(null)
  const [excluindo, setExcluindo] = useState(false)
  const [erroExcluir, setErroExcluir] = useState('')

  async function buscarMembros() {
    const { data } = await supabase.from('membros').select('*').order('ordem', { ascending: true })
    setMembros(data ?? [])
    setCarregando(false)
  }

  useEffect(() => { buscarMembros() }, [])

  function handleFotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0] ?? null
    setFotoArquivo(arquivo)
    if (arquivo) {
      const url = URL.createObjectURL(arquivo)
      setFotoPreview(url)
    } else {
      setFotoPreview(null)
    }
  }

  function limparFoto() {
    setFotoArquivo(null)
    setFotoPreview(null)
    if (fotoInputRef.current) fotoInputRef.current.value = ''
  }

  async function salvar(e: React.FormEvent) {
    e.preventDefault()
    if (!form.nome) return
    setErro('')
    setSalvando(true)

    let foto_url: string | null = null

    // Upload da foto se selecionada
    if (fotoArquivo) {
      const ext = fotoArquivo.name.split('.').pop()
      const nomeArquivo = `${Date.now()}_${form.nome.replace(/\s+/g, '_').toLowerCase()}.${ext}`

      const { data: upload, error: uploadErr } = await supabase.storage
        .from('membros-fotos')
        .upload(nomeArquivo, fotoArquivo, { upsert: false })

      if (uploadErr) {
        setErro(`Erro no upload da foto: ${uploadErr.message}`)
        setSalvando(false)
        return
      }

      const { data: urlData } = supabase.storage.from('membros-fotos').getPublicUrl(upload.path)
      foto_url = urlData.publicUrl
    }

    if (editandoId) {
      // Modo edição: UPDATE
      const updates: Record<string, unknown> = {
        nome: form.nome,
        titulo: form.titulo || null,
        cargo: form.cargo || null,
        lattes_url: form.lattes_url || null,
        ordem: form.ordem ? parseInt(form.ordem) : null,
      }
      if (foto_url) updates.foto_url = foto_url
      const { error } = await supabase.from('membros').update(updates).eq('id', editandoId)
      if (error) { setErro(`Erro ao atualizar: ${error.message}`); setSalvando(false); return }
    } else {
      // Modo criação: INSERT
      const { error } = await supabase.from('membros').insert({
        nome: form.nome,
        titulo: form.titulo || null,
        cargo: form.cargo || null,
        lattes_url: form.lattes_url || null,
        ordem: form.ordem ? parseInt(form.ordem) : null,
        foto_url,
        ativo: true,
      })
      if (error) { setErro(`Erro ao salvar: ${error.message}`); setSalvando(false); return }
    }

    // Limpar formulário
    setForm({ nome: '', titulo: '', cargo: '', lattes_url: '', ordem: '' })
    setEditandoId(null)
    limparFoto()
    await buscarMembros()
    setSalvando(false)
  }

  function editarMembro(m: Membro) {
    setEditandoId(m.id)
    setForm({
      nome: m.nome ?? '',
      titulo: m.titulo ?? '',
      cargo: m.cargo ?? '',
      lattes_url: m.lattes_url ?? '',
      ordem: m.ordem?.toString() ?? '',
    })
    limparFoto()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function toggleAtivo(id: string, ativo: boolean) {
    await supabase.from('membros').update({ ativo: !ativo }).eq('id', id)
    await buscarMembros()
  }

  async function confirmarExcluir() {
    if (!confirmandoExcluir) return
    setExcluindo(true)
    setErroExcluir('')

    // Tenta remover a foto do Storage (não bloqueia se falhar)
    const membro = membros.find(m => m.id === confirmandoExcluir)
    if (membro?.foto_url) {
      try {
        const path = membro.foto_url.split('/membros-fotos/')[1]
        if (path) await supabase.storage.from('membros-fotos').remove([path])
      } catch {
        // Ignora erro de storage — o membro ainda será excluído
      }
    }

    const { error } = await supabase.from('membros').delete().eq('id', confirmandoExcluir)

    if (error) {
      setErroExcluir(`Erro ao excluir: ${error.message}`)
      setExcluindo(false)
      return
    }

    setConfirmandoExcluir(null)
    setExcluindo(false)
    await buscarMembros()
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Membros da Equipe
        </h1>
        <p className="text-sm text-[var(--ink)]/50 mt-1">
          Gerencie os pesquisadores exibidos na página Quem Somos.
        </p>
      </div>

      {/* Formulário de cadastro */}
      <div className="rounded-2xl border border-[var(--ink)]/10 p-6 mb-8">
        <h2 className="font-semibold text-sm mb-5" style={{ fontFamily: 'var(--font-display)' }}>
          {editandoId ? 'Editar membro' : 'Adicionar novo membro'}
        </h2>
        <form onSubmit={salvar} className="space-y-4">

          {/* Foto */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--ink)]/50 mb-1.5">
              Foto do pesquisador
            </label>
            <div className="flex items-start gap-4">
              {/* Preview */}
              <div
                className="w-24 h-24 rounded-xl border-2 border-dashed border-[var(--ink)]/15 flex items-center justify-center overflow-hidden shrink-0 bg-[var(--ink)]/5 cursor-pointer hover:border-[var(--ink)]/30 transition"
                onClick={() => fotoInputRef.current?.click()}
              >
                {fotoPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={fotoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <p className="text-2xl">📷</p>
                    <p className="text-[10px] text-[var(--ink)]/30 mt-1 font-mono">Clique</p>
                  </div>
                )}
              </div>

              {/* Controles */}
              <div className="flex-1">
                <input
                  ref={fotoInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFotoChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fotoInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl border border-[var(--ink)]/15 text-sm hover:border-[var(--ink)]/30 transition"
                >
                  {fotoArquivo ? '🔄 Trocar foto' : '📎 Selecionar foto'}
                </button>
                {fotoArquivo && (
                  <button
                    type="button"
                    onClick={limparFoto}
                    className="ml-2 px-3 py-2 rounded-xl text-sm text-[var(--ink)]/40 hover:text-red-600 transition"
                  >
                    ✕ Remover
                  </button>
                )}
                <p className="text-xs text-[var(--ink)]/30 mt-2 font-mono">
                  {fotoArquivo
                    ? `${fotoArquivo.name} (${(fotoArquivo.size / 1024).toFixed(0)} KB)`
                    : 'JPG, PNG ou WebP. Opcional — aparecerá na página Quem Somos.'}
                </p>
              </div>
            </div>
          </div>

          {/* Nome e Título */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--ink)]/50 mb-1.5">
                Nome completo <span className="text-red-500">*</span>
              </label>
              <input
                value={form.nome}
                onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
                required
                placeholder="Ex: Danilla Michelle Costa e Silva"
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--ink)]/15 bg-transparent text-[var(--ink)] placeholder:text-[var(--ink)]/25 focus:outline-none focus:border-[var(--brand-blue)] transition text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--ink)]/50 mb-1.5">Título</label>
              <input
                value={form.titulo}
                onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))}
                placeholder="Ex: Dra., Prof., MSc."
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--ink)]/15 bg-transparent text-[var(--ink)] placeholder:text-[var(--ink)]/25 focus:outline-none focus:border-[var(--brand-blue)] transition text-sm"
              />
            </div>
          </div>

          {/* Cargo */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--ink)]/50 mb-1.5">
              Cargo / Função
            </label>
            <textarea
              value={form.cargo}
              onChange={e => setForm(f => ({ ...f, cargo: e.target.value }))}
              rows={2}
              placeholder={`Ex: Coordenadora do ObsESP\nDocente de Nutrição (CSHNB/UFPI)`}
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--ink)]/15 bg-transparent text-[var(--ink)] placeholder:text-[var(--ink)]/25 focus:outline-none focus:border-[var(--brand-blue)] transition text-sm resize-none"
            />
          </div>

          {/* Lattes e Ordem */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--ink)]/50 mb-1.5">
                Link Lattes
              </label>
              <input
                value={form.lattes_url}
                onChange={e => setForm(f => ({ ...f, lattes_url: e.target.value }))}
                placeholder="http://lattes.cnpq.br/..."
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--ink)]/15 bg-transparent text-[var(--ink)] placeholder:text-[var(--ink)]/25 focus:outline-none focus:border-[var(--brand-blue)] transition text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--ink)]/50 mb-1.5">
                Ordem de exibição
              </label>
              <input
                type="number"
                value={form.ordem}
                onChange={e => setForm(f => ({ ...f, ordem: e.target.value }))}
                placeholder="1"
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--ink)]/15 bg-transparent text-[var(--ink)] placeholder:text-[var(--ink)]/25 focus:outline-none focus:border-[var(--brand-blue)] transition text-sm"
              />
            </div>
          </div>

          {erro && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{erro}</div>
          )}

          <button
            type="submit"
            disabled={salvando}
            className="px-6 py-2.5 rounded-xl text-sm font-medium text-white transition disabled:opacity-60"
            style={{ background: 'var(--brand-blue)' }}
          >
            {salvando ? (editandoId ? 'Atualizando...' : 'Salvando...') : (editandoId ? 'Atualizar membro' : '+ Adicionar membro')}
          </button>
          {editandoId && (
            <button type="button"
              onClick={() => { setEditandoId(null); setForm({ nome: '', titulo: '', cargo: '', lattes_url: '', ordem: '' }); limparFoto() }}
              className="px-5 py-2.5 rounded-xl text-sm border border-[var(--ink)]/15 hover:border-[var(--ink)] transition">
              Cancelar edição
            </button>
          )}
        </form>
      </div>

      {/* Lista de membros */}
      {carregando ? (
        <p className="text-sm text-[var(--ink)]/40 font-mono">Carregando...</p>
      ) : membros.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-[var(--ink)]/15">
          <p className="text-3xl mb-2">👥</p>
          <p className="text-sm text-[var(--ink)]/40">Nenhum membro cadastrado ainda.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {membros.map((m, i) => (
            <div
              key={m.id}
              className={`flex items-center gap-3 p-4 rounded-xl border transition ${
                m.ativo ? 'border-[var(--ink)]/10' : 'border-[var(--ink)]/5 opacity-50'
              }`}
            >
              {/* Foto miniatura */}
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[var(--ink)]/5 flex items-center justify-center">
                {m.foto_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.foto_url} alt={m.nome} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-[var(--ink)]/20 font-mono">foto</span>
                )}
              </div>

              <div
                className="w-1 h-10 rounded-full shrink-0"
                style={{ background: `var(--brand-${CORES[i % CORES.length]})` }}
              />

              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">
                  {m.titulo ? `${m.titulo} ` : ''}{m.nome}
                </p>
                {m.cargo && (
                  <p className="text-xs text-[var(--ink)]/40 truncate">{m.cargo.split('\n')[0]}</p>
                )}
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => editarMembro(m)}
                  className="text-xs font-mono px-2.5 py-1 rounded-lg border border-[var(--ink)]/10 text-[var(--ink)]/60 hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)] transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => toggleAtivo(m.id, m.ativo)}
                  className="text-xs font-mono px-2.5 py-1 rounded-lg border border-[var(--ink)]/10 hover:border-[var(--ink)]/30 transition"
                >
                  {m.ativo ? 'Ocultar' : 'Mostrar'}
                </button>

                {confirmandoExcluir === m.id ? (
                  // Estado de confirmação inline
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-[var(--ink)]/50 font-mono">Confirmar?</span>
                    <button
                      onClick={confirmarExcluir}
                      disabled={excluindo}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-red-600 text-white border border-red-600 hover:bg-red-700 transition disabled:opacity-50"
                    >
                      {excluindo ? '...' : 'Sim'}
                    </button>
                    <button
                      onClick={() => { setConfirmandoExcluir(null); setErroExcluir('') }}
                      disabled={excluindo}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg border border-[var(--ink)]/15 hover:border-[var(--ink)]/30 transition disabled:opacity-50"
                    >
                      Não
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setErroExcluir(''); setConfirmandoExcluir(m.id) }}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg border border-[var(--ink)]/10 text-[var(--ink)]/30 hover:border-red-200 hover:text-red-600 transition"
                  >
                    Excluir
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Erro ao excluir */}
      {erroExcluir && (
        <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {erroExcluir}
          <button onClick={() => setErroExcluir('')} className="ml-3 underline text-xs">fechar</button>
        </div>
      )}
    </div>
  )
}
