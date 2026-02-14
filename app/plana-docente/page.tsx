import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PlanaDocente from "@/components/landing/plana-docente";

export const metadata = {
  title: "Maestría en Educación | Facultad de Educación UNCP",
  description: "Conoce el programa de Maestría en Educación: perfil de egreso, malla curricular, modalidades y requisitos de admisión.",
};

export default function MaestriaPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans selection:bg-brand-600 selection:text-white">
      <Header />
      <PlanaDocente />
      <Footer />
    </div>
  );
}
