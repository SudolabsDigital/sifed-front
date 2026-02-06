import api from '@/lib/api';
import { Noticia, NoticiaResponse } from '@/types/noticia';

// Helper para normalizar respuestas de API
function unwrapResponse<T>(response: unknown): T {
  if (
    response && 
    typeof response === 'object' && 
    'data' in response && 
    !Array.isArray(response) && 
    !('meta' in response)
  ) {
    return (response as { data: T }).data;
  }
  return response as T;
}

export const NoticiaService = {
  // Public Portal Methods
  getAllPublic: async (page = 1): Promise<NoticiaResponse> => {
    const { data } = await api.get<unknown>(`/portal/noticias?page=${page}`);
    // Para colecciones, normalizamos asegurando que siempre haya un array en data
    if (Array.isArray(data)) {
        return { data: data as Noticia[], meta: { current_page: 1, last_page: 1, per_page: 100, total: data.length }, links: { first: '', last: '', prev: null, next: null } };
    }
    return data as NoticiaResponse;
  },

  getBySlugPublic: async (slug: string): Promise<Noticia> => {
    const { data } = await api.get<unknown>(`/portal/noticias/${slug}`);
    return unwrapResponse<Noticia>(data);
  },

  // Admin Methods
  getAllAdmin: async (page = 1): Promise<NoticiaResponse> => {
    const { data } = await api.get<unknown>(`/admin/noticias?page=${page}`);
    if (Array.isArray(data)) {
        return { data: data as Noticia[], meta: { current_page: 1, last_page: 1, per_page: 100, total: data.length }, links: { first: '', last: '', prev: null, next: null } };
    }
    return data as NoticiaResponse;
  },

  getByIdAdmin: async (id: number): Promise<Noticia> => {
    const { data } = await api.get<unknown>(`/admin/noticias/${id}`);
    return unwrapResponse<Noticia>(data);
  },

  create: async (formData: FormData): Promise<Noticia> => {
    const { data } = await api.post<unknown>('/admin/noticias', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return unwrapResponse<Noticia>(data);
  },

  update: async (id: number, formData: FormData): Promise<Noticia> => {
    formData.append('_method', 'PUT');
    const { data } = await api.post<unknown>(`/admin/noticias/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return unwrapResponse<Noticia>(data);
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/admin/noticias/${id}`);
  },
};