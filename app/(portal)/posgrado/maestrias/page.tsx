import PageHero from "@/components/ui/page-hero";
import ProgramGrid from "@/components/posgrado/program-grid";
import { PROGRAMAS_DATA } from "@/data/programas";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maestrías en Educación | Posgrado UNCP",
  description: "Explora nuestras maestrías en Gestión, Educación Superior, Psicología y Enseñanza Estratégica.",
};

export default function MaestríasPage() {
  const maestrias = PROGRAMAS_DATA.filter((p) => p.tipo === "maestria");

  return (
    <>
      <PageHero
        title="MAESTRÍAS EN EDUCACIÓN"
        subtitle="POSTGRADO UNCP"
        description="Programas de alto nivel académico diseñados para formar líderes en la gestión, investigación e innovación pedagógica."
        imageSrc="/images/fondouncp1920x1080.webp"
        size="compact"
        align="center"
        breadcrumbs={[
          { label: "Posgrado", href: "/posgrado" },
          { label: "Maestrías" }
        ]}
      />

      <ProgramGrid 
        programs={maestrias} 
        type="maestria" 
      />
    </>
  );
}
