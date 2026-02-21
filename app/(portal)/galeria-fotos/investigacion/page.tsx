"use client";

import GalleryGrid from "@/components/gallery/GalleryGrid";
import PageHero from "@/components/ui/page-hero";

export default function InvestigacionPage() {
  const images = [
    "inv0.jpg",
    "inv01.jpg",
    "inv02.jpeg",
    "inv03.jpg",
    "inv04.jpg",
    "inv05.jpg",
  ];

  return (
    <>
      <PageHero
        title="PRODUCCIÓN CIENTÍFICA"
        subtitle="INVESTIGACIÓN EN ACCIÓN"
        description="Evidencia del trabajo de campo, proyectos y sustentaciones de nuestros investigadores."
        imageSrc="/images/portada-2.webp"
        size="compact"
        align="center"
        breadcrumbs={[
          { label: "Galería", href: "/galeria-fotos" },
          { label: "Investigación" }
        ]}
      />
      <GalleryGrid
        folder="investigacion"
        images={images}
        title="Álbum de Investigación"
      />
    </>
  );
}
