import { NoticiaService } from '@/lib/services/noticia-service';
import { UnoptImage } from "@/components/ui/unopt-image";
import { Calendar, Clock } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { NewsToolbar } from '@/components/portal/news/news-toolbar';
import { BackButton } from '@/components/ui/back-button';
import { Noticia } from '@/types/noticia';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const noticia = await NoticiaService.getBySlugPublic(slug);
    
    if (!noticia) return {};

    return {
      title: `${noticia.titulo} - Facultad de Educación`,
      description: noticia.resumen || '',
      openGraph: {
        images: [noticia.imagen_url || '/images/og-default.jpg'],
      },
    };
  } catch {
    return {
      title: 'Noticia no encontrada',
    };
  }
}

export default async function NoticiaDetallePage({ params }: PageProps) {
  const { slug } = await params;
  
  let noticia: Noticia | null = null;
  try {
    noticia = await NoticiaService.getBySlugPublic(slug);
  } catch (error) {
    console.error("Error fetching noticia:", error);
    notFound();
  }

  if (!noticia) return notFound();

  return (
    <article className="min-h-screen bg-white">
      
      {/* 1. Header Institucional / Navegación */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-4 py-4">
          <BackButton label="Volver" />
        </div>
      </div>

      {/* 2. Encabezado del Artículo (Título y Metadatos) */}
      <header className="container mx-auto px-4 py-12 md:py-16 max-w-5xl text-center">
        {/* Metadatos Superiores */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-neutral-500 mb-6">
          <span className="flex items-center gap-1.5 bg-brand-50 text-brand-700 px-3 py-1 rounded-full">
            <Calendar className="h-4 w-4" />
            {noticia.fecha_humana}
          </span>
          {noticia.destacada && (
            <span className="bg-uncp-gold/20 text-yellow-800 px-3 py-1 rounded-full flex items-center gap-1">
              ★ Destacada
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            Lectura de 3 min
          </span>
        </div>

        {/* Título Principal */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-neutral-900 leading-tight mb-8">
          {noticia.titulo}
        </h1>

        {/* Resumen (Lead) */}
        {noticia.resumen && (
          <p className="text-xl md:text-2xl text-neutral-600 font-light leading-relaxed max-w-3xl mx-auto">
            {noticia.resumen}
          </p>
        )}
      </header>

      {/* 3. Hero Image Container (Estilo Tarjeta Oscura) */}
      <div className="container mx-auto px-4 max-w-6xl mb-16">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl md:rounded-3xl bg-neutral-900 shadow-2xl ring-1 ring-black/5">
          {noticia.imagen_url ? (
            <UnoptImage
              src={noticia.imagen_url}
              alt={noticia.titulo}
              fill
              className="object-contain md:object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-neutral-700 font-medium">Sin imagen de portada</span>
            </div>
          )}
        </div>
        <p className="text-center text-sm text-neutral-400 mt-4 italic">
            Imagen referencial del evento o comunicado
        </p>
      </div>

      {/* 4. Cuerpo del Contenido */}
      <div className="container mx-auto px-4 pb-24">
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            
            {/* Barra Lateral (Share & Tools) - Client Component */}
            <NewsToolbar />

            {/* Texto Principal */}
            <div className="flex-1 max-w-3xl mx-auto">
                <div className="prose prose-lg prose-neutral md:prose-xl 
                    prose-headings:font-serif prose-headings:font-bold prose-headings:text-neutral-900 
                    prose-p:text-neutral-700 prose-p:leading-relaxed 
                    prose-a:text-brand-600 prose-a:font-bold hover:prose-a:text-brand-800 
                    prose-blockquote:border-l-4 prose-blockquote:border-uncp-gold prose-blockquote:bg-amber-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                    prose-img:rounded-xl prose-img:shadow-lg
                    ">
                    {/* Renderizado de HTML Seguro */}
                    <div dangerouslySetInnerHTML={{ __html: noticia.contenido }} />
                </div>
                
                {/* Separador Final */}
                <hr className="my-12 border-neutral-200" />
                
                {/* Navegación Siguiente/Anterior (Placeholder) */}
                <div className="flex justify-between text-sm font-bold text-neutral-400 uppercase tracking-widest">
                    <span>Noticia Anterior</span>
                    <span>Siguiente Noticia</span>
                </div>
            </div>

            {/* Espacio vacío para balancear el layout en desktop */}
            <div className="hidden lg:block lg:w-16"></div>
        </div>
      </div>

    </article>
  );
}