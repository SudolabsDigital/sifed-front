"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NoticiaService } from "@/lib/services/noticia-service";
import { Noticia } from "@/types/noticia";
import { Save, Upload, ImageIcon, Loader2 } from "lucide-react";

interface NoticiaFormProps {
  initialData?: Noticia;
}

export function NoticiaForm({ initialData }: NoticiaFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(initialData?.imagen_url || null);
  
  const isEditing = !!initialData;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    // Manejo de checkbox
    if (!formData.has('destacada')) {
        formData.append('destacada', '0');
    } else {
        formData.set('destacada', '1');
    }

    try {
      if (isEditing && initialData) {
        await NoticiaService.update(initialData.id, formData);
      } else {
        await NoticiaService.create(formData);
      }
      router.push("/admin/portal/noticias");
      router.refresh();
    } catch (error) {
      console.error("Error saving noticia:", error);
      alert("Error al guardar la noticia. Verifica los campos.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tamaño (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("La imagen no debe superar los 5MB");
        e.target.value = "";
        return;
      }
      
      // Validar tipo
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        alert("Formato no compatible. Solo JPG, PNG o WEBP.");
        e.target.value = "";
        return;
      }

      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-border shadow-sm p-6 md:p-8 space-y-8">
      
      {/* Título */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-brand-950">Título de la noticia</label>
        <input 
          name="titulo"
          required
          type="text" 
          defaultValue={initialData?.titulo}
          placeholder="Ej: Ceremonia de Graduación 2026"
          className="w-full px-4 py-2 rounded-lg border border-input focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Fecha */}
         <div className="space-y-2">
          <label className="text-sm font-semibold text-brand-950">Fecha de Publicación</label>
          <input 
            name="fecha_publicacion"
            required
            type="date"
            // Formato YYYY-MM-DD necesario para input date
            defaultValue={initialData?.fecha_publicacion ? initialData.fecha_publicacion.split('T')[0] : new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2 rounded-lg border border-input focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </div>

        {/* Estado */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-brand-950">Estado</label>
          <select 
            name="estado"
            defaultValue={initialData?.estado || "borrador"}
            className="w-full px-4 py-2 rounded-lg border border-input focus:ring-2 focus:ring-brand-500 outline-none bg-white"
          >
            <option value="borrador">Borrador (Oculto)</option>
            <option value="publicado">Publicado (Visible)</option>
          </select>
        </div>
      </div>

      {/* Resumen */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-brand-950">Resumen corto</label>
        <textarea 
          name="resumen"
          rows={3}
          defaultValue={initialData?.resumen || ""}
          className="w-full px-4 py-2 rounded-lg border border-input focus:ring-2 focus:ring-brand-500 outline-none resize-none"
          placeholder="Breve descripción para la tarjeta (máx 500 caracteres)..."
        />
      </div>

      {/* Contenido */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-brand-950">Contenido Completo</label>
        <div className="relative">
           <textarea 
              name="contenido"
              required
              rows={12}
              defaultValue={initialData?.contenido}
              className="w-full px-4 py-2 rounded-lg border border-input focus:ring-2 focus:ring-brand-500 outline-none font-mono text-sm leading-relaxed"
              placeholder="Escribe aquí el contenido principal..."
           />
           <div className="flex justify-between mt-1 px-1">
             <p className="text-xs text-muted-foreground">Tip: Usa &lt;b&gt;negrita&lt;/b&gt;, &lt;i&gt;cursiva&lt;/i&gt; o &lt;br&gt; para saltos.</p>
             <p className="text-xs text-muted-foreground text-right">Soporta HTML básico</p>
           </div>
        </div>
      </div>

      {/* Imagen */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-brand-950">Imagen de Portada</label>
        <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer relative overflow-hidden group h-64">
          
          {preview ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity" />
          ) : null}

          <div className={`z-10 flex flex-col items-center text-center p-4 rounded-xl ${preview ? 'bg-white/90 backdrop-blur-sm shadow-sm' : ''}`}>
              <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                  {preview ? <ImageIcon className="h-5 w-5 text-brand-600" /> : <Upload className="h-5 w-5 text-muted-foreground" />}
              </div>
              <p className="text-sm font-medium text-brand-950">
                  {preview ? "Clic para cambiar imagen" : "Clic para subir imagen"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG, WEBP (Máx 5MB)
              </p>
          </div>
          
          <input 
              name="imagen"
              type="file" 
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageChange}
          />
        </div>
      </div>

      {/* Checks */}
      <div className="flex items-center gap-3 bg-uncp-gold/10 p-4 rounded-lg border border-uncp-gold/20">
          <input 
              type="checkbox" 
              name="destacada"
              id="destacada"
              defaultChecked={initialData?.destacada}
              className="h-5 w-5 text-brand-600 rounded border-gray-300 focus:ring-brand-500"
          />
          <label htmlFor="destacada" className="text-sm font-medium text-brand-950 cursor-pointer">
              Destacar esta noticia (aparecerá más grande en el portal)
          </label>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-border">
          <Link href="/admin/portal/noticias" className="px-6 py-2 text-sm font-medium text-muted-foreground hover:text-brand-950 transition-colors">
              Cancelar
          </Link>
          <button 
              type="submit" 
              disabled={loading}
              className="flex items-center gap-2 bg-brand-600 text-white px-6 py-2 rounded-lg hover:bg-brand-700 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {isEditing ? 'Actualizar Noticia' : 'Guardar Noticia'}
          </button>
      </div>

    </form>
  );
}
