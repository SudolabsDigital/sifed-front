"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NoticiaService } from "@/lib/services/noticia-service";
import { NoticiaCategoria } from "@/types/noticia-categoria";
import { Save, Layout, Palette, ListOrdered, Loader2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoriaFormProps {
  initialData?: NoticiaCategoria;
}

const STYLE_OPTIONS = [
  { id: 'green', label: 'Verde Institucional', color: 'bg-uncp-green' },
  { id: 'gold', label: 'Dorado Excelencia', color: 'bg-uncp-gold' },
  { id: 'blue', label: 'Azul Estudiantil', color: 'bg-blue-600' },
  { id: 'brand', label: 'Negro Prestigio', color: 'bg-brand-950' },
];

export function CategoriaForm({ initialData }: CategoriaFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categoriasExistentes, setCategoriasExistentes] = useState<NoticiaCategoria[]>([]);
  const [estiloSeleccionado, setEstiloSeleccionado] = useState<NoticiaCategoria['estilo_visual']>(initialData?.estilo_visual || 'green');
  
  const isEditing = !!initialData;

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await NoticiaService.getAllCategories();
            // Aseguramos que data sea un array y esté ordenado
            const sortedData = Array.isArray(data) ? [...data].sort((a, b) => a.orden - b.orden) : [];
            setCategoriasExistentes(sortedData.filter(c => c.id !== initialData?.id));
            
            if (initialData?.estilo_visual) {
                setEstiloSeleccionado(initialData.estilo_visual);
            }
        } catch (error: unknown) {
            console.error("Error al cargar datos del formulario:", error);
        }
    };
    fetchData();
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      nombre: formData.get('nombre') as string,
      descripcion: formData.get('descripcion') as string,
      orden: parseInt(formData.get('orden') as string),
      estilo_visual: estiloSeleccionado,
      activo: true
    };

    try {
      if (isEditing && initialData) {
        await NoticiaService.updateCategory(initialData.id, data);
      } else {
        await NoticiaService.createCategory(data);
      }
      router.push("/admin/portal/noticias");
      router.refresh();
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Error al guardar la sección. Verifica los campos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
        key={initialData?.id || 'new'}
        onSubmit={handleSubmit} 
        className="bg-white rounded-3xl border border-brand-100 shadow-sm p-8 md:p-12 space-y-10 max-w-4xl mx-auto"
    >
      
      <div className="space-y-6">
        {/* Nombre */}
        <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-brand-950 flex items-center gap-2">
                <Layout className="h-3.5 w-3.5 text-brand-600" /> Nombre de la Sección
            </label>
            <input 
                name="nombre"
                required
                type="text" 
                defaultValue={initialData?.nombre}
                placeholder="Ej: Investigación Avanzada"
                className="w-full px-6 py-4 rounded-2xl border border-brand-100 bg-brand-50/30 focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 outline-none transition-all font-bold text-brand-950"
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Orden Inteligente */}
            <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-brand-950 flex items-center gap-2">
                    <ListOrdered className="h-3.5 w-3.5 text-brand-600" /> Posición en la Exhibición
                </label>
                <select 
                    name="orden"
                    required
                    key={`orden-${initialData?.orden}`}
                    defaultValue={initialData?.orden || (categoriasExistentes.length + 1)}
                    className="w-full px-6 py-4 rounded-2xl border border-brand-100 bg-brand-50/30 focus:ring-4 focus:ring-brand-600/10 outline-none font-bold text-brand-950 bg-white"
                >
                    {!isEditing && <option value={1}>1 - Al principio</option>}
                    {isEditing && <option value={initialData?.orden}>{initialData?.orden} - Posición actual</option>}
                    
                    {categoriasExistentes.map((cat) => (
                        <option key={cat.id} value={cat.orden}>
                            {cat.orden} - Mover a la posición de: {cat.nombre}
                        </option>
                    ))}
                    
                    {!isEditing && (
                        <option value={categoriasExistentes.length + 1}>{categoriasExistentes.length + 1} - Al final</option>
                    )}
                </select>
                <p className="text-[10px] text-muted-foreground font-medium italic">
                    * Sistema Inteligente: Al insertar una sección aquí, las demás se desplazarán automáticamente.
                </p>
            </div>

            {/* Estilo Visual */}
            <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-brand-950 flex items-center gap-2">
                    <Palette className="h-3.5 w-3.5 text-brand-600" /> Estilo de Exhibición
                </label>
                <div className="flex items-center gap-3 p-2 bg-brand-50/50 rounded-2xl border border-brand-100">
                    {STYLE_OPTIONS.map((style) => (
                        <button
                            key={style.id}
                            type="button"
                            onClick={() => setEstiloSeleccionado(style.id as NoticiaCategoria['estilo_visual'])}
                            title={style.label}
                            className={cn(
                                "h-10 w-10 rounded-xl transition-all border-2",
                                style.color,
                                estiloSeleccionado === style.id ? "border-brand-600 scale-110 shadow-lg" : "border-transparent opacity-40 hover:opacity-100"
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>

        {/* Descripción */}
        <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-brand-950 flex items-center gap-2">
                <Info className="h-3.5 w-3.5 text-brand-600" /> Breve Introducción
            </label>
            <textarea 
                name="descripcion"
                rows={3}
                defaultValue={initialData?.descripcion || ""}
                placeholder="Describe qué tipo de contenido se mostrará en esta sección..."
                className="w-full px-6 py-4 rounded-2xl border border-brand-100 bg-brand-50/30 focus:ring-4 focus:ring-brand-600/10 outline-none resize-none font-medium text-brand-950/70"
            />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-4 pt-8 border-t border-brand-50">
          <Link href="/admin/portal/noticias" className="px-8 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-brand-950 transition-colors">
              Cancelar
          </Link>
          <button 
              type="submit" 
              disabled={loading}
              className="flex items-center gap-3 bg-brand-950 text-white px-10 py-4 rounded-2xl hover:bg-black transition-all shadow-xl shadow-black/20 disabled:opacity-50 font-black text-xs uppercase tracking-widest"
          >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {isEditing ? 'Actualizar Sección' : 'Crear Sección'}
          </button>
      </div>

    </form>
  );
}
