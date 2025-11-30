// p3.js — Lógica interactiva de la Lección 2 · Modelo ABC

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

      // Abrir el que corresponde
      if (!isOpen && panel) {
        header.classList.add("ua-acc-open");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  // Abrir por defecto el primer acordeón
  if (accHeaders[0]) {
    accHeaders[0].click();
  }

  // ==========================
  // 3. Timeline ABC (A → B → C)
  // ==========================
  const abcSteps = document.querySelectorAll(".ua-abc-step");
  const abcDetails = document.querySelectorAll(".ua-abc-detail");

  function showAbcDetail(key) {
    // marcar paso activo
    abcSteps.forEach(step => {
      step.classList.toggle("ua-abc-step-active", step.dataset.abc === key);
    });

    // mostrar solo el panel correspondiente
    abcDetails.forEach(detail => {
      if (detail.id === `abc-${key}`) {
        detail.classList.remove("ua-abc-hidden");
      } else {
        detail.classList.add("ua-abc-hidden");
      }
    });
  }

  abcSteps.forEach(step => {
    step.addEventListener("click", () => {
      const key = step.dataset.abc;
      if (!key) return;
      showAbcDetail(key);
    });
  });

  // asegurar estado inicial
  showAbcDetail("A");

  // ==========================
  // 4. Mini experimento: función, no forma
  // ==========================
  const funcOptions = document.querySelectorAll(".ua-func-option");
  const funcFeedback = document.getElementById("ua-func-feedback");

  funcOptions.forEach(btn => {
    btn.addEventListener("click", () => {
      const isCorrect = btn.dataset.correct === "yes";

      // Quitar selección previa
      funcOptions.forEach(b => b.classList.remove("ua-func-selected"));

      // Marcar seleccionada
      btn.classList.add("ua-func-selected");

      if (!funcFeedback) return;

      if (isCorrect) {
        funcFeedback.textContent =
          "✔ Correcto: aunque la forma cambia, la función es evitar el posible error en público y aliviar el malestar inmediato.";
        funcFeedback.classList.add("ua-mini-ok");
        funcFeedback.classList.remove("ua-mini-error");
      } else {
        funcFeedback.textContent =
          "✖ No del todo: en esa opción la función ya no es escapar del error, sino acercarse a la tarea o abrir contacto.";
        funcFeedback.classList.add("ua-mini-error");
        funcFeedback.classList.remove("ua-mini-ok");
      }
    });
  });

  // ==========================
  // 5. Revelar patrón funcional
  // ==========================
  const patternBtn = document.getElementById("ua-pattern-reveal");
  const patternBox = document.getElementById("ua-pattern-box");

  if (patternBtn && patternBox) {
    patternBtn.addEventListener("click", () => {
      patternBox.innerHTML = `
        <h4 class="ua-abc-title">Patrón funcional de Mariana</h4>
        <p class="ua-text-small">
          En contextos donde podría equivocarse frente a otros, Mariana tiende a
          <strong>reducir su exposición</strong> (hablar poco, escribir breve, apagar
          la cámara). Las topografías cambian, pero la función se mantiene:
          <strong>evitar el posible error y obtener alivio inmediato</strong>.
        </p>
        <p class="ua-text-small ua-hint">
          Eso es un patrón: múltiples ABC con consecuencias similares. Más adelante
          lo llamaremos <em>clase funcional</em>.
        </p>
      `;
    });
  }

  // ==========================
  // 6. Actividad integradora ABC
  // ==========================
  const abcChoices = document.querySelectorAll(".ua-abc-choice");
  const abcCheckBtn = document.getElementById("ua-abc-check");
  const abcFeedback = document.getElementById("ua-abc-feedback");

  // Seleccionar una opción por rol (A, B, C)
  abcChoices.forEach(btn => {
    btn.addEventListener("click", () => {
      const role = btn.dataset.role;
      if (!role) return;

      // Quitar selección de ese rol
      abcChoices.forEach(b => {
        if (b.dataset.role === role) {
          b.classList.remove("ua-abc-choice-selected");
        }
      });

      btn.classList.add("ua-abc-choice-selected");
    });
  });

  if (abcCheckBtn && abcFeedback) {
    abcCheckBtn.addEventListener("click", () => {
      const roles = ["A", "B", "C"];
      let allSelected = true;
      let allCorrect = true;

      roles.forEach(role => {
        const selected = document.querySelector(
          `.ua-abc-choice.ua-abc-choice-selected[data-role="${role}"]`
        );
        if (!selected) {
          allSelected = false;
          return;
        }
        if (selected.dataset.correct !== "yes") {
          allCorrect = false;
        }
      });

      if (!allSelected) {
        abcFeedback.textContent =
          "Primero elige una opción en cada columna (Antecedente, Conducta y Consecuencia).";
        abcFeedback.classList.add("ua-mini-error");
        abcFeedback.classList.remove("ua-mini-ok");
        return;
      }

      if (allCorrect) {
        abcFeedback.textContent =
          "✔ Muy bien: construiste un ABC funcional coherente con el caso de Mariana.";
        abcFeedback.classList.add("ua-mini-ok");
        abcFeedback.classList.remove("ua-mini-error");
      } else {
        abcFeedback.textContent =
          "✖ Hay algo que no encaja del todo. Revisa si tu A realmente abre la escena, tu B es una acción observable y tu C describe un efecto inmediato de alivio/evitación.";
        abcFeedback.classList.add("ua-mini-error");
        abcFeedback.classList.remove("ua-mini-ok");
      }
    });
  }
});
