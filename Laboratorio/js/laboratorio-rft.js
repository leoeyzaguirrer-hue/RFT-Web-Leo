// ============================================================
// LABORATORIO RFT · LÓGICA DE FASES Y CLAVES RELACIONALES
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // --------- Utilidades básicas de fase ----------
  const phases = document.querySelectorAll(".lab-phase");

  const goToPhase = (num) => {
    phases.forEach((ph) => {
      const isActive = ph.dataset.phase === String(num);
      ph.classList.toggle("active", isActive);
    });
    // Reiniciar scroll interno al cambiar de fase
    const activeInner = document.querySelector(".lab-phase.active .phase-inner");
    if (activeInner) activeInner.scrollTop = 0;
  };

  // ============================================================
  // FASE 1 -> FASE 2
  // ============================================================

  const btnFase1Continuar = document.getElementById("btnFase1Continuar");
  if (btnFase1Continuar) {
    btnFase1Continuar.addEventListener("click", () => {
      goToPhase(2);
    });
  }

  // ============================================================
  // FASE 2 · Igualdad: manejo de A=B, B=C y combinatoria
  // ============================================================

  const bloqueAB = document.getElementById("bloqueAB");
  const bloqueBC = document.getElementById("bloqueBC");
  const btnABNext = document.getElementById("btnABNext");
  const btnBCNext = document.getElementById("btnBCNext");
  const combIgualdad = document.getElementById("combIgualdad");
  const btnIrMenuClaves = document.getElementById("btnIrMenuClaves");

  if (btnABNext && bloqueBC) {
    btnABNext.addEventListener("click", () => {
      bloqueBC.classList.remove("rel-card-disabled");
      const btn = bloqueBC.querySelector("button");
      if (btn) btn.disabled = false;
    });
  }

  if (btnBCNext && combIgualdad) {
    btnBCNext.addEventListener("click", () => {
      combIgualdad.style.display = "block";
      const inner = combIgualdad.closest(".phase-inner");
      if (inner) {
        inner.scrollTo({ top: inner.scrollHeight, behavior: "smooth" });
      }
    });
  }

  if (btnIrMenuClaves) {
    btnIrMenuClaves.addEventListener("click", () => {
      goToPhase(3);
    });
  }

  // ============================================================
  // FASE 3 · Menú de claves relacionales
  // ============================================================

  const menuButtons = document.querySelectorAll(".menu-btn");
  const btnVolverIgualdad = document.getElementById("btnVolverIgualdad");

  // Configuración de cada clave relacional para Fase 4
  const CLAVES = {
    mayor: {
      tituloFase: "Fase 4 · Clave “Es mayor que / menor que”",
      intro:
        "Aquí los estímulos se organizan en función de una dimensión de magnitud (mayor / menor). Observa cómo la misma tríada se ordena jerárquicamente.",
      cardNombre: "Es mayor que / menor que",
      cardSubtitulo:
        "Piensa la relación como si A fuera “más” que B, y B “más” que C en algún continuo.",
      abLetras: "A > B",
      abIconos: "🔶 > 🟦",
      bcLetras: "B > C",
      bcIconos: "🟦 > 🔴",
      acLetras: "A > C",
      acIconos: "🔶 > 🔴",
      textoComb:
        "Si A es mayor que B, y B mayor que C, puedes derivar que A es mayor que C sin entrenar directamente esa relación."
    },
    temporal: {
      tituloFase: "Fase 4 · Clave Temporal (antes – después)",
      intro:
        "Ahora la red se organiza en términos de tiempo. Importa qué ocurre antes y qué ocurre después.",
      cardNombre: "Temporal (antes – después)",
      cardSubtitulo:
        "Imagina A, B y C como eventos en una secuencia temporal: uno ocurre antes que otro.",
      abLetras: "A antes que B",
      abIconos: "🔶 antes que 🟦",
      bcLetras: "B antes que C",
      bcIconos: "🟦 antes que 🔴",
      acLetras: "A antes que C",
      acIconos: "🔶 antes que 🔴",
      textoComb:
        "Si A ocurre antes que B, y B antes que C, entonces puede derivarse que A ocurre antes que C, aunque nunca se haya entrenado esa comparación directamente."
    },
    jerarquia: {
      tituloFase: "Fase 4 · Clave Jerárquica",
      intro:
        "En esta clave se establecen relaciones de inclusión o pertenencia. Un elemento puede ser parte de otro o estar contenido en una categoría superior.",
      cardNombre: "Jerarquía (inclusión / pertenencia)",
      cardSubtitulo:
        "Piensa A, B y C como niveles dentro de una misma estructura jerárquica.",
      abLetras: "A ⊂ B",
      abIconos: "🔶 dentro de 🟦",
      bcLetras: "B ⊂ C",
      bcIconos: "🟦 dentro de 🔴",
      acLetras: "A ⊂ C",
      acIconos: "🔶 dentro de 🔴",
      textoComb:
        "Si A está incluido en B y B está incluido en C, derivar que A está incluido en C es un ejemplo de vinculación combinatoria bajo clave jerárquica."
    },
    comparacion: {
      tituloFase: "Fase 4 · Clave de Comparación",
      intro:
        "Aquí los estímulos se relacionan por parecido, similitud o proximidad en alguna dimensión relevante.",
      cardNombre: "Comparación (más parecido que)",
      cardSubtitulo:
        "Supón que algunos estímulos son más parecidos entre sí que a otros.",
      abLetras: "A ≈ B",
      abIconos: "🔶 ≈ 🟦",
      bcLetras: "B ≈ C",
      bcIconos: "🟦 ≈ 🔴",
      acLetras: "A ≈ C",
      acIconos: "🔶 ≈ 🔴",
      textoComb:
        "Si A se considera más parecido a B, y B más parecido a C que a otros estímulos, se puede derivar una relación de similitud entre A y C."
    },
    causal: {
      tituloFase: "Fase 4 · Clave Causal (causa – efecto)",
      intro:
        "En esta clave se organizan los estímulos como causas y efectos dentro de una misma red funcional.",
      cardNombre: "Causal (causa – efecto)",
      cardSubtitulo:
        "Imagina A, B y C como eventos encadenados donde uno produce consecuencias en el siguiente.",
      abLetras: "A → B",
      abIconos: "🔶 causa 🟦",
      bcLetras: "B → C",
      bcIconos: "🟦 causa 🔴",
      acLetras: "A → C",
      acIconos: "🔶 conduce a 🔴",
      textoComb:
        "Si A produce B y B produce C, el organismo puede comportarse como si A produjera C, incluso cuando esa combinación no fue ensayada directamente."
    },
    condicional: {
      tituloFase: "Fase 4 · Clave Condicional (si – entonces)",
      intro:
        "Ahora la red se describe en términos de reglas condicionales: si ocurre un estímulo, entonces se espera otro.",
      cardNombre: "Condicional (si – entonces)",
      cardSubtitulo:
        "Piensa cada estímulo como antecedente posible de una consecuencia.",
      abLetras: "Si A, entonces B",
      abIconos: "Si 🔶, entonces 🟦",
      bcLetras: "Si B, entonces C",
      bcIconos: "Si 🟦, entonces 🔴",
      acLetras: "Si A, entonces C",
      acIconos: "Si 🔶, entonces 🔴",
      textoComb:
        "Si se ha aprendido que “si A entonces B” y “si B entonces C”, se puede derivar la regla “si A entonces C” sin entrenamiento directo."
    },
    valorativo: {
      tituloFase: "Fase 4 · Clave Valorativa (mejor – peor)",
      intro:
        "En esta clave la red se organiza según juicios de valor: mejor, peor, preferible, menos deseable.",
      cardNombre: "Valorativo (mejor que / peor que)",
      cardSubtitulo:
        "Imagina A, B y C como opciones que pueden ser valoradas diferencialmente.",
      abLetras: "A ≻ B",
      abIconos: "🔶 mejor que 🟦",
      bcLetras: "B ≻ C",
      bcIconos: "🟦 mejor que 🔴",
      acLetras: "A ≻ C",
      acIconos: "🔶 mejor que 🔴",
      textoComb:
        "Si A se evalúa como mejor que B, y B mejor que C, entonces se puede derivar que A es mejor que C, aunque esa comparación no se haya entrenado directamente."
    }
  };

  // Elementos de Fase 4
  const fase4Titulo = document.getElementById("fase4Titulo");
  const fase4Intro = document.getElementById("fase4Intro");
  const fase4ClaveNombre = document.getElementById("fase4ClaveNombre");
  const fase4ClaveSubtitulo = document.getElementById("fase4ClaveSubtitulo");

  const fase4Steps = document.querySelectorAll(".fase4-step");
  const btnFase4Comenzar = document.getElementById("btnFase4Comenzar");
  const btnFase4ABNext = document.getElementById("btnFase4ABNext");
  const btnFase4BCNext = document.getElementById("btnFase4BCNext");
  const btnElegirOtraClave = document.getElementById("btnElegirOtraClave");
  const btnReiniciarLab = document.getElementById("btnReiniciarLab");

  const fase4ABLetras = document.getElementById("fase4ABLetras");
  const fase4ABIconos = document.getElementById("fase4ABIconos");
  const fase4BCLetras = document.getElementById("fase4BCLetras");
  const fase4BCIconos = document.getElementById("fase4BCIconos");
  const fase4ACLetras = document.getElementById("fase4ACLetras");
  const fase4ACIconos = document.getElementById("fase4ACIconos");
  const fase4CombTexto = document.getElementById("fase4CombTexto");

  let claveActual = null;

  const mostrarStep4 = (n) => {
    fase4Steps.forEach((st) => {
      st.classList.toggle("active", st.dataset.step === String(n));
    });
    const inner = document.querySelector('.lab-phase[data-phase="4"] .phase-inner');
    if (inner) inner.scrollTop = 0;
  };

  const cargarClaveEnFase4 = (idClave) => {
    const cfg = CLAVES[idClave];
    if (!cfg) return;

    claveActual = idClave;

    if (fase4Titulo) fase4Titulo.textContent = cfg.tituloFase;
    if (fase4Intro) fase4Intro.textContent = cfg.intro;
    if (fase4ClaveNombre) fase4ClaveNombre.textContent = cfg.cardNombre;
    if (fase4ClaveSubtitulo) fase4ClaveSubtitulo.textContent = cfg.cardSubtitulo;

    if (fase4ABLetras) fase4ABLetras.textContent = cfg.abLetras;
    if (fase4ABIconos) fase4ABIconos.textContent = cfg.abIconos;
    if (fase4BCLetras) fase4BCLetras.textContent = cfg.bcLetras;
    if (fase4BCIconos) fase4BCIconos.textContent = cfg.bcIconos;
    if (fase4ACLetras) fase4ACLetras.textContent = cfg.acLetras;
    if (fase4ACIconos) fase4ACIconos.textContent = cfg.acIconos;
    if (fase4CombTexto) fase4CombTexto.textContent = cfg.textoComb;

    // Siempre iniciar en step 1 (introducción de la clave)
    mostrarStep4(1);
  };

  // Al pulsar un botón del menú de claves
  menuButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const clave = btn.dataset.clave;
      if (!clave) return;
      cargarClaveEnFase4(clave);
      goToPhase(4);
    });
  });

  // Volver desde Fase 3 a la clave de igualdad
  if (btnVolverIgualdad) {
    btnVolverIgualdad.addEventListener("click", () => {
      goToPhase(2);
    });
  }

  // Controles internos de pasos en Fase 4
  if (btnFase4Comenzar) {
    btnFase4Comenzar.addEventListener("click", () => {
      mostrarStep4(2);
    });
  }

  if (btnFase4ABNext) {
    btnFase4ABNext.addEventListener("click", () => {
      mostrarStep4(3);
    });
  }

  if (btnFase4BCNext) {
    btnFase4BCNext.addEventListener("click", () => {
      mostrarStep4(4);
    });
  }

  if (btnElegirOtraClave) {
    btnElegirOtraClave.addEventListener("click", () => {
      goToPhase(3);
    });
  }

  if (btnReiniciarLab) {
    btnReiniciarLab.addEventListener("click", () => {
      // Reset visual sencillo: recargar página
      window.location.reload();
    });
  }
});
