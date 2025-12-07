document.addEventListener("DOMContentLoaded", () => {

  const frase = document.getElementById("p23-frase");
  const contextos = document.querySelectorAll(".p23-contexto");
  const slidersBox = document.getElementById("p23-sliders");
  const resultadoBox = document.getElementById("p23-resultado");
  const feedback = document.getElementById("p23-feedback");
  const reiniciar = document.getElementById("p23-reiniciar");

  let contextoActual = null;

  frase.addEventListener("dragstart", e => {
    e.dataTransfer.setData("texto", "frase");
  });

  contextos.forEach(ctx => {
    ctx.addEventListener("dragover", e => e.preventDefault());

    ctx.addEventListener("drop", e => {
      e.preventDefault();

      contextos.forEach(c => c.classList.remove("p23-activo"));
      ctx.classList.add("p23-activo");

      contextoActual = ctx.dataset.ctx;

      slidersBox.innerHTML = `
        <label>Intensidad emocional</label>
        <input type="range" id="p23-intensidad" min="0" max="10" value="5">

        <label>Dirección conductual</label>
        <input type="range" id="p23-direccion" min="0" max="10" value="5">

        <label>Tipo de contingencia</label>
        <input type="range" id="p23-contingencia" min="0" max="10" value="5">
      `;

      activarSliders();
      feedback.textContent = "Ahora ajusta el contexto para transformar la función.";
      resultadoBox.textContent = "";
    });
  });

  function activarSliders() {
    const intensidad = document.getElementById("p23-intensidad");
    const direccion = document.getElementById("p23-direccion");
    const contingencia = document.getElementById("p23-contingencia");

    [intensidad, direccion, contingencia].forEach(sl => {
      sl.addEventListener("input", calcularFuncion);
    });
  }

  function calcularFuncion() {
    const i = parseInt(document.getElementById("p23-intensidad").value);
    const d = parseInt(document.getElementById("p23-direccion").value);
    const c = parseInt(document.getElementById("p23-contingencia").value);

    let funcion = "Ambigua";
    let conducta = "Indeterminada";
    let emocion = "Mixta";

    if (d < 4 && c < 4) {
      funcion = "Evitación";
      conducta = "Postergar, retirarse, no intentar";
      emocion = "Ansiedad";
    } else if (d > 7 && c > 7) {
      funcion = "Compromiso con valores";
      conducta = "Intentar, exponerse, persistir";
      emocion = "Ansiedad con sentido";
    } else if (c > 5 && d < 4) {
      funcion = "Búsqueda de ayuda";
      conducta = "Pedir apoyo, consultar";
      emocion = "Vulnerabilidad";
    }

    resultadoBox.innerHTML = `
      <strong>Función dominante:</strong> ${funcion}<br>
      <strong>Conducta probable:</strong> ${conducta}<br>
      <strong>Emoción asociada:</strong> ${emocion}
    `;

    if (funcion !== "Ambigua" && funcion !== "Evitación") {
      feedback.textContent =
        "✅ Correcto. Transformaste la función sin cambiar el contenido de la frase.";
    } else {
      feedback.textContent =
        "Ajusta el contexto para observar un cambio funcional más claro.";
    }
  }

  reiniciar.addEventListener("click", () => {
    contextoActual = null;
    contextos.forEach(c => c.classList.remove("p23-activo"));
    slidersBox.textContent = "";
    resultadoBox.textContent = "";
    feedback.textContent = "";
  });

});
