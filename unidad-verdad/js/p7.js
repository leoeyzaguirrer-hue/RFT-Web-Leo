/* ============================================================
   P7 · Unidad de Verdad — Interacción Final del Módulo
   - Selección interactiva
   - Retroalimentación personalizada
   - Cierre y transición
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const zona = document.getElementById("zona-interactiva");

  zona.innerHTML = `
    <div class="quiz-opciones final-opciones">

      <button class="quiz-btn final-btn" data-correct="false">
        “La verdad es lo que corresponde con estados internos no observables.”
      </button>

      <button class="quiz-btn final-btn" data-correct="true">
        “La verdad es aquello que permite predecir e influir efectivamente la conducta.”
      </button>

      <button class="quiz-btn final-btn" data-correct="false">
        “La verdad es lo que parece coherente dentro de una teoría.”
      </button>

    </div>

    <div id="final-resultado" class="quiz-resultado" style="margin-top:15px;"></div>
  `;

  iniciarFinalP7();
});


/* ============================================================
   1. Interacción Final — Selección + Mensaje Personalizado
============================================================ */

function iniciarFinalP7() {
  const botones = document.querySelectorAll(".final-btn");
  const salida = document.getElementById("final-resultado");

  botones.forEach(btn => {

    btn.addEventListener("click", () => {
      const correcto = btn.dataset.correct === "true";

      if (correcto) {
        salida.innerHTML = `
          ✔ <b>Correcto</b>.  
          Has captado la esencia del contextualismo funcional:  
          <br><br>
          <i>la verdad es una propiedad pragmática, definida por la utilidad
          para predecir e influir la conducta en un contexto dado.</i>
          <br><br>
          Estás listo para avanzar a la <b>Unidad de Análisis</b>.
        `;
        salida.style.color = "#0a8f32";

      } else {
        salida.innerHTML = `
          ✘ <b>No del todo</b>.  
          Esa afirmación describe criterios tradicionales que el contextualismo
          rechaza porque no guían intervención ni predicción.
          <br><br>
          Revisa cómo la noción de verdad se redefine funcionalmente antes de continuar.
        `;
        salida.style.color = "#b30000";
      }
    });

  });
}

