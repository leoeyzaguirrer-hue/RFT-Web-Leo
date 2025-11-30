/* ============================================================
   p2.js — Interacciones para Lección 1
   Unidad 3: Verdad como lo que Funciona
   Funciones incluídas:
   1. Ejercicio de selección (mapa)
   2. Actividad Drag & Drop
============================================================ */

/* ============================================================
   1. EJERCICIO DE SELECCIÓN
============================================================ */

const options = document.querySelectorAll(".v-option");
const feedbackEl = document.getElementById("v-feedback");

options.forEach(option => {
    option.addEventListener("click", () => {
        const correct = option.getAttribute("data-correct") === "true";

        if (correct) {
            feedbackEl.textContent =
                "Correcto: desde un criterio pragmático, el mapa más verdadero es el que te permite llegar al destino.";
            feedbackEl.style.color = "#FDBF12";
        } else {
            feedbackEl.textContent =
                "No exactamente. Bonito no es lo mismo que útil para un objetivo definido.";
            feedbackEl.style.color = "#ff6b6b";
        }
    });
});


/* ============================================================
   2. DRAG & DROP
============================================================ */

const draggables = document.querySelectorAll(".v-drag");
const dropZones = document.querySelectorAll(".v-drop-zone");
const dragFeedback = document.getElementById("v-drag-feedback");

let draggedItem = null;

// Cuando comienza a arrastrar
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

// Zonas de drop
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

/* ============================================================
   Validación final del ejercicio
============================================================ */

function validarClasificacion() {
    const zonaRazon = document.getElementById("zona-razon");
    const zonaFunciona = document.getElementById("zona-funciona");

    const razonItems = Array.from(zonaRazon.querySelectorAll(".v-drag"))
        .map(i => i.textContent.trim());

    const funcionaItems = Array.from(zonaFunciona.querySelectorAll(".v-drag"))
        .map(i => i.textContent.trim());

    // Correctos según la teoría contextual-funcional
    const correctFunciona = [
        "El consultante se duerme 30 min antes",
        "El niño resuelve 3 ejercicios solo"
    ];

    const correctRazon = [
        "El folleto explica la fisiología del sueño",
        "El padre repite la regla de tres"
    ];

    const okFunciona = correctFunciona.every(txt => funcionaItems.includes(txt));
    const okRazon = correctRazon.every(txt => razonItems.includes(txt));

    if (okFunciona && okRazon) {
        dragFeedback.textContent =
            "Excelente: este es el tipo de ‘verdad’ que nos importa como contextualistas.";
        dragFeedback.style.color = "#FDBF12";
    } else {
        dragFeedback.textContent =
            "Revisa: recuerda que ‘tener razón’ no siempre implica que algo funcione.";
        dragFeedback.style.color = "#ff6b6b";
    }
}
