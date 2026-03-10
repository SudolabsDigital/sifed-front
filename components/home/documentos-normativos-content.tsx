"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import { documentosApi } from "@/lib/api/documentos";
import { getStorageUrl } from "@/lib/utils";
import PageHero from "@/components/ui/page-hero";
import { 
  FileText, 
  Download, 
  Shield, 
  ClipboardList, 
  BookOpen, 
  FileCheck,
  Scale,
  Gavel,
  GraduationCap,
  FileSpreadsheet,
  FileSignature,
  ExternalLink,
  Eye,
  Search,
  X,
  Loader2
} from "lucide-react";

// Mapeo dinámico de iconos y colores basado en subcategorías
const getIconForCategory = (subCategoria: string | null) => {
  if (!subCategoria) return FileText;
  const lower = subCategoria.toLowerCase();
  if (lower.includes("ley")) return Scale;
  if (lower.includes("grado") || lower.includes("sunedu")) return GraduationCap;
  if (lower.includes("estatuto")) return BookOpen;
  if (lower.includes("ética") || lower.includes("etica")) return Shield;
  if (lower.includes("posgrado")) return Gavel;
  if (lower.includes("excel")) return FileSpreadsheet;
  if (lower.includes("jurada") || lower.includes("solicitud")) return ClipboardList;
  if (lower.includes("carta") || lower.includes("autorización")) return FileSignature;
  return FileText;
};

const getColorForCategory = (subCategoria: string | null, isFormato = false) => {
  if (isFormato) return "border-amber-200 hover:border-uncp-gold bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100";
  
  if (!subCategoria) return "bg-gray-50 text-gray-600 border-gray-200";
  const lower = subCategoria.toLowerCase();
  if (lower.includes("ley")) return "bg-blue-50 text-blue-600 border-blue-200";
  if (lower.includes("grado") || lower.includes("sunedu")) return "bg-green-50 text-green-600 border-green-200";
  if (lower.includes("estatuto")) return "bg-amber-50 text-amber-600 border-amber-200";
  if (lower.includes("investigaci")) return "bg-purple-50 text-purple-600 border-purple-200";
  if (lower.includes("ética") || lower.includes("etica")) return "bg-red-50 text-red-600 border-red-200";
  if (lower.includes("posgrado")) return "bg-indigo-50 text-indigo-600 border-indigo-200";
  
  return "bg-gray-50 text-gray-600 border-gray-200";
};

export default function DocumentosNormativosContent() {
  const [seccionActiva, setSeccionActiva] = useState<"normativa" | "formato">("normativa");
  const [busqueda, setBusqueda] = useState("");

  const { data: documentos, isLoading } = useSWR(
    ['/api/portal/documentos-normativos', seccionActiva], 
    () => documentosApi.getPublicos({ categoria_principal: seccionActiva })
  );

  const documentosFiltrados = useMemo(() => {
    if (!documentos) return [];
    if (!busqueda) return documentos;
    
    const termino = busqueda.toLowerCase();
    return documentos.filter(doc =>
      doc.titulo.toLowerCase().includes(termino) ||
      (doc.descripcion && doc.descripcion.toLowerCase().includes(termino)) ||
      (doc.sub_categoria && doc.sub_categoria.toLowerCase().includes(termino)) ||
      (doc.codigo && doc.codigo.toLowerCase().includes(termino))
    );
  }, [busqueda, documentos]);

  return (
    <main className="flex-1 w-full">
      
      <PageHero
        title="DOCUMENTOS NORMATIVOS"
        subtitle="UNIDAD DE POSGRADO"
        description="Accede a toda la normativa nacional, formatos oficiales, plantillas y documentos requeridos para tus trámites académicos. Todo en un solo lugar."
        imageSrc="/images/fondouncp1920x1080.webp"
        size="compact"
        align="center"
        breadcrumbs={[
          { label: "Posgrado", href: "/posgrado" },
          { label: "Documentos" }
        ]}
      />

      {/* QUICK STATS - Standard Pattern */}
      <section className="bg-white py-12 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { numero: "06+", label: "Normas Nacionales" },
              { numero: "08+", label: "Formatos Oficiales" },
              { numero: "100%", label: "Versión Actual" },
              { numero: "24/7", label: "Acceso Libre" }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="text-3xl md:text-4xl font-serif font-black text-brand-950 group-hover:text-brand-600 transition-colors">{stat.numero}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-brand-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NAVEGACIÓN DE PESTAÑAS */}
      <section className="bg-white border-b-2 border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="flex flex-wrap gap-4 py-6">
            <button
              onClick={() => setSeccionActiva("normativa")}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all transform ${
                seccionActiva === "normativa"
                  ? "bg-brand-950 text-white shadow-2xl scale-105"
                  : "bg-white text-muted-foreground hover:bg-brand-50 border border-border hover:border-brand-200"
              }`}
            >
              <Scale className="h-4 w-4" />
              Normativa Nacional
            </button>
            <button
              onClick={() => setSeccionActiva("formato")}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all transform ${
                seccionActiva === "formato"
                  ? "bg-brand-950 text-white shadow-2xl scale-105"
                  : "bg-white text-muted-foreground hover:bg-brand-50 border border-border hover:border-brand-200"
              }`}
            >
              <FileSpreadsheet className="h-4 w-4" />
              Formatos y Plantillas
            </button>
          </div>
        </div>
      </section>

      {/* BUSCADOR INTELIGENTE */}
      <section className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl py-6">
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar documentos, leyes, normas, formatos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-white border-2 border-gray-200 rounded-2xl text-sm font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100 transition-all"
              />
              {busqueda && (
                <button
                  onClick={() => setBusqueda("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            {busqueda && !isLoading && (
              <div className="absolute top-full left-0 right-0 mt-2 text-xs text-gray-500 font-medium">
                {`${documentosFiltrados.length} documento${documentosFiltrados.length !== 1 ? 's' : ''} encontrado${documentosFiltrados.length !== 1 ? 's' : ''}`}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* RENDERIZADO DE RESULTADOS */}
      <section className={`py-20 ${seccionActiva === 'normativa' ? 'bg-gray-50' : 'bg-white'}`}>
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          {/* Header de Sección */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className={`h-1 w-12 rounded-full ${seccionActiva === 'normativa' ? 'bg-brand-600' : 'bg-uncp-gold'}`}></div>
              <span className={`text-xs font-black uppercase tracking-widest ${seccionActiva === 'normativa' ? 'text-brand-600' : 'text-uncp-gold'}`}>
                Sección 0{seccionActiva === 'normativa' ? '1' : '2'}
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-950 mb-4">
              {seccionActiva === 'normativa' ? 'Normativa Nacional e Institucional' : 'Formatos y Plantillas Oficiales'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              {seccionActiva === 'normativa' 
                ? 'Documentos oficiales que regulan la educación universitaria a nivel nacional y las normas específicas de la UNCP.'
                : 'Descarga plantillas y formatos oficiales para esquemas de tesis, solicitudes y todos los documentos necesarios para tus trámites.'}
            </p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 text-brand-600 animate-spin mb-4" />
              <p className="text-muted-foreground font-medium">Cargando documentos...</p>
            </div>
          ) : documentosFiltrados.length > 0 ? (
            <div className={`grid ${seccionActiva === 'normativa' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'} gap-6`}>
              {documentosFiltrados.map((doc) => {
                const IconComponent = getIconForCategory(doc.sub_categoria);
                const fileUrl = getStorageUrl(doc.archivo_path);
                
                if (seccionActiva === 'normativa') {
                  // VISTA NORMATIVA
                  return (
                    <a
                      key={doc.id}
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white rounded-[2rem] overflow-hidden border border-gray-200 hover:border-brand-300 hover:shadow-2xl transition-all duration-300 cursor-pointer block"
                    >
                      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className={`w-20 h-20 rounded-2xl ${getColorForCategory(doc.sub_categoria)} border-2 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <IconComponent className="h-10 w-10" />
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-black text-brand-600 flex items-center gap-1 shadow-lg">
                          <Eye className="h-3 w-3" />
                          {doc.extension_archivo.toUpperCase()}
                        </div>
                      </div>
                      <div className="p-8">
                        <span className="text-xs font-bold text-brand-600 uppercase tracking-wide mb-2 block">
                          {doc.sub_categoria || 'Normativa'}
                        </span>
                        <h3 className="font-bold text-xl text-brand-950 mb-3 group-hover:text-brand-600 transition-colors">
                          {doc.titulo}
                        </h3>
                        {doc.descripcion && (
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                            {doc.descripcion}
                          </p>
                        )}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <span className="text-xs font-bold text-gray-400">
                            {doc.fecha_año ? `Año ${doc.fecha_año}` : 'Vigente'}
                          </span>
                          <span className="flex items-center gap-2 text-sm font-bold text-brand-600 group-hover:text-brand-800 transition-colors">
                            <Download className="h-4 w-4" />
                            Descargar
                          </span>
                        </div>
                      </div>
                    </a>
                  );
                } else {
                  // VISTA FORMATOS
                  return (
                    <a
                      key={doc.id}
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white rounded-[2rem] overflow-hidden border-2 border-amber-200 hover:border-uncp-gold hover:shadow-2xl transition-all duration-300 relative block cursor-pointer"
                    >
                      <div className="relative h-40 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-xl bg-white border-2 border-uncp-gold/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                            <IconComponent className="h-8 w-8 text-uncp-gold" />
                          </div>
                        </div>
                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1 text-xs font-black text-uncp-gold border border-uncp-gold/30 shadow-md">
                          {doc.extension_archivo.toUpperCase()}
                        </div>
                      </div>
                      <div className="p-6 flex flex-col h-[calc(100%-10rem)]">
                        <span className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2 block">
                          {doc.sub_categoria || 'Plantilla'}
                        </span>
                        <h3 className="font-bold text-base text-brand-950 mb-2 group-hover:text-uncp-gold transition-colors leading-tight">
                          {doc.titulo}
                        </h3>
                        {doc.descripcion && (
                          <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
                            {doc.descripcion}
                          </p>
                        )}
                        <span className="w-full mt-auto flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-uncp-gold to-amber-500 text-white rounded-xl text-sm font-bold hover:shadow-lg hover:scale-105 transition-all">
                          <Download className="h-4 w-4" />
                          Descargar
                        </span>
                      </div>
                    </a>
                  );
                }
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              {seccionActiva === 'normativa' ? (
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              ) : (
                <FileSpreadsheet className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              )}
              <p className="text-gray-500 font-medium">
                No se encontraron documentos que coincidan con &quot;
                <span className="font-bold text-gray-700">{busqueda}</span>
                &quot;
              </p>
            </div>
          )}

          {/* Bloque Informativo al final de la página */}
          <div className="mt-16 bg-brand-950 rounded-[2.5rem] p-10 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-6 w-6 text-uncp-gold" />
                  <span className="text-xs font-black uppercase tracking-widest text-uncp-gold">
                    Importante
                  </span>
                </div>
                <h3 className="font-serif text-3xl font-bold mb-4 text-white">
                  ¿Necesitas ayuda con tu trámite?
                </h3>
                <p className="text-blue-100 leading-relaxed mb-6">
                  Nuestro equipo de la Unidad de Posgrado está disponible para orientarte en el uso de estos documentos y resolver cualquier duda sobre los procedimientos.
                </p>
                <a 
                  href="https://erpcampus.uncp.edu.pe/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-uncp-gold text-brand-950 rounded-xl font-bold hover:bg-amber-400 transition-all"
                >
                  Contactar Mesa de Partes
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: FileText, label: "Documentos Verificados" },
                  { icon: Shield, label: "Información Oficial" },
                  { icon: Download, label: "Descarga Inmediata" },
                  { icon: FileCheck, label: "Formatos Actualizados" }
                ].map((item, idx) => {
                  const IconItem = item.icon;
                  return (
                    <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <IconItem className="h-8 w-8 text-uncp-gold mb-3" />
                      <div className="text-sm font-bold">{item.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
