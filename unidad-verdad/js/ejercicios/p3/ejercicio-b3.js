document.addEventListener("DOMContentLoaded", () => {
  const avatar = document.getElementById("mec-avatar");
  const feedback = document.getElementById("mec-feedback");
  const opcFuncional = document.getElementById("opc-funcional");
  const reinicio = document.getElementById("mec-reiniciar");

  const modBio = document.querySelector(".modulo.bio");
  const modCog = document.querySelector(".modulo.cog");
  const modNeuro = document.querySelector(".modulo.neuro");

  let activaciones = 0;
  let mecanismosUsados = new Set();

  const expresiones = {
    dopamina: "😵",
    sesgo: "😧",
    procesamiento: "😕",
    inhibicion: "😣",
    circuito: "😫"
  };

  const modulos = {
    dopamina: modBio,
    procesamiento: modNeuro,
    sesgo: modCog,
    inhibicion: modCog,
    circuito: modNeuro
  };

  document.querySelectorAll(".mec-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const mech = btn.dataset.mech;
      mecanismosUsados.add(mech);

      // Cambiar avatar
      avatar.textContent = expresiones[mech];

      // Activar módulo visual
      Object.values(modulos).forEach(m => m.classList.remove("activo"));
      modulos[mech].classList.add("activo");

      activaciones++;

      // Desbloquear opción funcional 
      if (mecanismosUsados.size >= 3) {
        opcFuncional.classList.remove("oculto");
      }

      feedback.textContent = "";
    });
  });

  // Respuestas incorrectas
  document.querySelectorAll(".opc-incorrecta").forEach(opc => {
    opc.addEventListener("click", () => {
      feedback.textContent = "❌ Esa intervención no puede derivarse del mecanismo interno.";
      feedback.style.color = "#b30000";
    });
  });

  // Respuesta parcial
  document.querySelector(".opc-parcial").addEventListener("click", () => {
    feedback.textContent = "⚠️ Correcto… pero aún no indica qué hacer clínicamente.";
    feedback.style.color = "#b38300";
  });

  // Opción funcional final
  opcFuncional.addEventListener("click", () => {
    feedback.textContent =
      "🎯 Exacto: conocer la causa mecánica no basta. Lo que importa es qué hace la conducta aquí y ahora.";
    feedback.style.color = "#0f7b33";

    // Limpiar visualmente módulos
    [modBio, modCog, modNeuro].forEach(m => m.classList.remove("activo"));
    avatar.textContent = "🙂";
  });

  // Reiniciar ejercicio
  reinicio.addEventListener("click", () => {
    avatar.textContent = "🙂";
    feedback.textContent = "";
    mecanismosUsados.clear();
    activaciones = 0;
    opcFuncional.classList.add("oculto");
    [modBio, modCog, modNeuro].forEach(m => m.classList.remove("activo"));
  });
});
