"use client";

import { Plus, Trash2, ArrowUp, ArrowDown, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Ciclo, Asignatura } from "@/types/curriculum";

interface PlanEstudioData {
  nota_general: string;
  ciclos: Ciclo[];
}

interface PlanEstudioTabProps {
  planData: PlanEstudioData;
  setPlanData: (data: PlanEstudioData) => void;
}

export function PlanEstudioTab({ planData, setPlanData }: PlanEstudioTabProps) {
  
  // Seguridad inicial de estructura
  const data: PlanEstudioData = {
    nota_general: planData?.nota_general || "",
    ciclos: Array.isArray(planData?.ciclos) ? planData.ciclos : []
  };

  const handleNotaChange = (val: string) => {
    setPlanData({ ...data, nota_general: val });
  };

  const addCiclo = () => {
    const romanos = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
    const nuevoNumero = romanos[data.ciclos.length] || `Ciclo ${data.ciclos.length + 1}`;
    
    setPlanData({
      ...data,
      ciclos: [
        ...data.ciclos,
        {
          numero: nuevoNumero,
          totalCreditos: 0,
          asignaturas: []
        }
      ]
    });
  };

  const removeCiclo = (cIndex: number) => {
    if (!confirm("¿Eliminar este ciclo completo y sus asignaturas?")) return;
    const nuevosCiclos = [...data.ciclos];
    nuevosCiclos.splice(cIndex, 1);
    setPlanData({ ...data, ciclos: nuevosCiclos });
  };

  const moveCiclo = (index: number, direction: 'up' | 'down') => {
    const nuevosCiclos = [...data.ciclos];
    if (direction === 'up' && index > 0) {
      [nuevosCiclos[index - 1], nuevosCiclos[index]] = [nuevosCiclos[index], nuevosCiclos[index - 1]];
    } else if (direction === 'down' && index < nuevosCiclos.length - 1) {
      [nuevosCiclos[index + 1], nuevosCiclos[index]] = [nuevosCiclos[index], nuevosCiclos[index + 1]];
    }
    setPlanData({ ...data, ciclos: nuevosCiclos });
  };

  const addAsignatura = (cIndex: number) => {
    const nuevosCiclos = [...data.ciclos];
    nuevosCiclos[cIndex].asignaturas.push({
      nombre: "",
      creditos: 0,
      isElectivo: false
    });
    setPlanData({ ...data, ciclos: nuevosCiclos });
  };

  const updateAsignatura = (cIndex: number, aIndex: number, field: keyof Asignatura, value: any) => {
    const nuevosCiclos = [...data.ciclos];
    nuevosCiclos[cIndex].asignaturas[aIndex] = {
      ...nuevosCiclos[cIndex].asignaturas[aIndex],
      [field]: value
    };
    
    // Auto-calcular total de créditos del ciclo
    if (field === 'creditos') {
      const total = nuevosCiclos[cIndex].asignaturas.reduce((sum: number, asig: Asignatura) => sum + (Number(asig.creditos) || 0), 0);
      nuevosCiclos[cIndex].totalCreditos = total;
    }
    
    setPlanData({ ...data, ciclos: nuevosCiclos });
  };

  const removeAsignatura = (cIndex: number, aIndex: number) => {
    const nuevosCiclos = [...data.ciclos];
    nuevosCiclos[cIndex].asignaturas.splice(aIndex, 1);
    
    // Recalcular
    const total = nuevosCiclos[cIndex].asignaturas.reduce((sum: number, asig: Asignatura) => sum + (Number(asig.creditos) || 0), 0);
    nuevosCiclos[cIndex].totalCreditos = total;

    setPlanData({ ...data, ciclos: nuevosCiclos });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* HEADER Y NOTA */}
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
        <div className="flex-1 w-full space-y-2">
          <label className="text-sm font-bold text-brand-950 block">Nota General del Plan de Estudios</label>
          <input
            type="text"
            value={data.nota_general}
            onChange={(e) => handleNotaChange(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm"
            placeholder="Ej: (*) El maestrando elige una de las tres asignaturas electivas."
          />
        </div>
        <button
          type="button"
          onClick={addCiclo}
          className="shrink-0 flex items-center gap-2 bg-brand-950 text-white px-5 py-2.5 rounded-xl hover:bg-black transition-all shadow-sm font-bold text-sm"
        >
          <Plus className="w-4 h-4" /> Agregar Ciclo / Semestre
        </button>
      </div>

      {/* CONSTRUCTOR DE CICLOS */}
      <div className="space-y-6">
        {data.ciclos.map((ciclo: Ciclo, cIndex: number) => (
          <div key={cIndex} className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden group/ciclo">
            
            {/* Header del Ciclo */}
            <div className="bg-brand-50/50 px-6 py-4 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => moveCiclo(cIndex, 'up')}
                    disabled={cIndex === 0}
                    className="p-1 text-muted-foreground hover:bg-brand-100 hover:text-brand-900 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Subir ciclo"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveCiclo(cIndex, 'down')}
                    disabled={cIndex === data.ciclos.length - 1}
                    className="p-1 text-muted-foreground hover:bg-brand-100 hover:text-brand-900 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Bajar ciclo"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-brand-950">Ciclo / Módulo:</span>
                  <input
                    type="text"
                    value={ciclo.numero}
                    onChange={(e) => {
                      const nuevosCiclos = [...data.ciclos];
                      nuevosCiclos[cIndex].numero = e.target.value;
                      setPlanData({ ...data, ciclos: nuevosCiclos });
                    }}
                    className="w-24 px-3 py-1.5 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm font-black text-center"
                    placeholder="I, II, III"
                  />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-sm">
                  <span className="text-muted-foreground">Total Créditos: </span>
                  <span className="font-black text-brand-950 bg-white px-3 py-1 rounded-lg border border-border">{ciclo.totalCreditos}</span>
                </div>
                <button 
                  type="button"
                  onClick={() => removeCiclo(cIndex)}
                  className="p-2 text-muted-foreground hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
                  title="Eliminar Ciclo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Asignaturas */}
            <div className="p-6">
              <div className="space-y-3">
                {ciclo.asignaturas.map((asig: Asignatura, aIndex: number) => (
                  <div key={aIndex} className="flex flex-col sm:flex-row gap-3 items-center bg-muted/20 p-3 rounded-xl border border-border/50 hover:bg-muted/40 transition-colors">
                    
                    <div className="flex-1 w-full">
                      <input
                        type="text"
                        value={asig.nombre}
                        onChange={(e) => updateAsignatura(cIndex, aIndex, 'nombre', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm"
                        placeholder="Nombre de la Asignatura"
                      />
                    </div>
                    
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="relative">
                        <input
                          type="number"
                          value={asig.creditos || ''}
                          onChange={(e) => updateAsignatura(cIndex, aIndex, 'creditos', Number(e.target.value))}
                          className="w-24 pl-4 pr-8 py-2.5 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm text-center"
                          placeholder="0"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-bold">cr</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => updateAsignatura(cIndex, aIndex, 'isElectivo', !asig.isElectivo)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all text-xs font-bold w-full sm:w-auto justify-center",
                          asig.isElectivo 
                            ? "bg-amber-50 border-amber-200 text-amber-700" 
                            : "bg-white border-border text-muted-foreground hover:bg-muted"
                        )}
                        title="Marcar como curso electivo/opcional"
                      >
                        <CheckSquare className="w-4 h-4" />
                        Electivo
                      </button>

                      <button
                        type="button"
                        onClick={() => removeAsignatura(cIndex, aIndex)}
                        className="p-2.5 text-muted-foreground hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-100 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => addAsignatura(cIndex)}
                className="mt-4 flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 hover:bg-brand-50 px-4 py-2 rounded-xl transition-all"
              >
                <Plus className="w-4 h-4" /> Añadir Asignatura a este ciclo
              </button>
            </div>

          </div>
        ))}

        {data.ciclos.length === 0 && (
          <div className="text-center py-16 border-2 border-dashed border-brand-100 rounded-[2rem] bg-brand-50/20">
            <p className="text-muted-foreground font-medium mb-4">No hay ciclos registrados en el plan de estudios.</p>
            <button
              type="button"
              onClick={addCiclo}
              className="inline-flex items-center gap-2 bg-white border border-border text-brand-950 px-5 py-2.5 rounded-xl hover:bg-muted transition-all shadow-sm font-bold text-sm"
            >
              <Plus className="w-4 h-4" /> Crear el primer Ciclo
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
