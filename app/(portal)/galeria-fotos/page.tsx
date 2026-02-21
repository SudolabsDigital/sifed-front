import Link from "next/link";
import Image from "next/image";
import { ArrowRight, GraduationCap, Microscope, Calendar } from "lucide-react";
import PageHero from "@/components/ui/page-hero";

const galleries = [
  {
    title: "Sustentaciones",
    description: "Defensas de tesis y grados académicos.",
    href: "/galeria-fotos/sustentaciones",
    image: "/images/portada-1.webp",
    icon: GraduationCap,
    color: "bg-blue-600",
  },
  {
    title: "Investigación",
    description: "Proyectos, campo y producción científica.",
    href: "/galeria-fotos/investigacion",
    image: "/images/portada-2.webp",
    icon: Microscope,
    color: "bg-emerald-600",
  },
  {
    title: "Eventos",
    description: "Congresos, seminarios y vida institucional.",
    href: "/galeria-fotos/eventos",
    image: "/images/portada-3.webp",
    icon: Calendar,
    color: "bg-amber-600",
  },
];

export const metadata = {
  title: "Galería de Fotos | Facultad de Educación",
  description: "Explora la vida académica, eventos y logros de nuestra comunidad.",
};

export default function GaleriaHubPage() {
  return (
    <>
      <PageHero
        title="GALERÍA INSTITUCIONAL"
        subtitle="MEMORIA VISUAL"
        description="Un recorrido visual por los momentos más destacados de nuestra vida académica y comunidad universitaria."
        imageSrc="/images/portada-3.webp"
        align="center"
        breadcrumbs={[
          { label: "Galería" }
        ]}
      />

      <div className="py-16 md:py-24 bg-neutral-50 min-h-[50vh]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {galleries.map((gallery) => {
              const Icon = gallery.icon;
              return (
                <Link 
                  key={gallery.href} 
                  href={gallery.href}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-neutral-100 flex flex-col h-full"
                >
                  {/* Imagen Cover */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-brand-950/20 group-hover:bg-brand-950/0 transition-colors z-10" />
                    <div className={`absolute inset-0 ${gallery.color} opacity-10`} />
                    <Image
                      src={gallery.image}
                      alt={gallery.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm">
                      <Icon className={`h-6 w-6 ${gallery.color.replace('bg-', 'text-')}`} />
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold text-brand-950 mb-2 group-hover:text-brand-600 transition-colors">
                      {gallery.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 flex-1">
                      {gallery.description}
                    </p>
                    
                    <div className="flex items-center text-sm font-bold text-brand-600 uppercase tracking-wider group-hover:gap-2 transition-all">
                      Ver Galería <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
