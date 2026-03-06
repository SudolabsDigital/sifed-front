"use client";

import useSWR from "swr";
import { NoticiaService } from "@/lib/services/noticia-service";
import CategorySection from "@/components/ui/category-section";
import PageHero from "@/components/ui/page-hero";
import Loader from "@/components/ui/loader";

// Mapeo de estilos visuales para la Exhibición de Arte Digital
const VISUAL_STYLES: Record<string, { accent: string, bg: string, text: string, border: string }> = {
  green: {
    accent: "text-brand-600",
    bg: "bg-white",
    text: "text-brand-950",
    border: "border-brand-100"
  },
  gold: {
    accent: "text-uncp-gold",
    bg: "bg-brand-50/50",
    text: "text-brand-950",
    border: "border-uncp-gold/10"
  },
  blue: {
    accent: "text-blue-600",
    bg: "bg-blue-50/10",
    text: "text-brand-950",
    border: "border-blue-100"
  },
  brand: {
    accent: "text-brand-800",
    bg: "bg-neutral-50",
    text: "text-brand-950",
    border: "border-brand-200"
  }
};

export default function NoticiasPage() {
  const { data: categorias = [], isLoading } = useSWR(
    '/portal/noticias-categorias',
    NoticiaService.getCategoriesWithNews,
    { keepPreviousData: true }
  );

  if (isLoading && categorias.length === 0) {
    return (
      <Loader 
        text="Preparando Exhibición Editorial..." 
        size="lg" 
        className="min-h-screen"
      />
    );
  }

  return (
    <>
      <PageHero 
        title="CRÓNICAS DE EXCELENCIA"
        subtitle="FACULTAD DE EDUCACIÓN - ACTUALIDAD"
        description="Un portal dedicado a la difusión del conocimiento, logros institucionales y la vibrante vida universitaria de nuestra comunidad."
        imageSrc="/images/portada-4.webp"
        breadcrumbs={[
          { label: "Noticias" }
        ]}
      />

      <div className="bg-white min-h-screen">
        {categorias.map((cat, index) => (
          <CategorySection 
            key={cat.id}
            titulo={cat.nombre}
            noticias={cat.noticias || []}
            descripcion={cat.descripcion || ""}
            isReversed={index % 2 !== 0}
            colorScheme={VISUAL_STYLES[cat.estilo_visual] || VISUAL_STYLES.green}
          />
        ))}
      </div>
    </>
  );
}
