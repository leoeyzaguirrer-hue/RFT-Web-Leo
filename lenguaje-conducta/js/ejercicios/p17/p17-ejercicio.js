document.addEventListener("DOMContentLoaded", () => {
  const tarjetas = document.querySelectorAll(".p17-card");
  const dropzone = document.getElementById("p17-dropzone");
  const nube = document.getElementById("p17-nube");
  const feedback = document.getElementById("p17-feedback");
  const respuesta = document.getElementById("p17-respuesta");
  const reiniciar = document.getElementById("p17-reiniciar");
  const claseActualLabel = document.getElementById("p17-clase-actual-label");
  const claseActualBox = document.getElementById("p17-clase-actual");
  const resumenFinal = document.getElementById("p17-resumen-final");
  const zonaEstimulos = document.getElementById("p17-estimulos");

  const clases = [
    { id: "manzana", nombre: "MANZANA", total: 3, funcion: "salivar / acercarse" },
    { id: "silla", nombre: "SILLA", total: 3, funcion: "sentarse / adoptar postura de uso" },
    { id: "perro", nombre: "PERRO", total: 3, funcion: "acercarse, acariciar o evitar" }
  ];

  let indiceClase = 0;
  let contadorCorrectos = 0;
  let tarjetaArrastrada = null;

  function actualizarUIClase() {
    const clase = clases[indiceClase];
    claseActualLabel.textContent = `Fase ${indiceClase + 1} de ${clases.length}`;
    claseActualBox.textContent = clase.nombre;
    contadorCorrectos = 0;
    nube.textContent = `0 / ${clase.total} elementos integrados`;
    feedback.textContent = "";
    respuesta.textContent = "Esperando estímulos...";
    dropzone.innerHTML = "Suelta aquí los estímulos de la clase";
  }

  // Inicializar texto
  actualizarUIClase();

  // DRAG START
  tarjetas.forEach(card => {
    card.addEventListener("dragstart", e => {
      tarjetaArrastrada = card;
      e.dataTransfer.effectAllowed = "move";
    });
  });

  // Permitir drop
  dropzone.addEventListener("dragover", e => {
    e.preventDefault();
    dropzone.classList.add("p17-dropzone-activa");
  });

  dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("p17-dropzone-activa");
  });

  dropzone.addEventListener("drop", e => {
    e.preventDefault();
    dropzone.classList.remove("p17-dropzone-activa");
    if (!tarjetaArrastrada) return;

    const clase = clases[indiceClase];
    const claseTarjeta = tarjetaArrastrada.dataset.clase;

    if (claseTarjeta === clase.id && !tarjetaArrastrada.classList.contains("p17-colocada")) {
      contadorCorrectos++;
      tarjetaArrastrada.classList.add("p17-colocada");
      tarjetaArrastrada.setAttribute("draggable", "false");
      dropzone.appendChild(tarjetaArrastrada);

      nube.textContent = `${contadorCorrectos} / ${clase.total} elementos integrados`;
      respuesta.textContent = `Respuesta evocada típica: ${clase.funcion}`;
      feedback.textContent = "✔ Estímulo funcionalmente correcto.";
    } else {
      feedback.textContent = "✘ Observa la función evocada, no la forma.";
    }

    if (contadorCorrectos === clase.total) {
      feedback.textContent = "✅ Clase funcional completada. Pasarás a la siguiente clase.";
      respuesta.textContent = "Clase establecida: distintos formatos → misma función.";
      avanzarClase();
    }

    tarjetaArrastrada = null;
  });

  function avanzarClase() {
    if (indiceClase < clases.length - 1) {
      // Espera breve para que el alumno vea el resultado antes de cambiar
      setTimeout(() => {
        indiceClase++;
        actualizarUIClase();
      }, 900);
    } else {
      // Todas las clases completadas
      resumenFinal.textContent =
        "Has construido tres clases funcionales (manzana, silla, perro). " +
        "Cada clase integra múltiples formatos sensoriales que evocan funciones similares: " +
        "este es el punto de partida para el análisis de equivalencia de estímulos.";
    }
  }

  // REINICIAR
  reiniciar.addEventListener("click", () => {
    indiceClase = 0;
    contadorCorrectos = 0;
    resumenFinal.textContent = "";

    // Devolver todas las tarjetas a la zona de estímulos
    tarjetas.forEach(card => {
      card.classList.remove("p17-colocada");
      card.setAttribute("draggable", "true");
      zonaEstimulos.appendChild(card);
    });

    actualizarUIClase();
  });
});
