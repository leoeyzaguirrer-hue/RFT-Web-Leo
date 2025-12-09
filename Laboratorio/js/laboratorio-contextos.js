// ============================================================
// LABORATORIO RFT · CONTEXTO RELACIONAL Y FUNCIONAL
// Lógica de fases, botones y revelado progresivo
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // ------------------ Utilidad: cambio de fase ------------------
  const phases = document.querySelectorAll(".lab-phase");

  const goToPhase = (num) => {
    phases.forEach((ph) => {
      ph.classList.toggle("active", ph.dataset.phase === String(num));
    });
    const activeInner = document.querySelector(".lab-phase.active .phase-inner");
    if (activeInner) activeInner.scrollTop = 0;
  };

  // ============================================================
  // FASE 1 · FOBIA A LOS PERRITOS
  // ============================================================

  const f1ListaReacciones = document.getElementById("f1ListaReacciones");
  const btnF1AgregarReaccion = document.getElementById("btnF1AgregarReaccion");
  const btnF1Next = document.getElementById("btnF1Next");

  const reaccionesFobia = [
    "Miedo intenso al ver un perrito",
    "Sensación de amenaza inminente",
    "Palpitaciones aceleradas",
    "Temblor en manos o piernas",
    "Opresión en el pecho",
    "Sensación de ahogo o falta de aire",
    "Aumento de sudoración",
    "Deseo urgente de escapar o evitar"
  ];

  let indiceReaccion = 0;

  const agregarReaccion = () => {
    if (!f1ListaReacciones || indiceReaccion >= reaccionesFobia.length) return;

    const li = document.createElement("li");
    li.textContent = reaccionesFobia[indiceReaccion];
    f1ListaReacciones.appendChild(li);
    indiceReaccion += 1;

    if (indiceReaccion >= reaccionesFobia.length) {
      if (btnF1AgregarReaccion) btnF1AgregarReaccion.disabled = true;
      if (btnF1Next) btnF1Next.disabled = false;
    }
  };

  if (btnF1AgregarReaccion) {
    btnF1AgregarReaccion.addEventListener("click", agregarReaccion);
  }

  if (btnF1Next) {
    btnF1Next.addEventListener("click", () => {
      goToPhase(2);
    });
  }

  // ============================================================
  // FASE 2 · PUERTA Y SILAC
  // ============================================================

  const btnF2Next = document.getElementById("btnF2Next");

  if (btnF2Next) {
    btnF2Next.addEventListener("click", () => {
      goToPhase(3);
      // Al pasar a Fase 3, prellenar la lista de PERRO con las reacciones de Fase 1
      const f3ListaPerro = document.getElementById("f3ListaPerro");
      if (f3ListaPerro && f1ListaReacciones) {
        f3ListaPerro.innerHTML = "";
        const items = f1ListaReacciones.querySelectorAll("li");
        items.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item.textContent;
          f3ListaPerro.appendChild(li);
        });
      }
    });
  }

  // ============================================================
  // FASE 3 · COORDINACIÓN SILAC–PERRO
  // ============================================================

  const btnF3MostrarCoordinacion = document.getElementById("btnF3MostrarCoordinacion");
  const btnF3Next = document.getElementById("btnF3Next");
  const f3ListaSilac = document.getElementById("f3ListaSilac");

  const copiarReaccionesAPanel = (origenUl, destinoUl) => {
    if (!origenUl || !destinoUl) return;
    destinoUl.innerHTML = "";
    const items = origenUl.querySelectorAll("li");
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.textContent;
      destinoUl.appendChild(li);
    });
  };

  if (btnF3MostrarCoordinacion) {
    btnF3MostrarCoordinacion.addEventListener("click", () => {
      const f3ListaPerro = document.getElementById("f3ListaPerro");
      copiarReaccionesAPanel(f3ListaPerro, f3ListaSilac);
      // Activar botón de continuar
      if (btnF3Next) btnF3Next.disabled = false;
    });
  }

  if (btnF3Next) {
    btnF3Next.addEventListener("click", () => {
      // Al pasar a Fase 4, rellenar la lista final de SILAC con mismas funciones
      const f4ListaSilacFinal = document.getElementById("f4ListaSilacFinal");
      const f3ListaSilacActual = document.getElementById("f3ListaSilac");
      if (f4ListaSilacFinal && f3ListaSilacActual) {
        copiarReaccionesAPanel(f3ListaSilacActual, f4ListaSilacFinal);
      }
      goToPhase(4);
    });
  }

  // ============================================================
  // FASE 4 · SILAC ADQUIERE FUNCIONES
  // ============================================================

  const btnF4Next = document.getElementById("btnF4Next");

  if (btnF4Next) {
    btnF4Next.addEventListener("click", () => {
      goToPhase(5);
    });
  }

  // ============================================================
  // FASE 5 · A–B–C NEUTROS
  // ============================================================

  const btnF5Next = document.getElementById("btnF5Next");

  if (btnF5Next) {
    btnF5Next.addEventListener("click", () => {
      goToPhase(6);
    });
  }

  // ============================================================
  // FASE 6 · CLAVE “MAYOR QUE”
  // ============================================================

  const btnF6MostrarOrden = document.getElementById("btnF6MostrarOrden");
  const btnF6Next = document.getElementById("btnF6Next");
  const ordenCard = document.getElementById("ordenCard");

  if (btnF6MostrarOrden) {
    btnF6MostrarOrden.addEventListener("click", () => {
      if (ordenCard) ordenCard.style.display = "block";
      if (btnF6Next) btnF6Next.disabled = false;
    });
  }

  if (btnF6Next) {
    btnF6Next.addEventListener("click", () => {
      goToPhase(7);
    });
  }

  // ============================================================
  // FASE 7 · IMAGEN AVERSIVA EN C
  // ============================================================

  const btnF7MostrarImagen = document.getElementById("btnF7MostrarImagen");
  const abcCBody = document.getElementById("abcCBody");
  const f7PreguntaCard = document.getElementById("f7PreguntaCard");

  if (btnF7MostrarImagen && abcCBody) {
    btnF7MostrarImagen.addEventListener("click", () => {
      // Reemplazar el botón por la imagen aversiva
      abcCBody.innerHTML = "";
      const img = document.createElement("img");
      img.src = "img/aversiva.png";
      img.alt = "Imagen aversiva";
      abcCBody.appendChild(img);

      // Mostrar tarjeta de pregunta / explicación
      if (f7PreguntaCard) {
        f7PreguntaCard.style.display = "block";
        const inner = f7PreguntaCard.closest(".phase-inner");
        if (inner) {
          inner.scrollTo({ top: inner.scrollHeight, behavior: "smooth" });
        }
      }
    });
  }

  // ============================================================
  // REINICIAR LABORATORIO
  // ============================================================

  const btnReiniciarContextos = document.getElementById("btnReiniciarContextos");

  if (btnReiniciarContextos) {
    btnReiniciarContextos.addEventListener("click", () => {
      window.location.reload();
    });
  }
});
