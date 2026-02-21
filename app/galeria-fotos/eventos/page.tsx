"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GalleryGrid from "@/components/Gallery/GalleryGrid"; // 👈 en minúscula

export default function EventosPage() {
  const images = [
    "evento01.jpg",
    "evento02.jpeg",
    "evento03.jpg",
    "evento04.jpg",
    "evento05.jpg",
    "evento06.jpg",
    "evento07.jpg",
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">
      <Header />

      <main className="flex-1">
        <GalleryGrid
          folder="eventos"
          images={images}
          title="Eventos Académicos"
          description="Participación en congresos, seminarios y actividades institucionales."
        />
      </main>

      <Footer />
    </div>
  );
}
