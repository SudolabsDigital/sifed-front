import { PROGRAMAS_DATA } from "@/data/programas";
import ProgramDetailLayout from "@/components/posgrado/program-detail-layout";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = PROGRAMAS_DATA.find((p) => p.slug === slug && p.tipo === "maestria");
  
  if (!program) return { title: "Programa no encontrado" };

  return {
    title: `${program.titulo} | Posgrado Educación UNCP`,
    description: program.descripcionCorta,
  };
}

export default async function MaestriaDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = PROGRAMAS_DATA.find((p) => p.slug === slug && p.tipo === "maestria");

  if (!program) {
    notFound();
  }

  return <ProgramDetailLayout program={program} />;
}

// Generar rutas estáticas para mejor rendimiento (SSG)
export async function generateStaticParams() {
  return PROGRAMAS_DATA
    .filter((p) => p.tipo === "maestria")
    .map((p) => ({
      slug: p.slug,
    }));
}
