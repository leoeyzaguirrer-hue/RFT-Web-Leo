document.addEventListener("DOMContentLoaded", () => {
  const contextos = document.querySelectorAll(".p19-contexto");
  const funcionesBox = document.getElementById("p19-funciones");
  const conductasBox = document.getElementById("p19-conductas");
  const cadenaBox = document.getElementById("p19-cadena");
  const feedback = document.getElementById("p19-feedback");
  const reiniciar = document.getElementById("p19-reiniciar");

  // Mapeo limpio por claves, sin depender del texto visual
  const datos = {
    examen: {
      funcionCorrecta: "evitacion",
      conductaCorrecta: "no_presentarse"
    },
    discusion: {
      funcionCorrecta: "autocritica",
      conductaCorrecta: "retirarse"
    },
    tesis: {
      funcionCorrecta: "perfeccionismo",
      conductaCorrecta: "reescribir"
    },
    familia: {
      funcionCorrecta: "bloqueo",
      conductaCorrecta: "no_iniciar"
    }
  };

  let contextoActual = null;
  let funcionSeleccionada = null;

  // Renderizar las opciones de función
  function mostrarFunciones() {
    funcionesBox.innerHTML = `
      <strong>Selecciona la función predominante:</strong>
      <div class="p19-opciones">
        <button data-func="evitacion">🚫 Evitación</button>
        <button data-func="autocritica">😔 Autocrítica</button>
        <button data-func="perfeccionismo">🔥 Perfeccionismo rígido</button>
        <button data-func="bloqueo">🧊 Bloqueo conductual</button>
      </div>
    `;
    conductasBox.innerHTML = "";
    cadenaBox.textContent = "";
    feedback.textContent = "";
    funcionSeleccionada = null;

    const botonesFuncion = funcionesBox.querySelectorAll("button");

    botonesFuncion.forEach(btnFunc => {
      btnFunc.addEventListener("click", () => {
        // Marcar visualmente la opción elegida
        botonesFuncion.forEach(b => b.classList.remove("p19-activa"));
        btnFunc.classList.add("p19-activa");

        funcionSeleccionada = btnFunc.dataset.func;
        mostrarConductas();
      });
    });
  }

  // Renderizar las opciones de conducta en función de la función elegida
  function mostrarConductas() {
    conductasBox.innerHTML = `
      <strong>Selecciona la conducta más probable:</strong>
      <div class="p19-opciones">
        <button data-cond="no_presentarse">No presentarse</button>
        <button data-cond="retirarse">Retirarse en silencio</button>
        <button data-cond="reescribir">Reescribir sin entregar</button>
        <button data-cond="no_iniciar">No iniciar tareas</button>
      </div>
    `;

    cadenaBox.textContent = "";
    feedback.textContent = "";

    const botonesConducta = conductasBox.querySelectorAll("button");

    botonesConducta.forEach(btnCond => {
      btnCond.addEventListener("click", () => {
        if (!contextoActual || !funcionSeleccionada) return;

        // Marcar visualmente la conducta elegida
        botonesConducta.forEach(b => b.classList.remove("p19-activa"));
        btnCond.classList.add("p19-activa");

        const info = datos[contextoActual];

        const esFuncionCorrecta =
          funcionSeleccionada === info.funcionCorrecta;
        const esConductaCorrecta =
          btnCond.dataset.cond === info.conductaCorrecta;

        if (esFuncionCorrecta && esConductaCorrecta) {
          feedback.textContent =
            "✅ Correcto. La misma frase cumple una función distinta según el contexto.";
          cadenaBox.textContent =
            "Frase → Paquete relacional activo → " +
            formatearFuncion(info.funcionCorrecta) +
            " → " +
            formatearConducta(info.conductaCorrecta);
        } else {
          feedback.textContent =
            "❌ Puedes volver a elegir función y conducta. Revisa qué encaja mejor con este contexto.";
          cadenaBox.textContent = "";
        }
      });
    });
  }

  function formatearFuncion(clave) {
    switch (clave) {
      case "evitacion":
        return "Evitación";
      case "autocritica":
        return "Autocrítica";
      case "perfeccionismo":
        return "Perfeccionismo rígido";
      case "bloqueo":
        return "Bloqueo conductual";
      default:
        return "";
    }
  }

  function formatearConducta(clave) {
    switch (clave) {
      case "no_presentarse":
        return "No presentarse al examen";
      case "retirarse":
        return "Retirarse en silencio";
      case "reescribir":
        return "Reescribir sin entregar";
      case "no_iniciar":
        return "No iniciar nuevas tareas";
      default:
        return "";
    }
  }

  // Selección de contexto
  contextos.forEach(btn => {
    btn.addEventListener("click", () => {
      contextoActual = btn.dataset.contexto;
      mostrarFunciones();
    });
  });

  // Reinicio total
  reiniciar.addEventListener("click", () => {
    funcionesBox.textContent = "";
    conductasBox.textContent = "";
    cadenaBox.textContent = "";
    feedback.textContent = "";
    contextoActual = null;
    funcionSeleccionada = null;
  });
});
