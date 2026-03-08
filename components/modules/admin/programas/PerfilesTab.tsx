"use client";

import { Plus, Trash2 } from "lucide-react";

interface ListBuilderProps {
  title: string;
  field: string;
  dataList: string[];
  onUpdate: (field: string, newArray: string[]) => void;
}

function ListBuilder({ title, field, dataList, onUpdate }: ListBuilderProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black text-brand-950">{title}</h3>
        <button
          type="button"
          onClick={() => onUpdate(field, [...dataList, ""])}
          className="flex items-center gap-1.5 text-xs font-bold bg-brand-50 text-brand-700 hover:bg-brand-100 px-3 py-1.5 rounded-lg transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Añadir ítem
        </button>
      </div>
      
      <div className="space-y-3">
        {dataList.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <textarea
              value={item}
              onChange={(e) => {
                const arr = [...dataList];
                arr[index] = e.target.value;
                onUpdate(field, arr);
              }}
              className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm resize-none"
              placeholder="Descripción..."
              rows={2}
            />
            <button
              type="button"
              onClick={() => {
                const arr = [...dataList];
                arr.splice(index, 1);
                onUpdate(field, arr);
              }}
              className="p-2.5 text-muted-foreground hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors mt-1"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
        {dataList.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No hay elementos configurados en esta lista.</p>
        )}
      </div>
    </div>
  );
}

interface PerfilesTabProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function PerfilesTab({ formData, setFormData }: PerfilesTabProps) {
  
  const objetivos = Array.isArray(formData.detalles_json?.objetivos) ? formData.detalles_json.objetivos : [];
  const perfilEstudiante = Array.isArray(formData.detalles_json?.perfil_estudiante) ? formData.detalles_json.perfil_estudiante : [];
  const perfilEgresado = Array.isArray(formData.detalles_json?.perfil_egresado) ? formData.detalles_json.perfil_egresado : [];

  const handleUpdate = (field: string, newArray: string[]) => {
    setFormData({
      ...formData,
      detalles_json: {
        ...formData.detalles_json,
        [field]: newArray
      }
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ListBuilder title="Objetivos del Programa" field="objetivos" dataList={objetivos} onUpdate={handleUpdate} />
      <ListBuilder title="Perfil del Ingresante (Estudiante)" field="perfil_estudiante" dataList={perfilEstudiante} onUpdate={handleUpdate} />
      <ListBuilder title="Perfil del Egresado" field="perfil_egresado" dataList={perfilEgresado} onUpdate={handleUpdate} />
    </div>
  );
}
