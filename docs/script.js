// script.js

const ramos = [
  { id: "qg1", nombre: "Química General I", desbloquea: ["qg2", "qo"] },
  { id: "bc", nombre: "Biología Celular", desbloquea: ["bmg", "fi"] },
  { id: "mat", nombre: "Matemática", desbloquea: ["cd", "fis", "bioe"] },
  { id: "ib", nombre: "Introducción a la Bioquímica", desbloquea: [] },
  { id: "ihc", nombre: "Integrado de Habilidades Científicas", desbloquea: [] },
  { id: "ant", nombre: "Antropología", desbloquea: ["et"] },
  { id: "qg2", nombre: "Química General II", desbloquea: ["qa", "fquim"] },
  { id: "bmg", nombre: "Biología Molecular y Genética", desbloquea: ["bma"] },
  { id: "cd", nombre: "Cálculo Diferencial", desbloquea: [] },
  { id: "fis", nombre: "Física", desbloquea: ["bf"] },
  { id: "qo", nombre: "Química Orgánica", desbloquea: ["bq", "qoa"] },
  { id: "bq", nombre: "Bioquímica General", desbloquea: ["mg", "ui1"] },
  { id: "qa", nombre: "Química Analítica", desbloquea: ["ai"] },
  { id: "qoa", nombre: "Química Orgánica Avanzada", desbloquea: [] },
  { id: "bf", nombre: "Biofísica", desbloquea: [] },
  { id: "et", nombre: "Ética", desbloquea: ["ps"] },
  { id: "ai", nombre: "Análisis Químico Instrumental", desbloquea: [] },
  { id: "fquim", nombre: "Fisicoquímica", desbloquea: [] },
  { id: "bioe", nombre: "Bioestadística", desbloquea: ["be2"] },
  { id: "sp", nombre: "Salud Poblacional", desbloquea: ["epi"] },
  { id: "he1", nombre: "Hito Evaluativo Integrativo", desbloquea: [], requiereTodos: ["sem2", "sem3"] },
  { id: "fi", nombre: "Fisiología Integrada", desbloquea: ["bca"] },
  { id: "be2", nombre: "Bioestadística Avanzada", desbloquea: [] },
  { id: "epi", nombre: "Epidemiología", desbloquea: [] },
  { id: "ui1", nombre: "Unidad de Investigación I", desbloquea: [] },
  { id: "ps", nombre: "Persona y Sociedad", desbloquea: [] },
  { id: "bio", nombre: "Bioética", desbloquea: [] },
  { id: "bca", nombre: "Biología Celular Avanzada", desbloquea: ["inm"] },
  { id: "bqa", nombre: "Bioquímica Avanzada", desbloquea: ["qff"] },
  { id: "bma", nombre: "Biología Molecular Avanzada", desbloquea: ["gm", "mm"] },
  { id: "lib", nombre: "Laboratorio Integrado de Bioquímica", desbloquea: ["omicas", "ui2"] },
  { id: "ei1", nombre: "Electivo I", desbloquea: [] },
  { id: "qff", nombre: "Química Fisiopatológica y Farmacológica", desbloquea: ["pm"] },
  { id: "inm", nombre: "Inmunología", desbloquea: ["bcl"] },
  { id: "gm", nombre: "Genética Molecular", desbloquea: [] },
  { id: "mm", nombre: "Microbiología Molecular", desbloquea: [] },
  { id: "omicas", nombre: "Bases de las Ciencias Ómicas y Bioinformática", desbloquea: [] },
  { id: "ei2", nombre: "Electivo II", desbloquea: [] },
  { id: "pm", nombre: "Patología Molecular", desbloquea: [] },
  { id: "bcl", nombre: "Bioquímica Clínica", desbloquea: [] },
  { id: "ui2", nombre: "Unidad de Investigación II", desbloquea: ["ui3", "pp"] },
  { id: "ei3", nombre: "Electivo III", desbloquea: [] },
  { id: "he2", nombre: "Hito Evaluativo Integrativo Interprofesional", desbloquea: [], requiereTodos: ["sem6", "sem7"] },
  { id: "cg", nombre: "Control de Calidad y Gestión de Laboratorio", desbloquea: [] },
  { id: "fp", nombre: "Formulación de Proyectos", desbloquea: [] },
  { id: "ui3", nombre: "Unidad de Investigación III", desbloquea: ["mt"] },
  { id: "gc", nombre: "Gestión de Carrera y Desarrollo Profesional", desbloquea: [] },
  { id: "pp", nombre: "Práctica Profesional", desbloquea: [] },
  { id: "mt", nombre: "Memoria de Título", desbloquea: [] }
];

const mallaContainer = document.getElementById("malla");
const estadoRamos = {};

function crearRamo(ramo) {
  const div = document.createElement("div");
  div.className = "ramo bloqueado";
  div.textContent = ramo.nombre;
  div.id = ramo.id;
  div.onclick = () => aprobarRamo(ramo);
  return div;
}

function aprobarRamo(ramo) {
  const div = document.getElementById(ramo.id);
  if (div.classList.contains("bloqueado")) return;

  if (div.classList.contains("aprobado")) return;

  div.classList.add("aprobado");
  estadoRamos[ramo.id] = true;

  // Desbloquear los ramos dependientes
  ramo.desbloquea.forEach(id => {
    const next = document.getElementById(id);
    if (next) next.classList.remove("bloqueado");
  });

  // Hitos con condición de todos los semestres aprobados
  if (ramo.id === "ui2") {
    if (estadoRamos["ui2"]) {
      document.getElementById("ui3").classList.remove("bloqueado");
      document.getElementById("pp").classList.remove("bloqueado");
    }
  }
  if (ramo.id === "ui3") {
    if (estadoRamos["ui3"]) {
      document.getElementById("mt").classList.remove("bloqueado");
    }
  }
}

function renderMalla() {
  ramos.forEach(ramo => {
    const div = crearRamo(ramo);
    mallaContainer.appendChild(div);
    if (ramo.desbloquea.length === 0 && !ramo.requiereTodos) {
      div.classList.remove("bloqueado");
    }
  });
}

renderMalla();
