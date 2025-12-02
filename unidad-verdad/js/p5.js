/* ============================================================
   P5 · Unidad de Verdad — Interactividad Híbrida Premium
   - Clic para elegir hipótesis funcional
   - Drag & Drop de casos clínicos
   - Mini-quiz integrador
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const zona = document.getElementById("zona-interactiva");

  zona.innerHTML = `
    <div class="inter-bloque">

      <!-- BLOQUE 1: ELECCIÓN DE HIPÓTESIS FUNCIONAL -->
      <h3>1) Analiza hipótesis: haz clic para ver qué funciona</h3>

      <div class="reveal-grid">

        <div class="reveal-card" data-info="h1">
          “La ansiedad es causada por pensamientos negativos.”
        </div>

        <div class="reveal-card" data-info="h2">
          “La conducta se mantiene porque reduce malestar a corto plazo.”
        </div>

        <div class="reveal-card" data-info="h3">
          “La mente produce error de procesamiento emocional.”
        </div>

      </div>

      <div id="reveal-output" class="reveal-output"></div>

      <hr class="divisor" />

      <!-- BLOQUE 2: DRAG & DROP -->
      <h3>2) Clasifica hipótesis según su utilidad</h3>
      <p>Arrastra cada hipótesis hacia su categoría correcta.</p>

      <div class="drag-container">
        <div class="drag-col">
          <h4>Hipótesis Inútiles</h4>
          <div id="drop-mal" class="drop-zone"></div>
        </div>

        <div class="drag-col">
          <h4>Hipótesis Útiles</h4>
          <div id="drop-bien" class="drop-zone"></div>
        </div>
      </div>

      <div class="drag-items">
        <div class="drag-item" draggable="true" data-type="mal">
          “Tiene depresión porque su cerebro está dañado.”
        </div>

        <div class="drag-item" draggable="true" data-type="mal">
          “La crisis ocurre porque la mente no procesa emociones.”
        </div>

        <div class="drag-item" draggable="true" data-type="bien">
          “El episodio se mantiene porque evita exposición a estímulos aversivos.”
        </div>

        <div class="drag-item" draggable="true" data-type="bien">
          “El patrón persiste por refuerzos intermitentes del entorno.”
        </div>
      </div>

      <hr class="divisor" />

      <!-- BLOQUE 3: MINI QUIZ -->
      <h3>3) Mini-quiz: Aplicación clínica del criterio funcional</h3>

      <div class="quiz-opciones">
        <button class="quiz-btn" data-correct="false">
          “La mejor explicación es la que suena más profunda.”
        </button>

        <button class="quiz-btn" data-correct="true">
          “La mejor explicación es la que orienta acciones efectivas en el caso.”
        </button>

        <button class="quiz-btn" data-correct="false">
          “La mejor explicación es la que coincide con los síntomas.”
        </button>
      </div>

      <div id="quiz-resultado" class="quiz-resultado"></div>

    </div>
  `;

  iniciarRevealP5();
  iniciarDragP5();
  iniciarQuizP5();
});


/* ============================================================
   1. REVEAL — Hipótesis Funcionales
============================================================ */

function iniciarRevealP5() {
  const cards = document.querySelectorAll(".reveal-card");
  const out = document.getElementById("reveal-output");

  const textos = {
    h1: "Explicación mentalista que no guía intervención. No dice qué hacer.",
    h2: "Hipótesis funcional: analiza contingencias, permite intervenir con precisión.",
    h3: "Explicación cognitivo-mentalista sin conexión funcional con el contexto."
  };

  cards.forEach(card => {
    card.addEventListener("click", () => {
      out.textContent = textos[card.dataset.info];
      out.classList.add("visible");
    });
  });
}


/* ============================================================
   2. DRAG & DROP — Clasificación
============================================================ */

function iniciarDragP5() {
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

function iniciarQuizP5() {
  const botones = document.querySelectorAll(".quiz-btn");
  const res = document.getElementById("quiz-resultado");

  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      const ok = btn.dataset.correct === "true";

      if (ok) {
        res.textContent = "✔ Exacto: el criterio funcional destaca la explicación que guía intervención efectiva.";
        res.style.color = "#0a8f32";
      } else {
        res.textContent = "✘ Incorrecto. Esa explicación no aplica el criterio funcional.";
        res.style.color = "#b30000";
      }
    });
  });
}

