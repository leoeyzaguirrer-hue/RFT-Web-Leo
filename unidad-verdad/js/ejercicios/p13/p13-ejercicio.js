/* ============================================================
   EJERCICIO P13 · ARENA DE FORMULACIONES
=============================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const botonesDecision = document.querySelectorAll(".p13-btn-dec");
  const botonesFinales = document.querySelectorAll(".p13-btn-final");

  const scoreSpan = document.getElementById("p13-score");
  const barInner = document.getElementById("p13-bar-inner");
  const arena = document.getElementById("p13-arena");
  const estado = document.getElementById("p13-estado");
  const historial = document.getElementById("p13-historial-lista");
  const nuevoDato = document.getElementById("p13-nuevo-dato");
  const feedback = document.getElementById("p13-feedback");
  const resetBtn = document.getElementById("p13-reset");

  let score = 0;
  let decisionesIniciales = { F1: false, F2: false, F3: false };
  let rondaFinalRealizada = false;

  /* -----------------------
     ACTUALIZAR MEDIDOR
  ------------------------*/

  function actualizarMedidor() {
    if (score < 0) score = 0;
    if (score > 100) score = 100;

    scoreSpan.textContent = `${score}%`;
    barInner.style.width = `${score}%`;

    if (score < 35) {
      barInner.style.background = "#d9534f"; // rojo
    } else if (score < 70) {
      barInner.style.background = "#f0ad4e"; // ámbar
    } else {
      barInner.style.background = "#5cb85c"; // verde/dorado
    }
  }

  /* -----------------------
     REGISTRAR EN HISTORIAL
  ------------------------*/

  function log(texto) {
    const item = document.createElement("div");
    item.textContent = texto;
    historial.appendChild(item);
  }

  /* -----------------------
     DECISIONES INICIALES
  ------------------------*/

  botonesDecision.forEach(btn => {
    btn.addEventListener("click", () => {
      const f = btn.dataset.formulacion;      // F1, F2, F3
      const accion = btn.dataset.accion;      // mantener, modificar, descartar

      // marcar botón activo dentro de su card
      const card = btn.closest(".p13-card");
      card.querySelectorAll(".p13-btn-dec").forEach(b => b.classList.remove("activo"));
      btn.classList.add("activo");

      // actualizar score según combinación
      if (f === "F1") {
        if (accion === "mantener") score -= 15;
        if (accion === "modificar") score -= 5;
        if (accion === "descartar") score += 10;
        estado.textContent = "F1 se basa en etiqueta: rara vez orienta la intervención.";
      }

      if (f === "F2") {
        if (accion === "mantener") score += 5;
        if (accion === "modificar") score += 10;
        if (accion === "descartar") score -= 5;
        estado.textContent = "F2 ofrece una narrativa coherente, pero aún limitada para intervenir.";
      }

      if (f === "F3") {
        if (accion === "mantener") score += 15;
        if (accion === "modificar") score += 5;
        if (accion === "descartar") score -= 15;
        estado.textContent = "F3 describe función: antecedente, evitación y consecuencia.";
      }

      actualizarMedidor();
      decisionesIniciales[f] = true;
      log(`Decisión inicial sobre ${f}: ${accion}.`);

      // Cuando ya decidió sobre F1, F2 y F3, mostramos el nuevo dato clínico
      if (decisionesIniciales.F1 && decisionesIniciales.F2 && decisionesIniciales.F3 && !rondaFinalRealizada) {
        nuevoDato.classList.remove("oculto");
        feedback.textContent =
          "Se añadió un nuevo dato clínico. Ahora elige qué formulación usarías como guía principal para intervenir.";
      }
    });
  });

  /* -----------------------
     RONDA FINAL
  ------------------------*/

  botonesFinales.forEach(btn => {
    btn.addEventListener("click", () => {
      if (rondaFinalRealizada) return;

      const eleccion = btn.dataset.final; // F1, F2, F3

      // quitar estilos previos
      botonesFinales.forEach(b => b.classList.remove("activo"));
      btn.classList.add("activo");
      arena.classList.remove("oscura");

      if (eleccion === "F1") {
        score = Math.max(score - 20, 0);
        arena.classList.add("oscura");
        estado.textContent =
          "F1 no cambia el patrón: la etiqueta no orienta una intervención concreta.";
        feedback.textContent =
          "Elegiste una formulación basada en rasgo. Recuerda que las etiquetas rara vez guían acciones clínicas específicas.";
      }

      if (eleccion === "F2") {
        if (score < 50) score = 55;
        estado.textContent =
          "F2 da sentido histórico, pero sigue siendo insuficiente para seleccionar ejercicios o exposiciones específicas.";
        feedback.textContent =
          "Las narrativas coherentes pueden ser útiles, pero su valor aumenta cuando se conectan con funciones actuales.";
      }

      if (eleccion === "F3") {
        if (score < 70) score = 85;
        estado.textContent =
          "F3 conecta evitación y alivio inmediato: permite diseñar intervenciones sobre función (exposición, valores, defusión).";
        feedback.textContent =
          "Has aplicado el criterio pragmático: una formulación es más verdadera cuando orienta acciones que promueven movimiento valioso.";
      }

      actualizarMedidor();
      log(`Elección final de formulación guía: ${eleccion}.`);
      rondaFinalRealizada = true;
    });
  });

  /* -----------------------
     REINICIO
  ------------------------*/

  resetBtn.addEventListener("click", () => {
    score = 0;
    decisionesIniciales = { F1: false, F2: false, F3: false };
    rondaFinalRealizada = false;

    historial.innerHTML = "";
    nuevoDato.classList.add("oculto");
    arena.classList.remove("oscura");

    estado.textContent =
      "Toma decisiones sobre cada formulación. Observa cómo cambia la utilidad clínica.";
    feedback.textContent =
      "Comienza tomando decisiones sobre las tres formulaciones. Luego aparecerá nueva información del caso.";

    document.querySelectorAll(".p13-btn-dec").forEach(b => b.classList.remove("activo"));
    document.querySelectorAll(".p13-btn-final").forEach(b => b.classList.remove("activo"));

    actualizarMedidor();
  });

  // Inicializar
  actualizarMedidor();
});
