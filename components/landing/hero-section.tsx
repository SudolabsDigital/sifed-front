"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Estados para Drag/Swipe
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // --- Lógica de Auto-Play ---
  useEffect(() => {
    if (isPaused || isDragging) return;
    timerRef.current = setInterval(nextSlide, 7000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPaused, isDragging]);

  // --- Lógica de Drag/Swipe ---
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startX;
    setTranslateX(diff);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (translateX > 50) {
      prevSlide();
    } else if (translateX < -50) {
      nextSlide();
    }
    setTranslateX(0);
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[calc(100vh-6rem)] overflow-hidden cursor-grab active:cursor-grabbing group/hero select-none bg-brand-950" // Fondo oscuro para evitar flash blanco
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        handleMouseUp();
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >
        
        {/* FONDO: Slider de Imágenes (Full Screen) */}
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1500ms] ease-in-out",
              index === currentSlide ? "opacity-100 z-0" : "opacity-0 -z-10"
            )}
          >
            <Image 
              src={slide.src}
              alt={slide.alt}
              fill
              draggable={false}
              className={cn(
                "object-cover transition-transform duration-[10000ms] ease-linear",
                index === currentSlide && !isDragging ? "scale-105" : "scale-100"
              )}
              style={{ 
                transform: index === currentSlide && isDragging ? `translateX(${translateX}px)` : undefined 
              }}
              priority={index === 0}
            />
            {/* Overlay Oscuro Aumentado para legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/60 to-transparent"></div>
          </div>
        ))}

        {/* CONTENIDO: Texto Superpuesto */}
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 xl:px-24 w-full lg:w-2/3 min-h-[calc(100vh-6rem)] pointer-events-none">
           <div className="max-w-2xl pointer-events-auto">
              
              <h1 className="font-serif text-4xl md:text-6xl xl:text-7xl font-black leading-[1.1] text-white tracking-tight mb-6 drop-shadow-xl">
                {slides[currentSlide].title}
              </h1>

              {/* Texto con más contraste */}
              <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed mb-10 max-w-lg drop-shadow-lg text-shadow">
                {slides[currentSlide].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href={slides[currentSlide].link} 
                  className="group flex h-14 md:h-16 items-center justify-center gap-3 rounded-xl bg-brand-600 px-8 md:px-10 text-base md:text-lg font-extrabold text-white shadow-xl shadow-brand-950/50 transition-all hover:bg-brand-500 hover:-translate-y-1 hover:shadow-2xl sm:w-auto text-center backdrop-blur-sm border border-brand-500/50"
                >
                  <span>{slides[currentSlide].cta}</span>
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

        {/* CONTROLES: Navegación Manual */}
        
        {/* Flechas Laterales (Solo visibles en hover) */}
        <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-4 pointer-events-none">
          <button 
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 flex items-center justify-center pointer-events-auto opacity-0 group-hover/hero:opacity-100 transition-all hover:bg-brand-600 hover:border-brand-600 hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 flex items-center justify-center pointer-events-auto opacity-0 group-hover/hero:opacity-100 transition-all hover:bg-brand-600 hover:border-brand-600 hover:scale-110"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Indicadores Inferiores */}
        <div className="absolute bottom-8 left-8 md:left-16 z-20 flex gap-3 pointer-events-auto">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentSlide(idx); }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500 shadow-sm",
                  idx === currentSlide ? "w-10 bg-uncp-gold" : "w-3 bg-white/40 hover:bg-white/80"
                )}
                aria-label={`Ir a slide ${idx + 1}`}
              />
            ))}
        </div>

    </section>
  );
}
