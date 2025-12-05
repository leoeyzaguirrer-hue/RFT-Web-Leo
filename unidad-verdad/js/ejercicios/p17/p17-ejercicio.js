// ============================================================
// P17 · EJERCICIO · EL COMPÁS DE UTILIDAD — VERSIÓN OPTIMIZADA
// Drag & drop profesional (desktop + móvil), colisiones exactas,
// aguja animada y reinicio completo.
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const tarjetas = Array.from(document.querySelectorAll(".p17-tarjeta"));
  const zonas = Array.from(document.querySelectorAll(".p17-zona"));
  const compas = document.querySelector(".p17-compas");
  const aguja = document.querySelector(".p17-aguja");
  const contadorSpan = document.getElementById("p17-contador-correctas");
  const mensajeGeneral = document.getElementById("p17-mensaje-general");
  const pistaTexto = document.getElementById("p17-pista-texto");
  const panelFinal = document.querySelector(".p17-panel-final");
  const restartBtn = document.getElementById("p17-restart-btn");
  const pilaTarjetas = document.getElementById("p17-pila-tarjetas");

  let completadas = 0;

  // Guardamos posición inicial
  const posicionesIniciales = new Map();
  tarjetas.forEach((tarjeta) => {
    posicionesIniciales.set(tarjeta.dataset.id, {
      parent: tarjeta.parentElement,
    });
  });

  // Ángulos de la aguja según respuesta
  const angulosZona = {
    "no-accion": -60,
    "parcial": 0,
    "clara": 60
  };

  // Pistas contextuales
  const pistasPorTarjeta = {
    insegura:
      "“Insegura” es un rasgo general. No describe conducta concreta ni función. No puedes intervenir sobre un rasgo.",
    "baja-autoestima":
      "“Baja autoestima” etiqueta la experiencia, pero no señala qué hace la persona ni qué la mantiene.",
    "pensamientos-automaticos":
      "Describe un fenómeno, pero no indica conducta objetivo ni contingencia clara.",
    "evita-conversaciones":
      "Describe conducta + contexto + consecuencia. Muy funcional.",
    "autocritica-evitacion":
      "Describe cuándo aparece, qué conducta sigue y qué función cumple. Orienta claramente la intervención."
  };

  const mensajesZona = {
    "no-accion":
      "Explicaciones basadas en rasgos no orientan acción: no indican conducta, contexto ni función.",
    "parcial":
      "Formulaciones parciales señalan algo relevante, pero no definen conducta ni contingencia concreta.",
    "clara":
      "Formulaciones funcionales describen conducta, contexto y función: permiten intervenir con claridad."
  };

  function actualizarContador() {
    contadorSpan.textContent = completadas.toString();
  }

  function mostrarMensajeZona(zonaClave) {
    if (mensajesZona[zonaClave]) {
      mensajeGeneral.textContent = mensajesZona[zonaClave];
    }
  }

  function mostrarPista(id) {
    pistaTexto.textContent = pistasPorTarjeta[id] ?? "";
  }

  function limpiarPista() {
    pistaTexto.textContent = "";
  }

  function girarAguja(zonaClave) {
    const ang = angulosZona[zonaClave] ?? 0;
    aguja.style.transform = `translate(-50%, -100%) rotate(${ang}deg)`;
  }

  function vibrarCompas() {
    compas.classList.remove("p17-compas-error");
    void compas.offsetWidth; // reinicia animación
    compas.classList.add("p17-compas-error");
  }

  function marcarZonaCorrecta(zonaElem) {
    zonaElem.classList.add("p17-zona-correcta");
  }

  function revisarComplecionTotal() {
    if (completadas === tarjetas.length) {
      panelFinal.hidden = false;
      panelFinal.classList.add("p17-panel-visible");
      panelFinal.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  // ============================================================
  // DRAG & DROP REAL · SISTEMA OPTIMIZADO
  // ============================================================

  let tarjetaActiva = null;
  let startX = 0;
  let startY = 0;
  let offsetX = 0;
  let offsetY = 0;

  function iniciarArrastre(tarjeta, x, y) {
    if (tarjeta.classList.contains("p17-tarjeta-fijada")) return;

    tarjetaActiva = tarjeta;

    const rect = tarjeta.getBoundingClientRect();

    offsetX = x - rect.left;
    offsetY = y - rect.top;

    tarjeta.style.position = "fixed";
    tarjeta.style.left = `${rect.left}px`;
    tarjeta.style.top = `${rect.top}px`;
    tarjeta.style.width = `${rect.width}px`;
    tarjeta.style.height = `${rect.height}px`;
    tarjeta.style.transform = "none";
    tarjeta.style.pointerEvents = "none";

    tarjeta.classList.add("p17-tarjeta-arrastrando");

    limpiarPista();
  }

  function moverTarjeta(x, y) {
    if (!tarjetaActiva) return;

    const moveX = x - offsetX;
    const moveY = y - offsetY;

    tarjetaActiva.style.transform = `translate(${moveX - tarjetaActiva.getBoundingClientRect().left}px, 
                                               ${moveY - tarjetaActiva.getBoundingClientRect().top}px)`;
  }

  function finalizarArrastre(x, y) {
    if (!tarjetaActiva) return;

    const tarjeta = tarjetaActiva;
    tarjetaActiva = null;

    let zonaDestino = null;

    zonas.forEach((zona) => {
      const rect = zona.getBoundingClientRect();

      if (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      ) {
        zonaDestino = zona;
      }
    });

    const id = tarjeta.dataset.id;
    const respuesta = tarjeta.dataset.respuesta;

    if (!zonaDestino) {
      devolverAlOrigen(tarjeta);
      return;
    }

    const zonaClave = zonaDestino.dataset.zona;

    if (zonaClave === respuesta) {
      // Correcto
      zonaDestino.appendChild(tarjeta);

      tarjeta.style.position = "relative";
      tarjeta.style.left = "0";
      tarjeta.style.top = "0";
      tarjeta.style.width = "100%";
      tarjeta.style.height = "auto";
      tarjeta.style.transform = "none";
      tarjeta.style.pointerEvents = "auto";

      tarjeta.classList.remove("p17-tarjeta-arrastrando");
      tarjeta.classList.add("p17-tarjeta-correcta", "p17-tarjeta-fijada");

      completadas += 1;
      actualizarContador();
      marcarZonaCorrecta(zonaDestino);
      girarAguja(zonaClave);
      mostrarMensajeZona(zonaClave);
      mostrarPista(id);
      revisarComplecionTotal();
    } else {
      vibrarCompas();
      mostrarPista(id);
      devolverAlOrigen(tarjeta);
    }
  }

  function devolverAlOrigen(tarjeta) {
    const info = posicionesIniciales.get(tarjeta.dataset.id);
    info.parent.appendChild(tarjeta);

    tarjeta.style.position = "relative";
    tarjeta.style.left = "0";
    tarjeta.style.top = "0";
    tarjeta.style.width = "100%";
    tarjeta.style.height = "auto";
    tarjeta.style.transform = "none";
    tarjeta.style.pointerEvents = "auto";

    tarjeta.classList.remove("p17-tarjeta-arrastrando");
  }

  // Eventos mouse
  tarjetas.forEach((tarjeta) => {
    tarjeta.addEventListener("mousedown", (e) => {
      e.preventDefault();
      iniciarArrastre(tarjeta, e.clientX, e.clientY);
    });
  });

  document.addEventListener("mousemove", (e) => {
    if (!tarjetaActiva) return;
    e.preventDefault();
    moverTarjeta(e.clientX, e.clientY);
  });

  document.addEventListener("mouseup", (e) => {
    if (!tarjetaActiva) return;
    e.preventDefault();
    finalizarArrastre(e.clientX, e.clientY);
  });

  // Eventos touch
  tarjetas.forEach((tarjeta) => {
    tarjeta.addEventListener("touchstart", (e) => {
      const t = e.touches[0];
      iniciarArrastre(tarjeta, t.clientX, t.clientY);
    }, { passive: true });
  });

  document.addEventListener("touchmove", (e) => {
    if (!tarjetaActiva) return;
    const t = e.touches[0];
    moverTarjeta(t.clientX, t.clientY);
  }, { passive: true });

  document.addEventListener("touchend", (e) => {
    if (!tarjetaActiva) return;
    const t = e.changedTouches[0];
    finalizarArrastre(t.clientX, t.clientY);
  });

  // ============================================================
  // REINICIO
  // ============================================================

  restartBtn.addEventListener("click", () => {
    completadas = 0;
    actualizarContador();
    limpiarPista();
    mensajeGeneral.textContent = "";

    tarjetas.forEach((tarjeta) => {
      const info = posicionesIniciales.get(tarjeta.dataset.id);
      info.parent.appendChild(tarjeta);

      tarjeta.classList.remove(
        "p17-tarjeta-arrastrando",
        "p17-tarjeta-correcta",
        "p17-tarjeta-fijada"
      );

      tarjeta.style.position = "relative";
      tarjeta.style.transform = "none";
      tarjeta.style.left = "0";
      tarjeta.style.top = "0";
      tarjeta.style.pointerEvents = "auto";
    });

    zonas.forEach((zona) => zona.classList.remove("p17-zona-correcta"));

    aguja.style.transform = "translate(-50%, -100%) rotate(0deg)";
    compas.classList.remove("p17-compas-error");

    panelFinal.hidden = true;
    panelFinal.classList.remove("p17-panel-visible");

    const cont = document.querySelector(".p17-ejercicio-container");
    cont.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
