"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NoticiaService } from "@/lib/services/noticia-service";
import { Noticia } from "@/types/noticia";
import {
  Plus,
  Pencil,
  Trash2,
  CheckCircle,
  Calendar
} from "lucide-react";

export default function AdminNoticiasPage() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNoticias = async () => {
    try {
      const response = await NoticiaService.getAllAdmin();
      const data = Array.isArray(response) ? response : (response?.data || []);
      setNoticias(data);
    } catch {
      console.error("Error al cargar noticias:");
      setNoticias([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta noticia?")) {
      try {
        await NoticiaService.delete(id);
        fetchNoticias();
      } catch {
        alert("Error al eliminar");
      }
    }
  };

  if (loading) return <div className="p-8 text-center text-muted-foreground">Cargando noticias...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-serif font-bold text-brand-950">Noticias</h2>
          <p className="text-muted-foreground">Gestiona las novedades y comunicados.</p>
        </div>
        <Link 
          href="/admin/portal/noticias/nuevo" 
          className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" /> Nueva Noticia
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Título</th>
              <th className="px-6 py-4">Fecha</th>
              <th className="px-6 py-4 text-center">Estado</th>
              <th className="px-6 py-4 text-center">Destacada</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {!noticias || noticias.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                  No hay noticias registradas.
                </td>
              </tr>
            ) : (
              noticias.map((noticia) => (
                <tr key={noticia.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-brand-950 max-w-md truncate">
                    {noticia.titulo}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {noticia.fecha_publicacion}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      noticia.estado === 'publicado' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {noticia.estado === 'publicado' ? 'Publicado' : 'Borrador'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {noticia.destacada ? (
                      <CheckCircle className="h-4 w-4 text-brand-600 mx-auto" />
                    ) : (
                      <span className="text-muted-foreground/30">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/admin/portal/noticias/${noticia.id}`}
                        className="inline-flex items-center justify-center h-8 w-8 text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors border border-brand-200"
                        title="Editar noticia"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(noticia.id)}
                        className="inline-flex items-center justify-center h-8 w-8 text-destructive bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200"
                        title="Eliminar noticia"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
