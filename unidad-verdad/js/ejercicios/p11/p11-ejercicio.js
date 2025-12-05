/* ============================================================
   EJERCICIO P11 · EVALUADOR DE RUTAS CLÍNICAS
=============================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const avatar = document.getElementById("p11-avatar");
  const estado = document.getElementById("p11-estado");
  const scoreSpan = document.getElementById("p11-score");
  const historial = document.getElementById("p11-historial");
  const feedback = document.getElementById("p11-feedback");

  const rutaNarrativa = document.getElementById("ruta-narrativa");
  const rutaInterna = document.getElementById("ruta-interna");
  const rutaAct = document.getElementById("ruta-act");

  const botones = document.querySelectorAll(".p11-opcion");
  const resetBtn = document.getElementById("p11-reset");

  let score = 0;
  let pasosCompletados = 0;

  function registrar(ruta, texto) {
    const item = document.createElement("div");
    item.textContent = `${pasosCompletados}. ${texto}`;
    historial.appendChild(item);
  }

  function actualizarVisual(ruta) {
    // Reiniciar estilos
    rutaNarrativa.style.border = "1px solid rgba(8,50,58,0.18)";
    rutaInterna.style.border = "1px solid rgba(8,50,58,0.18)";
    rutaAct.style.border = "1px solid rgba(8,50,58,0.18)";

    if (ruta === "narrativa") {
      rutaNarrativa.style.border = "2px solid #0066ff";
      avatar.textContent = "😟";
      estado.textContent = "La ruta narrativa describe, pero no transforma.";
      score -= 10;
    }

    if (ruta === "interna") {
      rutaInterna.style.border = "2px solid #800080";
      avatar.textContent = "😖";
      estado.textContent = "La explicación interna estanca el sistema clínico.";
      score -= 20;
    }

    if (ruta === "act") {
      rutaAct.style.border = "2px solid #f3c400";
      avatar.textContent = "🙂";
      estado.textContent = "Intervención pragmática: abre posibilidad de acción valiosa.";
      score += 25;
    }

    if (score < 0) score = 0;
    if (score > 100) score = 100;

    scoreSpan.textContent = score;
  }

  function resultadoFinal() {
    if (score >= 80) {
      feedback.textContent =
        "Has utilizado la verdad funcional: tus intervenciones permitieron avanzar valor y flexibilidad.";
    } else if (score >= 50) {
      feedback.textContent =
        "Buena dirección, pero aún mezclas intervenciones que no producen cambio funcional.";
    } else {
      feedback.textContent =
        "La mayoría de tus intervenciones no generaron acción clínica. Recuerda: la verdad es lo que funciona.";
    }
  }

  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      const ruta = btn.dataset.ruta;
      const texto = btn.textContent.trim();

      pasosCompletados++;
      registrar(ruta, texto);
      actualizarVisual(ruta);

      if (pasosCompletados === 4) resultadoFinal();
    });
  });

  /* -----------------------
     REINICIAR
  ------------------------*/

  resetBtn.addEventListener("click", () => {
    score = 0;
    pasosCompletados = 0;
    avatar.textContent = "😐";
    estado.textContent = "Selecciona una intervención clínica.";
    historial.innerHTML = "";
    scoreSpan.textContent = "0";
    rutaNarrativa.style.border = "1px solid rgba(8,50,58,0.18)";
    rutaInterna.style.border = "1px solid rgba(8,50,58,0.18)";
    rutaAct.style.border = "1px solid rgba(8,50,58,0.18)";
    feedback.textContent = "Selecciona una intervención para comenzar.";
  });

});
