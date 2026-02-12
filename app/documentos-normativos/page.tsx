import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
      <Footer />
    </div>
  );
}
