"use client";

import { NoticiaService } from "@/lib/services/noticia-service";
import CategorySection from "@/components/ui/category-section";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { NoticiaCategoria } from "@/types/noticia-categoria";
import { useEffect, useState } from "react";

// Mapeo de estilos visuales para la Exhibición de Arte Digital
const VISUAL_STYLES = {
  green: {
    accent: "text-brand-600",
    bg: "bg-white",
    text: "text-brand-950",
    border: "border-brand-100"
  },
  gold: {
    accent: "text-uncp-gold",
    bg: "bg-brand-50/50",
    text: "text-brand-950",
    border: "border-uncp-gold/10"
  },
  blue: {
    accent: "text-blue-600",
    bg: "bg-blue-50/10",
    text: "text-brand-950",
    border: "border-blue-100"
  },
  brand: {
    accent: "text-brand-800",
    bg: "bg-neutral-50",
    text: "text-brand-950",
    border: "border-brand-200"
  }
};

export default function NoticiasPage() {
  const [categorias, setCategorias] = useState<NoticiaCategoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const data = await NoticiaService.getCategoriesWithNews();
        setCategorias(data);
      } catch (error) {
        console.error("Error cargando categorías dinámicas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNoticias();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-uncp-gold animate-pulse font-serif italic text-xl">Preparando Exhibición Editorial...</div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground font-sans selection:bg-brand-600 selection:text-white">
      <Header />
      
      <main className="min-h-screen bg-black">
        {/* 1. HERO INMERSIVO */}
        <section className="relative h-[calc(100vh-96px)] w-full flex items-center justify-center overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-[url('/images/portada.webp')] bg-cover bg-center grayscale opacity-60 contrast-110 brightness-50 z-0" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent z-10" />
          </div>

          <div className="container mx-auto px-6 lg:px-12 relative z-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-uncp-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">
                Facultad de Educación - Actualidad
              </span>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter mb-8">
                CRÓNICAS DE <br />
                <span className="text-brand-300">EXCELENCIA</span>
              </h1>
              
              <p className="text-brand-50/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                Un portal dedicado a la difusión del conocimiento, logros institucionales y la vibrante vida universitaria de nuestra comunidad.
              </p>

              <div className="pt-12">
                <motion.div 
                  animate={{ y: [0, 10, 0] }} 
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ChevronDown className="h-8 w-8 text-white/20 mx-auto" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. SECCIONES DINÁMICAS */}
        <div className="bg-white">
          {categorias.map((cat, index) => (
            <CategorySection 
              key={cat.id}
              titulo={cat.nombre}
              noticias={cat.noticias || []}
              descripcion={cat.descripcion || ""}
              isReversed={index % 2 !== 0}
              colorScheme={VISUAL_STYLES[cat.estilo_visual] || VISUAL_STYLES.green}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
