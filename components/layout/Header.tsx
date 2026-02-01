"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, LogIn, ChevronRight } from "lucide-react";

// Estructura de datos optimizada
const menuItems = [
  {
    label: "La Facultad",
    featured: {
      title: "Nuestra Facultad",
      desc: "Líderes en formación docente desde 1959.",
      link: "/nosotros",
      image: "/images/Escudo_UNCP.webp"
    },
    cols: [
      {
        title: "Identidad",
        links: ["Misión y Visión", "Estatuto", "Organigrama", "Historia"]
      },
      {
        title: "Gestión",
        links: ["Autoridades", "Consejo de Facultad", "Documentos de Gestión", "Directorio"]
      },
      {
        title: "Oficinas",
        links: ["Secretaria General", "Bienestar Universitario", "Calidad Académica", "Grados y Títulos"]
      }
    ]
  },
  {
    label: "Admisión",
    featured: {
      title: "Admisión 2026",
      desc: "Postula a nuestros programas de pregrado y posgrado.",
      link: "/admision",
      image: "/images/logoeducacion.webp"
    },
    cols: [
      {
        title: "Pregrado",
        links: ["Modalidad Ordinaria", "CEPRE-UNCP", "Segunda Especialidad", "Traslados Externos"]
      },
      {
        title: "Posgrado",
        links: ["Maestrías", "Doctorados", "Diplomados", "Requisitos"]
      }
    ]
  },
  {
    label: "Académico",
    featured: {
        title: "Oferta Educativa",
        desc: "Conoce nuestros planes de estudio y mallas curriculares.",
        link: "/programas",
        image: "/images/logoeducacion.webp"
    },
    cols: [
      {
        title: "Escuelas Profesionales",
        links: ["Educación Inicial", "Educación Primaria", "Educación Secundaria", "Filosofía y CC.SS"]
      },
      {
        title: "Estudiantes",
        links: ["Matrícula Online", "Horarios", "Tutoría", "Federación Estudiantil"]
      },
      {
        title: "Especialización",
        links: ["Maestría en Educación", "Doctorado en Ciencias", "Segunda Especialidad"]
      }
    ]
  },
  {
    label: "Investigación",
    featured: {
        title: "Ciencia y Tecnología",
        desc: "Producción científica de alto impacto.",
        link: "/investigacion",
        image: "/images/Escudo_UNCP.webp"
    },
    cols: [
      {
        title: "Direcciones",
        links: ["Instituto de Investigación", "Incubadora de Empresas", "Innovación y Transferencia"]
      },
      {
        title: "Producción",
        links: ["Repositorio de Tesis", "Revistas Científicas", "Artículos Indexados"]
      },
      {
        title: "Sistemas",
        links: ["CTI Vitae", "Docentes Renacyt", "Grupos de Investigación"]
      }
    ]
  }
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border font-sans transition-all">
      <div className="mx-auto flex h-24 max-w-[1920px] items-center justify-between px-6 lg:px-12 relative z-50">
        
        {/* BRAND */}
        <div className="flex items-center gap-4 flex-shrink-0 cursor-pointer group">
          <Image src="/images/Escudo_UNCP.webp" alt="UNCP" width={44} height={44} className="h-11 w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-sm" />
          <div className="hidden h-10 w-px bg-border xl:block"></div>
          <div className="hidden xl:flex items-center gap-3">
             <Image src="/images/logoeducacion.webp" alt="Logo Educación" width={44} height={44} className="h-11 w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-sm" />
             <div className="flex flex-col justify-center">
               <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-tight">Universidad Nacional del Centro del Perú</span>
               <span className="font-serif text-lg font-bold leading-none text-brand-950 group-hover:text-brand-600 transition-colors">Facultad de Educación</span>
             </div>
          </div>
        </div>

        {/* MEGA MENU NAVIGATION */}
        <nav className="hidden lg:flex h-full items-center gap-2">
          {menuItems.map((item) => (
            <div key={item.label} className="group h-full flex items-center">
              {/* Menu Trigger */}
              <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-muted-foreground hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">
                {item.label}
                <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180 text-muted-foreground/50 group-hover:text-brand-600" />
              </button>

              {/* Mega Menu Dropdown */}
              <div className="absolute left-0 top-[calc(100%-1px)] w-full bg-background border-t-4 border-brand-600 shadow-2xl opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-40">
                 <div className="max-w-[1920px] mx-auto">
                    <div className="flex">
                        
                        {/* COLUMNA DESTACADA (25% Ancho) */}
                        <div className="w-1/4 bg-brand-50 p-10 border-r border-border flex flex-col justify-between shrink-0">
                            <div>
                                <span className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-4 block">Destacado</span>
                                <h3 className="font-serif text-2xl font-bold text-brand-950 mb-3">{item.featured.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{item.featured.desc}</p>
                                <Link href={item.featured.link} className="inline-flex items-center gap-2 text-sm font-bold text-brand-950 hover:text-brand-600 transition-colors group/link">
                                    Ver más <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                                </Link>
                            </div>
                            <div className="mt-8 opacity-10 grayscale">
                                <Image src={item.featured.image} alt="" width={120} height={120} className="object-contain" />
                            </div>
                        </div>

                        {/* COLUMNAS DE ENLACES (75% Ancho - Grid Automático) */}
                        <div className="w-3/4 p-10 grid grid-cols-3 gap-x-12 gap-y-10">
                           {item.cols.map((col) => (
                              <div key={col.title}>
                                 <h4 className="font-bold text-brand-950 mb-4 pb-2 border-b border-border flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-uncp-gold"></span>
                                    {col.title}
                                 </h4>
                                 <ul className="space-y-2.5">
                                    {col.links.map((link) => (
                                       <li key={link}>
                                          <Link href="#" className="text-sm text-muted-foreground hover:text-brand-600 hover:font-semibold transition-all block py-0.5 hover:translate-x-1">
                                             {link}
                                          </Link>
                                       </li>
                                    ))}
                                 </ul>
                              </div>
                           ))}
                        </div>

                    </div>
                 </div>
              </div>
            </div>
          ))}
        </nav>

        {/* CTA: INTRANET */}
        <div className="flex items-center gap-4 flex-shrink-0">
           <Link 
            href="/login" 
            className="group flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-extrabold text-white transition-all hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-600/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
          >
            <LogIn className="h-4 w-4 text-white/90 group-hover:text-white transition-colors" />
            <span>Intranet</span>
          </Link>
        </div>
      </div>
      
      {/* Overlay para oscurecer el fondo */}
      <div className="hidden lg:block fixed inset-0 top-24 bg-brand-950/20 backdrop-blur-[2px] opacity-0 pointer-events-none transition-opacity duration-300 z-30 group-hover:opacity-100 has-[:hover]:opacity-100" />
    </header>
  );
}