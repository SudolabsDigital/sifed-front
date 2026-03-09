import PageHero from "@/components/ui/page-hero";
import PosgradoIdentity from "@/components/posgrado/posgrado-identity";
import StrategicAxes from "@/components/posgrado/strategic-axes";
import PosgradoCTA from "@/components/posgrado/posgrado-cta";
import { GraduationCap, BookOpen, Users, FileText, Award, Zap } from "lucide-react";

export const metadata = {
  title: "Unidad de Posgrado | Facultad de Educación - UNCP",
  description: "Lideramos la educación de posgrado en la región con un enfoque en la investigación científica y la calidad académica internacional.",
};

export default function PosgradoPage() {
  return (
    <>
      <PageHero 
        title="POSGRADO"
        subtitle="EXCELENCIA EN"
        description="Formamos investigadores y líderes educativos con los más altos estándares científicos y compromiso social en la región central del país."
        imageSrc="/images/fondouncp1920x1080.webp"
        breadcrumbs={[
          { label: "Posgrado" }
        ]}
        actions={[
          { 
            label: "Maestrías", 
            href: "/posgrado/maestrias", 
            variant: "primary",
            icon: <BookOpen className="w-4 h-4" />
          },
          { 
            label: "Doctorados", 
            href: "/posgrado/doctorados", 
            variant: "primary",
            icon: <GraduationCap className="w-4 h-4" />
          },
          { 
            label: "Diplomados", 
            href: "/posgrado/diplomados", 
            variant: "primary",
            icon: <Award className="w-4 h-4" />
          },
          { 
            label: "Formación Continua", 
            href: "/posgrado/formacion-continua", 
            variant: "primary",
            icon: <Zap className="w-4 h-4" />
          },
          { 
            label: "Admisión", 
            href: "/posgrado/admision", 
            variant: "secondary",
            icon: <FileText className="w-4 h-4" />
          },
          { 
            label: "Plana Docente", 
            href: "/posgrado/plana-docente", 
            variant: "secondary",
            icon: <Users className="w-4 h-4" />
          }
        ]}
      />
      <PosgradoIdentity />
      <StrategicAxes />
      <PosgradoCTA />
    </>
  );
}
