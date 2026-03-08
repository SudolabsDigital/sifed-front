"use client";

import { Info } from "lucide-react";

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
  };
}

interface InfoGeneralTabProps {
  formData: InfoGeneralFormData;
  setFormData: (data: any) => void;
}

export function InfoGeneralTab({ formData, setFormData }: InfoGeneralTabProps) {

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
      </div>

    </div>
  );
}
