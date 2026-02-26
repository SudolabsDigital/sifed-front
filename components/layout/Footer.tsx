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

export default function Footer() {
  return (
    <footer className="bg-brand-50 border-t border-border pt-24 pb-12 flex-none">
      <div className="mx-auto max-w-[1920px] px-6 lg:px-12">
        
        <div className="grid gap-16 lg:grid-cols-4 mb-20">
          {/* Columna Marca */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-8">
               <div className="flex items-center gap-3">
                  <Image src="/images/Escudo_UNCP.webp" alt="UNCP" width={48} height={48} className="object-contain" />
                  <div className="h-10 w-px bg-border"></div>
                  <Image src="/images/logoeducacion.webp" alt="Educación" width={48} height={48} className="object-contain" />
               </div>
               <div className="flex flex-col justify-center">
                  <span className="text-[7px] font-black uppercase tracking-widest text-muted-foreground leading-tight">UNCP</span>
                  <span className="text-[9px] font-bold text-brand-700 leading-tight">Facultad de Educación</span>
                  <span className="font-serif font-black text-brand-950 text-xl leading-none mt-0.5">Posgrado</span>
               </div>
            </div>
            <p className="text-sm font-medium leading-relaxed text-muted-foreground max-w-xs mb-10">
              Excelencia académica y formación de investigadores líderes con compromiso social y rigor científico.
            </p>
            <div className="flex gap-4">
               <Link href="https://facebook.com" className="h-11 w-11 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:bg-brand-600 hover:text-white transition-all shadow-sm">
                  <Facebook className="h-5 w-5" />
               </Link>
               <Link href="https://youtube.com" className="h-11 w-11 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:bg-red-600 hover:text-white transition-all shadow-sm">
                  <Youtube className="h-5 w-5" />
               </Link>
               <Link href="https://linkedin.com" className="h-11 w-11 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:bg-blue-700 hover:text-white transition-all shadow-sm">
                  <Linkedin className="h-5 w-5" />
               </Link>
            </div>
          </div>
          
          {/* Columna Programas */}
          <div>
            <h4 className="mb-8 text-xs font-black text-brand-950 uppercase tracking-[0.2em]">Programas</h4>
            <ul className="space-y-4 text-sm font-bold text-muted-foreground">
              <li><Link href="/posgrado/maestrias" className="hover:text-brand-600 transition-colors">Maestrías</Link></li>
              <li><Link href="/posgrado/doctorados" className="hover:text-brand-600 transition-colors">Doctorados</Link></li>
              <li><Link href="/posgrado/admision" className="hover:text-brand-600 transition-colors">Proceso de Admisión</Link></li>
              <li><Link href="/posgrado/plana-docente" className="hover:text-brand-600 transition-colors">Plana Docente</Link></li>
            </ul>
          </div>

          {/* Columna Investigación */}
          <div>
            <h4 className="mb-8 text-xs font-black text-brand-950 uppercase tracking-[0.2em]">Investigación</h4>
            <ul className="space-y-4 text-sm font-bold text-muted-foreground">
              <li><Link href="/galeria-fotos/investigacion" className="hover:text-brand-600 transition-colors">Galería de Investigación</Link></li>
              <li><Link href="/galeria-fotos/sustentaciones" className="hover:text-brand-600 transition-colors">Sustentaciones</Link></li>
              <li><Link href="/documentos-normativos" className="hover:text-brand-600 transition-colors">Normativa de Grados</Link></li>
              <li><Link href="/noticias" className="hover:text-brand-600 transition-colors">Actualidad</Link></li>
            </ul>
          </div>

          {/* Columna Servicios Digitales */}
          <div>
            <h4 className="mb-8 text-xs font-black text-brand-950 uppercase tracking-[0.2em]">Ecosistema</h4>
            <ul className="space-y-4 text-sm font-bold text-muted-foreground">
              <li><Link href="/login" className="hover:text-brand-600 transition-colors flex items-center gap-2"><MonitorPlay className="h-4 w-4" /> Aula Virtual</Link></li>
              <li><Link href="/posgrado/admision" className="hover:text-brand-600 transition-colors flex items-center gap-2"><BookOpen className="h-4 w-4" /> Guía de Inscripción</Link></li>
              <li><Link href="/documentos-normativos" className="hover:text-brand-600 transition-colors flex items-center gap-2"><HelpCircle className="h-4 w-4" /> Soporte Académico</Link></li>
              <li><Link href="mailto:posgrado@uncp.edu.pe" className="hover:text-brand-600 transition-colors flex items-center gap-2"><Mail className="h-4 w-4" /> Mesa de Partes</Link></li>
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
  );
}
