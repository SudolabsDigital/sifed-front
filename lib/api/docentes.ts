import axios from "axios";
import Cookies from "js-cookie";
import { AUTH_COOKIE_NAME } from "@/lib/auth-config";

export interface Docente {
  id: number;
  nombre_completo: string;
  slug: string;
  grados?: string | null;
  foto_url?: string | null;
  biografia?: string | null;
  cv_url?: string | null;
  categoria?: string | null;
  especialidad?: string | null;
  estado: "activo" | "inactivo";
  orden: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  console.warn("ADVERTENCIA: NEXT_PUBLIC_API_URL no está definida en las variables de entorno.");
}

const getAuthHeader = () => {
  const token = Cookies.get(AUTH_COOKIE_NAME);
  if (!token) console.warn("No se encontró token en las cookies");
  return { Authorization: `Bearer ${token}` };
};

export const docentesApi = {
  // === PUBLIC PORTAL API ===
  getPortalList: async (params = {}) => {
    // Para SSR se debe asegurar que se puede alcanzar la URL absoluta
    const baseUrl = typeof window === 'undefined' 
      ? process.env.NEXT_PUBLIC_BACKEND_URL + '/api' 
      : API_URL;
    const response = await axios.get(`${baseUrl}/portal/docentes`, { params });
    return response.data;
  },

  getPortalSlug: async (slug: string) => {
    const baseUrl = typeof window === 'undefined' 
      ? process.env.NEXT_PUBLIC_BACKEND_URL + '/api' 
      : API_URL;
    const response = await axios.get(`${baseUrl}/portal/docentes/${slug}`);
    return response.data;
  },

  // === ADMIN API ===
  getAll: async (params = {}) => {
    const response = await axios.get(`${API_URL}/admin/docentes`, {
      params,
      headers: getAuthHeader(),
    });
    return response.data;
  },

  getOne: async (id: string | number) => {
    const response = await axios.get(`${API_URL}/admin/docentes/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  create: async (formData: FormData) => {
    const response = await axios.post(`${API_URL}/admin/docentes`, formData, {
      headers: {
        ...getAuthHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  update: async (id: string | number, formData: FormData) => {
    formData.append("_method", "PUT");
    const response = await axios.post(`${API_URL}/admin/docentes/${id}`, formData, {
      headers: {
        ...getAuthHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  delete: async (id: string | number) => {
    const response = await axios.delete(`${API_URL}/admin/docentes/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  toggleVisibility: async (id: string | number, field: string, value: boolean) => {
    const response = await axios.patch(
      `${API_URL}/admin/docentes/${id}/toggle-visibility`,
      { field, value },
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  updateOrden: async (id: string | number, orden: number) => {
    const response = await axios.patch(
      `${API_URL}/admin/docentes/${id}/orden`,
      { orden },
      { headers: getAuthHeader() }
    );
    return response.data;
  },
};

