/* ============================================================
   P4 · Unidad de Verdad
   Interactividad híbrida:
   - Clic para comparar explicaciones
   - Arrastrar & soltar para clasificar
   - Mini-quiz final
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const zona = document.getElementById("zona-interactiva");

  zona.innerHTML = `
    <div class="inter-bloque">

      <!-- BLOQUE 1: REVEAL -->
      <h3>1) Haz clic en cada explicación para compararla</h3>

      <div class="reveal-grid">
        <div class="reveal-card" data-info="e1">Explicación Mentalista</div>
        <div class="reveal-card" data-info="e2">Explicación Coherente</div>
        <div class="reveal-card" data-info="e3">Explicación Funcional</div>
      </div>

      <div id="reveal-output" class="reveal-output"></div>

      <hr class="divisor" />

      <!-- BLOQUE 2: DRAG & DROP -->
      <h3>2) Clasifica las explicaciones según su utilidad clínica</h3>
      <p>Arrastra cada ejemplo a su categoría adecuada.</p>

      <div class="drag-container">

        <div class="drag-col">
          <h4>Explicaciones Inútiles</h4>
          <div id="drop-mal" class="drop-zone"></div>
        </div>

        <div class="drag-col">
          <h4>Explicaciones Útiles</h4>
          <div id="drop-bien" class="drop-zone"></div>
        </div>

      </div>

      <div class="drag-items">
        <div class="drag-item" draggable="true" data-type="mal">
          “Tiene ansiedad porque su amígdala está hiperactivada.”
        </div>
        <div class="drag-item" draggable="true" data-type="mal">
          “Su mente produce pensamientos disfuncionales.”
        </div>
        <div class="drag-item" draggable="true" data-type="bien">
          “Este patrón se mantiene porque reduce malestar a corto plazo.”
        </div>
        <div class="drag-item" draggable="true" data-type="bien">
          “La conducta persiste porque recibe refuerzo en situaciones específicas.”
        </div>
      </div>

      <hr class="divisor" />

      <!-- BLOQUE 3: QUIZ -->
      <h3>3) Mini-quiz: ¿Qué criterio resuelve la competencia entre explicaciones?</h3>

      <div class="quiz-opciones">
        <button class="quiz-btn" data-correct="false">
          “La explicación más bonita y coherente.”
        </button>

        <button class="quiz-btn" data-correct="true">
          “La explicación que permite predecir e influir la conducta.”
        </button>

        <button class="quiz-btn" data-correct="false">
          “La explicación que suene más profunda o interesante.”
        </button>
      </div>

      <div id="quiz-resultado" class="quiz-resultado"></div>

    </div>
  `;

  iniciarRevealP4();
  iniciarDragP4();
  iniciarQuizP4();
});


/* ============================================================
   1. REVEAL — Análisis de Explicaciones
============================================================ */

function iniciarRevealP4() {
  const cards = document.querySelectorAll(".reveal-card");
  const out = document.getElementById("reveal-output");

  const textos = {
    e1: "La explicación mentalista atribuye causas internas hipotéticas sin guiar acción clínica clara.",
    e2: "La explicación coherente puede sonar perfectamente estructurada, pero no garantiza efectividad.",
    e3: "La explicación funcional describe relaciones entre conducta y contexto, útil para intervenir."
  };

  cards.forEach(c => {
    c.addEventListener("click", () => {
      out.textContent = textos[c.dataset.info];
      out.classList.add("visible");
    });
  });
}


/* ============================================================
   2. DRAG & DROP — Clasificación
============================================================ */

function iniciarDragP4() {
  const items = document.querySelectorAll(".drag-item");
  const zones = document.querySelectorAll(".drop-zone");

  items.forEach(item => {
    item.addEventListener("dragstart", e => {
      e.dataTransfer.setData("tipo", item.dataset.type);
      e.dataTransfer.setData("texto", item.textContent);
    });
  });

  zones.forEach(zone => {
    zone.addEventListener("dragover", e => e.preventDefault());

    zone.addEventListener("drop", e => {
      e.preventDefault();

      const tipo = e.dataTransfer.getData("tipo");
      const texto = e.dataTransfer.getData("texto");

      const correcto =
        (zone.id === "drop-bien" && tipo === "bien") ||
        (zone.id === "drop-mal" && tipo === "mal");

      const card = document.createElement("div");
      card.className = "drop-item " + (correcto ? "correcto" : "incorrecto");
      card.textContent = texto;

      zone.appendChild(card);
    });
  });
}


/* ============================================================
   3. MINI QUIZ
============================================================ */

function iniciarQuizP4() {
  const botones = document.querySelectorAll(".quiz-btn");
  const res = document.getElementById("quiz-resultado");

  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      const ok = btn.dataset.correct === "true";

      if (ok) {
        res.textContent = "✔ Correcto: el criterio funcional permite decidir entre explicaciones que solo compiten sin resolver nada.";
        res.style.color = "#0a8f32";
      } else {
        res.textContent = "✘ Incorrecto. Ese criterio no resuelve la competencia explicativa.";
        res.style.color = "#b30000";
      }
    });
  });
}

