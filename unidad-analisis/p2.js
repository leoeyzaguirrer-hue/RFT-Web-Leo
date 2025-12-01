// p2.js — Lógica interactiva de la Lección 1 · Unidad de Análisis

document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // 1. Animación de entrada
    // ==========================
    setTimeout(() => {
        document.querySelectorAll(".ua-fade-in").forEach(el => {
            el.classList.add("ua-visible");
        });
    }, 160);

    // ==========================
    // 2. Acordeón clásico (solo uno abierto)
    // ==========================
    const accHeaders = document.querySelectorAll(".ua-acc-header");

    accHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const panel = header.nextElementSibling;
            const isOpen = header.classList.contains("ua-acc-open");

            // Cerrar todos
            accHeaders.forEach(h => {
                h.classList.remove("ua-acc-open");
                const p = h.nextElementSibling;
                if (p) p.style.maxHeight = null;
            });

            // Si el que se tocó estaba cerrado, abrirlo
            if (!isOpen) {
                header.classList.add("ua-acc-open");
                if (panel) {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            }
        });
    });

    // Abrir por defecto el primer acordeón
    if (accHeaders[0]) {
        accHeaders[0].click();
    }

    // ==========================
    // 3. Experimento de contextos (Contexto A, B, C, D)
    // ==========================
    const contextData = {
        A: {
            title: "Contexto A · Profesor pide exponer",
            text: "🅰️ Antecedente: el profesor pide voluntarios en voz alta.\n🔵 Acción: la persona baja la mirada, se esconde detrás del cuaderno y revisa el celular 🙇‍♂️📱.\n🟡 Consecuencia: siente alivio inmediato 😓 y evita practicar hablar en público."
        },
        B: {
            title: "Contexto B · Minuto de silencio",
            text: "🅰️ Antecedente: el grupo acuerda hacer un minuto de silencio.\n🔵 Acción: la persona baja la mirada y calla 🙇‍♂️.\n🟡 Consecuencia: se sincroniza con el ritual grupal, mostrando respeto 🙏."
        },
        C: {
            title: "Contexto C · Lugar religioso",
            text: "🅰️ Antecedente: ceremonia en un lugar religioso.\n🔵 Acción: la persona baja la mirada y se mantiene en silencio.\n🟡 Consecuencia: sigue una norma aprendida, participa del ritual y se siente parte del grupo 🙏."
        },
        D: {
            title: "Contexto D · Recordando instrucciones",
            text: "🅰️ Antecedente: el profesor termina de explicar una consigna.\n🔵 Acción: la persona baja la mirada y permanece en silencio mientras repasa mentalmente las instrucciones 💭.\n🟡 Consecuencia: aumenta la probabilidad de hacer bien la tarea 🧘."
        }
    };

    const contextButtons = document.querySelectorAll(".ua-context-btn");
    const contextBox = document.getElementById("ua-context-box");

    contextButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const ctx = btn.dataset.context;

            // marcar activo
            contextButtons.forEach(b => b.classList.remove("ua-context-active"));
            btn.classList.add("ua-context-active");

            if (contextData[ctx] && contextBox) {
                contextBox.innerHTML =
                    `<h4 class="ua-context-title">${contextData[ctx].title}</h4>
                     <p class="ua-text-small">${contextData[ctx].text.replace(/\n/g, "<br>")}</p>`;
            }
        });
    });

    // ==========================
    // 4. Desarmar etiquetas
    // ==========================
    const tagInfo = {
        ansioso: {
            title: "Desarmando “es ansioso”",
            questions: [
                "¿En qué situaciones aparece ese patrón de \"ansiedad\"?",
                "¿Qué acciones concretas realiza (qué hace con las manos, la mirada, el cuerpo)?",
                "¿Qué hace con los pensamientos y sensaciones (se queda, se retira, se distrae)?",
                "¿Qué ocurre inmediatamente después? ¿Qué se alivia o qué se obtiene?",
                "¿Pasa siempre o solo en ciertos contextos (lugares, personas, temas)?"
            ]
        },
        procrastinador: {
            title: "Desarmando “soy procrastinador”",
            questions: [
                "¿En qué tareas específicas sucede (estudiar, responder mails, hacer informes)?",
                "¿Qué hace exactamente cuando “procrastina” (mirar el celular, abrir otra pestaña, ordenar cosas)?",
                "¿Qué pensamientos aparecen (“después lo hago”, “no voy a poder”)?",
                "¿Qué gana a corto plazo (alivio, distracción, placer inmediato)?",
                "¿Qué impacto tiene a largo plazo (plazos, rendimiento, confianza)?"
            ]
        },
        dependiente: {
            title: "Desarmando “es dependiente”",
            questions: [
                "¿En qué contextos busca apoyo o aprobación (pareja, trabajo, familia)?",
                "¿Qué hace concretamente (preguntar, delegar, pedir garantías, evitar decidir)?",
                "¿Qué sensaciones o pensamientos aparecen antes de pedir ayuda?",
                "¿Qué ocurre justo después (recibe ayuda, se alivia, evita el conflicto)?",
                "¿En qué situaciones sí actúa de forma más autónoma?"
            ]
        }
    };

    const tagButtons = document.querySelectorAll(".tag-btn");
    const tagResult = document.getElementById("ua-tag-result");

    tagButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const tag = btn.dataset.tag;
            if (!tagInfo[tag] || !tagResult) return;

            // marcar botón activo
            tagButtons.forEach(b => b.classList.remove("ua-tag-active"));
            btn.classList.add("ua-tag-active");

            const qList = tagInfo[tag].questions
                .map(q => `<li>${q}</li>`)
                .join("");

            tagResult.innerHTML =
                `<div class="ua-tag-episode">
                    <div class="ua-icon-block">
                        <span class="ua-icon">🌀</span>
                        <span class="ua-icon-label">La etiqueta se rompe en preguntas funcionales</span>
                    </div>
                    <h4 class="ua-tag-title">${tagInfo[tag].title}</h4>
                    <ul class="ua-list ua-list-small">
                        ${qList}
                    </ul>
                    <p class="ua-text-small ua-hint">
                        Objetivo: pasar de “es así” a “cuando pasa X, hace Y y obtiene Z”.
                    </p>
                </div>`;
        });
    });

    // ==========================
    // 5. Drag & Drop genérico
    // ==========================
    let draggedItem = null;

    document.querySelectorAll(".ua-drag-item").forEach(item => {
        item.addEventListener("dragstart", (e) => {
            draggedItem = e.target;
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", e.target.dataset.key || "");
            e.target.classList.add("ua-dragging");
        });

        item.addEventListener("dragend", (e) => {
            e.target.classList.remove("ua-dragging");
            draggedItem = null;
        });
    });

    document.querySelectorAll(".ua-drop-zone").forEach(zone => {
        zone.addEventListener("dragover", (e) => {
            e.preventDefault();
            zone.classList.add("ua-drop-over");
        });

        zone.addEventListener("dragleave", () => {
            zone.classList.remove("ua-drop-over");
        });

        zone.addEventListener("drop", (e) => {
            e.preventDefault();
            zone.classList.remove("ua-drop-over");
            if (!draggedItem) return;

            const groupZone = zone.dataset.group;
            const groupItem = draggedItem.dataset.group;

            if (groupZone !== groupItem) return;

            const accept = (zone.dataset.accept || "")
                .split(" ")
                .filter(Boolean);

            const key = draggedItem.dataset.key;

            // Evitar duplicar dentro de la misma zona
            if (zone.contains(draggedItem)) return;

            zone.appendChild(draggedItem);

            if (accept.includes(key)) {
                zone.classList.add("ua-drop-correct");
                zone.classList.remove("ua-drop-wrong");

                // caso especial: zona de etiquetas
                if (groupZone === "unidad" && accept.includes("etiqueta")) {
                    alert("⚠️ Las etiquetas no son unidades de análisis. No nos dicen qué hace la persona, dónde ni con qué efectos.");
                }
            } else {
                zone.classList.add("ua-drop-wrong");
                zone.classList.remove("ua-drop-correct");
            }
        });
    });

    // ==========================
    // 6. Mini-práctica: ¿es unidad de análisis?
    // ==========================
    document.querySelectorAll(".ua-mini-item").forEach(item => {
        const correct = item.dataset.correct;
        const feedbackBox = item.querySelector(".ua-mini-feedback");
        const buttons = item.querySelectorAll(".ua-btn-mini");

        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const ans = btn.dataset.answer;

                buttons.forEach(b => b.classList.remove("ua-mini-selected"));
                btn.classList.add("ua-mini-selected");

                if (!feedbackBox) return;

                if (ans === correct) {
                    feedbackBox.textContent =
                        "✔ Correcto: está descrito como episodio de acción-en-contexto.";
                    feedbackBox.classList.add("ua-mini-ok");
                    feedbackBox.classList.remove("ua-mini-error");
                } else {
                    feedbackBox.textContent =
                        "✖ No del todo: revisa si aparece contexto, acción concreta y consecuencias.";
                    feedbackBox.classList.add("ua-mini-error");
                    feedbackBox.classList.remove("ua-mini-ok");
                }
            });
        });
    });

});
