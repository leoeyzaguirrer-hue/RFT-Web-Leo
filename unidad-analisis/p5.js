// p5.js — Lógica interactiva de la Lección 4 · Unidad de análisis, RFT y lenguaje

document.addEventListener("DOMContentLoaded", () => {
  // ==========================
  // 1. Animación de entrada
  // ==========================
  setTimeout(() => {
    document.querySelectorAll(".ua-fade-in").forEach(el => {
      el.classList.add("ua-visible");
    });
  }, 160);

  // ==========================
  // 2. Acordeón clásico (solo uno abierto)
  // ==========================
  const accHeaders = document.querySelectorAll(".ua-acc-header");

  accHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const panel = header.nextElementSibling;
      const isOpen = header.classList.contains("ua-acc-open");

      // Cerrar todos
      accHeaders.forEach(h => {
        h.classList.remove("ua-acc-open");
        const p = h.nextElementSibling;
        if (p) p.style.maxHeight = null;
      });

      // Si el que toco estaba cerrado, abrirlo
      if (!isOpen) {
        header.classList.add("ua-acc-open");
        if (panel) {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      }
    });
  });

  // Abrir por defecto el primer acordeón
  if (accHeaders[0]) {
    accHeaders[0].click();
  }

  // ==========================
  // 3. Estímulos del perro y relaciones verbales
  // ==========================
  const stimulusInfo = {
    perro: {
      title: "🐕 Perro grande negro",
      text: `
        Aquí vemos el estímulo físico: el perro real, atado y tranquilo.<br><br>
        A nivel funcional, su efecto sobre la conducta depende de las redes verbales
        que la persona trae:<br>
        · Coordinación: “perro grande = peligroso”.<br>
        · Historia previa: noticias de ataques, historias familiares, advertencias.<br><br>
        Estas relaciones aumentan la probabilidad de cruzar la calle y evitar el contacto.
      `
    },
    palabra: {
      title: "⚠️ Palabra “PELIGRO”",
      text: `
        La palabra escrita “PELIGRO” coordina con múltiples estímulos aversivos
        aprendidos a lo largo de la vida (accidentes, noticias, advertencias).<br><br>
        Cuando se coloca junto al perro, transforma su función: el perro ya no es solo
        “un animal atado”, sino un <strong>foco de amenaza</strong> según la red relacional.
      `
    },
    icono: {
      title: "🚫 Icono de prohibición",
      text: `
        El icono 🚫 suele coordinarse con “no pases”, “no toques”, “no te acerques”.<br><br>
        Al aparecer cerca del perro, se suma a la red de señales de peligro y refuerza
        respuestas de evitación: cruzar la calle, acelerar el paso, no mirar.
      `
    },
    noticia: {
      title: "📰 Recuerdo de noticia de ataque",
      text: `
        El recuerdo de una noticia de ataque de perro actúa como <strong>evento verbal</strong>
        que trae a la situación actual funciones aversivas.<br><br>
        Aunque el perro presente nunca haya atacado a nadie, las relaciones
        derivadas (“perro grande negro = peligro”) transforman la función del estímulo
        y hacen más probable la evitación.
      `
    }
  };

  const stimulusButtons = document.querySelectorAll(".ua-stimulus");
  const relationsBox = document.getElementById("ua-relations-box");

  stimulusButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.stimulus;
      if (!stimulusInfo[key] || !relationsBox) return;

      // marcar activo
      stimulusButtons.forEach(b => b.classList.remove("ua-stimulus-active"));
      btn.classList.add("ua-stimulus-active");

      relationsBox.innerHTML = `
        <h4 class="ua-relations-title">${stimulusInfo[key].title}</h4>
        <p class="ua-text-small">${stimulusInfo[key].text}</p>
        <p class="ua-text-small ua-hint">
          Piensa cómo este elemento se coordina con los otros y cómo eso cambia
          lo que la persona hace (cruzar, evitar, acelerar el paso).
        </p>
      `;
    });
  });

  // ==========================
  // 4. Mini-experimento · registrar respuestas sin feedback
  // ==========================
  const answerButtons = document.querySelectorAll(".ua-answer-btn");

  answerButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const q = btn.dataset.q;
      const value = btn.dataset.value;
      if (!q || !value) return;

      // desmarcar en la misma pregunta
      const questionBlock = btn.closest(".ua-question");
      if (!questionBlock) return;

      questionBlock.querySelectorAll(".ua-answer-btn").forEach(b => {
        b.classList.remove("ua-answer-selected");
      });
      btn.classList.add("ua-answer-selected");

      // guardar en localStorage para posible uso en pantalla de integración
      try {
        localStorage.setItem("ua_p5_" + q, value);
      } catch (e) {
        // si localStorage falla, simplemente seguimos sin romper nada
      }

      // pequeña nota de confirmación (sin decir si está bien o mal)
      const note = questionBlock.querySelector(".ua-question-note");
      if (note) {
        note.textContent =
          "Respuesta registrada. La retomaremos en la lección de integración (no verás feedback inmediato aquí).";
      }
    });
  });
});
