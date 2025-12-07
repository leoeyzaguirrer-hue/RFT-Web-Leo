// ============================================================
// P14 · ENTRENADOR DE SÍMBOLOS ARTIFICIALES · 3 FASES
// ============================================================
document.addEventListener("DOMContentLoaded", () => {

  const palabraSpan = document.getElementById("p14-palabra-actual");
  const instruccionFase = document.getElementById("p14-instruccion-fase");
  const barra = document.getElementById("p14-barra");
  const feedback = document.getElementById("p14-feedback");

  const figurasBtns = document.querySelectorAll(".p14-figura");
  const btnFase2 = document.getElementById("p14-btn-fase2");
  const btnFase3 = document.getElementById("p14-btn-fase3");
  const btnReset = document.getElementById("p14-btn-reset");

  const panelTransfer = document.getElementById("p14-transferencia");
  const funcionBtns = document.querySelectorAll(".p14-funcion-btn");

  const pillF1 = document.querySelector(".p14-fase-1-pill");
  const pillF2 = document.querySelector(".p14-fase-2-pill");
  const pillF3 = document.querySelector(".p14-fase-3-pill");

  const simbolos = ["ZUG", "MIP", "TAV"];

  const relaciones = {
    ZUG: "azul",
    MIP: "rojo",
    TAV: "amarillo"
  };

  const funcionesFiguras = {
    azul: "peligro",
    rojo: "seguro",
    amarillo: "neutro"
  };

  let fase = 1;

  // Fase 1
  let entrenamiento = {
    ZUG: 0,
    MIP: 0,
    TAV: 0
  };
  let indiceEntr = 0;
  let entrenamientoCompleto = false;

  // Fase 2
  let ordenPrueba = [];
  let indicePrueba = 0;
  let aciertosPrueba = 0;
  const totalPruebas = 3;

  // Fase 3
  let indiceTransf = 0;
  let aciertosTransf = 0;

  // ------------------------------------------------------------
  // Utilidades
  // ------------------------------------------------------------

  function actualizarPills() {
    pillF1.classList.toggle("p14-activa", fase === 1);
    pillF2.classList.toggle("p14-activa", fase === 2);
    pillF3.classList.toggle("p14-activa", fase === 3);
  }

  function setPalabraActual(palabra) {
    palabraSpan.textContent = palabra;
  }

  function siguienteSimboloEntrenamiento() {
    indiceEntr = (indiceEntr + 1) % simbolos.length;
    setPalabraActual(simbolos[indiceEntr]);
  }

  function shuffle(arr) {
    const copia = [...arr];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  function todasRelacionesEntrenadas() {
    return simbolos.every(s => entrenamiento[s] >= 1);
  }

  function reiniciarTodo() {
    fase = 1;
    entrenamiento = { ZUG: 0, MIP: 0, TAV: 0 };
    indiceEntr = 0;
    entrenamientoCompleto = false;

    ordenPrueba = [];
    indicePrueba = 0;
    aciertosPrueba = 0;

    indiceTransf = 0;
    aciertosTransf = 0;

    barra.style.width = "0%";
    feedback.textContent = "";
    panelTransfer.style.display = "none";

    btnFase2.disabled = true;
    btnFase3.disabled = true;

    instruccionFase.textContent =
      "Fase 1: Aprende explícitamente qué figura corresponde a cada símbolo. " +
      "ZUG → círculo azul, MIP → triángulo rojo, TAV → cuadrado amarillo. " +
      "Selecciona la figura correcta para cada palabra.";

    setPalabraActual(simbolos[indiceEntr]);
    actualizarPills();
  }

  // ------------------------------------------------------------
  // FASE 1 · ENTRENAMIENTO DIRECTO
  // ------------------------------------------------------------

  function manejarClickFase1(figuraId) {
    const palabra = simbolos[indiceEntr];
    const objetivo = relaciones[palabra];

    if (figuraId === objetivo) {
      entrenamiento[palabra] += 1;

      feedback.textContent =
        `Correcto: has reforzado la relación ${palabra} → ${nombreFigura(figuraId)}.`;
      feedback.style.color = "#2a7c4f";

      // Subimos barra simbólicamente según progreso
      const progreso = Math.min(
        100,
        (Object.values(entrenamiento).filter(v => v >= 1).length / simbolos.length) * 70
      );
      barra.style.width = progreso + "%";

      if (todasRelacionesEntrenadas()) {
        entrenamientoCompleto = true;
        btnFase2.disabled = false;
        feedback.textContent =
          "Entrenamiento completado: ya estableciste las tres relaciones. " +
          "Puedes pasar a la Fase 2 para probar si los símbolos funcionan sin feedback.";
      }

      siguienteSimboloEntrenamiento();

    } else {
      feedback.textContent =
        "En esta fase, el objetivo es aprender qué figura va con cada símbolo. " +
        "Observa: ZUG → azul, MIP → rojo, TAV → amarillo.";
      feedback.style.color = "#b83232";
    }
  }

  function nombreFigura(id) {
    if (id === "azul") return "círculo azul";
    if (id === "rojo") return "triángulo rojo";
    if (id === "amarillo") return "cuadrado amarillo";
    return id;
  }

  // ------------------------------------------------------------
  // FASE 2 · PRUEBA SIN FEEDBACK ENSAYO A ENSAYO
  // ------------------------------------------------------------

  function iniciarFase2() {
    if (!entrenamientoCompleto) {
      feedback.textContent =
        "Antes de pasar a la prueba, asegúrate de haber tenido al menos un acierto con cada símbolo.";
      feedback.style.color = "#b83232";
      return;
    }

    fase = 2;
    actualizarPills();
    feedback.textContent = "";
    instruccionFase.textContent =
      "Fase 2: Prueba sin feedback ensayo a ensayo. Selecciona la figura para cada símbolo. " +
      "No verás si aciertas hasta el final: solo registraremos tus respuestas.";

    ordenPrueba = shuffle(simbolos);
    indicePrueba = 0;
    aciertosPrueba = 0;

    barra.style.width = "80%";
    setPalabraActual(ordenPrueba[indicePrueba]);
  }

  function manejarClickFase2(figuraId) {
    const palabra = ordenPrueba[indicePrueba];
    const objetivo = relaciones[palabra];

    if (figuraId === objetivo) {
      aciertosPrueba += 1;
    }

    indicePrueba += 1;

    if (indicePrueba < totalPruebas) {
      setPalabraActual(ordenPrueba[indicePrueba]);
    } else {
      // Resumen de la prueba
      const textoResumen =
        `Prueba completada: respondiste correctamente ${aciertosPrueba} de ${totalPruebas} ` +
        "sin recibir feedback ensayo a ensayo.";

      feedback.textContent = textoResumen;
      feedback.style.color = aciertosPrueba === totalPruebas ? "#2a7c4f" : "#b85c00";

      barra.style.width = "90%";
      btnFase3.disabled = false;

      instruccionFase.textContent =
        "Has comprobado que las relaciones entrenadas funcionan sin refuerzo directo. " +
        "Ahora puedes pasar a la Fase 3 para observar transferencia de funciones.";
    }
  }

  // ------------------------------------------------------------
  // FASE 3 · TRANSFERENCIA DE FUNCIÓN
  // ------------------------------------------------------------

  function iniciarFase3() {
    fase = 3;
    actualizarPills();
    feedback.textContent = "";

    panelTransfer.style.display = "block";
    barra.style.width = "100%";

    indiceTransf = 0;
    aciertosTransf = 0;

    instruccionFase.textContent =
      "Fase 3: Transferencia de función. Las figuras recibieron nuevas funciones " +
      "(peligro, seguridad, neutralidad). Sin nuevo entrenamiento, indica qué función crees " +
      "que evoca cada símbolo.";

    setPalabraActual(simbolos[indiceTransf]);
  }

  function manejarClickFase3(funcionElegida) {
    const palabra = simbolos[indiceTransf];
    const figura = relaciones[palabra];
    const funcionCorrecta = funcionesFiguras[figura];

    if (funcionElegida === funcionCorrecta) {
      aciertosTransf += 1;
      feedback.textContent =
        "Correcto: la palabra heredó la función de la figura con la que estaba relacionada.";
      feedback.style.color = "#2a7c4f";
    } else {
      feedback.textContent =
        "Observa: la función viene de la figura con la que se relacionó el símbolo, " +
        "no de sus letras.";
      feedback.style.color = "#b83232";
    }

    indiceTransf += 1;

    if (indiceTransf < simbolos.length) {
      setPalabraActual(simbolos[indiceTransf]);
    } else {
      // Cierre conceptual
      setPalabraActual("—");

      feedback.textContent =
        `Has completado la transferencia de función. Aciertos: ${aciertosTransf} de ${simbolos.length}. ` +
        "Un símbolo que no tenía significado ahora evoca funciones emocionales por su lugar en la red relacional.";
      feedback.style.color = "#2a7c4f";

      instruccionFase.textContent =
        "Lo que antes era un conjunto de letras sin sentido ahora participa en una clase funcional. " +
        "Este es el núcleo de la equivalencia de estímulos y la transformación de funciones.";
    }
  }

  // ------------------------------------------------------------
  // EVENTOS
  // ------------------------------------------------------------

  figurasBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      if (fase === 1) manejarClickFase1(id);
      else if (fase === 2) manejarClickFase2(id);
      // En fase 3, las figuras ya no se usan directamente
    });
  });

  funcionBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (fase === 3) {
        manejarClickFase3(btn.dataset.func);
      }
    });
  });

  btnFase2.addEventListener("click", iniciarFase2);
  btnFase3.addEventListener("click", iniciarFase3);

  btnReset.addEventListener("click", reiniciarTodo);

  // Inicio
  reiniciarTodo();

});
