"use client";

import { Info, Image as ImageIcon, Trash2 } from "lucide-react";
import { getStorageUrl } from "@/lib/utils";

// Assuming formData comes from a larger state, let's minimally type the parts we use here
interface InfoGeneralFormData {
  titulo: string;
  tipo: string;
  descripcion_corta: string;
  detalles_json: {
    categoria?: string;
    info_general?: {
      duracion?: string;
      modalidad?: string;
      total_creditos?: number;
      certificacion?: string;
    };
    acerca_de?: string;
    hero_pre_title?: string;
    hero_titulo?: string;
    hero_subtitle?: string;
    hero_descripcion?: string;
  };
}

interface InfoGeneralTabProps {
  formData: InfoGeneralFormData;
  setFormData: (data: any) => void; // Using any for the callback to match parent state for now
  fotoPortadaFile: File | null;
  setFotoPortadaFile: (file: File | null) => void;
  fotoPortadaPreview: string | null;
  setFotoPortadaPreview: (url: string | null) => void;
  fotoHeroFile: File | null;
  setFotoHeroFile: (file: File | null) => void;
  fotoHeroPreview: string | null;
  setFotoHeroPreview: (url: string | null) => void;
}

export function InfoGeneralTab({
  formData,
  setFormData,
  fotoPortadaFile,
  setFotoPortadaFile,
  fotoPortadaPreview,
  setFotoPortadaPreview,
  fotoHeroFile,
  setFotoHeroFile,
  fotoHeroPreview,
  setFotoHeroPreview
}: InfoGeneralTabProps) {

  const handlePortadaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoPortadaFile(file);
      setFotoPortadaPreview(URL.createObjectURL(file));
    }
  };

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoHeroFile(file);
      setFotoHeroPreview(URL.createObjectURL(file));
    }
  };

  const clearPortada = () => {
    setFotoPortadaFile(null);
    setFotoPortadaPreview(null);
  };

  const clearHero = () => {
    setFotoHeroFile(null);
    setFotoHeroPreview(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* SECCIÓN: Información Básica */}
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
        <h3 className="text-lg font-black text-brand-950 flex items-center gap-2">
          <Info className="w-5 h-5 text-brand-600" /> Datos Principales
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-950">Título del Programa *</label>
            <input
              required
              type="text"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm"
              placeholder="Ej: Maestría en Gestión Educativa"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-950">Tipo de Programa *</label>
            <select
              required
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm appearance-none"
            >
              <option value="maestria">Maestría</option>
              <option value="doctorado">Doctorado</option>
              <option value="diplomado">Diplomado</option>
              <option value="curso">Curso</option>
              <option value="taller">Taller</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-brand-950">Descripción Corta *</label>
          <textarea
            required
            value={formData.descripcion_corta}
            onChange={(e) => setFormData({ ...formData, descripcion_corta: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm resize-none"
            placeholder="Breve descripción que aparecerá en las tarjetas de listado..."
            rows={3}
          />
        </div>
      </div>

      {/* SECCIÓN: Metadatos Específicos */}
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
        <h3 className="text-lg font-black text-brand-950">Metadatos Académicos</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-950">Categoría (Badge)</label>
            <input
              type="text"
              value={formData.detalles_json.categoria || ''}
              onChange={(e) => setFormData({ ...formData, detalles_json: { ...formData.detalles_json, categoria: e.target.value } })}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm"
              placeholder="Ej: Gestión"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-950">Duración (Auto-calculado)</label>
            <input
              type="text"
              readOnly
              value={formData.detalles_json.info_general?.duracion || ''}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 cursor-not-allowed focus:outline-none transition-all text-sm font-medium text-muted-foreground"
              placeholder="Ej: 3 Semestres"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-950">Modalidad</label>
            <input
              type="text"
              value={formData.detalles_json.info_general?.modalidad || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                detalles_json: { 
                  ...formData.detalles_json, 
                  info_general: { ...formData.detalles_json.info_general, modalidad: e.target.value } 
                } 
              })}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm"
              placeholder="Ej: Presencial / Virtual"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-950">Total Créditos (Auto-calculado)</label>
            <input
              type="number"
              readOnly
              value={formData.detalles_json.info_general?.total_creditos || ''}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 cursor-not-allowed focus:outline-none transition-all text-sm font-medium text-muted-foreground"
              placeholder="Ej: 49"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-brand-950">Grado / Certificación Otorgada</label>
          <input
            type="text"
            value={formData.detalles_json.info_general?.certificacion || ''}
            onChange={(e) => setFormData({ 
              ...formData, 
              detalles_json: { 
                ...formData.detalles_json, 
                info_general: { ...formData.detalles_json.info_general, certificacion: e.target.value } 
              } 
            })}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm"
            placeholder="Ej: Magíster en Educación"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-brand-950">Acerca del Programa (Descripción Larga)</label>
          <textarea
            value={formData.detalles_json.acerca_de || ''}
            onChange={(e) => setFormData({ ...formData, detalles_json: { ...formData.detalles_json, acerca_de: e.target.value } })}
            className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm resize-none"
            placeholder="Información extendida sobre el propósito del programa..."
            rows={4}
          />
        </div>
      </div>

      {/* SECCIÓN: Imágenes (Portada vs Hero) */}
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
        <h3 className="text-lg font-black text-brand-950 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-brand-600" /> Imágenes del Programa
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Imagen de Portada (Tarjetas) */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-brand-950 block">Imagen de Portada</label>
              <p className="text-xs text-muted-foreground">Resolución recomendada: 1920x1080px. Se usa en el listado de tarjetas y cabeceras.</p>
            </div>
            
            <div className="relative h-64 rounded-2xl border-2 border-dashed border-border bg-muted/30 overflow-hidden group hover:border-brand-500 transition-colors flex items-center justify-center">
              {fotoPortadaPreview ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={fotoPortadaPreview} alt="Preview Portada" className="w-full h-full object-cover" />
                  <button 
                    onClick={clearPortada}
                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 z-10"
                    title="Eliminar imagen seleccionada"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center text-muted-foreground">
                  <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                  <span className="text-sm font-medium">Subir portada (WebP, JPG)</span>
                </div>
              )}
              {!fotoPortadaPreview && (
                <input 
                  type="file" 
                  accept="image/jpeg, image/png, image/webp" 
                  onChange={handlePortadaChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              )}
            </div>
          </div>

          {/* Imagen de Hero (Banner Carrusel) */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-brand-950 block">Fondo del Hero Principal (Opcional)</label>
              <p className="text-xs text-muted-foreground">Formato panorámico (Ej. 1920x1080px). Se usa si se activa en el Hero del Home.</p>
            </div>
            
            <div className="relative h-64 rounded-2xl border-2 border-dashed border-border bg-muted/30 overflow-hidden group hover:border-purple-500 transition-colors flex items-center justify-center">
              {fotoHeroPreview ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={fotoHeroPreview} alt="Preview Hero" className="w-full h-full object-cover" />
                  <button 
                    onClick={clearHero}
                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 z-10"
                    title="Eliminar imagen seleccionada"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center text-muted-foreground">
                  <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                  <span className="text-sm font-medium">Subir banner panorámico</span>
                </div>
              )}
              {!fotoHeroPreview && (
                <input 
                  type="file" 
                  accept="image/jpeg, image/png, image/webp" 
                  onChange={handleHeroChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              )}
            </div>
            {/* Pequeña alerta si sube un hero pero no configura textos */}
            <div className="p-3 bg-blue-50 text-blue-800 rounded-xl text-xs font-medium border border-blue-100">
              Nota: Si subes un banner aquí, asegúrate de llenar los "Textos del Hero" en la parte inferior para que se vea correctamente en el inicio.
            </div>
          </div>

        </div>
      </div>

      {/* SECCIÓN: Textos del Hero Principal */}
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
        <h3 className="text-lg font-black text-brand-950">Textos para el Hero Principal (Home)</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-950">Pre-título (Pequeño superior)</label>
            <input
              type="text"
              value={formData.detalles_json.hero_pre_title || ''}
              onChange={(e) => setFormData({ ...formData, detalles_json: { ...formData.detalles_json, hero_pre_title: e.target.value } })}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm uppercase"
              placeholder="Ej: MAESTRÍA EN MENCIÓN EN"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-950">Título Principal (Grande)</label>
            <input
              type="text"
              value={formData.detalles_json.hero_titulo || ''}
              onChange={(e) => setFormData({ ...formData, detalles_json: { ...formData.detalles_json, hero_titulo: e.target.value } })}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm"
              placeholder="Ej: Gestión Educativa"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-950">Subtítulo (Dorado)</label>
            <input
              type="text"
              value={formData.detalles_json.hero_subtitle || ''}
              onChange={(e) => setFormData({ ...formData, detalles_json: { ...formData.detalles_json, hero_subtitle: e.target.value } })}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm"
              placeholder="Ej: Forma líderes que transforman instituciones"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-bold text-brand-950">Descripción Larga del Hero</label>
          <textarea
            value={formData.detalles_json.hero_descripcion || ''}
            onChange={(e) => setFormData({ ...formData, detalles_json: { ...formData.detalles_json, hero_descripcion: e.target.value } })}
            className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm resize-none"
            placeholder="Descripción emotiva que aparece en el banner grande del inicio..."
            rows={2}
          />
        </div>
      </div>

    </div>
  );
}
