/* ===============================
   EXPERIMENTO 1: LUPA
================================ */
const lupa = document.getElementById("lupa");
const zoomDetail = document.getElementById("zoomDetail");

lupa.addEventListener("mouseenter", () => {
    zoomDetail.style.opacity = "1";
});

lupa.addEventListener("mouseleave", () => {
    zoomDetail.style.opacity = "0";
});


/* ===============================
   EXPERIMENTO 2: CONTEXTOS
================================ */
const contextData = {
    A: "Profesor pide exponer → la acción es evitación.",
    B: "Minuto de silencio → la acción expresa respeto.",
    C: "Lugar religioso → acción ritual.",
    D: "Revisando instrucciones → concentración."
};

document.querySelectorAll(".context-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.getElementById("contextBox").textContent =
            contextData[btn.dataset.context];
    });
});


/* ===============================
   EXPERIMENTO 3: ETIQUETAS
================================ */
const tagInfo = {
    ansioso: `
        ¿En qué situación ocurre?  
        ¿Qué acciones realizas?  
        ¿Qué lo sigue inmediatamente?  
        ¿Qué se evita o se obtiene?  
        ¿Ocurre siempre o solo en ciertos contextos?
        <br><br><strong>Conclusión:</strong> las etiquetas no explican conducta.
    `,
    procrastinador: `
        ¿Cuándo ocurre?  
        ¿Qué haces exactamente?  
        ¿Qué consecuencias inmediatas obtienes?  
        ¿Qué contexto dispara el patrón?
        <br><br><strong>Conclusión:</strong> reconstruimos acción, no identidad.
    `,
    dependiente: `
        ¿Ante quién ocurre?  
        ¿Qué haces?  
        ¿Qué consecuencias mantienen el patrón?  
        ¿En qué contextos NO aparece?
        <br><br><strong>Conclusión:</strong> identidad ≠ unidad de análisis.
    `
};

document.querySelectorAll(".tag-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.getElementById("tagResult").innerHTML =
            tagInfo[btn.dataset.tag];
    });
});
