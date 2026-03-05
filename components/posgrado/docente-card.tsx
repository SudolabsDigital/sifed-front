import Link from "next/link";
import { Docente } from "@/types/docente";
import { GraduationCap } from "lucide-react";
import SmartProfileImage from "@/components/ui/smart-profile-image";

export default function DocenteCard({ docente }: { docente: Docente }) {
  const formatText = (text: string) => {
    if (!text) return "";
    const lower = text.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const gradosList = (docente.grados || "")
    .split(".")
    .map((g) => g.trim())
    .filter((g) => g.length > 0);
  
  const gradoPrincipal = gradosList.length > 0 ? formatText(gradosList[0]) : "";

  return (
    <Link href={`/posgrado/plana-docente/${docente.slug}`} className="block outline-none focus-visible:ring-4 focus-visible:ring-brand-500 rounded-[1.5rem] group h-full">
      <div className="flex flex-col h-full bg-white border border-border shadow-sm group-hover:shadow-xl transition-all duration-300 rounded-[1.5rem] overflow-hidden group-hover:border-brand-200">
        
        {/* Contenedor de Imagen (Retrato Superior) */}
        <div className="relative aspect-[4/5] w-full bg-brand-50/50 overflow-hidden border-b border-border/50 shrink-0">
          <SmartProfileImage 
            src={docente.foto_url} 
            alt={docente.nombre_completo}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          {/* Pequeño gradiente sutil abajo para fusionar mejor si la imagen tiene cortes raros */}
          <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
        </div>

        {/* Sección de Texto Compacta */}
        <div className="p-4 flex flex-col flex-1 justify-between bg-white">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="inline-block px-2 py-0.5 bg-brand-100 text-brand-700 text-[8px] font-black uppercase tracking-widest rounded-md shrink-0">
                Docente {docente.categoria}
              </span>
            </div>
            
            <h3 className="font-serif text-base font-bold text-brand-950 leading-tight line-clamp-2 group-hover:text-brand-700 transition-colors">
              {docente.nombre_completo}
            </h3>
          </div>
          
          {gradoPrincipal && (
            <div className="flex items-start gap-1.5 mt-3 pt-3 border-t border-border/50">
              <GraduationCap className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-muted-foreground font-medium line-clamp-2 leading-snug">
                {gradoPrincipal}
              </p>
            </div>
          )}
        </div>
        
      </div>
    </Link>
  );
}
