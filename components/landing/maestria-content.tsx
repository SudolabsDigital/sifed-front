"use client";

import { useState } from "react";
import { 
  GraduationCap,
  BookOpen,
  Target,
  Award,
  Clock,
  Users,
  CheckCircle,
  Calendar,
  FileText,
  TrendingUp,
  Lightbulb,
  Brain,
  Globe,
  MessageSquare,
  BarChart,
  PenTool
} from "lucide-react";
import FacebookSection from "./facebook-section";

// Datos del programa
const perfilEgreso = [
  {
    id: 1,
    titulo: "Liderazgo Pedagógico",
    descripcion: "Lidera procesos de transformación educativa con visión estratégica e innovadora.",
    icon: Target,
    color: "bg-blue-50 text-blue-600 border-blue-200"
  },
  {
    id: 2,
    titulo: "Investigación Educativa",
    descripcion: "Diseña y ejecuta investigaciones aplicadas que contribuyen al avance del conocimiento pedagógico.",
    icon: Brain,
    color: "bg-purple-50 text-purple-600 border-purple-200"
  },
  {
    id: 3,
    titulo: "Gestión Curricular",
    descripcion: "Diseña, implementa y evalúa propuestas curriculares innovadoras alineadas a estándares internacionales.",
    icon: BookOpen,
    color: "bg-green-50 text-green-600 border-green-200"
  },
  {
    id: 4,
    titulo: "Pensamiento Crítico",
    descripcion: "Analiza críticamente problemáticas educativas complejas y propone soluciones fundamentadas.",
    icon: Lightbulb,
    color: "bg-amber-50 text-amber-600 border-amber-200"
  },
  {
    id: 5,
    titulo: "Comunicación Efectiva",
    descripcion: "Comunica ideas complejas de manera clara y persuasiva en diversos contextos académicos.",
    icon: MessageSquare,
    color: "bg-pink-50 text-pink-600 border-pink-200"
  },
  {
    id: 6,
    titulo: "Visión Global",
    descripcion: "Comprende y aplica tendencias educativas internacionales al contexto local.",
    icon: Globe,
    color: "bg-cyan-50 text-cyan-600 border-cyan-200"
  }
];

const mallaCurricular = [
  {
    ciclo: 1,
    semestre: "I - II",
    asignaturas: [
      { nombre: "Epistemología de la Educación", creditos: 4 },
      { nombre: "Metodología de la Investigación Educativa", creditos: 4 },
      { nombre: "Teorías Contemporáneas del Aprendizaje", creditos: 3 },
      { nombre: "Diseño Curricular y Evaluación", creditos: 3 },
      { nombre: "Estadística Aplicada a la Investigación", creditos: 3 }
    ]
  },
  {
    ciclo: 2,
    semestre: "III - IV",
    asignaturas: [
      { nombre: "Gestión y Liderazgo Educativo", creditos: 4 },
      { nombre: "Seminario de Tesis I", creditos: 4 },
      { nombre: "Neurociencia y Educación", creditos: 3 },
      { nombre: "Tecnología Educativa e Innovación", creditos: 3 },
      { nombre: "Políticas Educativas Comparadas", creditos: 3 }
    ]
  },
  {
    ciclo: 3,
    semestre: "V - VI",
    asignaturas: [
      { nombre: "Seminario de Tesis II", creditos: 6 },
      { nombre: "Educación Inclusiva y Diversidad", creditos: 3 },
      { nombre: "Evaluación de Programas Educativos", creditos: 3 },
      { nombre: "Ética de la Investigación", creditos: 2 }
    ]
  },
  {
    ciclo: 4,
    semestre: "VII - VIII",
    asignaturas: [
      { nombre: "Desarrollo y Sustentación de Tesis", creditos: 12 }
    ]
  }
];

const requisitosAdmision = [
  "Título profesional universitario o grado de bachiller",
  "Carta de motivación y proyecto de investigación preliminar",
  "Curriculum vitae documentado",
  "Certificado de suficiencia en idioma extranjero (inglés recomendado)",
  "Dos cartas de recomendación académica o profesional",
  "Entrevista personal con el comité académico"
];

const estadisticasPrograma = [
  { numero: "4", label: "Ciclos Académicos" },
  { numero: "72", label: "Créditos Totales" },
  { numero: "2", label: "Años de Duración" },
  { numero: "95%", label: "Empleabilidad" }
];

export default function MaestriaContent() {
  const [cicloActivo, setCicloActivo] = useState(1);

  return (
    <main className="flex-1 w-full">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-brand-950 via-brand-800 to-brand-600 text-white py-24 lg:py-32 overflow-hidden">
        {/* Patrón de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px w-8 bg-uncp-gold"></div>
              <span className="text-xs font-black uppercase tracking-widest text-uncp-gold">
                Posgrado - Unidad de Posgrado
              </span>
              <div className="h-px w-8 bg-uncp-gold"></div>
            </div>

            {/* Título Principal */}
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="text-white">Maestría en</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-uncp-gold to-amber-300">
                Educación
              </span>
            </h1>

            {/* Descripción */}
            <p className="text-xl md:text-2xl text-blue-100 font-medium leading-relaxed mb-12 max-w-3xl mx-auto">
              Forja tu liderazgo pedagógico con un programa de excelencia académica que integra investigación, innovación y gestión educativa.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <a 
                href="https://wa.me/51949260658?text=Hola,%20quisiera%20más%20información%20sobre%20la%20Maestría%20en%20Educación" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-10 py-5 bg-uncp-gold text-brand-950 rounded-2xl font-bold text-lg hover:bg-amber-400 transition-all shadow-2xl hover:shadow-amber-500/50 hover:scale-105 flex items-center gap-3"
              >
                <GraduationCap className="h-6 w-6" />
                Solicitar Información
              </a>
              <a 
                href="/documentos/maestria-brochure.pdf" 
                download
                className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-3"
              >
                <FileText className="h-6 w-6" />
                Descargar Brochure
              </a>
            </div>

            {/* Estadísticas Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {estadisticasPrograma.map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl md:text-4xl font-serif font-black text-uncp-gold">{stat.numero}</div>
                  <div className="text-sm text-blue-100 mt-2 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PERFIL DE EGRESO */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-1 w-12 bg-brand-600 rounded-full"></div>
              <span className="text-xs font-black uppercase tracking-widest text-brand-600">
                Competencias
              </span>
              <div className="h-1 w-12 bg-brand-600 rounded-full"></div>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-950 mb-4">
              Perfil del Egresado
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Desarrolla competencias de alto nivel para transformar la educación desde la investigación y el liderazgo pedagógico.
            </p>
          </div>

          {/* Grid de Competencias */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perfilEgreso.map((competencia) => {
              const IconComponent = competencia.icon;
              return (
                <div
                  key={competencia.id}
                  className="group bg-white rounded-[2rem] p-8 border border-gray-200 hover:border-brand-300 hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-2xl ${competencia.color} border-2 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  
                  <h3 className="font-bold text-xl text-brand-950 mb-3">
                    {competencia.titulo}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {competencia.descripcion}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MALLA CURRICULAR */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-1 w-12 bg-uncp-gold rounded-full"></div>
              <span className="text-xs font-black uppercase tracking-widest text-uncp-gold">
                Programa Académico
              </span>
              <div className="h-1 w-12 bg-uncp-gold rounded-full"></div>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-950 mb-4">
              Malla Curricular
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Estructura académica diseñada para tu desarrollo progresivo como investigador y líder educativo.
            </p>
          </div>

          {/* Navegación por ciclos */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {mallaCurricular.map((ciclo) => (
              <button
                key={ciclo.ciclo}
                onClick={() => setCicloActivo(ciclo.ciclo)}
                className={`px-8 py-4 rounded-2xl font-bold text-sm transition-all transform ${
                  cicloActivo === ciclo.ciclo
                    ? "bg-brand-600 text-white shadow-xl scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200 hover:border-brand-300"
                }`}
              >
                Ciclo {ciclo.ciclo}
                <span className="block text-xs font-medium mt-1 opacity-80">
                  {ciclo.semestre}
                </span>
              </button>
            ))}
          </div>

          {/* Contenido del ciclo activo */}
          {mallaCurricular.filter(c => c.ciclo === cicloActivo).map((ciclo) => (
            <div key={ciclo.ciclo} className="bg-gradient-to-br from-gray-50 to-white rounded-[3rem] p-8 md:p-12 border-2 border-gray-200">
              <div className="mb-8">
                <h3 className="font-serif text-3xl font-bold text-brand-950 mb-2">
                  Ciclo {ciclo.ciclo} - Semestre {ciclo.semestre}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {ciclo.asignaturas.reduce((sum, a) => sum + a.creditos, 0)} créditos totales
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {ciclo.asignaturas.map((asignatura, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-brand-600 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-base text-brand-950 mb-2 group-hover:text-brand-600 transition-colors">
                          {asignatura.nombre}
                        </h4>
                      </div>
                      <div className="bg-brand-50 text-brand-600 rounded-xl px-3 py-1.5 text-xs font-black border border-brand-200">
                        {asignatura.creditos} CR
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total de créditos */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
                <span className="text-sm font-bold text-muted-foreground">Total de Créditos del Ciclo</span>
                <span className="text-2xl font-black text-brand-600">
                  {ciclo.asignaturas.reduce((sum, a) => sum + a.creditos, 0)} Créditos
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INFORMACIÓN GENERAL */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            
            {/* Detalles del Programa - Columna principal */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-12 bg-brand-600 rounded-full"></div>
                <span className="text-xs font-black uppercase tracking-widest text-brand-600">
                  Información General
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-950 mb-8">
                Detalles del Programa
              </h2>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border-l-4 border-brand-600">
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-50 text-brand-600 rounded-xl p-3">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-950 mb-1">Duración</h4>
                      <p className="text-sm text-muted-foreground">4 ciclos académicos (2 años) incluyendo desarrollo de tesis</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border-l-4 border-uncp-gold">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-50 text-uncp-gold rounded-xl p-3">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-950 mb-1">Modalidad</h4>
                      <p className="text-sm text-muted-foreground">Presencial / Semipresencial (clases viernes y sábados)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border-l-4 border-green-600">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-50 text-green-600 rounded-xl p-3">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-950 mb-1">Grado Otorgado</h4>
                      <p className="text-sm text-muted-foreground">Magíster en Educación (Mg. en Educación)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border-l-4 border-purple-600">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-50 text-purple-600 rounded-xl p-3">
                      <BarChart className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-950 mb-1">Líneas de Investigación</h4>
                      <p className="text-sm text-muted-foreground">Didáctica, Gestión Educativa, Educación Inclusiva, TIC en Educación</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar: Requisitos de Admisión */}
            <div className="lg:col-span-1">
              <div className="bg-brand-950 rounded-[2.5rem] p-10 text-white sticky top-8">
                <div className="flex items-center gap-3 mb-6">
                  <PenTool className="h-6 w-6 text-uncp-gold" />
                  <span className="text-xs font-black uppercase tracking-widest text-uncp-gold">
                    Proceso de Admisión
                  </span>
                </div>
                
                <h3 className="font-serif text-3xl font-bold mb-6">
                  Requisitos de Ingreso
                </h3>

                <ul className="space-y-4 mb-8">
                  {requisitosAdmision.map((requisito, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-uncp-gold shrink-0 mt-0.5" />
                      <span className="text-sm font-medium leading-relaxed">{requisito}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-white/20">
                  <a 
                    href="https://uncpadmision.edu.pe/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-uncp-gold text-brand-950 rounded-2xl py-4 px-6 font-bold hover:bg-amber-400 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                  >
                    <Users className="h-5 w-5" />
                    Iniciar Postulación
                  </a>
                </div>

                <p className="text-xs text-blue-200 text-center mt-4">
                  Próxima convocatoria: Marzo 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-gradient-to-br from-brand-600 to-brand-800 text-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl text-center">
          <TrendingUp className="h-16 w-16 text-uncp-gold mx-auto mb-6" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6" style={{ color: "#FFFF"}}>
            ¿Listo para Transformar la Educación?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Únete a la próxima generación de líderes educativos que están revolucionando la enseñanza en el Perú.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:UPGEDUCACION@UNCP.EDU.PE?subject=Solicitud%20de%20Entrevista%20-%20Maestría%20en%20Educación&body=Estimados%20señores,%0D%0A%0D%0AMe%20dirijo%20a%20ustedes%20para%20solicitar%20una%20entrevista%20sobre%20el%20programa%20de%20Maestría%20en%20Educación.%0D%0A%0D%0ANombre:%0D%0ATeléfono:%0D%0ACorreo:%0D%0A%0D%0ASaludos%20cordiales"
              className="px-10 py-5 bg-white text-brand-950 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl"
            >
              Agendar Entrevista
            </a>
            <a 
              href="/documentos/maestria-plan-estudios.pdf" 
              download="Plan_Estudios_Maestria_Educacion_UNCP.pdf"
              className="px-10 py-5 bg-uncp-gold text-brand-950 rounded-2xl font-bold text-lg hover:bg-amber-400 transition-all shadow-2xl"
            >
              Descargar Plan de Estudios
            </a>
          </div>
        </div>
      </section>

      {/* FACEBOOK SECTION */}
      <FacebookSection />
    </main>
  );
}
