// ============================================================
// EJERCICIO P5 · CONMUTADOR DE OPERANTES VERBALES
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  const cont = document.getElementById("p5-contenido-dinamico");
  const mensajeFinal = document.querySelector(".p5-mensaje-final");
  const btnReset = document.querySelector(".p5-btn-reset");

  let modoCompletado = {
    hablante: false,
    oyente: false
  };

  // ============================================================
  // BOTONES DE MODO
  // ============================================================

  document.querySelectorAll(".p5-btn-modo").forEach(btn => {
    btn.addEventListener("click", () => {
      const modo = btn.dataset.modo;
      if (modo === "hablante") cargarHablante();
      else cargarOyente();
    });
  });

  // ============================================================
  // MODO HABLANTE
  // ============================================================

  function cargarHablante() {
    cont.innerHTML = `
      <div class="p5-enunciado">Completa el enunciado:</div>
      <div class="p5-enunciado">“Pásame la ______”</div>

      <div class="p5-opciones">
        <div class="p5-opcion" data-correcto="no">ventana</div>
        <div class="p5-opcion" data-correcto="si">silla</div>
        <div class="p5-opcion" data-correcto="no">carpeta</div>
      </div>

      <div class="p5-feedback"></div>
    `;

    const feedback = cont.querySelector(".p5-feedback");

    cont.querySelectorAll(".p5-opcion").forEach(opt => {
      opt.addEventListener("click", () => {

        if (opt.dataset.correcto === "si") {
          feedback.textContent = "Correcto: mando → el oyente ejecuta la acción.";
          feedback.style.color = "#2a7c4f";
          modoCompletado.hablante = true;
          evaluarFinal();
        } else {
          feedback.textContent = "Esa respuesta no establece control adecuado.";
          feedback.style.color = "#b83232";
        }
      });
    });
  }

  // ============================================================
  // MODO OYENTE
  // ============================================================

  function cargarOyente() {
    cont.innerHTML = `
      <div class="p5-enunciado">
        Estímulo verbal recibido:<br>
        “Tráeme la silla que está más cerca de la ventana.”
      </div>

      <div class="p5-escena-oyente">
        <div class="p5-objeto" data-correcto="no">Silla A (lejos)</div>
        <div class="p5-objeto" data-correcto="si">Silla B (cerca)</div>
        <div class="p5-objeto" data-correcto="no">Silla C</div>
        <div class="p5-objeto" data-correcto="no">Silla D</div>
      </div>

      <div class="p5-feedback"></div>
    `;

    const feedback = cont.querySelector(".p5-feedback");

    cont.querySelectorAll(".p5-objeto").forEach(obj => {
      obj.addEventListener("click", () => {

        if (obj.dataset.correcto === "si") {
          feedback.textContent = "Correcto: respondiste como oyente bajo el estímulo verbal.";
          feedback.style.color = "#1b4fa8";
          modoCompletado.oyente = true;
          evaluarFinal();
        } else {
          feedback.textContent = "Respuesta incorrecta. Intenta nuevamente.";
          feedback.style.color = "#b83232";
        }
      });
    });
  }

  // ============================================================
  // AUTOCORRECCIÓN FINAL
  // ============================================================

  function evaluarFinal() {
    if (modoCompletado.hablante && modoCompletado.oyente) {
      mensajeFinal.textContent =
        "Hablante y oyente no son ‘dos mentes’, sino dos funciones del mismo organismo. Alternamos entre ellas en milisegundos.";
    }
  }

  // ============================================================
  // REINICIAR
  // ============================================================

  btnReset.addEventListener("click", () => {
    cont.innerHTML = `<p class="p5-instruccion">Selecciona un modo para comenzar…</p>`;
    mensajeFinal.textContent = "";
    modoCompletado = { hablante: false, oyente: false };
  });

});
