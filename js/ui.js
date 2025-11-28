// ui.js
function initUI() {
    console.log("UI inicializada");

    // Delegación para botones de navegación
    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-page]")) {
            const page = e.target.getAttribute("data-page");
            loadPage(page);
        }
    });
}

