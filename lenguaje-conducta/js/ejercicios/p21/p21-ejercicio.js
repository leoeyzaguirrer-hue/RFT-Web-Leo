document.addEventListener("DOMContentLoaded", () => {

  const contextos = document.querySelectorAll(".p21-contexto");
  const antecedBox = document.getElementById("p21-antecedentes");
  const respBox = document.getElementById("p21-respuestas");
  const dropPublica = document.getElementById("p21-publica");
  const dropEncubierta = document.getElementById("p21-encubierta");
  const feedback = document.getElementById("p21-feedback");
  const consecuenciaBox = document.getElementById("p21-consecuencia");
  const reiniciar = document.getElementById("p21-reiniciar");
  const zonaArea = document.getElementById("p21-area");

  let tarjetaArrastrada = null;

  const datos = {
    publico: {
      antecedentes: ["Presión social", "Miradas evaluativas", "Expectativa de error"],
      respuestas: ["No puedo hacerlo", "Quizás sí puedo", "Vamos a intentarlo"],
      consecuencia: {
        publica: ["Evitación", "Autoexigencia", "Aproximación"],
        encubierta: ["Rumiación", "Preocupación", "Regulación verbal"]
      }
    },
    mensaje: {
      antecedentes: ["Miedo al rechazo", "Ambigüedad", "Conflicto emocional"],
      respuestas: ["Mejor lo dejo", "Lo escribo con calma", "Lo envío igual"],
      consecuencia: {
        publica: ["Posponer", "Comunicar con claridad", "Impulsividad"],
        encubierta: ["Duda", "Autoevaluación", "Alivio momentáneo"]
      }
    },
    pensar: {
      antecedentes: ["Amenaza percibida", "Decisión difícil", "Presión de tiempo"],
      respuestas: ["No puedo decidir", "Quizás esto funcione", "Voy a probar"],
      consecuencia: {
        publica: ["Retraso", "Acción planificada", "Evitar la acción"],
        encubierta: ["Rumiación", "Simulación verbal", "Autoorganización"]
      }
    }
  };

  // SELECCIONAR CONTEXTO
  contextos.forEach(btn => {
    btn.addEventListener("click", () => {
      const ctx = btn.dataset.ctx;
      feedback.textContent = "";
      consecuenciaBox.textContent = "";

      // Renderizar antecedentes
      antecedBox.innerHTML = "<strong>Selecciona un antecedente:</strong><br>" +
        datos[ctx].antecedentes.map(a => `<button class="p21-card p21-ant" data-ant="${a}">${a}</button>`).join("");

      // Renderizar respuestas
      respBox.innerHTML = "<strong>Respuestas verbales posibles:</strong><br>" +
        datos[ctx].respuestas.map(r => `<div class="p21-card" draggable="true">${r}</div>`).join("");

      activarDrag();
      activarAntecedentes(ctx);
    });
  });

  function activarAntecedentes(ctx) {
    const botonesAnt = document.querySelectorAll(".p21-ant");
    botonesAnt.forEach(btnA => {
      btnA.addEventListener("click", () => {
        botonesAnt.forEach(b => b.classList.remove("p21-activa"));
        btnA.classList.add("p21-activa");
        feedback.textContent = "Antecedente seleccionado. Ahora arrastra la respuesta verbal.";
      });
    });

    activarDrop(ctx);
  }

  function activarDrag() {
    const tarjetas = document.querySelectorAll(".p21-card[draggable='true']");
    tarjetas.forEach(card => {
      card.addEventListener("dragstart", e => {
        tarjetaArrastrada = card;
      });
    });
  }

  function activarDrop(ctx) {

    [dropPublica, dropEncubierta].forEach(zone => {

      zone.addEventListener("dragover", e => {
        e.preventDefault();
        zone.classList.add("p21-activa");
      });

      zone.addEventListener("dragleave", () => {
        zone.classList.remove("p21-activa");
      });

      zone.addEventListener("drop", e => {
        e.preventDefault();
        zone.classList.remove("p21-activa");

        if (!tarjetaArrastrada) return;

        const respuestaTexto = tarjetaArrastrada.textContent.trim();

        zone.innerHTML = respuestaTexto;
        tarjetaArrastrada.setAttribute("draggable", "false");
        tarjetaArrastrada.style.opacity = "0.6";

        // Calcular consecuencia
        const tipo = (zone === dropPublica) ? "publica" : "encubierta";

        const posibles = datos[ctx].consecuencia[tipo];
        const resultado = posibles[Math.floor(Math.random() * posibles.length)];

        consecuenciaBox.innerHTML = `
          <strong>Consecuencia probable:</strong><br>
          ${resultado}
        `;

        feedback.textContent =
          tipo === "encubierta"
            ? "✔ También es conducta verbal. Pensar no es un proceso mental separado."
            : "✔ Observa cómo el contexto modula tu respuesta verbal pública.";
      });
    });
  }

  // REINICIAR
  reiniciar.addEventListener("click", () => {
    antecedBox.textContent = "";
    respBox.textContent = "";
    dropPublica.textContent = "💬 Conducta verbal pública";
    dropEncubierta.textContent = "💭 Conducta verbal encubierta";
    consecuenciaBox.textContent = "";
    feedback.textContent = "";
  });
});
