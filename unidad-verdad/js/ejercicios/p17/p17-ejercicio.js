// ============================================================
// P17 · EJERCICIO · EL COMPÁS DE UTILIDAD
// Drag & drop (mouse + touch), autocorrección y reinicio
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

  // Guardamos posición inicial de cada tarjeta (padre original)
  const posicionesIniciales = new Map();
  tarjetas.forEach((tarjeta) => {
    posicionesIniciales.set(tarjeta.dataset.id, {
      parent: tarjeta.parentElement,
    });
  });

  // Ángulos de la aguja según zona
  const angulosZona = {
    "no-accion": -60, // rojo
    "parcial": 0,     // amarillo
    "clara": 60       // verde
  };

  // Pistas por tarjeta
  const pistasPorTarjeta = {
    insegura:
      "“Insegura” es un rasgo general. No describe conducta concreta ni su función. No puedes intervenir sobre un rasgo.",
    "baja-autoestima":
      "“Baja autoestima” etiqueta la experiencia, pero no señala qué hace la persona, cuándo ni qué consecuencias mantienen el patrón.",
    "pensamientos-automaticos":
      "Los pensamientos negativos son relevantes, pero esta frase no indica qué hace la persona en respuesta ni qué los mantiene activos.",
    "evita-conversaciones":
      "Aquí ya aparece conducta (evitar), contexto (conversaciones tensas) y consecuencia (alivio inmediato): esto orienta claramente la intervención.",
    "autocritica-evitacion":
      "Describe cuándo aparece la autocrítica, qué conducta sigue y qué función cumple (evitar conflicto): es una formulación muy funcional."
  };

  // Mensaje general según zona
  const mensajesZona = {
    "no-accion":
      "Formulaciones basadas en rasgos o etiquetas suenan explicativas, pero no te dicen sobre qué conducta intervenir.",
    "parcial":
      "Formulaciones parciales señalan fenómenos relevantes, pero aún no definen con precisión la conducta objetivo ni la contingencia.",
    "clara":
      "Las formulaciones funcionales describen conducta, contexto y consecuencias, por eso orientan con claridad qué hacer en terapia."
  };

  // Utilidad: actualizar contador y mensajes
  function actualizarContador() {
    if (contadorSpan) {
      contadorSpan.textContent = completadas.toString();
    }
  }

  function mostrarMensajeZona(zonaClave) {
    if (mensajeGeneral && mensajesZona[zonaClave]) {
      mensajeGeneral.textContent = mensajesZona[zonaClave];
    }
  }

  function mostrarPista(tarjetaId) {
    if (pistaTexto && pistasPorTarjeta[tarjetaId]) {
      pistaTexto.textContent = pistasPorTarjeta[tarjetaId];
    }
  }

  function limpiarPista() {
    if (pistaTexto) {
      pistaTexto.textContent = "";
    }
  }

  // Mover aguja hacia la zona correcta
  function girarAguja(zonaClave) {
    if (!aguja) return;
    const angulo = angulosZona[zonaClave] ?? 0;
    aguja.style.transform = `translate(-50%, -100%) rotate(${angulo}deg)`;
  }

  // Vibración del compás en caso de error
  function vibrarCompas() {
    if (!compas) return;
    compas.classList.remove("p17-compas-error");
    void compas.offsetWidth; // reflow para reiniciar animación
    compas.classList.add("p17-compas-error");
  }

  // Marcar zona como correcta al recibir al menos una tarjeta bien colocada
  function marcarZonaCorrecta(zonaElemento) {
    zonaElemento.classList.add("p17-zona-correcta");
  }

  // Comprobar si todas las tarjetas están correctas
  function revisarComplecionTotal() {
    if (completadas === tarjetas.length && panelFinal) {
      panelFinal.hidden = false;
      panelFinal.classList.add("p17-panel-visible");
      panelFinal.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  // =========================
  // LÓGICA DE DRAG & DROP
  // =========================

  let tarjetaEnMovimiento = null;
  let offsetX = 0;
  let offsetY = 0;

  function iniciarArrastre(tarjeta, inicioX, inicioY) {
    if (tarjeta.classList.contains("p17-tarjeta-fijada")) return;

    tarjetaEnMovimiento = tarjeta;
    const rect = tarjeta.getBoundingClientRect();

    offsetX = inicioX - rect.left;
    offsetY = inicioY - rect.top;

    tarjeta.style.position = "fixed";
    tarjeta.style.left = `${rect.left}px`;
    tarjeta.style.top = `${rect.top}px`;
    tarjeta.style.width = `${rect.width}px`;
    tarjeta.style.zIndex = "2000";
    tarjeta.classList.add("p17-tarjeta-arrastrando");
    limpiarPista();
  }

  function moverTarjeta(x, y) {
    if (!tarjetaEnMovimiento) return;

    tarjetaEnMovimiento.style.left = `${x - offsetX}px`;
    tarjetaEnMovimiento.style.top = `${y - offsetY}px`;
  }

  function finalizarArrastre(x, y) {
    if (!tarjetaEnMovimiento) return;

    const tarjeta = tarjetaEnMovimiento;
    tarjetaEnMovimiento = null;

    // Detectar zona de caída
    const centroX = x;
    const centroY = y;
    let zonaDestino = null;

    zonas.forEach((zona) => {
      const rect = zona.getBoundingClientRect();
      if (
        centroX >= rect.left &&
        centroX <= rect.right &&
        centroY >= rect.top &&
        centroY <= rect.bottom
      ) {
        zonaDestino = zona;
      }
    });

    const tarjetaId = tarjeta.dataset.id;
    const respuestaCorrecta = tarjeta.dataset.respuesta;

    if (zonaDestino) {
      const zonaClave = zonaDestino.dataset.zona;

      if (zonaClave === respuestaCorrecta) {
        // Colocación correcta
        zonaDestino.appendChild(tarjeta);
        tarjeta.style.position = "relative";
        tarjeta.style.left = "0";
        tarjeta.style.top = "0";
        tarjeta.style.width = "100%";
        tarjeta.style.zIndex = "auto";
        tarjeta.classList.remove("p17-tarjeta-arrastrando");
        tarjeta.classList.add("p17-tarjeta-correcta", "p17-tarjeta-fijada");

        completadas += 1;
        actualizarContador();
        marcarZonaCorrecta(zonaDestino);
        girarAguja(zonaClave);
        mostrarMensajeZona(zonaClave);
        mostrarPista(tarjetaId);
        revisarComplecionTotal();
      } else {
        // Colocación incorrecta: vuelve al origen
        vibrarCompas();
        mostrarPista(tarjetaId);
        devolverTarjetaAlOrigen(tarjeta);
      }
    } else {
      // No se soltó sobre ninguna zona
      devolverTarjetaAlOrigen(tarjeta);
    }
  }

  function devolverTarjetaAlOrigen(tarjeta) {
    const tarjetaId = tarjeta.dataset.id;
    const info = posicionesIniciales.get(tarjetaId);
    if (!info || !info.parent) return;

    info.parent.appendChild(tarjeta);
    tarjeta.style.position = "relative";
    tarjeta.style.left = "0";
    tarjeta.style.top = "0";
    tarjeta.style.width = "100%";
    tarjeta.style.zIndex = "auto";
    tarjeta.classList.remove("p17-tarjeta-arrastrando");
  }

  // Eventos de mouse
  tarjetas.forEach((tarjeta) => {
    tarjeta.addEventListener("mousedown", (e) => {
      e.preventDefault();
      iniciarArrastre(tarjeta, e.clientX, e.clientY);
    });
  });

  document.addEventListener("mousemove", (e) => {
    if (!tarjetaEnMovimiento) return;
    e.preventDefault();
    moverTarjeta(e.clientX, e.clientY);
  });

  document.addEventListener("mouseup", (e) => {
    if (!tarjetaEnMovimiento) return;
    e.preventDefault();
    finalizarArrastre(e.clientX, e.clientY);
  });

  // Eventos touch
  tarjetas.forEach((tarjeta) => {
    tarjeta.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      iniciarArrastre(tarjeta, touch.clientX, touch.clientY);
    }, { passive: true });
  });

  document.addEventListener("touchmove", (e) => {
    if (!tarjetaEnMovimiento) return;
    const touch = e.touches[0];
    if (!touch) return;
    moverTarjeta(touch.clientX, touch.clientY);
  }, { passive: true });

  document.addEventListener("touchend", (e) => {
    if (!tarjetaEnMovimiento) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    finalizarArrastre(touch.clientX, touch.clientY);
  });

  // =========================
  // REINICIO COMPLETO
  // =========================

  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      completadas = 0;
      actualizarContador();
      limpiarPista();
      if (mensajeGeneral) mensajeGeneral.textContent = "";

      // devolver tarjetas
      tarjetas.forEach((tarjeta) => {
        const tarjetaId = tarjeta.dataset.id;
        const info = posicionesIniciales.get(tarjetaId);
        if (info && info.parent) {
          info.parent.appendChild(tarjeta);
        }
        tarjeta.style.position = "relative";
        tarjeta.style.left = "0";
        tarjeta.style.top = "0";
        tarjeta.style.width = "100%";
        tarjeta.style.zIndex = "auto";
        tarjeta.classList.remove(
          "p17-tarjeta-arrastrando",
          "p17-tarjeta-correcta",
          "p17-tarjeta-fijada"
        );
      });

      // reset zonas
      zonas.forEach((zona) => zona.classList.remove("p17-zona-correcta"));

      // reset compás
      if (aguja) {
        aguja.style.transform = "translate(-50%, -100%) rotate(0deg)";
      }
      if (compas) {
        compas.classList.remove("p17-compas-error");
      }

      // ocultar panel final
      if (panelFinal) {
        panelFinal.hidden = true;
        panelFinal.classList.remove("p17-panel-visible");
      }

      // scroll al inicio del ejercicio
      const contenedor = document.querySelector(".p17-ejercicio-container");
      if (contenedor) {
        contenedor.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
});
