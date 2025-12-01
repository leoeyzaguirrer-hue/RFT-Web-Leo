// p4.js — Lógica interactiva de la Lección 3 · Clases funcionales y patrones

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
  // 2. Acordeón clásico (solo uno abierto)
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

      // Abrir el seleccionado si estaba cerrado
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
  // 3. Mini actividad inicial (¿misma clase funcional?)
  // ==========================
  const miniClase = document.getElementById("ua-mini-clase");
  if (miniClase) {
    const correct = miniClase.dataset.correct;
    const okMsg = miniClase.dataset.correctMsg || "✔ Correcto.";
    const errMsg = miniClase.dataset.errorMsg || "✖ Revisa la función compartida.";
    const feedback = miniClase.querySelector(".ua-mini-feedback");
    const buttons = miniClase.querySelectorAll(".ua-btn-mini");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const ans = btn.dataset.answer;
        buttons.forEach(b => b.classList.remove("ua-mini-selected"));
        btn.classList.add("ua-mini-selected");

        if (!feedback) return;

        if (ans === correct) {
          feedback.textContent = okMsg;
          feedback.classList.add("ua-mini-ok");
          feedback.classList.remove("ua-mini-error");
        } else {
          feedback.textContent = errMsg;
          feedback.classList.add("ua-mini-error");
          feedback.classList.remove("ua-mini-ok");
        }
      });
    });
  }

  // ==========================
  // 4. Experimento: clase funcional de evitación social
  // ==========================
  const funcData = {
    c1: {
      title: "Conducta 1 · Excusa verbal",
      text: "📩 “No voy, estoy cansado.”\n\nTopografía: una frase aparentemente neutra.\nFunción: salir de la situación social antes de que ocurra.\nConsecuencia: alivio momentáneo 😮‍💨 y mantenimiento del patrón de evitación."
    },
    c2: {
      title: "Conducta 2 · Celular como refugio",
      text: "📱 Revisar compulsivamente el celular durante el grupo.\n\nTopografía: mirar la pantalla, desplazarse, escribir mensajes.\nFunción: reducir contacto visual y exposición directa.\nConsecuencia: menos incomodidad inmediata, pero más aislamiento a largo plazo."
    },
    c3: {
      title: "Conducta 3 · Llegar tarde",
      text: "🚶‍♂️ Llegar tarde para no saludar.\n\nTopografía: demorar la llegada, organizarse para entrar cuando todo ya empezó.\nFunción: evitar momentos de conversación informal y presentación.\nConsecuencia: alivio del malestar de inicio, pero menor oportunidad de vincularse."
    },
    c4: {
      title: "Conducta 4 · Salir al baño",
      text: "🚪 Salir al baño cuando toca hablar.\n\nTopografía: levantarse, salir del lugar, \"necesitar\" ir al baño.\nFunción: escapar de la exposición pública inmediata.\nConsecuencia: alivio intenso en el momento, refuerzo del patrón de escapar al hablar."
    }
  };

  const funcButtons = document.querySelectorAll(".ua-func-btn");
  const funcOutput = document.getElementById("ua-func-output");

  funcButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.case;
      if (!funcData[key] || !funcOutput) return;

      // Marcar activo
      funcButtons.forEach(b => b.classList.remove("ua-context-active"));
      btn.classList.add("ua-context-active");

      const block = funcData[key];
      funcOutput.innerHTML = `
        <h4 class="ua-context-title">${block.title}</h4>
        <p class="ua-text-small">${block.text.replace(/\n/g, "<br>")}</p>
        <p class="ua-text-small ua-hint">
          Observa cómo esta conducta, aunque se ve diferente de las otras,
          cumple la misma función de evitar el contacto interpersonal inmediato.
        </p>
      `;
    });
  });

  // ==========================
  // 5. Actividad: micro-episodio vs macro-patrón
  // ==========================
  document.querySelectorAll(".ua-mini-item[data-kind='tiempo']").forEach(item => {
    const correct = item.dataset.correct; // "micro" o "macro"
    const feedbackBox = item.querySelector(".ua-mini-feedback");
    const buttons = item.querySelectorAll(".ua-btn-mini");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const ans = btn.dataset.answer;
        buttons.forEach(b => b.classList.remove("ua-mini-selected"));
        btn.classList.add("ua-mini-selected");

        if (!feedbackBox) return;

        if (ans === correct) {
          feedbackBox.textContent = "✔ Correcto: estás recortando el episodio al nivel temporal adecuado.";
          feedbackBox.classList.add("ua-mini-ok");
          feedbackBox.classList.remove("ua-mini-error");
        } else {
          feedbackBox.textContent = "✖ No del todo: piensa si describe un momento específico o un patrón que se repite en el tiempo.";
          feedbackBox.classList.add("ua-mini-error");
          feedbackBox.classList.remove("ua-mini-ok");
        }
      });
    });
  });
});
