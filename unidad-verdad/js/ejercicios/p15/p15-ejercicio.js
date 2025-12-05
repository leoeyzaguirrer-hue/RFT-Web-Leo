/* ============================================================
   EJERCICIO P15 · ÁRBOL DE DECISIONES PRAGMÁTICAS
=============================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const avatar = document.getElementById("p15-avatar");
  const feedback = document.getElementById("p15-feedback");

  const nodos = document.querySelectorAll(".p15-nodo");
  const finales = {
    malo: document.getElementById("p15-final-malo"),
    bueno: document.getElementById("p15-final-bueno")
  };

  const resetBtn = document.getElementById("p15-reset");

  /* Ocultar todo excepto el nodo 1 */
  function resetArbol() {
    nodos.forEach(n => n.classList.add("oculto"));
    finales.malo.classList.add("oculto");
    finales.bueno.classList.add("oculto");

    document.getElementById("p15-n1").classList.remove("oculto");

    avatar.textContent = "🙂";
    avatar.style.transform = "translateX(0)";
    feedback.textContent =
      "Elige un camino clínico. Observa qué ramas florecen.";
  }

  resetArbol();

  /* ------------------------
     MANEJO DE DECISIONES
  ------------------------- */

  document.querySelectorAll(".p15-opcion").forEach(btn => {
    btn.addEventListener("click", () => {

      const tipo = btn.dataset.tipo;
      const next = btn.dataset.next;

      /* Marcar rama buena o mala */
      const nodoPadre = btn.closest(".p15-nodo");

      if (tipo === "buena") {
        nodoPadre.classList.add("bueno");
        avatar.textContent = "✨";
        feedback.textContent = "Esta decisión genera movimiento clínico.";
      }

      if (tipo === "mala") {
        nodoPadre.classList.add("malo");
        avatar.textContent = "😟";
        feedback.textContent = "Esta decisión no orienta acción clara.";
      }

      if (tipo === "volver") {
        resetArbol();
        return;
      }

      /* Esconder todos los nodos y mostrar el siguiente */
      nodos.forEach(n => n.classList.add("oculto"));
      if (document.getElementById(`p15-${next}`)) {
        document.getElementById(`p15-${next}`).classList.remove("oculto");
      }

      /* Final malo */
      if (next === "final-malo") {
        finales.malo.classList.remove("oculto");
        avatar.textContent = "😔";
        feedback.textContent =
          "Revisa qué decisiones no generaron consecuencias claras.";
      }

      /* Final bueno */
      if (next === "final-bueno") {
        finales.bueno.classList.remove("oculto");
        avatar.textContent = "😄";
        feedback.textContent =
          "Has usado la verdad funcional para tomar decisiones clínicas.";
      }
    });
  });

  /* REINICIO */
  resetBtn.addEventListener("click", resetArbol);

});
