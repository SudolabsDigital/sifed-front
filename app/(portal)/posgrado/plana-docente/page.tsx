"use client";

import { useState, useEffect, useCallback } from "react";
import DocenteCard from "@/components/posgrado/docente-card";
import Pagination from "@/components/ui/pagination";
import { Search, GraduationCap, LayoutGrid, Loader2 } from "lucide-react";
import PageHero from "@/components/ui/page-hero";
import { docentesApi } from "@/lib/api/docentes";
import { Docente } from "@/types/docente";

export default function PlanaDocentePage() {
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("");
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0
  });

  const fetchDocentes = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const data = await docentesApi.getPortalList({
        page,
        search,
        categoria,
        per_page: 12
      });
      setDocentes(data.data);
      setPagination({
        current_page: data.current_page,
        last_page: data.last_page,
        total: data.total
      });
    } catch (error) {
      console.error("Error fetching docentes:", error);
    } finally {
      setLoading(false);
    }
  }, [search, categoria]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDocentes(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search, categoria, fetchDocentes]);

  const handlePageChange = (page: number) => {
    fetchDocentes(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
                onChange={(e) => setSearch(e.target.value)}
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
                onChange={(e) => setCategoria(e.target.value)}
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

          {/* Estado de carga o Grilla */}
          {loading ? (
            <div className="w-full py-20 flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 text-brand-500 animate-spin mb-4" />
              <p className="text-muted-foreground font-medium">Cargando plana docente...</p>
            </div>
          ) : docentes.length === 0 ? (
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
          {!loading && pagination.last_page > 1 && (
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
