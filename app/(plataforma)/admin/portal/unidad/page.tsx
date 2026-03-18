"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { 
  Building, Users, Phone, Save, 
  Loader2, ImageIcon, Eye, Plus, X, Trash2
} from "lucide-react";
import { unidadPosgradoApi, Autoridad, DirectorioContacto } from "@/lib/api/unidad-posgrado";
import { useToast } from "@/components/ui/toast";
import { BackButton } from "@/components/ui/BackButton";
import { cn, getStorageUrl } from "@/lib/utils";
import TabSelector from "@/components/ui/tab-selector";
import { handleApiError } from "@/lib/error-handler";
import { AxiosError } from "axios";

export default function UnidadPosgradoAdminPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("identidad");
  
  // Estado de errores de validación por campo
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const [formData, setFormData] = useState({
    mision: "",
    vision: "",
    historia: "",
    config_visibilidad: {
      mostrar_mision: true,
      mostrar_vision: true,
      mostrar_autoridades: true,
      mostrar_directorio: true,
      mostrar_organigrama: true,
    }
  });

  const [autoridades, setAutoridades] = useState<Autoridad[]>([]);
  const [directorio, setDirectorio] = useState<DirectorioContacto[]>([]);
  const [autoridadesFiles, setAutoridadesFiles] = useState<Record<number, File>>({});

  const [organigramaFile, setOrganigramaFile] = useState<File | null>(null);
  const [currentOrganigrama, setCurrentOrganigrama] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const data = await unidadPosgradoApi.getAdmin();
      setFormData({
        mision: data.mision || "",
        vision: data.vision || "",
        historia: data.historia || "",
        config_visibilidad: data.config_visibilidad || {
          mostrar_mision: true,
          mostrar_vision: true,
          mostrar_autoridades: true,
          mostrar_directorio: true,
          mostrar_organigrama: true,
        }
      });
      setAutoridades(data.autoridades_json || []);
      setDirectorio(data.directorio_json || []);
      setCurrentOrganigrama(data.organigrama_url);
    } catch {
      showToast("Error al cargar la información institucional.", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFieldErrors({}); // Limpiar errores previos

    try {
      const form = new FormData();
      form.append("mision", formData.mision);
      form.append("vision", formData.vision);
      form.append("historia", formData.historia);
      form.append("config_visibilidad", JSON.stringify(formData.config_visibilidad));
      form.append("directorio_json", JSON.stringify(directorio));
      
      // Preparar autoridades JSON (sin los archivos, esos van aparte)
      form.append("autoridades_json", JSON.stringify(autoridades));
      
      // Adjuntar archivos de autoridades
      Object.entries(autoridadesFiles).forEach(([index, file]) => {
        form.append(`foto_autoridad_${index}`, file);
      });

      if (organigramaFile) {
        form.append("organigrama", organigramaFile);
      }

      await unidadPosgradoApi.update(form);
      showToast("Información institucional actualizada exitosamente.", "success");
      setAutoridadesFiles({}); 
      router.refresh(); 
      fetchData(); 
    } catch (err) {
      // Capturar errores de validación 422 para mostrar feedback inteligente en los inputs
      if (err instanceof AxiosError && err.response?.status === 422) {
        setFieldErrors(err.response.data.errors || {});
        showToast("Por favor, corrija los errores en el formulario.", "error");
      } else {
        handleApiError(err, showToast, "Ocurrió un error al guardar los cambios.");
      }
    } finally {
      setSaving(false);
    }
  };

  // HANDLERS PARA DIRECTORIO
  const addDirectorio = () => {
    const newItem: DirectorioContacto = {
      id: Math.random().toString(36).substr(2, 9),
      area: "",
      telefono: "",
      email: "",
      orden: directorio.length
    };
    setDirectorio([...directorio, newItem]);
  };

  const removeDirectorio = (index: number) => {
    setDirectorio(directorio.filter((_, i) => i !== index));
  };

  const updateDirectorio = (index: number, field: keyof DirectorioContacto, value: string) => {
    const newDir = [...directorio];
    newDir[index] = { ...newDir[index], [field]: value };
    setDirectorio(newDir);
  };

  // HANDLERS PARA AUTORIDADES
  const addAutoridad = () => {
    const newItem: Autoridad = {
      id: Math.random().toString(36).substr(2, 9),
      nombre: "",
      cargo: "",
      resumen: "",
      orden: autoridades.length
    };
    setAutoridades([...autoridades, newItem]);
  };

  const removeAutoridad = (index: number) => {
    setAutoridades(autoridades.filter((_, i) => i !== index));
    // También quitar archivo si existía en cola
    const newFiles = { ...autoridadesFiles };
    delete newFiles[index];
    setAutoridadesFiles(newFiles);
  };

  const updateAutoridad = (index: number, field: keyof Autoridad, value: string) => {
    const newAut = [...autoridades];
    newAut[index] = { ...newAut[index], [field]: value };
    setAutoridades(newAut);
  };

  const handleAutoridadFile = (index: number, file: File) => {
    setAutoridadesFiles({ ...autoridadesFiles, [index]: file });
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
      </div>
    );
  }

  const tabOptions = [
    { id: "identidad", label: "Identidad", icon: <Building className="w-4 h-4" /> },
    { id: "autoridades", label: "Autoridades", icon: <Users className="w-4 h-4" /> },
    { id: "directorio", label: "Directorio", icon: <Phone className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <BackButton label="Volver a Gestión" />
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Unidad de Posgrado
          </h1>
          <p className="text-sm text-gray-500">
            Gestiona la información institucional y la visibilidad del módulo público.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-50 transition-all"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Guardar Cambios
        </button>
      </div>

      <TabSelector 
        options={tabOptions} 
        activeTab={activeTab} 
        onChange={setActiveTab} 
        className="mb-6"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Config (Shared) */}
        <div className="lg:col-span-1 space-y-6">
          {/* Cover Image / Organigrama */}
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
            <h3 className="font-bold text-brand-950 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-brand-500" />
              Organigrama Institucional
            </h3>
            
            <div className="flex flex-col gap-4">
              <div className={cn(
                "aspect-[4/3] w-full rounded-xl overflow-hidden border bg-muted/30 relative flex items-center justify-center transition-colors",
                fieldErrors.organigrama ? "border-red-500 bg-red-50/10" : "border-border"
              )}>
                {organigramaFile ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={URL.createObjectURL(organigramaFile)} alt="Preview" className="w-full h-full object-contain p-2" />
                ) : currentOrganigrama ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={getStorageUrl(currentOrganigrama)} alt="Organigrama actual" className="w-full h-full object-contain p-2" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                    <span className="text-xs font-medium">Sin organigrama</span>
                  </div>
                )}
              </div>
              
              <label className="cursor-pointer flex items-center justify-center w-full px-4 py-2 bg-brand-50 text-brand-700 hover:bg-brand-100 rounded-xl transition-colors text-sm font-semibold border border-brand-200">
                Cambiar Imagen
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) setOrganigramaFile(e.target.files[0]);
                  }}
                />
              </label>
              {fieldErrors.organigrama && (
                <p className="text-[10px] text-red-500 font-bold text-center mt-1 animate-in fade-in duration-300">
                  {fieldErrors.organigrama[0]}
                </p>
              )}
            </div>
          </div>

          {/* Visibility Settings */}
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
            <h3 className="font-bold text-brand-950 flex items-center gap-2">
              <Eye className="w-5 h-5 text-brand-500" />
              Visibilidad Pública
            </h3>
            <div className="space-y-4">
              {Object.entries(formData.config_visibilidad).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border border-border/50">
                  <span className="text-xs font-bold capitalize text-brand-900">
                    {key.replace('mostrar_', '').replace('_', ' ')}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      config_visibilidad: { ...formData.config_visibilidad, [key as keyof typeof formData.config_visibilidad]: !value }
                    })}
                    className={cn(
                      "w-10 h-5 rounded-full transition-all relative outline-none",
                      value ? "bg-emerald-500" : "bg-muted-foreground/30"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                      value ? "right-1" : "left-1"
                    )} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Information Forms */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* TAB: IDENTIDAD */}
          {activeTab === "identidad" && (
            <div className="bg-white p-8 rounded-2xl border border-border shadow-sm space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="font-bold text-brand-950 flex items-center gap-2">
                <Building className="w-5 h-5 text-brand-500" />
                Identidad Institucional
              </h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Historia y Reseña</label>
                  <textarea
                    rows={8}
                    placeholder="Redacte la historia..."
                    className={cn(
                      "w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-sm font-medium",
                      fieldErrors.historia ? "bg-red-50/30 border-red-300" : "bg-muted/30 border-border"
                    )}
                    value={formData.historia}
                    onChange={(e) => setFormData({...formData, historia: e.target.value})}
                  />
                  {fieldErrors.historia && (
                    <p className="text-[10px] text-red-500 font-bold animate-in fade-in duration-300">
                      {fieldErrors.historia[0]}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Misión</label>
                    <textarea
                      rows={6}
                      className={cn(
                        "w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-sm font-medium",
                        fieldErrors.mision ? "bg-red-50/30 border-red-300" : "bg-muted/30 border-border"
                      )}
                      value={formData.mision}
                      onChange={(e) => setFormData({...formData, mision: e.target.value})}
                    />
                    {fieldErrors.mision && (
                      <p className="text-[10px] text-red-500 font-bold animate-in fade-in duration-300">
                        {fieldErrors.mision[0]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Visión</label>
                    <textarea
                      rows={6}
                      className={cn(
                        "w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-sm font-medium",
                        fieldErrors.vision ? "bg-red-50/30 border-red-300" : "bg-muted/30 border-border"
                      )}
                      value={formData.vision}
                      onChange={(e) => setFormData({...formData, vision: e.target.value})}
                    />
                    {fieldErrors.vision && (
                      <p className="text-[10px] text-red-500 font-bold animate-in fade-in duration-300">
                        {fieldErrors.vision[0]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: AUTORIDADES */}
          {activeTab === "autoridades" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-brand-950 flex items-center gap-2 text-xl">
                  <Users className="w-6 h-6 text-brand-500" />
                  Listado de Autoridades
                </h3>
                <button
                  type="button"
                  onClick={addAutoridad}
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-50 px-4 py-2 text-xs font-bold text-brand-600 hover:bg-brand-100 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Agregar Autoridad
                </button>
              </div>

              <div className="space-y-4">
                {autoridades.map((aut, idx) => (
                  <div key={aut.id} className="bg-white p-6 rounded-2xl border border-border shadow-sm relative group">
                    <button
                      type="button"
                      onClick={() => removeAutoridad(idx)}
                      className="absolute top-4 right-4 p-2 text-muted-foreground hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {/* Foto Autoridad */}
                      <div className="md:col-span-1 space-y-3">
                        <div className="aspect-square w-full rounded-xl overflow-hidden border border-border bg-muted/20 relative">
                          {(autoridadesFiles[idx] || aut.foto_url) ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img 
                              src={autoridadesFiles[idx] ? URL.createObjectURL(autoridadesFiles[idx]) : getStorageUrl(aut.foto_url)} 
                              alt={aut.nombre} 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-brand-200">
                              <Users className="w-10 h-10" />
                            </div>
                          )}
                        </div>
                        <label className="cursor-pointer flex items-center justify-center w-full px-3 py-1.5 bg-brand-50 text-brand-700 hover:bg-brand-100 rounded-lg transition-colors text-[10px] font-bold border border-brand-100">
                          Subir Foto
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files?.[0]) handleAutoridadFile(idx, e.target.files[0]);
                            }}
                          />
                        </label>
                      </div>

                      {/* Datos Autoridad */}
                      <div className="md:col-span-3 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-muted-foreground">Nombre Completo</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 bg-muted/30 border border-border rounded-lg text-sm"
                              value={aut.nombre}
                              onChange={(e) => updateAutoridad(idx, "nombre", e.target.value)}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-muted-foreground">Cargo</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 bg-muted/30 border border-border rounded-lg text-sm"
                              value={aut.cargo}
                              onChange={(e) => updateAutoridad(idx, "cargo", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-muted-foreground">Resumen / Biografía Corta</label>
                          <textarea
                            rows={3}
                            className="w-full px-3 py-2 bg-muted/30 border border-border rounded-lg text-sm"
                            value={aut.resumen}
                            onChange={(e) => updateAutoridad(idx, "resumen", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {autoridades.length === 0 && (
                  <div className="text-center py-12 bg-muted/10 rounded-2xl border-2 border-dashed border-border">
                    <p className="text-sm text-muted-foreground">No hay autoridades registradas.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: DIRECTORIO */}
          {activeTab === "directorio" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-brand-950 flex items-center gap-2 text-xl">
                  <Phone className="w-6 h-6 text-brand-500" />
                  Directorio Telefónico
                </h3>
                <button
                  type="button"
                  onClick={addDirectorio}
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-50 px-4 py-2 text-xs font-bold text-brand-600 hover:bg-brand-100 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Agregar Área
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-[10px] font-black uppercase text-muted-foreground">Área / Oficina</th>
                      <th className="px-6 py-3 text-[10px] font-black uppercase text-muted-foreground">Teléfono / Celular</th>
                      <th className="px-6 py-3 text-[10px] font-black uppercase text-muted-foreground">Email</th>
                      <th className="px-6 py-3 text-[10px] font-black uppercase text-muted-foreground">Anexo</th>
                      <th className="px-6 py-3 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {directorio.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-brand-50/30 transition-colors group">
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold text-brand-950 p-0"
                            placeholder="Ej: Secretaría"
                            value={item.area}
                            onChange={(e) => updateDirectorio(idx, "area", e.target.value)}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            className="w-full bg-transparent border-none focus:ring-0 text-sm p-0"
                            placeholder="999 999 999"
                            value={item.telefono}
                            onChange={(e) => updateDirectorio(idx, "telefono", e.target.value)}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="email"
                            className="w-full bg-transparent border-none focus:ring-0 text-sm p-0"
                            placeholder="ejemplo@uncp.edu.pe"
                            value={item.email}
                            onChange={(e) => updateDirectorio(idx, "email", e.target.value)}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            className="w-full bg-transparent border-none focus:ring-0 text-sm p-0"
                            placeholder="123"
                            value={item.anexo}
                            onChange={(e) => updateDirectorio(idx, "anexo", e.target.value)}
                          />
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => removeDirectorio(idx)}
                            className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {directorio.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-sm text-muted-foreground">No hay contactos registrados.</p>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
