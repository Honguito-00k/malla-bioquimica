const ramos = [
  { id: "qg1", nombre: "Química General I", semestre: 1, abre: ["qg2", "qo"] },
  { id: "bc", nombre: "Biología Celular", semestre: 1, abre: ["bmg", "fi"] },
  { id: "mate", nombre: "Matemática", semestre: 1, abre: ["cd", "fis", "bioest"] },
  { id: "intro", nombre: "Introducción a la Bioquímica", semestre: 1, abre: [] },
  { id: "ihc", nombre: "Integrado Habilidades Científicas", semestre: 1, abre: [] },
  { id: "antro", nombre: "Antropología", semestre: 1, abre: ["etica"] },

  { id: "qg2", nombre: "Química General II", semestre: 2, abre: ["qac", "fc"], requiere: ["qg1"] },
  { id: "bmg", nombre: "Biología Molecular y Genética", semestre: 2, abre: ["bma"], requiere: ["bc"] },
  { id: "cd", nombre: "Cálculo Diferencial", semestre: 2, requiere: ["mate"] },
  { id: "fis", nombre: "Física", semestre: 2, abre: ["biofis"], requiere: ["mate"] },
  { id: "qo", nombre: "Química Orgánica", semestre: 2, abre: ["bioq", "qoa"], requiere: ["qg1"] },

  { id: "bioq", nombre: "Bioquímica General", semestre: 3, abre: ["micro", "ui1"], requiere: ["qo"] },
  { id: "qac", nombre: "Química Analítica Cuali-Cuanti", semestre: 3, abre: ["aqi"], requiere: ["qg2"] },
  { id: "qoa", nombre: "Química Orgánica Avanzada", semestre: 3, requiere: ["qo"] },
  { id: "biofis", nombre: "Biofísica", semestre: 3, requiere: ["fis"] },
  { id: "etica", nombre: "Ética", semestre: 3, abre: ["psoc"], requiere: ["antro"] },

  { id: "aqi", nombre: "Análisis Químico Instrumental", semestre: 4, requiere: ["qac"] },
  { id: "fc", nombre: "Fisicoquímica", semestre: 4, requiere: ["qg2"] },
  { id: "bioest", nombre: "Bioestadística", semestre: 4, abre: ["bioestav"], requiere: ["mate"] },
  { id: "salud", nombre: "Salud Poblacional", semestre: 4, abre: ["epid"] },
  { id: "hito1", nombre: "Hito Evaluativo Integrativo I", semestre: 4, requiere: ["qg2","bmg","cd","fis","qo","bioq","qac","qoa","biofis","etica"] },

  { id: "fi", nombre: "Fisiología Integrada", semestre: 5, abre: ["bca"], requiere: ["bc"] },
  { id: "bioestav", nombre: "Bioestadística Avanzada", semestre: 5, requiere: ["bioest"] },
  { id: "epid", nombre: "Epidemiología", semestre: 5, requiere: ["salud"] },
  { id: "ui1", nombre: "Unidad de Investigación I", semestre: 5, requiere: ["bioq"] },
  { id: "psoc", nombre: "Persona y Sociedad", semestre: 5, requiere: ["etica"] },

  { id: "bioetica", nombre: "Bioética", semestre: 6 },
  { id: "bca", nombre: "Biología Celular Avanzada", semestre: 6, abre: ["inmu"], requiere: ["fi"] },
  { id: "bioqav", nombre: "Bioquímica Avanzada", semestre: 6, abre: ["qff"], requiere: ["bioq"] },
  { id: "bma", nombre: "Biología Molecular Avanzada", semestre: 6, abre: ["gm", "mm"], requiere: ["bmg"] },
  { id: "labbioq", nombre: "Lab Integrado Bioquímica", semestre: 6, abre: ["osmica", "ui2"] },
  { id: "elec1", nombre: "Electivo I Formación e Identidad", semestre: 6 },

  { id: "qff", nombre: "Química Fisiopatológica y Farmacología", semestre: 7, abre: ["patmol"], requiere: ["bioqav"] },
  { id: "inmu", nombre: "Inmunología", semestre: 7, abre: ["bioqclin"], requiere: ["bca"] },
  { id: "gm", nombre: "Genética Molecular", semestre: 7, requiere: ["bma"] },
  { id: "mm", nombre: "Microbiología Molecular", semestre: 7, requiere: ["bma"] },
  { id: "osmica", nombre: "Bases Osmóticas e Info.", semestre: 7, requiere: ["labbioq"] },
  { id: "elec2", nombre: "Electivo II Formación e Identidad", semestre: 7 },

  { id: "patmol", nombre: "Patología Molecular", semestre: 8, requiere: ["qff"] },
  { id: "bioqclin", nombre: "Bioquímica Clínica", semestre: 8, requiere: ["inmu"] },
  { id: "ui2", nombre: "Unidad de Investigación II", semestre: 8, abre: ["ui3", "practica"], requiere: ["labbioq"] },
  { id: "elec3i", nombre: "Electivo I", semestre: 8 },
  { id: "elec3fi", nombre: "Electivo III Formación e Identidad", semestre: 8 },
  { id: "hito2", nombre: "Hito Evaluativo Integrativo II", semestre: 8, requiere: ["bioetica","bca","bioqav","bma","labbioq","qff","inmu","gm","mm","osmica"] },

  { id: "calidad", nombre: "Control de Calidad", semestre: 9 },
  { id: "proj", nombre: "Formulación de Proyectos", semestre: 9 },
  { id: "ui3", nombre: "Unidad de Investigación III", semestre: 9, abre: ["memoria"], requiere: ["ui2"] },
  { id: "elec4", nombre: "Electivo II", semestre: 9 },
  { id: "gestion", nombre: "Gestión de Carrera", semestre: 9 },

  { id: "practica", nombre: "Práctica Profesional", semestre: 10, requiere: ["ui2"] },
  { id: "memoria", nombre: "Memoria de Título", semestre: 10, requiere: ["ui3"] },
  { id: "elec5", nombre: "Electivo III", semestre: 10 }
];

const estado = {};

function inicializarEstado() {
  ramos.forEach(r => estado[r.id] = false);
}

function crearMalla() {
  const contenedor = document.getElementById("malla-container");
  contenedor.innerHTML = "";

  for (let s = 1; s <= 10; s++) {
    const bloque = document.createElement("div");
    bloque.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = `Semestre ${s}`;
    bloque.appendChild(titulo);

    const grupo = document.createElement("div");
    grupo.className = "ramos";

    ramos.filter(r => r.semestre === s).forEach(ramo => {
      const btn = document.createElement("button");
      btn.textContent = ramo.nombre;
      btn.id = ramo.id;
      btn.className = "ramo";
      btn.disabled = ramo.requiere ? !ramo.requiere.every(r => estado[r]) : false;
      btn.onclick = () => aprobarRamo(ramo.id);
      grupo.appendChild(btn);
    });

    bloque.appendChild(grupo);
    contenedor.appendChild(bloque);
  }
}

function aprobarRamo(id) {
  const btn = document.getElementById(id);
  if (!btn) return;

  // Toggle estado
  estado[id] = !estado[id];
  btn.classList.toggle("aprobado");

  // Actualizar estado de los demás botones
  ramos.forEach(r => {
    const btnRamo = document.getElementById(r.id);
    if (!btnRamo) return;

    const requisitosOk = !r.requiere || r.requiere.every(req => estado[req]);

    if (!estado[r.id] && requisitosOk) {
      btnRamo.disabled = false;
    } else if (!estado[r.id]) {
      btnRamo.disabled = true;
    }
  });
}

window.onload = () => {
  inicializarEstado();
  crearMalla();
};
