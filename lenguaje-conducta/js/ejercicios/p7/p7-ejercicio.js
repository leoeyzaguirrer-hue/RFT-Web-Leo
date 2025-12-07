// ============================================================
// BLOQUE 3 · CONSTRUCTOR DE CONFIGURACIONES RELACIONALES
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  const btnIniciar = document.querySelector(".p7-btn-iniciar");
  const btnReset = document.querySelector(".p7-btn-reset");

  const faseRel = document.querySelector(".p7-fase-relacion");
  const faseObj = document.querySelector(".p7-fase-objeto");
  const faseAcc = document.querySelector(".p7-fase-accion");

  const relCont = document.querySelector(".p7-relaciones");
  const objCont = document.querySelector(".p7-objetos");
  const accCont = document.querySelector(".p7-acciones");

  const fbRel = document.querySelector(".p7-feedback-rel");
  const fbObj = document.querySelector(".p7-feedback-obj");
  const fbAcc = document.querySelector(".p7-feedback-accion");
  const msgFinal = document.querySelector(".p7-mensaje-final");

  // ============================================
  // DATOS DEL EJERCICIO (tres fases)
  // ============================================

  const items = [
    {
      instruccion: "Elige la silla que es más grande que la del escritorio.",
      relacion: "más grande que",
      objetos: [
        { txt: "Silla pequeña", ok: false },
        { txt: "Silla mediana", ok: false },
        { txt: "Silla grande (escritorio)", ok: true },
        { txt: "Silla plegable", ok: false }
      ],
      acciones: [
        { txt: "Sentarse", ok: true },
        { txt: "Evitar", ok: false },
        { txt: "Pedir ayuda", ok: false }
      ]
    },
    {
      instruccion: "Selecciona la silla que es más cómoda y la de tu escritorio.",
      relacion: "más cómoda y la del escritorio",
      objetos: [
        { txt: "Silla rígida", ok: false },
        { txt: "Silla acolchada", ok: false },
        { txt: "Silla acolchada del escritorio", ok: true },
        { txt: "Banquito", ok: false }
      ],
      acciones: [
        { txt: "Acercarse", ok: true },
        { txt: "Evitar", ok: false },
        { txt: "Postergar", ok: false }
      ]
    },
    {
      instruccion: "Elige la silla que siempre usas cuando estás nervioso.",
      relacion: "historial / uso aprendido",
      objetos: [
        { txt: "Silla nueva", ok: false },
        { txt: "Silla favorita (historia)", ok: true },
        { txt: "Silla roja", ok: false }
      ],
      acciones: [
        { txt: "Regularse / Calmarse", ok: true },
        { txt: "Evitar", ok: false },
        { txt: "Acercarse", ok: false }
      ]
    }
  ];

  let current = null;

  // ============================================
  // INICIAR EJERCICIO
  // ============================================

  btnIniciar.addEventListener("click", () => {
    msgFinal.textContent = "";
    fbRel.textContent = "";
    fbObj.textContent = "";
    fbAcc.textContent = "";

    faseRel.style.display = "block";
    faseObj.style.display = "none";
    faseAcc.style.display = "none";

    // Elegir un caso al azar
    current = items[Math.floor(Math.random() * items.length)];

    document.querySelector(".p7-instruccion").textContent =
      "Instrucción: " + current.instruccion;

    cargarRelaciones();
  });

  // ============================================
  // FASE 1 — RELACIÓN
  // ============================================

  function cargarRelaciones() {
    relCont.innerHTML = "";

    const opciones = [
      "más grande que",
      "más cómoda y la del escritorio",
      "historial / uso aprendido",
      "la más vieja",
      "la roja"
    ];

    opciones.forEach(op => {
      const div = document.createElement("div");
      div.classList.add("p7-rel");
      div.textContent = op;
      div.dataset.ok = (op === current.relacion);
      relCont.appendChild(div);

      div.addEventListener("click", () => {
        if (div.dataset.ok === "true") {
          fbRel.textContent = "Correcto: estás respondiendo a la relación, no al objeto.";
          fbRel.style.color = "#2a7c4f";
          faseObj.style.display = "block";
          cargarObjetos();
        } else {
          fbRel.textContent = "Observa la relación, no la forma del objeto.";
          fbRel.style.color = "#b83232";
        }
      });
    });
  }

  // ============================================
  // FASE 2 — OBJETO
  // ============================================

  function cargarObjetos() {
    objCont.innerHTML = "";

    current.objects.forEach(o => {
      const div = document.createElement("div");
      div.classList.add("p7-obj");
      div.textContent = o.txt;
      div.dataset.ok = o.ok;
      objCont.appendChild(div);

      div.addEventListener("click", () => {
        if (div.dataset.ok === "true") {
          fbObj.textContent = "Correcto: seleccionaste el objeto que cumple la relación.";
          fbObj.style.color = "#2a7c4f";
          faseAcc.style.display = "block";
          cargarAcciones();
        } else {
          fbObj.textContent = "Ese objeto no cumple la relación indicada.";
          fbObj.style.color = "#b83232";
        }
      });
    });
  }

  // ============================================
  // FASE 3 — ACCIÓN
  // ============================================

  function cargarAcciones() {
    accCont.innerHTML = "";

    current.actions = current.acciones;

    current.actions.forEach(a => {
      const div = document.createElement("div");
      div.classList.add("p7-acc");
      div.textContent = a.txt;
      div.dataset.ok = a.ok;
      accCont.appendChild(div);

      div.addEventListener("click", () => {
        if (div.dataset.ok === "true") {
          fbAcc.textContent = "Correcto: acción coherente con la red relacional.";
          fbAcc.style.color = "#2a7c4f";

          msgFinal.textContent =
            "Respondiste a la red relacional completa. Esto es significado en acción: responder a relaciones, no a formas.";

        } else {
          fbAcc.textContent =
            "La acción no coincide con la función derivada de la relación.";
          fbAcc.style.color = "#b83232";
        }
      });
    });
  }

  // ============================================
  // REINICIAR
  // ============================================

  btnReset.addEventListener("click", () => {
    document.querySelector(".p7-instruccion").textContent =
      "Haz clic en “Iniciar ejercicio” para recibir la primera configuración relacional.";

    faseRel.style.display = "none";
    faseObj.style.display = "none";
    faseAcc.style.display = "none";
    msgFinal.textContent = "";

    fbRel.textContent = "";
    fbObj.textContent = "";
    fbAcc.textContent = "";
  });
});
