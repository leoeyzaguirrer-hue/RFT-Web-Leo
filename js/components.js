// components.js
console.log("Component system listo");

/**
 * Crea una tarjeta interactiva
 */
function createCard({ title, content }) {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
    `;

    return card;
}

/**
 * Crea un acordeón (para tus submódulos)
 */
function createAccordion(trigger, content) {
    const t = document.querySelector(trigger);
    const c = document.querySelector(content);

    if (t && c) {
        t.addEventListener("click", () => {
            c.classList.toggle("open");
        });
    }
}

