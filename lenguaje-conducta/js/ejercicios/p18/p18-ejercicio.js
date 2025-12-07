document.addEventListener("DOMContentLoaded", () => {
  const paquetes = document.querySelectorAll(".p18-paquete");
  const descompresion = document.getElementById("p18-descompresion");
  const pregunta = document.getElementById("p18-pregunta");
  const feedback = document.getElementById("p18-feedback");
  const reiniciar = document.getElementById("p18-reiniciar");
  const cierre = document.getElementById("p18-cierre");

  const datos = {
    manzana: {
      items: [
        "Recuerdo: desayunos con fruta",
        "Emoción: agrado",
        "Respuesta motora: acercarse",
        "Conducta futura: buscar comida"
      ],
      correcta: "Conducta futura: buscar comida"
    },
    perro: {
      items: [
        "Recuerdo: juegos en la infancia",
        "Emoción: afecto o temor",
        "Respuesta motora: acariciar o evitar",
        "Conducta futura: cambiar de ruta"
      ],
      correcta: "Conducta futura: cambiar de ruta"
    },
    examen: {
      items: [
        "Recuerdo: noches de estudio",
        "Emoción: ansiedad",
        "Respuesta motora: inquietud",
        "Conducta futura: organizar horario"
      ],
      correcta: "Conducta futura: organizar horario"
    },
    fracaso: {
      items: [
        "Recuerdo: errores pasados",
        "Emoción: vergüenza",
        "Respuesta motora: inhibición",
        "Conducta futura: abandonar tareas"
      ],
      correcta: "Conducta futura: abandonar tareas"
    }
  };

  let paqueteActual = null;

  paquetes.forEach(btn => {
    btn.addEventListener("click", () => {
      const tipo = btn.dataset.paquete;
      const info = datos[tipo];
      paqueteActual = tipo;

      descompresion.innerHTML = info.items
        .map(el => `<div class="p18-item">${el}</div>`)
        .join("");

      pregunta.innerHTML = `
        <p><strong>¿Cuál de estas respuestas NO requiere que el estímulo esté presente?</strong></p>
        <div class="p18-opciones">
          ${info.items.map(el => `<button>${el}</button>`).join("")}
        </div>
      `;

      feedback.textContent = "";
      cierre.textContent = "";

      const opciones = document.querySelectorAll(".p18-opciones button");

      opciones.forEach(op => {
        op.addEventListener("click", () => {
          if (op.textContent === info.correcta) {
            feedback.textContent =
              "✅ Correcto. Esta respuesta ocurre por anticipación, no por presencia del estímulo.";
            cierre.textContent =
              "El organismo responde al paquete completo, no al estímulo aislado. " +
              "El lenguaje extiende el alcance de las contingencias hacia el pasado y hacia el futuro.";
          } else {
            feedback.textContent =
              "❌ Esta respuesta todavía depende directamente del estímulo. Observa cuál es verdaderamente anticipatoria.";
          }
        });
      });
    });
  });

  reiniciar.addEventListener("click", () => {
    descompresion.textContent = "Selecciona un paquete para descomprimirlo.";
    pregunta.textContent = "";
    feedback.textContent = "";
    cierre.textContent = "";
    paqueteActual = null;
  });
});
