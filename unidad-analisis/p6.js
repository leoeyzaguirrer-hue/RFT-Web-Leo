/* ============================================================
   p6.js — Interacciones básicas de la Pantalla 6
   — Drag/click para mover tarjetas
   — Selección de clase funcional
   — Acordeones
============================================================ */

/* ============================================================
   ACORDEONES
============================================================ */
const accHeaders = document.querySelectorAll(".ua-acc-header");

accHeaders.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");

    const panel = btn.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});

/* ============================================================
   TARJETAS DEL CASO (click para mover a contenedores)
============================================================ */

const tags = document.querySelectorAll(".ua-tag");
let selectedTag = null;

// Seleccionar una tarjeta
tags.forEach(tag => {
  tag.addEventListener("click", () => {
    // Si ya está colocada, no se puede volver a seleccionar
    if (tag.classList.contains("ua-tag-placed")) return;

    // Activar visualmente
    tags.forEach(t => t.classList.remove("active"));
    tag.classList.add("active");
    selectedTag = tag;
  });
});

// Contenedores
const boxes = document.querySelectorAll(".ua-container-box .ua-box-body");

// Colocar tarjeta dentro del contenedor seleccionado
boxes.forEach(box => {
  box.addEventListener("click", () => {
    if (!selectedTag) return;

    // Mover tarjeta al contenedor
    const clone = selectedTag.cloneNode(true);
    clone.classList.add("ua-tag-placed");
    clone.classList.remove("active");
    box.appendChild(clone);

    // Desactivar tarjeta original
    selectedTag.classList.add("ua-tag-placed");
    selectedTag.style.opacity = "0.4";
    selectedTag.style.pointerEvents = "none";

    selectedTag = null;
    tags.forEach(t => t.classList.remove("active"));
  });
});

/* ============================================================
   SELECCIÓN DE CLASE FUNCIONAL
============================================================ */

const choices = document.querySelectorAll(".ua-choice");
const feedback = document.getElementById("ua-choice-feedback");

choices.forEach(choice => {
  choice.addEventListener("click", () => {

    // Reset visual
    choices.forEach(c => c.classList.remove("ua-choice-active"));

    // Activar seleccionado
    choice.classList.add("ua-choice-active");

    // Feedback textual
    if (choice.dataset.choice === "evitacion") {
      feedback.textContent =
        "✔ Esta es la opción que mejor refleja la función del patrón. “Evitación de interacción social”.";
    } else if (choice.dataset.choice === "ansioso") {
      feedback.textContent =
        "Esta etiqueta describe un síntoma, pero no explica la función del patrón.";
    } else {
      feedback.textContent =
        "Una categoría diagnóstica no es funcional para intervenir este episodio.";
    }
  });
});
