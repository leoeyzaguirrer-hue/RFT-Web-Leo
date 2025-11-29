// p3.js — Interactividad Lección 3

document.addEventListener("DOMContentLoaded", () => {

  // Fade in
  setTimeout(() => {
    document.querySelectorAll(".ua-fade-in").forEach(el => {
      el.classList.add("ua-visible");
    });
  }, 140);

  /* =====================================
     DRAG & DROP — Clase funcional
  ===================================== */

  const tokens = document.querySelectorAll(".ua-drag-token");
  const dropZone = document.getElementById("drop-evitacion");

  let dragged = null;

  tokens.forEach(token => {
    token.addEventListener("dragstart", e => {
      dragged = token;
      token.style.opacity = "0.6";
    });

    token.addEventListener("dragend", () => {
      dragged.style.opacity = "1";
      dragged = null;
    });
  });

  dropZone.addEventListener("dragover", e => {
    e.preventDefault();
    dropZone.classList.add("ua-drop-hover");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("ua-drop-hover");
  });

  dropZone.addEventListener("drop", () => {
    dropZone.classList.remove("ua-drop-hover");

    if (!dragged) return;

    const clase = dragged.dataset.class;

    // Correctos = evitar
    if (clase === "evitar") {
      dropZone.appendChild(dragged);
      dropZone.classList.add("ua-drop-correct");
      dropZone.classList.remove("ua-drop-wrong");
    } else {
      dropZone.classList.add("ua-drop-wrong");
      dropZone.classList.remove("ua-drop-correct");
    }
  });

});
