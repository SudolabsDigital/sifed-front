"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Lock, ArrowRight, LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  requiresAuth?: boolean;
  isLoggedIn?: boolean;
  onLockedClick?: () => void;
  color?: "brand" | "gold" | "green"; // Para dar variedad visual
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  href,
  requiresAuth = false,
  isLoggedIn = false,
  onLockedClick,
  color = "brand",
}: ServiceCardProps) {
  
  const isLocked = requiresAuth && !isLoggedIn;

  // Variaciones de color para el icono
  const colorStyles = {
    brand: "text-brand-600 bg-brand-50 group-hover:bg-brand-600 group-hover:text-white",
    gold: "text-uncp-gold bg-yellow-50 group-hover:bg-uncp-gold group-hover:text-white",
    green: "text-uncp-green bg-green-50 group-hover:bg-uncp-green group-hover:text-white",
  };

  const CardContent = (
    <div className={cn(
      "group relative flex flex-col h-full rounded-2xl border overflow-hidden transition-all duration-300",
      isLocked 
        ? "bg-muted/10 border-border cursor-pointer hover:border-brand-200 opacity-80 hover:opacity-100" 
        : "bg-white border-border hover:border-brand-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    )}>
      
      {/* 1. ÁREA VISUAL (Banner / Placeholder de Imagen) */}
      <div className={cn(
        "h-24 w-full relative flex items-center justify-center overflow-hidden",
        isLocked ? "bg-muted" : {
          brand: "bg-gradient-to-br from-brand-500 to-brand-700",
          gold: "bg-gradient-to-br from-yellow-400 to-orange-500",
          green: "bg-gradient-to-br from-green-500 to-emerald-700"
        }[color]
      )}>
        {/* Decoración de fondo sutil (Círculos) */}
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/10 to-transparent"></div>

        {/* Icono Central (Grande) */}
        <Icon className={cn(
          "relative z-10 h-10 w-10 transition-transform duration-500 group-hover:scale-110",
          isLocked ? "text-muted-foreground/50" : "text-white drop-shadow-md"
        )} strokeWidth={1.5} />

        {/* Badge de Candado (Flotante) */}
        {isLocked && (
          <div className="absolute top-2 right-2 bg-black/20 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1 text-[9px] font-bold text-white/80 border border-white/10">
            <Lock className="h-2.5 w-2.5" />
            <span>PRIVADO</span>
          </div>
        )}
      </div>

      {/* 2. ÁREA DE CONTENIDO */}
      <div className="flex-1 p-5 flex flex-col">
        <h3 className={cn(
          "font-serif text-lg font-black mb-2 leading-tight transition-colors",
          isLocked ? "text-muted-foreground" : "text-brand-950 group-hover:text-brand-700"
        )}>
          {title}
        </h3>
        
        <p className="text-xs text-muted-foreground font-medium leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      {/* Borde inferior de color (Detalle estético) */}
      {!isLocked && (
        <div className={cn("h-1 w-full", {
          brand: "bg-brand-600",
          gold: "bg-uncp-gold",
          green: "bg-uncp-green"
        }[color])}></div>
      )}
    </div>
  );

  if (isLocked) {
    // Si está bloqueado, es un botón que hace foco en el login
    return (
      <button onClick={onLockedClick} className="text-left w-full h-full block focus:outline-none focus:ring-2 focus:ring-brand-600 rounded-2xl">
        {CardContent}
      </button>
    );
  }
  return (
    <Link href={href} className="block h-full focus:outline-none focus:ring-2 focus:ring-brand-600 rounded-2xl">
      {CardContent}
    </Link>
  );
}
