export async function fetchPublic<T>(
  endpoint: string,
  options?: RequestInit & { params?: Record<string, string | number | boolean> }
): Promise<T> {
  const API_URL = typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_BACKEND_URL + '/api'
    : process.env.NEXT_PUBLIC_API_URL;

  let url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  // Procesar parámetros de query
  if (options?.params) {
    const searchParams = new URLSearchParams();
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  // Configurar las opciones por defecto
  const fetchOptions: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options?.headers,
    },
    // Si no se especifica otra cosa, revalidamos cada 60 segundos por defecto
    next: {
      revalidate: options?.next?.revalidate ?? 60,
      ...options?.next
    }
  };

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`[fetchPublic] Error en petición a ${url}:`, error);
    throw error;
  }
}
