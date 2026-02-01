import { useEffect, useState } from "react";

/**
 * Hook para detectar si una media query se cumple.
 * Útil para lógica condicional basada en el tamaño de pantalla.
 * 
 * Uso: const isMobile = useMediaQuery("(max-width: 768px)");
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
}
