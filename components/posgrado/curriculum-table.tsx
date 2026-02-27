import { Ciclo } from "@/types/curriculum";
import { cn } from "@/lib/utils";

export default function CurriculumTable({ ciclo }: { ciclo: Ciclo }) {
  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col h-full">
      {/* Header del Ciclo */}
      <div className="bg-brand-950 px-6 py-4 flex justify-between items-center">
        <h4 className="font-serif text-xl font-bold text-white">Ciclo {ciclo.numero}</h4>
        <span className="bg-uncp-gold/20 text-uncp-gold text-xs font-black px-2.5 py-1 rounded-full border border-uncp-gold/30 uppercase tracking-tighter">
          {ciclo.totalCreditos} Créditos
        </span>
      </div>

      {/* Tabla de Contenido */}
      <div className="p-0 flex-grow">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-muted/30 text-muted-foreground text-[10px] uppercase tracking-widest font-black border-b border-border">
              <th className="px-6 py-3 text-left">Asignatura</th>
              <th className="px-6 py-3 text-right w-20">Créditos</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {ciclo.asignaturas.map((materia, idx) => (
              <tr key={idx} className={cn(
                "group transition-colors",
                materia.isElectivo ? "bg-brand-50/30" : "hover:bg-muted/20"
              )}>
                <td className="px-6 py-4 text-foreground font-medium leading-snug">
                  {materia.nombre}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex flex-col items-end">
                    <span className="font-bold text-brand-600">
                      {materia.creditos || "—"}
                    </span>
                    {materia.isElectivo && (
                      <span className="text-[9px] uppercase tracking-tighter text-brand-400 font-bold leading-none mt-1">
                        Opcional
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-brand-50/50">
              <td className="px-6 py-4 text-brand-950 font-black uppercase tracking-tight">Total Ciclo</td>
              <td className="px-6 py-4 text-right font-black text-brand-700 text-base">{ciclo.totalCreditos}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
