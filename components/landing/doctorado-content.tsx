"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  Brain,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CreditCard,
  Download,
  FileText,
  GraduationCap,
  Landmark,
  Lightbulb,
  ListChecks,
  MessageCircle,
  Microscope,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

/* ─── TIPOS ─────────────────────────────────────────────────── */
type CursoRegular = { tipo: "curso"; nombre: string; creditos: number };
type CursoElectivo = { tipo: "electivo"; creditos: number; opciones: string[] };
type CursoItem = CursoRegular | CursoElectivo;
type Ciclo = { titulo: string; total: string; items: CursoItem[] };

/* ─── HELPER ─────────────────────────────────────────────────── */
const c = (nombre: string, creditos: number): CursoRegular => ({ tipo: "curso", nombre, creditos });
const e = (creditos: number, opciones: string[]): CursoElectivo => ({ tipo: "electivo", creditos, opciones });

const ciclosDoctorado: Ciclo[] = [
  {
    titulo: "Ciclo I",
    total: "12 créditos",
    items: [
      c("Filosofía e historia de la Educación", 4),
      c("Epistemología", 4),
      c("Seminario de Taller de tesis I", 4),
    ],
  },
  {
    titulo: "Ciclo II",
    total: "12 créditos",
    items: [
      c("Sociología y ética de la Educación", 4),
      c("Seminario de Taller de Tesis II", 4),
      c("Seminario de Investigación Cualitativa I", 4),
    ],
  },
  {
    titulo: "Ciclo III",
    total: "12 créditos",
    items: [
      c("Evaluación de la calidad de los sistemas educacionales", 4),
      c("Seminario de taller de tesis III", 4),
      c("Seminario de Investigación cualitativa II", 4),
    ],
  },
  {
    titulo: "Ciclo IV",
    total: "12 créditos",
    items: [
      c("Seminario taller de evaluación y formulación de currículo", 4),
      c("Análisis de datos cuantitativos y cualitativos", 4),
      c("Sistemas educativos y pensamiento pedagógico", 4),
    ],
  },
  {
    titulo: "Ciclo V",
    total: "12 créditos",
    items: [
      c("Neurociencia y cognición", 4),
      c("Política y gestión educativa", 4),
      c("Asesoría de Tesis I", 4),
    ],
  },
  {
    titulo: "Ciclo VI",
    total: "12 créditos",
    items: [
      c("Educación para el desarrollo sostenible", 4),
      c("Asesoramiento de tesis II", 4),
      e(4, [
        "Investigación de las TIC en Educación",
        "Investigación del liderazgo en la gestión del cambio",
        "Investigación de la gestión del conocimiento",
      ]),
    ],
  },
];

const stats = [
  { numero: "6", etiqueta: "Ciclos", sub: "semestres académicos" },
  { numero: "72", etiqueta: "Créditos", sub: "académicos totales" },
  { numero: "3", etiqueta: "Años", sub: "de formación" },
  { numero: "2026‑I", etiqueta: "Convocatoria", sub: "nueva cohorte" },
];

const propuestaValor = [
  {
    titulo: "Formación investigadora",
    descripcion: "Desarrolla capacidades de investigación científica de alto impacto en el campo educativo.",
    icono: Microscope,
  },
  {
    titulo: "Producción científica",
    descripcion: "Genera conocimiento original y publica en revistas académicas indexadas.",
    icono: Brain,
  },
  {
    titulo: "Docentes de alto nivel",
    descripcion: "Aprende con una plana académica especializada en investigación y ciencias de la educación.",
    icono: Award,
  },
  {
    titulo: "Liderazgo académico",
    descripcion: "Dirige proyectos educativos y equipos de investigación a nivel nacional e internacional.",
    icono: Lightbulb,
  },
];

const pasosPostulacion = [
  {
    paso: "01",
    titulo: "Realiza el pago de inscripción",
    detalle: "Pago por derecho de inscripción consignando el N° de DNI del postulante al doctorado. S/. 231.00 al código 1672.",
    icono: CreditCard,
  },
  {
    paso: "02",
    titulo: "Ubica usuario y clave en tu voucher",
    detalle: "Identifique en su voucher de pago su USUARIO y CLAVE para continuar con la inscripción en línea.",
    icono: FileText,
  },
  {
    paso: "03",
    titulo: "Desarrolla tu perfil de investigación",
    detalle: "Descarga el formato oficial del perfil de proyecto de investigación, desarrolla el perfil según lo que se solicita y guárdalo en formato Word.",
    icono: Download,
  },
  {
    paso: "04",
    titulo: "Inscríbete en la plataforma de admisión",
    detalle: "Luego que hayan transcurrido 24 horas desde que realizó el pago, inscríbase en línea en la plataforma oficial.",
    icono: GraduationCap,
  },
  {
    paso: "05",
    titulo: "Descarga tu constancia de inscripción",
    detalle: "Cuando haya culminado su inscripción le saldrá una opción para descargar/guardar la constancia. Active dicha opción y guarde el documento.",
    icono: BadgeCheck,
  },
  {
    paso: "06",
    titulo: "Envía tu expediente en un solo PDF",
    detalle: "Incluye: DNI, diploma de bachiller, perfil del proyecto, CV descriptivo (máx. 1 página), voucher de pago y constancia de inscripción, en ese orden.",
    icono: ListChecks,
  },
];

export default function DoctoradoContent() {
  const [expandedCiclo, setExpandedCiclo] = useState<string | null>(null);
  const toggleCiclo = (titulo: string) =>
    setExpandedCiclo((prev) => (prev === titulo ? null : titulo));

  return (
    <main className="flex-1 w-full bg-background text-foreground">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden bg-brand-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/portada-2.webp')] bg-cover bg-center opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-950/95 to-brand-800/70" />
        </div>
        <div className="container relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-uncp-gold/40 bg-uncp-gold/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-uncp-gold">
                <Sparkles className="h-3.5 w-3.5" /> Posgrado UNCP · Educación
              </span>

              <h1 className="mt-5 font-serif text-5xl font-black leading-[1.08] tracking-tight text-white md:text-6xl xl:text-7xl">
                Doctorado en
                <span className="block text-uncp-gold">Ciencias de la</span>
                <span className="block">Educación</span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-relaxed text-brand-50/80 md:text-lg">
                Formación doctoral orientada a la investigación científica, producción académica y liderazgo en el campo de las ciencias de la educación.
              </p>

              <div className="mt-7 inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-brand-50">
                <Calendar className="h-4 w-4 text-uncp-gold" />
                Inscripciones hasta el{" "}
                <strong className="text-uncp-gold">28 de marzo de 2026</strong>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://uncpadmision.edu.pe/posgrado/registration/login.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-uncp-gold px-7 py-3.5 text-sm font-black uppercase tracking-wider text-brand-950 shadow-lg transition hover:brightness-110 active:scale-95"
                >
                  Inscribirme ahora <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="https://wa.me/51949260658?text=Hola,%20quisiera%20informaci%C3%B3n%20sobre%20el%20Doctorado%20en%20Educaci%C3%B3n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-black uppercase tracking-wider text-white transition hover:bg-white/20"
                >
                  <MessageCircle className="h-4 w-4" /> Consultar por WhatsApp
                </a>
              </div>
            </div>

            {/* columna derecha: stats */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div
                    key={s.etiqueta}
                    className="rounded-[1.5rem] border border-white/15 bg-white/8 p-5 backdrop-blur-sm"
                  >
                    <p className="text-3xl font-black text-uncp-gold md:text-4xl">{s.numero}</p>
                    <p className="mt-1 text-sm font-black text-white">{s.etiqueta}</p>
                    <p className="text-[11px] font-medium text-brand-50/60">{s.sub}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.5rem] border border-white/15 bg-white/8 p-5 backdrop-blur-sm">
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-uncp-gold">
                  ¿Por qué este doctorado?
                </p>
                <ul className="space-y-2 text-sm text-brand-50/90">
                  {[
                    "Formación doctoral con rigor científico y metodológico",
                    "Talleres de tesis integrados en cada semestre",
                    "Programa orientado a la producción científica",
                    "Plana docente especializada en investigación educativa",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-uncp-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STRIP PROPUESTA DE VALOR ──────────────────────── */}
      <section className="bg-brand-800 py-14">
        <div className="container mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {propuestaValor.map((item) => {
              const Icono = item.icono;
              return (
                <div
                  key={item.titulo}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/8 p-5"
                >
                  <div className="shrink-0 rounded-xl bg-uncp-gold/15 p-2.5 text-uncp-gold">
                    <Icono className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-white">{item.titulo}</p>
                    <p className="mt-1 text-xs leading-relaxed text-brand-50/70">{item.descripcion}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PLAN DE ESTUDIOS ──────────────────────────────── */}
      <section className="bg-white py-20 md:py-24" id="plan-estudios">
        <div className="container mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-14 max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-brand-600">
              6 Ciclos Académicos
            </p>
            <h2 className="mt-3 font-serif text-4xl font-black leading-tight text-brand-950 md:text-5xl">
              Plan de estudios
              <br />
              <span className="text-brand-600">del doctorado</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Seis semestres de formación doctoral con enfoque en investigación, análisis y producción científica. Despliega cada ciclo para ver las asignaturas.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {ciclosDoctorado.map((ciclo, index) => {
              const isOpen = expandedCiclo === ciclo.titulo;
              const cicloNum = index + 1;

              return (
                <article
                  key={ciclo.titulo}
                  className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-sm transition-all duration-300 hover:border-brand-200 hover:shadow-xl"
                >
                  {/* CABECERA OSCURA */}
                  <div className="relative bg-brand-950 p-7">
                    <span className="absolute right-6 top-5 select-none text-5xl font-black text-white/6">
                      {String(cicloNum).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl border border-white/20 bg-white/12 p-3">
                        <BookOpen className="h-6 w-6 text-uncp-gold" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-50/50">
                        Semestre {cicloNum}
                      </span>
                    </div>
                    <h3 className="mt-4 font-serif text-2xl font-black text-white md:text-3xl">
                      {ciclo.titulo}
                    </h3>
                    <p className="mt-1.5 text-sm font-bold text-uncp-gold">{ciclo.total}</p>
                  </div>

                  {/* CUERPO */}
                  <div className="p-7">
                    <div className="flex items-center gap-3 rounded-xl border border-brand-100 bg-brand-50/60 px-4 py-3">
                      <Target className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-brand-600">
                          Asignaturas
                        </p>
                        <p className="mt-0.5 text-sm text-brand-950">
                          {ciclo.items.filter((i) => i.tipo === "curso").length} asignaturas
                          {ciclo.items.some((i) => i.tipo === "electivo") ? " + 1 electivo" : ""}
                          {" · "}12 créditos totales
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleCiclo(ciclo.titulo)}
                      className="mt-6 flex w-full items-center justify-between rounded-2xl border border-brand-200 bg-brand-50/40 px-5 py-3.5 text-sm font-black text-brand-950 transition hover:border-brand-400 hover:bg-brand-50"
                    >
                      <span className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-brand-600" />
                        {isOpen ? "Ocultar asignaturas" : "Ver asignaturas del ciclo"}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-brand-600 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="mt-5 space-y-4 border-t border-brand-100 pt-5">
                        <div className="rounded-2xl border border-border bg-background">
                          <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
                            <p className="text-xs font-black uppercase tracking-widest text-brand-950">
                              {ciclo.titulo}
                            </p>
                            <span className="rounded-lg bg-brand-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                              {ciclo.total}
                            </span>
                          </div>

                          <div className="divide-y divide-border">
                            {ciclo.items.map((item, idx) =>
                              item.tipo === "curso" ? (
                                <div key={idx} className="flex items-center justify-between gap-4 px-5 py-3">
                                  <p className="text-sm text-brand-950">{item.nombre}</p>
                                  <span className="shrink-0 rounded-lg border border-brand-100 bg-brand-50 px-2.5 py-1 text-[11px] font-black text-brand-600">
                                    {item.creditos} cr.
                                  </span>
                                </div>
                              ) : (
                                <div key={idx} className="px-5 py-4">
                                  <div className="mb-3 flex items-center gap-2">
                                    <span className="rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-amber-700">
                                      Elige 1 electivo · {item.creditos} cr.
                                    </span>
                                  </div>
                                  <div className="space-y-2">
                                    {item.opciones.map((op, i) => (
                                      <div
                                        key={i}
                                        className="flex items-center gap-3 rounded-xl border border-dashed border-brand-200 bg-brand-50/40 px-4 py-2.5"
                                      >
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-300 text-[10px] font-black text-brand-600">
                                          {String.fromCharCode(65 + i)}
                                        </span>
                                        <p className="text-sm text-brand-950">{op}</p>
                                      </div>
                                    ))}
                                  </div>
                                  <p className="mt-2 text-[11px] text-muted-foreground">
                                    * El doctorando elige una de las tres asignaturas electivas.
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-center gap-3 rounded-2xl border border-brand-100 bg-brand-50/50 py-3">
                          <p className="text-[11px] font-black uppercase tracking-widest text-brand-600">
                            Total {ciclo.titulo}
                          </p>
                          <span className="rounded-lg bg-brand-600 px-3 py-1 text-[11px] font-black text-white">12 créditos</span>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* resumen total */}
          <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl border border-brand-100 bg-brand-50/50 py-4">
            <p className="text-[11px] font-black uppercase tracking-widest text-brand-600">
              Total plan de estudios
            </p>
            <span className="rounded-lg bg-brand-600 px-3 py-1 text-[11px] font-black text-white">72 créditos</span>
            <span className="text-[11px] text-muted-foreground">· 6 semestres · 3 años</span>
          </div>
        </div>
      </section>

      {/* ── LOGROS ────────────────────────────────────────── */}
      <section className="bg-brand-950 py-20">
        <div className="container mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-uncp-gold">
                Tu transformación académica
              </p>
              <h2 className="mt-4 font-serif text-4xl font-black leading-tight text-white md:text-5xl">
                Lo que vas a construir con este doctorado
              </h2>
              <p className="mt-5 text-base leading-relaxed text-brand-50/75">
                No es solo un título. Es el más alto grado académico, respaldado por investigación científica y liderazgo en educación.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/51949260658?text=Hola,%20quisiera%20informaci%C3%B3n%20sobre%20el%20Doctorado%20en%20Educaci%C3%B3n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-uncp-gold px-6 py-3 text-sm font-black uppercase tracking-wider text-brand-950 transition hover:brightness-110"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp: 949 260 658
                </a>
                <a
                  href="https://uncpadmision.edu.pe/posgrado/registration/login.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition hover:bg-white/20"
                >
                  Inscribirme <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icono: TrendingUp,
                  titulo: "Perfil investigador avanzado",
                  desc: "Mayor competitividad para la academia, la investigación y la dirección de proyectos educativos.",
                },
                {
                  icono: Brain,
                  titulo: "Capacidad científica",
                  desc: "Diseño y ejecución de investigaciones doctorales con rigor metodológico reconocido.",
                },
                {
                  icono: Users,
                  titulo: "Liderazgo en educación",
                  desc: "Gestión de equipos académicos y toma de decisiones basada en evidencia científica.",
                },
                {
                  icono: Award,
                  titulo: "Grado de Doctor",
                  desc: "Titulación oficial por la UNCP con pleno reconocimiento académico nacional.",
                },
              ].map((l) => {
                const Icono = l.icono;
                return (
                  <div
                    key={l.titulo}
                    className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5 backdrop-blur-sm"
                  >
                    <div className="mb-3 inline-flex rounded-xl bg-uncp-gold/15 p-2.5 text-uncp-gold">
                      <Icono className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-black text-white">{l.titulo}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-brand-50/65">{l.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── INSCRIPCIÓN ───────────────────────────────────── */}
      <section className="bg-brand-50/40 py-20 md:py-24" id="inscripcion">
        <div className="container mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-brand-600">
                Admisión 2026‑I
              </p>
              <h2 className="mt-3 font-serif text-4xl font-black text-brand-950 md:text-5xl">
                Inscripción paso a paso
              </h2>
            </div>
            <a
              href="https://uncpadmision.edu.pe/posgrado/registration/login.php"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-2xl bg-brand-950 px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition hover:bg-brand-800"
            >
              Ir a la plataforma <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ol className="space-y-4">
                {pasosPostulacion.map((item) => {
                  const Icono = item.icono;
                  return (
                    <li
                      key={item.titulo}
                      className="flex gap-5 rounded-2xl border border-border bg-white p-5 shadow-sm"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-950 text-sm font-black text-white">
                          {item.paso}
                        </div>
                        <div className="h-full w-px bg-brand-100" />
                      </div>
                      <div className="pb-1 pt-0.5">
                        <div className="mb-1.5 inline-flex rounded-lg bg-brand-50 p-1.5 text-brand-600">
                          <Icono className="h-4 w-4" />
                        </div>
                        <h3 className="text-sm font-black text-brand-950">{item.titulo}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {item.detalle}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-8 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
                <p className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-600">
                  <ListChecks className="h-3.5 w-3.5" /> Documentos y enlaces oficiales
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://docs.google.com/document/d/1KSzmsLr9cuvKgUli1NEmiDCYhEU-IT72/edit?usp=sharing&ouid=113603275562061894464&rtpof=true&sd=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50/50 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-brand-950 transition hover:border-brand-400 hover:bg-white"
                  >
                    <Download className="h-3.5 w-3.5 text-brand-600" /> Formato perfil de investigación
                  </a>
                  <a
                    href="https://uncpadmision.edu.pe/posgrado/registration/login.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50/50 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-brand-950 transition hover:border-brand-400 hover:bg-white"
                  >
                    <GraduationCap className="h-3.5 w-3.5 text-brand-600" /> Plataforma de inscripción
                  </a>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfC4oUvGvqlToaQiFzRjZUpmyZ_KAk3yiFeJt5j70OYNt3V_g/viewform?usp=sharing&ouid=113603275562061894464"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50/50 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-brand-950 transition hover:border-brand-400 hover:bg-white"
                  >
                    <FileText className="h-3.5 w-3.5 text-brand-600" /> Enviar expediente
                  </a>
                </div>
              </div>
            </div>

            <aside className="space-y-5">
              <div className="overflow-hidden rounded-[2rem] bg-brand-950 text-white shadow-xl">
                <div className="border-b border-white/10 px-7 py-5">
                  <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-uncp-gold">
                    <CreditCard className="h-3.5 w-3.5" /> Inversión referencial
                  </p>
                  <p className="mt-1 text-xs text-brand-50/60">Por semestre académico</p>
                </div>
                <div className="px-7 py-6">
                  <ul className="divide-y divide-white/10">
                    {[
                      { concepto: "Inscripción (único pago)", monto: "S/ 231.00", detalle: "Banco Nación · cód. 1672 + DNI" },
                      { concepto: "Matrícula (c/semestre)", monto: "S/ 201.00", detalle: "Por cada ciclo" },
                      { concepto: "Pensión (4 cuotas)", monto: "S/ 501.00", detalle: "Por cuota, por semestre" },
                    ].map((item) => (
                      <li key={item.concepto} className="flex items-start justify-between gap-3 py-3.5">
                        <div>
                          <p className="text-sm font-bold text-brand-50">{item.concepto}</p>
                          <p className="text-[11px] text-brand-50/50">{item.detalle}</p>
                        </div>
                        <span className="shrink-0 text-base font-black text-uncp-gold">{item.monto}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-[2rem] border border-border bg-white p-6 shadow-sm">
                <p className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-600">
                  <Clock3 className="h-3.5 w-3.5" /> Fechas y detalles clave
                </p>
                <ul className="space-y-4 text-sm">
                  {[
                    { icono: Landmark, texto: "Estudios en 6 semestres (tres años)." },
                    { icono: Calendar, texto: "Inscripción hasta el 28 de marzo de 2026." },
                    { icono: GraduationCap, texto: "Inscripción en línea luego de 24 h del pago." },
                    { icono: Award, texto: "Entrevista virtual vía Microsoft Teams." },
                  ].map((f) => {
                    const Icono = f.icono;
                    return (
                      <li key={f.texto} className="flex items-start gap-3 text-muted-foreground">
                        <Icono className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                        {f.texto}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── VOUCHERS ──────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="container mx-auto max-w-7xl px-6 lg:px-12">
          <p className="mb-8 text-center text-xs font-black uppercase tracking-[0.25em] text-brand-600">
            Referencia de pago
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-[2rem] border border-border bg-white p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-black text-brand-950">
                <Landmark className="h-4 w-4 text-brand-600" /> Voucher Banco de la Nación
              </h3>
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-brand-50">
                <Image
                  src="/images/voucher_banco_nacion.png"
                  alt="Voucher de pago Banco de la Nación"
                  fill
                  className="object-contain"
                />
              </div>
            </article>
            <article className="rounded-[2rem] border border-border bg-white p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-black text-brand-950">
                <Landmark className="h-4 w-4 text-brand-600" /> Voucher Caja Huancayo
              </h3>
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-brand-50">
                <Image
                  src="/images/voucher_caja_huancayo.png"
                  alt="Voucher de pago Caja Huancayo"
                  fill
                  className="object-contain"
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────── */}
      <section className="bg-brand-950 py-20">
        <div className="container mx-auto max-w-5xl px-6 text-center lg:px-12">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-uncp-gold/40 bg-uncp-gold/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-uncp-gold">
            <Calendar className="h-3.5 w-3.5" /> Cierre de inscripciones: 28 de marzo 2026
          </span>
          <h2 className="font-serif text-4xl font-black text-white md:text-5xl xl:text-6xl">
            Tu próximo grado
            <span className="block text-uncp-gold">empieza con una decisión</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-brand-50/75 md:text-lg">
            Únete al Doctorado en Ciencias de la Educación de la UNCP. Formación orientada a la investigación científica, con acompañamiento académico en cada etapa.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://uncpadmision.edu.pe/posgrado/registration/login.php"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-uncp-gold px-8 py-4 text-sm font-black uppercase tracking-wider text-brand-950 shadow-lg transition hover:brightness-110 active:scale-95"
            >
              Inscribirme ahora <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/51949260658"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-8 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:bg-white/20"
            >
              <MessageCircle className="h-4 w-4" /> 949 260 658
            </a>
            <a
              href="mailto:UPGEDUCACION@UNCP.EDU.PE"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/6 px-8 py-4 text-sm font-black uppercase tracking-wider text-brand-50/80 transition hover:bg-white/12"
            >
              UPGEDUCACION@UNCP.EDU.PE
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
