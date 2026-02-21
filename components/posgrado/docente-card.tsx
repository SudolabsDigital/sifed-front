import Image from "next/image";
import { Docente } from "@/data/docentes";
import { GraduationCap } from "lucide-react";

export default function DocenteCard({ docente }: { docente: Docente }) {
  // Función para formatear texto (Mayúsculas -> Tipo Oración)
  const formatText = (text: string) => {
    if (!text) return "";
    const lower = text.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  // Separar grados por punto y filtrar vacíos
  const gradosList = docente.grados
    .split(".")
    .map((g) => g.trim())
    .filter((g) => g.length > 0);

  return (
    <div className="group bg-white border border-border/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center h-full hover:border-brand-200">
      
      {/* Contenedor de Imagen Compacto (Avatar Grande) */}
      <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-brand-50 shadow-inner group-hover:border-brand-100 transition-colors shrink-0">
        <Image
          src={docente.imagen}
          alt={docente.nombre}
          fill
          className="object-cover object-top"
          sizes="128px"
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col w-full">
        {/* Encabezado Centrado */}
        <div className="text-center mb-4">
          <h3 className="font-serif text-lg font-bold text-brand-950 mb-2 leading-snug group-hover:text-brand-700 transition-colors">
            {docente.nombre}
          </h3>
          <div className="w-8 h-0.5 bg-brand-100 mx-auto rounded-full group-hover:bg-brand-200 transition-colors" />
        </div>
        
        {/* Lista de Grados (Alineada izquierda para lectura) */}
        <div className="bg-brand-50/50 rounded-lg p-3 w-full flex-grow">
          <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-2 text-center">
            Formación Académica
          </p>
          <ul className="space-y-2.5">
            {gradosList.map((grado, index) => (
              <li key={index} className="flex items-start gap-2.5 text-sm text-foreground/80 leading-snug">
                <GraduationCap className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                <span className="text-pretty">{formatText(grado)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
