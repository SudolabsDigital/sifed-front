"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // No logueado -> Login
        router.push("/login");
      } else {
        // Logueado -> Verificar Rol
        const hasRole = user.roles.some((role) => allowedRoles.includes(role));
        
        if (hasRole) {
          setAuthorized(true);
        } else {
          // Logueado pero sin rol -> Acceso Denegado
          router.push("/acceso-denegado");
        }
      }
    }
  }, [user, loading, allowedRoles, router]);

  if (loading || !authorized) {
    // Spinner de carga mientras verifica
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-brand-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-brand-600 animate-spin" />
          <p className="text-sm font-bold text-brand-900 animate-pulse">Verificando credenciales...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
