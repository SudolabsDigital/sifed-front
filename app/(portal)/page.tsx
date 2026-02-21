import HeroSection from "@/components/home/hero-section";
import { NewsCollage } from "@/components/portal/news/NewsCollage";
import EcosistemaSection from "@/components/home/ecosistema-section";
import PosgradoSection from "@/components/home/posgrado-section";
import InfoSection from "@/components/home/info-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <NewsCollage />
      <EcosistemaSection />
      <PosgradoSection />
      <InfoSection />
    </>
  );
}
