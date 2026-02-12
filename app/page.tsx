import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/hero-section";
import { NewsCollage } from "@/components/portal/news/NewsCollage";
import EcosistemaSection from "@/components/landing/ecosistema-section";
import PosgradoSection from "@/components/landing/posgrado-section";
import InfoSection from "@/components/landing/info-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans selection:bg-brand-600 selection:text-white">
      
      {/* HEADER MEGA MENU */}
      <Header />

      <main className="flex-1 w-full max-w-[1920px] mx-auto flex flex-col">
        <HeroSection />
        <NewsCollage />
        <EcosistemaSection />
        <PosgradoSection />
        <InfoSection />
      </main>

      <Footer />



    </div>
  );
}
