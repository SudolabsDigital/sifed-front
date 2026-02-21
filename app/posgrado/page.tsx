import PosgradoHero from "@/components/posgrado/posgrado-hero";
import PosgradoIdentity from "@/components/posgrado/posgrado-identity";
import StrategicAxes from "@/components/posgrado/strategic-axes";
import PosgradoCTA from "@/components/posgrado/posgrado-cta";

export const metadata = {
  title: "Unidad de Posgrado | Facultad de Educación - UNCP",
  description: "Lideramos la educación de posgrado en la región con un enfoque en la investigación científica y la calidad académica internacional.",
};

export default function PosgradoPage() {
  return (
    <>
      <PosgradoHero />
      <PosgradoIdentity />
      <StrategicAxes />
      <PosgradoCTA />
    </>
  );
}
