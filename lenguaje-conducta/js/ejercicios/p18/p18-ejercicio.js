const paquetes = document.querySelectorAll(".p18-paquete");
const descompresion = document.getElementById("p18-descompresion");
const pregunta = document.getElementById("p18-pregunta");
const feedback = document.getElementById("p18-feedback");
const reiniciar = document.getElementById("p18-reiniciar");

const datos = {
  manzana: {
    elementos: [
      "Recuerdo: desayunos",
      "Emoción: agrado",
      "Impulso: acercarse",
      "Conducta futura: buscar comida"
    ],
    correcta: "Conducta futura: buscar comida"
  },
  perro: {
    elementos: [
      "Recuerdo: juegos",
      "Emoción: afecto o temor",
      "Impulso: acariciar o evitar",
      "Conducta futura: cambiar de ruta"
    ],
    correcta: "Conducta futura: cambiar de ruta"
  },
  examen: {
    elementos: [
      "Recuerdo: estudio",
      "Emoción: ansiedad",
      "Impulso: evitar",
      "Conducta futura: organizar horario"
    ],
    correcta: "Conducta futura: organizar horario"
  },
  fracaso: {
    elementos: [
      "Recuerdo: errores",
      "Emoción: vergüenza",
      "Impulso: inhibirse",
      "Conducta futura: abandonar tareas"
    ],
    correcta: "Conducta futura: abandonar tareas"
  }
};

paquetes.forEach(btn => {
  btn.addEventListener("click", () => {
    const tipo = btn.dataset.paquete;
    const info = datos[tipo];

    descompresion.innerHTML = info.elementos.map(e => 
      `<div class="p18-item">${e}</div>`
    ).join("");

    pregunta.innerHTML = `
      <p><strong>¿Cuál de estas respuestas NO requiere que el estímulo esté presente?</strong></p>
      <div class="p18-opciones">
        ${info.elementos.map(e => `<button>${e}</button>`).join("")}
      </div>
    `;

    feedback.innerText = "";

    const opciones = document.querySelectorAll(".p18-opciones button");

    opciones.forEach(op => {
      op.addEventListener("click", () => {
        if (op.innerText === info.correcta) {
          feedback.innerText = "✅ Correcto. El organismo responde al paquete completo, no al objeto presente.";
        } else {
          feedback.innerText = "❌ Observa qué respuesta puede ocurrir sin que el estímulo esté aquí.";
        }
      });
    });
  });
});

reiniciar.addEventListener("click", () => {
  descompresion.innerHTML = "";
  pregunta.innerHTML = "";
  feedback.innerText = "";
});
