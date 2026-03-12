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
  
  // Si ya es una URL absoluta, devolverla tal cual
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // REGLA CRÍTICA DE ASSETS HÍBRIDOS (SIFED)
  // Si la ruta NO empieza con /storage/, es un asset estático que vive en Next.js /public
  // Ej: "/images/galeria/foto.webp"
  if (!path.startsWith("/storage/")) {
    return encodeURI(path).replace(/,/g, '%2C');
  }
  
  // Si empieza con /storage/, es un asset dinámico de Laravel.
  // Usamos NEXT_PUBLIC_BACKEND_URL si existe, de lo contrario limpiamos API_URL.
  let baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 
                process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") || 
                "";
  
  // Limpiar barras finales del baseUrl y barras iniciales del path para evitar el error de doble barra //
  baseUrl = baseUrl.replace(/\/+$/, "");
  const cleanPath = path.replace(/^\/+/, "");
  
  const finalUrl = `${baseUrl}/${cleanPath}`;

  // Codificar para evitar problemas con espacios en los nombres de archivos en next/image
  return encodeURI(finalUrl);
}
