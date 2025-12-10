// ============================================================
// LABORATORIO RFT · MAPA JERÁRQUICO DE VALORES
// Archivo: js/valores.js
// ============================================================

const valoresData = {
  contribuir: {
    id: "contribuir",
    nombre: "Contribuir al bienestar de otros",
    emoji: "🤝",
    direcciones: {
      cuidar: {
        id: "cuidar",
        nombre: "Cuidar",
        acciones: [
          "Preparar una comida para alguien",
          "Acompañar a una persona a una cita",
          "Escuchar sin interrumpir",
          "Preguntar cómo está alguien de forma genuina",
          "Ofrecer ayuda sin que se la pidan",
          "Ceder tiempo propio para apoyar a otro",
          "Cuidar a alguien enfermo",
          "Recordar fechas importantes"
        ]
      },
      colaborar: {
        id: "colaborar",
        nombre: "Colaborar",
        acciones: [
          "Trabajar en equipo",
          "Compartir información útil",
          "Coordinar tareas con otros",
          "Pedir opinión antes de decidir",
          "Aceptar sugerencias",
          "Redistribuir responsabilidades",
          "Apoyar proyectos ajenos",
          "Cumplir acuerdos"
        ]
      },
      formar: {
        id: "formar",
        nombre: "Formar",
        acciones: [
          "Enseñar una habilidad",
          "Explicar con paciencia",
          "Corregir sin humillar",
          "Dar retroalimentación clara",
          "Modelar conductas",
          "Promover autonomía",
          "Señalar errores con respeto",
          "Estimular preguntas"
        ]
      },
      acompanar: {
        id: "acompanar",
        nombre: "Acompañar",
        acciones: [
          "Caminar junto a alguien",
          "Estar presente en procesos difíciles",
          "Aceptar ritmos distintos",
          "No imponer soluciones",
          "Escuchar activamente",
          "Respetar silencios",
          "Permanecer aun sin respuestas",
          "Validar emociones"
        ]
      }
    }
  },
  honestidad: {
    id: "honestidad",
    nombre: "Vivir con honestidad",
    emoji: "🧭",
    direcciones: {
      decir_verdad: {
        id: "decir_verdad",
        nombre: "Decir la verdad",
        acciones: [
          "Expresar lo que se piensa",
          "Reconocer errores",
          "Decir “no sé”",
          "Admitir fallos",
          "Corregir información incorrecta",
          "No falsear logros",
          "No ocultar intenciones",
          "Aclarar malentendidos"
        ]
      },
      consistente: {
        id: "consistente",
        nombre: "Ser consistente",
        acciones: [
          "Cumplir compromisos",
          "Mantener criterios estables",
          "Sostener decisiones con malestar",
          "No cambiar discurso por conveniencia",
          "Repetir conductas elegidas",
          "Mantener el rumbo ante presión",
          "Ajustar sin traicionarse",
          "Revisar errores sin negarlos"
        ]
      },
      contacto_experiencia: {
        id: "contacto_experiencia",
        nombre: "Contacto con la experiencia",
        acciones: [
          "Reconocer emociones",
          "Nombrar malestar",
          "Registrar sensaciones",
          "No evitar sentir",
          "Observar pensamientos",
          "Permanecer en el presente",
          "No huir de la ansiedad",
          "Tolerar vergüenza"
        ]
      },
      responsabilidad: {
        id: "responsabilidad",
        nombre: "Responsabilidad personal",
        acciones: [
          "Asumir consecuencias",
          "No culpar a otros de todo",
          "Elegir con conciencia",
          "Reconocer impacto propio",
          "Reparar errores",
          "Pedir disculpas",
          "Hacerse cargo de decisiones",
          "No victimizarse rígidamente"
        ]
      }
    }
  }
};

// Estado global
const state = {
  fase: 1,
  maxFase: 5,
  valorSeleccionado: null,
  direccionesSeleccionadas: [], // ids
  accionesSeleccionadas: {}, // por dirección: [acciones]
  accionesDisponibles: {}, // por dirección: [acciones restantes]
  accionesVisibles: {}, // por dirección: [acciones visibles]
  reversaAccionesElegidas: [] // acciones seleccionadas en fase 5
};

// UTILIDADES DOM
const qs = (sel) => document.querySelector(sel);
const qsa = (sel) => Array.from(document.querySelectorAll(sel));

// Elementos clave
const faseLabel = qs("#lab-fase-label");
const progressFill = qs("#lab-progress-fill");
const valorChip = qs("#lab-valor-chip .lab-status-value");
const triangleLabel = qs("#lab-triangle-label");
const piramideValor = qs("#lab-piramide-valor");
const footnote = qs("#lab-footnote");
const resumen = qs("#lab-resumen");
const fases = qsa(".lab-fase");
const btnSiguiente = qs("#btn-siguiente");
const btnAnterior = qs("#btn-anterior");
const btnReiniciar = qs("#btn-reiniciar");

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  attachEventHandlers();
  updateUI();
});

// Manejo de eventos
function attachEventHandlers() {
  // Selección de valor
  qsa(".lab-valor-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.valorId;
      selectValor(id);
    });
  });

  // Botones de navegación
  btnSiguiente.addEventListener("click", handleNext);
  btnAnterior.addEventListener("click", handlePrev);
  btnReiniciar.addEventListener("click", reiniciarLaboratorio);
}

// Seleccionar valor
function selectValor(id) {
  state.valorSeleccionado = id;
  // Marcar visualmente
  qsa(".lab-valor-card").forEach((b) => b.classList.remove("is-selected"));
  const btn = document.querySelector(`.lab-valor-card[data-valor-id="${id}"]`);
  if (btn) btn.classList.add("is-selected");

  const valor = valoresData[id];
  valorChip.textContent = valor.nombre;
  piramideValor.textContent = valor.nombre;
  triangleLabel.textContent = "Valor seleccionado:\n" + valor.nombre;
  footnote.textContent = "Paso 2: selecciona hasta tres direcciones clave para este valor.";
  resumen.innerHTML = `<p><strong>Valor actual:</strong> ${valor.nombre}. Aún no has elegido direcciones ni acciones. En las siguientes fases irás completando la red.</p>`;

  // Reset de fases dependientes
  state.direccionesSeleccionadas = [];
  state.accionesSeleccionadas = {};
  state.accionesDisponibles = {};
  state.accionesVisibles = {};
  state.reversaAccionesElegidas = [];

  // Preparar fase 2 y 3
  renderDirecciones();
  renderAccionesStructure();

  // Activar botón siguiente
  btnSiguiente.disabled = false;
}

// Renderizar direcciones en fase 2
function renderDirecciones() {
  const slotsContainer = qs("#lab-direcciones-slots");
  const opcionesContainer = qs("#lab-direcciones-opciones");
  slotsContainer.innerHTML = "";
  opcionesContainer.innerHTML = "";

  // Crear 3 slots
  for (let i = 0; i < 3; i++) {
    const slot = document.createElement("div");
    slot.className = "lab-direccion-slot";
    slot.dataset.index = i;

    slot.innerHTML = `
      <div>
        <div class="lab-direccion-slot-label">Dirección ${i + 1}</div>
        <div class="lab-direccion-slot-empty">Vacío · haz clic en una dirección disponible</div>
      </div>
    `;

    slotsContainer.appendChild(slot);
  }

  const valor = valoresData[state.valorSeleccionado];
  Object.values(valor.direcciones).forEach((dir) => {
    const chip = document.createElement("button");
    chip.className = "lab-direccion-chip";
    chip.dataset.dirId = dir.id;
    chip.innerHTML = `<span>●</span> ${dir.nombre}`;
    chip.addEventListener("click", () => addDireccion(dir.id));
    opcionesContainer.appendChild(chip);
  });
}

// Añadir dirección
function addDireccion(dirId) {
  if (!state.valorSeleccionado) return;
  if (state.direccionesSeleccionadas.includes(dirId)) return;
  if (state.direccionesSeleccionadas.length >= 3) return;

  state.direccionesSeleccionadas.push(dirId);
  updateDireccionesSlots();
}

// Quitar dirección
function removeDireccion(dirId) {
  state.direccionesSeleccionadas = state.direccionesSeleccionadas.filter((d) => d !== dirId);
  // Limpiar acciones de esa dirección
  delete state.accionesSeleccionadas[dirId];
  delete state.accionesDisponibles[dirId];
  delete state.accionesVisibles[dirId];
  renderAccionesStructure();
  updateDireccionesSlots();
}

// Actualizar visualmente los slots y chips
function updateDireccionesSlots() {
  const valor = valoresData[state.valorSeleccionado];

  // Slots
  const slots = qsa(".lab-direccion-slot");
  slots.forEach((slot, index) => {
    const dirId = state.direccionesSeleccionadas[index];
    slot.innerHTML = "";
    const wrapper = document.createElement("div");

    if (dirId) {
      const dir = valor.direcciones[dirId];
      wrapper.innerHTML = `
        <div class="lab-direccion-slot-label">Dirección ${index + 1}</div>
        <div class="lab-direccion-slot-name">${dir.nombre}</div>
      `;
      const btnRemove = document.createElement("button");
      btnRemove.className = "lab-direccion-remove";
      btnRemove.textContent = "Quitar";
      btnRemove.addEventListener("click", () => removeDireccion(dirId));

      slot.appendChild(wrapper);
      slot.appendChild(btnRemove);
      slot.style.borderStyle = "solid";
      slot.style.borderColor = "rgba(10,132,255,0.45)";
    } else {
      wrapper.innerHTML = `
        <div class="lab-direccion-slot-label">Dirección ${index + 1}</div>
        <div class="lab-direccion-slot-empty">Vacío · haz clic en una dirección disponible</div>
      `;
      slot.appendChild(wrapper);
      slot.style.borderStyle = "dashed";
      slot.style.borderColor = "rgba(10,42,92,0.22)";
    }
  });

  // Chips
  qsa(".lab-direccion-chip").forEach((chip) => {
    const id = chip.dataset.dirId;
    if (state.direccionesSeleccionadas.includes(id)) {
      chip.classList.add("is-disabled");
      chip.disabled = true;
    } else {
      chip.classList.remove("is-disabled");
      chip.disabled = false;
    }
  });

  // Actualizar resumen
  if (state.direccionesSeleccionadas.length > 0) {
    const nombres = state.direccionesSeleccionadas
      .map((id) => valor.direcciones[id].nombre)
      .join(", ");
    resumen.innerHTML = `<p><strong>Valor:</strong> ${valor.nombre}</p>
      <p><strong>Direcciones elegidas:</strong> ${nombres}.</p>`;
  } else {
    resumen.innerHTML = `<p><strong>Valor:</strong> ${valor.nombre}</p>
      <p>Todavía no has elegido direcciones. Hazlo para seguir construyendo la red.</p>`;
    
  }
  updateUI();
}

// Preparar estructura base de acciones (fase 3)
function renderAccionesStructure() {
  const colsContainer = qs("#lab-acciones-cols");
  const tabsContainer = qs("#lab-acciones-tabs");
  colsContainer.innerHTML = "";
  tabsContainer.innerHTML = "";
  state.accionesSeleccionadas = {};
  state.accionesDisponibles = {};
  state.accionesVisibles = {};

  if (!state.valorSeleccionado || state.direccionesSeleccionadas.length === 0) {
    return;
  }

  const valor = valoresData[state.valorSeleccionado];

  state.direccionesSeleccionadas.forEach((dirId, idx) => {
    const dir = valor.direcciones[dirId];

    // Estado de acciones
    state.accionesSeleccionadas[dirId] = [];
    state.accionesDisponibles[dirId] = [...dir.acciones];
    state.accionesVisibles[dirId] = [];

    // Columna izquierda
    const col = document.createElement("div");
    col.className = "lab-acciones-col";
    col.dataset.dirId = dirId;
    col.innerHTML = `
      <div class="lab-acciones-col-header">
        <div class="lab-acciones-col-title">${dir.nombre}</div>
        <div class="lab-acciones-col-count" id="lab-acciones-count-${dirId}">
          0/4 acciones seleccionadas
        </div>
      </div>
      <div class="lab-acciones-col-body" id="lab-acciones-body-${dirId}">
      </div>
    `;
    colsContainer.appendChild(col);

    // Tab en panel derecho
    const tab = document.createElement("button");
    tab.className = "lab-acciones-tab";
    tab.dataset.dirId = dirId;
    tab.textContent = dir.nombre;
    tab.addEventListener("click", () => setActiveAccionesDir(dirId));
    tabsContainer.appendChild(tab);
  });

  // Activar primera dirección por defecto
  const firstDir = state.direccionesSeleccionadas[0];
  if (firstDir) {
    setActiveAccionesDir(firstDir);
  }
}

// Activar dirección en panel de acciones
function setActiveAccionesDir(dirId) {
  const valor = valoresData[state.valorSeleccionado];
  const dir = valor.direcciones[dirId];

  qsa(".lab-acciones-tab").forEach((t) => t.classList.remove("is-active"));
  const activeTab = document.querySelector(`.lab-acciones-tab[data-dir-id="${dirId}"]`);
  if (activeTab) activeTab.classList.add("is-active");

  const title = qs("#lab-acciones-panel-title");
  const help = qs("#lab-acciones-panel-help");
  const counter = qs("#lab-acciones-counter");

  title.textContent = `Acciones para: ${dir.nombre}`;
  help.textContent =
    "Haz clic en acciones que concretan esta dirección. Cuando selecciones una, desaparecerá de la lista y aparecerá otra, manteniendo la pantalla limpia.";
  const selectedCount = state.accionesSeleccionadas[dirId]?.length || 0;
  counter.textContent = `${selectedCount}/4 acciones elegidas (recomendado)`;

  // Preparar pool visible
  if (!state.accionesVisibles[dirId] || state.accionesVisibles[dirId].length === 0) {
    refillVisibleActions(dirId);
  } else {
    renderVisibleActions(dirId);
  }
}

// Llenar acciones visibles para una dirección
function refillVisibleActions(dirId) {
  const remaining = state.accionesDisponibles[dirId] || [];
  const visibles = [];

  for (let i = 0; i < remaining.length && visibles.length < 5; i++) {
    visibles.push(remaining[i]);
  }

  state.accionesVisibles[dirId] = visibles;
  renderVisibleActions(dirId);
}

// Pintar botones de acciones visibles
function renderVisibleActions(dirId) {
  const pool = qs("#lab-acciones-pool");
  pool.innerHTML = "";

  const visibles = state.accionesVisibles[dirId] || [];
  if (visibles.length === 0) {
    const p = document.createElement("p");
    p.textContent = "Ya usaste todas las acciones disponibles para esta dirección.";
    p.style.fontSize = "0.9rem";
    p.style.color = "#6f8595";
    pool.appendChild(p);
    return;
  }

  visibles.forEach((accion) => {
    const btn = document.createElement("button");
    btn.className = "lab-accion-btn";
    btn.textContent = accion;
    btn.addEventListener("click", () => selectAccion(dirId, accion));
    pool.appendChild(btn);
  });
}

// Seleccionar acción
function selectAccion(dirId, accion) {
  if (!state.accionesSeleccionadas[dirId]) {
    state.accionesSeleccionadas[dirId] = [];
  }
  const current = state.accionesSeleccionadas[dirId];
  if (current.includes(accion)) return;
  if (current.length >= 4) return; // límite sugerido

  current.push(accion);

  // Quitar de disponibles y visibles
  state.accionesDisponibles[dirId] = (state.accionesDisponibles[dirId] || []).filter(
    (a) => a !== accion
  );
  state.accionesVisibles[dirId] = (state.accionesVisibles[dirId] || []).filter(
    (a) => a !== accion
  );

  // Actualizar columna
  const body = qs(`#lab-acciones-body-${dirId}`);
  const tag = document.createElement("span");
  tag.className = "lab-accion-tag";
  tag.textContent = accion;
  body.appendChild(tag);

  const countLabel = qs(`#lab-acciones-count-${dirId}`);
  countLabel.textContent = `${current.length}/4 acciones seleccionadas`;

  // Actualizar pool
  refillVisibleActions(dirId);

  // Actualizar resumen general
  updateResumenFromActions();

  // Habilitar siguiente si todas las direcciones tienen al menos 3
  const allHaveMin = state.direccionesSeleccionadas.every((d) => {
    const list = state.accionesSeleccionadas[d] || [];
    return list.length >= 3;
  });
  if (state.fase === 3) {
    btnSiguiente.disabled = !allHaveMin;
  }
}

// Actualizar resumen izquierdo cuando hay acciones
function updateResumenFromActions() {
  const valor = valoresData[state.valorSeleccionado];
  let html = `<p><strong>Valor:</strong> ${valor.nombre}</p>`;

  state.direccionesSeleccionadas.forEach((dirId) => {
    const dir = valor.direcciones[dirId];
    const acts = (state.accionesSeleccionadas[dirId] || []).slice(0, 3);
    if (acts.length > 0) {
      html += `<p><strong>${dir.nombre}:</strong> ${acts.join(", ")}...</p>`;
    }
  });

  resumen.innerHTML = html;
}

// FASE 5 · preparación de acciones mezcladas
function prepararFaseReversa() {
  state.reversaAccionesElegidas = [];
  const poolContainer = qs("#lab-reversa-pool");
  const resumenReversa = qs("#lab-reversa-resumen");
  poolContainer.innerHTML = "";
  resumenReversa.innerHTML = `
    <p>
      Cuando selecciones acciones, el laboratorio agrupará automáticamente
      cada una en su dirección y mostrará cómo todo se reorganiza bajo el valor
      que elegiste en la fase 1.
    </p>
  `;

  if (!state.valorSeleccionado) return;

  const valor = valoresData[state.valorSeleccionado];
  // Construir lista de pares {texto, dirId}
  const acciones = [];
  Object.values(valor.direcciones).forEach((dir) => {
    dir.acciones.forEach((a) => {
      acciones.push({ texto: a, dirId: dir.id, dirNombre: dir.nombre });
    });
  });

  // Mezclar
  acciones.sort(() => Math.random() - 0.5);

  acciones.forEach((item) => {
    const btn = document.createElement("button");
    btn.className = "lab-reversa-btn";
    btn.textContent = item.texto;
    btn.dataset.dirId = item.dirId;
    btn.dataset.dirNombre = item.dirNombre;
    btn.addEventListener("click", () => toggleReversaAccion(btn));
    poolContainer.appendChild(btn);
  });
}

// Seleccionar/deseleccionar acción en fase 5
function toggleReversaAccion(btn) {
  const texto = btn.textContent;
  const idx = state.reversaAccionesElegidas.findIndex((a) => a.texto === texto);

  if (idx >= 0) {
    state.reversaAccionesElegidas.splice(idx, 1);
    btn.classList.remove("is-selected");
  } else {
    if (state.reversaAccionesElegidas.length >= 3) return;
    state.reversaAccionesElegidas.push({
      texto,
      dirId: btn.dataset.dirId,
      dirNombre: btn.dataset.dirNombre
    });
    btn.classList.add("is-selected");
  }

  actualizarResumenReversa();
}

// Actualizar resumen de fase 5
function actualizarResumenReversa() {
  const cont = qs("#lab-reversa-resumen");
  if (state.reversaAccionesElegidas.length === 0) {
    cont.innerHTML = `
      <p>Selecciona hasta tres acciones. Se mostrará cómo se agrupan en direcciones
      y regresan al valor.</p>
    `;
    return;
  }

  const valor = valoresData[state.valorSeleccionado];
  const dirsMap = {};

  state.reversaAccionesElegidas.forEach((a) => {
    if (!dirsMap[a.dirNombre]) dirsMap[a.dirNombre] = [];
    dirsMap[a.dirNombre].push(a.texto);
  });

  let html = `<p><strong>Valor organizador:</strong> ${valor.nombre}</p>`;
  Object.entries(dirsMap).forEach(([dirNombre, acciones]) => {
    html += `<p><strong>${dirNombre}:</strong> ${acciones.join(", ")}.</p>`;
  });

  html += `<p>Observa que, empezando solo por algunas acciones concretas,
  emergen direcciones amplias y se vuelve visible el valor que organiza la red.
  Es posible construir valores tanto desde el “enunciado” como desde la práctica
  cotidiana.</p>`;

  cont.innerHTML = html;
}

// NAVEGACIÓN ENTRE FASES
function handleNext() {
  if (state.fase === 1 && !state.valorSeleccionado) return;
  if (state.fase === 2 && state.direccionesSeleccionadas.length === 0) return;

  if (state.fase < state.maxFase) {
    state.fase += 1;
  }
  if (state.fase === 3) {
    // Preparar acciones si aún no se hizo
    renderAccionesStructure();
    // Para avanzar desde 3, exigir mínimo acciones
    btnSiguiente.disabled = !state.direccionesSeleccionadas.every((d) => {
      const list = state.accionesSeleccionadas[d] || [];
      return list.length >= 3;
    });
  }
  if (state.fase === 5) {
    prepararFaseReversa();
  }

  updateUI();
}

function handlePrev() {
  if (state.fase > 1) {
    state.fase -= 1;
  }
  updateUI();
}

// Reiniciar
function reiniciarLaboratorio() {
  state.fase = 1;
  state.valorSeleccionado = null;
  state.direccionesSeleccionadas = [];
  state.accionesSeleccionadas = {};
  state.accionesDisponibles = {};
  state.accionesVisibles = {};
  state.reversaAccionesElegidas = [];

  // Reset visual básico
  valorChip.textContent = "Ninguno aún";
  piramideValor.textContent = "Inserta un valor";
  triangleLabel.textContent = "Elige un valor para comenzar ✨";
  footnote.textContent = "Paso 1: selecciona un valor principal en la columna derecha.";
  resumen.innerHTML =
    "<p>Aquí verás un resumen de la red jerárquica que vayas construyendo.</p>";

  qsa(".lab-valor-card").forEach((b) => b.classList.remove("is-selected"));

  updateUI();
}

// Actualizar UI general según fase
function updateUI() {
  // Mostrar fase activa
  fases.forEach((f) => {
    const num = parseInt(f.dataset.fase, 10);
    if (num === state.fase) f.classList.add("is-active");
    else f.classList.remove("is-active");
  });

  // Etiqueta de fase
  let label = "";
  switch (state.fase) {
    case 1:
      label = "Fase 1 · Elegir un valor";
      break;
    case 2:
      label = "Fase 2 · Elegir direcciones";
      break;
    case 3:
      label = "Fase 3 · Elegir acciones";
      break;
    case 4:
      label = "Fase 4 · Lectura funcional de la red";
      break;
    case 5:
      label = "Fase 5 · Reconstrucción desde las acciones";
      break;
  }
  faseLabel.textContent = label;

  // Progreso
  const pct = (state.fase - 1) / (state.maxFase - 1);
  progressFill.style.width = `${pct * 100}%`;

  // Botones
  btnAnterior.disabled = state.fase === 1;

  if (state.fase === state.maxFase) {
    btnSiguiente.disabled = true;
  } else {
    if (state.fase === 1) {
      btnSiguiente.disabled = !state.valorSeleccionado;
    } else if (state.fase === 2) {
      btnSiguiente.disabled = state.direccionesSeleccionadas.length === 0;
    } else if (state.fase === 3) {
      btnSiguiente.disabled = !state.direccionesSeleccionadas.every((d) => {
        const list = state.accionesSeleccionadas[d] || [];
        return list.length >= 3;
      });
    } else {
      btnSiguiente.disabled = false;
    }
  }
}
