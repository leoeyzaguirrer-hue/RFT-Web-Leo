/* =======================================================
   COMPONENTES — Tarjetas, acordeones, experimentos
   ======================================================= */


/* Tarjeta premium */
function createCard(title, text) {
    const card = document.createElement("div");
    card.classList.add("card-premium");

    card.innerHTML = `
        <h3>${title}</h3>
        <p>${text}</p>
    `;

    return card;
}


/* Acordeón simple */
function createAccordion(trigger, content) {
    const t = document.querySelector(trigger);
    const c = document.querySelector(content);

    if (!t || !c) return;

    t.addEventListener("click", () => {
        c.classList.toggle("open");
    });
}


/* Evaluación simple */
function createCheck(answer, correct, callback) {
    if (answer === correct) callback(true);
    else callback(false);
}
