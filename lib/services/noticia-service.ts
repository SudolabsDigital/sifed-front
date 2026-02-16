import api from '@/lib/api';
import { Noticia, NoticiaResponse } from '@/types/noticia';
import { NoticiaCategoria } from '@/types/noticia-categoria';

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
  getAllPublic: async (page = 1, categoria?: string): Promise<NoticiaResponse> => {
    const url = `/portal/noticias?page=${page}${categoria ? `&categoria=${categoria}` : ''}`;
    const { data } = await api.get<unknown>(url);
    if (Array.isArray(data)) {
        return { data: data as Noticia[], meta: { current_page: 1, last_page: 1, per_page: 100, total: data.length }, links: { first: '', last: '', prev: null, next: null } };
    }
    return data as NoticiaResponse;
  },

  getBySlugPublic: async (slug: string): Promise<Noticia> => {
    const { data } = await api.get<unknown>(`/portal/noticias/${slug}`);
    return unwrapResponse<Noticia>(data);
  },

  getCategoriesWithNews: async (): Promise<NoticiaCategoria[]> => {
    const { data } = await api.get<NoticiaCategoria[]>('/portal/noticias-categorias');
    return data;
  },

  // Admin Methods
  getAllAdmin: async (page = 1): Promise<NoticiaResponse> => {
    const { data } = await api.get<any>(`/admin/noticias?page=${page}`);
    // Laravel Resource Collection devuelve { data: [], links: {}, meta: {} }
    if (data && data.data && data.meta) {
        return data as NoticiaResponse;
    }
    // Fallback si por alguna razón viene el array directo
    if (Array.isArray(data)) {
        return { 
          data: data as Noticia[], 
          meta: { current_page: 1, last_page: 1, per_page: 100, total: data.length }, 
          links: { first: '', last: '', prev: null, next: null } 
        };
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

  // Category Admin Methods
  getAllCategories: async (): Promise<NoticiaCategoria[]> => {
    const { data } = await api.get<any>('/admin/noticias-categorias');
    // Laravel Resource Collection devuelve { data: [] }
    if (data && data.data) {
        return data.data as NoticiaCategoria[];
    }
    // Fallback
    return (Array.isArray(data) ? data : []) as NoticiaCategoria[];
  },

  getCategoryById: async (id: number): Promise<NoticiaCategoria> => {
    const { data } = await api.get<unknown>(`/admin/noticias-categorias/${id}`);
    const unwrapped = unwrapResponse<NoticiaCategoria>(data);
    return unwrapped;
  },

  createCategory: async (category: Partial<NoticiaCategoria>): Promise<NoticiaCategoria> => {
    const { data } = await api.post<unknown>('/admin/noticias-categorias', category);
    return unwrapResponse<NoticiaCategoria>(data);
  },

  updateCategory: async (id: number, category: Partial<NoticiaCategoria>): Promise<NoticiaCategoria> => {
    const { data } = await api.put<unknown>(`/admin/noticias-categorias/${id}`, category);
    return unwrapResponse<NoticiaCategoria>(data);
  },

  deleteCategory: async (id: number): Promise<void> => {
    await api.delete(`/admin/noticias-categorias/${id}`);
  },
};
