import axios from "axios";
import Cookies from "js-cookie";
import { AUTH_COOKIE_NAME } from "@/lib/auth-config";
import { ProgramType, ProgramData } from "@/types/programa";
import { getStorageUrl } from "@/lib/utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  console.warn("ADVERTENCIA: NEXT_PUBLIC_API_URL no está definida en las variables de entorno.");
}

const getAuthHeader = () => {
  const token = Cookies.get(AUTH_COOKIE_NAME);
  if (!token) console.warn("No se encontró token en las cookies");
  return { Authorization: `Bearer ${token}` };
};

interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  total: number;
}

export interface Programa {
  id: number;
  slug: string;
  tipo: ProgramType;
  titulo: string;
  descripcion_corta: string;
  imagen_portada_url: string;
  estado: "activo" | "inactivo" | "borrador";
  orden: number;
  detalles_json?: any;
  plan_estudio_json?: any;
  horarios_json?: any;
  config_visibilidad?: {
    mostrar_en_hero?: boolean;
    mostrar_admision?: boolean;
    mostrar_plan_estudio?: boolean;
    mostrar_horarios?: boolean;
    mostrar_perfiles?: boolean;
  };
}

export function mapToProgramData(programa: Programa): ProgramData {
  const d = programa.detalles_json || {};
  return {
    slug: programa.slug,
    tipo: programa.tipo,
    categoria: d.categoria || programa.tipo,
    titulo: programa.titulo,
    preTitle: d.hero_pre_title || "",
    tituloHero: d.hero_titulo || programa.titulo,
    descripcionCorta: programa.descripcion_corta || "",
    imagenPortada: programa.imagen_portada_url ? getStorageUrl(programa.imagen_portada_url) : "",
    imagenHero: d.hero_imagen_url ? getStorageUrl(d.hero_imagen_url) : "",
    infoGeneral: {
      duracion: d.info_general?.duracion || "",
      modalidad: d.info_general?.modalidad || "",
      certificacion: d.info_general?.certificacion || "",
      totalCreditos: Number(d.info_general?.total_creditos) || 0,
    },
    acercaDe: d.acerca_de || "",
    objetivos: d.objetivos || [],
    perfilEstudiante: d.perfil_estudiante || [],
    perfilEgresado: d.perfil_egresado || [],
    planEstudios: programa.plan_estudio_json?.ciclos || [],
    horarios: Array.isArray(programa.horarios_json) ? programa.horarios_json : [],
    certificacionDetalle: d.certificacion_detalle || "",
    admision: d.admision || undefined,
    configVisibilidad: programa.config_visibilidad || undefined,
  };
}

export const programasApi = {
  // Admin Methods
  getAll: async (params?: Record<string, any>): Promise<PaginatedResponse<Programa>> => {
    const response = await axios.get(`${API_URL}/admin/programas`, {
      params,
      headers: getAuthHeader(),
    });
    return response.data;
  },

  getOne: async (id: string | number): Promise<Programa> => {
    const response = await axios.get(`${API_URL}/admin/programas/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  create: async (formData: FormData): Promise<{ message: string; data: Programa }> => {
    const response = await axios.post(`${API_URL}/admin/programas`, formData, {
      headers: {
        ...getAuthHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  update: async (id: string | number, formData: FormData): Promise<{ message: string; data: Programa }> => {
    formData.append("_method", "PUT"); // Laravel method spoofing
    const response = await axios.post(`${API_URL}/admin/programas/${id}`, formData, {
      headers: {
        ...getAuthHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    const response = await axios.delete(`${API_URL}/admin/programas/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  toggleVisibility: async (id: number, field: string, value: boolean): Promise<void> => {
    const response = await axios.patch(
      `${API_URL}/admin/programas/${id}/toggle-visibility`,
      { field, value },
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  updateOrden: async (id: number, orden: number): Promise<void> => {
    const response = await axios.patch(
      `${API_URL}/admin/programas/${id}/orden`,
      { orden },
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Public Methods
  getPublicAll: async (params?: { tipo?: ProgramType; en_hero?: boolean }): Promise<Programa[]> => {
    const baseUrl = typeof window === 'undefined' 
      ? process.env.NEXT_PUBLIC_BACKEND_URL + '/api' 
      : API_URL;
      
    const response = await axios.get(`${baseUrl}/portal/programas`, { params });
    return response.data;
  },

  getPublicBySlug: async (slug: string): Promise<Programa> => {
    const baseUrl = typeof window === 'undefined' 
      ? process.env.NEXT_PUBLIC_BACKEND_URL + '/api' 
      : API_URL;
      
    const response = await axios.get(`${baseUrl}/portal/programas/${slug}`);
    return response.data;
  }
};
