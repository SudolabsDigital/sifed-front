"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { 
  FileText, 
  GraduationCap, 
  Users, 
  ClipboardCheck, 
  Landmark, 
  MonitorPlay,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const accessLinks = [
  {
    title: "Admisión",
    desc: "Guía completa y requisitos vigentes.",
    icon: <ClipboardCheck className="w-5 h-5" />,
    href: "/posgrado/admision",
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Plana Docente",
    desc: "Investigadores y catedráticos calificados.",
    icon: <Users className="w-5 h-5" />,
    href: "/posgrado/plana-docente",
    color: "bg-brand-50 text-brand-600"
  },
  {
    title: "Planes de Estudio",
    desc: "Estructura curricular actualizada.",
    icon: <GraduationCap className="w-5 h-5" />,
    href: "/posgrado/programas",
    color: "bg-amber-50 text-amber-600"
  },
  {
    title: "Documentos",
    desc: "Reglamentos y formatos oficiales.",
    icon: <FileText className="w-5 h-5" />,
    href: "/documentos-normativos",
    color: "bg-purple-50 text-purple-600"
  },
  {
    title: "Mesa de Partes",
    desc: "Envío oficial de documentos.",
    icon: <Landmark className="w-5 h-5" />,
    href: "https://erpcampus.uncp.edu.pe/",
    color: "bg-emerald-50 text-emerald-600",
    external: true
  },
  {
    title: "Aula Virtual",
    desc: "Plataforma de aprendizaje SIFED.",
    icon: <MonitorPlay className="w-5 h-5" />,
    href: "/login",
    color: "bg-brand-950 text-uncp-gold"
  }
];

export default function QuickAccessSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 }
    }
  }, [Autoplay({ delay: 5000, stopOnInteraction: true })]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="py-16 bg-slate-50/50 border-b border-border overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-uncp-gold mb-2 block">Gestión Académica</span>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-brand-950 leading-tight">
              Accesos Directos
            </h2>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-brand-950 hover:bg-brand-950 hover:text-white transition-all shadow-sm"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-brand-950 hover:bg-brand-950 hover:text-white transition-all shadow-sm"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="embla overflow-visible" ref={emblaRef}>
          <div className="embla__container flex gap-6 py-4 px-2">
            {accessLinks.map((item, index) => (
              <div key={index} className="embla__slide flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]">
                <Link 
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="group relative p-6 rounded-[2.5rem] border-2 border-slate-200 bg-white hover:border-brand-600 hover:ring-4 hover:ring-brand-600/5 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between h-full min-h-[220px]"
                >
                  <div className="relative z-10">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110 shadow-sm",
                      item.color
                    )}>
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-brand-950 mb-2 group-hover:text-brand-600 transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-brand-400 group-hover:text-brand-600 transition-colors">
                    Ingresar <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
