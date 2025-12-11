/* ======================================
   ESTÍMULOS SVG PARA FASE 1
   9 símbolos: 3 pequeños, 3 medianos, 3 grandes
====================================== */

function crearSVGDisco() {
  // Disco negro tipo “pac-man” simple con círculo central
  return `
    <svg viewBox="0 0 120 120" width="80" height="80">
      <circle cx="60" cy="60" r="50" fill="#111827"/>
      <circle cx="60" cy="60" r="18" fill="#f9fafb"/>
    </svg>
  `;
}

/* Utilidad para mezclar arrays */
function barajar(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ======================================
   FASE 1
====================================== */
const grid = document.getElementById("gridEstimulos");
const btnNuevoEnsayo = document.getElementById("btnNuevoEnsayo");
const btnSiguienteContexto = document.getElementById("btnSiguienteContexto");
const mensajeF1 = document.getElementById("mensajeF1");
const simboloContexto = document.getElementById("simboloContexto");
const tituloContexto = document.getElementById("tituloContexto");
const textoContexto = document.getElementById("textoContexto");
const progresoContexto = document.getElementById("progresoContexto");
const resumenF1 = document.getElementById("resumenF1");

const contextos = [
  {
    nombre: "Contexto A · Elegir el más pequeño",
    regla: "En este contexto, los participantes debían elegir SIEMPRE el estímulo más pequeño.",
    targetSize: "small"
  },
  {
    nombre: "Contexto B · Elegir el mediano",
    regla: "En este contexto, debían elegir SIEMPRE el estímulo mediano.",
    targetSize: "medium"
  },
  {
    nombre: "Contexto C · Elegir el más grande",
    regla: "En este contexto, debían elegir SIEMPRE el estímulo más grande.",
    targetSize: "large"
  }
];

let indiceContexto = 0;
let ensayoResuelto = false;

function dibujarSimboloContexto(ind) {
  const letras = ["A", "B", "C"];
  simboloContexto.innerHTML = `
    ${letras[ind]}
    <span></span>
    <span></span>
    <span></span>
  `;
}

function nuevoEnsayo() {
  ensayoResuelto = false;
  btnSiguienteContexto.disabled = true;
  mensajeF1.textContent = "";

  const ctx = contextos[indiceContexto];
  tituloContexto.textContent = ctx.nombre;
  textoContexto.textContent =
    "Haz clic en el estímulo que crees que corresponda a la regla de este contexto.";
  progresoContexto.textContent = `Contexto ${indiceContexto + 1} de 3`;

  dibujarSimboloContexto(indiceContexto);

  // 3 pequeños, 3 medianos, 3 grandes
  const estimulos = [];
  for (let i = 0; i < 3; i++) estimulos.push({ size: "small" });
  for (let i = 0; i < 3; i++) estimulos.push({ size: "medium" });
  for (let i = 0; i < 3; i++) estimulos.push({ size: "large" });

  const mezclados = barajar(estimulos);

  grid.innerHTML = "";
  mezclados.forEach((e, idx) => {
    const btn = document.createElement("button");
    btn.className = "btn-estimulo";
    btn.dataset.size = e.size;
    btn.innerHTML = crearSVGDisco();
    btn.addEventListener("click", () => manejarClickEstimulo(btn, ctx.targetSize));
    grid.appendChild(btn);
  });
}

function manejarClickEstimulo(boton, sizeCorrecta) {
  if (ensayoResuelto) return;

  const botones = Array.from(document.querySelectorAll(".btn-estimulo"));
  botones.forEach(b => b.disabled = true);

  const correcto = boton.dataset.size === sizeCorrecta;
  if (correcto) {
    boton.classList.add("correcto");
    mensajeF1.textContent = "Correcto. Ese estímulo cumple la regla de este contexto.";
  } else {
    boton.classList.add("incorrecto");
    mensajeF1.textContent = "En este contexto, esa opción no era la correcta. Observa la flecha.";
  }

  // marcar el estímulo correcto con flecha
  const btnCorrecto = botones.find(b => b.dataset.size === sizeCorrecta);
  if (btnCorrecto && !btnCorrecto.querySelector(".flecha")) {
    const flecha = document.createElement("div");
    flecha.className = "flecha";
    flecha.textContent = "⬆";
    btnCorrecto.appendChild(flecha);
    btnCorrecto.classList.add("correcto");
  }

  const ctx = contextos[indiceContexto];
  textoContexto.textContent = ctx.regla;
  ensayoResuelto = true;
  btnSiguienteContexto.disabled = false;
}

btnNuevoEnsayo.addEventListener("click", nuevoEnsayo);

btnSiguienteContexto.addEventListener("click", () => {
  indiceContexto++;
  if (indiceContexto < contextos.length) {
    nuevoEnsayo();
  } else {
    // terminó fase 1
    grid.innerHTML = "";
    mensajeF1.textContent = "";
    resumenF1.classList.remove("oculto");
    btnNuevoEnsayo.disabled = true;
    btnSiguienteContexto.disabled = true;
  }
});

// inicializar
nuevoEnsayo();

/* Pasar a Fase 2 */
document.getElementById("btnIrFase2").addEventListener("click", () => {
  document.getElementById("fase1").classList.remove("fase-activa");
  document.getElementById("fase1").classList.add("oculto");
  document.getElementById("fase2").classList.add("fase-activa");
});

/* ======================================
   FASE 2
====================================== */
const estimuloShock = document.getElementById("estimuloShock");
const btnAplicarShock = document.getElementById("btnAplicarShock");
const resumenF2 = document.getElementById("resumenF2");
const textoFase2 = document.getElementById("textoFase2");

btnAplicarShock.addEventListener("click", () => {
  estimuloShock.classList.add("shock");
  textoFase2.textContent =
    "Este estímulo queda asociado al evento aversivo. En el estudio real se midió la respuesta fisiológica.";
  resumenF2.classList.remove("oculto");
});

/* Pasar a Fase 3 */
document.getElementById("btnIrFase3").addEventListener("click", () => {
  document.getElementById("fase2").classList.remove("fase-activa");
  document.getElementById("fase2").classList.add("oculto");
  document.getElementById("fase3").classList.add("fase-activa");
});

/* ======================================
   FASE 3
====================================== */
const btnMostrarResultados = document.getElementById("btnMostrarResultados");
const resultadosF3 = document.getElementById("resultadosF3");
const btnReiniciar = document.getElementById("btnReiniciar");

btnMostrarResultados.addEventListener("click", () => {
  resultadosF3.classList.remove("oculto");
});

btnReiniciar.addEventListener("click", () => {
  window.location.reload();
});
