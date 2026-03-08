import { Ciclo } from "./curriculum";

export type ProgramType = "maestria" | "doctorado" | "diplomado" | "curso" | "taller";

export interface ProgramInfoGeneral {
  duracion: string;
  modalidad: string;
  certificacion: string;
  totalCreditos: number;
}

export interface ClaseEspecifica {
  asignatura: string;
  dia_hora: string;
  docente: string;
}

export interface HorarioModulo {
  titulo_modulo: string;
  descripcion_general: string;
  clases_especificas?: ClaseEspecifica[];
}

export interface ProgramAdmision {
  costo_inscripcion?: string;
  matricula?: string;
  pension?: string;
  costo_adicional?: string;
  requisitos?: string[];
}

export interface ConfigVisibilidad {
  mostrar_en_hero?: boolean;
  mostrar_admision?: boolean;
  mostrar_plan_estudio?: boolean;
  mostrar_horarios?: boolean;
  mostrar_perfiles?: boolean;
  mostrar_certificacion?: boolean;
}

export interface ProgramData {
  slug: string;
  tipo: ProgramType;
  categoria?: string;
  titulo: string;
  preTitle?: string;
  tituloHero: string;
  contenidoPreTitle?: string;
  contenidoTitulo?: string;
  descripcionCorta: string;
  imagenPortada: string;
  imagenHero: string;
  infoGeneral: ProgramInfoGeneral;
  acercaDe: string;
  objetivos: string[];
  perfilEstudiante: string[];
  perfilEgresado: string[];
  planEstudios: Ciclo[];
  horarios: HorarioModulo[];
  certificacionDetalle: string;
  admision?: ProgramAdmision;
  configVisibilidad?: ConfigVisibilidad;
}
