"use client";

import { useState } from "react";
import useSWR from "swr";
import DocenteCard from "@/components/posgrado/docente-card";
import Pagination from "@/components/ui/pagination";
import { Search, GraduationCap, LayoutGrid, Loader2 } from "lucide-react";
import PageHero from "@/components/ui/page-hero";
import { docentesApi } from "@/lib/api/docentes";
import { Docente } from "@/types/docente";

// Función "fetcher" que SWR usará para obtener los datos
const fetcher = async ([, params]: [string, Record<string, unknown>]) => {
  return await docentesApi.getPortalList(params);
};

export default function PlanaDocentePage() {
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("");
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useSWR(
    ['/api/portal/docentes', { search, categoria, page, per_page: 12 }],
    fetcher,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    }
  );

  const docentes: Docente[] = data?.data || [];
  const pagination = {
    current_page: data?.current_page || 1,
    last_page: data?.last_page || 1,
    total: data?.total || 0,
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Al escribir en la búsqueda, regresamos siempre a la página 1
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoria(e.target.value);
    setPage(1);
  };

  return (
    <>
      <PageHero
        title="PLANA DOCENTE"
        subtitle="EXCELENCIA ACADÉMICA"
        description="Contamos con un destacado equipo de profesionales dedicados a la formación de investigadores y líderes educativos."
        imageSrc="/images/portada-5.webp"
        size="compact"
        align="center"
        breadcrumbs={[
          { label: "Posgrado", href: "/posgrado" },
          { label: "Plana Docente" }
        ]}
      />

      <section className="w-full py-16 px-4 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          
          {/* Barra de Filtros/Búsqueda */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 p-4 bg-white border border-border rounded-2xl shadow-sm">
            <div className="flex-1 relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Buscar docente por nombre o especialidad..."
                className="w-full pl-11 pr-4 py-2.5 bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm"
                value={search}
                onChange={handleSearchChange}
              />
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2 text-muted-foreground">
                <LayoutGrid className="w-5 h-5 text-brand-500" />
                <span className="text-sm font-medium">
                  {pagination.total} {pagination.total === 1 ? 'docente' : 'docentes'}
                </span>
              </div>
              
              <select 
                className="py-2.5 px-4 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm appearance-none cursor-pointer"
                value={categoria}
                onChange={handleCategoriaChange}
              >
                <option value="">Todas las categorías</option>
                <option value="principal">Principal</option>
                <option value="asociado">Asociado</option>
                <option value="auxiliar">Auxiliar</option>
                <option value="contratado">Contratado</option>
                <option value="invitado">Invitado</option>
              </select>
            </div>
          </div>

          {/* Estado de Error */}
          {error && (
            <div className="w-full py-20 flex flex-col items-center justify-center text-center bg-red-50 rounded-2xl border border-red-200">
              <p className="text-red-600 font-bold mb-2">Error al conectar con el servidor</p>
              <p className="text-red-500/80 text-sm">No pudimos cargar la plana docente. Por favor intenta recargar la página.</p>
            </div>
          )}

          {/* Estado de carga inicial (Solo se muestra la primera vez que carga todo) */}
          {isLoading && docentes.length === 0 && !error ? (
            <div className="w-full py-20 flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 text-brand-500 animate-spin mb-4" />
              <p className="text-muted-foreground font-medium">Cargando plana docente...</p>
            </div>
          ) : !isLoading && docentes.length === 0 && !error ? (
            <div className="w-full py-20 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-border">
              <GraduationCap className="w-16 h-16 text-brand-200 mb-4" />
              <h3 className="text-xl font-bold text-brand-950 mb-2">No se encontraron docentes</h3>
              <p className="text-muted-foreground">Intenta ajustar tu búsqueda o filtros.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {docentes.map((docente) => (
                <DocenteCard key={docente.id} docente={docente} />
              ))}
            </div>
          )}

          {/* Paginación */}
          {pagination.last_page > 1 && !error && (
            <div className="mt-12">
              <Pagination
                currentPage={pagination.current_page}
                totalPages={pagination.last_page}
                onPageChange={handlePageChange}
              />
            </div>
          )}

        </div>
      </section>
    </>
  );
}
