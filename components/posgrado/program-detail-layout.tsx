"use client";

import { motion } from "framer-motion";
import { ProgramData } from "@/types/programa";
import ProgramHero from "./program-hero";
import CurriculumTable from "./curriculum-table";
import AdmissionUnifiedSection from "./admission-unified-section";
import { ADMISSION_CONFIG } from "@/data/admission-config";
import { 
  Target, 
  Users, 
  UserCheck, 
  Award, 
  BookOpen, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProgramDetailLayoutProps {
  program: ProgramData;
}

export default function ProgramDetailLayout({ program }: ProgramDetailLayoutProps) {
  const [activeTab, setActiveTab] = useState<"info" | "curriculum" | "perfiles">("info");

  const admissionData = program.tipo === "maestria" ? ADMISSION_CONFIG.maestria : ADMISSION_CONFIG.doctorado;

  const tabs = [
    { id: "info", label: "Acerca del Programa", icon: <BookOpen className="w-4 h-4" /> },
    { id: "curriculum", label: "Plan de Estudios", icon: <Target className="w-4 h-4" /> },
    { id: "perfiles", label: "Perfiles y Objetivos", icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <main className="flex-1 w-full bg-white">
      <ProgramHero program={program} />

      {/* Navigation Tabs */}
      <nav className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="flex justify-center gap-2 md:gap-8 py-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "info" | "curriculum" | "perfiles")}
                className={cn(
                  "flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl text-xs md:text-sm font-black uppercase tracking-widest transition-all",
                  activeTab === tab.id 
                    ? "bg-brand-950 text-white shadow-xl scale-105" 
                    : "text-muted-foreground hover:bg-brand-50"
                )}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content Sections */}
      <div className="py-20 container mx-auto px-6 lg:px-12 max-w-7xl">
        
        {activeTab === "info" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-24"
          >
            {/* Acerca de */}
            <section className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-600 mb-4 block">Descripción Académica</span>
                <h2 className="text-4xl font-serif font-black text-brand-950 mb-8 leading-tight">Acerca del Programa</h2>
                <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                  {program.acercaDe}
                </p>
                <div className="mt-10 p-8 rounded-[2rem] bg-brand-50 border border-brand-100">
                  <h4 className="font-serif text-xl font-black text-brand-950 mb-4 flex items-center gap-3">
                    <Award className="w-6 h-6 text-uncp-gold" />
                    Certificación
                  </h4>
                  <p className="text-sm text-brand-800 leading-relaxed">
                    {program.certificacionDetalle}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="p-8 rounded-[2.5rem] border border-border bg-white shadow-sm">
                  <h4 className="text-xs font-black uppercase tracking-widest text-brand-400 mb-6">Objetivos Estratégicos</h4>
                  <ul className="space-y-4">
                    {program.objetivos.map((obj, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                        <span className="text-sm font-bold text-brand-950">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === "curriculum" && (
          <motion.div 
            id="plan-estudios"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-black text-brand-950 mb-4">Plan de Estudios</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Estructura curricular diseñada bajo estándares de calidad internacional, enfocada en la investigación y el desarrollo profesional.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {program.planEstudios.map((ciclo) => (
                <CurriculumTable key={ciclo.numero} ciclo={ciclo} />
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "perfiles" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-12"
          >
            {/* Perfil del Estudiante */}
            <div className="p-10 rounded-[3rem] bg-brand-950 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5">
                <Users size={200} />
              </div>
              <div className="relative z-10">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-uncp-gold mb-4 block">Ingreso</span>
                <h3 className="text-3xl font-serif font-black mb-8 flex items-center gap-4">
                  <UserCheck className="w-8 h-8" />
                  Perfil del Estudiante
                </h3>
                <ul className="space-y-6">
                  {program.perfilEstudiante.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <ArrowRight className="w-5 h-5 text-uncp-gold shrink-0 mt-1" />
                      <p className="text-brand-100 font-medium leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Perfil del Egresado */}
            <div className="p-10 rounded-[3rem] border-2 border-brand-100 bg-white shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-[0.03]">
                <Award size={200} />
              </div>
              <div className="relative z-10">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-600 mb-4 block">Egreso</span>
                <h3 className="text-3xl font-serif font-black text-brand-950 mb-8 flex items-center gap-4">
                  <Award className="w-8 h-8 text-brand-600" />
                  Perfil del Egresado
                </h3>
                <ul className="space-y-6">
                  {program.perfilEgresado.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-1" />
                      <p className="text-muted-foreground font-medium leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

      </div>

      {/* Admission Section (Always visible at the bottom) */}
      <div id="admision">
        <AdmissionUnifiedSection data={admissionData} />
      </div>
    </main>
  );
}
