"use client";

import { useRef } from "react";
import Image from "next/image";
import LoginForm from "@/components/auth/login-form";
import ServiceCard from "@/components/home/service-card";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { 
  GraduationCap, 
  FileText, 
  Newspaper, 
  MonitorPlay, 
  Users, 
  BookOpen, 
  Calendar,
  HelpCircle,
  ArrowLeft,
  Settings,
  LogOut,
  User as UserIcon
} from "lucide-react";
import Link from "next/link";

interface User {
  name: string;
  email: string;
  roles: string[];
  foto_url?: string;
}

export default function LoginHub() {
  const loginRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useLocalStorage<User | null>("user", null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
  };

  // Función para llamar la atención al formulario de login
  const focusLogin = () => {
    if (user) return;
    
    if (loginRef.current) {
      loginRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      loginRef.current.classList.add("ring-4", "ring-brand-300");
      setTimeout(() => loginRef.current?.classList.remove("ring-4", "ring-brand-300"), 500);
      
      const emailInput = loginRef.current.querySelector("input[type='email']") as HTMLInputElement;
      if (emailInput) emailInput.focus();
    }
  };

  // Definición dinamica de servicios
  const getServices = () => {
    const baseServices = [
      {
        title: "Maestrías y Doctorados",
        description: "Oferta académica de posgrado.",
        icon: GraduationCap,
        href: "/programas",
        requiresAuth: false,
        color: "brand" as const
      },
      {
        title: "Trámites Digitales",
        description: "Inicia y consulta el estado de tus trámites administrativos.",
        icon: FileText,
        href: "/en-construccion",
        requiresAuth: false,
        color: "gold" as const
      },
      {
        title: "Noticias y Eventos",
        description: "Comunicados oficiales recientes y vida universitaria.",
        icon: Newspaper,
        href: "/noticias",
        requiresAuth: false,
        color: "green" as const
      },
      {
        title: "Aula Virtual",
        description: "Acceso a tus cursos, materiales, foros y entrega de trabajos.",
        icon: MonitorPlay,
        href: "/estudiante/dashboard",
        requiresAuth: true,
        color: "brand" as const
      },
      {
        title: "Portal Docente",
        description: "Registro de notas y sílabos.",
        icon: Users,
        href: "/docente/dashboard",
        requiresAuth: true,
        color: "green" as const
      },
      {
        title: "Biblioteca Virtual",
        description: "Repositorio de tesis y bases de datos especializadas.",
        icon: BookOpen,
        href: "/en-construccion", // Temporal si se requiere
        requiresAuth: true, 
        color: "brand" as const
      }
    ];

    // Inyectar modulo administrativo solo si es admin
    if (user && user.roles.includes("admin")) {
      baseServices.push({
        title: "Gestión SIFED",
        description: "Panel de control administrativo.",
        icon: Settings,
        href: "/admin/dashboard",
        requiresAuth: true,
        color: "gold" as const
      });
    }

    return baseServices;
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background">
      
      {/* IZQUIERDA: Login Widget / Profile Widget */}
      {/* Responsive: h-auto en móvil para permitir scroll, h-screen sticky en desktop */}
      <div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 bg-brand-50 border-b lg:border-b-0 lg:border-r border-border p-6 lg:p-8 flex flex-col relative overflow-hidden lg:h-screen lg:sticky lg:top-0">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-600 via-uncp-gold to-brand-600 z-10"></div>
        
        {/* Contenido Izquierdo */}
        <div className="flex-1 flex flex-col lg:overflow-y-auto no-scrollbar">
            <div className="flex flex-col gap-6 mb-8">
                <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-brand-600 transition-colors self-start">
                    <ArrowLeft className="h-3 w-3" /> Volver al Portal
                </Link>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 shrink-0">
                        <Image 
                            src="/images/Escudo_UNCP.webp" 
                            alt="UNCP" 
                            width={42} 
                            height={42} 
                            className="object-contain drop-shadow-md hover:scale-110 transition-transform" 
                        />
                        <div className="h-6 w-px bg-brand-300 opacity-50"></div>
                        <Image 
                            src="/images/logoeducacion.webp" 
                            alt="Facultad" 
                            width={42} 
                            height={42} 
                            className="object-contain drop-shadow-md hover:scale-110 transition-transform" 
                        />
                    </div>
                    <div className="border-l border-brand-200 pl-4 py-1">
                        <h1 className="font-serif text-2xl font-black text-brand-950 leading-none tracking-tighter">SIFED</h1>
                        <p className="text-[10px] font-bold text-brand-600 uppercase tracking-widest">Educación UNCP</p>
                    </div>
                </div>
            </div>

            <div ref={loginRef} className="flex-1 flex flex-col justify-center">
                {!user ? (
                    <div className="bg-white rounded-2xl shadow-2xl shadow-brand-950/10 border border-brand-100 p-6 relative z-20 transition-all duration-500 animate-in fade-in zoom-in-95">
                        <LoginForm onLoginSuccess={handleLoginSuccess} />
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-2xl shadow-brand-950/10 border border-brand-100 p-6 relative z-20 transition-all duration-500 animate-in fade-in slide-in-from-left-4">
                        <div className="text-center mb-6">
                            <div className="inline-flex h-20 w-20 rounded-full bg-brand-50 border-4 border-white shadow-lg items-center justify-center mb-4 relative overflow-hidden group">
                                {user.foto_url ? (
                                    <Image src={user.foto_url} alt={user.name} fill className="object-cover" />
                                ) : (
                                    <UserIcon className="h-10 w-10 text-brand-300" />
                                )}
                            </div>
                            <h3 className="text-lg font-serif font-black text-brand-950">
                                Hola, <span className="text-brand-600">{user.name.split(' ')[0]}</span>
                            </h3>
                            <div className="mt-2 flex flex-wrap justify-center gap-1">
                                {user.roles.map((role: string) => (
                                    <span key={role} className="px-2 py-0.5 rounded-full bg-brand-600 text-[9px] font-black text-white uppercase tracking-tighter">
                                        {role}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="p-3 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-between">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase">Estado</span>
                                <span className="flex items-center gap-1.5 text-[10px] font-black text-uncp-green uppercase">
                                    <div className="h-1.5 w-1.5 rounded-full bg-uncp-green animate-pulse" />
                                    En línea
                                </span>
                            </div>
                            
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-brand-100 text-brand-950 font-bold text-xs hover:bg-brand-50 hover:border-brand-300 transition-all"
                            >
                                <LogOut className="h-4 w-4" />
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-6 text-center text-[10px] text-muted-foreground/50">
                <p>© 2026 UNCP. Todos los derechos reservados.</p>
            </div>
        </div>
      </div>

      {/* DERECHA: Grid de Servicios */}
      {/* Responsive: h-auto en móvil (scroll de página), h-screen en desktop (scroll interno) */}
      <div className="flex-1 bg-white p-6 lg:p-8 xl:p-12 lg:overflow-y-auto lg:h-screen">
         
         <div className="max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
               <div>
                  <h2 className="font-serif text-2xl font-bold text-brand-950 mb-1">Servicios Académicos</h2>
                  <p className="text-[13px] text-muted-foreground">Explora y accede a los módulos habilitados para tu cuenta.</p>
               </div>
               
               <div className="inline-flex items-center gap-2 bg-brand-50 px-4 py-2 rounded-full text-[11px] font-bold text-brand-800 border border-brand-200 self-start md:self-auto">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Periodo 2026-I</span>
               </div>
            </div>

            {/* GRID DENSO: Ajuste fino de breakpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 pb-10">
               {getServices().map((service, index) => (
                 <ServiceCard
                   key={`${index}-${user ? 'logged' : 'guest'}`}
                   {...service}
                   onLockedClick={focusLogin}
                   isLoggedIn={!!user} 
                 />
               ))}

               {/* Card de Ayuda Compacto */}
               <Link href="/soporte" className="group flex flex-col justify-center items-center p-4 rounded-xl border border-dashed border-brand-300 bg-brand-50/50 hover:bg-brand-50 hover:border-brand-400 transition-all cursor-pointer text-center min-h-[120px]">
                  <div className="h-8 w-8 rounded-full bg-white border border-brand-200 flex items-center justify-center text-brand-600 mb-2 group-hover:scale-110 transition-transform">
                     <HelpCircle className="h-4 w-4" />
                  </div>
                  <h3 className="font-bold text-xs text-brand-900">¿Necesitas Ayuda?</h3>
               </Link>
            </div>
         </div>
      </div>

    </div>
  );
}