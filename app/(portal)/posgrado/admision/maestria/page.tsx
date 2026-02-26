import AdmissionUnifiedSection from "@/components/posgrado/admission-unified-section";
import PageHero from "@/components/ui/page-hero";
import { ADMISSION_CONFIG } from "@/data/admission-config";

export const metadata = {
  title: "Admisión Maestría 2026-I | Posgrado Educación",
  description: "Guía completa para el proceso de admisión a las Maestrías de la Facultad de Educación. Requisitos, cronograma y pagos.",
};

export default function AdmisionMaestriaPage() {
  const data = ADMISSION_CONFIG.maestria;

  return (
    <>
      <PageHero
        title="ADMISIÓN MAESTRÍA"
        subtitle={`PROCESO ${data.period}`}
        imageSrc="/images/fondouncp1920x1080.webp"
        size="compact"
        align="center"
        breadcrumbs={[
          { label: "Posgrado", href: "/posgrado" },
          { label: "Admisión", href: "/posgrado/admision" },
          { label: "Maestría" }
        ]}
      />
      
      <div className="bg-neutral-50 min-h-screen">
        <AdmissionUnifiedSection data={data} />
      </div>
    </>
  );
}
