import PageHero from "@/components/ui/page-hero";
import ProgramGrid from "@/components/posgrado/program-grid";
import { PROGRAMAS_DATA } from "@/data/programas";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctorado en Educación | Posgrado UNCP",
  description: "El máximo grado académico orientado a la investigación científica y producción académica de alto impacto.",
};

export default function DoctoradosPage() {
  const doctorados = PROGRAMAS_DATA.filter((p) => p.tipo === "doctorado");

  return (
    <>
      <PageHero
        title="DOCTORADO EN EDUCACIÓN"
        subtitle="POSTGRADO UNCP"
        description="Lidera investigaciones multidisciplinarias y diseña políticas públicas con rigor ético, científico y tecnológico."
        imageSrc="/images/fondouncp1920x1080.webp"
        size="compact"
        align="center"
        breadcrumbs={[
          { label: "Posgrado", href: "/posgrado" },
          { label: "Doctorados" }
        ]}
      />

      <ProgramGrid 
        programs={doctorados} 
        type="doctorado" 
      />
    </>
  );
}
