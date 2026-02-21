import DocumentViewer from "@/components/posgrado/document-viewer";
import PageHero from "@/components/ui/page-hero";
import { CreditCard, Calendar, User, FileCheck } from "lucide-react";

export const metadata = {
  title: "Admisión Maestría 2026-I | Posgrado Educación",
  description: "Guía completa para el proceso de admisión a las Maestrías de la Facultad de Educación. Requisitos, cronograma y pagos.",
};

export default function AdmisionMaestriaPage() {
  const quickInfo = [
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Cierre de Inscripciones",
      value: "27 de Marzo del 2026",
      subValue: "Proceso 2026-I"
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: "Derecho de Inscripción",
      value: "S/. 211.00",
      subValue: "Código de Pago: 1671 (Banco de la Nación / Caja Huancayo)"
    },
    {
      icon: <User className="w-5 h-5" />,
      label: "Dirigido a",
      value: "Bachilleres",
      subValue: "Se requiere diploma de grado académico"
    },
    {
      icon: <FileCheck className="w-5 h-5" />,
      label: "Modalidad de Examen",
      value: "Entrevista Virtual",
      subValue: "Vía Microsoft Teams"
    }
  ];

  return (
    <>
      <PageHero
        title="ADMISIÓN MAESTRÍA"
        subtitle="PROCESO 2026-I"
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
        <div className="pt-8 pb-12">
          <DocumentViewer
            title="Guía del Postulante"
            subtitle="Instrucciones Detalladas"
            description="Bienvenido al proceso de admisión. En este documento encontrarás la guía detallada paso a paso para realizar tu inscripción, desde el pago de derechos hasta el envío de documentos. Asegúrate de cumplir con todos los requisitos antes de la fecha de cierre."
            documentUrl="/documents/admision/guia-admision-maestria-2026-1.pdf"
            quickInfo={quickInfo}
          />
        </div>
      </div>
    </>
  );
}
