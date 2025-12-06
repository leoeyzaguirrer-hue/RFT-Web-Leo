// ============================================================
// EJERCICIO P3 · CONSTRUCTOR DE RELACIONES
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  const slotPalabra = document.getElementById("slot-palabra");
  const slotEmocion = document.getElementById("slot-emocion");
  const slotConducta = document.getElementById("slot-conducta");

  const palabras = document.querySelectorAll(".palabra");
  const emociones = document.querySelectorAll(".p3-emocion");

  const panelReform = document.getElementById("panel-reformulacion");
  const panelNueva = document.getElementById("panel-nueva-relacion");

  const registro = document.querySelector(".p3-registro");
  const resultado = document.querySelector(".p3-resultado");
  const btnReset = document.querySelector(".p3-btn-reset");

  let palabraSel = null;
  let emocionSel = null;
  let conductaSel = null;
  let reformulaciones = 0;

  const derivaciones = {
    estres: "prepararse",
    alivio: "acercarse",
    miedo: "evitar",
    logro: "acercarse"
  };

  // -------------------------------------------------------------------
  // Paso 1: Arrastrar palabra
  // -------------------------------------------------------------------
  palabras.forEach(p => {
    p.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", p.dataset.id);
    });
  });

  slotPalabra.addEventListener("dragover", e => e.preventDefault());
  slotPalabra.addEventListener("drop", e => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    palabraSel = id;
    slotPalabra.textContent = id.toUpperCase();

    slotEmocion.textContent = "Selecciona emoción";
    slotConducta.textContent = "Conducta sugerida…";

    emocionSel = null;
    conductaSel = null;

    panelReform.style.display = "none";
    panelNueva.style.display = "none";
  });

  // -------------------------------------------------------------------
  // Paso 2: Seleccionar emoción
  // -------------------------------------------------------------------
  emociones.forEach(e => {
    e.addEventListener("click", () => {
      if (!palabraSel) return;

      emocionSel = e.dataset.id;
      slotEmocion.textContent = e.textContent;

      // Derivación automática
      conductaSel = derivaciones[emocionSel];
      slotConducta.textContent = conductaSel;

      panelReform.style.display = "block";
      panelNueva.style.display = "none";
    });
  });

  // -------------------------------------------------------------------
  // Mantener relación
  // -------------------------------------------------------------------
  document.querySelector(".p3-mantener").addEventListener("click", () => {
    registrarCadena("mantenida");
    panelReform.style.display = "none";
    evaluarResultado();
  });

  // -------------------------------------------------------------------
  // Reformular relación
  // -------------------------------------------------------------------
  document.querySelector(".p3-reformular").addEventListener("click", () => {
    panelNueva.style.display = "block";
  });

  panelNueva.addEventListener("click", e => {
    if (!e.target.classList.contains("p3-emocion")) return;

    emocionSel = e.target.dataset.id;
    slotEmocion.textContent = e.target.textContent;

    conductaSel = derivaciones[emocionSel];
    slotConducta.textContent = conductaSel;

    reformulaciones++;
    registrarCadena("reformulada");

    panelNueva.style.display = "none";
    panelReform.style.display = "none";

    evaluarResultado();
  });

  // -------------------------------------------------------------------
  // Registro de cadenas
  // -------------------------------------------------------------------
  function registrarCadena(tipo) {
    const texto =
      `${palabraSel.toUpperCase()} — ${emocionSel} — ${conductaSel} (${tipo})`;
    registro.innerHTML += `<div>• ${texto}</div>`;
  }

  // -------------------------------------------------------------------
  // Autocorrección
  // -------------------------------------------------------------------
  function evaluarResultado() {
    if (reformulaciones >= 2) {
      resultado.textContent =
        "Has modificado funciones lingüísticas. El lenguaje es red de relaciones aprendidas.";
    }
  }

  // -------------------------------------------------------------------
  // Reinicio
  // -------------------------------------------------------------------
  btnReset.addEventListener("click", () => {
    palabraSel = null;
    emocionSel = null;
    conductaSel = null;

    slotPalabra.textContent = "Arrastra una palabra aquí";
    slotEmocion.textContent = "Selecciona emoción";
    slotConducta.textContent = "Conducta sugerida…";

    registro.innerHTML = "";
    resultado.textContent = "";

    panelReform.style.display = "none";
    panelNueva.style.display = "none";

    reformulaciones = 0;
  });

});
