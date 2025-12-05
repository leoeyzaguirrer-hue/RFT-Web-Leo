// ============================================================
// P18 · EJERCICIO · EL ENTRENADOR DE DECISIONES TERAPÉUTICAS
// Simulación interactiva, feedback inmediato, registro de estilos,
// autocorrección y panel final.
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  const botones = document.querySelectorAll(".p18-estilo-btn");
  const escenario = document.getElementById("p18-escenario");
  const avatar = document.getElementById("p18-avatar");
  const casoTexto = document.getElementById("p18-caso-texto");
  const efectos = document.getElementById("p18-efectos");
  const mensajeEstilo = document.getElementById("p18-mensaje-estilo");

  const countTeorico = document.getElementById("p18-count-teorico");
  const countNarrativo = document.getElementById("p18-count-narrativo");
  const countFuncional = document.getElementById("p18-count-funcional");

  const panelFinal = document.getElementById("p18-panel-final");
  const restartBtn = document.getElementById("p18-restart-btn");

  let registros = {
    teorico: 0,
    narrativo: 0,
    funcional: 0
  };

  function actualizarProgreso() {
    countTeorico.textContent = registros.teorico;
    countNarrativo.textContent = registros.narrativo;
    countFuncional.textContent = registros.funcional;
  }

  function limpiarEfectos() {
    efectos.innerHTML = "";
  }

  function mostrarMensaje(msg) {
    mensajeEstilo.textContent = msg;
  }

  function activarPanelFinal() {
    panelFinal.hidden = false;
    panelFinal.classList.add("p18-panel-visible");
    panelFinal.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // ============================================================
  // ESTILOS DE TERAPEUTA — EFECTOS VISUALES
  // ============================================================

  const efectosPorEstilo = {
    teorico: {
      fondo: "linear-gradient(135deg, #d7e3f0, #a1b7c7)",
      avatar: "😐",
      mensaje: "“Explicas, pero no modificas función.”",
      efectoExtra: "<div class='p18-nube'>💭</div>"
    },
    narrativo: {
      fondo: "linear-gradient(135deg, #f7d7b0, #f1a96e)",
      avatar: "😕",
      mensaje: "“Coherencia no es cambio.”",
      efectoExtra: "<div class='p18-linea-tiempo'></div>"
    },
    funcional: {
      fondo: "linear-gradient(135deg, #fff1b2, #ffd86b)",
      avatar: "🙂",
      mensaje: "“El terapeuta funcional elige según impacto, no contenido.”",
      efectoExtra:
        "<div class='p18-opciones'>🎯 Exposición · 🌱 Valores · 💬 Defusión</div>"
    }
  };

  // ============================================================
  // ACCIONES AL ELEGIR ESTILO
  // ============================================================

  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
      const estilo = btn.dataset.estilo;

      // Registrar elección
      registros[estilo]++;
      actualizarProgreso();

      // Cambiar fondo
      escenario.style.background = efectosPorEstilo[estilo].fondo;

      // Cambiar avatar
      avatar.textContent = efectosPorEstilo[estilo].avatar;

      // Añadir efectos visuales
      limpiarEfectos();
      efectos.innerHTML = efectosPorEstilo[estilo].efectoExtra;

      // Mensaje
      mostrarMensaje(efectosPorEstilo[estilo].mensaje);

      // Activar panel final si probó los 3
      if (registros.teorico > 0 && registros.narrativo > 0 && registros.funcional > 0) {
        activarPanelFinal();
      }
    });
  });

  // ============================================================
  // REINICIO COMPLETO
  // ============================================================

  restartBtn.addEventListener("click", () => {
    registros = { teorico: 0, narrativo: 0, funcional: 0 };
    actualizarProgreso();

    mensajeEstilo.textContent = "";
    limpiarEfectos();

    // Reset mini escenario
    escenario.style.background = "linear-gradient(135deg, #ffffff, #eaf9ff)";
    avatar.textContent = "🙂";
    casoTexto.textContent =
      "“El consultante quiere mejorar su relación, pero evita conversaciones incómodas.”";

    // Ocultar panel final
    panelFinal.hidden = true;
    panelFinal.classList.remove("p18-panel-visible");

    // Scroll
    const cont = document.querySelector(".p18-ejercicio-container");
    cont.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
