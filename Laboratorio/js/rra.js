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
  { nombre: "ES LO MISMO QUE", simbolo: "=", ensayos: [
    { muestra: "LUNA", correctos: ["🌙", "■"] },
    { muestra: "PERRO", correctos: ["🐶", "▲"] },
    { muestra: "MANZANA", correctos: ["🍎", "★"] }
  ]},
  { nombre: "ES OPUESTO A", simbolo: "⇄", ensayos: [
    { muestra: "LUNA", correctos: ["🍎"] },
    { muestra: "MANZANA", correctos: ["🌙"] },
    { muestra: "PERRO", correctos: ["🐶"] }
  ]},
  { nombre: "ES MÁS GRANDE QUE", simbolo: ">", ensayos: [
    { muestra: "MANZANA", correctos: ["🐶","🌙"] },
    { muestra: "PERRO", correctos: ["🌙"] },
    { muestra: "LUNA", correctos: [] }
  ]}
];

let claveIndex = 0;
let ensayoIndex = 0;

function irAClave() {
  pantallas.bloques.classList.remove("activa");
  mostrarClave();
}

function mostrarClave(){
  textoClave.textContent = `AHORA APLICA LA CLAVE RELACIONAL "${claves[claveIndex].nombre}"`;
  simboloClave.textContent = claves[claveIndex].simbolo;
  pantallas.clave.classList.add("activa");
}

function iniciarEnsayos(){
  pantallas.clave.classList.remove("activa");
  pantallas.ensayos.classList.add("activa");
  cargarEnsayo();
}

function cargarEnsayo(){
  const ensayo = claves[claveIndex].ensayos[ensayoIndex];
  ensayoInfo.textContent = `Ensayo ${ensayoIndex+1} de 3`;
  muestra.textContent = ensayo.muestra;
  feedback.textContent = "—";
  opcionesDiv.innerHTML = "";

  const opciones = ["🌙","🐶","🍎","■","▲","★"];
  opciones.sort(() => Math.random()-0.5).slice(0,3).forEach(op => {
    const div = document.createElement("div");
    div.className = "tarjeta";
    div.textContent = op;
    div.onclick = () => evaluar(op);
    opcionesDiv.appendChild(div);
  });
}

function evaluar(opcion){
  const ensayo = claves[claveIndex].ensayos[ensayoIndex];
  feedback.textContent = ensayo.correctos.includes(opcion) ? "✔" : "❌";

  setTimeout(() => {
    ensayoIndex++;
    if (ensayoIndex >= 3) {
      claveIndex++;
      ensayoIndex = 0;
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
  }, 800);
}
