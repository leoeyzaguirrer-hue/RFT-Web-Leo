/* ============================================================
   EJERCICIO P10 · LABORATORIO DE TRANSFORMACIÓN DE FUNCIONES
=============================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".p10-card");
  const avatar = document.getElementById("p10-avatar");
  const red = document.getElementById("p10-red");
  const estado = document.getElementById("p10-estado");
  const feedback = document.getElementById("p10-feedback");
  const aplicarBtn = document.getElementById("p10-aplicar");
  const resetBtn = document.getElementById("p10-reset");
  const scoreSpan = document.getElementById("p10-score");
  const historial = document.getElementById("p10-historial");

  let seleccionActual = null;
  let score = 0;
  let intervenciones = 0;

  /* -----------------------
     DRAG & DROP
  ------------------------*/

  cards.forEach(card => {
    card.addEventListener("dragstart", () => {
      seleccionActual = card;
      feedback.textContent = "Intervención seleccionada. Presiona “Aplicar”.";
    });
  });

  document.getElementById("p10-lab-area").addEventListener("dragover", e => {
    e.preventDefault();
  });

  document.getElementById("p10-lab-area").addEventListener("drop", e => {
    e.preventDefault();
  });

  /* -----------------------
     FUNCIÓN CLÍNICA
  ------------------------*/

  function aplicarIntervencion() {
    if (!seleccionActual) {
      feedback.textContent = "Primero arrastra una intervención hacia el consultante.";
      return;
    }

    const tipo = seleccionActual.dataset.funcion;
    intervenciones++;

    // Resultado de cada función
    if (tipo === "fusion") {
      avatar.textContent = "😖";
      red.style.background = "rgba(255,0,0,0.35)";
      estado.textContent = "La regla literal dirige al consultante hacia evitación.";
      score -= 20;
    }

    if (tipo === "analisis") {
      avatar.textContent = "🧊";
      red.style.background = "rgba(128,128,128,0.35)";
      estado.textContent = "El análisis improductivo estanca el movimiento.";
      score -= 10;
    }

    if (tipo === "defusion") {
      avatar.textContent = "🙂";
      red.style.background = "rgba(0,128,0,0.35)";
      estado.textContent = "La defusión abre espacio para acción flexible.";
      score += 20;
    }

    if (tipo === "valor") {
      avatar.textContent = "✨";
      red.style.background = "rgba(255,215,0,0.35)";
      estado.textContent = "La metáfora orienta hacia acción valiosa.";
      score += 25;
    }

    // Registrar historial
    const item = document.createElement("div");
    item.textContent = `${intervenciones}. ${seleccionActual.textContent.trim()}`;
    historial.appendChild(item);

    // Calcular puntaje
    if (score < 0) score = 0;
    if (score > 100) score = 100;
    scoreSpan.textContent = score;

    seleccionActual = null;

    if (intervenciones >= 4) {
      finalizarProceso();
    }
  }

  aplicarBtn.addEventListener("click", aplicarIntervencion);

  /* -----------------------
     RESULTADO FINAL
  ------------------------*/

  function finalizarProceso() {
    if (score >= 80) {
      feedback.textContent =
        "Has diseñado una intervención coherente con ACT: tu lenguaje reorganiza funciones hacia acción valiosa.";
    } else if (score >= 40) {
      feedback.textContent =
        "Buena dirección, pero tu intervención mezcla momentos de fusión con ajustes funcionales.";
    } else {
      feedback.textContent =
        "La mayoría de tus intervenciones refuerzan evitación o análisis improductivo.";
    }
  }

  /* -----------------------
     REINICIO
  ------------------------*/

  resetBtn.addEventListener("click", () => {
    avatar.textContent = "😐";
    red.style.background = "transparent";
    estado.textContent = "Selecciona y aplica una intervención.";
    feedback.textContent = "Arrastra una tarjeta hacia el consultante y luego presiona “Aplicar”.";
    historial.innerHTML = "";
    score = 0;
    intervenciones = 0;
    scoreSpan.textContent = "0";
    seleccionActual = null;
  });

});
