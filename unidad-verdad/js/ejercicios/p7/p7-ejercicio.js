/* ============================================================
   EJERCICIO BLOQUE 4 — TALLER DE INTERVENCIÓN PRAGMÁTICA
=============================================================== */

const svg = document.getElementById("p7-svg-conexiones");
const medidor = document.getElementById("p7-medidor");
const medidorValor = document.getElementById("p7-medidor-valor");
const feedbackFinal = document.getElementById("p7-feedback-final");
const btnEval = document.getElementById("p7-btn-evaluar");
const btnReset = document.getElementById("p7-btn-reset");

let conexiones = []; // guarda {c, i, tipo}

/* Mapeo conceptual → intervención correcta */
const mapaCorrecto = {
  c1: "i1", // alivio inmediato → AF en vivo
  c2: "i2", // valores → clarificación
  c3: "i3"  // fusión → defusión
};

const mapaParcial = {
  c1: ["i4"],   // exposición a veces es útil
  c2: ["i4"],   // exposición ayuda pero no es la base
  c3: ["i5"]    // registro ayuda pero no cambia función
};

/* Selección de conceptualización */
document.querySelectorAll(".p7-item.concepto").forEach(c => {
  c.addEventListener("click", () => {
    c.classList.toggle("p7-select");
    if (document.querySelectorAll(".p7-select").length > 1) {
      document.querySelectorAll(".p7-select").forEach(s => s.classList.remove("p7-select"));
    }
  });
});

/* Click en intervenciones */
document.querySelectorAll(".p7-item.intervencion").forEach(i => {
  i.addEventListener("click", () => {
    const seleccionado = document.querySelector(".p7-select");
    if (!seleccionado) return;

    conectar(seleccionado, i);
    seleccionado.classList.remove("p7-select");
  });
});

/* Dibujar línea */
function conectar(c, i) {
  const cRect = c.getBoundingClientRect();
  const iRect = i.getBoundingClientRect();
  const container = svg.getBoundingClientRect();

  const x1 = cRect.right - container.left;
  const y1 = cRect.top + cRect.height / 2 - container.top;

  const x2 = iRect.left - container.left;
  const y2 = iRect.top + iRect.height / 2 - container.top;

  let tipo = "incorrecta";
  if (mapaCorrecto[c.dataset.id] === i.dataset.id) tipo = "correcta";
  else if (mapaParcial[c.dataset.id]?.includes(i.dataset.id)) tipo = "parcial";

  const linea = document.createElementNS("http://www.w3.org/2000/svg", "line");
  linea.setAttribute("x1", x1);
  linea.setAttribute("y1", y1);
  linea.setAttribute("x2", x2);
  linea.setAttribute("y2", y2);

  if (tipo === "correcta") linea.setAttribute("stroke", "#fdbf12");
  else if (tipo === "parcial") linea.setAttribute("stroke", "#e6c463");
  else linea.setAttribute("stroke", "red");

  linea.setAttribute("stroke-width", 4);
  svg.appendChild(linea);

  conexiones.push({ c: c.dataset.id, i: i.dataset.id, tipo });

  actualizarMedidor();
}

/* Medidor */
function actualizarMedidor() {
  let score = 0;

  conexiones.forEach(c => {
    if (c.tipo === "correcta") score += 34;
    else if (c.tipo === "parcial") score += 12;
  });

  if (score > 100) score = 100;

  medidor.style.height = score + "%";
  medidorValor.innerText = score + "%";
}

/* Evaluación */
btnEval.addEventListener("click", () => {
  feedbackFinal.style.display = "block";

  let c = conexiones.filter(x => x.tipo === "correcta").length;
  let p = conexiones.filter(x => x.tipo === "parcial").length;
  let w = conexiones.filter(x => x.tipo === "incorrecta").length;

  if (c >= 2 && w === 0) {
    feedbackFinal.innerHTML =
      "<strong>Excelente.</strong> Transformaste teoría en acción útil. ✨";
  } else if (c >= 1 || p >= 1) {
    feedbackFinal.innerHTML =
      "Varias conexiones fueron útiles, pero podés afinar la relación entre conceptualización e intervención.";
  } else {
    feedbackFinal.innerHTML =
      "Varias conceptualizaciones no guiaron acciones funcionales. Recordá que la utilidad clínica determina la verdad pragmática.";
  }
});

/* Reinicio */
btnReset.addEventListener("click", () => {
  conexiones = [];
  svg.innerHTML = "";
  medidor.style.height = "0%";
  medidorValor.innerText = "0%";
  feedbackFinal.style.display = "none";
});
