"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import CountUp from "react-countup";
import { Search, Users, GraduationCap, Award, BookOpen } from "lucide-react";

////////////////////////////////////////////////////////////
// CARD DOCENTE PREMIUM
////////////////////////////////////////////////////////////

function TeacherCard({ teacher }: any) {
  const isDoctor = teacher.grade.toLowerCase().includes("doctor");

  return (
    <a
      href={teacher.orcid}
      target="_blank"
      className="
        group relative
        rounded-[2rem]
        overflow-hidden
        bg-white
        border
        shadow-md
        hover:shadow-2xl
        transition
        hover:-translate-y-2
      "
    >
      {/* Imagen */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={teacher.image}
          alt={teacher.name}
          fill
          className="object-cover group-hover:scale-110 transition"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold">
          {isDoctor ? "Doctor" : "Magíster"}
        </div>
      </div>

      <div className="p-6 text-center">
        <h3 className="font-serif text-xl font-bold text-brand-950">
          {teacher.name}
        </h3>

        <p className="text-brand-600 font-semibold text-sm mt-1">
          {teacher.grade}
        </p>

        <p className="text-muted-foreground text-sm mt-1">
          {teacher.specialty}
        </p>

        <span className="block mt-4 text-sm font-bold text-brand-600">
          Ver ORCID →
        </span>
      </div>
    </a>
  );
}

////////////////////////////////////////////////////////////
// STAT CARD
////////////////////////////////////////////////////////////

function Stat({ icon: Icon, number, label }: any) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
      <Icon className="mx-auto mb-2 text-uncp-gold" size={28} />

      <div className="text-4xl font-serif font-black text-uncp-gold">
        <CountUp end={number} duration={2} />
      </div>

      <div className="text-blue-100 text-sm mt-1">{label}</div>
    </div>
  );
}

////////////////////////////////////////////////////////////
// MAIN
////////////////////////////////////////////////////////////

export default function PlanaDocenteLanding() {
  const img = "/images/docentes.jpeg";
  type Teacher = {
  name: string;
  grade: string;
  specialty: string;
  image: string;
  orcid: string;
  email: string;
  experience: string;
  publications: number;
  category: "Doctor" | "Magister";
};


  const teachers: Teacher[] = [
    // DOCTORES
    {
      name: "Dr. Juan Pérez Huamán",
      grade: "Doctor en Ciencias de la Educación",
      specialty: "Didáctica y Currículo",
      image: img,
      orcid: "#",
      email: "jperez@uncp.edu.pe",
      experience: "15 años en investigación educativa",
      publications: 32,
      category: "Doctor",
    },
    {
      name: "Dr. Carlos Ramos Gutiérrez",
      grade: "Doctor en Psicología Educativa",
      specialty: "Psicopedagogía",
      image: img,
      orcid: "#",
      email: "cramos@uncp.edu.pe",
      experience: "18 años en formación docente",
      publications: 40,
      category: "Doctor",
    },
    {
      name: "Dr. Luis Huamán Rivera",
      grade: "Doctor en Educación",
      specialty: "Investigación Científica",
      image: img,
      orcid: "#",
      email: "lhuaman@uncp.edu.pe",
      experience: "20 años como investigador RENACYT",
      publications: 55,
      category: "Doctor",
    },
    {
      name: "Dr. Mario Cárdenas Soto",
      grade: "Doctor en Ciencias Sociales",
      specialty: "Epistemología de la Educación",
      image: img,
      orcid: "#",
      email: "mcardenas@uncp.edu.pe",
      experience: "16 años en educación superior",
      publications: 27,
      category: "Doctor",
    },
    {
      name: "Dr. Ricardo Quispe Torres",
      grade: "Doctor en Gestión Educativa",
      specialty: "Políticas Públicas Educativas",
      image: img,
      orcid: "#",
      email: "rquispe@uncp.edu.pe",
      experience: "14 años asesorando instituciones",
      publications: 21,
      category: "Doctor",
    },

    // MAGISTER
    {
      name: "Mg. María López Castillo",
      grade: "Magíster en Educación",
      specialty: "Evaluación del Aprendizaje",
      image: img,
      orcid: "#",
      email: "mlopez@uncp.edu.pe",
      experience: "12 años en docencia universitaria",
      publications: 12,
      category: "Magister",
    },
    {
      name: "Mg. Rosa Palomino Quispe",
      grade: "Magíster en Docencia Universitaria",
      specialty: "Tecnologías Educativas",
      image: img,
      orcid: "#",
      email: "rpalomino@uncp.edu.pe",
      experience: "10 años integrando TIC",
      publications: 9,
      category: "Magister",
    },
    {
      name: "Mg. Silvia Huerta Ramos",
      grade: "Magíster en Educación",
      specialty: "Didáctica Universitaria",
      image: img,
      orcid: "#",
      email: "shuerta@uncp.edu.pe",
      experience: "11 años formando docentes",
      publications: 15,
      category: "Magister",
    },
    {
      name: "Mg. Julio Medina Vargas",
      grade: "Magíster en Educación",
      specialty: "Evaluación por Competencias",
      image: img,
      orcid: "#",
      email: "jmedina@uncp.edu.pe",
      experience: "9 años en acreditación",
      publications: 8,
      category: "Magister",
    },
    {
      name: "Mg. Ana Castillo Torres",
      grade: "Magíster en Gestión Educativa",
      specialty: "Liderazgo Pedagógico",
      image: img,
      orcid: "#",
      email: "acastillo@uncp.edu.pe",
      experience: "13 años dirigiendo proyectos educativos",
      publications: 14,
      category: "Magister",
    },
    {
      name: "Mg. Pedro Salazar Huamán",
      grade: "Magíster en Gestión Pública",
      specialty: "Gestión Estratégica",
      image: img,
      orcid: "#",
      email: "psalazar@uncp.edu.pe",
      experience: "12 años en planificación institucional",
      publications: 11,
      category: "Magister",
    },
    {
      name: "Mg. Carmen Rojas Poma",
      grade: "Magíster en Educación",
      specialty: "Calidad Educativa",
      image: img,
      orcid: "#",
      email: "crojas@uncp.edu.pe",
      experience: "10 años en procesos de licenciamiento",
      publications: 10,
      category: "Magister",
    },
  ];

  //////////////////////////////////////////////////////
  // BUSCADOR + FILTROS
  //////////////////////////////////////////////////////

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("todos");

  const filteredTeachers = useMemo(() => {
    return teachers
      .filter((t) =>
        `${t.name} ${t.specialty} ${t.grade}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      )
      .filter((t) => {
        if (filter === "doctores")
          return t.grade.toLowerCase().includes("doctor");

        if (filter === "magister")
          return !t.grade.toLowerCase().includes("doctor");

        return true;
      });
  }, [search, filter]);

  //////////////////////////////////////////////////////
  // CONTADORES
  //////////////////////////////////////////////////////

  const total = teachers.length;
  const doctors = teachers.filter((t) =>
    t.grade.toLowerCase().includes("doctor"),
  ).length;

  const magisters = total - doctors;

  //////////////////////////////////////////////////////

  return (
  <main className="flex-1 w-full">

    {/* HERO PREMIUM */}
    <section className="relative bg-gradient-to-br from-brand-950 via-brand-800 to-brand-600 text-white py-32 overflow-hidden">

      {/* glow decorativo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-uncp-gold/10 blur-[140px] rounded-full" />

      <div className="relative z-10 container mx-auto px-6 lg:px-12 max-w-7xl text-center">

        {/* eyebrow */}
        <span className="uppercase tracking-widest text-uncp-gold text-xs font-black">
          Facultad de Educación
        </span>

        <h1 className="font-serif text-5xl md:text-7xl font-bold mt-6">
          Plana Docente
        </h1>

        <p className="text-blue-100 mt-6 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
          Un equipo académico conformado por doctores y magísteres con amplia
          trayectoria en investigación, innovación pedagógica y formación profesional.
        </p>

        {/* STATS MEJORADOS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          <Stat icon={Users} number={total} label="Docentes" />
          <Stat icon={Award} number={doctors} label="Doctores" />
          <Stat icon={GraduationCap} number={magisters} label="Magísteres" />
          <Stat icon={BookOpen} number={4} label="Programas" />
        </div>

      </div>
    </section>


    {/* BLOQUE INSTITUCIONAL — ESTO EVITA QUE SE VEA VACÍA */}
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-1 w-10 bg-brand-600 rounded-full" />
          <span className="uppercase text-xs tracking-widest font-black text-brand-600">
            Excelencia Académica
          </span>
          <div className="h-1 w-10 bg-brand-600 rounded-full" />
        </div>

        <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-950">
          Formación con Impacto
        </h2>

        <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
          Nuestra plana docente está integrada por investigadores activos,
          especialistas en diversas áreas del conocimiento y líderes educativos
          comprometidos con la transformación social a través de la educación.
          Cada docente aporta experiencia académica, producción científica y
          una visión global orientada a la excelencia universitaria.
        </p>

      </div>
    </section>


    {/* BUSCADOR + GRID */}
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="font-serif text-4xl font-bold text-brand-950">
            Conoce a Nuestros Docentes
          </h2>

          <p className="text-muted-foreground mt-4">
            Busca por nombre, grado académico o especialidad.
          </p>
        </div>


        {/* BUSCADOR MODERNO */}
        <div className="relative max-w-2xl mx-auto mb-10">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            placeholder="Buscar docente, especialidad o grado académico..."
            className="
              w-full
              pl-14 pr-6 py-4
              rounded-2xl
              border border-gray-200
              shadow-sm
              focus:outline-none
              focus:ring-2
              focus:ring-brand-600
              text-sm
              bg-white
            "
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>


        {/* FILTROS PRO — estilo chips */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          {["todos", "doctores", "magister"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`
                px-6 py-2.5 rounded-full font-bold capitalize transition-all
                ${
                  filter === f
                    ? "bg-brand-600 text-white shadow-lg scale-105"
                    : "bg-white border border-gray-200 hover:border-brand-400"
                }
              `}
            >
              {f}
            </button>
          ))}
        </div>


        {/* GRID MÁS AIREADO */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {filteredTeachers.map((t) => (
            <TeacherCard key={t.name} teacher={t} />
          ))}
        </div>

      </div>
    </section>

  </main>
);

}
