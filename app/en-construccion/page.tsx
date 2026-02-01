import StatusCard from "@/components/ui/status-card";
import { Hammer } from "lucide-react";

export const metadata = {
  title: "En Desarrollo | SIFED",
};

export default function BuildingPage() {
  return (
    <StatusCard
      icon={Hammer}
      title="Estamos trabajando"
      description="Este módulo se encuentra actualmente en desarrollo o mantenimiento. Estamos construyendo nuevas funcionalidades para ti."
      color="gold"
      actionLabel="Regresar"
      actionHref="/login"
    />
  );
}
