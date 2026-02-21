"use client";

import DashboardShell from "@/components/dashboard/shell";
import { NavItem } from "@/components/dashboard/sidebar";
import { LayoutDashboard, GraduationCap, Users, BookOpen, Settings, FileText } from "lucide-react";

const adminNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Gestión Académica",
    href: "/admin/gestion-academica",
    icon: GraduationCap,
    children: [
      { title: "Programas", href: "/admin/programas" },
      { title: "Mallas", href: "/admin/mallas" },
      { title: "Aulas", href: "/admin/aulas" },
    ],
  },
  {
    title: "Usuarios",
    href: "/admin/usuarios",
    icon: Users,
  },
  {
    title: "Contenido Portal",
    href: "/admin/contenido",
    icon: FileText,
  },
  {
    title: "Configuración",
    href: "/admin/configuracion",
    icon: Settings,
  },
];

export default function PlataformaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Obtener items de navegación dinámicamente según el rol del usuario
  return (
    <DashboardShell navItems={adminNavItems} title="Panel Administrativo">
      {children}
    </DashboardShell>
  );
}
