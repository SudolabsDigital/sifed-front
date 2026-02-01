"use client";

import DashboardShell from "@/components/dashboard/shell";
import { 
  LayoutDashboard, 
  GraduationCap, 
  Users, 
  FileText, 
  Settings,
  BookOpen,
  Globe,
  School,
  Scale,
  Image as ImageIcon,
  Library
} from "lucide-react";

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Gestión del Portal",
    href: "/admin/portal",
    icon: Globe,
    children: [
      {
        title: "Unidad de Posgrado",
        href: "/admin/portal/unidad",
        icon: School,
      },
      {
        title: "Maestrías",
        href: "/admin/portal/maestrias",
        icon: GraduationCap,
      },
      {
        title: "Doctorados",
        href: "/admin/portal/doctorados",
        icon: GraduationCap,
      },
      {
        title: "Documentos Normativos",
        href: "/admin/portal/normatividad",
        icon: Scale,
      },
      {
        title: "Plana Docente",
        href: "/admin/portal/docentes",
        icon: Users,
      },
      {
        title: "Publicaciones",
        href: "/admin/portal/publicaciones",
        icon: Library,
      },
      {
        title: "Galería de Fotos",
        href: "/admin/portal/galeria",
        icon: ImageIcon,
      },
      {
        title: "Trámites",
        href: "/admin/portal/tramites",
        icon: FileText,
      },
    ]
  },
  {
    title: "Usuarios y Roles",
    href: "/admin/usuarios",
    icon: Users,
  },
  {
    title: "Configuración",
    href: "/admin/configuracion",
    icon: Settings,
  },
];

import RoleGuard from "@/components/auth/role-guard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={['admin']}>
      <DashboardShell navItems={adminNavItems} title="Panel de Administración">
        {children}
      </DashboardShell>
    </RoleGuard>
  );
}