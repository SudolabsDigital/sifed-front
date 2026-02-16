"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GalleryGrid from "@/components/Gallery/GalleryGrid"; // 👈 usa minúscula

export default function InvestigacionPage() {
  const images = [
    "inv0.jpg",
    "inv01.jpg",
    "inv02.jpg",
    "inv03.jpg",
    "inv04.jpg",
    "inv05.jpg",
    "inv06.jpg",
    "inv07.jpg",
    "inv08.jpg",
    "inv09.jpg",
    "inv10.jpg",

  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">
      <Header />

      <main className="flex-1">
        <GalleryGrid
          folder="investigacion"
          images={images}
          title="Producción Investigativa"
          description="Actividades de investigación, trabajo de campo y publicaciones."
        />
      </main>

      <Footer />
    </div>
  );
}
