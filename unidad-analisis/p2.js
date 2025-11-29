/* ============================================
   EXPERIMENTO DEL ZOOM
============================================ */
const lupa = document.getElementById("lupa");
const zoomDetail = document.getElementById("zoomDetail");

if (lupa) {
    lupa.addEventListener("mouseenter", () => {
        zoomDetail.style.opacity = "1";
    });

    lupa.addEventListener("mouseleave", () => {
        zoomDetail.style.opacity = "0";
    });
}

/* ============================================
   DRAG & DROP — LOS 3 ERRORES
============================================ */
const dragItems = document.querySelectorAll(".ua-drag-item");
const dropZones = document.querySelectorAll(".ua-drop-zone");

dragItems.forEach(item => {
    item.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", item.textContent);
    });
});

dropZones.forEach(zone => {
    zone.addEventListener("dragover", e => {
        e.preventDefault();
        zone.classList.add("ua-drop-hover");
    });

    zone.addEventListener("dragleave", () => {
        zone.classList.remove("ua-drop-hover");
    });

    zone.addEventListener("drop", e => {
        e.preventDefault();
        const text = e.dataTransfer.getData("text/plain");
        zone.textContent = text;
        zone.classList.remove("ua-drop-hover");
    });
});

/* ============================================
   EXPERIMENTO DEL CONTEXTO
============================================ */
const contextBtns = document.querySelectorAll(".context-btn");
const contextBox = document.getElementById("contextBox");

if (contextBtns.length > 0) {
    const mensajes = {
        A: "Contexto A: Profesor pide exponer → evitación.",
        B: "Contexto B: Minuto de silencio → respeto.",
        C: "Contexto C: Lugar religioso → ritual.",
        D: "Contexto D: Recordando instrucciones → concentración."
    };

    contextBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const ctx = btn.dataset.context;
            contextBox.textContent = mensajes[ctx];
        });
    });
}

/* ============================================
   EXPERIMENTO 3 — DESARMAR ETIQUETAS
============================================ */
const tagBtns = document.querySelectorAll(".tag-btn");
const tagResult = document.getElementById("tagResult");

if (tagBtns.length > 0) {
    const desarme = {
        ansioso: `
        ¿En qué situación ocurre?<br>
        ¿Qué acciones realizas?<br>
        ¿Qué lo sigue inmediatamente?<br>
        ¿Qué se evita / qué se obtiene?<br>
        ¿Ocurre siempre o solo en ciertos contextos?
        `,
        procrastinador: `
        ¿En qué momento postergas?<br>
        ¿Qué acción realizas en vez de la tarea?<br>
        ¿Qué alivio o recompensa aparece?<br>
        ¿Qué contexto dispara esta secuencia?
        `,
        dependiente: `
        ¿En qué situación buscas ayuda?<br>
        ¿Qué haces exactamente?<br>
        ¿Qué consecuencia inmediata obtienes?<br>
        ¿Qué contexto mantiene el patrón?
        `
    };

    tagBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const tag = btn.dataset.tag;
            tagResult.innerHTML = desarme[tag];
        });
    });
}
