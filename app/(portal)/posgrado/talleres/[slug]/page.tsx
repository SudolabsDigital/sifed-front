import { programasApi, mapToProgramData } from "@/lib/api/programas";
import ProgramDetailLayout from "@/components/posgrado/program-detail-layout";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const rawProgram = await programasApi.getPublicBySlug(slug);
    if (!rawProgram || rawProgram.tipo !== "taller") return { title: "Programa no encontrado" };
    return {
      title: `${rawProgram.titulo} | Posgrado Educación UNCP`,
      description: rawProgram.descripcion_corta,
    };
  } catch (error) {
    return { title: "Programa no encontrado" };
  }
}

export default async function TallerDetailPage({ params }: Props) {
  const { slug } = await params;
  
  try {
    const rawProgram = await programasApi.getPublicBySlug(slug);
    
    if (!rawProgram || rawProgram.tipo !== "taller") {
      notFound();
    }

    const program = mapToProgramData(rawProgram);
    return <ProgramDetailLayout program={program} />;
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    const programs = await programasApi.getPublicAll({ tipo: "taller" });
    return programs.map((p) => ({
      slug: p.slug,
    }));
  } catch (error) {
    return [];
  }
}
