import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases de Tailwind de manera inteligente, resolviendo conflictos.
 * Ejemplo: cn("bg-red-500", "bg-blue-500") -> "bg-blue-500"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Genera la URL completa para un recurso de almacenamiento (imagen, documento).
 * Maneja rutas relativas y absolutas - para unoptimiced de next 
 */
export function getStorageUrl(path?: string | null): string {
  if (!path) return "";
  
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  
  // Si es http://localhost:8000/api => http://localhost:8000
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") || "";
  
  // Asegurar que el path empiece con / si no lo tiene
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  
  // Codificar la URL para evitar problemas con espacios en los nombres de archivos en next/image
  const encodedPath = encodeURI(cleanPath);
  
  return `${baseUrl}${encodedPath}`;
}
