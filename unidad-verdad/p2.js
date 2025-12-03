// p2.js · Unidad Verdad · Lección 1
// Control básico de acordeones y progreso por bloque

document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".uv-accordion");
  const panels = document.querySelectorAll(".uv-accordion-panel");
  const icons = document.querySelectorAll(".uv-accordion-icon");
  const dots = document.querySelectorAll(".uv-bloque-dot");

  if (!accordions.length) return;
  
initEjercicioBloque1UV();  
  
  accordions.forEach((accordion) => {
    accordion.addEventListener("click", () => {
      const bloque = accordion.getAttribute("data-bloque");
      const panel = document.querySelector(
        `.uv-accordion-panel[data-bloque="${bloque}"]`
      );
      const icon = accordion.querySelector(".uv-accordion-icon");

      const estabaAbierto = panel.classList.contains("abierto");

      // Cerrar todo
      panels.forEach((p) => p.classList.remove("abierto"));
      accordions.forEach((a) => a.classList.remove("abierto"));
      icons.forEach((i) => i.classList.remove("rotado"));

      if (!estabaAbierto) {
        // Abrir solo el bloque clicado
        panel.classList.add("abierto");
        accordion.classList.add("abierto");
        if (icon) icon.classList.add("rotado");

        // Actualizar puntos de progreso
        dots.forEach((d) => {
          const n = d.getAttribute("data-bloque");
          d.classList.toggle("activo", n === bloque);
        });
      } else {
        // Si se vuelve a hacer clic en el mismo, lo cerramos todo
        // y dejamos el punto de progreso como estaba (no lo apagamos)
      }
    });
  });
});
/* ============================================================
   EJERCICIO BLOQUE 1 · "COHERENTE O ÚTIL"
   Se inyecta dentro de #bloque-1-actividad
   ============================================================ */

function initEjercicioBloque1UV() {
  const contenedor = document.getElementById("bloque-1-actividad");
  if (!contenedor) return;

  contenedor.classList.remove("uv-actividad-placeholder");

  contenedor.innerHTML = `
    <div class="uv-ej-b1">

      <div class="uv-ej-b1-header">
        <div class="uv-ej-b1-header-title">
          Clasifica cada explicación: ¿solo suena coherente o guía acción clínica?
        </div>
        <p class="uv-ej-b1-header-text">
          Arrastra cada tarjeta hacia la columna que corresponda. No te fijes en qué tan
          elegante suena la frase, sino en si realmente te ayuda a decidir qué hacer en terapia.
        </p>
        <div class="uv-ej-b1-legend">
          <span class="uv-ej-b1-pill">🌀 Suena coherente</span>
          <span class="uv-ej-b1-pill">🎯 Guía acción clínica</span>
          <span class="uv-ej-b1-pill">⚖️ Ambigua / Depende</span>
        </div>
      </div>

      <div class="uv-ej-b1-main">
        <!-- COLUMNAS -->
        <div class="uv-ej-b1-cols">

          <div class="uv-ej-b1-col" data-category="coherente">
            <div class="uv-ej-b1-col-header">
              <div class="uv-ej-b1-col-tag">
                <span class="emoji">🌀</span>
                <span>Suena coherente</span>
              </div>
              <div class="uv-ej-b1-col-sub">
                Organiza el relato, pero no indica qué cambiar ni dónde intervenir.
              </div>
            </div>
            <div class="uv-ej-b1-dropzone" data-category="coherente">
              <div class="uv-ej-b1-dropzone-empty-hint">
                Suelta aquí las frases que explican “bonito” pero no guían acción.
              </div>
            </div>
          </div>

          <div class="uv-ej-b1-col" data-category="util">
            <div class="uv-ej-b1-col-header">
              <div class="uv-ej-b1-col-tag">
                <span class="emoji">🎯</span>
                <span>Guía acción clínica</span>
              </div>
              <div class="uv-ej-b1-col-sub">
                Señala función, contingencias o conducta actual, y orienta qué hacer.
              </div>
            </div>
            <div class="uv-ej-b1-dropzone" data-category="util">
              <div class="uv-ej-b1-dropzone-empty-hint">
                Suelta aquí las frases que te dicen <em>dónde</em> intervenir.
              </div>
            </div>
          </div>

          <div class="uv-ej-b1-col" data-category="ambigua">
            <div class="uv-ej-b1-col-header">
              <div class="uv-ej-b1-col-tag">
                <span class="emoji">⚖️</span>
                <span>Ambigua / Depende</span>
              </div>
              <div class="uv-ej-b1-col-sub">
                Podría ser útil, pero así formulada no basta para decidir una acción.
              </div>
            </div>
            <div class="uv-ej-b1-dropzone" data-category="ambigua">
              <div class="uv-ej-b1-dropzone-empty-hint">
                Frases que “dicen algo”, pero cuya utilidad depende de más análisis.
              </div>
            </div>
          </div>

        </div>

        <!-- BANCO DE TARJETAS -->
        <div class="uv-ej-b1-bank">
          <div class="uv-ej-b1-bank-inner">
            <div class="uv-ej-b1-bank-header">
              <strong>Tarjetas para clasificar</strong>
              <div class="uv-ej-b1-bank-sub">
                Arrastra cada explicación a la columna que corresponda según su utilidad
                clínica, no según qué tan sofisticada parezca.
              </div>
            </div>

            <div class="uv-ej-b1-bank-cards">

              <div class="uv-ej-b1-card" id="uv-ej-b1-card-1" draggable="true" data-expected="coherente">
                <span class="uv-ej-b1-card-emoji">🧠</span>
                <span class="uv-ej-b1-card-text">El consultante actúa así por baja autoestima.</span>
              </div>

              <div class="uv-ej-b1-card" id="uv-ej-b1-card-2" draggable="true" data-expected="coherente">
                <span class="uv-ej-b1-card-emoji">🎭</span>
                <span class="uv-ej-b1-card-text">Es un mecanismo de defensa aprendido.</span>
              </div>

              <div class="uv-ej-b1-card" id="uv-ej-b1-card-3" draggable="true" data-expected="ambigua">
                <span class="uv-ej-b1-card-emoji">📚</span>
                <span class="uv-ej-b1-card-text">Tiene rasgos evitativos desde joven.</span>
              </div>

              <div class="uv-ej-b1-card" id="uv-ej-b1-card-4" draggable="true" data-expected="util">
                <span class="uv-ej-b1-card-emoji">🎯</span>
                <span class="uv-ej-b1-card-text">Evita mirar a otros para reducir malestar ahora.</span>
              </div>

              <div class="uv-ej-b1-card" id="uv-ej-b1-card-5" draggable="true" data-expected="util">
                <span class="uv-ej-b1-card-emoji">⚙️</span>
                <span class="uv-ej-b1-card-text">Cuando siente amenaza interna, usa distracción.</span>
              </div>

              <div class="uv-ej-b1-card" id="uv-ej-b1-card-6" draggable="true" data-expected="ambigua">
                <span class="uv-ej-b1-card-emoji">🧩</span>
                <span class="uv-ej-b1-card-text">Ha repetido este patrón en su historia.</span>
              </div>

              <div class="uv-ej-b1-card" id="uv-ej-b1-card-7" draggable="true" data-expected="coherente">
                <span class="uv-ej-b1-card-emoji">💬</span>
                <span class="uv-ej-b1-card-text">Su modelo mental le impide avanzar.</span>
              </div>

              <div class="uv-ej-b1-card" id="uv-ej-b1-card-8" draggable="true" data-expected="util">
                <span class="uv-ej-b1-card-emoji">🔍</span>
                <span class="uv-ej-b1-card-text">La conducta se mantiene por alivio inmediato.</span>
              </div>

              <div class="uv-ej-b1-card" id="uv-ej-b1-card-9" draggable="true" data-expected="ambigua">
                <span class="uv-ej-b1-card-emoji">🌀</span>
                <span class="uv-ej-b1-card-text">Su relato encaja con trauma previo.</span>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div class="uv-ej-b1-footer">
        <div class="uv-ej-b1-actions">
          <button type="button" class="uv-ej-b1-btn uv-ej-b1-btn-main" id="uv-ej-b1-btn-check" disabled>
            ✦ Comprobar respuesta
          </button>
          <button type="button" class="uv-ej-b1-btn uv-ej-b1-btn-reset" id="uv-ej-b1-btn-reset">
            Reiniciar ejercicio
          </button>
        </div>
        <div class="uv-ej-b1-feedback" id="uv-ej-b1-feedback"></div>
      </div>

    </div>
  `;

  configurarLogicaEjercicioBloque1UV(contenedor);
}

function configurarLogicaEjercicioBloque1UV(root) {
  const cards = Array.from(root.querySelectorAll(".uv-ej-b1-card"));
  const dropzones = Array.from(root.querySelectorAll(".uv-ej-b1-dropzone"));
  const bankContainer = root.querySelector(".uv-ej-b1-bank-cards");
  const btnCheck = root.querySelector("#uv-ej-b1-btn-check");
  const btnReset = root.querySelector("#uv-ej-b1-btn-reset");
  const feedback = root.querySelector("#uv-ej-b1-feedback");

  if (!cards.length || !dropzones.length || !bankContainer) return;

  // --- Drag & Drop básico ---
  cards.forEach(card => {
    card.addEventListener("dragstart", (ev) => {
      ev.dataTransfer.setData("text/plain", card.id);
      ev.dataTransfer.effectAllowed = "move";
      card.classList.add("uv-ej-b1-card--dragging");
    });

    card.addEventListener("dragend", () => {
      card.classList.remove("uv-ej-b1-card--dragging");
      // Pequeño bounce opcional (shake suave)
      card.classList.add("uv-ej-b1-card--shake");
      setTimeout(() => card.classList.remove("uv-ej-b1-card--shake"), 220);
    });
  });

  dropzones.forEach(zone => {
    const col = zone.closest(".uv-ej-b1-col");

    zone.addEventListener("dragover", (ev) => {
      ev.preventDefault();
      if (col) col.classList.add("uv-ej-b1-col--highlight");
    });

    zone.addEventListener("dragleave", () => {
      if (col) col.classList.remove("uv-ej-b1-col--highlight");
    });

    zone.addEventListener("drop", (ev) => {
      ev.preventDefault();
      const id = ev.dataTransfer.getData("text/plain");
      const card = root.querySelector("#" + id);
      if (card) {
        // Si es la primera tarjeta, quitamos hint
        const hint = zone.querySelector(".uv-ej-b1-dropzone-empty-hint");
        if (hint) hint.remove();

        zone.appendChild(card);
      }
      if (col) col.classList.remove("uv-ej-b1-col--highlight");
      limpiarEstadosCorreccion(cards);
      actualizarEstadoBotonCheck(root);
      limpiarFeedback(feedback);
    });
  });

  // Permitir soltar de nuevo en el banco
  bankContainer.addEventListener("dragover", (ev) => {
    ev.preventDefault();
  });

  bankContainer.addEventListener("drop", (ev) => {
    ev.preventDefault();
    const id = ev.dataTransfer.getData("text/plain");
    const card = root.querySelector("#" + id);
    if (card) {
      bankContainer.appendChild(card);
    }
    limpiarEstadosCorreccion(cards);
    actualizarEstadoBotonCheck(root);
    limpiarFeedback(feedback);
  });

  // Botón Comprobar
  if (btnCheck) {
    btnCheck.addEventListener("click", () => {
      const total = cards.length;
      let correctas = 0;

      limpiarEstadosCorreccion(cards);

      cards.forEach(card => {
        const dropzone = card.closest(".uv-ej-b1-dropzone");
        const esperado = card.dataset.expected;
        const asignado = dropzone ? dropzone.dataset.category : null;

        if (dropzone && esperado === asignado) {
          card.classList.add("uv-ej-b1-card--correct");
          correctas++;
        } else {
          card.classList.add("uv-ej-b1-card--incorrect", "uv-ej-b1-card--shake");
          setTimeout(() => card.classList.remove("uv-ej-b1-card--shake"), 220);
        }
      });

      if (typeof navigator !== "undefined" && navigator.vibrate) {
        const hayIncorrectas = correctas !== total;
        if (hayIncorrectas) {
          navigator.vibrate(140);
        }
      }

      if (correctas === total) {
        feedback.innerHTML =
          `<span class="uv-ej-b1-feedback-strong">¡Bien!</span> Clasificaste todas las frases de acuerdo con su utilidad clínica. Coherente no es lo mismo que verdadero: en contextualismo, “verdadero” es lo que permite actuar de forma más eficaz.`;
      } else {
        feedback.innerHTML =
          `<span class="uv-ej-b1-feedback-strong">Revisa algunas tarjetas.</span> Recuerda: una explicación puede sonar muy coherente y aun así no decirte qué hacer en sesión. Lo verdadero aquí es lo que guía acción, no lo que encaja mejor en un relato.`;
      }
    });
  }

  // Botón Reset
  if (btnReset) {
    btnReset.addEventListener("click", () => {
      cards.forEach(card => {
        bankContainer.appendChild(card);
      });
      limpiarEstadosCorreccion(cards);
      limpiarFeedback(feedback);
      actualizarEstadoBotonCheck(root);
    });
  }

  // Estado inicial del botón
  actualizarEstadoBotonCheck(root);
}

function limpiarEstadosCorreccion(cards) {
  cards.forEach(card => {
    card.classList.remove(
      "uv-ej-b1-card--correct",
      "uv-ej-b1-card--incorrect",
      "uv-ej-b1-card--shake"
    );
  });
}

function limpiarFeedback(feedbackEl) {
  if (feedbackEl) {
    feedbackEl.textContent = "";
  }
}

function actualizarEstadoBotonCheck(root) {
  const btnCheck = root.querySelector("#uv-ej-b1-btn-check");
  if (!btnCheck) return;

  const cards = Array.from(root.querySelectorAll(".uv-ej-b1-card"));
  const dropCards = root.querySelectorAll(".uv-ej-b1-dropzone .uv-ej-b1-card");

  const total = cards.length;
  const colocadas = dropCards.length;

  btnCheck.disabled = colocadas !== total;
}
