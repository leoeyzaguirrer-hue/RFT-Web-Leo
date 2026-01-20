// ===================================
// FLEXIMAP - ANÁLISIS FUNCIONAL
// Sistema completo basado en modelo ITEMA
// ===================================

let currentSection = 1;
const totalSections = 4;

// ===== NAVEGACIÓN ENTRE SECCIONES =====
function nextSection(sectionNumber) {
    // Validar sección actual antes de avanzar
    if (!validateCurrentSection()) {
        alert('Por favor completa todos los campos requeridos (*) antes de continuar');
        return;
    }
    
    showSection(sectionNumber);
    updateProgress();
}

function previousSection(sectionNumber) {
    showSection(sectionNumber);
    updateProgress();
}

function showSection(sectionNumber) {
    // Ocultar todas las secciones
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar sección seleccionada
    document.getElementById(`seccion${sectionNumber}`).classList.add('active');
    
    // Actualizar pasos en el progress
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.remove('active');
        if (index + 1 === sectionNumber) {
            step.classList.add('active');
        }
    });
    
    currentSection = sectionNumber;
    
    // Scroll suave al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgress() {
    const progressPercentage = (currentSection / totalSections) * 100;
    document.getElementById('progressFill').style.width = progressPercentage + '%';
}

function validateCurrentSection() {
    const currentSectionElement = document.getElementById(`seccion${currentSection}`);
    const requiredInputs = currentSectionElement.querySelectorAll('[required]');
    
    for (let input of requiredInputs) {
        if (!input.value.trim()) {
            input.focus();
            input.style.borderColor = 'var(--danger)';
            setTimeout(() => {
                input.style.borderColor = '';
            }, 2000);
            return false;
        }
    }
    
    return true;
}

// ===== ENVÍO DEL FORMULARIO =====
document.getElementById('analisisForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateCurrentSection()) {
        alert('Por favor completa todos los campos requeridos (*)');
        return;
    }
    
    generarAnalisis();
});

// ===== GENERAR ANÁLISIS FUNCIONAL COMPLETO =====
function generarAnalisis() {
    const formData = new FormData(document.getElementById('analisisForm'));
    const data = Object.fromEntries(formData.entries());
    
    // Agregar metadata
    data.fecha = new Date().toLocaleDateString('es-ES');
    data.id = Date.now();
    
    // Generar recomendación según función
    const recomendacion = generarRecomendacion(data.funcionPrincipal);
    
    // Guardar en localStorage
    guardarAnalisis(data);
    
    // Mostrar resultado
    mostrarResultado(data, recomendacion);
}

// ===== GENERAR RECOMENDACIÓN DE INTERVENCIÓN =====
function generarRecomendacion(funcion) {
    const recomendaciones = {
        'escape-malestar': {
            titulo: 'Exposición con Prevención de Respuesta + ACT',
            descripcion: 'Tratamiento de primera línea para problemas mantenidos por reforzamiento negativo',
            terapias: [
                'Exposición gradual a situaciones evitadas (con prevención de respuesta)',
                'ACT: Defusión cognitiva para manejar pensamientos catastrofistas',
                'ACT: Aceptación del malestar emocional',
                'Mindfulness para tolerancia al malestar',
                'Eliminación progresiva de conductas de seguridad'
            ],
            evidencia: 'Tratamiento de primera línea para trastornos de ansiedad. Fuerte evidencia empírica (meta-análisis muestran tamaños del efecto d=0.8-1.2)',
            objetivos: [
                'Extinguir/contracondicionar estímulos temidos',
                'Habituación a la ansiedad',
                'Desconfirmar creencias catastrofistas',
                'Desarrollar tolerancia al malestar'
            ]
        },
        'atencion-validacion': {
            titulo: 'Psicoterapia Analítica Funcional (FAP) + Habilidades Interpersonales',
            descripcion: 'Para problemas mantenidos por reforzamiento social positivo',
            terapias: [
                'FAP: Análisis de conductas clínicamente relevantes (CRBs)',
                'Reforzamiento natural de conductas adaptativas en sesión',
                'Entrenamiento en comunicación asertiva',
                'Trabajo con patrones relacionales disfuncionales',
                'Generalización a contextos naturales'
            ],
            evidencia: 'FAP ha demostrado eficacia en problemas interpersonales y de apego (RCTs con tamaños del efecto d=0.6-0.9)',
            objetivos: [
                'Identificar patrones interpersonales problemáticos',
                'Desarrollar habilidades de comunicación directa',
                'Reducir dependencia de validación externa',
                'Fortalecer autovalidación'
            ]
        },
        'regulacion-emocional': {
            titulo: 'Terapia Dialéctico Conductual (DBT) - Regulación Emocional',
            descripcion: 'Para desregulación emocional y conductas impulsivas',
            terapias: [
                'Habilidades de Regulación Emocional (DBT)',
                'Tolerancia al malestar sin conductas destructivas',
                'Mindfulness (atención al momento presente)',
                'Acción opuesta a impulsos emocionales',
                'Validación emocional + cambio conductual'
            ],
            evidencia: 'DBT es tratamiento validado empíricamente para desregulación emocional (múltiples RCTs, especialmente en TLP)',
            objetivos: [
                'Identificar y etiquetar emociones',
                'Reducir vulnerabilidad emocional',
                'Aumentar tolerancia al malestar',
                'Disminuir conductas impulsivas'
            ]
        },
        'falta-reforzadores': {
            titulo: 'Activación Conductual para Depresión (BATD)',
            descripcion: 'Para inactividad y falta de reforzadores ambientales',
            terapias: [
                'Behavioral Activation Treatment for Depression (BATD)',
                'Identificación de valores personales',
                'Programación de actividades reforzantes alineadas con valores',
                'Monitoreo de ánimo y actividades',
                'Manejo de barreras para la activación'
            ],
            evidencia: 'BATD ha demostrado eficacia comparable a antidepresivos en depresión moderada-severa (meta-análisis: d=0.78)',
            objetivos: [
                'Incrementar contacto con reforzadores',
                'Romper ciclo inactividad-rumiación-depresión',
                'Reconectar con valores',
                'Establecer rutinas de activación'
            ]
        },
        'automatico': {
            titulo: 'ACT + Control Estimular + Prevención de Respuesta',
            descripcion: 'Para conductas automáticas y hábitos',
            terapias: [
                'ACT: Defusión de pensamientos automáticos',
                'ACT: Aceptación de impulsos sin actuar sobre ellos',
                'Control de estímulos discriminativos',
                'Prevención de respuesta',
                'Mindfulness y atención plena',
                'Desarrollo de conductas alternativas incompatibles'
            ],
            evidencia: 'ACT + técnicas conductuales efectivo para hábitos y conductas automáticas (evidencia moderada)',
            objetivos: [
                'Aumentar conciencia de antecedentes',
                'Romper cadenas conductuales automáticas',
                'Desarrollar respuestas alternativas',
                'Tolerar impulsos sin actuar'
            ]
        }
    };
    
    return recomendaciones[funcion] || recomendaciones['escape-malestar'];
}

// ===== MOSTRAR RESULTADO COMPLETO =====
function mostrarResultado(data, recomendacion) {
    const resultadoHTML = `
        <div class="resultado-header">
            <h2>✓ Análisis Funcional Completado</h2>
            <p>Caso: ${data.nombreCaso} | Fecha: ${data.fecha}</p>
        </div>
        
        <div class="resultado-section">
            <h3>📋 Información Básica del Caso</h3>
            <p><strong>Edad:</strong> ${data.edad} años</p>
            <p><strong>Duración del problema:</strong> ${data.duracionProblema || 'No especificada'}</p>
            <p><strong>Frecuencia:</strong> ${data.frecuencia || 'No especificada'}</p>
            <h4>Motivo de Consulta:</h4>
            <p style="background: var(--gray-50); padding: 1rem; border-radius: 8px; border-left: 3px solid var(--primary);">${data.motivoConsulta}</p>
            <h4>Definición Operacional de la Conducta Problema:</h4>
            <p style="background: var(--gray-50); padding: 1rem; border-radius: 8px; border-left: 3px solid var(--primary);">${data.conductaProblema}</p>
        </div>
        
        <div class="resultado-section">
            <h3>🔍 Variables Disposicionales</h3>
            <h4>★ Del Entorno:</h4>
            <ul>
                ${data.entornoFamiliar ? `<li><strong>Contexto Familiar:</strong> ${data.entornoFamiliar}</li>` : ''}
                ${data.entornoSocial ? `<li><strong>Contexto Social/Laboral:</strong> ${data.entornoSocial}</li>` : ''}
                ${data.otrosEntorno ? `<li><strong>Otros aspectos:</strong> ${data.otrosEntorno}</li>` : ''}
            </ul>
            <h4>★ Del Individuo:</h4>
            <ul>
                ${data.historiaAprendizaje ? `<li><strong>Historia de Aprendizaje:</strong> ${data.historiaAprendizaje}</li>` : ''}
                ${data.repertorioHabilidades ? `<li><strong>Repertorio de Habilidades:</strong> ${data.repertorioHabilidades}</li>` : ''}
                ${data.alteracionesFuncionales ? `<li><strong>Alteraciones Funcionales:</strong> ${data.alteracionesFuncionales}</li>` : ''}
            </ul>
        </div>
        
        <div class="resultado-section">
            <h3>🔄 Análisis ABC (Antecedentes-Conducta-Consecuencias)</h3>
            
            <div class="abc-box antecedente" style="margin-bottom: 1rem;">
                <h4>A: ANTECEDENTES</h4>
                ${data.situacionExterna ? `<p><strong>Situación externa:</strong> ${data.situacionExterna}</p>` : ''}
                ${data.pensamientosAntecedentes ? `<p><strong>Pensamientos/Verbalizaciones:</strong> ${data.pensamientosAntecedentes}</p>` : ''}
                ${data.emocionesAntecedentes ? `<p><strong>Emociones/Sensaciones:</strong> ${data.emocionesAntecedentes}</p>` : ''}
            </div>
            
            <div class="abc-box conducta" style="margin-bottom: 1rem;">
                <h4>B: CONDUCTA</h4>
                <p><strong>Motor:</strong> ${data.componenteMotor}</p>
                ${data.componenteFisiologico ? `<p><strong>Fisiológico:</strong> ${data.componenteFisiologico}</p>` : ''}
                ${data.componenteCognitivo ? `<p><strong>Cognitivo:</strong> ${data.componenteCognitivo}</p>` : ''}
            </div>
            
            <div class="abc-box consecuencia">
                <h4>C: CONSECUENCIAS</h4>
                ${data.consecuenciasExternas ? `<p><strong>Externas:</strong> ${data.consecuenciasExternas}</p>` : ''}
                <p><strong>Internas:</strong> ${data.consecuenciasInternas}</p>
                ${data.tipoConsecuencia ? `<p><strong>Tipo:</strong> ${obtenerNombreTipoConsecuencia(data.tipoConsecuencia)}</p>` : ''}
            </div>
        </div>
        
        <div class="resultado-section">
            <h3>💡 Hipótesis de Mantenimiento</h3>
            <p><strong>Función Principal:</strong> ${obtenerNombreFuncion(data.funcionPrincipal)}</p>
            <div style="background: var(--gray-50); padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--primary); margin: 1rem 0;">
                <p style="margin: 0;">${data.hipotesisMantenimiento}</p>
            </div>
            ${data.conductasMantenimiento ? `
                <h4>Conductas que mantienen el problema:</h4>
                <pre style="background: var(--gray-50); padding: 1rem; border-radius: 8px; white-space: pre-wrap; font-family: inherit; margin: 0;">${data.conductasMantenimiento}</pre>
            ` : ''}
        </div>
        
        <div class="resultado-section">
            <div class="recomendacion-box">
                <h4>🎯 Recomendación de Intervención</h4>
                <p style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">${recomendacion.titulo}</p>
                <p style="margin-bottom: 1rem;">${recomendacion.descripcion}</p>
                
                <h4 style="font-size: 1rem; margin-top: 1rem;">Procedimientos y Técnicas:</h4>
                <ul>
                    ${recomendacion.terapias.map(t => `<li>${t}</li>`).join('')}
                </ul>
                
                <h4 style="font-size: 1rem; margin-top: 1rem;">Objetivos de Intervención:</h4>
                <ul>
                    ${recomendacion.objetivos.map(o => `<li>${o}</li>`).join('')}
                </ul>
                
                <p style="margin-top: 1rem; font-size: 0.9rem; color: #065f46; font-style: italic;">
                    <strong>Base de evidencia:</strong> ${recomendacion.evidencia}
                </p>
            </div>
        </div>
        
        <div class="action-buttons">
            <button class="btn btn-primary" onclick="imprimirAnalisis()">
                🖨️ Imprimir/Guardar PDF
            </button>
            <button class="btn btn-secondary" onclick="descargarJSON()">
                💾 Exportar JSON
            </button>
            <a href="casos-guardados.html" class="btn btn-secondary">
                📁 Ver Casos Guardados
            </a>
            <a href="analisis-nuevo.html" class="btn btn-secondary">
                📋 Nuevo Análisis
            </a>
        </div>
    `;
    
    const resultadoContainer = document.getElementById('resultado');
    resultadoContainer.innerHTML = resultadoHTML;
    resultadoContainer.style.display = 'block';
    
    // Ocultar formulario
    document.getElementById('analisisForm').style.display = 'none';
    document.querySelector('.progress-container').style.display = 'none';
    
    // Scroll suave al resultado
    setTimeout(() => {
        resultadoContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// ===== FUNCIONES AUXILIARES =====
function obtenerNombreFuncion(codigo) {
    const nombres = {
        'escape-malestar': 'Escape/Evitación de malestar emocional (Reforzamiento Negativo R-)',
        'atencion-validacion': 'Obtención de atención/validación social (Reforzamiento Positivo R+)',
        'regulacion-emocional': 'Regulación emocional inadaptativa',
        'falta-reforzadores': 'Falta de reforzadores en el ambiente (inactividad)',
        'automatico': 'Reforzamiento automático/sensorial'
    };
    return nombres[codigo] || codigo;
}

function obtenerNombreTipoConsecuencia(tipo) {
    const nombres = {
        'r-negativo': 'Reforzamiento Negativo (R-) - Quita algo desagradable',
        'r-positivo': 'Reforzamiento Positivo (R+) - Obtiene algo agradable',
        'castigo': 'Castigo Positivo (C+) - Aparece algo aversivo',
        'mixto': 'Mixto - Combinación de reforzamiento y/o castigo'
    };
    return nombres[tipo] || tipo;
}

// ===== GUARDAR EN LOCALSTORAGE =====
function guardarAnalisis(data) {
    let casos = JSON.parse(localStorage.getItem('fleximap_casos') || '[]');
    
    data.fechaGuardado = new Date().toISOString();
    
    casos.push(data);
    localStorage.setItem('fleximap_casos', JSON.stringify(casos));
    
    console.log('Análisis guardado correctamente');
}

// ===== IMPRIMIR/PDF =====
function imprimirAnalisis() {
    window.print();
}

// ===== DESCARGAR JSON =====
function descargarJSON() {
    const casos = JSON.parse(localStorage.getItem('fleximap_casos') || '[]');
    const ultimoCaso = casos[casos.length - 1];
    
    if (!ultimoCaso) {
        alert('No hay datos para exportar');
        return;
    }
    
    const dataStr = JSON.stringify(ultimoCaso, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `analisis_${ultimoCaso.nombreCaso.replace(/\s+/g, '_')}_${ultimoCaso.id}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('FlexiMap - Sistema de Análisis Funcional ITEMA cargado');
    updateProgress();
});
