"use client";

import { useState } from "react";
import { AuthService } from "@/lib/services/auth-service";
import { cn } from "@/lib/utils";
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";

interface User {
  name: string;
  email: string;
  roles: string[];
  token: string;
  foto_url?: string;
}

interface LoginFormProps {
  onLoginSuccess: (userData: User) => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await AuthService.login(email, password);
      
      if (result.user && result.token) {
        // Guardar token y usuario
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        
        onLoginSuccess({ ...result.user, token: result.token });
      } else {
        setError("Error en la respuesta del servidor");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
         setError(err.message);
      } else {
         setError("Credenciales inválidas o error de conexión");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center mb-6">
        <h3 className="text-xl font-serif font-black text-brand-950">
          Bienvenido al <span className="text-brand-600">Campus Virtual</span>
        </h3>
        <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mt-1">
          Facultad de Educación - SIFED
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3 text-destructive text-sm animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-bold text-brand-950 block"
        >
          Correo Electrónico
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="nombre@uncp.edu.pe"
          className="w-full px-4 py-3 rounded-lg border border-input bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all placeholder:text-muted-foreground"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-sm font-bold text-brand-950 block"
          >
            Contraseña
          </label>
          <a
            href="#"
            className="text-xs font-semibold text-brand-600 hover:text-brand-800 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-lg border border-input bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all placeholder:text-muted-foreground pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={cn(
          "w-full flex items-center justify-center py-3.5 px-4 rounded-xl font-bold text-white transition-all shadow-lg shadow-brand-600/20",
          loading
            ? "bg-brand-300 cursor-not-allowed"
            : "bg-brand-600 hover:bg-brand-800 hover:-translate-y-0.5 hover:shadow-xl"
        )}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Iniciando sesión...
          </>
        ) : (
          "Ingresar a la Plataforma"
        )}
      </button>

      <div className="text-center pt-2">
        <p className="text-sm text-muted-foreground">
          ¿No tienes una cuenta?{" "}
          <a
            href="#"
            className="font-bold text-brand-600 hover:text-brand-800 hover:underline"
          >
            Solicita tu registro aquí
          </a>
        </p>
      </div>
    </form>
  );
}