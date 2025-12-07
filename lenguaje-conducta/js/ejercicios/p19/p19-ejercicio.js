document.addEventListener("DOMContentLoaded", () => {
  const contextos = document.querySelectorAll(".p19-contexto");
  const funcionesBox = document.getElementById("p19-funciones");
  const conductasBox = document.getElementById("p19-conductas");
  const cadenaBox = document.getElementById("p19-cadena");
  const feedback = document.getElementById("p19-feedback");
  const reiniciar = document.getElementById("p19-reiniciar");

  const datos = {
    examen: {
      funcion: "Evitación",
      conducta: "No presentarse al examen"
    },
    discusion: {
      funcion: "Autocrítica",
      conducta: "Retirarse en silencio"
    },
    tesis: {
      funcion: "Perfeccionismo rígido",
      conducta: "Reescribir sin entregar"
    },
    familia: {
      funcion: "Bloqueo conductual",
      conducta: "No iniciar nuevas tareas"
    }
  };

  let contextoActual = null;
  let funcionSeleccionada = null;

  contextos.forEach(btn => {
    btn.addEventListener("click", () => {
      contextoActual = btn.dataset.contexto;
      funcionSeleccionada = null;
      cadenaBox.textContent = "";
      feedback.textContent = "";

      funcionesBox.innerHTML = `
        <strong>Selecciona la función predominante:</strong>
        <div class="p19-opciones">
          <button>🚫 Evitación</button>
          <button>😔 Autocrítica</button>
          <button>🔥 Perfeccionismo</button>
          <button>🧊 Bloqueo</button>
        </div>
      `;

      conductasBox.innerHTML = "";

      const botonesFuncion = funcionesBox.querySelectorAll("button");

      botonesFuncion.forEach(btnFunc => {
        btnFunc.addEventListener("click", () => {
          funcionSeleccionada = btnFunc.innerText.replace(/[^\w\s]/gi, "").trim();

          conductasBox.innerHTML = `
            <strong>Selecciona la conducta más probable:</strong>
            <div class="p19-opciones">
              <button>No presentarse</button>
              <button>Retirarse en silencio</button>
              <button>Reescribir sin entregar</button>
              <button>No iniciar tareas</button>
            </div>
          `;

          const botonesConducta = conductasBox.querySelectorAll("button");

          botonesConducta.forEach(btnCond => {
            btnCond.addEventListener("click", () => {
              const correctaFuncion = datos[contextoActual].funcion;
              const correctaConducta = datos[contextoActual].conducta;

              if (
                funcionSeleccionada.toLowerCase().includes(correctaFuncion.toLowerCase().split(" ")[0]) &&
                btnCond.innerText === correctaConducta
              ) {
                feedback.textContent = "✅ Correcto. La misma frase cumple una función distinta según el contexto.";
                cadenaBox.textContent =
                  "Frase → Paquete relacional activo → " +
                  datos[contextoActual].funcion +
                  " → " +
                  datos[contextoActual].conducta;
              } else {
                feedback.textContent =
                  "❌ Revisa qué función domina realmente en este contexto específico.";
              }
            });
          });
        });
      });
    });
  });

  reiniciar.addEventListener("click", () => {
    funcionesBox.textContent = "";
    conductasBox.textContent = "";
    cadenaBox.textContent = "";
    feedback.textContent = "";
    contextoActual = null;
    funcionSeleccionada = null;
  });
});
