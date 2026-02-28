"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home, Clock, Hash, GraduationCap, MessageCircle } from "lucide-react";
import { ProgramData } from "@/types/programa";
import { cn } from "@/lib/utils";

interface ProgramHeroProps {
  program: ProgramData;
}

export default function ProgramHero({ program }: ProgramHeroProps) {
  const breadcrumbs = [
    { label: "Posgrado", href: "/posgrado" },
    { label: `${program.tipo.charAt(0).toUpperCase()}${program.tipo.slice(1)}s`, href: `/posgrado/${program.tipo}s` },
    { label: program.titulo }
  ];

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-brand-950">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 grayscale transition-transform duration-[20s] scale-105"
          style={{ backgroundImage: `url('${program.imagenHero}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/60 to-brand-950/20 z-10" />
      </div>

      {/* Breadcrumbs */}
      <div className="absolute top-8 left-0 w-full z-30 px-6 lg:px-12">
        <nav aria-label="Breadcrumb" className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/90">
          <Link href="/" className="hover:text-uncp-gold transition-colors"><Home className="w-3 h-3" /></Link>
          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <ChevronRight className="w-2.5 h-2.5 text-white/20" />
              {item.href ? (
                <Link href={item.href} className="hover:text-uncp-gold transition-colors">{item.label}</Link>
              ) : (
                <span className="text-uncp-gold">{item.label}</span>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-20 pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-uncp-gold/10 border border-uncp-gold/20 text-uncp-gold text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              Programa de {program.tipo}
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-black text-white mb-8 leading-[0.95] tracking-tighter">
              {program.tituloHero}
            </h1>
            <p className="text-xl text-brand-50/70 leading-relaxed max-w-xl mb-12 font-medium">
              {program.descripcionCorta}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="#admision" className="px-8 py-4 bg-uncp-gold text-brand-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-uncp-gold/10">
                Guía de Inscripción
              </Link>
              <Link href="#plan-estudios" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">
                Ver Plan de Estudios
              </Link>
            </div>
          </motion.div>

          {/* Stats Box & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Clock, label: "Duración", value: program.infoGeneral.duracion },
                { icon: Hash, label: "Créditos", value: `${program.infoGeneral.totalCreditos} Totales` },
                { icon: GraduationCap, label: "Grado", value: program.infoGeneral.certificacion, className: "col-span-2" },
              ].map((stat, idx) => (
                <div key={idx} className={cn("p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm", stat.className)}>
                  <stat.icon className="w-6 h-6 text-uncp-gold mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">{stat.label}</p>
                  <p className="text-sm font-black text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Quick Contact CTA */}
            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-uncp-gold/20 to-uncp-gold/5 border border-uncp-gold/30 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-20 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                <MessageCircle className="w-24 h-24 text-uncp-gold" />
              </div>
              <div className="relative z-10">
                <h3 className="text-white font-serif text-xl font-bold mb-2">¿Tienes dudas sobre el programa?</h3>
                <p className="text-white/70 text-sm mb-6 max-w-sm">
                  Habla con un asesor académico para resolver tus consultas sobre admisión, inversión o plan de estudios.
                </p>
                <a 
                  href={`https://wa.me/51949260658?text=Hola,%20quisiera%20información%20sobre%20el%20programa%20de%20${encodeURIComponent(program.titulo)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-uncp-gold text-brand-950 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-brand-950 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contactar Asesor
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
