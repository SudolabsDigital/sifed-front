"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, LogIn, ChevronRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

// Estructura de datos optimizada y realista
const menuItems = [
  {
    label: "Posgrado",
    featured: {
      title: "Unidad de Posgrado",
      desc: "Excelencia académica y formación de investigadores líderes.",
      link: "/posgrado",
      image: "/images/logoeducacion.webp"
    },
    cols: [
      {
        title: "Programas Académicos",
        links: [
          { label: "Maestrías", href: "/posgrado/maestrias" },
          { label: "Doctorados", href: "/posgrado/doctorados" }
        ]
      },
      {
        title: "Admisión 2026",
        links: [
          { label: "Proceso de Admisión", href: "/posgrado/admision" },
          { label: "Guía Maestría", href: "/posgrado/admision/maestria" },
          { label: "Guía Doctorado", href: "/posgrado/admision/doctorado" }
        ]
      },
      {
        title: "Comunidad",
        links: [
          { label: "Plana Docente", href: "/posgrado/plana-docente" },
        ]
      }
    ]
  },
  {
    label: "Investigación",
    featured: {
        title: "Investigación",
        desc: "Producción científica y sustentación de tesis doctorales.",
        link: "/galeria-fotos/investigacion",
        image: "/images/Escudo_UNCP.webp"
    },
    cols: [
      {
        title: "Producción",
        links: [
          { label: "Galería de Investigación", href: "/galeria-fotos/investigacion" },
          { label: "Sustentaciones", href: "/galeria-fotos/sustentaciones" }
        ]
      },
      {
        title: "Recursos",
        links: [
          { label: "Normativa de Grados", href: "/documentos-normativos" }
        ]
      }
    ]
  },
  {
    label: "Actualidad",
    featured: {
        title: "Noticias y Eventos",
        desc: "Entérate de lo último en nuestra facultad.",
        link: "/noticias",
        image: "/images/logoeducacion.webp"
    },
    cols: [
      {
        title: "Noticias",
        links: [
          { label: "Últimas Noticias", href: "/noticias" }
        ]
      },
      {
        title: "Galería Multimedia",
        links: [
          { label: "Galería General", href: "/galeria-fotos" },
          { label: "Eventos Académicos", href: "/galeria-fotos/eventos" }
        ]
      }
    ]
  },
  {
    label: "Transparencia",
    featured: {
        title: "Documentos",
        desc: "Acceso a la información pública y normativa institucional.",
        link: "/documentos-normativos",
        image: "/images/Escudo_UNCP.webp"
    },
    cols: [
      {
        title: "Gestión",
        links: [
          { label: "Documentos Normativos", href: "/documentos-normativos" }
        ]
      }
    ]
  }
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveSubmenu(null);
  }, [pathname]);

  // Bloquear scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const toggleSubmenu = (label: string) => {
    setActiveSubmenu(activeSubmenu === label ? null : label);
  };

  return (
    <header className="relative z-50 w-full bg-background border-b border-border font-sans">
      <div className="mx-auto flex h-20 lg:h-24 max-w-[1920px] items-center justify-between px-4 sm:px-6 lg:px-12 relative z-50">
        
        {/* BRAND */}
        <Link href="/" className="flex items-center gap-2 lg:gap-4 flex-shrink-0 cursor-pointer group relative z-50 max-w-[85%] lg:max-w-none">
          {/* Logo UNCP */}
          <Image src="/images/Escudo_UNCP.webp" alt="UNCP" width={40} height={40} className="h-8 w-auto lg:h-11 object-contain shrink-0" />
          
          {/* Separador */}
          <div className="h-8 lg:h-10 w-px bg-border shrink-0"></div>
          
          {/* Logo Educación + Texto */}
          <div className="flex items-center gap-2 lg:gap-3 overflow-hidden">
             <Image src="/images/logoeducacion.webp" alt="Logo Educación" width={40} height={40} className="h-8 w-auto lg:h-11 object-contain shrink-0" />
             <div className="flex flex-col justify-center min-w-0">
               <span className="text-[6px] sm:text-[8px] lg:text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-tight truncate">Universidad Nacional del Centro del Perú</span>
               <span className="font-serif text-sm sm:text-base lg:text-lg font-bold leading-none text-brand-950 group-hover:text-brand-600 transition-colors truncate">Facultad de Educación</span>
             </div>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex h-full items-center gap-1">
          
          <Link 
            href="/noticias" 
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-muted-foreground hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all"
          >
            Noticias
          </Link>

          {menuItems.map((item) => (
            <div key={item.label} className="group h-full flex items-center">
              <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-muted-foreground hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">
                {item.label}
                <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180 text-muted-foreground/50 group-hover:text-brand-600" />
              </button>

              {/* Mega Menu Dropdown */}
              <div className="absolute left-0 top-[calc(100%-1px)] w-full bg-background border-t-4 border-brand-600 shadow-2xl opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-40">
                 <div className="max-w-[1920px] mx-auto">
                    <div className="flex">
                        
                        {/* COLUMNA DESTACADA */}
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

                        {/* COLUMNAS DE ENLACES */}
                        <div className="w-3/4 p-10 grid grid-cols-3 gap-x-12 gap-y-10">
                           {item.cols.map((col) => (
                              <div key={col.title}>
                                 <h4 className="font-bold text-brand-950 mb-4 pb-2 border-b border-border flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-uncp-gold"></span>
                                    {col.title}
                                 </h4>
                                 <ul className="space-y-2.5">
                                    {col.links.map((link) => (
                                       <li key={link.label}>
                                        <Link
                                          href={link.href}
                                          className="text-sm text-muted-foreground hover:text-brand-600 hover:font-semibold transition-all block py-0.5 hover:translate-x-1"
                                        >
                                          {link.label}
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

        {/* ACTIONS & MOBILE TOGGLE */}
        <div className="flex items-center gap-3 lg:gap-4 relative z-50">
           <Link 
            href="/login" 
            className="hidden lg:flex group items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 lg:px-6 lg:py-3 text-sm font-extrabold text-white transition-all hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-600/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
          >
            <LogIn className="h-4 w-4 text-white/90 group-hover:text-white transition-colors" />
            <span>Intranet</span>
          </Link>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-brand-950 hover:bg-brand-50 transition-colors"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>
      
      {/* MOBILE MENU OVERLAY */}
      <div 
        className={cn(
          "fixed inset-0 bg-background z-40 lg:hidden transition-all duration-300 ease-in-out flex flex-col pt-24 pb-8 px-6 overflow-y-auto",
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <div className="flex-1 space-y-6">
          <Link 
            href="/noticias" 
            className="flex items-center justify-between text-lg font-bold text-brand-950 py-3 border-b border-border"
          >
            Noticias <ChevronRight className="h-5 w-5 text-brand-300" />
          </Link>

          {menuItems.map((item) => (
            <div key={item.label} className="border-b border-border pb-2">
              <button 
                onClick={() => toggleSubmenu(item.label)}
                className="flex w-full items-center justify-between py-3 text-lg font-bold text-brand-950"
              >
                {item.label}
                <ChevronDown 
                  className={cn(
                    "h-5 w-5 text-brand-400 transition-transform duration-300",
                    activeSubmenu === item.label && "rotate-180 text-brand-600"
                  )} 
                />
              </button>
              
              <div className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out space-y-4",
                activeSubmenu === item.label ? "max-h-[1000px] opacity-100 pt-2 pb-4" : "max-h-0 opacity-0"
              )}>
                {/* Mobile Featured Link */}
                <Link 
                  href={item.featured.link}
                  className="flex items-center gap-3 p-3 bg-brand-50 rounded-xl"
                >
                  <div className="h-8 w-8 rounded-lg bg-white p-1 flex items-center justify-center border border-brand-100">
                    <Image src={item.featured.image} alt="" width={20} height={20} className="object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-brand-600 uppercase tracking-wider block">Principal</span>
                    <span className="text-sm font-bold text-brand-950">{item.featured.title}</span>
                  </div>
                </Link>

                {/* Mobile Columns */}
                <div className="space-y-6 pl-2">
                  {item.cols.map((col) => (
                    <div key={col.title}>
                      <h5 className="text-xs font-black uppercase tracking-widest text-brand-400 mb-3 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-brand-400"></span>
                        {col.title}
                      </h5>
                      <ul className="space-y-3 pl-3 border-l border-brand-100">
                        {col.links.map((link) => (
                          <li key={link.label}>
                            <Link 
                              href={link.href}
                              className="text-sm font-medium text-muted-foreground hover:text-brand-600 block"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Footer Actions */}
        <div className="mt-8 pt-8 border-t border-border space-y-4">
          <Link 
            href="/login" 
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-4 text-base font-extrabold text-white shadow-lg active:scale-95 transition-transform"
          >
            <LogIn className="h-5 w-5" />
            Ingresar a Intranet
          </Link>
        </div>
      </div>

      {/* Overlay para oscurecer el fondo en desktop */}
      <div className="hidden lg:block fixed inset-0 top-24 bg-brand-950/20 backdrop-blur-[2px] opacity-0 pointer-events-none transition-opacity duration-300 z-30 group-hover:opacity-100 has-[:hover]:opacity-100" />
    </header>
  );
}
