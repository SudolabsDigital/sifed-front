import { DocumentoNormativo } from "@/types/documento-normativo";
import axios from "axios";
import Cookies from "js-cookie";
import { AUTH_COOKIE_NAME } from "@/lib/auth-config";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const documentosApi = {
  // --- PORTAL (Público) ---
  getPublicos: async (params?: { categoria_principal?: string; sub_categoria?: string; search?: string }): Promise<DocumentoNormativo[]> => {
    const baseUrl = typeof window === 'undefined' 
      ? process.env.NEXT_PUBLIC_BACKEND_URL + '/api' 
      : API_URL;

    const response = await axios.get(`${baseUrl}/portal/documentos-normativos`, { params });
    return response.data.data; // .data is standard for Laravel Resources
  },

  getPublicoBySlug: async (slug: string): Promise<DocumentoNormativo> => {
    const baseUrl = typeof window === 'undefined' 
      ? process.env.NEXT_PUBLIC_BACKEND_URL + '/api' 
      : API_URL;

    const response = await axios.get(`${baseUrl}/portal/documentos-normativos/${slug}`);
    return response.data.data;
  },

  // --- ADMIN (Protegido) ---
  getAll: async (params: Record<string, unknown> = {}) => {
    const token = Cookies.get(AUTH_COOKIE_NAME);
    const response = await axios.get(`${API_URL}/admin/documentos-normativos`, {
      headers: { Authorization: `Bearer ${token}` },
      params
    });
    return response.data; // Paginated response
  },

  getOne: async (id: string | number): Promise<DocumentoNormativo> => {
    const token = Cookies.get(AUTH_COOKIE_NAME);
    const response = await axios.get(`${API_URL}/admin/documentos-normativos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.data;
  },

  create: async (data: FormData) => {
    const token = Cookies.get(AUTH_COOKIE_NAME);
    const response = await axios.post(`${API_URL}/admin/documentos-normativos`, data, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  update: async (id: string | number, data: FormData) => {
    const token = Cookies.get(AUTH_COOKIE_NAME);
    data.append('_method', 'PUT'); // Laravel bug workaround
    const response = await axios.post(`${API_URL}/admin/documentos-normativos/${id}`, data, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  delete: async (id: number) => {
    const token = Cookies.get(AUTH_COOKIE_NAME);
    await axios.delete(`${API_URL}/admin/documentos-normativos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  toggleVisibility: async (id: number, isPublic: boolean) => {
    const token = Cookies.get(AUTH_COOKIE_NAME);
    const response = await axios.patch(`${API_URL}/admin/documentos-normativos/${id}/toggle-visibility`, {
      is_public: isPublic
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
};
