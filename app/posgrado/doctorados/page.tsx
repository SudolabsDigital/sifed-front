import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DoctoradoContent from "@/components/landing/doctorado-content";

export const metadata = {
  title: "Doctorado en Educación | Facultad de Educación UNCP",
  description:
    "Programa de Doctorado en Educación orientado a la investigación científica, innovación pedagógica y producción académica de alto impacto.",
};

export default function DoctoradoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans selection:bg-brand-600 selection:text-white">
      <Header />
      <DoctoradoContent />
      <Footer />
    </div>
  );
}
