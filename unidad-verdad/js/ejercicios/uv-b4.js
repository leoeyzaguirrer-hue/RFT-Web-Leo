// uv-b4.js · Bloque 4 — “Museo de los Criterios de Verdad”
// Actividad exploratoria: 4 puertas, se desbloquea mensaje final al visitar todas

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("bloque-4-actividad");
    if (!contenedor) return;

    insertarEstilosB4();
    construirActividadB4(contenedor);
  });

  function insertarEstilosB4() {
    if (document.getElementById("uv-b4-styles")) return;

    const style = document.createElement("style");
    style.id = "uv-b4-styles";
    style.textContent = `
      .uv-b4-layout {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }

      .uv-b4-intro {
        font-size: 0.9rem;
        opacity: 0.9;
      }

      .uv-b4-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 12px;
        margin-top: 6px;
      }

      @media (max-width: 960px) {
        .uv-b4-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 640px) {
        .uv-b4-grid {
          grid-template-columns: 1fr;
        }
      }

      .uv-b4-door {
        position: relative;
        border-radius: 18px;
        padding: 12px 10px 14px;
        text-align: center;
        cursor: pointer;
        border: 1px solid rgba(10,42,92,0.18);
        background:
          radial-gradient(circle at top, rgba(255,255,255,0.8), transparent 58%),
          linear-gradient(150deg, #f7fbff, #e3edf9);
        box-shadow: 0 8px 20px rgba(0,0,0,0.06);
        transition: transform 0.12s ease, box-shadow 0.12s ease, border-color 0.12s ease;
        font-size: 0.9rem;
      }

      .uv-b4-door:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 26px rgba(0,0,0,0.10);
      }

      .uv-b4-door-titulo {
        font-weight: 600;
        margin-top: 2px;
      }

      .uv-b4-door-icono {
        font-size: 1.4rem;
      }

      .uv-b4-door-visited {
        border-color: rgba(253,191,18,0.9);
        box-shadow: 0 10px 24px rgba(253,191,18,0.4);
      }

      .uv-b4-door-check {
        position: absolute;
        top: 7px;
        right: 10px;
        font-size: 0.95rem;
        opacity: 0.0;
        transition: opacity 0.15s ease;
      }

      .uv-b4-door-visited .uv-b4-door-check {
        opacity: 1;
      }

      .uv-b4-info {
        margin-top: 8px;
        border-radius: 16px;
        padding: 12px 14px;
        background: rgba(255,255,255,0.96);
        border: 1px solid rgba(10,42,92,0.10);
        box-shadow: 0 8px 20px rgba(0,0,0,0.05);
        font-size: 0.9rem;
      }

      .uv-b4-info-titulo {
        font-weight: 600;
        margin-bottom: 4px;
      }

      .uv-b4-info-fila {
        margin-bottom: 4px;
      }

      .uv-b4-info-label {
        font-weight: 600;
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        opacity: 0.85;
      }

      .uv-b4-final {
        margin-top: 10px;
        border-radius: 18px;
        padding: 12px 16px;
        background:
          radial-gradient(circle at left, rgba(253,191,18,0.35), transparent 55%),
          linear-gradient(135deg, #051632, #0b2447);
        color: #fdfdfd;
        display: none;
        font-size: 0.9rem;
        box-shadow: 0 14px 30px rgba(0,0,0,0.4);
      }

      .uv-b4-final-titulo {
        font-size: 0.95rem;
        font-weight: 600;
        margin-bottom: 4px;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }
    `;
    document.head.appendChild(style);
  }

  function construirActividadB4(contenedor) {
    contenedor.innerHTML = "";

    const layout = document.createElement("div");
    layout.className = "uv-b4-layout";

    const intro = document.createElement("p");
    intro.className = "uv-b4-intro";
    intro.textContent =
      "Explora las cuatro puertas. Cada una representa un criterio de verdad que ha influido en la psicología. Tu tarea es visitarlas todas para ver qué lugar ocupa el pragmatismo funcional en este ‘museo’.";

    const grid = document.createElement("div");
    grid.className = "uv-b4-grid";

    const info = document.createElement("div");
    info.className = "uv-b4-info";
    info.innerHTML = `
      <div class="uv-b4-info-titulo">Haz clic en una puerta para ver su descripción.</div>
      <div class="uv-b4-info-fila">
        <span class="uv-b4-info-label">Ejemplo clínico:</span>
        <span>Selecciona una puerta para mostrar un ejemplo.</span>
      </div>
      <div class="uv-b4-info-fila">
        <span class="uv-b4-info-label">Supuesto clave:</span>
        <span>—</span>
      </div>
      <div class="uv-b4-info-fila">
        <span class="uv-b4-info-label">Limitación:</span>
        <span>—</span>
      </div>
    `;

    const panelFinal = document.createElement("div");
    panelFinal.className = "uv-b4-final";
    panelFinal.innerHTML = `
      <div class="uv-b4-final-titulo">
        Todas las puertas exploradas · Museo completo
      </div>
      <p>
        La Ciencia Conductual Contextual trata la verdad como una cuestión de función.
        El pragmatismo funcional pregunta qué hace una descripción en la práctica:
        si alivia sufrimiento y guía acción valiosa, se la considera “verdadera” en el
        sentido relevante para la psicoterapia. Desde aquí continúa la siguiente lección.
      </p>
    `;

    const criterios = [
      {
        id: "correspondencia",
        icono: "🏛️",
        titulo: "Correspondencia",
        ejemplo:
          "“La depresión se explica por un déficit serotoninérgico medible”",
        supuesto:
          "La teoría es verdadera cuando describe con precisión una entidad interna real; el síntoma refleja un estado subyacente.",
        limitacion:
          "Aunque ofrece sensación de certeza ontológica, rara vez indica qué hacer con el consultante aquí-y-ahora; la correspondencia no garantiza una intervención funcional."
      },
      {
        id: "coherencia",
        icono: "📘",
        titulo: "Coherencia",
        ejemplo:
          "“El comportamiento actual encaja con la etapa 3 del desarrollo socioemocional.”",
        supuesto:
          "Una descripción es verdadera si se integra sin contradicciones dentro de un sistema conceptual previo.",
        limitacion:
          "Facilita narrativas ordenadas, pero puede producir explicaciones impecables sin impacto clínico directo; coherencia ≠ guía para intervenir."
      },
      {
        id: "causalidad",
        icono: "⚙️",
        titulo: "Causalidad mecanicista",
        ejemplo:
          "“La evitación surge por la activación de un sesgo cognitivo automático.”",
        supuesto:
          "La conducta se entiende como resultado de engranajes internos —módulos, mecanismos, circuitos— que producen efectos conductuales.",
        limitacion:
          "Aísla causas internas, pero no capta la variabilidad funcional ni orienta decisiones en tiempo real; explica mucho, guía poco."
      },
      {
        id: "pragmatismo",
        icono: "🎯",
        titulo: "Pragmatismo funcional",
        ejemplo:
          "“Es verdadero aquello que permite intervenir eficazmente y promover acción valiosa.”",
        supuesto:
          "Verdad como éxito práctico: análisis que aumentan precisión, alcance y profundidad de la intervención.",
        limitacion:
          "Exige monitoreo constante de resultados: ninguna formulación queda protegida por principios abstractos."
      }
    ];

    criterios.forEach((c) => {
      const puerta = document.createElement("button");
      puerta.type = "button";
      puerta.className = "uv-b4-door";
      puerta.dataset.criterio = c.id;
      puerta.innerHTML = `
        <div class="uv-b4-door-check">✨</div>
        <div class="uv-b4-door-icono">${c.icono}</div>
        <div class="uv-b4-door-titulo">${c.titulo}</div>
      `;
      grid.appendChild(puerta);
    });

    layout.appendChild(intro);
    layout.appendChild(grid);
    layout.appendChild(info);
    layout.appendChild(panelFinal);

    contenedor.appendChild(layout);

    const puertas = grid.querySelectorAll(".uv-b4-door");

    puertas.forEach((puerta) => {
      puerta.addEventListener("click", () => {
        const id = puerta.dataset.criterio;
        const crit = criterios.find((c) => c.id === id);
        if (!crit) return;

        // Marcar puerta como visitada
        puerta.classList.add("uv-b4-door-visited");
        puerta.setAttribute("data-visitada", "true");

        // Actualizar tarjeta de información
        info.innerHTML = `
          <div class="uv-b4-info-titulo">${crit.icono} ${crit.titulo}</div>
          <div class="uv-b4-info-fila">
            <span class="uv-b4-info-label">Ejemplo clínico:</span>
            <span>${crit.ejemplo}</span>
          </div>
          <div class="uv-b4-info-fila">
            <span class="uv-b4-info-label">Supuesto clave:</span>
            <span>${crit.supuesto}</span>
          </div>
          <div class="uv-b4-info-fila">
            <span class="uv-b4-info-label">Limitación:</span>
            <span>${crit.limitacion}</span>
          </div>
        `;

        comprobarVisitasCompletas(puertas, panelFinal);
      });
    });
  }

  function comprobarVisitasCompletas(puertas, panelFinal) {
    const todasVisitadas = Array.from(puertas).every(
      (p) => p.getAttribute("data-visitada") === "true"
    );
    if (todasVisitadas) {
      panelFinal.style.display = "block";
    }
  }
})();

