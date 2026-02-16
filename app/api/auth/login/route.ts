import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, USER_COOKIE_NAME, COOKIE_OPTIONS, USER_COOKIE_OPTIONS } from "@/lib/auth-config";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Llamada al backend de Laravel
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { message: data.message || "Credenciales inválidas" },
        { status: response.status }
      );
    }

    // Configuración de cookies seguras
    const cookieStore = await cookies();
    
    // 1. Token de sesión (HttpOnly para máxima seguridad)
    cookieStore.set(AUTH_COOKIE_NAME, data.token, COOKIE_OPTIONS);
    
    // 2. Datos del usuario (Accesibles por el cliente para la UI)
    cookieStore.set(USER_COOKIE_NAME, JSON.stringify(data.user), USER_COOKIE_OPTIONS);

    return Response.json({ success: true, user: data.user });
    
  } catch (error) {
    console.error("Login Route Error:", error);
    return Response.json(
      { message: "Error interno en el servidor de autenticación" },
      { status: 500 }
    );
  }
}
