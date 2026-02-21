import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PosgradoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background text-foreground font-sans selection:bg-brand-600 selection:text-white flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-full max-w-[1920px] mx-auto flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}
