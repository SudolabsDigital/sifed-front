export default function DoctoradoDetallePage({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold font-serif mb-6">Detalle de Doctorado: {params.slug}</h1>
      <p className="text-muted-foreground">Detalles del programa cargados dinámicamente...</p>
    </div>
  );
}
