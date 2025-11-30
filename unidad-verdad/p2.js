/* ============================================================
   p2.js — Interacciones para Lección 1
============================================================ */

/* ============================================================
   EJERCICIO 1 — OPCIONES
============================================================ */

const options = document.querySelectorAll(".v-option");
const feedbackEl = document.getElementById("v-feedback");

options.forEach(option => {
  option.addEventListener("click", () => {
    const correct = option.dataset.correct === "true";

    if (correct) {
      feedbackEl.textContent =
        "Correcto: desde un criterio pragmático, el mapa más verdadero es el que te permite llegar al destino.";
      feedbackEl.style.color = "#FDBF12";
    } else {
      feedbackEl.textContent =
        "Incorrecto: lo estético no define la verdad funcional.";
      feedbackEl.style.color = "#ff6b6b";
    }
  });
});

/* ============================================================
   DRAG & DROP
============================================================ */

const draggables = document.querySelectorAll(".v-drag");
const dropZones = document.querySelectorAll(".v-drop-zone");
const dragFeedback = document.getElementById("v-drag-feedback");

let draggedItem = null;

draggables.forEach(item => {
  item.addEventListener("dragstart", () => {
    draggedItem = item;
    setTimeout(() => item.classList.add("hide"), 0);
  });

  item.addEventListener("dragend", () => {
    item.classList.remove("hide");
    draggedItem = null;
  });
});

dropZones.forEach(zone => {
  zone.addEventListener("dragover", e => {
    e.preventDefault();
    zone.classList.add("drag-over");
  });

  zone.addEventListener("dragleave", () => {
    zone.classList.remove("drag-over");
  });

  zone.addEventListener("drop", () => {
    zone.classList.remove("drag-over");
    if (draggedItem) {
      zone.appendChild(draggedItem);
      validarClasificacion();
    }
  });
});

function validarClasificacion() {
  const zonaRazon = document.getElementById("zona-razon");
  const zonaFunciona = document.getElementById("zona-funciona");

  const razonItems = [...zonaRazon.querySelectorAll(".v-drag")].map(x =>
    x.textContent.trim()
  );

  const funcionaItems = [...zonaFunciona.querySelectorAll(".v-drag")].map(x =>
    x.textContent.trim()
  );

  const correctFunciona = [
    "El consultante se duerme 30 min antes",
    "El niño resuelve 3 ejercicios solo"
  ];

  const correctRazon = [
    "El folleto explica la fisiología del sueño",
    "El padre repite la regla de tres"
  ];

  const okFunciona = correctFunciona.every(x => funcionaItems.includes(x));
  const okRazon = correctRazon.every(x => razonItems.includes(x));

  if (okFunciona && okRazon) {
    dragFeedback.textContent =
      "Excelente: este es el tipo de ‘verdad’ que importa para un contextualista.";
    dragFeedback.style.color = "#FDBF12";
  } else {
    dragFeedback.textContent =
      "Revisa: recuerda que ‘tener razón’ no siempre implica que algo funcione.";
    dragFeedback.style.color = "#ff6b6b";
  }
}
