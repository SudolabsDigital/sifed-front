"use client"

import { useEffect, useState, useCallback } from 'react';
import { Noticia } from '@/types/noticia';
import { NoticiaService } from '@/lib/services/noticia-service';
import { NewsCard } from './NewsCard';
import { Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

// Helper para paginar noticias
function chunkArray<T>(array: T[], size: number): T[][] {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export function NewsCollage() {
  const [news, setNews] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 1. Configuración Carrusel Principal (Hero)
  const [heroRef, heroApi] = useEmblaCarousel({ loop: true, duration: 30 }, [
    Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true })
  ]);
  const [heroSelectedIndex, setHeroSelectedIndex] = useState(0);
  const [heroScrollSnaps, setHeroScrollSnaps] = useState<number[]>([]);

  // 2. Configuración Carrusel Secundario (Grid)
  const [gridRef, gridApi] = useEmblaCarousel({ loop: true, duration: 30 }, [
    Autoplay({ delay: 8500, stopOnInteraction: true, stopOnMouseEnter: true })
  ]);
  const [gridSelectedIndex, setGridSelectedIndex] = useState(0);
  const [gridScrollSnaps, setGridScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await NoticiaService.getAllPublic(1);
        const data = Array.isArray(response) ? response : (response?.data || []);
        setNews(data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
        setNews([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // --- Lógica de Puntos (Hero) ---
  const onHeroSelect = useCallback(() => {
    if (!heroApi) return;
    setHeroSelectedIndex(heroApi.selectedScrollSnap());
  }, [heroApi]);

  useEffect(() => {
    if (!heroApi) return;
    onHeroSelect();
    setHeroScrollSnaps(heroApi.scrollSnapList());
    heroApi.on('select', onHeroSelect);
    heroApi.on('reInit', onHeroSelect);
  }, [heroApi, onHeroSelect]);

  const scrollToHero = useCallback((index: number) => {
    if (heroApi) heroApi.scrollTo(index);
  }, [heroApi]);

  // --- Lógica de Puntos (Grid) ---
  const onGridSelect = useCallback(() => {
    if (!gridApi) return;
    setGridSelectedIndex(gridApi.selectedScrollSnap());
  }, [gridApi]);

  useEffect(() => {
    if (!gridApi) return;
    onGridSelect();
    setGridScrollSnaps(gridApi.scrollSnapList());
    gridApi.on('select', onGridSelect);
    gridApi.on('reInit', onGridSelect);
  }, [gridApi, onGridSelect]);

  const scrollToGrid = useCallback((index: number) => {
    if (gridApi) gridApi.scrollTo(index);
  }, [gridApi]);


  if (loading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center bg-neutral-50">
        <Loader2 className="h-10 w-10 animate-spin text-brand-300" />
      </div>
    );
  }

  if (!news || news.length === 0) return null;

  // Lógica de separación
  const featuredCandidates = news.filter(n => n.destacada);
  const normalCandidates = news.filter(n => !n.destacada);

  let featuredNews = featuredCandidates;
  let gridNews = normalCandidates;

  if (featuredNews.length === 0) {
    featuredNews = news.slice(0, 3);
    gridNews = news.slice(3);
  } else {
  // No repetir aunque ya la logica lo toma en cuenta
  }

  // Agrupamos las noticias normales en páginas de 4
  const gridChunks = chunkArray(gridNews, 4);

  return (
    <section className="w-full bg-amber-50 h-screen flex flex-col justify-center py-12 px-4 md:px-6 lg:px-8 overflow-hidden">
      
      <div className="max-w-7xl mx-auto w-full h-full max-h-[90vh] flex flex-col gap-6">
        {/* Header Compacto */}
        <div className="flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-950 flex items-center gap-3">
              <span className="w-8 md:w-12 h-1.5 bg-uncp-gold rounded-full inline-block"></span>
              Actualidad
            </h2>
            <p className="mt-1 text-sm md:text-base text-muted-foreground ml-12 md:ml-16 hidden md:block">
              Últimas noticias y eventos de la facultad.
            </p>
          </div>
          <Link href="/noticias" className="group flex items-center gap-2 text-xs md:text-sm font-bold text-brand-600 hover:text-brand-800 transition-colors uppercase tracking-wider bg-brand-50 hover:bg-brand-100 px-4 py-2 rounded-full">
            Ver todas 
            <ArrowRight className="h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4 flex-1 min-h-0">
          
          {/* 1. HERO CAROUSEL (Left - 2x2) */}
          <div className="md:col-span-2 md:row-span-2 relative rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group bg-neutral-900">
             <div className="overflow-hidden h-full w-full" ref={heroRef}>
                <div className="flex h-full w-full touch-pan-y">
                   {featuredNews.map((item) => (
                      <div className="flex-[0_0_100%] min-w-0 relative h-full" key={item.id}>
                         <NewsCard 
                            noticia={item} 
                            featured={true} 
                            className="h-full w-full border-none rounded-none" 
                         />
                      </div>
                   ))}
                </div>
             </div>
             {/* Hero Dots */}
             {featuredNews.length > 1 && (
               <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                 {heroScrollSnaps.map((_, index) => (
                   <button
                     key={index}
                     onClick={() => scrollToHero(index)}
                     className={`w-2 h-2 rounded-full transition-all duration-300 ${
                       index === heroSelectedIndex 
                         ? "bg-white w-6" 
                         : "bg-white/40 hover:bg-white/60"
                     }`}
                   />
                 ))}
               </div>
             )}
          </div>

          {/* 2. GRID CAROUSEL (Right - 2x2 Area) */}
          <div className="md:col-span-2 md:row-span-2 relative rounded-2xl md:rounded-3xl overflow-hidden group">
            
            {gridChunks.length > 0 ? (
               <>
                <div className="overflow-hidden h-full w-full" ref={gridRef}>
                    <div className="flex h-full w-full touch-pan-y">
                        {gridChunks.map((chunk, chunkIndex) => (
                            <div className="flex-[0_0_100%] min-w-0 relative h-full pt-1 pl-1" key={chunkIndex}>
                                {/* Inner Grid: Renderiza las 4 noticias de esta página */}
                                <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-3 md:gap-4 h-full">
                                    {chunk.map((item) => (
                                        <div key={item.id} className="w-full h-full relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                                            <NewsCard 
                                                noticia={item} 
                                                featured={false} 
                                                className="h-full w-full min-h-0" 
                                            />
                                        </div>
                                    ))}
                                    {/* Rellenar huecos vacíos si el chunk es < 4 */}
                                    {Array.from({ length: 4 - chunk.length }).map((_, i) => (
                                        <div key={`empty-${i}`} className="hidden md:block bg-white/50 rounded-2xl border border-dashed border-neutral-300" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Grid Dots (Subtler) */}
                {gridChunks.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {gridScrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToGrid(index)}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 shadow-sm ${
                            index === gridSelectedIndex 
                                ? "bg-brand-600 w-4" 
                                : "bg-neutral-300 hover:bg-brand-400"
                            }`}
                        />
                        ))}
                    </div>
                )}
               </>
            ) : (
                // Fallback visual si no hay noticias normales
                <div className="h-full w-full flex items-center justify-center text-muted-foreground bg-white/50 rounded-3xl border border-dashed border-neutral-200">
                    <p>No hay más noticias recientes</p>
                </div>
            )}
            
          </div>
          
        </div>
      </div>
    </section>
  );
}