/* ============================================================
   VARIABLES GLOBALES
============================================================ */
let currentScreen = 1;
const totalScreens = 8;

/* ============================================================
   INICIALIZACIÓN
============================================================ */
document.addEventListener("DOMContentLoaded", () => {

  // 1. Crear las 8 pantallas base con plantilla de dos columnas
  createPremiumScreens();

  // 2. Sobrescribir la pantalla 1 con la portada
  loadPortadaUnidadAnalisis();

  // 3. EJEMPLO: convertir la Pantalla 3 en plantilla Full-Width
  loadFullWidthScreen(3, `
    <div class="full-screen">
      <div class="full-screen-title">Unidad de Análisis</div>
      <div class="full-screen-sub">Fundamento técnico · Enfoque funcional-contextual</div>

      <p class="full-screen-text">
        La unidad de análisis no es un diagnóstico ni una categoría descriptiva. 
        Es un recorte funcional del comportamiento en contexto, diseñado para responder 
        a preguntas de cambio clínico. La clave es identificar qué conducta ocurre, 
        en qué condiciones y qué consecuencias la mantienen.
      </p>

      <p class="full-screen-text">
        Desde ACT y RFT, analizar la conducta implica examinar funciones derivadas, 
        reglas verbales, historia de aprendizaje, y marcos relacionales que modulan 
        la respuesta actual. Este enfoque permite intervenir con precisión, 
        más allá de etiquetas como “ansiedad social” o “evitación”.
      </p>

      <p class="full-screen-text">
        Una buena unidad de análisis es lo suficientemente pequeña para ser manejable 
        y lo suficientemente rica para guiar decisiones terapéuticas. 
        En la práctica, esto significa capturar la interacción entre antecedentes, 
        acciones y consecuencias inmediatas y remotas.
      </p>
    </div>
  `);

  // 4. Mostrar la primera pantalla
  showScreen(1);

  // 5. Activar navegación
  setupNavigation();
});

/* ============================================================
   CREACIÓN DE LAS PANTALLAS BASE (PLANTILLA 2 COLUMNAS)
============================================================ */
function createPremiumScreens() {
  const container = document.getElementById("screen-container");
  if (!container) return;

  for (let i = 1; i <= totalScreens; i++) {
    const screen = document.createElement("div");
    screen.className = "premium-screen screen";
    screen.id = `screen-${i}`;

    // Plantilla por defecto → dos columnas
    screen.innerHTML = `
      <div class="screen-grid">
        <div class="screen-left"></div>
        <div class="screen-right"></div>
      </div>
    `;

    container.appendChild(screen);
  }
}

/* ============================================================
   FUNCIÓN GENÉRICA PARA PLANTILLA FULL-WIDTH
============================================================ */
/**
 * Reemplaza el contenido de una pantalla por HTML full-width.
 * @param {number} num - número de pantalla (1-8)
 * @param {string} htmlContent - bloque HTML que irá dentro de .full-screen
 */
function loadFullWidthScreen(num, htmlContent) {
  const screen = document.getElementById(`screen-${num}`);
  if (!screen) return;

  screen.innerHTML = `
    <div class="full-screen ua-fade-in">
      ${htmlContent}
    </div>
  `;
}

/* ============================================================
   PORTADA DE LA UNIDAD (Pantalla 1)
============================================================ */
function loadPortadaUnidadAnalisis() {
  const screen = document.getElementById("screen-1");
  if (!screen) return;

  screen.innerHTML = `
    <div class="full-screen">
      <div class="full-screen-title">Unidad de Análisis</div>
      <div class="full-screen-sub">Exploración técnica · ACT · RFT</div>
      <p class="full-screen-text">
        Esta unidad te introduce en la lógica del contextualismo funcional: 
        comprender la conducta como una relación entre acciones, condiciones 
        y consecuencias. Aquí aprenderás a construir un recorte funcional 
        que guíe tu intervención clínica.
      </p>
    </div>
  `;
}

/* ============================================================
   FUNCIÓN DE NAVEGACIÓN ENTRE PANTALLAS
============================================================ */
function showScreen(num) {
  for (let i = 1; i <= totalScreens; i++) {
    const s = document.getElementById(`screen-${i}`);
    if (s) s.style.display = "none";
  }

  const current = document.getElementById(`screen-${num}`);
  if (current) {
    current.style.display = "block";

    // Fade-in automático
    setTimeout(() => current.classList.add("ua-visible"), 10);
  }
}

function setupNavigation() {
  const prev = document.getElementById("btn-prev");
  const next = document.getElementById("btn-next");

  if (prev) {
    prev.addEventListener("click", () => {
      if (currentScreen > 1) {
        currentScreen--;
        showScreen(currentScreen);
      }
    });
  }

  if (next) {
    next.addEventListener("click", () => {
      if (currentScreen < totalScreens) {
        currentScreen++;
        showScreen(currentScreen);
      }
    });
  }
}
