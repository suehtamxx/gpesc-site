'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter, useParams } from 'next/navigation'

const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']

export default function EditarBoletimPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const supabase = createClient()

  const [form, setForm] = useState({
    titulo: '',
    subtitulo: '',
    autores: '',
    resumo: '',
    volume: '',
    numero: '',
    mes_inicio: '',
    mes_fim: '',
    ano: new Date().getFullYear().toString(),
    cor_acento: 'blue',
    publicado: false,
  })
  const [pdfAtual, setPdfAtual] = useState<string | null>(null)
  const [novoPdf, setNovoPdf] = useState<File | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')
  const [progresso, setProgresso] = useState('')

  useEffect(() => {
    async function buscar() {
      const { data } = await supabase.from('boletins').select('*').eq('id', id).single()
      if (data) {
        setForm({
          titulo: data.titulo ?? '',
          subtitulo: data.subtitulo ?? '',
          autores: data.autores ?? '',
          resumo: data.resumo ?? '',
          volume: data.volume?.toString() ?? '',
          numero: data.numero?.toString() ?? '',
          mes_inicio: data.mes_inicio?.toString() ?? '',
          mes_fim: data.mes_fim?.toString() ?? '',
          ano: data.ano?.toString() ?? new Date().getFullYear().toString(),
          cor_acento: data.cor_acento ?? 'blue',
          publicado: data.publicado ?? false,
        })
        setPdfAtual(data.pdf_url ?? null)
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
    if (!form.titulo || !form.ano) { setErro('Preencha pelo menos o título e o ano.'); return }
    setSalvando(true)
    setErro('')

    let pdf_url = pdfAtual

    if (novoPdf) {
      setProgresso('Enviando novo PDF...')
      const nome = `${Date.now()}_${novoPdf.name.replace(/\s+/g, '_')}`
      const { data: upload, error: uploadErr } = await supabase.storage
        .from('boletins-pdf')
        .upload(nome, novoPdf, { upsert: false })
      if (uploadErr) { setErro(`Erro no upload: ${uploadErr.message}`); setSalvando(false); return }
      const { data: url } = supabase.storage.from('boletins-pdf').getPublicUrl(upload.path)
      pdf_url = url.publicUrl
    }

    setProgresso('Salvando alterações...')
    const { error } = await supabase.from('boletins').update({
      titulo: form.titulo,
      subtitulo: form.subtitulo || null,
      autores: form.autores || null,
      resumo: form.resumo || null,
      volume: form.volume ? parseInt(form.volume) : null,
      numero: form.numero ? parseInt(form.numero) : null,
      mes_inicio: form.mes_inicio ? parseInt(form.mes_inicio) : null,
      mes_fim: form.mes_fim ? parseInt(form.mes_fim) : null,
      ano: parseInt(form.ano),
      cor_acento: form.cor_acento,
      publicado: form.publicado,
      pdf_url,
    }).eq('id', id)

    if (error) { setErro(`Erro ao salvar: ${error.message}`); setSalvando(false); return }
    router.push('/obsesp-painel/boletins')
    router.refresh()
  }

  const Input = ({ label, campo, tipo = 'text', placeholder = '', obrigatorio = false }: {
    label: string; campo: string; tipo?: string; placeholder?: string; obrigatorio?: boolean
  }) => (
    <div>
      <label className="block text-xs font-mono uppercase tracking-wider text-[var(--ink)]/50 mb-1.5">
        {label}{obrigatorio && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input type={tipo} value={(form as Record<string, any>)[campo]} onChange={e => atualizar(campo, e.target.value)}
        required={obrigatorio} placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-[var(--ink)]/15 bg-transparent text-[var(--ink)] placeholder:text-[var(--ink)]/25 focus:outline-none focus:border-[var(--brand-blue)] transition text-sm" />
    </div>
  )

  if (carregando) return <div className="p-8 text-sm text-[var(--ink)]/40 font-mono">Carregando...</div>

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <button onClick={() => router.back()} className="text-xs font-mono text-[var(--ink)]/40 hover:text-[var(--ink)] transition mb-4 block">← Voltar</button>
        <h1 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>Editar Boletim</h1>
        <p className="text-sm text-[var(--ink)]/50 mt-1">Altere os campos desejados e salve.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input label="Título completo" campo="titulo" obrigatorio placeholder="Boletim Epidemiológico, Vol. 1, Nº1..." />
        <Input label="Subtítulo / Tema principal" campo="subtitulo" placeholder="Ex: Estado Nutricional de Idosos..." />
        <Input label="Autores" campo="autores" placeholder="Ex: João Silva, Maria Santos..." />

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--ink)]/50 mb-1.5">Resumo</label>
          <textarea value={form.resumo} onChange={e => atualizar('resumo', e.target.value)} rows={5}
            placeholder="Resumo ou abstract do boletim..."
            className="w-full px-4 py-2.5 rounded-xl border border-[var(--ink)]/15 bg-transparent text-[var(--ink)] placeholder:text-[var(--ink)]/25 focus:outline-none focus:border-[var(--brand-blue)] transition text-sm resize-y" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Input label="Ano" campo="ano" tipo="number" obrigatorio placeholder="2025" />
          <Input label="Volume" campo="volume" tipo="number" placeholder="1" />
          <Input label="Número" campo="numero" tipo="number" placeholder="1" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--ink)]/50 mb-1.5">Mês início</label>
            <select value={form.mes_inicio} onChange={e => atualizar('mes_inicio', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--ink)]/15 bg-[var(--paper)] text-[var(--ink)] focus:outline-none focus:border-[var(--brand-blue)] transition text-sm">
              <option value="">Selecione</option>
              {MESES.map((m, i) => <option key={i} value={i+1}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--ink)]/50 mb-1.5">Mês fim</label>
            <select value={form.mes_fim} onChange={e => atualizar('mes_fim', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--ink)]/15 bg-[var(--paper)] text-[var(--ink)] focus:outline-none focus:border-[var(--brand-blue)] transition text-sm">
              <option value="">Selecione</option>
              {MESES.map((m, i) => <option key={i} value={i+1}>{m}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--ink)]/50 mb-1.5">Cor de destaque</label>
          <div className="flex gap-3">
            {[
              { valor: 'blue', label: 'Azul', cor: 'var(--brand-blue)' },
              { valor: 'green', label: 'Verde', cor: 'var(--brand-green)' },
              { valor: 'red', label: 'Vermelho', cor: 'var(--brand-red)' },
              { valor: 'yellow', label: 'Amarelo', cor: 'var(--brand-yellow)' },
            ].map(c => (
              <button key={c.valor} type="button" onClick={() => atualizar('cor_acento', c.valor)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition ${form.cor_acento === c.valor ? 'border-[var(--ink)] font-medium' : 'border-[var(--ink)]/15'}`}>
                <span className="w-3 h-3 rounded-full" style={{ background: c.cor }} />
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* PDF */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--ink)]/50 mb-1.5">Arquivo PDF</label>
          {pdfAtual && !novoPdf && (
            <div className="flex items-center gap-3 mb-3 p-3 rounded-xl border border-[var(--ink)]/10">
              <span className="text-sm font-mono text-[var(--ink)]/60">📄 PDF atual</span>
              <a href={pdfAtual} target="_blank" rel="noopener noreferrer"
                className="text-xs text-[var(--brand-blue)] hover:underline">Ver PDF</a>
              <button type="button" onClick={() => setPdfAtual(null)}
                className="text-xs text-red-500 hover:text-red-700 ml-auto">✕ Remover</button>
            </div>
          )}
          <div className="border-2 border-dashed border-[var(--ink)]/15 rounded-xl p-6 text-center hover:border-[var(--ink)]/30 transition">
            <input type="file" accept=".pdf" id="pdf-upload" className="hidden"
              onChange={e => setNovoPdf(e.target.files?.[0] ?? null)} />
            <label htmlFor="pdf-upload" className="cursor-pointer">
              {novoPdf ? (
                <div>
                  <p className="text-sm font-medium text-green-700">✓ {novoPdf.name}</p>
                  <p className="text-xs text-[var(--ink)]/40 mt-1">{(novoPdf.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ) : (
                <p className="text-sm text-[var(--ink)]/50">
                  {pdfAtual ? 'Clique para substituir o PDF' : 'Clique para adicionar um PDF'}
                </p>
              )}
            </label>
          </div>
        </div>

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
            style={{ background: 'var(--brand-blue)' }}>
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
