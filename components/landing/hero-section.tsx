"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Datos que vendrán del Backend en funcionalidad futura (Admin)
const slides = [
  {
    id: 1,
    src: "/images/portada-1.webp",
    alt: "Estudiantes en Campus",
    title: "Excelencia en Formación Docente",
    description: "La plataforma oficial SIFED centraliza matrículas, cursos y trámites. Diseñada para docentes y estudiantes de la Facultad de Educación.",
    cta: "Acceder al Aula",
    link: "/nosotros"
  },
  {
    id: 2,
    src: "/images/portada-2.webp",
    alt: "Afiche de Admisión",
    title: "Admisión 2026 Abierta",
    description: "Postula a nuestros programas de posgrado. Inscripciones abiertas hasta el 30 de Marzo. ¡Forma parte de la excelencia!",
    cta: "Ver Requisitos",
    link: "/admision"
  },
  {
    id: 3,
    src: "/images/portada-3.webp",
    alt: "Conferencia Magistral",
    title: "Comunidad Académica Conectada",
    description: "Accede a todos los servicios de la facultad desde cualquier dispositivo. Gestión simplificada para tu vida universitaria.",
    cta: "Portal Informativo",
    link: "/login"
  },
  {
    id: 4,
    src: "/images/portada-4.webp",
    alt: "Investigación y Desarrollo",
    title: "Investigación de Alto Impacto",
    description: "Fomentamos la producción científica y la innovación pedagógica en nuestros laboratorios y grupos de investigación.",
    cta: "Conocer Más",
    link: "/investigacion"
  },
  {
    id: 5,
    src: "/images/portada-5.webp",
    alt: "Infraestructura Moderna",
    title: "Infraestructura Moderna",
    description: "Espacios diseñados para el aprendizaje colaborativo y el desarrollo profesional de nuestros estudiantes.",
    cta: "Ver Galería",
    link: "/nosotros"
  }
];

export default function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 }, [
    Autoplay({ delay: 7000, stopOnInteraction: true, stopOnMouseEnter: true })
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="relative w-full min-h-[calc(100vh-6rem)] bg-brand-950 overflow-hidden group/hero">
      
      {/* Embla Viewport */}
      <div className="overflow-hidden h-full absolute inset-0" ref={emblaRef}>
        <div className="flex h-full w-full touch-pan-y">
          {slides.map((slide) => (
            <div className="flex-[0_0_100%] min-w-0 relative h-full" key={slide.id}>
              
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image 
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  priority={slide.id === 1}
                />
                {/* Overlay Oscuro */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/60 to-transparent"></div>
              </div>

              {/* Contenido (Overlay dentro del slide para que se mueva junto) */}
              <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 xl:px-24 w-full lg:w-2/3 pointer-events-none">
                 <div className="max-w-2xl pointer-events-auto">
                    
                    <h1 className="font-serif text-4xl md:text-6xl xl:text-7xl font-black leading-[1.1] text-white tracking-tight mb-6 drop-shadow-xl">
                      {slide.title}
                    </h1>

                    <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed mb-10 max-w-lg drop-shadow-lg text-shadow">
                      {slide.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link 
                        href={slide.link} 
                        className="group flex h-14 md:h-16 items-center justify-center gap-3 rounded-xl bg-brand-600 px-8 md:px-10 text-base md:text-lg font-extrabold text-white shadow-xl shadow-brand-950/50 transition-all hover:bg-brand-500 hover:-translate-y-1 hover:shadow-2xl sm:w-auto text-center backdrop-blur-sm border border-brand-500/50"
                      >
                        <span>{slide.cta}</span>
                        <ArrowRight className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} />
                      </Link>
                      
                      <Link
                        href="/login"
                        className="flex h-14 md:h-16 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border-2 border-white/20 px-8 md:px-10 text-base md:text-lg font-bold text-white transition-all hover:bg-white/20 hover:border-white/40 sm:w-auto text-center"
                      >
                        Más Información
                      </Link>
                    </div>
                 </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* CONTROLES: Navegación Manual (Overlay Global) */}
      
      {/* Flechas Laterales */}
      <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-4 pointer-events-none">
        <button 
          onClick={scrollPrev}
          className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 flex items-center justify-center pointer-events-auto opacity-0 group-hover/hero:opacity-100 transition-all hover:bg-brand-600 hover:border-brand-600 hover:scale-110"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          onClick={scrollNext}
          className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 flex items-center justify-center pointer-events-auto opacity-0 group-hover/hero:opacity-100 transition-all hover:bg-brand-600 hover:border-brand-600 hover:scale-110"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Indicadores Inferiores */}
      <div className="absolute bottom-8 left-8 md:left-16 z-20 flex gap-3 pointer-events-auto">
          {scrollSnaps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500 shadow-sm",
                idx === selectedIndex ? "w-10 bg-uncp-gold" : "w-3 bg-white/40 hover:bg-white/80"
              )}
              aria-label={`Ir a slide ${idx + 1}`}
            />
          ))}
      </div>

    </section>
  );
}
