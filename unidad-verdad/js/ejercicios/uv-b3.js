// uv-b3.js · Bloque 3 — “Simulador Clínico: ¿Qué hago ahora?”
// Crea el ejercicio interactivo AUTOCORREGIBLE del Bloque 3

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("bloque-3-actividad");
    if (!contenedor) return;

    insertarEstilosB3();
    construirActividadB3(contenedor);
  });

  function insertarEstilosB3() {
    if (document.getElementById("uv-b3-styles")) return;

    const style = document.createElement("style");
    style.id = "uv-b3-styles";
    style.textContent = `
      .uv-b3-layout {
        display: grid;
        grid-template-columns: minmax(0, 1.4fr) minmax(0, 1.2fr);
        gap: 18px;
        align-items: stretch;
      }

      @media (max-width: 900px) {
        .uv-b3-layout {
          grid-template-columns: 1fr;
        }
      }

      .uv-b3-caso {
        background: rgba(255, 255, 255, 0.94);
        border-radius: 18px;
        padding: 16px 18px;
        box-shadow: 0 10px 22px rgba(0, 0, 0, 0.06);
        border: 1px solid rgba(10, 42, 92, 0.10);
      }

      .uv-b3-caso-titulo {
        font-size: 0.9rem;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        opacity: 0.8;
        margin-bottom: 4px;
      }

      .uv-b3-caso-texto {
        font-size: 0.97rem;
        line-height: 1.55;
        margin-bottom: 10px;
      }

      .uv-b3-instruccion {
        font-size: 0.9rem;
        opacity: 0.85;
      }

      .uv-b3-opciones {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .uv-b3-opcion {
        position: relative;
        border-radius: 999px;
        padding: 9px 16px 9px 40px;
        border: 1px solid rgba(10, 42, 92, 0.18);
        background: linear-gradient(135deg, rgba(255,255,255,0.96), rgba(233,239,248,0.96));
        cursor: pointer;
        font-size: 0.94rem;
        text-align: left;
        transition: transform 0.12s ease, box-shadow 0.12s ease, border-color 0.12s ease;
      }

      .uv-b3-opcion::before {
        content: "●";
        position: absolute;
        left: 14px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.65rem;
        opacity: 0.8;
      }

      .uv-b3-opcion:hover {
        transform: translateY(-1px);
        box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
      }

      .uv-b3-opcion-correcta {
        border-color: rgba(253, 191, 18, 0.9);
        box-shadow: 0 10px 24px rgba(253, 191, 18, 0.4);
        background: radial-gradient(circle at 0% 0%, rgba(253,191,18,0.25), transparent 55%),
                    linear-gradient(135deg, #FFFDF5, #FFF7DA);
      }

      .uv-b3-opcion-incorrecta {
        border-color: rgba(180, 34, 34, 0.65);
        background: linear-gradient(135deg, #FFF6F6, #FFEAEA);
      }

      .uv-b3-opcion-desactivada {
        opacity: 0.6;
        cursor: default;
        box-shadow: none;
      }

      .uv-b3-feedback {
        margin-top: 10px;
        font-size: 0.9rem;
        min-height: 2.2em;
      }

      .uv-b3-feedback-error {
        color: #9b1c1c;
      }

      .uv-b3-feedback-ok {
        color: #0f5132;
      }

      .uv-b3-panel-funcional {
        border-radius: 18px;
        padding: 14px 16px;
        background: radial-gradient(circle at top left, rgba(253,191,18,0.28), transparent 55%),
                    rgba(6, 30, 64, 0.94);
        color: #fdfdfd;
        display: none;
        flex-direction: column;
        gap: 8px;
        box-shadow: 0 14px 28px rgba(0,0,0,0.35);
      }

      .uv-b3-panel-header {
        font-size: 0.9rem;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        opacity: 0.92;
      }

      .uv-b3-pill-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }

      .uv-b3-pill {
        border-radius: 999px;
        padding: 4px 10px;
        font-size: 0.8rem;
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.22);
      }

      .uv-b3-resumen-final {
        margin-top: 10px;
        font-size: 0.9rem;
        font-weight: 500;
      }
    `;
    document.head.appendChild(style);
  }

  function construirActividadB3(contenedor) {
    contenedor.innerHTML = "";

    const layout = document.createElement("div");
    layout.className = "uv-b3-layout";

    // Columna izquierda: caso clínico
    const colIzquierda = document.createElement("div");
    colIzquierda.className = "uv-b3-caso";
    colIzquierda.innerHTML = `
      <div class="uv-b3-caso-titulo">Caso clínico</div>
      <p class="uv-b3-caso-texto">
        En sesión, M. dice que evita reuniones porque “no soporta sentirse observada”.
        Suele cancelar citas y pide disculpas excesivamente.
      </p>
      <p class="uv-b3-instruccion">
        Imagina que estás en el lugar del terapeuta. ¿Qué decisión te ayuda más
        a intervenir según el criterio pragmático de verdad?
      </p>
    `;

    // Columna derecha: opciones + feedback + panel
    const colDerecha = document.createElement("div");

    const opciones = document.createElement("div");
    opciones.className = "uv-b3-opciones";

    const dataOpciones = [
      {
        id: "autoestima",
        icono: "🧠",
        texto: "Explorar baja autoestima y posibles creencias negativas sobre sí misma."
      },
      {
        id: "historia",
        icono: "📚",
        texto: "Investigar con detalle su historia en la infancia y experiencias pasadas."
      },
      {
        id: "funcion",
        icono: "🎯",
        texto: "Identificar la función actual de evitar reuniones en la vida de M."
      }
    ];

    dataOpciones.forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "uv-b3-opcion";
      btn.dataset.opcion = opt.id;
      btn.innerHTML = `<strong>${opt.icono}</strong> ${opt.texto}`;
      opciones.appendChild(btn);
    });

    const feedback = document.createElement("div");
    feedback.className = "uv-b3-feedback";

    const panelFuncional = document.createElement("div");
    panelFuncional.className = "uv-b3-panel-funcional";
    panelFuncional.innerHTML = `
      <div class="uv-b3-panel-header">Panel funcional · Ejemplo de análisis</div>
      <div class="uv-b3-pill-row">
        <span class="uv-b3-pill">🎯 Conducta: cancelar reuniones</span>
        <span class="uv-b3-pill">⚡ Consecuencia: alivio inmediato del malestar</span>
        <span class="uv-b3-pill">🔄 Patrón: evitación social mantenida</span>
        <span class="uv-b3-pill">🧭 Punto de intervención: exposición graduada y trabajo con valores</span>
      </div>
      <div class="uv-b3-resumen-final">
        Una conceptualización es “verdadera” en contextualismo funcional cuando
        aumenta tu capacidad para intervenir de forma efectiva, no cuando descubre
        una causa interna definitiva.
      </div>
    `;

    colDerecha.appendChild(opciones);
    colDerecha.appendChild(feedback);
    colDerecha.appendChild(panelFuncional);

    layout.appendChild(colIzquierda);
    layout.appendChild(colDerecha);

    contenedor.appendChild(layout);

    // Lógica de interacción
    const botones = opciones.querySelectorAll(".uv-b3-opcion");
    let yaRespondioCorrecto = false;

    botones.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (yaRespondioCorrecto) return;

        const esCorrecta = btn.dataset.opcion === "funcion";

        botones.forEach((b) => {
          b.classList.remove("uv-b3-opcion-correcta", "uv-b3-opcion-incorrecta");
        });

        if (!esCorrecta) {
          btn.classList.add("uv-b3-opcion-incorrecta");
          feedback.textContent =
            "Esta explicación puede sonar sofisticada, pero no guía una intervención concreta. Es descripción sin utilidad clínica.";
          feedback.classList.remove("uv-b3-feedback-ok");
          feedback.classList.add("uv-b3-feedback-error");
        } else {
          yaRespondioCorrecto = true;
          btn.classList.add("uv-b3-opcion-correcta");
          feedback.textContent =
            "Esta decisión se centra en la función actual de la conducta y abre camino a un análisis e intervención contextual.";
          feedback.classList.remove("uv-b3-feedback-error");
          feedback.classList.add("uv-b3-feedback-ok");

          // Desactivar resto de botones
          botones.forEach((b) => {
            if (b !== btn) {
              b.classList.add("uv-b3-opcion-desactivada");
              b.disabled = true;
            }
          });

          // Mostrar panel funcional
          panelFuncional.style.display = "flex";
        }
      });
    });
  }
})();

