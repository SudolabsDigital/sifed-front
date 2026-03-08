"use client";

import { cn } from "@/lib/utils";
import { ConfigVisibilidad } from "@/types/programa";

interface ConfigTabProps {
  configData: ConfigVisibilidad;
  setConfigData: (data: ConfigVisibilidad) => void;
}

export function ConfigTab({ configData, setConfigData }: ConfigTabProps) {
  
  const toggleSetting = (key: keyof ConfigVisibilidad) => {
    setConfigData({
      ...configData,
      [key]: !configData[key]
    });
  };

  const configOptions: {
    id: keyof ConfigVisibilidad;
    title: string;
    desc: string;
    activeColor: string;
  }[] = [
    {
      id: "mostrar_en_hero",
      title: "Mostrar en Hero Principal (Home)",
      desc: "Habilita que este programa aparezca en el gran carrusel de la página de inicio. Requiere que hayas subido la Imagen de Hero.",
      activeColor: "bg-purple-600"
    },
    {
      id: "mostrar_admision",
      title: "Módulo de Admisión e Inversión",
      desc: "Muestra u oculta la sección de costos, inversión y requisitos en el portal público.",
      activeColor: "bg-blue-600"
    },
    {
      id: "mostrar_plan_estudio",
      title: "Malla Curricular",
      desc: "Muestra la tabla del plan de estudios con los ciclos y asignaturas.",
      activeColor: "bg-emerald-600"
    },
    {
      id: "mostrar_horarios",
      title: "Horarios",
      desc: "Muestra la pestaña de horarios con los módulos que hayas configurado.",
      activeColor: "bg-amber-600"
    },
    {
      id: "mostrar_perfiles",
      title: "Perfiles Académicos",
      desc: "Muestra el perfil del ingresante y perfil del egresado.",
      activeColor: "bg-slate-700"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="bg-white p-8 rounded-3xl border border-border shadow-sm">
        <div className="mb-8">
          <h3 className="text-xl font-black text-brand-950 mb-2">Control de Visibilidad Global</h3>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Enciende o apaga pestañas completas del portal público. Ideal para ocultar módulos cuando no hay convocatorias activas o si el programa aún está en estructuración, sin necesidad de borrar los datos.
          </p>
        </div>

        <div className="grid gap-4">
          {configOptions.map((opt) => {
            const isActive = configData[opt.id] ?? true; // Por defecto true si no está definido
            
            return (
              <div 
                key={opt.id}
                onClick={() => toggleSetting(opt.id)}
                className={cn(
                  "flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer group",
                  isActive ? "border-brand-200 bg-brand-50/30" : "border-border bg-white hover:border-brand-100 opacity-70"
                )}
              >
                <div className="flex flex-col">
                  <span className={cn("font-bold text-base transition-colors", isActive ? "text-brand-950" : "text-muted-foreground")}>{opt.title}</span>
                  <span className="text-sm text-muted-foreground mt-1">{opt.desc}</span>
                </div>

                <div className="ml-4 shrink-0">
                  <div className={cn(
                    "relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ease-in-out",
                    isActive ? opt.activeColor : "bg-muted-foreground/30"
                  )}>
                    <span
                      className={cn(
                        "inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-300 ease-in-out",
                        isActive ? "translate-x-6" : "translate-x-1"
                      )}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
