// animations.js
function initAnimations() {
    console.log("Animaciones activadas");

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach(el => {
        el.classList.add("animate-" + el.dataset.animate);
    });
}

