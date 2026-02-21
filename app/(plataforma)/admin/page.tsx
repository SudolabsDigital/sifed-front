"use client";

import { useAuth } from "@/hooks/use-auth";
import { Users, BookOpen, FileText, TrendingUp } from "lucide-react";

export default function AdminDashboardPage() {
  const { user } = useAuth();

  const stats = [
    { label: "Estudiantes Activos", value: "2,543", icon: Users, color: "text-blue-600 bg-blue-50" },
    { label: "Cursos Dictándose", value: "142", icon: BookOpen, color: "text-green-600 bg-green-50" },
    { label: "Trámites Pendientes", value: "38", icon: FileText, color: "text-orange-600 bg-orange-50" },
    { label: "Ingresos del Mes", value: "S/ 45k", icon: TrendingUp, color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <div className="space-y-8">
      {/* Bienvenida */}
      <div>
        <h2 className="text-3xl font-serif font-bold text-brand-950">
          Panel de Control - <span className="text-brand-600">{user?.name}</span>
        </h2>
        <p className="text-muted-foreground">Resumen de la actividad académica y administrativa.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="p-6 bg-white rounded-2xl border border-border shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <h3 className="text-2xl font-bold text-brand-950">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Placeholder */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 bg-white rounded-2xl border border-border shadow-sm min-h-[300px]">
          <h3 className="font-bold text-brand-950 mb-4">Actividad Reciente</h3>
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm">
            <div className="h-40 w-full bg-brand-50/50 rounded-xl mb-4 animate-pulse"></div>
            Gráficos en desarrollo...
          </div>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-border shadow-sm min-h-[300px]">
          <h3 className="font-bold text-brand-950 mb-4">Accesos Rápidos</h3>
          <div className="grid grid-cols-2 gap-4">
             <button className="p-4 rounded-xl border border-dashed border-brand-200 hover:border-brand-400 hover:bg-brand-50 text-sm font-medium text-brand-600 transition-colors">
                + Nueva Maestría
             </button>
             <button className="p-4 rounded-xl border border-dashed border-brand-200 hover:border-brand-400 hover:bg-brand-50 text-sm font-medium text-brand-600 transition-colors">
                + Registrar Usuario
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
