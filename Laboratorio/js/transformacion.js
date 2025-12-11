/* ======================================================
   FASE 1 — APRENDIZAJE RELACIONAL
====================================================== */

const simbolos = ["⟟", "⚶", "⋔"];
const reglas = [
  "Elige el MÁS PEQUEÑO",
  "Elige el MEDIANO",
  "Elige el MÁS GRANDE"
];

let indice = 0;

const area = document.getElementById("area-estimulos");
const btnMostrar = document.getElementById("btnMostrarEstimulo");
const btnSiguienteF1 = document.getElementById("btnSiguienteF1");
const resumenF1 = document.getElementById("resumenF1");

btnMostrar.addEventListener("click", () => {
  area.innerHTML = `
    <div class="simbolo-mostrado">${simbolos[indice]}</div>
    <p>${reglas[indice]}</p>
  `;
  btnSiguienteF1.classList.remove("oculto");
});

btnSiguienteF1.addEventListener("click", () => {
  indice++;
  if (indice < simbolos.length) {
    area.innerHTML = `
      <div class="simbolo-mostrado">${simbolos[indice]}</div>
      <p>${reglas[indice]}</p>
    `;
  } else {
    area.innerHTML = "";
    btnMostrar.classList.add("oculto");
    btnSiguienteF1.classList.add("oculto");
    resumenF1.classList.remove("oculto");
  }
});


/* PASAR A FASE 2 */
document.getElementById("btnIrFase2").addEventListener("click", () => {
  document.getElementById("fase1").classList.add("oculto");
  document.getElementById("fase2").classList.remove("oculto");
});


/* ======================================================
   FASE 2 — ESTÍMULO AVERSIVO
====================================================== */

const simboloS3 = document.getElementById("simboloS3");
const btnAversivo = document.getElementById("btnAplicarAversivo");
const resumenF2 = document.getElementById("resumenF2");

btnAversivo.addEventListener("click", () => {
  simboloS3.classList.add("flash");
  resumenF2.classList.remove("oculto");
});


/* PASAR A FASE 3 */
document.getElementById("btnIrFase3").addEventListener("click", () => {
  document.getElementById("fase2").classList.add("oculto");
  document.getElementById("fase3").classList.remove("oculto");
});


/* ======================================================
   FASE 3 — TRANSFORMACIÓN DE FUNCIONES
====================================================== */

const resultados = document.getElementById("resultadosF3");

document.getElementById("btnMostrarResultados").addEventListener("click", () => {
  resultados.classList.remove("oculto");
});


/* REINICIAR TODO */
document.getElementById("btnReiniciar").addEventListener("click", () => {
  window.location.reload();
});
