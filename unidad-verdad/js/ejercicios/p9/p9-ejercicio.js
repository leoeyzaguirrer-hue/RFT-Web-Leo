/* ============================================================
   EJERCICIO P9 · MAPA CLÍNICO DE CICLOS Y VALORES
=============================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const tarjetas = document.querySelectorAll(".p9-tarjeta");
  const valores = document.querySelectorAll(".p9-valor-tarjeta");

  const dropA = document.getElementById("p9-drop-A");
  const dropB = document.getElementById("p9-drop-B");
  const dropC = document.getElementById("p9-drop-C");
  const dropValor = document.getElementById("p9-drop-valor");

  const bancoAnalisis = document.getElementById("p9-banco-analisis");
  const bancoValores = document.getElementById("p9-banco-valores");

  const scoreSpan = document.getElementById("p9-score");
  const feedbackBox = document.getElementById("p9-feedback");
  const resetBtn = document.getElementById("p9-reset");

  /* -----------------------
     DRAG & DROP GENERAL
  ------------------------*/

  function setupDraggable(el) {
    el.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("tipo", "analisis");
      e.dataTransfer.setData("categoria", el.dataset.categoria || "");
      e.dataTransfer.setData("origen", el.dataset.origen || "");
      e.dataTransfer.setData("id", el.dataset.id || "");
      e.dataTransfer.setData("valor", el.dataset.valor || "");
      e.dataTransfer.effectAllowed = "move";
      el.classList.add("p9-dragging");
    });

    el.addEventListener("dragend", () => {
      el.classList.remove("p9-dragging");
    });
  }

  tarjetas.forEach(setupDraggable);
  valores.forEach(setupDraggable);

  function setupDropZone(zone, tipoZona) {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      zone.classList.add("p9-over");
    });

    zone.addEventListener("dragleave", () => {
      zone.classList.remove("p9-over");
    });

    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      zone.classList.remove("p9-over");

      const dragging = document.querySelector(".p9-dragging");
      if (!dragging) return;

      // Control básico: zona de valores solo acepta valores
      if (tipoZona === "VALOR" && !dragging.classList.contains("p9-valor-tarjeta")) {
        feedbackBox.textContent =
          "Conecta valores en el panel derecho: elige una tarjeta de valores para arrastrar aquí.";
        return;
      }

      // Zonas A/B/C no aceptan tarjetas de valor
      if (tipoZona !== "VALOR" && dragging.classList.contains("p9-valor-tarjeta")) {
        feedbackBox.textContent =
          "Ubica los valores solo en la zona de conexión con valores, no en los anillos A–B–C.";
        return;
      }

      // Si la zona ya tiene una tarjeta, la devolvemos a su banco original
      const existente = zone.querySelector(".p9-tarjeta, .p9-valor-tarjeta");
      if (existente) {
        devolverAlOrigen(existente);
      }

      zone.appendChild(dragging);
      actualizarEstado();
    });
  }

  setupDropZone(dropA, "A");
  setupDropZone(dropB, "B");
  setupDropZone(dropC, "C");
  setupDropZone(dropValor, "VALOR");

  /* -----------------------
     Devolver al origen
  ------------------------*/

  function devolverAlOrigen(el) {
    const origen = el.dataset.origen;
    if (origen === "analisis") {
      bancoAnalisis.appendChild(el);
    } else if (origen === "valores") {
      bancoValores.appendChild(el);
    }
  }

  /* -----------------------
     Evaluación de la formulación
  ------------------------*/

  function actualizarEstado() {
    const cardA = dropA.querySelector(".p9-tarjeta");
    const cardB = dropB.querySelector(".p9-tarjeta");
    const cardC = dropC.querySelector(".p9-tarjeta");
    const cardValor = dropValor.querySelector(".p9-valor-tarjeta");

    // Si falta algo, solo guía el proceso
    if (!cardA || !cardB || !cardC) {
      scoreSpan.textContent = "0%";
      feedbackBox.textContent =
        "Completa primero los anillos A (antecedentes), B (conductas evitativas / reglas) y C (consecuencias).";
      return;
    }

    let score = 0;
    let mensajesErrores = [];

    // Antecedentes correctos
    if (cardA.dataset.categoria === "A") {
      score += 30;
    } else if (cardA.dataset.categoria === "X") {
      mensajesErrores.push(
        "Revisa los antecedentes: evita explicaciones vagas como “falta de motivación” o rasgos fijos."
      );
    } else {
      mensajesErrores.push(
        "Lo que ubiques en el anillo A debe ser un antecedente: algo que dispare el ciclo."
      );
    }

    // Conductas / reglas
    if (cardB.dataset.categoria === "B") {
      score += 30;
    } else if (cardB.dataset.categoria === "X") {
      mensajesErrores.push(
        "En el anillo B coloca conductas observables o patrones verbales, no etiquetas globales."
      );
    } else {
      mensajesErrores.push(
        "El anillo B requiere conductas evitativas o reglas que organizan el comportamiento."
      );
    }

    // Consecuencias
    if (cardC.dataset.categoria === "C") {
      score += 30;
    } else if (cardC.dataset.categoria === "X") {
      mensajesErrores.push(
        "Las consecuencias describen lo que obtiene la persona a corto plazo, no rasgos internos."
      );
    } else {
      mensajesErrores.push(
        "En el anillo C ubica lo que la conducta produce (alivio, escape, reducción de demandas)."
      );
    }

    // Valores (opcional pero clave)
    let valorCorrecto = false;

    if (cardValor) {
      if (cardValor.dataset.valor === "profesional") {
        score += 10;
        valorCorrecto = true;
      } else {
        mensajesErrores.push(
          "Conecta tu análisis con un valor directamente impactado por este ciclo. Aquí, el desarrollo profesional es especialmente relevante."
        );
      }
    } else {
      mensajesErrores.push(
        "Añade un valor afectado por este ciclo. Sin dirección valiosa, la formulación pierde sentido clínico."
      );
    }

    scoreSpan.textContent = `${score}%`;

    // Mensajes finales según el puntaje
    if (score === 100) {
      feedbackBox.textContent =
        "Tu formulación es verdadera en sentido contextual: identifica función, organiza el ciclo y se conecta con un valor que orienta acción clínica.";
    } else if (score >= 70) {
      feedbackBox.textContent =
        "Vas en una muy buena dirección: tu análisis funcional es sólido. Ajusta los elementos marcados para aumentar precisión y conexión con valores.";
      if (mensajesErrores.length > 0) {
        feedbackBox.textContent += " " + mensajesErrores.join(" ");
      }
    } else {
      feedbackBox.textContent =
        "Revisa tu análisis: prioriza antecedentes concretos, conductas evitativas y consecuencias inmediatas. Luego conecta el ciclo con un valor que importe al consultante. " +
        mensajesErrores.join(" ");
    }
  }

  /* -----------------------
     Reinicio
  ------------------------*/

  resetBtn.addEventListener("click", () => {
    // Devolver todas las tarjetas a sus bancos
    document
      .querySelectorAll(".p9-tarjeta, .p9-valor-tarjeta")
      .forEach((el) => devolverAlOrigen(el));

    // Limpiar zonas
    [dropA, dropB, dropC, dropValor].forEach((zone) => {
      zone.classList.remove("p9-over");
    });

    // Reset feedback
    scoreSpan.textContent = "0%";
    feedbackBox.textContent =
      "Comienza ubicando los antecedentes (A), luego las conductas (B) y por último las consecuencias (C).";
  });

});
