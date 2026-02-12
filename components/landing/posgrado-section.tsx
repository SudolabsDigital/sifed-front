"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { GraduationCap, Award, BookOpen, ArrowRight, Info } from "lucide-react";
import Link from "next/link";

/**
 * Sub-componente para los indicadores laterales para evitar el error de Hooks en loops
 */
function ProgressDot({ i, step }: { i: number; step: MotionValue<number> }) {
  const backgroundColor = useTransform(step, (v) => Math.round(v) === i ? "#D4AF37" : "transparent");
  const scale = useTransform(step, (v) => Math.round(v) === i ? 1.4 : 1);
  const opacity = useTransform(step, (v) => Math.round(v) === i ? 1 : 0.3);

  return (
    <div className="group relative flex items-center justify-center">
      <motion.div 
        className="h-2.5 w-2.5 rounded-full border border-uncp-gold"
        style={{ backgroundColor, scale, opacity }}
      />
      <span className="absolute right-8 text-[9px] font-black text-uncp-gold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest whitespace-nowrap">
        Paso 0{i}
      </span>
    </div>
  );
}

export default function PosgradoSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // --- LÓGICA DE INTERACTIVIDAD Y VISIBILIDAD ---
  
  // 0. Intro (0% - 25%)
  const opacity0 = useTransform(smoothProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const pointer0 = useTransform<number, "auto" | "none">(smoothProgress, [0, 0.15, 0.25], ["auto", "auto", "none"]);
  const y0 = useTransform(smoothProgress, [0, 0.15, 0.25], [0, 0, -30]);

  // 1. Maestrías (25% - 50%)
  const opacity1 = useTransform(smoothProgress, [0.25, 0.35, 0.5], [0, 1, 0]);
  const pointer1 = useTransform<number, "auto" | "none">(smoothProgress, [0.25, 0.35, 0.5], ["none", "auto", "none"]);
  const y1 = useTransform(smoothProgress, [0.25, 0.35, 0.5], [30, 0, -30]);

  // 2. Doctorados (50% - 75%)
  const opacity2 = useTransform(smoothProgress, [0.5, 0.6, 0.75], [0, 1, 0]);
  const pointer2 = useTransform<number, "auto" | "none">(smoothProgress, [0.5, 0.6, 0.75], ["none", "auto", "none"]);
  const y2 = useTransform(smoothProgress, [0.5, 0.6, 0.75], [30, 0, -30]);

  // 3. Investigación (75% - 100%)
  const opacity3 = useTransform(smoothProgress, [0.75, 0.85, 1], [0, 1, 1]);
  const pointer3 = useTransform<number, "auto" | "none">(smoothProgress, [0.75, 0.85, 1], ["none", "auto", "auto"]);
  const y3 = useTransform(smoothProgress, [0.75, 0.85, 1], [30, 0, 0]);

  const backgroundScale = useTransform(smoothProgress, [0, 1], [1.1, 1]);
  const step = useTransform(smoothProgress, [0, 0.3, 0.6, 0.8], [1, 2, 3, 4]);

  return (
    <div ref={scrollRef} className="relative h-[600vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        
        {/* Capa de teñido azul (brand-950) con intensidad reducida */}
        <div className="absolute inset-0 bg-brand-950/30 z-0" />

        {/* FONDO DE IMAGEN */}
        <motion.div style={{ scale: backgroundScale }} className="absolute inset-0 z-0">
          <Image
            src="/images/fondouncp1920x1080.webp"
            alt="Campus UNCP"
            fill
            className="object-cover opacity-10 grayscale"
            priority
          />
          {/* Gradiente sutil que funde a negro */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-brand-950/20 to-transparent z-10" />
        </motion.div>

        <div className="container mx-auto h-full px-6 lg:px-12 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 h-full items-center gap-12">
            
            {/* COLUMNA IZQUIERDA - Identidad */}
            <div className="col-span-1 lg:col-span-5 flex flex-col justify-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                {/* Logo Estilo Sello y Eyebrow */}
                <div className="flex items-center gap-6 mb-10">
                  <div className="relative h-20 w-20 bg-white rounded-2xl p-3 shadow-2xl shadow-brand-950/50 flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                    <Image
                      src="/images/logoeducacion.webp"
                      alt="Logo Facultad de Educación"
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                  <div className="h-12 w-px bg-white/10"></div>
                  <div className="flex flex-col">
                    <span className="text-uncp-gold font-black uppercase tracking-[0.2em] text-[11px] mb-1">
                      Facultad de Educación
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-brand-400"></span>
                      <span className="text-white/40 font-bold uppercase tracking-[0.1em] text-[9px]">
                        Tradición desde 1959
                      </span>
                    </div>
                  </div>
                </div>

                <h2 className="font-serif text-5xl md:text-7xl xl:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                  UNIDAD DE <br />
                  <span className="text-brand-400">POSGRADO</span>
                </h2>
                <div className="flex flex-col gap-6 pl-1">
                   <p className="text-brand-50/50 text-sm md:text-base max-w-sm font-medium leading-relaxed">
                     Lideramos la educación de posgrado en la región con un enfoque en la investigación científica y la calidad académica internacional.
                   </p>
                </div>
              </motion.div>
            </div>

            {/* COLUMNA DERECHA - Contenido Dinámico con Pointer Events corregidos */}
            <div className="col-span-1 lg:col-span-6 lg:col-start-7 relative h-[450px] flex items-center">
              
              {/* 01. IDENTIDAD */}
              <motion.div 
                style={{ opacity: opacity0, y: y0, pointerEvents: pointer0 }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="text-uncp-gold font-mono text-xs mb-4 font-bold tracking-[0.3em] uppercase">/ 01 Identidad</div>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Excelencia en Posgrado</h3>
                <p className="text-brand-50/40 text-lg max-w-md mb-10 leading-relaxed">
                  Descubre nuestra visión institucional y el compromiso con el desarrollo científico y profesional de nuestros egresados.
                </p>
                <Link href="/en-construccion" className="z-30 inline-flex w-fit items-center gap-3 text-white bg-brand-600/20 border border-brand-600/30 px-6 py-3 rounded-xl font-bold text-sm hover:bg-brand-600 transition-all group shadow-xl shadow-brand-600/10">
                  Conoce más de nosotros <Info className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                </Link>
              </motion.div>

              {/* 02. MAESTRÍAS */}
              <motion.div 
                style={{ opacity: opacity1, y: y1, pointerEvents: pointer1 }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="text-uncp-gold font-mono text-xs mb-4 font-bold tracking-[0.3em] uppercase">/ 02 Programas</div>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Maestrías Profesionales</h3>
                <p className="text-brand-50/40 text-lg max-w-md mb-10 leading-relaxed">
                  Especialización diseñada para liderar procesos de cambio pedagógico y administrativo en el sector educativo nacional.
                </p>
                <Link href="/en-construccion" className="z-30 inline-flex w-fit items-center gap-3 text-white bg-brand-600/20 border border-brand-600/30 px-6 py-3 rounded-xl font-bold text-sm hover:bg-brand-600 transition-all group shadow-xl shadow-brand-600/10">
                  Ver Maestrías <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>

              {/* 03. DOCTORADOS */}
              <motion.div 
                style={{ opacity: opacity2, y: y2, pointerEvents: pointer2 }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="text-uncp-gold font-mono text-xs mb-4 font-bold tracking-[0.3em] uppercase">/ 03 Grados</div>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Doctorados Académicos</h3>
                <p className="text-brand-50/40 text-lg max-w-md mb-10 leading-relaxed">
                  El máximo nivel de investigación científica, orientado a generar conocimiento original con estándares globales.
                </p>
                <Link href="/en-construccion" className="z-30 inline-flex w-fit items-center gap-3 text-white bg-brand-600/20 border border-brand-600/30 px-6 py-3 rounded-xl font-bold text-sm hover:bg-brand-600 transition-all group shadow-xl shadow-brand-600/10">
                  Ver Doctorados <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>

              {/* 04. INVESTIGACIÓN */}
              <motion.div 
                style={{ opacity: opacity3, y: y3, pointerEvents: pointer3 }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="text-uncp-gold font-mono text-xs mb-4 font-bold tracking-[0.3em] uppercase">/ 04 Comunidad</div>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Investigadores Renacyt</h3>
                <p className="text-brand-50/40 text-lg max-w-md mb-10 leading-relaxed">
                  Nuestra plana docente está conformada por expertos certificados que lideran la producción científica del posgrado.
                </p>
                <div className="flex flex-wrap gap-4">
                  {['Acreditada', 'ISO 9001', 'Renacyt'].map(tag => (
                    <span 
                      key={tag} 
                      className="px-4 py-2 rounded-xl bg-brand-600/20 border border-brand-600/40 text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-lg shadow-brand-600/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </div>

        {/* INDICADOR DE PROGRESO */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-10 items-center z-30">
          {[1, 2, 3, 4].map((i) => (
            <ProgressDot key={i} i={i} step={step} />
          ))}
        </div>
      </div>
    </div>
  );
}
