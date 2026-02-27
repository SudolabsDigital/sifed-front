"use client";

import { useState, useMemo } from "react";
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
  ScrollText,
  FileSignature,
  ExternalLink,
  Eye,
  Search,
  X
} from "lucide-react";

// Datos estáticos de documentos normativos
const documentosNacionales = [
  {
    id: 1,
    titulo: "Ley Universitaria N° 30220",
    descripcion: "Ley que regula la creación, funcionamiento, supervisión y cierre de las universidades.",
    categoria: "Ley Nacional",
    fecha: "2022",
    pdfUrl: "/documentos/ley-universitaria-30220.pdf",
    thumbnail: "/images/thumbnails/ley-30220.jpg",
    icon: Scale,
    color: "bg-blue-50 text-blue-600 border-blue-200"
  },
  {
    id: 2,
    titulo: "Reglamento de Grados y Títulos",
    descripcion: "Normativa nacional para la obtención de grados académicos y títulos profesionales.",
    categoria: "Normativa SUNEDU",
    fecha: "2017",
    pdfUrl: "/documentos/reglamento-grados-titulos.pdf",
    thumbnail: "/images/thumbnails/grados-titulos.jpg",
    icon: GraduationCap,
    color: "bg-green-50 text-green-600 border-green-200"
  },
  {
    id: 3,
    titulo: "Estatuto UNCP 2023",
    descripcion: "Estatuto actualizado de la Universidad Nacional del Centro del Perú.",
    categoria: "Estatuto Universitario",
    fecha: "2023",
    pdfUrl: "/documentos/estatuto-uncp-2023.pdf",
    thumbnail: "/images/thumbnails/estatuto-uncp.jpg",
    icon: BookOpen,
    color: "bg-amber-50 text-amber-600 border-amber-200"
  },
  {
    id: 4,
    titulo: "Reglamento de Investigación",
    descripcion: "Normas para la investigación científica, tecnológica e innovación.",
    categoria: "Normativa Institucional",
    fecha: "2018",
    pdfUrl: "/documentos/reglamento-investigacion.pdf",
    thumbnail: "/images/thumbnails/investigacion.jpg",
    icon: ScrollText,
    color: "bg-purple-50 text-purple-600 border-purple-200"
  },
  {
    id: 5,
    titulo: "Código de Ética Universitaria",
    descripcion: "Principios éticos que rigen la comunidad universitaria de la UNCP.",
    categoria: "Normativa Ética",
    fecha: "2024",
    pdfUrl: "/documentos/codigo-etica.pdf",
    thumbnail: "/images/thumbnails/etica.jpg",
    icon: Shield,
    color: "bg-red-50 text-red-600 border-red-200"
  },
  {
    id: 6,
    titulo: "Reglamento de Posgrado",
    descripcion: "Normativa específica para programas de maestría y doctorado.",
    categoria: "Normativa Académica",
    fecha: "2024",
    pdfUrl: "/documentos/reglamento-posgrado.pdf",
    thumbnail: "/images/thumbnails/posgrado.jpg",
    icon: Gavel,
    color: "bg-indigo-50 text-indigo-600 border-indigo-200"
  }
];

const formatosPlantillas = [
  {
    id: 1,
    titulo: "Esquema de Plan de Tesis",
    descripcion: "Plantilla oficial para la presentación del plan de tesis de maestría y doctorado.",
    tipo: "Plantilla Word",
    pdfUrl: "/documentos/plantillas/esquema-plan-tesis.docx",
    thumbnail: "/images/thumbnails/plan-tesis.jpg",
    icon: FileText,
    formato: "DOCX"
  },
  {
    id: 2,
    titulo: "Modelo de Tesis de Maestría",
    descripcion: "Formato completo para la redacción de tesis de maestría según normas APA 7.",
    tipo: "Plantilla Word",
    pdfUrl: "/documentos/plantillas/modelo-tesis-maestria.docx",
    thumbnail: "/images/thumbnails/tesis-maestria.jpg",
    icon: FileCheck,
    formato: "DOCX"
  },
  {
    id: 3,
    titulo: "Solicitud de Grado Académico",
    descripcion: "Formato de solicitud para tramitar el grado de Maestro o Doctor.",
    tipo: "Formulario",
    pdfUrl: "/documentos/formatos/solicitud-grado.pdf",
    thumbnail: "/images/thumbnails/solicitud-grado.jpg",
    icon: FileSignature,
    formato: "PDF"
  },
  {
    id: 4,
    titulo: "Declaración Jurada Simple",
    descripcion: "Formato para declaraciones juradas requeridas en diversos trámites.",
    tipo: "Formulario",
    pdfUrl: "/documentos/formatos/declaracion-jurada.pdf",
    thumbnail: "/images/thumbnails/declaracion-jurada.jpg",
    icon: ClipboardList,
    formato: "PDF"
  },
  {
    id: 5,
    titulo: "Carta de Presentación de Tesis",
    descripcion: "Modelo de carta para presentar la tesis a la unidad de posgrado.",
    tipo: "Plantilla Word",
    pdfUrl: "/documentos/plantillas/carta-presentacion.docx",
    thumbnail: "/images/thumbnails/carta-presentacion.jpg",
    icon: ScrollText,
    formato: "DOCX"
  },
  {
    id: 6,
    titulo: "Matriz de Consistencia",
    descripcion: "Plantilla Excel para elaborar la matriz de consistencia de la investigación.",
    tipo: "Plantilla Excel",
    pdfUrl: "/documentos/plantillas/matriz-consistencia.xlsx",
    thumbnail: "/images/thumbnails/matriz.jpg",
    icon: FileSpreadsheet,
    formato: "XLSX"
  },
  {
    id: 7,
    titulo: "Formato de Autorización de Publicación",
    descripcion: "Documento para autorizar la publicación de tesis en repositorio institucional.",
    tipo: "Formulario",
    pdfUrl: "/documentos/formatos/autorizacion-publicacion.pdf",
    thumbnail: "/images/thumbnails/autorizacion.jpg",
    icon: FileSignature,
    formato: "PDF"
  },
  {
    id: 8,
    titulo: "Solicitud de Revisión de Tesis",
    descripcion: "Formato para solicitar la revisión de tesis por jurados.",
    tipo: "Formulario",
    pdfUrl: "/documentos/formatos/revision-tesis.pdf",
    thumbnail: "/images/thumbnails/revision.jpg",
    icon: FileCheck,
    formato: "PDF"
  }
];

export default function DocumentosNormativosContent() {
  const [seccionActiva, setSeccionActiva] = useState<"nacional" | "formatos">("nacional");
  const [busqueda, setBusqueda] = useState("");

  // Filtrado inteligente de documentos
  const documentosFiltrados = useMemo(() => {
    const termino = busqueda.toLowerCase();
    return documentosNacionales.filter(doc =>
      doc.titulo.toLowerCase().includes(termino) ||
      doc.descripcion.toLowerCase().includes(termino) ||
      doc.categoria.toLowerCase().includes(termino)
    );
  }, [busqueda]);

  const formatosFiltrados = useMemo(() => {
    const termino = busqueda.toLowerCase();
    return formatosPlantillas.filter(fmt =>
      fmt.titulo.toLowerCase().includes(termino) ||
      fmt.descripcion.toLowerCase().includes(termino) ||
      fmt.tipo.toLowerCase().includes(termino)
    );
  }, [busqueda]);

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
              { numero: "06", label: "Normas Nacionales" },
              { numero: "08", label: "Formatos Oficiales" },
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
              onClick={() => setSeccionActiva("nacional")}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all transform ${
                seccionActiva === "nacional"
                  ? "bg-brand-950 text-white shadow-2xl scale-105"
                  : "bg-white text-muted-foreground hover:bg-brand-50 border border-border hover:border-brand-200"
              }`}
            >
              <Scale className="h-4 w-4" />
              Normativa Nacional
            </button>
            <button
              onClick={() => setSeccionActiva("formatos")}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all transform ${
                seccionActiva === "formatos"
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
            {busqueda && (
              <div className="absolute top-full left-0 right-0 mt-2 text-xs text-gray-500 font-medium">
                {seccionActiva === "nacional" 
                  ? `${documentosFiltrados.length} documento${documentosFiltrados.length !== 1 ? 's' : ''} encontrado${documentosFiltrados.length !== 1 ? 's' : ''}`
                  : `${formatosFiltrados.length} formato${formatosFiltrados.length !== 1 ? 's' : ''} encontrado${formatosFiltrados.length !== 1 ? 's' : ''}`
                }
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECCIÓN 1: NORMATIVA NACIONAL */}
      {seccionActiva === "nacional" && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
            {/* Header de Sección */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1 w-12 bg-brand-600 rounded-full"></div>
                <span className="text-xs font-black uppercase tracking-widest text-brand-600">
                  Sección 01
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-950 mb-4">
                Normativa Nacional e Institucional
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Documentos oficiales que regulan la educación universitaria a nivel nacional y las normas específicas de la UNCP.
              </p>
            </div>

            {/* Grid de Documentos */}
            {documentosFiltrados.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documentosFiltrados.map((doc) => {
                const IconComponent = doc.icon;
                return (
                  <a
                    key={doc.id}
                    href={doc.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white rounded-[2rem] overflow-hidden border border-gray-200 hover:border-brand-300 hover:shadow-2xl transition-all duration-300 cursor-pointer block"
                    onClick={(e) => {
                      // Si el archivo no existe, prevenir apertura
                      if (!doc.pdfUrl || doc.pdfUrl.startsWith('#')) {
                        e.preventDefault();
                        alert('Documento próximamente disponible');
                      }
                    }}
                  >
                    {/* Thumbnail Preview */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-20 h-20 rounded-2xl ${doc.color} border-2 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <IconComponent className="h-10 w-10" />
                        </div>
                      </div>
                      {/* Vista previa badge */}
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-black text-brand-600 flex items-center gap-1 shadow-lg">
                        <Eye className="h-3 w-3" />
                        PDF
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-8">
                      {/* Categoría */}
                      <span className="text-xs font-bold text-brand-600 uppercase tracking-wide mb-2 block">
                        {doc.categoria}
                      </span>

                      {/* Título */}
                      <h3 className="font-bold text-xl text-brand-950 mb-3 group-hover:text-brand-600 transition-colors">
                        {doc.titulo}
                      </h3>

                      {/* Descripción */}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {doc.descripcion}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-xs font-bold text-gray-400">
                          Año {doc.fecha}
                        </span>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Descargar directamente
                            const link = document.createElement('a');
                            link.href = doc.pdfUrl;
                            link.download = doc.titulo + '.pdf';
                            link.click();
                          }}
                          className="flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-800 transition-colors"
                        >
                          <Download className="h-4 w-4" />
                          Descargar
                        </button>
                      </div>
                    </div>
                  </a>
                );
              })}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">
                  No se encontraron formatos que coincidan con &quot;
                  <span className="font-bold text-gray-700">{busqueda}</span>
                  &quot;
                </p>
              </div>
            )}


          </div>
        </section>
      )}

      {/* SECCIÓN 2: FORMATOS Y PLANTILLAS */}
      {seccionActiva === "formatos" && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
            {/* Header de Sección */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1 w-12 bg-uncp-gold rounded-full"></div>
                <span className="text-xs font-black uppercase tracking-widest text-uncp-gold">
                  Sección 02
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-950 mb-4">
                Formatos y Plantillas Oficiales
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Descarga plantillas y formatos oficiales para esquemas de tesis, solicitudes y todos los documentos necesarios para tus trámites.
              </p>
            </div>

            {/* Grid de Formatos */}
            {formatosFiltrados.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {formatosFiltrados.map((formato) => {
                const IconComponent = formato.icon;
                const isPDF = formato.formato === 'PDF';
                
                // Si es PDF, hacemos clickeable toda la card
                const CardWrapper = isPDF ? 'a' : 'div';
                const cardProps = isPDF ? {
                  href: formato.pdfUrl,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  onClick: (e: React.MouseEvent) => {
                    if (!formato.pdfUrl || formato.pdfUrl.startsWith('#')) {
                      e.preventDefault();
                      alert('Documento próximamente disponible');
                    }
                  }
                } : {};
                
                return (
                  <CardWrapper
                    key={formato.id}
                    {...cardProps}
                    className={`group bg-white rounded-[2rem] overflow-hidden border-2 border-amber-200 hover:border-uncp-gold hover:shadow-2xl transition-all duration-300 relative block ${isPDF ? 'cursor-pointer' : ''}`}
                  >
                    {/* Thumbnail Preview con degradado */}
                    <div className="relative h-40 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-xl bg-white border-2 border-uncp-gold/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                          <IconComponent className="h-8 w-8 text-uncp-gold" />
                        </div>
                      </div>
                      
                      {/* Formato Badge (esquina superior derecha) */}
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1 text-xs font-black text-uncp-gold border border-uncp-gold/30 shadow-md">
                        {formato.formato}
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-6">
                      {/* Tipo */}
                      <span className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2 block">
                        {formato.tipo}
                      </span>

                      {/* Título */}
                      <h3 className="font-bold text-base text-brand-950 mb-2 group-hover:text-uncp-gold transition-colors leading-tight">
                        {formato.titulo}
                      </h3>

                      {/* Descripción */}
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                        {formato.descripcion}
                      </p>

                      {/* Botón de descarga */}
                      <button
                        onClick={(e) => {
                          if (isPDF) {
                            e.preventDefault();
                            e.stopPropagation();
                          }
                          // Descargar directamente
                          const link = document.createElement('a');
                          link.href = formato.pdfUrl;
                          link.download = formato.titulo;
                          link.click();
                        }}
                        className="w-full mt-auto flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-uncp-gold to-amber-500 text-white rounded-xl text-sm font-bold hover:shadow-lg hover:scale-105 transition-all"
                      >
                        <Download className="h-4 w-4" />
                        Descargar {formato.formato}
                      </button>
                    </div>
                  </CardWrapper>
                );
              })}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileSpreadsheet className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">
                  No se encontraron documentos que coincidan con &quot;
                  <span className="font-bold text-gray-700">{busqueda}</span>
                  &quot;
                </p>
              </div>
            )}

            {/* Bloque Informativo */}
            <div className="mt-16 bg-brand-950 rounded-[2.5rem] p-10 md:p-12 text-white relative overflow-hidden">
              {/* Patrón decorativo */}
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
                  <h3 className="font-serif text-3xl font-bold mb-4" style={{ color: "#FFFFFF" }}>
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
      )}

    </main>
  );
}
