import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full bg-brand-50 min-h-[calc(100vh-6rem)] flex flex-col lg:flex-row overflow-hidden border-b border-border">
        
        {/* IZQUIERDA: Contenido (55% Ancho) */}
        <div className="lg:w-[55%] flex flex-col justify-center px-8 py-12 md:px-16 xl:px-24 bg-background relative z-10 order-2 lg:order-1">
           {/* Decoración fondo */}
           <div className="absolute top-0 right-0 w-px h-full bg-border hidden lg:block"></div>
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-600 via-uncp-gold to-brand-600"></div>

           <div className="max-w-2xl mx-auto lg:mx-0">
              
              <h1 className="font-serif text-4xl md:text-6xl xl:text-7xl font-black leading-[1.1] text-brand-950 tracking-tight mb-6">
                Excelencia <br/>
                <span className="text-brand-600 relative inline-block">
                  Educativa
                  <svg className="absolute -bottom-2 left-0 w-full h-2 md:h-3 text-uncp-gold/80" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" /></svg>
                </span> Digital.
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed mb-8 max-w-lg">
                La plataforma oficial SIFED centraliza matrículas, cursos y trámites. Diseñada para docentes y estudiantes de la UNCP.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/login" 
                  className="group flex h-14 md:h-16 items-center justify-center gap-3 rounded-xl bg-brand-600 px-8 md:px-10 text-base md:text-lg font-extrabold text-white shadow-xl shadow-brand-950/20 transition-all hover:bg-brand-800 hover:-translate-y-1 hover:shadow-2xl sm:w-auto text-center"
                >
                  <span>Acceder al Aula</span>
                  <ArrowRight className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} />
                </Link>
                
                <Link
                  href="/login"
                  className="flex h-14 md:h-16 items-center justify-center rounded-xl bg-background border-2 border-border px-8 md:px-10 text-base md:text-lg font-bold text-brand-950 transition-all hover:border-brand-300 hover:bg-brand-50 sm:w-auto text-center"
                >
                  Portal Informativo
                </Link>
              </div>
           </div>
        </div>

        {/* DERECHA: Imagen (45% Ancho) */}
        <div className="relative h-[40vh] lg:h-auto lg:min-h-full lg:w-[45%] bg-brand-50 border-l border-border order-1 lg:order-2">
           <Image 
             src="/images/portada.webp" 
             alt="Estudiantes Facultad Educación" 
             fill
             className="object-cover"
             priority
             sizes="(max-width: 1024px) 100vw, 50vw"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-brand-950/50 to-transparent lg:bg-gradient-to-r lg:from-brand-950/20 lg:to-transparent opacity-60"></div>
           
           {/* Social Proof Flotante */}
           <div className="absolute bottom-6 left-6 right-6 lg:bottom-12 lg:left-12 lg:right-auto p-4 lg:p-6 bg-background/90 backdrop-blur-md border border-white/40 rounded-2xl shadow-2xl lg:max-w-xs">
              <div className="flex items-center gap-4 mb-2">
                 <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-brand-50 border-2 border-background flex items-center justify-center text-xs font-bold text-muted-foreground overflow-hidden relative">
                        <div className="absolute inset-0 bg-brand-50 animate-pulse"></div>
                    </div>)}
                 </div>
                 <span className="text-sm font-bold text-brand-800">+2.5k Usuarios</span>
              </div>
              <p className="text-[10px] lg:text-xs font-semibold text-muted-foreground uppercase tracking-wider">Comunidad SIFED Activa</p>
           </div>
        </div>
    </section>
  );
}
