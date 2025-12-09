const pantallas = {
  bloques: document.getElementById("pantallaBloques"),
  clave: document.getElementById("pantallaClave"),
  ensayos: document.getElementById("pantallaEnsayos"),
  final: document.getElementById("pantallaFinal")
};

const textoClave = document.getElementById("textoClave");
const simboloClave = document.getElementById("simboloClave");
const ensayoInfo = document.getElementById("ensayoInfo");
const muestra = document.getElementById("muestra");
const opcionesDiv = document.getElementById("opciones");
const feedback = document.getElementById("feedback");

const claves = [
  {
    nombre: "ES LO MISMO QUE",
    simbolo: "=",
    ensayos: [
      { muestra: "PEQUEÑO", correctos: ["🐭", "●"] },
      { muestra: "MEDIANO", correctos: ["🐶", "■"] },
      { muestra: "GRANDE", correctos: ["🐘", "★"] }
    ]
  },
  {
    nombre: "ES OPUESTO A",
    simbolo: "⇄",
    ensayos: [
      { muestra: "PEQUEÑO", correctos: ["🐘"] },
      { muestra: "GRANDE", correctos: ["🐭"] },
      { muestra: "MEDIANO", correctos: [] }
    ]
  },
  {
    nombre: "ES MÁS GRANDE QUE",
    simbolo: ">",
    ensayos: [
      { muestra: "PEQUEÑO", correctos: ["🐶","🐘"] },
      { muestra: "MEDIANO", correctos: ["🐘"] },
      { muestra: "GRANDE", correctos: [] }
    ]
  },
  {
    nombre: "VIENE ANTES QUE",
    simbolo: "⏳",
    ensayos: [
      { muestra: "MEDIANO", correctos: ["🐭"] },
      { muestra: "GRANDE", correctos: ["🐶"] },
      { muestra: "PEQUEÑO", correctos: [] }
    ]
  }
];

let claveIndex = 0;
let aciertos = 0;

function irAClave() {
  pantallas.bloques.classList.remove("activa");
  mostrarClave();
}

function mostrarClave() {
  textoClave.textContent = `AHORA APLICA LA CLAVE RELACIONAL "${claves[claveIndex].nombre}"`;
  simboloClave.textContent = claves[claveIndex].simbolo;
  pantallas.clave.classList.add("activa");
}

function iniciarEnsayos() {
  pantallas.clave.classList.remove("activa");
  pantallas.ensayos.classList.add("activa");
  aciertos = 0;
  cargarEnsayo();
}

function cargarEnsayo() {
  const ensayos = claves[claveIndex].ensayos;
  const ensayo = ensayos[Math.floor(Math.random() * ensayos.length)];

  ensayoInfo.textContent = `Aciertos: ${aciertos} / 6`;
  muestra.textContent = ensayo.muestra;
  feedback.textContent = "—";
  opcionesDiv.innerHTML = "";

  const opciones = ["🐭","🐶","🐘","●","■","★"];
  opciones.sort(() => Math.random() - 0.5).slice(0, 3).forEach(op => {
    const div = document.createElement("div");
    div.className = "opcion";
    div.textContent = op;
    div.onclick = () => evaluar(op, ensayo);
    opcionesDiv.appendChild(div);
  });
}

function evaluar(opcion, ensayo) {
  if (ensayo.correctos.includes(opcion)) {
    feedback.textContent = "✔";
    aciertos++;
  } else {
    feedback.textContent = "❌";
  }

  setTimeout(() => {
    if (aciertos >= 6) {
      claveIndex++;
      aciertos = 0;
      pantallas.ensayos.classList.remove("activa");

      if (claveIndex >= claves.length) {
        pantallas.final.classList.add("activa");
      } else {
        pantallas.clave.classList.add("activa");
        mostrarClave();
      }
    } else {
      cargarEnsayo();
    }
  }, 900);
}
