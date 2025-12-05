/* ============================================================
   EJERCICIO P12 · DESARMADOR DE FORMULACIONES
=============================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const tarjetas = document.querySelectorAll(".p12-tarjeta");
  const sirve = document.getElementById("p12-sirve");
  const noSirve = document.getElementById("p12-nosirve");
  const engranaje = document.getElementById("p12-engranaje");
  const estado = document.getElementById("p12-estado");
  const scoreSpan = document.getElementById("p12-score");
  const resetBtn = document.getElementById("p12-reset");
  const feedback = document.getElementById("p12-feedback");

  let total = tarjetas.length;
  let correctas = 0;

  let tarjetaActual = null;

  /* -----------------------
     DRAG & DROP
  ------------------------*/

  tarjetas.forEach(t => {
    t.addEventListener("dragstart", () => {
      tarjetaActual = t;
    });
  });

  [sirve, noSirve].forEach(contenedor => {
    contenedor.addEventListener("dragover", e => e.preventDefault());

    contenedor.addEventListener("drop", () => {
      if (!tarjetaActual) return;

      const tipo = tarjetaActual.dataset.tipo;

      // caso correcto
      if (tipo === "funcional" && contenedor.id === "p12-sirve") {
        contenedor.appendChild(tarjetaActual);
        engranaje.style.animationPlayState = "running";
        estado.textContent = "Pieza funcional añadida: el motor se optimiza.";
        correctas++;
        tarjetaActual = null;
        actualizarScore();
        return;
      }

      if (tipo === "nofuncional" && contenedor.id === "p12-nosirve") {
        contenedor.appendChild(tarjetaActual);
        engranaje.style.animationPlayState = "paused";
        estado.textContent = "Pieza descartada: evita confusión clínica.";
        correctas++;
        tarjetaActual = null;
        actualizarScore();
        return;
      }

      // caso incorrecto
      tarjetaActual.classList.add("p12-error");
      tarjetaActual.style.animation = "p12-rebote 0.4s ease";

      setTimeout(() => {
        tarjetaActual.style.animation = "";
        tarjetaActual.classList.remove("p12-error");
      }, 500);

      estado.textContent = "Clasificación incorrecta: esta pieza no orienta acción.";
      tarjetaActual = null;
    });
  });

  /* -----------------------
     CALCULAR PUNTAJE
  ------------------------*/

  function actualizarScore() {
    let porcentaje = Math.round((correctas / total) * 100);
    scoreSpan.textContent = porcentaje;

    if (correctas === total) {
      feedback.textContent =
        "Una formulación es verdadera cuando revela qué hace la conducta y cómo intervenir. Lo decorativo no guía acción.";
    }
  }

  /* -----------------------
     REINICIO
  ------------------------*/

  resetBtn.addEventListener("click", () => {
    engranaje.style.animationPlayState = "paused";
    estado.textContent = "Clasifica las piezas para optimizar el motor.";
    scoreSpan.textContent = "0";
    correctas = 0;

    // devolver tarjetas al banco
    const banco = document.getElementById("p12-banco");
    const todas = document.querySelectorAll(".p12-tarjeta");
    todas.forEach(t => banco.appendChild(t));

    feedback.textContent = "Arrastra una pieza hacia un contenedor para comenzar.";
  });

});
