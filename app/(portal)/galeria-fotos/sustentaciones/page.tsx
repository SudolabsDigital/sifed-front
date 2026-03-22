"use client";

import GalleryGrid from "@/components/gallery/gallery-grid";
import PageHero from "@/components/ui/page-hero";

export default function SustentacionesPage() {
  const images = [
    "tesis01.jpg",
    "tesis02.jpg",
    "tesis03.jpg",
    "tesis04.jpg",
    "tesis05.jpg",
    "tesis06.jpg",
    "tesis07.jpg",
    "tesis08.jpg",
    "tesis09.jpg",
    "tesis10.jpg",
  ];

  return (
    <>
      <PageHero
        title="SUSTENTACIONES"
        subtitle="LOGROS ACADÉMICOS"
        description="Defensas de tesis doctorales y obtención de grados académicos de nuestros egresados."
        imageSrc="/images/portada-1.webp"
        size="compact"
        align="center"
        breadcrumbs={[
          { label: "Galería", href: "/galeria-fotos" },
          { label: "Sustentaciones" }
        ]}
      />
      <GalleryGrid
        folder="sustentacion"
        images={images}
        title="Álbum de Sustentaciones"
      />
    </>
  );
}
