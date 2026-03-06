import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // 1. Validar el token de seguridad
    const secret = request.nextUrl.searchParams.get('secret');
    
    const expectedSecret = process.env.REVALIDATION_SECRET;
    
    if (!expectedSecret) {
      return NextResponse.json({ message: 'Error de configuración: REVALIDATION_SECRET no definido en el entorno' }, { status: 500 });
    }

    if (secret !== expectedSecret) {
      return NextResponse.json({ message: 'Token de revalidación inválido' }, { status: 401 });
    }

    // 2. Obtener la ruta a revalidar (por defecto la portada '/')
    const path = request.nextUrl.searchParams.get('path') || '/';

    // 3. Ejecutar la revalidación
    revalidatePath(path);

    return NextResponse.json({ revalidated: true, now: Date.now(), path });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidando', error: err }, { status: 500 });
  }
}
