import Link from "next/link";
import Image from "next/image";
import { Newspaper, MonitorPlay, ArrowRight } from "lucide-react";

export default function EcosistemaSection() {
  return (
    <section className="w-full bg-brand-50 min-h-screen flex items-center py-20 px-6 lg:px-12 border-b border-border overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
            <div className="mb-10 text-center md:text-left">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-uncp-gold mb-2 block">Ecosistema Digital</span>
               <h2 className="text-3xl md:text-4xl font-serif font-black text-brand-950 leading-tight">Plataformas Académicas</h2>
               <p className="text-base text-muted-foreground font-medium mt-3">Sistemas integrados para la gestión universitaria.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 h-full">
              
              {/* CARD 1: PORTAL */}
              <div className="group relative flex flex-col rounded-[2rem] border-2 border-background bg-background p-8 shadow-sm transition-all hover:border-brand-300 hover:shadow-2xl hover:shadow-brand-950/5 cursor-pointer">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Image src="/images/Escudo_UNCP.webp" alt="" width={180} height={180} />
                </div>
                
                <div className="relative z-10 flex-1 flex flex-col justify-between">
                   <div>
                      <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 border border-brand-100">
                         <Newspaper className="h-7 w-7" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-950 mb-3">Portal Informativo</h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                        Espacio de acceso público. Consulta reglamentos, cronogramas, noticias y comunicados oficiales.
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                         {['Transparencia', 'Noticias', 'Eventos', 'Calendario'].map(item => (
                            <li key={item} className="flex items-center gap-2 text-brand-800 font-bold text-xs md:text-sm">
                               <div className="h-1.5 w-1.5 rounded-full bg-uncp-gold shrink-0"></div> {item}
                            </li>
                         ))}
                      </ul>
                   </div>
                   <div className="mt-6 pt-6 border-t border-border">
                      <Link href="/posgrado" className="inline-flex items-center gap-2 text-base font-bold text-brand-600 underline decoration-2 underline-offset-4 hover:text-brand-800 transition-colors">
                          Visitar Portal Público <ArrowRight className="h-4 w-4" />
                      </Link>
                   </div>
                </div>
              </div>

              {/* CARD 2: AULA VIRTUAL */}
              <div className="group relative flex flex-col rounded-[2rem] bg-brand-950 p-8 text-white shadow-2xl transition-all hover:-translate-y-2 hover:shadow-brand-950/40 cursor-pointer overflow-hidden">
                {/* Fondo decorativo */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-950 to-brand-800"></div>
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-600 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-all duration-1000 transform group-hover:scale-110 grayscale group-hover:grayscale-0">
                   <Image src="/images/logoeducacion.webp" alt="" width={160} height={160} className="object-contain" />
                </div>

                <div className="relative z-10 flex-1 flex flex-col justify-between">
                   <div>
                      <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white border border-white/10 backdrop-blur-md group-hover:bg-brand-600 group-hover:border-brand-500 transition-all">
                         <MonitorPlay className="h-7 w-7" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">Intranet SIFED</h3>
                      <p className="text-sm md:text-base text-brand-50/80 leading-relaxed mb-6">
                        Gestión académica privada. Accede de forma segura a tus cursos, notas, matrícula y trámites digitales.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                            <div className="text-xl font-bold text-uncp-gold mb-0.5">24/7</div>
                            <div className="text-[10px] text-brand-300 uppercase tracking-widest font-bold">Disponibilidad</div>
                         </div>
                         <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                            <div className="text-xl font-bold text-brand-400 mb-0.5">100%</div>
                            <div className="text-[10px] text-brand-300 uppercase tracking-widest font-bold">Seguro</div>
                         </div>
                      </div>
                   </div>
                   <div className="mt-6 pt-6 border-t border-white/10">
                      <Link href="/login" className="flex items-center justify-center w-full py-3 rounded-xl bg-brand-600 text-white font-black text-base hover:bg-white hover:text-brand-950 transition-all shadow-xl hover:shadow-brand-600/20">
                          Iniciar Sesión Segura
                      </Link>
                   </div>
                </div>
              </div>

            </div>
        </div>
    </section>
  );
}