"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GalleryGrid from "@/components/Gallery/GalleryGrid"; // 👈 ojo: "gallery" en minúscula

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
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">
      <Header />

      <main className="flex-1">
        <GalleryGrid
          folder="sustentacion"
          images={images}
          title="Sustentaciones Doctorales"
          description="Defensas de tesis y logros académicos de nuestros doctorandos."
        />
      </main>

      <Footer />
    </div>
  );
}
