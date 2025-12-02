/* ============================================================
   P2 · Unidad de Verdad — Interacciones Híbridas Premium
   - Drag & Drop (criterios)
   - Clic para revelar análisis
   - Mini-quiz de integración
============================================================ */

/* ============================================================
   1. RENDER PRINCIPAL — Se inyecta en #zona-interactiva
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const zona = document.getElementById("zona-interactiva");

  zona.innerHTML = `
    <div class="inter-bloque">

      <h3>1) Clasifica los criterios de verdad</h3>
      <p>Arrastra cada criterio al grupo correspondiente.</p>

      <div class="drag-container">

        <div class="drag-col">
          <h4>Criterios problemáticos</h4>
          <div id="drop-problematicos" class="drop-zone"></div>
        </div>

        <div class="drag-col">
          <h4>Criterio pragmático/funcional</h4>
          <div id="drop-funcional" class="drop-zone"></div>
        </div>

      </div>

      <div class="drag-items">
        <div class="drag-item" draggable="true" data-type="problematico">Correspondencia literal</div>
        <div class="drag-item" draggable="true" data-type="problematico">Coherencia lógica interna</div>
        <div class="drag-item" draggable="true" data-type="funcional">Lo que permite predecir/influir conducta</div>
        <div class="drag-item" draggable="true" data-type="problematico">Intuición o “se siente verdadero”</div>
      </div>


      <hr class="divisor" />

      <h3>2) Haz clic para revelar el análisis</h3>
      <p>Elige un criterio y observa su explicación funcional.</p>

      <div class="reveal-grid">
        <div class="reveal-card" data-info="c1">Correspondencia literal</div>
        <div class="reveal-card" data-info="c2">Coherencia interna</div>
        <div class="reveal-card" data-info="c3">Criterio funcional</div>
      </div>

      <div id="reveal-output" class="reveal-output"></div>

      <hr class="divisor" />

      <h3>3) Mini-quiz integrador</h3>
      <p>Selecciona la opción que refleja mejor el criterio funcional de verdad.</p>

      <div class="quiz-opciones">
        <button class="quiz-btn" data-correct="false">“Lo verdadero es lo que corresponde con una realidad interna.”</button>
        <button class="quiz-btn" data-correct="true">“Verdadero es lo que mejora nuestra capacidad de predicción e influencia.”</button>
        <button class="quiz-btn" data-correct="false">“Verdadero es lo que suena convincente.”</button>
      </div>

      <div id="quiz-resultado" class="quiz-resultado"></div>

    </div>
  `;

  iniciarDragAndDrop();
  iniciarReveal();
  iniciarQuiz();
});


/* ============================================================
   2. DRAG & DROP
============================================================ */

function iniciarDragAndDrop() {
  const items = document.querySelectorAll(".drag-item");
  const zones = document.querySelectorAll(".drop-zone");

  items.forEach(item => {
    item.addEventListener("dragstart", e => {
      e.dataTransfer.setData("type", item.dataset.type);
      e.dataTransfer.setData("text", item.textContent);
    });
  });

  zones.forEach(zone => {
    zone.addEventListener("dragover", e => e.preventDefault());

    zone.addEventListener("drop", e => {
      e.preventDefault();
      const type = e.dataTransfer.getData("type");
      const text = e.dataTransfer.getData("text");

      const isFuncionalZone = zone.id === "drop-funcional";
      const isFunctionalItem = type === "funcional";

      // Crear tarjeta nueva
      const newCard = document.createElement("div");
      newCard.className = "drop-item";
      newCard.textContent = text;

      // Verificar si está en la zona correcta
      if ((isFuncionalZone && isFunctionalItem) ||
          (!isFuncionalZone && !isFunctionalItem)) {
        newCard.classList.add("correcto");
      } else {
        newCard.classList.add("incorrecto");
      }

      zone.appendChild(newCard);
    });
  });
}


/* ============================================================
   3. CLIC PARA REVELAR
============================================================ */

function iniciarReveal() {
  const cards = document.querySelectorAll(".reveal-card");
  const output = document.getElementById("reveal-output");

  const explicaciones = {
    c1: "La correspondencia literal falla porque ignora el contexto y la función. Algo puede corresponder a un hecho pero no servir para predecir ni influir la conducta.",
    c2: "La coherencia interna tampoco basta: un sistema puede ser perfectamente coherente y, aun así, inútil para intervenir en problemas reales.",
    c3: "El criterio funcional evalúa la verdad según su utilidad: ¿mejora la predicción y la influencia conductual en una dirección definida? Ese es el estándar contextualista."
  };

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const key = card.dataset.info;
      output.textContent = explicaciones[key];
      output.classList.add("visible");
    });
  });
}


/* ============================================================
   4. MINI QUIZ
============================================================ */

function iniciarQuiz() {
  const botones = document.querySelectorAll(".quiz-btn");
  const resultado = document.getElementById("quiz-resultado");

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const correcto = boton.dataset.correct === "true";

      if (correcto) {
        resultado.textContent = "✔ Correcto: el criterio funcional define verdad como lo que permite predecir e influir eficazmente.";
        resultado.style.color = "#0a8f32";
      } else {
        resultado.textContent = "✘ Incorrecto. Ese criterio no permite análisis funcional ni orienta la acción.";
        resultado.style.color = "#b30000";
      }
    });
  });
}

