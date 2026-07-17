'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function NovaNoticiaPage() {
  const router = useRouter()
  const supabase = createClient()

  const [form, setForm] = useState({
    titulo: '',
    autores: '',
    corpo: '',
    referencias: '',
    fonte_imagem: '',
    publicado: false,
  })
  const [foto, setFoto] = useState<File | null>(null)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')
  const [progresso, setProgresso] = useState('')

  function atualizar(campo: string, valor: string | boolean) {
    setForm(f => ({ ...f, [campo]: valor }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.titulo) { setErro('O título é obrigatório.'); return }
    setSalvando(true)
    setErro('')
    let foto_url: string | null = null

    if (foto) {
      setProgresso('Enviando foto...')
      const nome = `${Date.now()}_${foto.name.replace(/\s+/g, '_')}`
      const { data: upload, error: uploadErr } = await supabase.storage
        .from('noticias-fotos')
        .upload(nome, foto, { upsert: false })

      if (uploadErr) {
        setErro(`Erro no upload da foto: ${uploadErr.message}`)
        setSalvando(false)
        return
      }

      const { data: url } = supabase.storage.from('noticias-fotos').getPublicUrl(upload.path)
      foto_url = url.publicUrl
    }

    setProgresso('Salvando notícia...')
    const { error } = await supabase.from('noticias').insert({
      titulo: form.titulo,
      autores: form.autores || null,
      corpo: form.corpo || null,
      referencias: form.referencias || null,
      fonte_imagem: form.fonte_imagem || null,
      foto_url,
      publicado: form.publicado,
    })

    if (error) { setErro(`Erro ao salvar: ${error.message}`); setSalvando(false); return }
    router.push('/obsesp-painel/noticias')
    router.refresh()
  }

  const labelClass = 'block text-xs font-mono uppercase tracking-wider text-[var(--ink)]/50 mb-1.5'
  const inputClass = 'w-full px-4 py-2.5 rounded-xl border border-[var(--ink)]/15 bg-transparent text-[var(--ink)] placeholder:text-[var(--ink)]/25 focus:outline-none focus:border-[var(--brand-blue)] transition text-sm'
  const textareaClass = `${inputClass} resize-y`

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <button onClick={() => router.back()} className="text-xs font-mono text-[var(--ink)]/40 hover:text-[var(--ink)] transition mb-4 block">← Voltar</button>
        <h1 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>Nova Notícia</h1>
        <p className="text-sm text-[var(--ink)]/50 mt-1">Preencha as informações da notícia.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Título */}
        <div>
          <label className={labelClass}>Título <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={form.titulo}
            onChange={e => atualizar('titulo', e.target.value)}
            required
            placeholder="Título da notícia"
            className={inputClass}
          />
        </div>

        {/* Foto principal */}
        <div>
          <label className={labelClass}>Foto principal</label>
          <div className="border-2 border-dashed border-[var(--ink)]/15 rounded-xl p-6 text-center hover:border-[var(--ink)]/30 transition">
            <input
              type="file"
              accept="image/*"
              id="foto-upload"
              className="hidden"
              onChange={e => setFoto(e.target.files?.[0] ?? null)}
            />
            <label htmlFor="foto-upload" className="cursor-pointer">
              {foto ? (
                <div>
                  <p className="text-sm font-medium text-green-700">✓ {foto.name}</p>
                  <p className="text-xs text-[var(--ink)]/40 mt-1">{(foto.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ) : (
                <div>
                  <p className="text-2xl mb-2">🖼️</p>
                  <p className="text-sm text-[var(--ink)]/50">Clique para selecionar uma imagem</p>
                  <p className="text-xs text-[var(--ink)]/30 mt-1">JPG, PNG ou WebP</p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Fonte da imagem */}
        <div>
          <label className={labelClass}>Fonte da imagem</label>
          <input
            type="text"
            value={form.fonte_imagem}
            onChange={e => atualizar('fonte_imagem', e.target.value)}
            placeholder="Ex: arquivo ObsESP / nome do fotógrafo"
            className={inputClass}
          />
        </div>

        {/* Autores */}
        <div>
          <label className={labelClass}>Autores</label>
          <textarea
            value={form.autores}
            onChange={e => atualizar('autores', e.target.value)}
            rows={3}
            placeholder={"Nome do Autor, Titulação / Cargo\nOutro Autor, Titulação / Cargo"}
            className={textareaClass}
          />
          <p className="text-xs text-[var(--ink)]/35 mt-1 font-mono">Um autor por linha. Ex: Maria Silva, Doutora em Saúde Pública — UFPI</p>
        </div>

        {/* Corpo da notícia */}
        <div>
          <label className={labelClass}>Corpo da notícia</label>
          <textarea
            value={form.corpo}
            onChange={e => atualizar('corpo', e.target.value)}
            rows={12}
            placeholder="Escreva o conteúdo completo da notícia aqui..."
            className={textareaClass}
          />
        </div>

        {/* Referências */}
        <div>
          <label className={labelClass}>Referências</label>
          <textarea
            value={form.referencias}
            onChange={e => atualizar('referencias', e.target.value)}
            rows={5}
            placeholder={"SILVA, João et al. Título do artigo. Revista, v.1, p.1-10, 2024.\nOutra referência aqui..."}
            className={textareaClass}
          />
          <p className="text-xs text-[var(--ink)]/35 mt-1 font-mono">Uma referência por linha.</p>
        </div>

        {/* Publicar */}
        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="publicado"
            checked={form.publicado}
            onChange={e => atualizar('publicado', e.target.checked)}
            className="w-4 h-4 rounded"
          />
          <label htmlFor="publicado" className="text-sm text-[var(--ink)]/70">
            Publicar imediatamente (ficará visível no site)
          </label>
        </div>

        {erro && <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{erro}</div>}
        {progresso && !erro && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-700">{progresso}</div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={salvando}
            className="flex-1 py-3 rounded-xl font-semibold text-sm text-white transition disabled:opacity-60"
            style={{ background: 'var(--brand-red)' }}
          >
            {salvando ? 'Salvando...' : 'Salvar notícia'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 rounded-xl text-sm border border-[var(--ink)]/15 hover:border-[var(--ink)] transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
