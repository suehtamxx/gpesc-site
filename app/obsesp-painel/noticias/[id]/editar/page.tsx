'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter, useParams } from 'next/navigation'

export default function EditarNoticiaPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const supabase = createClient()

  const [form, setForm] = useState({
    titulo: '',
    autores: '',
    corpo: '',
    referencias: '',
    fonte_imagem: '',
    publicado: false,
  })
  const [fotoAtual, setFotoAtual] = useState<string | null>(null)
  const [novaFoto, setNovaFoto] = useState<File | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')
  const [progresso, setProgresso] = useState('')

  useEffect(() => {
    async function buscar() {
      const { data } = await supabase.from('noticias').select('*').eq('id', id).single()
      if (data) {
        setForm({
          titulo: data.titulo ?? '',
          autores: data.autores ?? '',
          corpo: data.corpo ?? '',
          referencias: data.referencias ?? '',
          fonte_imagem: data.fonte_imagem ?? '',
          publicado: data.publicado ?? false,
        })
        setFotoAtual(data.foto_url ?? null)
      }
      setCarregando(false)
    }
    buscar()
  }, [id])

  function atualizar(campo: string, valor: string | boolean) {
    setForm(f => ({ ...f, [campo]: valor }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.titulo) { setErro('O título é obrigatório.'); return }
    setSalvando(true)
    setErro('')

    let foto_url = fotoAtual

    if (novaFoto) {
      setProgresso('Enviando nova foto...')
      const nome = `${Date.now()}_${novaFoto.name.replace(/\s+/g, '_')}`
      const { data: upload, error: uploadErr } = await supabase.storage
        .from('noticias-fotos')
        .upload(nome, novaFoto, { upsert: false })

      if (uploadErr) {
        setErro(`Erro no upload da foto: ${uploadErr.message}`)
        setSalvando(false)
        return
      }
      const { data: url } = supabase.storage.from('noticias-fotos').getPublicUrl(upload.path)
      foto_url = url.publicUrl
    }

    setProgresso('Salvando alterações...')
    const { error } = await supabase.from('noticias').update({
      titulo: form.titulo,
      autores: form.autores || null,
      corpo: form.corpo || null,
      referencias: form.referencias || null,
      fonte_imagem: form.fonte_imagem || null,
      foto_url,
      publicado: form.publicado,
      updated_at: new Date().toISOString(),
    }).eq('id', id)

    if (error) { setErro(`Erro ao salvar: ${error.message}`); setSalvando(false); return }
    router.push('/obsesp-painel/noticias')
    router.refresh()
  }

  const labelClass = 'block text-xs font-mono uppercase tracking-wider text-[var(--ink)]/50 mb-1.5'
  const inputClass = 'w-full px-4 py-2.5 rounded-xl border border-[var(--ink)]/15 bg-transparent text-[var(--ink)] placeholder:text-[var(--ink)]/25 focus:outline-none focus:border-[var(--brand-blue)] transition text-sm'
  const textareaClass = `${inputClass} resize-y`

  if (carregando) {
    return <div className="p-8 text-sm text-[var(--ink)]/40 font-mono">Carregando...</div>
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <button onClick={() => router.back()} className="text-xs font-mono text-[var(--ink)]/40 hover:text-[var(--ink)] transition mb-4 block">← Voltar</button>
        <h1 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>Editar Notícia</h1>
        <p className="text-sm text-[var(--ink)]/50 mt-1">Altere os campos desejados e salve.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Título */}
        <div>
          <label className={labelClass}>Título <span className="text-red-500">*</span></label>
          <input type="text" value={form.titulo} onChange={e => atualizar('titulo', e.target.value)} required
            placeholder="Título da notícia" className={inputClass} />
        </div>

        {/* Foto atual */}
        <div>
          <label className={labelClass}>Foto principal</label>
          {fotoAtual && !novaFoto && (
            <div className="mb-3 flex items-center gap-3">
              <img src={fotoAtual} alt="Foto atual" className="h-20 w-auto rounded-lg object-cover border border-[var(--ink)]/10" />
              <button type="button" onClick={() => setFotoAtual(null)}
                className="text-xs text-red-500 hover:text-red-700 transition font-mono">
                ✕ Remover foto
              </button>
            </div>
          )}
          <div className="border-2 border-dashed border-[var(--ink)]/15 rounded-xl p-5 text-center hover:border-[var(--ink)]/30 transition">
            <input type="file" accept="image/*" id="foto-upload" className="hidden"
              onChange={e => setNovaFoto(e.target.files?.[0] ?? null)} />
            <label htmlFor="foto-upload" className="cursor-pointer">
              {novaFoto ? (
                <div>
                  <p className="text-sm font-medium text-green-700">✓ {novaFoto.name}</p>
                  <p className="text-xs text-[var(--ink)]/40 mt-1">{(novaFoto.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ) : (
                <p className="text-sm text-[var(--ink)]/50">
                  {fotoAtual ? 'Clique para substituir a foto' : 'Clique para adicionar uma foto'}
                </p>
              )}
            </label>
          </div>
        </div>

        {/* Fonte da imagem */}
        <div>
          <label className={labelClass}>Fonte da imagem</label>
          <input type="text" value={form.fonte_imagem} onChange={e => atualizar('fonte_imagem', e.target.value)}
            placeholder="Ex: arquivo ObsESP / nome do fotógrafo" className={inputClass} />
        </div>

        {/* Autores */}
        <div>
          <label className={labelClass}>Autores</label>
          <textarea value={form.autores} onChange={e => atualizar('autores', e.target.value)} rows={3}
            placeholder={"Nome do Autor, Titulação / Cargo\nOutro Autor, Titulação / Cargo"}
            className={textareaClass} />
          <p className="text-xs text-[var(--ink)]/35 mt-1 font-mono">Um autor por linha.</p>
        </div>

        {/* Corpo */}
        <div>
          <label className={labelClass}>Corpo da notícia</label>
          <textarea value={form.corpo} onChange={e => atualizar('corpo', e.target.value)} rows={12}
            placeholder="Escreva o conteúdo completo da notícia aqui..." className={textareaClass} />
        </div>

        {/* Referências */}
        <div>
          <label className={labelClass}>Referências</label>
          <textarea value={form.referencias} onChange={e => atualizar('referencias', e.target.value)} rows={5}
            placeholder={"SILVA, João et al. Título do artigo. Revista, v.1, p.1-10, 2024.\nOutra referência..."}
            className={textareaClass} />
          <p className="text-xs text-[var(--ink)]/35 mt-1 font-mono">Uma referência por linha.</p>
        </div>

        {/* Publicar */}
        <div className="flex items-center gap-3 pt-2">
          <input type="checkbox" id="publicado" checked={form.publicado}
            onChange={e => atualizar('publicado', e.target.checked)} className="w-4 h-4 rounded" />
          <label htmlFor="publicado" className="text-sm text-[var(--ink)]/70">
            Publicado (visível no site)
          </label>
        </div>

        {erro && <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{erro}</div>}
        {progresso && !erro && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-700">{progresso}</div>
        )}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={salvando}
            className="flex-1 py-3 rounded-xl font-semibold text-sm text-white transition disabled:opacity-60"
            style={{ background: 'var(--brand-red)' }}>
            {salvando ? 'Salvando...' : 'Salvar alterações'}
          </button>
          <button type="button" onClick={() => router.back()}
            className="px-6 py-3 rounded-xl text-sm border border-[var(--ink)]/15 hover:border-[var(--ink)] transition">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
