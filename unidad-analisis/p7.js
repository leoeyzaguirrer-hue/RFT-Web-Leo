// p7.js — Integración y puente al siguiente módulo · Unidad de Análisis

document.addEventListener("DOMContentLoaded", () => {
  // ==========================
  // 1. Animación de entrada
  // ==========================
  setTimeout(() => {
    document.querySelectorAll(".ua-fade-in").forEach(el => {
      el.classList.add("ua-visible");
    });
  }, 160);

  // ==========================
  // 2. Acordeón clásico
  // ==========================
  const accHeaders = document.querySelectorAll(".ua-acc-header");

  accHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const panel = header.nextElementSibling;
      const isOpen = header.classList.contains("ua-acc-open");

      // Cerrar todos
      accHeaders.forEach(h => {
        h.classList.remove("ua-acc-open");
        const p = h.nextElementSibling;
        if (p) p.style.maxHeight = null;
      });

      // Abrir el que se clicó (si estaba cerrado)
      if (!isOpen) {
        header.classList.add("ua-acc-open");
        if (panel) {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      }
    });
  });

  // Abrir por defecto el primer acordeón
  if (accHeaders[0]) {
    accHeaders[0].click();
  }

  // ==========================
  // 3. Mapa conceptual (nodos)
  // ==========================
  const nodeButtons = document.querySelectorAll(".ua-map-node");
  const mapConnection = document.getElementById("ua-map-connection");
  let lastNode = null;

  // Mensajes para pares de nodos
  const pairMessages = {
    "abc-clase": "Varios episodios ABC con consecuencias similares pueden agruparse en una clase funcional.",
    "abc-patron": "Los patrones son la acumulación organizada de muchos episodios ABC a lo largo del tiempo.",
    "abc-lenguaje": "Los eventos verbales pueden ser antecedentes, consecuencias o parte de la B dentro del ABC.",
    "abc-valores": "Los valores ayudan a decidir qué unidades ABC son relevantes para la vida que la persona quiere construir.",
    "abc-evitacion": "La evitación experiencial suele verse como una clase de respuestas B ante ciertos antecedentes internos o externos.",

    "clase-patron": "Un patrón amplio puede incluir varias clases funcionales que se repiten en distintas áreas de la vida.",
    "clase-lenguaje": "El lenguaje organiza clases funcionales al relacionar contextos, acciones y consecuencias bajo historias compartidas.",
    "clase-valores": "Ver clases funcionales permite distinguir patrones alejados de valores de los que se acercan a ellos.",
    "clase-evitacion": "La evitación experiencial es una clase funcional que puede aparecer con múltiples topografías distintas.",

    "patron-lenguaje": "Las reglas y narrativas personales pueden sostener patrones durante años incluso si cambian las situaciones concretas.",
    "patron-valores": "Analizar patrones en el tiempo ayuda a ver el impacto de la conducta en la trayectoria vital y en los valores.",
    "patron-evitacion": "Patrones de evitación experiencial suelen consolidarse cuando a corto plazo hay alivio y a largo plazo hay empobrecimiento vital.",

    "lenguaje-valores": "El lenguaje puede acercar a valores (formulación de compromisos) o alejarlos (reglas rígidas de autoevaluación).",
    "lenguaje-evitacion": "La fusión con historias de amenaza o incapacidad alimenta clases funcionales de evitación experiencial.",
    "valores-evitacion": "Muchos dilemas clínicos son conflictos entre evitar malestar y acercarse a lo que importa."
  };

  nodeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const currentNode = btn.dataset.node;

      // Marcar visualmente
      nodeButtons.forEach(b => b.classList.remove("ua-map-selected"));
      btn.classList.add("ua-map-selected");

      if (!mapConnection) return;

      if (lastNode && lastNode !== currentNode) {
        const key = [lastNode, currentNode].sort().join("-");
        const msg =
          pairMessages[key] ||
          "Estas dos piezas también pueden conectarse funcionalmente. Piensa cómo se influyen en un caso clínico concreto.";

        mapConnection.textContent = msg;
      } else {
        mapConnection.textContent =
          "Ahora toca otro nodo distinto para ver cómo se relacionan.";
      }

      lastNode = currentNode;
    });
  });

  // ==========================
  // 4. Integración experimento p5 (hospital)
  // ==========================
  const integrationBox = document.getElementById("ua-p5-integration");

  if (integrationBox) {
    const aversivo = localStorage.getItem("p5-estimulo-aversivo");
    const rolRecuerdo = localStorage.getItem("p5-rol-recuerdo");

    if (!aversivo && !rolRecuerdo) {
      // No hay datos guardados; dejamos el texto que ya está en el HTML
    } else {
      let html = `
        <div class="ua-example-block">
          <div class="ua-example-label">Parte 1 · Estímulo que se vuelve aversivo</div>
      `;

      if (aversivo) {
        html += `
          <p class="ua-text-small">
            <strong>Tu elección sobre estímulo potencialmente aversivo:</strong><br />
            ${aversivo}
          </p>
          <p class="ua-text-small">
            Desde RFT, un estímulo como la foto de un hospital puede adquirir
            <strong>función aversiva</strong> por su relación con palabras e historias
            de peligro o pérdida (por ejemplo, el recuerdo de la abuela que falleció
            allí), aun cuando en ese hospital concreto no haya pasado nada malo.
          </p>
        `;
      } else {
        html += `
          <p class="ua-text-small">
            No encontramos tu respuesta para esta parte del ejercicio, pero la idea
            central es que un estímulo neutro puede volverse aversivo por sus
            <strong>relaciones verbales</strong> con otros eventos.
          </p>
        `;
      }

      html += `</div>`;

      html += `
        <div class="ua-example-block">
          <div class="ua-example-label">Parte 2 · Rol del recuerdo verbal</div>
      `;

      if (rolRecuerdo) {
        html += `
          <p class="ua-text-small">
            <strong>Tu idea sobre el rol del recuerdo:</strong><br />
            ${rolRecuerdo}
          </p>
          <p class="ua-text-small">
            Funcionalmente, el recuerdo verbal no “reproduce” emociones internas como
            si apretáramos un botón; más bien <strong>transforma la función</strong> de
            los estímulos presentes: olores, lugares, sonidos, imágenes. Esto explica
            por qué ciertos contextos pueden volverse de trauma, vergüenza o calma
            sin entrenamiento directo evidente.
          </p>
        `;
      } else {
        html += `
          <p class="ua-text-small">
            Aunque no encontremos tu respuesta específica, lo relevante es ver el
            recuerdo como un <strong>evento verbal</strong> que reorganiza qué
            estímulos funcionan como amenaza, seguridad o cuidado.
          </p>
        `;
      }

      html += `
          <p class="ua-text-small ua-hint">
            Clave integradora: los modelos que incluyen estas transformaciones de
            función son más útiles para predecir e influir la conducta que las
            explicaciones puramente internas.
          </p>
        </div>
      `;

      integrationBox.innerHTML = html;
    }
  }

  // ==========================
  // 5. Elección de descripción (caso Laura)
  // ==========================
  const lauraButtons = document.querySelectorAll(".ua-laura-choice");
  const lauraFeedback = document.getElementById("ua-laura-feedback");

  if (lauraButtons && lauraFeedback) {
    lauraButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const choice = btn.dataset.choice;

        lauraButtons.forEach(b => b.classList.remove("ua-mini-selected"));
        btn.classList.add("ua-mini-selected");

        if (choice === "funcional") {
          lauraFeedback.textContent =
            "El análisis funcional ofrece más pistas concretas para intervenir en las primeras sesiones: muestra antecedentes, acciones, consecuencias y la clase de evitación experiencial. En el próximo módulo, conectaremos esto con el criterio pragmático de verdad: modelos se valoran por lo que permiten hacer.";
        } else if (choice === "diagnostico") {
          lauraFeedback.textContent =
            "Las etiquetas diagnósticas pueden ser útiles para comunicación general, pero dicen poco sobre qué hacer en sesión. El análisis funcional suele ser más potente para diseñar intervenciones. En el siguiente módulo veremos cómo el criterio pragmático de verdad nos ayuda a evaluar estas descripciones.";
        }
      });
    });
  }
});
