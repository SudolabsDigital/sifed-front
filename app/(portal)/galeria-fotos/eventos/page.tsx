"use client";

import GalleryGrid from "@/components/gallery/GalleryGrid";
import PageHero from "@/components/ui/page-hero";

export default function EventosPage() {
  const images = [
    "evento01.jpg",
    "evento02.jpeg",
    "evento03.jpg",
    "evento04.jpg",
    "evento05.png",
    "evento06.jpg",
  ];

  return (
    <>
      <PageHero
        title="EVENTOS ACADÉMICOS"
        subtitle="VIDA INSTITUCIONAL"
        description="Participación en congresos, seminarios y actividades de integración de nuestra comunidad."
        imageSrc="/images/portada-3.webp"
        size="compact"
        align="center"
        breadcrumbs={[
          { label: "Galería", href: "/galeria-fotos" },
          { label: "Eventos" }
        ]}
      />
      <GalleryGrid
        folder="eventos"
        images={images}
        title="Álbum de Eventos"
      />
    </>
  );
}
