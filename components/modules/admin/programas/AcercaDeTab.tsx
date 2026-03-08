"use client";

import { FileText } from "lucide-react";

interface AcercaDeFormData {
  detalles_json: {
    acerca_de?: string;
    certificacion_detalle?: string;
  };
}

interface AcercaDeTabProps {
  formData: AcercaDeFormData;
  setFormData: (data: any) => void;
}

export function AcercaDeTab({ formData, setFormData }: AcercaDeTabProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* SECCIÓN: Contexto */}
      <div className="bg-brand-50 p-6 rounded-2xl border border-brand-100">
        <h3 className="text-lg font-black text-brand-950 mb-2">Acerca del Programa</h3>
        <p className="text-sm text-muted-foreground">
          Esta es la primera pestaña de lectura en la vista pública del programa. Aquí debes explayarte sobre los propósitos, la visión general y los beneficios de la certificación. Puedes usar saltos de línea para separar párrafos.
        </p>
      </div>

      {/* SECCIÓN: Textos */}
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
        <h3 className="text-lg font-black text-brand-950 flex items-center gap-2">
          <FileText className="w-5 h-5 text-brand-600" /> Descripción Académica
        </h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-950">Acerca del Programa (Descripción Larga)</label>
            <textarea
              value={formData.detalles_json.acerca_de || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                detalles_json: { ...formData.detalles_json, acerca_de: e.target.value } 
              })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm resize-none"
              placeholder="Información extendida sobre el propósito del programa..."
              rows={8}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-950">Detalle de la Certificación (Banner Destacado)</label>
            <textarea
              value={formData.detalles_json.certificacion_detalle || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                detalles_json: { ...formData.detalles_json, certificacion_detalle: e.target.value } 
              })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm resize-none"
              placeholder="Ej: Al culminar el programa satisfactoriamente se otorgará el Grado Académico de Magíster en Gestión Educativa..."
              rows={3}
            />
            <p className="text-xs text-muted-foreground">Este texto aparecerá resaltado junto a un ícono de medalla dorada.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
