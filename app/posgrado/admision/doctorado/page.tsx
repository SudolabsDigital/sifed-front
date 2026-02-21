import DocumentViewer from "@/components/posgrado/document-viewer";
import { CreditCard, Calendar, User, FileCheck } from "lucide-react";

export const metadata = {
  title: "Admisión Doctorado 2026-I | Posgrado Educación",
  description: "Guía completa para el proceso de admisión al Doctorado en Ciencias de la Educación. Requisitos, cronograma y pagos.",
};

export default function AdmisionDoctoradoPage() {
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
      value: "S/. 231.00",
      subValue: "Código de Pago: 1672 (Banco de la Nación / Caja Huancayo)"
    },
    {
      icon: <User className="w-5 h-5" />,
      label: "Dirigido a",
      value: "Magísteres / Bachilleres",
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
    <div className="pt-16 pb-12">
      <DocumentViewer
        title="Proceso de Admisión al Doctorado 2026-I"
        subtitle="Guía del Postulante"
        description="Accede al máximo grado académico. Esta guía te orientará en cada etapa del proceso de admisión al Doctorado en Ciencias de la Educación. Revisa los requisitos de investigación y perfil de ingreso."
        documentUrl="/documents/admision/guia-admision-doctorado-2026-1.pdf"
        quickInfo={quickInfo}
      />
    </div>
  );
}
