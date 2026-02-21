"use client";

import { NoticiaService } from "@/lib/services/noticia-service";
import CategorySection from "@/components/ui/category-section";
import PageHero from "@/components/ui/page-hero";
import { NoticiaCategoria } from "@/types/noticia-categoria";
import { useEffect, useState } from "react";

// Mapeo de estilos visuales para la Exhibición de Arte Digital
const VISUAL_STYLES = {
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
  const [categorias, setCategorias] = useState<NoticiaCategoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const data = await NoticiaService.getCategoriesWithNews();
        setCategorias(data);
      } catch (error) {
        console.error("Error cargando categorías dinámicas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNoticias();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-uncp-gold animate-pulse font-serif italic text-xl">Preparando Exhibición Editorial...</div>
      </div>
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
