document.addEventListener("DOMContentLoaded", () => {

  const familias = document.querySelectorAll(".p22-familia");
  const redBox = document.getElementById("p22-red");
  const discriminacionBox = document.getElementById("p22-discriminacion");
  const feedback = document.getElementById("p22-feedback");
  const reiniciar = document.getElementById("p22-reiniciar");

  const redes = {
    examen: {
      activaciones: [
        "Sonido de timbre escolar",
        "Imagen de un aula",
        "Pensamiento: “¿y si fallo?”",
        "Activación fisiológica",
        "Conducta: evitar u organizarse"
      ],
      derivadas: [
        "Pensamiento: “¿y si fallo?”",
        "Activación fisiológica",
        "Conducta: evitar u organizarse"
      ]
    },
    peligro: {
      activaciones: [
        "Sonido de alarma",
        "Imagen de señal ⚠️",
        "Pensamiento: “algo malo va a pasar”",
        "Tensión corporal",
        "Conducta: escapar o congelarse"
      ],
      derivadas: [
        "Pensamiento: “algo malo va a pasar”",
        "Tensión corporal",
        "Conducta: escapar o congelarse"
      ]
    },
    apellido: {
      activaciones: [
        "Imagen del apellido escrito",
        "Recuerdo de interacciones pasadas",
        "Pensamiento: “otra vez esto”",
        "Emoción: vergüenza o rabia",
        "Conducta: evitar contacto"
      ],
      derivadas: [
        "Recuerdo de interacciones pasadas",
        "Pensamiento: “otra vez esto”",
        "Emoción: vergüenza o rabia",
        "Conducta: evitar contacto"
      ]
    }
  };

  let redActual = null;

  familias.forEach(btn => {
    btn.addEventListener("click", () => {
      const tipo = btn.dataset.red;
      const info = redes[tipo];
      redActual = tipo;

      redBox.innerHTML = "<strong>Red activada:</strong><br>" +
        info.activaciones.map(it => `<div class="p22-item">${it}</div>`).join("");

      discriminacionBox.innerHTML = `
        <strong>¿Cuáles de estas reacciones NO dependen del estímulo físico presente?</strong>
        <div class="p22-opciones">
          ${info.activaciones.map(it => `<button>${it}</button>`).join("")}
        </div>
      `;

      feedback.textContent = "";

      const botones = discriminacionBox.querySelectorAll("button");

      botones.forEach(btnResp => {
        btnResp.addEventListener("click", () => {
          const esDerivada = redes[redActual].derivadas.includes(btnResp.textContent);

          if (esDerivada) {
            feedback.textContent =
              "✅ Correcto. Esta respuesta es derivada: ocurre por la red lingüística, no por presencia física.";
          } else {
            feedback.textContent =
              "❌ Esta reacción todavía depende directamente del estímulo presente.";
          }
        });
      });
    });
  });

  reiniciar.addEventListener("click", () => {
    redBox.textContent = "Selecciona un estímulo para activar la red.";
    discriminacionBox.textContent = "";
    feedback.textContent = "";
    redActual = null;
  });

});
