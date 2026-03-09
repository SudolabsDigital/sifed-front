import { programasApi, mapToProgramData, Programa } from "@/lib/api/programas";
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
    if (!rawProgram || rawProgram.tipo !== "diplomado") return { title: "Programa no encontrado" };
    return {
      title: `${rawProgram.titulo} | Posgrado Educación UNCP`,
      description: rawProgram.descripcion_corta,
    };
  } catch {
    return { title: "Programa no encontrado" };
  }
}

export default async function DiplomadoDetailPage({ params }: Props) {
  const { slug } = await params;
  
  let rawProgram;
  try {
    rawProgram = await programasApi.getPublicBySlug(slug);
  } catch {
    notFound();
  }
  
  if (!rawProgram || rawProgram.tipo !== "diplomado") {
    notFound();
  }

  const program = mapToProgramData(rawProgram);
  return <ProgramDetailLayout program={program} />;
}

export async function generateStaticParams() {
  try {
    const programs = await programasApi.getPublicAll({ tipo: "diplomado" });
    return (programs as Programa[]).map((p) => ({
      slug: p.slug,
    }));
  } catch {
    return [];
  }
}
