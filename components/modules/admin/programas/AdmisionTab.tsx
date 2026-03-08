"use client";

import { Plus, Trash2 } from "lucide-react";
import { ProgramAdmision } from "@/types/programa";

interface AdmisionTabProps {
  admisionData?: ProgramAdmision;
  setAdmisionData: (data: ProgramAdmision) => void;
}

export function AdmisionTab({ admisionData, setAdmisionData }: AdmisionTabProps) {
  const data: ProgramAdmision = {
    costo_inscripcion: admisionData?.costo_inscripcion || "",
    matricula: admisionData?.matricula || "",
    pension: admisionData?.pension || "",
    costo_adicional: admisionData?.costo_adicional || "",
    requisitos: Array.isArray(admisionData?.requisitos) ? admisionData.requisitos : []
  };

  const updateField = (field: keyof ProgramAdmision, value: string) => {
    setAdmisionData({ ...data, [field]: value });
  };

  const addRequisito = () => {
    setAdmisionData({ ...data, requisitos: [...(data.requisitos || []), ""] });
  };

  const updateRequisito = (index: number, value: string) => {
    const nuevos = [...(data.requisitos || [])];
    nuevos[index] = value;
    setAdmisionData({ ...data, requisitos: nuevos });
  };

  const removeRequisito = (index: number) => {
    const nuevos = [...(data.requisitos || [])];
    nuevos.splice(index, 1);
    setAdmisionData({ ...data, requisitos: nuevos });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
        <h3 className="text-lg font-black text-brand-950">Inversión y Costos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-950">Costo de Inscripción</label>
            <input
              type="text"
              value={data.costo_inscripcion}
              onChange={(e) => updateField('costo_inscripcion', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm"
              placeholder="Ej: S/. 211.00 al código 1671"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-950">Costo de Matrícula (Semestral)</label>
            <input
              type="text"
              value={data.matricula}
              onChange={(e) => updateField('matricula', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm"
              placeholder="Ej: S/. 101.00"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-950">Pensión</label>
            <input
              type="text"
              value={data.pension}
              onChange={(e) => updateField('pension', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm"
              placeholder="Ej: 4 pagos de S/. 401.00 cada uno"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-950">Costos Adicionales</label>
            <input
              type="text"
              value={data.costo_adicional}
              onChange={(e) => updateField('costo_adicional', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm"
              placeholder="Ej: Propedéutica de la investigación: S/. 121.00"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-brand-950">Requisitos de Admisión</h3>
          <button
            type="button"
            onClick={addRequisito}
            className="flex items-center gap-1.5 text-xs font-bold bg-brand-50 text-brand-700 hover:bg-brand-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Añadir Requisito
          </button>
        </div>
        
        <div className="space-y-3">
          {data.requisitos?.map((req: string, index: number) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="text"
                value={req}
                onChange={(e) => updateRequisito(index, e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm"
                placeholder="Descripción del requisito..."
              />
              <button
                type="button"
                onClick={() => removeRequisito(index)}
                className="p-2.5 text-muted-foreground hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          {(!data.requisitos || data.requisitos.length === 0) && (
            <p className="text-sm text-muted-foreground text-center py-4">No hay requisitos configurados.</p>
          )}
        </div>
      </div>

    </div>
  );
}
