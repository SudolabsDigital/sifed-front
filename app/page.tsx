import Header from "@/components/layout/Header";
import HeroSection from "@/components/landing/hero-section";
import EcosistemaSection from "@/components/landing/ecosistema-section";
import InfoSection from "@/components/landing/info-section";
import Image from "next/image";
import Link from "next/link";
import { 
  MonitorPlay, 
  BookOpen, 
  HelpCircle,
  MapPin, 
  Mail, 
  Phone,
  Facebook,
  Youtube,
  Linkedin
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans selection:bg-brand-600 selection:text-white">
      
      {/* HEADER MEGA MENU */}
      <Header />

      <main className="flex-1 w-full max-w-[1920px] mx-auto flex flex-col">
        <HeroSection />
        <EcosistemaSection />
        <InfoSection />
      </main>

      {/* FOOTER: COMPLETO (Secciones fuera de pantalla) */}
      <footer className="bg-brand-50 border-t border-border pt-24 pb-12 flex-none">
        <div className="mx-auto max-w-[1920px] px-6 lg:px-12">
          
          <div className="grid gap-16 lg:grid-cols-4 mb-20">
            {/* Columna Marca */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-4 mb-8">
                 <Image src="/images/Escudo_UNCP.webp" alt="UNCP" width={56} height={56} className="grayscale hover:grayscale-0 transition-all opacity-80" />
                 <div className="flex flex-col">
                    <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Facultad de</span>
                    <span className="font-serif font-black text-brand-950 text-2xl leading-none">Educación</span>
                 </div>
              </div>
              <p className="text-sm font-medium leading-relaxed text-muted-foreground max-w-xs mb-10">
                Formando líderes educativos con excelencia, ética y compromiso social desde 1959.
              </p>
              <div className="flex gap-5">
                 <button className="h-12 w-12 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:bg-brand-600 hover:text-white transition-all shadow-sm">
                    <Facebook className="h-6 w-6" />
                 </button>
                 <button className="h-12 w-12 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:bg-red-600 hover:text-white transition-all shadow-sm">
                    <Youtube className="h-6 w-6" />
                 </button>
                 <button className="h-12 w-12 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:bg-blue-700 hover:text-white transition-all shadow-sm">
                    <Linkedin className="h-6 w-6" />
                 </button>
              </div>
            </div>
            
            {/* Columna Plataforma */}
            <div>
              <h4 className="mb-8 text-xs font-black text-brand-950 uppercase tracking-[0.2em]">Plataforma</h4>
              <ul className="space-y-5 text-sm font-bold text-muted-foreground">
                <li><Link href="/login" className="hover:text-brand-600 transition-colors flex items-center gap-3"><MonitorPlay className="h-5 w-5" /> Aula Virtual</Link></li>
                <li><button className="hover:text-brand-600 transition-colors flex items-center gap-3"><Mail className="h-5 w-5" /> Correo Institucional</button></li>
                <li><button className="hover:text-brand-600 transition-colors flex items-center gap-3"><BookOpen className="h-5 w-5" /> Biblioteca Virtual</button></li>
                <li><button className="hover:text-brand-600 transition-colors flex items-center gap-3"><HelpCircle className="h-5 w-5" /> Soporte Técnico</button></li>
              </ul>
            </div>

            {/* Columna Institucional */}
            <div>
              <h4 className="mb-8 text-xs font-black text-brand-950 uppercase tracking-[0.2em]">Institucional</h4>
              <ul className="space-y-5 text-sm font-bold text-muted-foreground">
                <li><button className="hover:text-brand-600 transition-colors">Nosotros</button></li>
                <li><button className="hover:text-brand-600 transition-colors">Autoridades</button></li>
                <li><button className="hover:text-brand-600 transition-colors">Transparencia</button></li>
                <li><button className="hover:text-brand-600 transition-colors">Documentos Normativos</button></li>
              </ul>
            </div>

            {/* Columna Contacto */}
            <div>
              <h4 className="mb-8 text-xs font-black text-brand-950 uppercase tracking-[0.2em]">Contacto</h4>
              <ul className="space-y-5 text-sm font-bold text-muted-foreground">
                <li className="flex items-start gap-4 leading-snug">
                   <MapPin className="h-6 w-6 text-brand-600 shrink-0 mt-0.5" />
                   <span>Av. Mariscal Castilla N° 3909<br/>Huancayo, Junín</span>
                </li>
                <li className="flex items-center gap-4">
                   <Mail className="h-6 w-6 text-brand-600 shrink-0" />
                   <span>posgrado@uncp.edu.pe</span>
                </li>
                <li className="flex items-center gap-4">
                   <Phone className="h-6 w-6 text-brand-600 shrink-0" />
                   <span>(064) 481060</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-black text-muted-foreground uppercase tracking-widest">
            <p>© 2026 Universidad Nacional del Centro del Perú.</p>
            <div className="flex gap-8">
              <button className="hover:text-brand-950 transition-colors">Privacidad</button>
              <button className="hover:text-brand-950 transition-colors">Términos</button>
              <button className="hover:text-brand-950 transition-colors">Reclamaciones</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
