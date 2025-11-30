/* ============================================================
   p6.js — Pantalla 6 · Caso de Laura · Unidad de Análisis
   — Acordeones
   — Colocación de tarjetas (click → contenedor)
   — Mini experimento verbal
   — Actividad reflexiva
   — Elección de clase funcional
============================================================ */

/* ============================================================
   ACORDEONES
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const accHeaders = document.querySelectorAll(".ua-acc-header");

  accHeaders.forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      const isOpen = btn.classList.contains("ua-acc-open");

      // Cerrar todos
      accHeaders.forEach((b) => {
        b.classList.remove("ua-acc-open");
        const p = b.nextElementSibling;
        if (p) p.style.maxHeight = null;
      });

      // Abrir el seleccionado (si estaba cerrado)
      if (!isOpen && panel) {
        btn.classList.add("ua-acc-open");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  /* ============================================================
     TARJETAS · CLICK → CONTENEDOR
  ============================================================ */
  const tagsPanel = document.getElementById("ua-tags-laura");
  const tags = tagsPanel ? tagsPanel.querySelectorAll(".ua-tag") : [];
  const boxes = document.querySelectorAll(".ua-container-box .ua-box-body");
  let selectedTag = null;

  // Seleccionar tarjeta
  tags.forEach((tag) => {
    tag.addEventListener("click", () => {
      if (tag.classList.contains("ua-tag-placed")) return;

      tags.forEach((t) => t.classList.remove("active"));
      tag.classList.add("active");
      selectedTag = tag;
    });
  });

  // Colocar tarjeta en contenedor
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (!selectedTag) return;

      const clone = selectedTag.cloneNode(true);
      clone.classList.add("ua-tag-placed");
      clone.classList.remove("active");
      box.appendChild(clone);

      selectedTag.classList.add("ua-tag-placed");
      selectedTag.style.opacity = "0.4";
      selectedTag.style.pointerEvents = "none";

      selectedTag = null;
      tags.forEach((t) => t.classList.remove("active"));
    });
  });

  /* ============================================================
     MINI EXPERIMENTO · BOTONES
  ============================================================ */
  const expButtons = document.querySelectorAll(".ua-exp-btn");
  const expOutput = document.getElementById("ua-exp-output");

  expButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!expOutput) return;

      expButtons.forEach((b) => b.classList.remove("ua-context-active"));
      btn.classList.add("ua-context-active");

      const type = btn.dataset.exp;

      if (type === "sin-pensamiento") {
        expOutput.textContent =
          "Si quitamos el pensamiento anticipatorio, la reunión puede funcionar más como un evento neutro " +
          "o moderadamente ansiógeno. La probabilidad de evitación puede disminuir, pero las contingencias " +
          "de alivio seguirán siendo relevantes si Laura ya ha practicado mucho el patrón de no asistir.";
      } else if (type === "corto") {
        expOutput.textContent =
          "La formulación “voy solo 10 minutos” puede transformar la situación en un contexto de exposición " +
          "gradual. No elimina el malestar, pero modifica la función de la reunión: deja de ser un todo-or-nada " +
          "y pasa a ser una oportunidad acotada para practicar acercamiento.";
      } else if (type === "herramientas") {
        expOutput.textContent =
          "El foco en “no necesito brillar, sólo participar un poco” introduce marcos alternativos de " +
          "suficiencia y flexibilidad. Desde ACT, esta formulación se alinea con valores y puede aumentar " +
          "la probabilidad de una conducta de acercamiento, aunque el malestar no desaparezca.";
      }
    });
  });

  /* ============================================================
     ACTIVIDAD REFLEXIVA
  ============================================================ */
  const refButtons = document.querySelectorAll(".ua-ref-btn");
  const refOutput = document.getElementById("ua-ref-output");

  refButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!refOutput) return;

      refButtons.forEach((b) => b.classList.remove("ua-context-active"));
      btn.classList.add("ua-context-active");

      const type = btn.dataset.ref;

      if (type === "pensamiento") {
        refOutput.textContent =
          "Si destacas el pensamiento anticipatorio, enfatizas el papel del lenguaje como antecedente verbal " +
          "que transforma funciones. Esto dirige la intervención hacia defusión, clarificación de valores y " +
          "ejercicios que permitan a Laura actuar en presencia de esas historias.";
      } else if (type === "sensaciones") {
        refOutput.textContent =
          "Si priorizas las sensaciones corporales, pones el foco en el componente fisiológico de la respuesta. " +
          "Esto puede guiarte hacia prácticas de exposición interoceptiva y entrenamiento en disposición al " +
          "malestar, sin perder de vista que las funciones de esas sensaciones están moduladas verbalmente.";
      } else if (type === "alivio") {
        refOutput.textContent =
          "Si consideras el alivio inmediato como elemento central, subrayas el papel del reforzamiento negativo " +
          "en mantener la evitación. Esta lectura suele ser muy útil para planificar intervenciones centradas en " +
          "romper el ciclo evitación–alivio, introduciendo alternativas coherentes con valores.";
      }
    });
  });

  /* ============================================================
     ELECCIÓN DE CLASE FUNCIONAL
  ============================================================ */
  const classChoices = document.querySelectorAll(".ua-class-choice");
  const classFeedback = document.getElementById("ua-class-feedback");

  classChoices.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!classFeedback) return;

      classChoices.forEach((b) => b.classList.remove("ua-choice-active"));
      btn.classList.add("ua-choice-active");

      const choice = btn.dataset.choice;

      if (choice === "evitacion") {
        classFeedback.textContent =
          "“Evitación de interacción social” resume la función compartida de las respuestas de Laura. " +
          "Esta etiqueta funcional es especialmente útil para ACT, porque orienta hacia intervenciones " +
          "de exposición, defusión y acción guiada por valores, en lugar de quedarse en un rótulo diagnóstico.";
      } else if (choice === "ansioso") {
        classFeedback.textContent =
          "“Síntoma ansioso” describe una cualidad de la experiencia, pero aporta poca guía funcional. " +
          "No especifica qué contingencias mantienen el patrón ni qué alternativas podrían construirse.";
      } else if (choice === "tp") {
        classFeedback.textContent =
          "“Trastorno de personalidad” es una categoría amplia que puede ser relevante a otros niveles, " +
          "pero no organiza con precisión este episodio concreto ni define con claridad puntos de intervención.";
      }
    });
  });
});
