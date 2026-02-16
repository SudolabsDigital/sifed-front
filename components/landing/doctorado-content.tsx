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

/* =========================
   ⚙️ CONFIGURAR SOLO ESTO
========================= */

const WHATSAPP =
  "https://wa.me/51949260658?text=Hola,%20quisiera%20información%20sobre%20el%20Doctorado%20en%20Ciencias%20de%20la%20Educación";

const BROCHURE = "/documentos/doctorado-brochure.pdf";
const PLAN = "/documentos/doctorado-plan-estudios.pdf";

/* =========================
   PERFIL DEL EGRESADO
========================= */

const perfilEgreso = [
  {
    id: 1,
    titulo: "Investigador Científico",
    descripcion: "Genera conocimiento original mediante investigación educativa de alto impacto.",
    icon: Brain,
    color: "bg-purple-50 text-purple-600 border-purple-200"
  },
  {
    id: 2,
    titulo: "Liderazgo Académico",
    descripcion: "Dirige equipos de investigación y proyectos educativos a nivel nacional e internacional.",
    icon: Target,
    color: "bg-blue-50 text-blue-600 border-blue-200"
  },
  {
    id: 3,
    titulo: "Producción Científica",
    descripcion: "Publica en revistas indexadas y contribuye al desarrollo de la ciencia educativa.",
    icon: FileText,
    color: "bg-green-50 text-green-600 border-green-200"
  },
  {
    id: 4,
    titulo: "Pensamiento Crítico Avanzado",
    descripcion: "Analiza sistemas educativos complejos desde perspectivas interdisciplinarias.",
    icon: Lightbulb,
    color: "bg-amber-50 text-amber-600 border-amber-200"
  },
  {
    id: 5,
    titulo: "Innovación Educativa",
    descripcion: "Diseña modelos educativos sustentados en evidencia científica.",
    icon: BarChart,
    color: "bg-pink-50 text-pink-600 border-pink-200"
  },
  {
    id: 6,
    titulo: "Proyección Internacional",
    descripcion: "Integra redes globales de investigación y cooperación académica.",
    icon: Globe,
    color: "bg-cyan-50 text-cyan-600 border-cyan-200"
  }
];

/* =========================
   MALLA CURRICULAR
========================= */

const mallaCurricular = [
  {
    ciclo: 1,
    semestre: "I - II",
    asignaturas: [
      { nombre: "Epistemología de la Investigación", creditos: 6 },
      { nombre: "Metodología de Investigación Avanzada", creditos: 6 },
      { nombre: "Seminario Doctoral I", creditos: 4 }
    ]
  },
  {
    ciclo: 2,
    semestre: "III - IV",
    asignaturas: [
      { nombre: "Diseño del Proyecto de Tesis", creditos: 8 },
      { nombre: "Análisis de Datos Avanzado", creditos: 6 },
      { nombre: "Seminario Doctoral II", creditos: 4 }
    ]
  },
  {
    ciclo: 3,
    semestre: "V - VI",
    asignaturas: [
      { nombre: "Desarrollo de Investigación", creditos: 12 },
      { nombre: "Publicación Científica", creditos: 6 }
    ]
  },
  {
    ciclo: 4,
    semestre: "VII - VIII",
    asignaturas: [
      { nombre: "Tesis Doctoral y Sustentación", creditos: 24 }
    ]
  }
];

const requisitosAdmision = [
  "Grado de Maestro o Magíster registrado en SUNEDU",
  "Proyecto de investigación alineado a una línea del programa",
  "Curriculum vitae documentado",
  "Dominio de lectura en idioma extranjero",
  "Entrevista académica especializada",
  "Disponibilidad para investigación a tiempo completo"
];

const estadisticasPrograma = [
  { numero: "4", label: "Ciclos Académicos" },
  { numero: "80", label: "Créditos Totales" },
  { numero: "3", label: "Años de Duración" },
  { numero: "100%", label: "Investigación" }
];

export default function DoctoradoContent() {
  const [cicloActivo, setCicloActivo] = useState(1);

  return (
    <main className="flex-1 w-full">
      
      {/* HERO — MISMO DISEÑO */}
      <section className="relative bg-gradient-to-br from-brand-950 via-brand-800 to-brand-600 text-white py-24 lg:py-32 overflow-hidden">
        <div className="relative z-10 container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">

            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px w-8 bg-uncp-gold"></div>
              <span className="text-xs font-black uppercase tracking-widest text-uncp-gold">
                Posgrado - Unidad de Posgrado
              </span>
              <div className="h-px w-8 bg-uncp-gold"></div>
            </div>

            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="text-white">Doctorado en</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-uncp-gold to-amber-300">
                Ciencias de la Educación
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 font-medium leading-relaxed mb-12">
              Forma investigadores capaces de transformar la educación mediante producción científica y liderazgo académico.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <a href={WHATSAPP} target="_blank"
                className="px-10 py-5 bg-uncp-gold text-brand-950 rounded-2xl font-bold text-lg hover:bg-amber-400 transition-all shadow-2xl flex items-center gap-3">
                <GraduationCap className="h-6 w-6" />
                Solicitar Información
              </a>

              <a href={BROCHURE} download
                className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-3">
                <FileText className="h-6 w-6" />
                Descargar Brochure
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {estadisticasPrograma.map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-serif font-black text-uncp-gold">{stat.numero}</div>
                  <div className="text-sm text-blue-100 mt-2">{stat.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* PERFIL — MISMA MAQUETACIÓN */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-950 mb-12 text-center">
            Perfil del Graduado
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perfilEgreso.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.id} className="group bg-white rounded-[2rem] p-8 border border-gray-200 hover:shadow-2xl transition-all">
                  <div className={`w-16 h-16 rounded-2xl ${c.color} border-2 flex items-center justify-center mb-6`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-bold text-xl text-brand-950 mb-3">{c.titulo}</h3>
                  <p className="text-sm text-muted-foreground">{c.descripcion}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MALLA — MISMO SISTEMA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">

          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {mallaCurricular.map((ciclo) => (
              <button key={ciclo.ciclo}
                onClick={() => setCicloActivo(ciclo.ciclo)}
                className={`px-8 py-4 rounded-2xl font-bold transition-all ${
                  cicloActivo === ciclo.ciclo
                    ? "bg-brand-600 text-white shadow-xl scale-105"
                    : "bg-white border-2 border-gray-200"
                }`}>
                Ciclo {ciclo.ciclo}
              </button>
            ))}
          </div>

          {mallaCurricular.filter(c => c.ciclo === cicloActivo).map((ciclo) => (
            <div key={ciclo.ciclo} className="bg-gray-50 rounded-[3rem] p-10 border-2 border-gray-200">
              <h3 className="font-serif text-3xl font-bold text-brand-950 mb-6">
                Ciclo {ciclo.ciclo} - {ciclo.semestre}
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {ciclo.asignaturas.map((a, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border">
                    <h4 className="font-bold text-brand-950">{a.nombre}</h4>
                    <span className="text-xs text-brand-600 font-black">{a.creditos} CR</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL — IGUAL */}
      <section className="py-20 bg-gradient-to-br from-brand-600 to-brand-800 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <TrendingUp className="h-16 w-16 text-uncp-gold mx-auto mb-6" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Conviértete en Investigador de Alto Nivel
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={WHATSAPP}
              className="px-10 py-5 bg-white text-brand-950 rounded-2xl font-bold text-lg hover:bg-gray-100">
              Solicitar Entrevista
            </a>

            <a href={PLAN} download
              className="px-10 py-5 bg-uncp-gold text-brand-950 rounded-2xl font-bold text-lg hover:bg-amber-400">
              Descargar Plan de Estudios
            </a>
          </div>
        </div>
      </section>

      <FacebookSection />
    </main>
  );
}
