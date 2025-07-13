const ramos = [
  { id: "qg1", nombre: "Química General I", abre: ["qg2", "qo"] },
  { id: "bc", nombre: "Biología Celular", abre: ["bmg", "fi"] },
  { id: "mate", nombre: "Matemática", abre: ["cd", "fis", "bioest"] },
  { id: "intro", nombre: "Introducción a la Bioquímica", abre: [] },
  { id: "ihc", nombre: "Integrado Habilidades Científicas", abre: [] },
  { id: "antro", nombre: "Antropología", abre: ["etica"] },
  { id: "qg2", nombre: "Química General II", abre: ["qac", "fc"], requiere: ["qg1"] },
  { id: "bmg", nombre: "Biología Molecular y Genética", abre: ["bma"], requiere: ["bc"] },
  { id: "cd", nombre: "Cálculo Diferencial", abre: [], requiere: ["mate"] },
  { id: "fis", nombre: "Física", abre: ["biofis"], requiere: ["mate"] },
  { id: "qo", nombre: "Química Orgánica", abre: ["bioq", "qoa"], requiere: ["qg1"] },
  { id: "bioq", nombre: "Bioquímica General", abre: ["micro", "ui1"], requiere: ["qo"] },
  { id: "qac", nombre: "Química Analítica Cuali-Cuanti", abre: ["aqi"], requiere: ["qg2"] },
  { id: "qoa", nombre: "Química Orgánica Avanzada", abre: [] },
  { id: "biofis", nombre: "Biofísica", abre: [], requiere: ["fis"] },
  { id: "etica", nombre: "Ética", abre: ["psoc"], requiere: ["antro"] },
  { id: "aqi", nombre: "Análisis Químico Instrumental", abre: [], requiere: ["qac"] },
  { id: "fc", nombre: "Fisicoquímica", abre: [], requiere: ["qg2"] },
  { id: "bioest", nombre: "Bioestadística", abre: ["bioestav"], requiere: ["mate"] },
  { id: "salud", nombre: "Salud Poblacional", abre: ["epid"] },
  { id: "hito1", nombre: "Hito Evaluativo Integrativo I", requiere: ["qg2", "bmg", "cd", "fis", "qo", "bioq", "qac", "qoa", "biofis", "etica"] },
  { id: "fi", nombre: "Fisiología Integrada", abre: ["bca"], requiere: ["bc"] },
  { id: "bioestav", nombre: "Bioestadística Avanzada", abre: [], requiere: ["bioest"] },
  { id: "epid", nombre: "Epidemiología", abre: [], requiere: ["salud"] },
  { id: "ui1", nombre: "Unidad de Investigación I", abre: [], requiere: ["bioq"] },
  { id: "psoc", nombre: "Persona y Sociedad", abre: [], requiere: ["etica"] },
  { id: "bioetica", nombre: "Bioética", abre: [] },
  { id: "bca", nombre: "Biología Celular Avanzada", abre: ["inmu"], requiere: ["fi"] },
  { id: "bioqav", nombre: "Bioquímica Avanzada", abre: ["qff"], requiere: ["bioq"] },
  { id: "bma", nombre: "Biología Molecular Avanzada", abre: ["gm", "mm"], requiere: ["bmg"] },
  { id: "labbioq", nombre: "Lab Integrado Bioquímica", abre: ["osmica", "ui2"] },
  { id: "elec1", nombre: "Electivo I", abre: [] },
  { id: "qff", nombre: "Química Fisiopatológica y Farmacología", abre: ["patmol"], requiere: ["bioqav"] },
  { id: "inmu", nombre: "Inmunología", abre: ["bioqclin"], requiere: ["bca"] },
  { id: "gm", nombre: "Genética Molecular", abre: [], requiere: ["bma"] },
  { id: "mm", nombre: "Microbiología Molecular", abre: [], requiere: ["bma"] },
  { id: "osmica", nombre: "Bases Osmóticas e Info.", abre: [], requiere: ["labbioq"] },
  { id: "elec2", nombre: "Electivo II", abre: [] },
  { id: "patmol", nombre: "Patología Molecular", abre: [], requiere: ["qff"] },
  { id: "bioqclin", nombre: "Bioquímica Clínica", abre: [], requiere: ["inmu"] },
  { id: "ui2", nombre: "Unidad de Investigación II", abre: ["ui3", "practica"], requiere: ["labbioq"] },
  { id: "elec3", nombre: "Electivo III", abre: [] },
  { id: "hito2", nombre: "Hito Evaluativo Integrativo II", requiere: ["bioetica","bca","bioqav","bma","labbioq","qff","inmu","gm","mm","osmica"] },
  { id: "calidad", nombre: "Control de Calidad", abre: [] },
  { id: "proj", nombre: "Formulación de Proyectos", abre: [] },
  { id: "ui3", nombre: "Unidad de Investigación III", abre: ["memoria"], requiere: ["ui2"] },
  { id: "gestion", nombre: "Gestión de Carrera", abre: [] },
  { id: "practica", nombre: "Práctica Profesional", abre: [], requiere: ["ui2"] },
  { id: "memoria", nombre: "Memoria de Título", abre: [], requiere: ["ui3"] }
];

const estado = {};

function crearMalla() {
  const contenedor = document.getElementById("malla-container");
  ramos.forEach(ramo => {
    const btn = document.createElement("button");
    btn.textContent = ramo.nombre;
    btn.id = ramo.id;
    btn.className = "ramo";
    btn.disabled = ramo.requiere ? !ramo.requiere.every(r => estado[r]) : false;
    btn.onclick = () => aprobarRamo(ramo.id);
    contenedor.appendChild(btn);
  });
}

function aprobarRamo(id) {
  const btn = document.getElementById(id);
  if (btn.disabled || estado[id]) return;

  estado[id] = true;
  btn.classList.add("aprobado");

  ramos.forEach(r => {
    const requisitosOk = !r.requiere || r.requiere.every(req => estado[req]);
    const btnRamo = document.getElementById(r.id);
    if (btnRamo && !estado[r.id] && requisitosOk) {
      btnRamo.disabled = false;
    }
  });
}

window.onload = crearMalla;
