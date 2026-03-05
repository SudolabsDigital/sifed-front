"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  FileText, 
  Eye, 
  EyeOff, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Loader2
} from "lucide-react";
import { docentesApi } from "@/lib/api/docentes";
import { getStorageUrl, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Docente {
  id: number;
  nombre_completo: string;
  slug: string;
  grados: string;
  foto_url: string;
  categoria: string;
  estado: string;
  config_visibilidad: {
    mostrar_cv: boolean;
    mostrar_bio: boolean;
    mostrar_redes: boolean;
  };
}

export default function DocentesAdminPage() {
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("");
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0
  });
  const { showToast } = useToast();

  const fetchDocentes = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const data = await docentesApi.getAll({ 
        page, 
        search, 
        categoria,
        per_page: 10 
      });
      setDocentes(data.data);
      setPagination({
        current_page: data.current_page,
        last_page: data.last_page,
        total: data.total
      });
    } catch (error) {
      console.error("Error fetching docentes:", error);
      showToast("Error al cargar la lista de docentes", "error");
    } finally {
      setLoading(false);
    }
  }, [search, categoria, showToast]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDocentes(1);
    }, 500); // Debounce de búsqueda
    return () => clearTimeout(timer);
  }, [search, categoria, fetchDocentes]);

  const handleToggleVisibility = async (id: number, field: string, currentValue: boolean) => {
    try {
      await docentesApi.toggleVisibility(id, field, !currentValue);
      setDocentes(prev => prev.map(d => 
        d.id === id 
          ? { ...d, config_visibilidad: { ...d.config_visibilidad, [field]: !currentValue } }
          : d
      ));
      showToast("Visibilidad actualizada", "success");
    } catch (error) {
      showToast("Error al actualizar visibilidad", "error");
    }
  };

  const handleDelete = async (id: number, nombre: string) => {
    if (!confirm(`¿Estás seguro de eliminar a "${nombre}"? Esta acción no se puede deshacer.`)) return;
    
    try {
      await docentesApi.delete(id);
      showToast("Docente eliminado exitosamente", "success");
      fetchDocentes(pagination.current_page);
    } catch (error) {
      showToast("Error al eliminar docente", "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-brand-950">Plana Docente</h2>
          <p className="text-muted-foreground">Gestiona el directorio de profesionales académicos de la facultad.</p>
        </div>
        <Link 
          href="/admin/portal/docentes/nuevo"
          className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus className="w-5 h-5" />
          Nuevo Docente
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-4 bg-white p-4 rounded-2xl border border-border shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o formación..."
            className="w-full pl-11 pr-4 py-2.5 bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <select 
              className="pl-10 pr-8 py-2.5 bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm appearance-none cursor-pointer"
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
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-50/50 border-b border-border">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-brand-900">Docente</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-brand-900">Categoría</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-brand-900">Visibilidad</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-brand-900">Estado</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-brand-900 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <Loader2 className="w-10 h-10 text-brand-500 animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground font-medium">Cargando docentes...</p>
                  </td>
                </tr>
              ) : docentes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground font-medium">No se encontraron docentes</p>
                  </td>
                </tr>
              ) : (
                docentes.map((docente) => (
                  <tr key={docente.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-brand-50 overflow-hidden border border-brand-100 flex-shrink-0 shadow-sm transition-transform group-hover:scale-105">
                          {docente.foto_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img 
                              src={getStorageUrl(docente.foto_url)} 
                              alt={docente.nombre_completo} 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-brand-300">
                              <Users className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-brand-950 truncate max-w-[200px]">{docente.nombre_completo}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[250px]">{docente.grados}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
                        docente.categoria === "principal" ? "bg-blue-50 text-blue-700 border border-blue-100" :
                        docente.categoria === "asociado" ? "bg-indigo-50 text-indigo-700 border border-indigo-100" :
                        "bg-slate-50 text-slate-700 border border-slate-100"
                      )}>
                        {docente.categoria}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleToggleVisibility(docente.id, 'mostrar_cv', docente.config_visibilidad?.mostrar_cv)}
                          title="CV"
                          className={cn(
                            "p-1.5 rounded-lg transition-all",
                            docente.config_visibilidad?.mostrar_cv ? "bg-green-50 text-green-600 hover:bg-green-100" : "bg-muted text-muted-foreground hover:bg-muted-foreground/10"
                          )}
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleToggleVisibility(docente.id, 'mostrar_bio', docente.config_visibilidad?.mostrar_bio)}
                          title="Biografía"
                          className={cn(
                            "p-1.5 rounded-lg transition-all",
                            docente.config_visibilidad?.mostrar_bio ? "bg-purple-50 text-purple-600 hover:bg-purple-100" : "bg-muted text-muted-foreground hover:bg-muted-foreground/10"
                          )}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          docente.estado === "activo" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-red-500"
                        )} />
                        <span className="text-xs font-bold capitalize">{docente.estado}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/posgrado/plana-docente/${docente.slug}`}
                          target="_blank"
                          className="p-2 text-muted-foreground hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link 
                          href={`/admin/portal/docentes/${docente.id}/edit`}
                          className="p-2 text-muted-foreground hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(docente.id, docente.nombre_completo)}
                          className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        {!loading && pagination.total > 0 && (
          <div className="px-6 py-4 bg-brand-50/30 border-t border-border flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Mostrando <span className="font-bold text-brand-950">{(pagination.current_page - 1) * 10 + 1}</span> a <span className="font-bold text-brand-950">{Math.min(pagination.current_page * 10, pagination.total)}</span> de <span className="font-bold text-brand-950">{pagination.total}</span> docentes
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => fetchDocentes(pagination.current_page - 1)}
                disabled={pagination.current_page === 1}
                className="p-2 rounded-xl border border-border bg-white hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-brand-950 px-2">
                Página {pagination.current_page} de {pagination.last_page}
              </span>
              <button 
                onClick={() => fetchDocentes(pagination.current_page + 1)}
                disabled={pagination.current_page === pagination.last_page}
                className="p-2 rounded-xl border border-border bg-white hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
