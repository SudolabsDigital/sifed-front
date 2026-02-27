"use client";

import { useState, useMemo } from "react";
import { ProgramData, ProgramType } from "@/types/programa";
import ProgramCard from "./program-card";
import { cn } from "@/lib/utils";

interface ProgramGridProps {
  programs: ProgramData[];
  type: ProgramType;
}

export default function ProgramGrid({ programs, type }: ProgramGridProps) {
  // Extraer categorías únicas para los tabs
  const categories = useMemo(() => {
    const cats = Array.from(new Set(programs.map((p) => p.categoria).filter(Boolean)));
    return ["Todos", ...cats];
  }, [programs]);

  const [activeCategory, setActiveTab] = useState("Todos");

  const filteredPrograms = useMemo(() => {
    if (activeCategory === "Todos") return programs;
    return programs.filter((p) => p.categoria === activeCategory);
  }, [programs, activeCategory]);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        
        {/* Título de Sección */}
        <div className="text-center mb-16">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-600 mb-4 block">Nuestros Programas</span>
          <h2 className="text-4xl md:text-5xl font-serif font-black text-brand-950 mb-6">
            Elige tu especialización
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explora nuestras {type === 'maestria' ? 'maestrías' : 'opciones'} diseñadas para impulsar tu crecimiento profesional y capacidad investigadora.
          </p>
        </div>

        {/* Tab Selector (Solo si hay más de una categoría) */}
        {categories.length > 2 && (
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat!)}
                className={cn(
                  "px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all",
                  activeCategory === cat
                    ? "bg-brand-950 text-white shadow-xl scale-105"
                    : "bg-brand-50 text-muted-foreground hover:bg-brand-100 hover:text-brand-950"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid de Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-brand-100 rounded-[3rem]">
            <p className="text-muted-foreground font-medium">No se encontraron programas en esta categoría.</p>
          </div>
        )}
      </div>
    </section>
  );
}
