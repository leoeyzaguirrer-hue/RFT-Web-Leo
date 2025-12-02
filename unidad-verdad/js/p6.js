/* ============================================================
   P6 · Unidad de Verdad — Interactividad Clínica Premium
   - Clic para analizar mini-casos
   - Drag & Drop de funciones conductuales
   - Mini-quiz clínico
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const zona = document.getElementById("zona-interactiva");

  zona.innerHTML = `
    <div class="inter-bloque">

      <!-- BLOQUE 1: MINI-CASOS (REVEAL) -->
      <h3>1) Haz clic en un caso para analizarlo</h3>

      <div class="reveal-grid">

        <div class="reveal-card" data-info="c1">
          Caso 1: Evitar reunión laboral
        </div>

        <div class="reveal-card" data-info="c2">
          Caso 2: Revisión compulsiva del celular
        </div>

        <div class="reveal-card" data-info="c3">
          Caso 3: Explosión emocional ante crítica
        </div>

      </div>

      <div id="reveal-output" class="reveal-output"></div>

      <hr class="divisor" />

      <!-- BLOQUE 2: DRAG & DROP — Relación conducta ↔ función -->
      <h3>2) Identifica la función de cada conducta</h3>
      <p>Arrastra la conducta hacia la función que mejor la describe.</p>

      <div class="drag-container">

        <div class="drag-col">
          <h4>Funciones basadas en evitación</h4>
          <div id="drop-evitacion" class="drop-zone"></div>
        </div>

        <div class="drag-col">
          <h4>Funciones basadas en obtención/refuerzo</h4>
          <div id="drop-refuerzo" class="drop-zone"></div>
        </div>

      </div>

      <div class="drag-items">
        <div class="drag-item" draggable="true" data-type="evitacion">
          Evita ir a la reunión para no sentir ansiedad.
        </div>

        <div class="drag-item" draggable="true" data-type="evitacion">
          Se retira de la conversación al sentirse incómodo.
        </div>

        <div class="drag-item" draggable="true" data-type="refuerzo">
          Busca recibir apoyo inmediato enviando mensajes.
        </div>

        <div class="drag-item" draggable="true" data-type="refuerzo">
          Usa el celular para obtener alivio social.
        </div>
      </div>

      <hr class="divisor" />

      <!-- BLOQUE 3: QUIZ CLÍNICO -->
      <h3>3) Mini-quiz clínico: ¿Qué define una buena hipótesis funcional?</h3>

      <div class="quiz-opciones">
        <button class="quiz-btn" data-correct="false">
          “Una hipótesis que describe emociones internas.”
        </button>

        <button class="quiz-btn" data-correct="true">
          “Una hipótesis que predice conducta y guía intervención.”
        </button>

        <button class="quiz-btn" data-correct="false">
          “Una hipótesis que suena profunda y profesional.”
        </button>
      </div>

      <div id="quiz-resultado" class="quiz-resultado"></div>

    </div>
  `;

  iniciarCasosP6();
  iniciarDragP6();
  iniciarQuizP6();
});


/* ============================================================
   1. MINI-CASOS — REVEAL
============================================================ */

function iniciarCasosP6() {
  const cards = document.querySelectorAll(".reveal-card");
  const out = document.getElementById("reveal-output");

  const textos = {
    c1: "El patrón se mantiene porque evita exposición social aversiva. Es una función de evitación negativa.",
    c2: "La conducta se refuerza por alivio inmediato y por contacto social. Función mixta: evitación y refuerzo.",
    c3: "La explosión reduce malestar momentáneo y cambia el comportamiento del entorno. Función doble: escape y control social."
  };

  cards.forEach(c => {
    c.addEventListener("click", () => {
      out.textContent = textos[c.dataset.info];
      out.classList.add("visible");
    });
  });
}


/* ============================================================
   2. DRAG & DROP — Funciones Conductuales
============================================================ */

function iniciarDragP6() {
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
        (zone.id === "drop-evitacion" && tipo === "evitacion") ||
        (zone.id === "drop-refuerzo" && tipo === "refuerzo");

      const card = document.createElement("div");
      card.className = "drop-item " + (correcto ? "correcto" : "incorrecto");
      card.textContent = texto;

      zone.appendChild(card);
    });
  });
}


/* ============================================================
   3. MINI-QUIZ
============================================================ */

function iniciarQuizP6() {
  const botones = document.querySelectorAll(".quiz-btn");
  const res = document.getElementById("quiz-resultado");

  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      const ok = btn.dataset.correct === "true";

      if (ok) {
        res.textContent =
          "✔ Correcto: una hipótesis funcional debe permitir predicción e intervención, no solo descripción mentalista.";
        res.style.color = "#0a8f32";
      } else {
        res.textContent =
          "✘ Incorrecto. Esa explicación no describe una hipótesis funcional.";
        res.style.color = "#b30000";
      }
    });
  });
}

