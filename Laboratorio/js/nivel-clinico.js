let ensayo = 0;

const casos = [
  {
    titulo: "Ensayo 1 — Dependencia de aprobación",
    texto: "Paciente que solo toma decisiones si otros la aprueban. Si no recibe validación, se paraliza.",
    opciones: [
      "Decirle exactamente qué hacer (Pliance)",
      "Explorar consecuencias reales (Tracking)",
      "Explorar valores personales (Augmenting)"
    ],
    correcta: 1,
    feedback: "Aquí conviene TRACKING: devolverla al contacto con consecuencias reales."
  },
  {
    titulo: "Ensayo 2 — Evitación persistente",
    texto: "Paciente evita salir porque 'algo malo puede pasar', aunque nunca ha ocurrido.",
    opciones: [
      "Ordenar exposición directa (Pliance)",
      "Analizar evidencia real (Tracking)",
      "Explorar qué vida quiere vivir (Augmenting)"
    ],
    correcta: 2,
    feedback: "Aquí AUGMENTING: no basta con datos, es un tema de valor."
  },
  {
    titulo: "Ensayo 3 — Obediencia rígida",
    texto: "Paciente sigue reglas religiosas aunque sufra intensamente.",
    opciones: [
      "Refuerzo social (Pliance)",
      "Revisar consecuencias reales (Tracking)",
      "Explorar elección personal (Augmenting)"
    ],
    correcta: 2,
    feedback: "Augmenting: diferenciar valor elegido de mandato externo."
  },
  {
    titulo: "Ensayo 4 — Falta de contacto con contingencias",
    texto: "Paciente insiste en un trabajo que lo destruye porque 'así debe ser'.",
    opciones: [
      "Seguir obedeciendo (Pliance)",
      "Revisar efectos reales (Tracking)",
      "Explorar sentido vital (Augmenting)"
    ],
    correcta: 1,
    feedback: "Tracking: recuperar contacto con consecuencias reales."
  },
  {
    titulo: "Ensayo 5 — Sacrificio con sentido",
    texto: "Paciente cuida a un familiar enfermo con gran costo personal.",
    opciones: [
      "Obligación moral (Pliance)",
      "Ver si conviene (Tracking)",
      "Valor elegido (Augmenting)"
    ],
    correcta: 2,
    feedback: "Augmenting: conducta sostenida por valor, aunque cueste."
  },
  {
    titulo: "Ensayo 6 — Control externo",
    texto: "Paciente solo actúa si su jefe lo exige.",
    opciones: [
      "Pliance",
      "Tracking",
      "Augmenting"
    ],
    correcta: 0,
    feedback: "Pliance: la conducta está controlada por autoridad externa."
  },
  {
    titulo: "Ensayo 7 — Aprendizaje por experiencia",
    texto: "Paciente cambia hábitos porque ve que realmente le va mejor.",
    opciones: [
      "Pliance",
      "Tracking",
      "Augmenting"
    ],
    correcta: 1,
    feedback: "Tracking: ajuste por consecuencias reales."
  },
  {
    titulo: "Ensayo 8 — Elección con sufrimiento",
    texto: "Paciente sigue un proyecto vital aunque implique ansiedad.",
    opciones: [
      "Pliance",
      "Tracking",
      "Augmenting"
    ],
    correcta: 2,
    feedback: "Augmenting: valor guía la conducta incluso con costo."
  }
];

function cargar() {
  const c = casos[ensayo];
  document.getElementById("casoTitulo").innerText = c.titulo;
  document.getElementById("casoTexto").innerText = c.texto;
  document.getElementById("op0").innerText = c.opciones[0];
  document.getElementById("op1").innerText = c.opciones[1];
  document.getElementById("op2").innerText = c.opciones[2];
  document.getElementById("feedback").innerText = "";
}

function responder(i) {
  const c = casos[ensayo];
  if (i === c.correcta) {
    document.getElementById("feedback").innerText = "✅ Correcto: " + c.feedback;
  } else {
    document.getElementById("feedback").innerText = "❌ Incorrecto. Observa qué tipo de control está activo realmente.";
  }
}

function siguiente() {
  if (ensayo < casos.length - 1) {
    ensayo++;
    cargar();
  } else {
    document.getElementById("casoTitulo").innerText = "✅ Laboratorio Completo";
    document.getElementById("casoTexto").innerText = "Has completado la aplicación clínica del control por reglas.";
    document.querySelector(".opciones").style.display = "none";
  }
}

cargar();
