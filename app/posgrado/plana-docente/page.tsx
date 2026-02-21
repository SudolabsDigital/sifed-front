"use client";

import { useState, useMemo } from "react";
import { docentes, Docente } from "@/data/docentes";
import DocenteCard from "@/components/posgrado/docente-card";
import Pagination from "@/components/ui/pagination";
import { ArrowDownAZ, GraduationCap, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 12;

type SortOption = "nombre" | "formacion";

export default function PlanaDocentePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>("nombre");

  // Lógica de ordenamiento memorizada
  const sortedDocentes = useMemo(() => {
    const list = [...docentes];
    
    if (sortBy === "nombre") {
      return list.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
    
    if (sortBy === "formacion") {
      return list.sort((a, b) => {
        const countA = a.grados.split(".").filter(g => g.trim().length > 0).length;
        const countB = b.grados.split(".").filter(g => g.trim().length > 0).length;
        return countB - countA; // Mayor a menor
      });
    }

    return list;
  }, [sortBy]);

  // Calcular índices para paginación basados en la lista ordenada
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentDocentes = sortedDocentes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedDocentes.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    setCurrentPage(1); // Resetear a la primera página al ordenar
  };

  return (
    <section className="w-full pt-20 pb-16 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-brand-600 uppercase bg-brand-50 rounded-full">
            Excelencia Académica
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-950 mb-6">
            Nuestra Plana Docente
          </h1>
          <p className="text-lg text-muted-foreground">
            Contamos con un destacado equipo de profesionales dedicados a la formación de investigadores y líderes educativos.
          </p>
        </div>

        {/* Barra de Filtros/Orden */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 p-4 bg-white border border-border rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <LayoutGrid className="w-5 h-5 text-brand-500" />
            <span className="text-sm font-medium">Mostrando {sortedDocentes.length} docentes</span>
          </div>

          <div className="flex items-center gap-2 p-1 bg-muted/50 rounded-xl border border-border">
            <button
              onClick={() => handleSortChange("nombre")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all",
                sortBy === "nombre" ? "bg-white text-brand-700 shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <ArrowDownAZ className="w-4 h-4" />
              Nombre
            </button>
            <button
              onClick={() => handleSortChange("formacion")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all",
                sortBy === "formacion" ? "bg-white text-brand-700 shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <GraduationCap className="w-4 h-4" />
              Formación
            </button>
          </div>
        </div>

        {/* Grilla de Docentes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentDocentes.map((docente) => (
            <DocenteCard key={docente.id} docente={docente} />
          ))}
        </div>

        {/* Paginación */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

      </div>
    </section>
  );
}
