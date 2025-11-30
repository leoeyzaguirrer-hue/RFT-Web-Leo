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
  // 2. Acordeón (solo uno abierto a la vez)
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

      // Abrir el que corresponde
      if (!isOpen) {
        header.classList.add("ua-acc-open");
        if (panel) {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      }
    });
  });

  // Abrir primer panel por defecto
  if (accHeaders[0]) {
    accHeaders[0].click();
  }


  // ==========================
  // 3. Información de estímulos (perro/peligro/etc.)
  // ==========================
  const stimulusInfo = {
    perro: {
      title: "🐕 Perro grande negro",
      text: `
        Estímulo físico real. Su efecto sobre la conducta depende de las redes verbales
        que trae la persona.<br><br>
        · Coordinación: “perro grande = peligroso”.<br>
        · Historia previa: advertencias, noticias, experiencias familiares.<br><br>
        Estas relaciones aumentan la probabilidad de evitar o cruzar la calle.
      `
    },
    palabra: {
      title: "⚠️ Palabra “PELIGRO”",
      text: `
        La palabra coordina con múltiples estímulos aversivos aprendidos.<br><br>
        Al colocarse junto al perro, transforma su función: ahora es percibido
        como <strong>amenaza</strong>, aunque esté atado y tranquilo.
      `
    },
    icono: {
      title: "🚫 Icono de prohibición",
      text: `
        El icono suele relacionarse con “no pases”, “no te acerques”.<br><br>
        Se suma a la red relacional y refuerza respuestas de evitación:
        acelerar el paso, cruzar, no mirar.
      `
    },
    noticia: {
      title: "📰 Recuerdo de noticia de ataque",
      text: `
        Es un <strong>evento verbal</strong> que trae funciones aversivas a la situación actual.<br><br>
        Aunque el perro presente nunca haya atacado, las relaciones derivadas
        (“perro grande negro = peligro”) transforman la función del estímulo.
      `
    }
  };

  const stimulusButtons = document.querySelectorAll(".ua-stimulus");
  const relationsBox = document.getElementById("ua-relations-box");

  stimulusButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.stimulus;
      if (!stimulusInfo[key] || !relationsBox) return;

      // Marcar activo
      stimulusButtons.forEach(b => b.classList.remove("ua-stimulus-active"));
      btn.classList.add("ua-stimulus-active");

      relationsBox.innerHTML = `
        <h4 class="ua-relations-title">${stimulusInfo[key].title}</h4>
        <p class="ua-text-small">${stimulusInfo[key].text}</p>
        <p class="ua-text-small ua-hint">
          Observa cómo se coordinan entre sí y cómo eso modifica lo que la persona hace.
        </p>
      `;
    });
  });



  // ==========================
  // 4. Mini-experimento · registrar respuestas SIN feedback
  // ==========================
  const answerButtons = document.querySelectorAll(".ua-answer-btn");

  answerButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const q = btn.dataset.q;
      const value = btn.dataset.value;
      if (!q || !value) return;

      const questionBlock = btn.closest(".ua-question");
      if (!questionBlock) return;

      // Desmarcar anteriores
      questionBlock.querySelectorAll(".ua-answer-btn").forEach(b => {
        b.classList.remove("ua-answer-selected");
      });

      // Marcar seleccionado
      btn.classList.add("ua-answer-selected");

      // Guardar (clave interna)
      try {
        localStorage.setItem("ua_p5_" + q, value);

        // Guardar claves que p7.html necesita
        if (q === "estimulo") {
          localStorage.setItem("p5-estimulo-aversivo", value);
        }
        if (q === "rol") {
          localStorage.setItem("p5-rol-recuerdo", value);
        }
      } catch (e) {}

      // Nota visible (sin feedback correcto/incorrecto)
      const note = questionBlock.querySelector(".ua-question-note");
      if (note) {
        note.textContent =
          "Respuesta registrada. Se revisará más adelante en la pantalla de integración.";
      }
    });
  });

});
