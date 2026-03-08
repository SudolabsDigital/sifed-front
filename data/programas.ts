import { ProgramData } from "@/types/programa";
import { curriculums } from "./curriculums";

export const PROGRAMAS_DATA: ProgramData[] = [
  {
    slug: "gestion-educativa",
    tipo: "maestria",
    categoria: "Gestión",
    titulo: "Maestría en Gestión Educativa",
    tituloHero: "MAESTRÍA EN GESTIÓN EDUCATIVA",
    descripcionCorta: "Lidera instituciones y transforma resultados con un enfoque estratégico.",
    imagenPortada: "/images/programas/maestria-gestion.webp",
    imagenHero: "/images/programas/maestria-gestion.webp",
    infoGeneral: {
      duracion: "3 Semestres",
      modalidad: "Presencial / Virtual",
      certificacion: "Magíster en Educación",
      totalCreditos: 49
    },
    acercaDe: "La Maestría en Gestión Educativa está diseñada para formar líderes capaces de dirigir instituciones con eficiencia, innovación y compromiso social.",
    objetivos: [
      "Optimizar procesos administrativos y académicos.",
      "Diseñar proyectos de mejora institucional.",
      "Liderar equipos multidisciplinarios en el sector educativo."
    ],
    perfilEstudiante: [
      "Bachilleres en educación o áreas afines.",
      "Profesionales con interés en la gestión pública o privada.",
      "Capacidad de análisis y pensamiento crítico."
    ],
    perfilEgresado: [
      "Directivo altamente calificado para instituciones educativas.",
      "Consultor en gestión y políticas educativas.",
      "Investigador en administración de la educación."
    ],
    planEstudios: curriculums.find(c => c.id === "maestria-gestion")?.ciclos || [],
  horarios: [],
    certificacionDetalle: "Al concluir satisfactoriamente el plan de estudios y sustentar la tesis, se otorga el grado académico de Maestro en Educación con mención en Gestión Educativa."
  },
  {
    slug: "educacion-superior",
    tipo: "maestria",
    categoria: "Docencia",
    titulo: "Maestría en Educación Superior",
    tituloHero: "MAESTRÍA EN EDUCACIÓN SUPERIOR",
    descripcionCorta: "Especialízate en la docencia universitaria y la investigación académica.",
    imagenPortada: "/images/programas/maestria-superior.webp",
    imagenHero: "/images/programas/maestria-superior.webp",
    infoGeneral: {
      duracion: "3 Semestres",
      modalidad: "Presencial / Virtual",
      certificacion: "Magíster en Educación",
      totalCreditos: 49
    },
    acercaDe: "Enfocada en el desarrollo de competencias pedagógicas avanzadas para el entorno universitario.",
    objetivos: [
      "Dominar estrategias didácticas para la educación superior.",
      "Desarrollar investigación científica de alto nivel.",
      "Gestionar currículos universitarios por competencias."
    ],
    perfilEstudiante: [
      "Docentes universitarios en ejercicio.",
      "Profesionales que deseen incursionar en la cátedra universitaria."
    ],
    perfilEgresado: [
      "Catedrático universitario con excelencia pedagógica.",
      "Investigador académico certificado.",
      "Especialista en diseño curricular superior."
    ],
    planEstudios: curriculums.find(c => c.id === "maestria-superior")?.ciclos || [],
  horarios: [],
    certificacionDetalle: "Se otorga el grado académico de Maestro en Educación con mención en Educación Superior."
  },
  {
    slug: "psicologia-educativa",
    tipo: "maestria",
    categoria: "Psicología",
    titulo: "Maestría en Psicología Educativa",
    tituloHero: "MAESTRÍA EN PSICOLOGÍA EDUCATIVA",
    descripcionCorta: "Comprende la mente para transformar los procesos de aprendizaje.",
    imagenPortada: "/images/programas/maestria-psicologia.webp",
    imagenHero: "/images/programas/maestria-psicologia.webp",
    infoGeneral: {
      duracion: "3 Semestres",
      modalidad: "Presencial / Virtual",
      certificacion: "Magíster en Educación",
      totalCreditos: 49
    },
    acercaDe: "Integra los avances de la psicología y la neurociencia en la práctica educativa.",
    objetivos: [
      "Diagnosticar y atender problemas de aprendizaje.",
      "Aplicar estrategias neuropsicológicas en el aula.",
      "Promover el bienestar emocional en la comunidad educativa."
    ],
    perfilEstudiante: [
      "Psicólogos, educadores y profesionales de la salud mental."
    ],
    perfilEgresado: [
      "Especialista en intervención psicopedagógica.",
      "Asesor en inclusión educativa y neurodiversidad.",
      "Investigador en psicología del aprendizaje."
    ],
    planEstudios: curriculums.find(c => c.id === "maestria-psicologia")?.ciclos || [],
  horarios: [],
    certificacionDetalle: "Se otorga el grado académico de Maestro en Educación con mención en Psicología Educativa."
  },
  {
    slug: "ensenanza-estrategica",
    tipo: "maestria",
    categoria: "Docencia",
    titulo: "Maestría en Enseñanza Estratégica",
    tituloHero: "MAESTRÍA EN ENSEÑANZA ESTRATÉGICA",
    descripcionCorta: "Diseña experiencias de aprendizaje disruptivas y de alto impacto.",
    imagenPortada: "/images/programas/maestria-ensenanza.webp",
    imagenHero: "/images/programas/maestria-ensenanza.webp",
    infoGeneral: {
      duracion: "3 Semestres",
      modalidad: "Presencial / Virtual",
      certificacion: "Magíster en Educación",
      totalCreditos: 49
    },
    acercaDe: "Potencia tu práctica docente con metodologías activas y pensamiento crítico.",
    objetivos: [
      "Diseñar procesos de enseñanza centrados en el estudiante.",
      "Implementar tecnologías innovadoras en el aprendizaje.",
      "Fortalece el pensamiento creativo y reflexivo."
    ],
    perfilEstudiante: [
      "Docentes de educación básica y técnica que buscan innovar."
    ],
    perfilEgresado: [
      "Líder en innovación pedagógica.",
      "Especialista en metodologías de enseñanza activa.",
      "Diseñador de recursos didácticos digitales."
    ],
    planEstudios: curriculums.find(c => c.id === "maestria-ensenanza")?.ciclos || [],
  horarios: [],
    certificacionDetalle: "Se otorga el grado académico de Maestro en Educación con mención en Enseñanza Estratégica."
  },
  {
    slug: "ciencias-educacion",
    tipo: "doctorado",
    titulo: "Doctorado en Ciencias de la Educación",
    tituloHero: "DOCTORADO EN CIENCIAS DE LA EDUCACIÓN",
    descripcionCorta: "El máximo nivel de investigación y producción científica en educación.",
    imagenPortada: "/images/programas/doctorado-ciencias.webp",
    imagenHero: "/images/programas/doctorado-ciencias.webp",
    infoGeneral: {
      duracion: "6 Semestres",
      modalidad: "Presencial / Mixta",
      certificacion: "Doctor en Ciencias de la Educación",
      totalCreditos: 72
    },
    acercaDe: "Programa orientado a la formación de investigadores de alto nivel capaces de generar conocimiento original.",
    objetivos: [
      "Generar teorías educativas innovadoras.",
      "Liderar proyectos de investigación científica internacional.",
      "Influir en las políticas públicas de educación."
    ],
    perfilEstudiante: [
      "Maestros en educación o ciencias sociales con vocación investigadora.",
      "Profesionales con trayectoria académica consolidada."
    ],
    perfilEgresado: [
      "Investigador científico reconocido.",
      "Consultor internacional en educación.",
      "Líder de institutos de investigación y posgrado."
    ],
    planEstudios: curriculums.find(c => c.id === "doctorado-ciencias")?.ciclos || [],
  horarios: [],
    certificacionDetalle: "Se otorga el grado académico de Doctor en Ciencias de la Educación, máximo reconocimiento universitario."
  }
];
