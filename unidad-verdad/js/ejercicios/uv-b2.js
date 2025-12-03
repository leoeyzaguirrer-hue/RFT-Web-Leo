// uv-b2.js · Unidad Verdad · Bloque 2
// Actividad: "Medidor Pragmatista de Verdad"

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("bloque-2-actividad");
  if (!contenedor) return; // por si esta pantalla no tiene el bloque

  initEjercicioBloque2UV(contenedor);
});

/* ============================================================
   INICIALIZACIÓN DEL EJERCICIO
   ============================================================ */

function initEjercicioBloque2UV(rootContainer) {
  rootContainer.classList.remove("uv-actividad-placeholder");

  rootContainer.innerHTML = `
    <div class="uv-ej-b2">

      <!-- HEADER + BARRA DE ENERGÍA -->
      <div class="uv-ej-b2-header">
        <div class="uv-ej-b2-header-main">
          <h4 class="uv-ej-b2-title">
            Medidor Pragmatista de Verdad · ¿Qué tanto mejora tu análisis clínico?
          </h4>
          <p class="uv-ej-b2-text">
            Haz clic en cada tarjeta y elige si la formulación aumenta <strong>precisión</strong>,
            <strong>alcance</strong>, <strong>profundidad</strong> o si <strong>no aporta utilidad</strong>.
            La barra mide cuánta “energía pragmática” vas acumulando en tu análisis.
          </p>
        </div>

        <div class="uv-ej-b2-meter">
          <div class="uv-ej-b2-meter-top">
            <span class="uv-ej-b2-meter-label">⚡ Energía pragmática</span>
            <span class="uv-ej-b2-meter-value" id="uv-ej-b2-meter-value">50%</span>
          </div>
          <div class="uv-ej-b2-meter-bar">
            <div class="uv-ej-b2-meter-fill" id="uv-ej-b2-meter-fill" style="width: 50%;"></div>
          </div>
        </div>
      </div>

      <!-- ZONA PRINCIPAL -->
      <div class="uv-ej-b2-main">

        <!-- CATEGORÍAS LATERALES -->
        <div class="uv-ej-b2-categories">

          <div class="uv-ej-b2-category" data-category="precision">
            <div class="uv-ej-b2-category-header precision">
              <span class="uv-ej-b2-cat-emoji">🎯</span>
              <div class="uv-ej-b2-cat-texts">
                <span class="uv-ej-b2-cat-title">Aumenta precisión</span>
                <span class="uv-ej-b2-cat-sub">
                  Afinan el foco del análisis, distinguiendo función de forma.
                </span>
              </div>
            </div>
            <div class="uv-ej-b2-category-body" data-drop="precision"></div>
          </div>

          <div class="uv-ej-b2-category" data-category="alcance">
            <div class="uv-ej-b2-category-header alcance">
              <span class="uv-ej-b2-cat-emoji">📡</span>
              <div class="uv-ej-b2-cat-texts">
                <span class="uv-ej-b2-cat-title">Aumenta alcance</span>
                <span class="uv-ej-b2-cat-sub">
                  Permiten ver patrones que se extienden a más contextos.
                </span>
              </div>
            </div>
            <div class="uv-ej-b2-category-body" data-drop="alcance"></div>
          </div>

          <div class="uv-ej-b2-category" data-category="profundidad">
            <div class="uv-ej-b2-category-header profundidad">
              <span class="uv-ej-b2-cat-emoji">🌊</span>
              <div class="uv-ej-b2-cat-texts">
                <span class="uv-ej-b2-cat-title">Aumenta profundidad</span>
                <span class="uv-ej-b2-cat-sub">
                  Conectan la conducta actual con variables históricas relevantes.
                </span>
              </div>
            </div>
            <div class="uv-ej-b2-category-body" data-drop="profundidad"></div>
          </div>

          <div class="uv-ej-b2-category" data-category="noutil">
            <div class="uv-ej-b2-category-header noutil">
              <span class="uv-ej-b2-cat-emoji">🚫</span>
              <div class="uv-ej-b2-cat-texts">
                <span class="uv-ej-b2-cat-title">No aporta utilidad</span>
                <span class="uv-ej-b2-cat-sub">
                  Suenan sofisticadas, pero no cambian lo que haces en terapia.
                </span>
              </div>
            </div>
            <div class="uv-ej-b2-category-body" data-drop="noutil"></div>
          </div>

        </div>

        <!-- BANCO DE TARJETAS + PANEL DE ELECCIÓN -->
        <div class="uv-ej-b2-right">
          <div class="uv-ej-b2-bank">
            <div class="uv-ej-b2-bank-header">
              <span class="uv-ej-b2-bank-title">Tarjetas para clasificar</span>
              <span class="uv-ej-b2-bank-sub">
                Elige cómo afecta cada formulación a tu análisis: ¿afina, amplía, profundiza
                o solo adorna?
              </span>
            </div>

            <div class="uv-ej-b2-bank-cards" id="uv-ej-b2-bank-cards">

              <button class="uv-ej-b2-card" data-id="1" data-expected="noutil">
                <span class="uv-ej-b2-card-emoji">🎭</span>
                <span class="uv-ej-b2-card-text">Describe una causa interna no observable.</span>
              </button>

              <button class="uv-ej-b2-card" data-id="2" data-expected="precision">
                <span class="uv-ej-b2-card-emoji">🔍</span>
                <span class="uv-ej-b2-card-text">Diferencia entre función y forma.</span>
              </button>

              <button class="uv-ej-b2-card" data-id="3" data-expected="alcance">
                <span class="uv-ej-b2-card-emoji">🧭</span>
                <span class="uv-ej-b2-card-text">Permite ver un patrón en múltiples contextos.</span>
              </button>

              <button class="uv-ej-b2-card" data-id="4" data-expected="profundidad">
                <span class="uv-ej-b2-card-emoji">◻️</span>
                <span class="uv-ej-b2-card-text">Conecta la conducta actual con variables históricas relevantes.</span>
              </button>

              <button class="uv-ej-b2-card" data-id="5" data-expected="precision">
                <span class="uv-ej-b2-card-emoji">🎯</span>
                <span class="uv-ej-b2-card-text">Permite elegir una intervención específica.</span>
              </button>

              <button class="uv-ej-b2-card" data-id="6" data-expected="noutil">
                <span class="uv-ej-b2-card-emoji">🌀</span>
                <span class="uv-ej-b2-card-text">Clasifica la conducta sin impacto clínico.</span>
              </button>

            </div>
          </div>

          <!-- PANEL DE ELECCIÓN -->
          <div class="uv-ej-b2-choice-panel" id="uv-ej-b2-choice-panel">
            <div class="uv-ej-b2-choice-title">
              Elige cómo afecta esta formulación a tu análisis clínico:
            </div>
            <div class="uv-ej-b2-choice-options">
              <button class="uv-ej-b2-choice-btn precision" data-choice="precision">
                🎯 Aumenta precisión
              </button>
              <button class="uv-ej-b2-choice-btn alcance" data-choice="alcance">
                📡 Aumenta alcance
              </button>
              <button class="uv-ej-b2-choice-btn profundidad" data-choice="profundidad">
                🌊 Aumenta profundidad
              </button>
              <button class="uv-ej-b2-choice-btn noutil" data-choice="noutil">
                🚫 No aporta utilidad
              </button>
            </div>
          </div>

          <!-- PIE + FEEDBACK -->
          <div class="uv-ej-b2-footer">
            <button type="button" class="uv-ej-b2-btn-reset" id="uv-ej-b2-btn-reset">
              Reiniciar ejercicio
            </button>
            <div class="uv-ej-b2-feedback" id="uv-ej-b2-feedback"></div>
          </div>

        </div>

      </div>

    </div>
  `;

  configurarLogicaEjercicioBloque2UV(rootContainer);
}

/* ============================================================
   LÓGICA DEL EJERCICIO
   ============================================================ */

function configurarLogicaEjercicioBloque2UV(root) {
  const cards = Array.from(root.querySelectorAll(".uv-ej-b2-card"));
  const choicePanel = root.querySelector("#uv-ej-b2-choice-panel");
  const choiceButtons = Array.from(root.querySelectorAll(".uv-ej-b2-choice-btn"));
  const meterFill = root.querySelector("#uv-ej-b2-meter-fill");
  const meterValue = root.querySelector("#uv-ej-b2-meter-value");
  const feedback = root.querySelector("#uv-ej-b2-feedback");
  const resetBtn = root.querySelector("#uv-ej-b2-btn-reset");
  const categoryBodies = {
    precision: root.querySelector('[data-drop="precision"]'),
    alcance: root.querySelector('[data-drop="alcance"]'),
    profundidad: root.querySelector('[data-drop="profundidad"]'),
    noutil: root.querySelector('[data-drop="noutil"]'),
  };

  let energia = 50;
  const ENERGIA_MAX = 100;
  const ENERGIA_MIN = 0;
  const DELTA_CORRECTO = 15;
  const DELTA_INCORRECTO = 10;

  let tarjetaSeleccionada = null;
  let tarjetasResueltas = new Set();

  actualizarMedidor();

  // --- Selección de tarjeta ---
  cards.forEach(card => {
    card.addEventListener("click", () => {
      if (tarjetasResueltas.has(card.dataset.id)) return;

      tarjetaSeleccionada = card;
      limpiarFeedback();
      resaltarTarjetaSeleccionada(cards, card);
      choicePanel.classList.add("visible");
    });
  });

  // --- Elección de categoría ---
  choiceButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (!tarjetaSeleccionada) return;

      const choice = btn.dataset.choice;
      const esperado = tarjetaSeleccionada.dataset.expected;
      const id = tarjetaSeleccionada.dataset.id;

      const esCorrecto = choice === esperado;

      if (esCorrecto) {
        energia = Math.min(ENERGIA_MAX, energia + DELTA_CORRECTO);
        tarjetaSeleccionada.classList.add("uv-ej-b2-card--correct");
      } else {
        energia = Math.max(ENERGIA_MIN, energia - DELTA_INCORRECTO);
        tarjetaSeleccionada.classList.add("uv-ej-b2-card--incorrect");
        vibrarSuave();
      }

      tarjetasResueltas.add(id);
      moverTarjetaACategoria(tarjetaSeleccionada, choice, categoryBodies);
      tarjetaSeleccionada.classList.add("uv-ej-b2-card--locked");
      tarjetaSeleccionada.disabled = true;
      tarjetaSeleccionada = null;
      choicePanel.classList.remove("visible");
      actualizarMedidor();
      evaluarResultadoFinal();
    });
  });

  // --- Reset ---
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      energia = 50;
      tarjetasResueltas.clear();
      limpiarFeedback();
      choicePanel.classList.remove("visible");
      reseteoTarjetas(root, categoryBodies);
      actualizarMedidor();
    });
  }

  // -------------------------------------------------------
  // Helpers
  // -------------------------------------------------------

  function actualizarMedidor() {
    if (meterFill) {
      meterFill.style.width = `${energia}%`;
      meterFill.classList.remove("up", "down");
      // pequeña animación según suba o baje
      void meterFill.offsetWidth; // forzar repaint
      meterFill.classList.add(energia >= 50 ? "up" : "down");
    }
    if (meterValue) {
      meterValue.textContent = `${energia}%`;
    }
  }

  function evaluarResultadoFinal() {
    if (tarjetasResueltas.size !== 6) return;

    if (energia >= 70) {
      feedback.innerHTML = `
        <span class="uv-ej-b2-feedback-strong">✨ Buen trabajo.</span>
        Comprendes la verdad como relación entre <strong>análisis</strong> y
        <strong>consecuencias</strong>: tu foco está en cómo las descripciones amplían
        la capacidad de intervenir, no solo en cómo “suena” la teoría.
      `;
    } else {
      feedback.innerHTML = `
        <span class="uv-ej-b2-feedback-strong">Sigue ajustando tu mirada.</span>
        Intenta identificar cuándo una descripción permite actuar de forma más precisa,
        amplia o profunda. En contextualismo, una formulación es “verdadera” en la
        medida en que mejora tus decisiones clínicas.
      `;
    }
  }

  function limpiarFeedback() {
    if (feedback) feedback.textContent = "";
  }

  function resaltarTarjetaSeleccionada(all, selected) {
    all.forEach(c => c.classList.remove("uv-ej-b2-card--active"));
    selected.classList.add("uv-ej-b2-card--active");
  }

  function moverTarjetaACategoria(card, choice, catBodies) {
    const destino = catBodies[choice];
    if (!destino) return;
    const clon = card.cloneNode(true);
    clon.classList.remove("uv-ej-b2-card--active");
    clon.classList.add("uv-ej-b2-card--mini");
    clon.disabled = true;
    destino.appendChild(clon);
  }

  function reseteoTarjetas(root, catBodies) {
    // Vaciar categorías
    Object.values(catBodies).forEach(body => {
      if (body) body.innerHTML = "";
    });

    // Volver tarjetas al banco
    const bank = root.querySelector("#uv-ej-b2-bank-cards");
    const originales = root.querySelectorAll(".uv-ej-b2-card");
    originales.forEach(card => {
      card.classList.remove(
        "uv-ej-b2-card--correct",
        "uv-ej-b2-card--incorrect",
        "uv-ej-b2-card--locked",
        "uv-ej-b2-card--active"
      );
      card.disabled = false;
      bank.appendChild(card);
    });
  }

  function vibrarSuave() {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(120);
    }
  }
}
