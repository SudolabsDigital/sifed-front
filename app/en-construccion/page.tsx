import Link from "next/link";
import { ArrowLeft, Hammer, HardHat } from "lucide-react";

export const metadata = {
  title: "Página en Construcción | Facultad de Educación",
};

export default function EnConstruccionPage() {
  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-xl border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-300">
           <HardHat className="h-12 w-12 text-uncp-gold" />
        </div>
        
        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-black text-brand-950">
            Estamos trabajando
          </h1>
          <p className="text-muted-foreground font-medium">
            Esta sección estará disponible muy pronto. Estamos construyendo una mejor experiencia para ti.
          </p>
        </div>

        <div className="p-4 bg-white/50 border border-white/60 rounded-xl text-sm font-semibold text-brand-800">
           <Hammer className="inline-block h-4 w-4 mr-2 -mt-0.5" />
           Próximamente: Admisión, Programas e Investigación.
        </div>

        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-all shadow-lg hover:shadow-brand-600/30"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al Inicio
        </Link>
      </div>
    </div>
  );
}