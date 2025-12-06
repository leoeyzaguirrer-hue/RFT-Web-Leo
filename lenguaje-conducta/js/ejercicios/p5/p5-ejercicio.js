// ============================================================
// EJERCICIO P5 · CONMUTADOR DE OPERANTES VERBALES (Versión Extendida)
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  const cont = document.getElementById("p5-contenido-dinamico");
  const mensajeFinal = document.querySelector(".p5-mensaje-final");
  const btnReset = document.querySelector(".p5-btn-reset");

  let modoCompletado = {
    hablante: false,
    oyente: false
  };

  // ============================================
  // BASE DE EJEMPLOS MODO HABLANTE (6)
  // ============================================

  const ejemplosHablante = [
    {
      enunciado: "“Pásame la ______”",
      opciones: [
        { txt: "silla", correcto: true },
        { txt: "ventana", correcto: false },
        { txt: "carpeta", correcto: false }
      ],
      feedbackCorrecto: "Correcto: mando → el oyente ejecuta la acción."
    },
    {
      enunciado: "“Dime dónde está el ______”",
      opciones: [
        { txt: "baño", correcto: true },
        { txt: "abrigo", correcto: false },
        { txt: "puerta", correcto: false }
      ],
      feedbackCorrecto: "Correcto: tacto solicitado → descripción adecuada."
    },
    {
      enunciado: "“Completa la frase: El sol sale por el ______”",
      opciones: [
        { txt: "este", correcto: true },
        { txt: "árbol", correcto: false },
        { txt: "verde", correcto: false }
      ],
      feedbackCorrecto: "Correcto: intraverbal bajo control contextual."
    },
    {
      enunciado: "“Necesito que abras la ______”",
      opciones: [
        { txt: "puerta", correcto: true },
        { txt: "mesa", correcto: false },
        { txt: "camisa", correcto: false }
      ],
      feedbackCorrecto: "Correcto: mando → especificación de acción."
    },
    {
      enunciado: "“Señala el objeto que estoy describiendo: redondo y sirve para jugar ______”",
      opciones: [
        { txt: "pelota", correcto: true },
        { txt: "taza", correcto: false },
        { txt: "llave", correcto: false }
      ],
      feedbackCorrecto: "Correcto: tacto generalizado bajo descripción."
    },
    {
      enunciado: "“Repite: la capital de Francia es ______”",
      opciones: [
        { txt: "París", correcto: true },
        { txt: "Roma", correcto: false },
        { txt: "Tokio", correcto: false }
      ],
      feedbackCorrecto: "Correcto: intraverbal respondido adecuadamente."
    }
  ];

  // ============================================
  // BASE DE EJEMPLOS MODO OYENTE (6)
  // ============================================

  const ejemplosOyente = [
    {
      instruccion: "“Toma el lápiz que está encima del cuaderno azul.”",
      opciones: [
        { txt: "Lápiz A (mesa)", correcto: false },
        { txt: "Lápiz B (sobre cuaderno azul)", correcto: true },
        { txt: "Lápiz C (suelo)", correcto: false }
      ]
    },
    {
      instruccion: "“Trae la botella que está más cerca de la ventana.”",
      opciones: [
        { txt: "Botella A (cerca)", correcto: true },
        { txt: "Botella B (medio)", correcto: false },
        { txt: "Botella C (lejos)", correcto: false }
      ]
    },
    {
      instruccion: "“Selecciona la carpeta roja que está debajo del libro grande.”",
      opciones: [
        { txt: "Carpeta roja (arriba)", correcto: false },
        { txt: "Carpeta roja (debajo del libro)", correcto: true },
        { txt: "Carpeta azul", correcto: false }
      ]
    },
    {
      instruccion: "“Indica la taza que está a la derecha del plato verde.”",
      opciones: [
        { txt: "Taza A (izquierda)", correcto: false },
        { txt: "Taza B (derecha)", correcto: true },
        { txt: "Taza C (centro)", correcto: false }
      ]
    },
    {
      instruccion: "“Toca el papel que está más arrugado.”",
      opciones: [
        { txt: "Papel liso", correcto: false },
        { txt: "Papel muy arrugado", correcto: true },
        { txt: "Papel doblado", correcto: false }
      ]
    },
    {
      instruccion: "“Elige la llave que corresponde a la puerta más pequeña.”",
      opciones: [
        { txt: "Llave grande", correcto: false },
        { txt: "Llave pequeña", correcto: true },
        { txt: "Llave media", correcto: false }
      ]
    }
  ];

  let indexHablante = 0;
  let indexOyente = 0;

  // ============================================================
  // BOTONES DE MODO
  // ============================================================

  document.querySelectorAll(".p5-btn-modo").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.dataset.modo === "hablante") cargarHablante();
      else cargarOyente();
    });
  });

  // ============================================================
  // MODO HABLANTE (EXTENDIDO)
  // ============================================================

  function cargarHablante() {

    const ej = ejemplosHablante[indexHablante];

    cont.innerHTML = `
      <div class="p5-enunciado">Completa el enunciado:</div>
      <div class="p5-enunciado">${ej.enunciado}</div>

      <div class="p5-opciones">
        ${ej.opciones.map(o => `
          <div class="p5-opcion" data-correcto="${o.correcto}">${o.txt}</div>
        `).join("")}
      </div>

      <div class="p5-feedback"></div>
    `;

    const feedback = cont.querySelector(".p5-feedback");

    cont.querySelectorAll(".p5-opcion").forEach(opt => {
      opt.addEventListener("click", () => {

        if (opt.dataset.correcto === "true") {
          feedback.textContent = ej.feedbackCorrecto;
          feedback.style.color = "#2a7c4f";

          indexHablante++;

          if (indexHablante < ejemplosHablante.length) {
            setTimeout(cargarHablante, 900);
          } else {
            modoCompletado.hablante = true;
            evaluarFinal();
          }

        } else {
          feedback.textContent = "Respuesta incorrecta. Intenta nuevamente.";
          feedback.style.color = "#b83232";
        }
      });
    });
  }

  // ============================================================
  // MODO OYENTE (EXTENDIDO)
  // ============================================================

  function cargarOyente() {

    const ej = ejemplosOyente[indexOyente];

    cont.innerHTML = `
      <div class="p5-enunciado">${ej.instruccion}</div>

      <div class="p5-escena-oyente">
        ${ej.opciones.map(o => `
          <div class="p5-objeto" data-correcto="${o.correcto}">${o.txt}</div>
        `).join("")}
      </div>

      <div class="p5-feedback"></div>
    `;

    const feedback = cont.querySelector(".p5-feedback");

    cont.querySelectorAll(".p5-objeto").forEach(obj => {
      obj.addEventListener("click", () => {

        if (obj.dataset.correcto === "true") {
          feedback.textContent = "Correcto: respondiste como oyente bajo el estímulo verbal.";
          feedback.style.color = "#1b4fa8";

          indexOyente++;

          if (indexOyente < ejemplosOyente.length) {
            setTimeout(cargarOyente, 900);
          } else {
            modoCompletado.oyente = true;
            evaluarFinal();
          }

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
        "Hablante y oyente no son entidades internas, sino funciones del organismo. Alternamos entre ellas en milisegundos.";
    }
  }

  // ============================================================
  // REINICIAR
  // ============================================================

  btnReset.addEventListener("click", () => {
    cont.innerHTML = `<p class="p5-instruccion">Selecciona un modo para comenzar…</p>`;
    mensajeFinal.textContent = "";
    indexHablante = 0;
    indexOyente = 0;
    modoCompletado = { hablante: false, oyente: false };
  });

});
