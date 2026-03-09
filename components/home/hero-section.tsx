"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Layers, GraduationCap, ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProgramData } from "@/types/programa";

interface SlideData {
  id: string | number;
  preTitle: string;
  title: string;
  subtitle: string;
  description: string;
  src: string;
  stats: {
    icon: LucideIcon;
    label: string;
    value: string;
  }[];
  link: string;
}

interface HeroSectionProps {
  dynamicPrograms?: ProgramData[];
}

export default function HeroSection({ dynamicPrograms = [] }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Slides estáticos por defecto (Solo si no hay dinámicos)
  const staticSlides: SlideData[] = [
    {
      id: "fallback-1",
      preTitle: "ADMISIÓN 2026-I",
      title: "FORJANDO LÍDERES EDUCATIVOS",
      subtitle: "Unidad de Posgrado - Educación",
      description: "Transforma tu trayectoria profesional con nuestros programas de Maestría y Doctorado. Excelencia académica con reconocimiento internacional.",
      src: "/images/fondouncp1920x1080.webp",
      stats: [
        { icon: Clock, label: "Inscripciones", value: "Abiertas" },
        { icon: Layers, label: "Modalidad", value: "Híbrida" },
        { icon: GraduationCap, label: "Grados", value: "Oficiales" },
      ],
      link: "/posgrado/admision",
    }
  ];

  // Convertir programas dinámicos a formato de slide
  const dynamicSlides: SlideData[] = dynamicPrograms.map((p) => {
    const info = p.infoGeneral;
    return {
      id: p.id,
      preTitle: p.preTitle || "PROGRAMA DESTACADO",
      title: p.tituloHero || p.titulo,
      subtitle: p.subtitleHero || p.categoria || "",
      description: p.descripcionHero || p.descripcionCorta,
      src: p.imagenHero || p.imagenPortada || staticSlides[0].src,
      stats: [
        { icon: Clock, label: "Duración", value: info.duracion || "" },
        { icon: Layers, label: "Créditos", value: info.totalCreditos ? `${info.totalCreditos} créditos` : "" },
        { icon: GraduationCap, label: "Grado", value: info.certificacion || "" },
      ],
      link: `/posgrado/${p.tipo === 'maestria' ? 'maestrias' : 'doctorados'}/${p.slug}`,
    };
  });

  const slides = dynamicSlides.length > 0 ? dynamicSlides : staticSlides;

  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section 
      className="relative h-screen w-full overflow-hidden bg-brand-950"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Imagen de Fondo con Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src={slides[current].src}
              alt={slides[current].title}
              fill
              priority
              className="object-cover scale-105"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/80 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent z-10" />
          </div>

          {/* Contenido */}
          <div className="relative z-20 container mx-auto h-full flex items-center px-6 lg:px-12">
            <div className="max-w-4xl pt-20">
              {/* Pre-Título */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-px w-8 bg-uncp-gold" />
                <span className="text-uncp-gold font-black tracking-[0.3em] text-xs uppercase">
                  {slides[current].preTitle}
                </span>
              </motion.div>

              {/* Título Principal Estilo Editorial */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-white leading-[0.9] tracking-tighter mb-4"
              >
                {slides[current].title.split(" ").map((word, i) => (
                  <span key={i} className="inline-block mr-[0.2em] last:mr-0">
                    {word}
                  </span>
                ))}
              </motion.h1>

              {/* Subtítulo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-8"
              >
                <p className="text-xl md:text-3xl font-serif italic text-brand-200">
                  {slides[current].subtitle}
                </p>
              </motion.div>

              {/* Descripción */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-brand-50/70 text-base md:text-lg max-w-xl mb-10 leading-relaxed font-medium"
              >
                {slides[current].description}
              </motion.p>

              {/* Stats & Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-8"
              >
                <Link 
                  href={slides[current].link}
                  className="group relative flex items-center gap-3 bg-white text-brand-950 px-8 py-4 rounded-2xl font-black uppercase tracking-wider text-sm transition-all hover:bg-uncp-gold hover:scale-105 active:scale-95 shadow-2xl shadow-white/10"
                >
                  Ver Detalles <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <div className="flex gap-8 border-l border-white/10 pl-8 hidden md:flex">
                  {slides[current].stats.map((stat, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[10px] font-black text-brand-400 uppercase tracking-widest mb-1">{stat.label}</span>
                      <span className="text-white font-bold text-sm flex items-center gap-2">
                        <stat.icon className="w-3.5 h-3.5 text-uncp-gold" />
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navegación Inferior (Dots) */}
      {slides.length > 1 && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-500 rounded-full h-1.5 ${
                current === i ? "w-12 bg-uncp-gold" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      )}

      {/* Controles Laterales */}
      {slides.length > 1 && (
        <div className="absolute inset-y-0 right-12 z-30 hidden lg:flex flex-col justify-center gap-4">
          <button 
            onClick={prevSlide}
            className="p-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-brand-950 transition-all active:scale-90"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="p-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-brand-950 transition-all active:scale-90"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Indicador de Scroll */}
      <div className="absolute bottom-10 right-12 z-30 hidden xl:flex items-center gap-3 text-white/30">
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll</span>
        <div className="h-12 w-px bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
