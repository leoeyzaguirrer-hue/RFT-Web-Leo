/* ============================================================
   P3 · Unidad de Verdad — Interacciones Híbridas Premium
   - Comparador de modelos (clic)
   - Clasificación arrastrable
   - Mini quiz integrador
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const zona = document.getElementById("zona-interactiva");

  zona.innerHTML = `
    <div class="inter-bloque">

      <!-- BLOQUE 1: CLIC PARA ANALIZAR MODELOS -->
      <h3>1) Haz clic en cada modelo para analizarlo</h3>

      <div class="reveal-grid">
        <div class="reveal-card" data-info="m1">Modelo de Correspondencia</div>
        <div class="reveal-card" data-info="m2">Modelo de Coherencia</div>
        <div class="reveal-card" data-info="m3">Modelo Funcional</div>
      </div>

      <div id="reveal-output" class="reveal-output"></div>

      <hr class="divisor" />

      <!-- BLOQUE 2: DRAG & DROP -->
      <h3>2) Clasifica los ejemplos según su utilidad clínica</h3>
      <p>Arrastra cada ejemplo hacia “Funciona” o “No Funciona”.</p>

      <div class="drag-container">
        <div class="drag-col">
          <h4>No Funciona</h4>
          <div id="drop-mal" class="drop-zone"></div>
        </div>

        <div class="drag-col">
          <h4>Funciona</h4>
          <div id="drop-bien" class="drop-zone"></div>
        </div>
      </div>

      <div class="drag-items">
        <div class="drag-item" draggable="true" data-type="mal">
          “Es verdadero porque lo siento así.”
        </div>

        <div class="drag-item" draggable="true" data-type="mal">
          “Mi teoría es válida porque es muy coherente internamente.”
        </div>

        <div class="drag-item" draggable="true" data-type="bien">
          “Este análisis mejora mi capacidad de predecir el comportamiento del cliente.”
        </div>

        <div class="drag-item" draggable="true" data-type="bien">
          “Este modelo guía intervenciones efectivas en casos reales.”
        </div>
      </div>

      <hr class="divisor" />

      <!-- BLOQUE 3: MINI QUIZ -->
      <h3>3) Mini-Quiz de Integración</h3>

      <p>Selecciona la afirmación que describe el problema central de esta lección.</p>

      <div class="quiz-opciones">
        <button class="quiz-btn" data-correct="false">
          “Si un modelo suena coherente, es suficiente para usarlo.”
        </button>

        <button class="quiz-btn" data-correct="true">
          “Sin un criterio funcional, cualquier modelo parece válido aunque no ayude.”
        </button>

        <button class="quiz-btn" data-correct="false">
          “La verdad depende de lo que la mayoría crea.”
        </button>
      </div>

      <div id="quiz-resultado" class="quiz-resultado"></div>

    </div>
  `;

  iniciarRevealP3();
  iniciarDragP3();
  iniciarQuizP3();
});


/* ============================================================
   1. REVEAL — ANÁLISIS DE MODELOS
============================================================ */

function iniciarRevealP3() {
  const cards = document.querySelectorAll(".reveal-card");
  const out = document.getElementById("reveal-output");

  const textos = {
    m1: "El modelo de correspondencia falla porque asume representaciones internas que deben ‘coincidir’ con la realidad. No orienta acciones verificables.",
    m2: "El modelo de coherencia permite teorías elegantes pero inútiles. Que algo sea coherente no implica que funcione en la práctica.",
    m3: "El modelo funcional evalúa la verdad según su utilidad para generar predicción e influencia. Es el único criterio operativo."
  };

  cards.forEach(c => {
    c.addEventListener("click", () => {
      out.textContent = textos[c.dataset.info];
      out.classList.add("visible");
    });
  });
}


/* ============================================================
   2. DRAG & DROP — CLASIFICACIÓN
============================================================ */

function iniciarDragP3() {
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

      const correctoZone = (zone.id === "drop-bien" && tipo === "bien") ||
                           (zone.id === "drop-mal" && tipo === "mal");

      const card = document.createElement("div");
      card.className = "drop-item " + (correctoZone ? "correcto" : "incorrecto");
      card.textContent = texto;

      zone.appendChild(card);
    });
  });
}


/* ============================================================
   3. MINI QUIZ
============================================================ */

function iniciarQuizP3() {
  const botones = document.querySelectorAll(".quiz-btn");
  const res = document.getElementById("quiz-resultado");

  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      const ok = btn.dataset.correct === "true";

      if (ok) {
        res.textContent = "✔ Exacto: sin un criterio funcional, no hay forma de distinguir modelos útiles de los inútiles.";
        res.style.color = "#0a8f32";
      } else {
        res.textContent = "✘ Incorrecto. Esa afirmación no describe el problema epistemológico.";
        res.style.color = "#b30000";
      }
    });
  });
}

