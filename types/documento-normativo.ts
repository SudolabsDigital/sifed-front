export type CategoriaPrincipal = 'normativa' | 'formato';
export type EstadoDocumento = 'vigente' | 'derogado' | 'borrador';

export interface DocumentoNormativo {
  id: number;
  titulo: string;
  descripcion: string | null;
  codigo: string | null;
  categoria_principal: CategoriaPrincipal;
  sub_categoria: string | null;
  fecha_emision: string | null; // YYYY-MM-DD
  fecha_año: string | null; // YYYY
  archivo_path: string;
  extension_archivo: string; // pdf, docx, xlsx
  slug: string;
  estado: EstadoDocumento;
  is_public: boolean;
  sustituye_a_id: number | null;
  created_at: string;
  updated_at: string;
}
