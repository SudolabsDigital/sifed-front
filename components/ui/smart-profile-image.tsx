"use client";

import { useState } from "react";
import { UnoptImage } from "@/components/ui/unopt-image";
import { getStorageUrl, cn, shouldUnoptimize } from "@/lib/utils";
import { User } from "lucide-react";

interface SmartProfileImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  objectFit?: "cover" | "contain";
  objectPosition?: "top" | "center" | "bottom";
}

export default function SmartProfileImage({ 
  src, 
  alt, 
  className,
  objectFit = "cover",
  objectPosition = "top"
}: SmartProfileImageProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className={cn("absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-brand-50", className)}>
        <User className="w-1/3 h-1/3 text-brand-200" />
      </div>
    );
  }

  // cover y top garantizan que la foto de 9:16 llene el contenedor (sin dejar franjas vacías)
  // y ancla la imagen arriba para que la cara siempre sea visible, recortando por la cadera si es necesario.
  return (
    <UnoptImage
      src={getStorageUrl(src)}
      alt={alt}
      fill
      className={cn(
        objectFit === "cover" ? "object-cover" : "object-contain",
        objectPosition === "top" ? "object-top" : objectPosition === "bottom" ? "object-bottom" : "object-center",
        className
      )}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      unoptimized={shouldUnoptimize(src)}
      onError={() => setError(true)}
    />
  );
}
