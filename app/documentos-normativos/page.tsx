import Header from "@/components/layout/Header";
import DocumentosNormativosContent from "@/components/landing/documentos-normativos-content";

export const metadata = {
  title: "Documentos Normativos | Facultad de Educación UNCP",
  description: "Accede a la normativa nacional, formatos, plantillas y documentos oficiales para trámites académicos.",
};

export default function DocumentosNormativosPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans selection:bg-brand-600 selection:text-white">
      <Header />
      <DocumentosNormativosContent />
      
      {/* Footer Simple */}
      <footer className="bg-brand-950 text-white py-8 border-t border-brand-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Facultad de Educación - Universidad Nacional del Centro del Perú
          </p>
        </div>
      </footer>
    </div>
  );
}
