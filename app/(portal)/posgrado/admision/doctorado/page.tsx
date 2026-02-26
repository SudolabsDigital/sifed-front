import AdmissionUnifiedSection from "@/components/posgrado/admission-unified-section";
import PageHero from "@/components/ui/page-hero";
import { ADMISSION_CONFIG } from "@/data/admission-config";

export const metadata = {
  title: "Admisión Doctorado 2026-I | Posgrado Educación",
  description: "Guía completa para el proceso de admisión al Doctorado en Ciencias de la Educación. Requisitos, cronograma y pagos.",
};

export default function AdmisionDoctoradoPage() {
  const data = ADMISSION_CONFIG.doctorado;

  return (
    <>
      <PageHero
        title="ADMISIÓN DOCTORADO"
        subtitle={`PROCESO ${data.period}`}
        imageSrc="/images/fondouncp1920x1080.webp"
        size="compact"
        align="center"
        breadcrumbs={[
          { label: "Posgrado", href: "/posgrado" },
          { label: "Admisión", href: "/posgrado/admision" },
          { label: "Doctorado" }
        ]}
      />

      <div className="bg-neutral-50 min-h-screen">
        <AdmissionUnifiedSection data={data} />
      </div>
    </>
  );
}
