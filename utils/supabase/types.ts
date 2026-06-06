// Tipos TypeScript gerados a partir das tabelas do Supabase

export type Boletim = {
  id: string
  titulo: string
  subtitulo: string | null
  autores: string | null
  resumo: string | null
  volume: number | null
  numero: number | null
  mes_inicio: number | null
  mes_fim: number | null
  ano: number
  pdf_url: string | null
  cor_acento: string | null
  publicado: boolean
  created_at: string
}

export type Membro = {
  id: string
  nome: string
  titulo: string | null
  cargo: string | null
  lattes_url: string | null
  foto_url: string | null
  ordem: number | null
  ativo: boolean
}

export type Publicacao = {
  id: string
  tipo: string | null
  titulo: string
  autores: string | null
  ano: number | null
  doi_url: string | null
  publicado: boolean
}

// Mapa de cores para o design visual
export const COR_PARA_CSS: Record<string, string> = {
  blue: 'var(--brand-blue)',
  green: 'var(--brand-green)',
  red: 'var(--brand-red)',
  yellow: 'var(--brand-yellow)',
}

export const CORES_ACENTO = ['blue', 'green', 'red', 'yellow'] as const
export type CorAcento = (typeof CORES_ACENTO)[number]
