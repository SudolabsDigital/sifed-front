import { NoticiaService } from "@/lib/services/noticia-service";
import { NewsCard } from "@/components/portal/news/NewsCard";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ChevronRight, Calendar, Clock } from "lucide-react";
import { Noticia, NoticiaResponse } from "@/types/noticia";

export const metadata: Metadata = {
  title: "Centro de Noticias - Facultad de Educación UNCP",
  description: "Actualidad académica, investigación y eventos de la Facultad de Educación.",
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function NoticiasPage({ searchParams }: PageProps) {
  const { page } = await searchParams; 
  const currentPage = Number(page) || 1;
  
  let noticias: Noticia[] = [];
  let meta: NoticiaResponse['meta'] | undefined = undefined;

  try {
    const response = await NoticiaService.getAllPublic(currentPage);
    noticias = response.data || [];
    meta = response.meta;
  } catch (error) {
    console.error("Error cargando noticias públicas:", error);
    noticias = [];
  }

  // Separar noticia destacada (primera) del resto
  const featuredNews = noticias.length > 0 ? noticias[0] : null;
  const gridNews = noticias.length > 0 ? noticias.slice(1) : [];

  return (
    <div className="min-h-screen bg-neutral-50">
      
      {/* 1. Header Institucional Compacto */}
      <div className="bg-brand-950 py-12 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
             <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest mb-4">
                <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white">Centro de Noticias</span>
             </div>
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-black text-white mb-2 tracking-tight">
                    Actualidad Universitaria
                    </h1>
                    <p className="text-white/70 text-lg font-light max-w-2xl">
                    Información oficial, logros académicos y vida estudiantil.
                    </p>
                </div>
             </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        
        {noticias.length > 0 ? (
          <div className="space-y-16">
            
            {/* 2. Featured News (Layout Horizontal Editorial) */}
            {featuredNews && currentPage === 1 && (
              <section className="mb-16">
                <div className="group relative grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 bg-white rounded-3xl overflow-hidden shadow-xl border border-neutral-100 hover:shadow-2xl transition-all duration-500">
                    
                    {/* Imagen (7 cols) */}
                    <div className="lg:col-span-7 relative h-64 lg:h-auto min-h-[400px] overflow-hidden">
                        <Link href={`/noticias/${featuredNews.slug}`} className="block w-full h-full">
                            <Image 
                                src={featuredNews.imagen_url || '/images/placeholder.jpg'}
                                alt={featuredNews.titulo}
                                fill
                                unoptimized
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:bg-none" />
                        </Link>
                    </div>

                    {/* Contenido (5 cols) */}
                    <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center bg-white relative">
                        <div className="mb-6 flex items-center gap-3 text-sm font-bold text-neutral-500">
                            <span className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full">
                                {featuredNews.destacada ? 'Destacada' : 'Reciente'}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                {featuredNews.fecha_humana}
                            </span>
                        </div>

                        <Link href={`/noticias/${featuredNews.slug}`} className="group/title">
                            <h2 className="text-3xl md:text-4xl font-serif font-black text-brand-950 mb-4 leading-tight group-hover/title:text-brand-600 transition-colors">
                                {featuredNews.titulo}
                            </h2>
                        </Link>

                        <p className="text-lg text-neutral-600 leading-relaxed mb-8 line-clamp-3">
                            {featuredNews.resumen}
                        </p>

                        <Link 
                            href={`/noticias/${featuredNews.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-black text-brand-600 uppercase tracking-widest hover:gap-4 transition-all"
                        >
                            Leer Artículo Completo <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
              </section>
            )}

            {/* 3. Grid de Noticias Secundarias */}
            <section>
                <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-xl font-bold text-brand-950 uppercase tracking-widest">
                        {currentPage === 1 ? 'Más Noticias' : 'Archivo de Noticias'}
                    </h3>
                    <div className="h-px bg-neutral-200 flex-1"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Si estamos en página 1, mostramos gridNews, si no, todas las de la página */}
                    {(currentPage === 1 ? gridNews : noticias).map((noticia) => (
                    <NewsCard 
                        key={noticia.id} 
                        noticia={noticia} 
                        className="h-full min-h-[450px]" 
                    />
                    ))}
                </div>
            </section>

          </div>
        ) : (
          /* Estado Vacío */
          <div className="text-center py-32">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 mb-6">
                <Clock className="h-10 w-10 text-neutral-400" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">No se encontraron noticias</h3>
            <p className="text-neutral-500 max-w-md mx-auto">
                No hay publicaciones disponibles en este momento. Revisa más tarde.
            </p>
          </div>
        )}

        {/* 4. Paginación Refinada */}
        {meta && meta.last_page > 1 && (
          <div className="mt-24 border-t border-neutral-200 pt-12 flex items-center justify-between">
            
            <div className="text-sm font-medium text-neutral-500">
                Página <span className="text-brand-950 font-bold">{meta.current_page}</span> de {meta.last_page}
            </div>

            <div className="flex items-center gap-2">
                {meta.current_page > 1 ? (
                <Link
                    href={`/noticias?page=${meta.current_page - 1}`}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-neutral-300 text-brand-950 font-bold hover:bg-brand-950 hover:text-white hover:border-brand-950 transition-all text-sm"
                >
                    <ArrowLeft className="h-4 w-4" /> Anterior
                </Link>
                ) : (
                <button disabled className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-neutral-100 text-neutral-300 font-bold cursor-not-allowed text-sm">
                    <ArrowLeft className="h-4 w-4" /> Anterior
                </button>
                )}

                {meta.current_page < meta.last_page ? (
                <Link
                    href={`/noticias?page=${meta.current_page + 1}`}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-neutral-300 text-brand-950 font-bold hover:bg-brand-950 hover:text-white hover:border-brand-950 transition-all text-sm"
                >
                    Siguiente <ArrowRight className="h-4 w-4" />
                </Link>
                ) : (
                <button disabled className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-neutral-100 text-neutral-300 font-bold cursor-not-allowed text-sm">
                    Siguiente <ArrowRight className="h-4 w-4" />
                </button>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}