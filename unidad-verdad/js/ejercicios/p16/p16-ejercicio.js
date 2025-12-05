// ============================================================
// P16 · EJERCICIO · MUSEO DE LAS EXPLICACIONES ANTIGUAS
// Lógica: exploración de salas, feedback y Panel Pragmatista
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const salasEstado = {
    correspondencia: false,
    coherencia: false,
    mecanismo: false,
  };

  const botonesExplorar = document.querySelectorAll(".p16-btn-explorar");
  const botonesOpciones = document.querySelectorAll(".p16-opcion");
  const dots = document.querySelectorAll(".p16-dot");
  const panelFinal = document.querySelector(".p16-panel-final");
  const restartBtn = document.getElementById("p16-restart-btn");

  // Helper: actualizar visual del progreso
  function actualizarProgresoVisual() {
    dots.forEach((dot) => {
      const sala = dot.dataset.sala;
      if (salasEstado[sala]) {
        dot.classList.add("p16-dot-activo");
      } else {
        dot.classList.remove("p16-dot-activo");
      }
    });
  }

  // Helper: comprobar si todas las salas han sido completadas
  function revisarComplecionTotal() {
    const todasCompletas = Object.values(salasEstado).every(Boolean);

    if (todasCompletas && panelFinal) {
      panelFinal.hidden = false;
      panelFinal.classList.add("p16-panel-visible");
      panelFinal.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  // Helper: marcar sala como completada (estado + estilos)
  function marcarSalaCompletada(nombreSala) {
    salasEstado[nombreSala] = true;
    actualizarProgresoVisual();

    const sala = document.querySelector(`.p16-sala[data-sala="${nombreSala}"]`);
    if (sala) {
      sala.classList.add("p16-sala-completada");
    }

    revisarComplecionTotal();
  }

  // Mostrar menú de intervenciones al pulsar "Intentar intervenir"
  botonesExplorar.forEach((btn) => {
    btn.addEventListener("click", () => {
      const sala = btn.dataset.sala;
      if (!sala) return;

      const menu = document.querySelector(`.p16-menu-intervenciones[data-menu="${sala}"]`);
      if (menu) {
        menu.hidden = false;
      }
    });
  });

  // Manejo de selección de opciones de intervención
  botonesOpciones.forEach((opcion) => {
    opcion.addEventListener("click", () => {
      const sala = opcion.dataset.sala;
      if (!sala) return;

      const feedback = document.querySelector(`.p16-feedback[data-feedback="${sala}"]`);
      const avatar = document.querySelector(`.p16-avatar[data-avatar="${sala}"]`);

      if (feedback) {
        let mensaje = "";

        if (sala === "correspondencia") {
          mensaje =
            "La explicación señala un mecanismo biológico posible, pero no te indica " +
            "qué comportamiento concreto cambiar, ni en qué contexto. Ayuda a pensar, " +
            "no a intervenir.";
        } else if (sala === "coherencia") {
          mensaje =
            "La narrativa da sentido a la historia de la persona, pero no define qué " +
            "harás mañana en sesión. No hay una conducta objetivo ni una contingencia clara.";
        } else if (sala === "mecanismo") {
          mensaje =
            "La causa interna suena técnica, pero no ofrece una palanca observable de " +
            "intervención. Sin conducta en contexto, no hay lugar claro para actuar.";
        }

        feedback.textContent = mensaje;
      }

      if (avatar) {
        // Cambios sutiles en el emoji para reflejar “insight parcial”
        if (sala === "correspondencia") avatar.textContent = "😐";
        if (sala === "coherencia") avatar.textContent = "😕";
        if (sala === "mecanismo") avatar.textContent = "😟";
      }

      marcarSalaCompletada(sala);
    });
  });

  // Reiniciar el museo por completo
  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      // Reset estado lógico
      salasEstado.correspondencia = false;
      salasEstado.coherencia = false;
      salasEstado.mecanismo = false;

      // Ocultar menús y borrar feedback
      const menus = document.querySelectorAll(".p16-menu-intervenciones");
      menus.forEach((menu) => {
        menu.hidden = true;
      });

      const feedbacks = document.querySelectorAll(".p16-feedback");
      feedbacks.forEach((fb) => {
        fb.textContent = "";
      });

      // Reset estilos de salas
      const salas = document.querySelectorAll(".p16-sala");
      salas.forEach((sala) => {
        sala.classList.remove("p16-sala-completada");
      });

      // Reset panel final
      if (panelFinal) {
        panelFinal.hidden = true;
        panelFinal.classList.remove("p16-panel-visible");
      }

      // Reset progreso visual
      actualizarProgresoVisual();

      // Opcional: scroll al inicio del ejercicio
      const contenedor = document.querySelector(".p16-ejercicio-container");
      if (contenedor) {
        contenedor.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
});
