"use client";

import { motion } from "framer-motion";

export default function PosgradoHero() {
  return (
    <section className="relative h-[calc(100vh-96px)] w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background with Placeholder Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Imagen: Más opaca y con brillo natural pero reducido para ver los detalles del campus */}
        <div 
          className="absolute inset-0 bg-[url('/images/fondouncp1920x1080.webp')] bg-cover bg-center grayscale opacity-60 contrast-110 brightness-50 z-0" 
        />
        
        {/* Gradiente sutil: Solo para asegurar contraste con el texto, sin teñir toda la imagen */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent z-10" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-uncp-gold font-bold uppercase tracking-[0.3em] text-xs mb-6 block">
            Facultad de Educación - UNCP
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter mb-8">
            EXCELENCIA EN <br />
            <span className="text-brand-300">POSGRADO</span>
          </h1>
          <p className="text-brand-50/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Formamos investigadores y líderes educativos con los más altos estándares científicos y compromiso social en la región central del país.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
