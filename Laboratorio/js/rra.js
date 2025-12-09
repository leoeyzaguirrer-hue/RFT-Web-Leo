const claves = [
  {
    nombre: "ES LO MISMO QUE",
    ensayos: [
      { muestra: "LUNA", correctos: ["LUNA"] },
      { muestra: "PERRO", correctos: ["PERRO"] },
      { muestra: "MANZANA", correctos: ["MANZANA"] }
    ]
  },
  {
    nombre: "ES OPUESTO A",
    ensayos: [
      { muestra: "LUNA", correctos: ["MANZANA"] },
      { muestra: "MANZANA", correctos: ["LUNA"] },
      { muestra: "PERRO", correctos: ["PERRO"] }
    ]
  },
  {
    nombre: "ES MÁS GRANDE QUE",
    ensayos: [
      { muestra: "MANZANA", correctos: ["PERRO", "LUNA"] },
      { muestra: "PERRO", correctos: ["LUNA"] },
      { muestra: "LUNA", correctos: [] }
    ]
  },
  {
    nombre: "VIENE ANTES QUE",
    ensayos: [
      { muestra: "PERRO", correctos: ["MANZANA"] },
      { muestra: "LUNA", correctos: ["PERRO"] },
      { muestra: "MANZANA", correctos: [] }
    ]
  }
];

let claveIndex = 0;
let ensayoIndex = 0;

const titulo = document.getElementById("tituloClave");
const ensayoInfo = document.getElementById("ensayoInfo");
const muestra = document.getElementById("muestra");
const feedback = document.getElementById("feedback");
const tarjetas = document.querySelectorAll(".tarjeta");
const teoriaFinal = document.getElementById("teoriaFinal");

function cargarEnsayo() {
  const clave = claves[claveIndex];
  const ensayo = clave.ensayos[ensayoIndex];

  titulo.textContent = "Clave Relacional: " + clave.nombre;
  ensayoInfo.textContent = `Ensayo ${ensayoIndex + 1} de 3`;
  muestra.textContent = ensayo.muestra;
  feedback.textContent = "—";
}

tarjetas.forEach(tarjeta => {
  tarjeta.addEventListener("click", () => {
    const clave = claves[claveIndex];
    const ensayo = clave.ensayos[ensayoIndex];

    if (ensayo.correctos.includes(tarjeta.dataset.id)) {
      feedback.textContent = "✔";
    } else {
      feedback.textContent = "❌";
    }

    setTimeout(() => {
      ensayoIndex++;

      if (ensayoIndex >= 3) {
        claveIndex++;
        ensayoIndex = 0;
      }

      if (claveIndex >= claves.length) {
        titulo.textContent = "FASE FINALIZADA";
        ensayoInfo.textContent = "";
        muestra.style.display = "none";
        document.querySelector(".tarjetas").style.display = "none";
        teoriaFinal.classList.remove("oculto");
      } else {
        cargarEnsayo();
      }
    }, 700);
  });
});

cargarEnsayo();
