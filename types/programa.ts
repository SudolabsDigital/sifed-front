import { Ciclo } from "./curriculum";

export type ProgramType = "maestria" | "doctorado" | "diplomado" | "curso" | "taller";

export interface ProgramInfoGeneral {
  duracion: string;
  modalidad: string;
  certificacion: string;
  totalCreditos: number;
}

export interface ProgramData {
  slug: string;
  tipo: ProgramType;
  categoria?: string;
  titulo: string;
  tituloHero: string;
  descripcionCorta: string;
  imagenPortada: string;
  imagenHero: string;
  infoGeneral: ProgramInfoGeneral;
  acercaDe: string;
  objetivos: string[];
  perfilEstudiante: string[];
  perfilEgresado: string[];
  planEstudios: Ciclo[];
  certificacionDetalle: string;
}
