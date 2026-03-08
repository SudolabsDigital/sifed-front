"use client";

import { Plus, Trash2, Clock, CalendarDays, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface HorariosTabProps {
  horariosData: any[];
  setHorariosData: (data: any[]) => void;
}

export function HorariosTab({ horariosData, setHorariosData }: HorariosTabProps) {
  
  // Garantizar array
  const modulos = Array.isArray(horariosData) ? horariosData : [];

  const addModulo = () => {
    setHorariosData([
      ...modulos,
      {
        titulo_modulo: "",
        descripcion_general: "",
        clases_especificas: []
      }
    ]);
  };

  const removeModulo = (index: number) => {
    if (!confirm("¿Eliminar este bloque de horario?")) return;
    const nuevos = [...modulos];
    nuevos.splice(index, 1);
    setHorariosData(nuevos);
  };

  const updateModulo = (index: number, field: string, value: string) => {
    const nuevos = [...modulos];
    nuevos[index][field] = value;
    setHorariosData(nuevos);
  };

  // -- Gestión de Clases Específicas --
  const addClase = (mIndex: number) => {
    const nuevos = [...modulos];
    if (!nuevos[mIndex].clases_especificas) {
      nuevos[mIndex].clases_especificas = [];
    }
    nuevos[mIndex].clases_especificas.push({
      asignatura: "",
      dia_hora: "",
      docente: ""
    });
    setHorariosData(nuevos);
  };

  const updateClase = (mIndex: number, cIndex: number, field: string, value: string) => {
    const nuevos = [...modulos];
    nuevos[mIndex].clases_especificas[cIndex][field] = value;
    setHorariosData(nuevos);
  };

  const removeClase = (mIndex: number, cIndex: number) => {
    const nuevos = [...modulos];
    nuevos[mIndex].clases_especificas.splice(cIndex, 1);
    setHorariosData(nuevos);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="bg-brand-50 p-6 rounded-2xl border border-brand-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-black text-brand-950 flex items-center gap-2 mb-1">
            <Clock className="w-5 h-5 text-brand-600" /> Sistema Híbrido de Horarios
          </h3>
          <p className="text-sm text-muted-foreground">Puedes crear bloques de horarios genéricos (Ej: "Fines de Semana") o detallar curso por curso.</p>
        </div>
        <button
          type="button"
          onClick={addModulo}
          className="shrink-0 flex items-center gap-2 bg-brand-950 text-white px-5 py-2.5 rounded-xl hover:bg-black transition-all shadow-sm font-bold text-sm"
        >
          <Plus className="w-4 h-4" /> Nuevo Bloque
        </button>
      </div>

      <div className="grid gap-8">
        {modulos.map((modulo, mIndex) => (
          <div key={mIndex} className="bg-white rounded-3xl border border-border shadow-md overflow-hidden relative">
            
            {/* Header del Módulo */}
            <div className="p-6 border-b border-border bg-gradient-to-b from-white to-muted/20">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-1.5">Título del Módulo/Bloque</label>
                    <input
                      type="text"
                      value={modulo.titulo_modulo}
                      onChange={(e) => updateModulo(mIndex, 'titulo_modulo', e.target.value)}
                      className="w-full bg-transparent border-b-2 border-dashed border-border focus:border-brand-500 outline-none text-xl font-black text-brand-950 pb-1 transition-colors"
                      placeholder="Ej: Horario Regular (Semestral)"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-1.5">Descripción General / Reglas</label>
                    <textarea
                      value={modulo.descripcion_general}
                      onChange={(e) => updateModulo(mIndex, 'descripcion_general', e.target.value)}
                      className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none text-sm transition-all resize-none"
                      placeholder="Ej: Sábados y Domingos de 8:00 am a 1:00 pm. Modalidad Híbrida mediante Microsoft Teams."
                      rows={2}
                    />
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => removeModulo(mIndex)}
                  className="p-2 text-muted-foreground hover:bg-red-50 hover:text-red-600 rounded-xl transition-all border border-transparent hover:border-red-100"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Detalle Opcional (Clases Específicas) */}
            <div className="p-6 bg-muted/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-brand-950 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-muted-foreground" />
                  Detalle Específico (Opcional)
                </h4>
                <button
                  type="button"
                  onClick={() => addClase(mIndex)}
                  className="flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-800 bg-brand-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Añadir Curso/Clase
                </button>
              </div>

              {modulo.clases_especificas && modulo.clases_especificas.length > 0 ? (
                <div className="space-y-3">
                  {modulo.clases_especificas.map((clase: any, cIndex: number) => (
                    <div key={cIndex} className="flex flex-col lg:flex-row gap-3 bg-white p-3 rounded-xl border border-border shadow-sm items-center">
                      <div className="flex-1 w-full">
                        <input
                          type="text"
                          value={clase.asignatura}
                          onChange={(e) => updateClase(mIndex, cIndex, 'asignatura', e.target.value)}
                          className="w-full text-sm border-0 focus:ring-0 bg-transparent font-bold placeholder:font-normal"
                          placeholder="Nombre de la asignatura"
                        />
                      </div>
                      <div className="w-full lg:w-64 relative">
                        <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          value={clase.dia_hora}
                          onChange={(e) => updateClase(mIndex, cIndex, 'dia_hora', e.target.value)}
                          className="w-full text-sm border border-border rounded-lg py-2 pl-9 pr-3 focus:ring-2 focus:ring-brand-500/20"
                          placeholder="Día y hora (Ej: Vie 18:00)"
                        />
                      </div>
                      <div className="w-full lg:w-64 relative flex items-center gap-2">
                        <div className="relative flex-1">
                          <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input
                            type="text"
                            value={clase.docente}
                            onChange={(e) => updateClase(mIndex, cIndex, 'docente', e.target.value)}
                            className="w-full text-sm border border-border rounded-lg py-2 pl-9 pr-3 focus:ring-2 focus:ring-brand-500/20"
                            placeholder="Docente (Opcional)"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeClase(mIndex, cIndex)}
                          className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 bg-white rounded-xl border border-dashed border-border">
                  <p className="text-xs text-muted-foreground">Si no añades clases específicas, solo se mostrará la descripción general (Ideal para horarios en bloque).</p>
                </div>
              )}
            </div>

          </div>
        ))}

        {modulos.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-border rounded-[3rem]">
            <Clock className="w-10 h-10 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground font-medium mb-4">Aún no has configurado bloques de horarios.</p>
            <button
              type="button"
              onClick={addModulo}
              className="inline-flex items-center gap-2 bg-white border border-border text-brand-950 px-5 py-2.5 rounded-xl hover:bg-muted transition-all shadow-sm font-bold text-sm"
            >
              <Plus className="w-4 h-4" /> Empezar a crear
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
