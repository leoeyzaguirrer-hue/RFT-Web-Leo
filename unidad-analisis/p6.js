// p6.js — L4 · Ejercicio integrador · Unidad de Análisis

document.addEventListener("DOMContentLoaded", () => {
  setupFadeIn();
  setupAccordions();
  setupIntroExercise();
  setupABCExercise();
  setupClassExercise();
  setupClosureExercise();
});

/* -----------------------------
   Fade-in suave al hacer scroll
------------------------------ */
function setupFadeIn() {
  const fadeEls = document.querySelectorAll(".ua-fade-in");
  if (!("IntersectionObserver" in window) || fadeEls.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("ua-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeEls.forEach((el) => observer.observe(el));
}

/* -----------------------------
   Acordeones básicos
------------------------------ */
function setupAccordions() {
  const headers = document.querySelectorAll(".ua-acc-header");
  headers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      const icon = btn.querySelector(".ua-acc-icon");

      const isOpen = panel.style.display === "block";

      // Cerrar todos
      document
        .querySelectorAll(".ua-acc-panel")
        .forEach((p) => (p.style.display = "none"));
      document
        .querySelectorAll(".ua-acc-icon")
        .forEach((i) => (i.textContent = "›"));

      // Abrir si estaba cerrado
      if (!isOpen) {
        panel.style.display = "block";
        if (icon) icon.textContent = "⌄";
      }
    });
  });

  // Abrir el primer bloque por defecto
  const firstPanel = document.querySelector(".ua-acc-panel");
  const firstIcon = document.querySelector(".ua-acc-header .ua-acc-icon");
  if (firstPanel) firstPanel.style.display = "block";
  if (firstIcon) firstIcon.textContent = "⌄";
}

/* -----------------------------
   Ejercicio 1 — Descripción útil
------------------------------ */
function setupIntroExercise() {
  const buttons = document.querySelectorAll(".ua-answer-btn[data-q='intro1']");
  const feedback = document.getElementById("ua-feedback-intro1");
  if (!buttons.length || !feedback) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Quitar selección previa
      buttons.forEach((b) => b.classList.remove("ua-answer-selected"));

      btn.classList.add("ua-answer-selected");
      const correct = btn.getAttribute("data-correct") === "true";

      if (correct) {
        feedback.textContent =
          "Correcto: la opción 3 describe un episodio de acción-en-contexto con antecedente, acción y consecuencia inmediata. Es una unidad que puedes usar para intervenir.";
        feedback.classList.add("ua-mini-ok");
        feedback.classList.remove("ua-mini-error");
      } else {
        feedback.textContent =
          "Esta descripción aporta información, pero no organiza un episodio completo de acción-en-contexto. Busca la opción que incluya qué ocurre antes, qué hace Laura y qué efecto inmediato tiene.";
        feedback.classList.add("ua-mini-error");
        feedback.classList.remove("ua-mini-ok");
      }
    });
  });
}

/* -----------------------------------
   Ejercicio 2 — Completar unidad ABC
------------------------------------ */
function setupABCExercise() {
  const options = document.querySelectorAll(".ua-abc-option");
  const feedback = document.getElementById("ua-feedback-abc");
  if (!options.length || !feedback) return;

  const state = {
    ant: null,
    act: null,
    cons: null,
  };

  options.forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.getAttribute("data-group");
      if (!group) return;

      // Des-seleccionar en el mismo grupo
      options.forEach((b) => {
        if (b.getAttribute("data-group") === group) {
          b.classList.remove("ua-answer-selected");
        }
      });

      btn.classList.add("ua-answer-selected");
      state[group] = btn.getAttribute("data-correct") === "true";

      if (state.ant !== null && state.act !== null && state.cons !== null) {
        const allCorrect = state.ant && state.act && state.cons;
        if (allCorrect) {
          feedback.textContent =
            "Muy bien: has construido una unidad funcional completa. Ante el mensaje de reunión, Laura responde que no asistirá y obtiene alivio inmediato.";
          feedback.classList.add("ua-mini-ok");
          feedback.classList.remove("ua-mini-error");
        } else {
          feedback.textContent =
            "Aún falta ajustar la unidad. Asegúrate de que el antecedente sea la situación actual, la acción describa lo que Laura hace ante esa situación y la consecuencia sea el efecto inmediato.";
          feedback.classList.add("ua-mini-error");
          feedback.classList.remove("ua-mini-ok");
        }
      } else {
        feedback.textContent =
          "Selecciona una opción para cada columna (Antecedente, Acción y Consecuencia inmediata).";
        feedback.classList.remove("ua-mini-ok", "ua-mini-error");
      }
    });
  });
}

/* -----------------------------------------
   Ejercicio 3 — Pertenece a la misma clase
------------------------------------------ */
function setupClassExercise() {
  const options = document.querySelectorAll(".ua-class-option");
  const feedback = document.getElementById("ua-feedback-class");
  const checkBtn = document.getElementById("ua-check-class");
  if (!options.length || !feedback || !checkBtn) return;

  options.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("ua-answer-selected");
    });
  });

  checkBtn.addEventListener("click", () => {
    let allGood = true;
    let anySelected = false;

    options.forEach((btn) => {
      const selected = btn.classList.contains("ua-answer-selected");
      const evita = btn.getAttribute("data-evita") === "true";

      if (selected) anySelected = true;
      if ((selected && !evita) || (!selected && evita)) {
        allGood = false;
      }
    });

    if (!anySelected) {
      feedback.textContent =
        "Marca al menos una opción antes de comprobar. Piensa en cuáles conductas reducen la exposición social a corto plazo.";
      feedback.classList.add("ua-mini-error");
      feedback.classList.remove("ua-mini-ok");
      return;
    }

    if (allGood) {
      feedback.textContent =
        "Correcto: A, B y D pertenecen a la clase funcional de evitación de interacción social. C describe una conducta de preparación/exposición, no de evitación.";
      feedback.classList.add("ua-mini-ok");
      feedback.classList.remove("ua-mini-error");
    } else {
      feedback.textContent =
        "Revisa tu selección. Recuerda: la clase funcional agrupa conductas que, aunque se vean distintas, cumplen la misma función de evitar la interacción social.";
      feedback.classList.add("ua-mini-error");
      feedback.classList.remove("ua-mini-ok");
    }
  });
}

/* ------------------------------------
   Ejercicio 4 — Checklist de cierre
------------------------------------- */
function setupClosureExercise() {
  const checks = document.querySelectorAll(".ua-closure-check");
  const feedback = document.getElementById("ua-feedback-closure");
  const btn = document.getElementById("ua-check-closure");
  if (!checks.length || !feedback || !btn) return;

  btn.addEventListener("click", () => {
    const selected = Array.from(checks).filter((c) => c.checked).map((c) => c.value);

    if (selected.length === 0) {
      feedback.textContent =
        "Marca al menos uno de los elementos. Una unidad de análisis vacía no puede guiar una intervención.";
      feedback.classList.add("ua-mini-error");
      feedback.classList.remove("ua-mini-ok");
      return;
    }

    const recomendados = ["interaccion", "valores", "reglas", "historia"];

    const tieneClave = recomendados.some((v) => selected.includes(v));

    if (tieneClave) {
      feedback.textContent =
        "Vas por buen camino: al incluir situaciones alternativas, valores, reglas y algo de historia interpersonal, la unidad se vuelve más rica y útil para planear intervenciones ACT/RFT.";
      feedback.classList.add("ua-mini-ok");
      feedback.classList.remove("ua-mini-error");
    } else {
      feedback.textContent =
        "Has seleccionado elementos útiles, pero suele ser clave agregar también información sobre situaciones donde la conducta cambia, valores y reglas que sostienen la evitación.";
      feedback.classList.add("ua-mini-error");
      feedback.classList.remove("ua-mini-ok");
    }
  });
}
