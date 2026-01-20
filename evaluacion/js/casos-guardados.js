// ===================================
// CASOS GUARDADOS - GESTIÓN
// ===================================

function cargarCasos() {
    const casos = JSON.parse(localStorage.getItem('fleximap_casos') || '[]');
    const casosList = document.getElementById('casosList');
    const noCasos = document.getElementById('noCasos');
    
    if (casos.length === 0) {
        casosList.style.display = 'none';
        noCasos.style.display = 'block';
        return;
    }
    
    // Ordenar por fecha más reciente
    casos.sort((a, b) => new Date(b.fechaGuardado) - new Date(a.fechaGuardado));
    
    const casosHTML = casos.map(caso => `
        <div class="caso-card" data-id="${caso.id}">
            <div class="caso-header">
                <h3>${caso.nombreCaso}</h3>
                <span class="caso-fecha">${new Date(caso.fechaGuardado).toLocaleString('es-ES')}</span>
            </div>
            <div class="caso-info">
                <p><strong>Edad:</strong> ${caso.edad} años | <strong>Duración:</strong> ${caso.duracionProblema || 'No especificada'}</p>
                <p><strong>Función:</strong> ${obtenerNombreFuncionCorto(caso.funcionPrincipal)}</p>
                <p><strong>Problema:</strong> ${caso.conductaProblema.substring(0, 150)}${caso.conductaProblema.length > 150 ? '...' : ''}</p>
            </div>
            <div class="caso-actions">
                <button class="btn btn-primary btn-sm" onclick="verCaso(${caso.id})">Ver Completo</button>
                <button class="btn btn-secondary btn-sm" onclick="exportarCaso(${caso.id})">Exportar JSON</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarCaso(${caso.id})">Eliminar</button>
            </div>
        </div>
    `).join('');
    
    casosList.innerHTML = `
        <div class="casos-stats">
            <p><strong>${casos.length}</strong> caso(s) guardado(s)</p>
            <button class="btn btn-secondary" onclick="exportarTodos()">📦 Exportar Todos (JSON)</button>
        </div>
        ${casosHTML}
    `;
}

function obtenerNombreFuncionCorto(codigo) {
    const nombres = {
        'escape-malestar': 'Escape/Evitación (R-)',
        'atencion-validacion': 'Atención/Validación (R+)',
        'regulacion-emocional': 'Regulación Emocional',
        'falta-reforzadores': 'Falta de Reforzadores',
        'automatico': 'Automático/Sensorial'
    };
    return nombres[codigo] || codigo;
}

function obtenerNombreFuncion(codigo) {
    const nombres = {
        'escape-malestar': 'Escape/Evitación de malestar emocional (R-)',
        'atencion-validacion': 'Obtención de atención/validación social (R+)',
        'regulacion-emocional': 'Regulación emocional inadaptativa',
        'falta-reforzadores': 'Falta de reforzadores en el ambiente',
        'automatico': 'Reforzamiento automático/sensorial'
    };
    return nombres[codigo] || codigo;
}

function verCaso(id) {
    const casos = JSON.parse(localStorage.getItem('fleximap_casos') || '[]');
    const caso = casos.find(c => c.id === id);
    
    if (!caso) {
        alert('Caso no encontrado');
        return;
    }
    
    // Abrir en nueva ventana con el caso completo
    const ventana = window.open('', '_blank', 'width=900,height=800');
    ventana.document.write(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Caso: ${caso.nombreCaso}</title>
            <link rel="stylesheet" href="css/styles.css">
            <link rel="stylesheet" href="css/analisis.css">
            <style>
                @media print {
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="resultado-container" style="display: block;">
                    <div class="resultado-header">
                        <h2>Análisis Funcional: ${caso.nombreCaso}</h2>
                        <p>Fecha: ${new Date(caso.fechaGuardado).toLocaleString('es-ES')}</p>
                    </div>
                    
                    <div class="resultado-section">
                        <h3>📋 Información del Caso</h3>
                        <p><strong>Edad:</strong> ${caso.edad} años</p>
                        <p><strong>Duración:</strong> ${caso.duracionProblema || 'No especificada'}</p>
                        <p><strong>Frecuencia:</strong> ${caso.frecuencia || 'No especificada'}</p>
                        <h4>Motivo de consulta:</h4>
                        <p style="background: #f9fafb; padding: 1rem; border-radius: 8px;">${caso.motivoConsulta}</p>
                        <h4>Conducta problema:</h4>
                        <p style="background: #f9fafb; padding: 1rem; border-radius: 8px;">${caso.conductaProblema}</p>
                    </div>
                    
                    <div class="resultado-section">
                        <h3>🔍 Variables Disposicionales</h3>
                        <h4>Del Entorno:</h4>
                        <ul>
                            ${caso.entornoFamiliar ? `<li><strong>Familiar:</strong> ${caso.entornoFamiliar}</li>` : ''}
                            ${caso.entornoSocial ? `<li><strong>Social/Laboral:</strong> ${caso.entornoSocial}</li>` : ''}
                            ${caso.otrosEntorno ? `<li><strong>Otros:</strong> ${caso.otrosEntorno}</li>` : ''}
                        </ul>
                        <h4>Del Individuo:</h4>
                        <ul>
                            ${caso.historiaAprendizaje ? `<li><strong>Historia:</strong> ${caso.historiaAprendizaje}</li>` : ''}
                            ${caso.repertorioHabilidades ? `<li><strong>Habilidades:</strong> ${caso.repertorioHabilidades}</li>` : ''}
                            ${caso.alteracionesFuncionales ? `<li><strong>Alteraciones:</strong> ${caso.alteracionesFuncionales}</li>` : ''}
                        </ul>
                    </div>
                    
                    <div class="resultado-section">
                        <h3>🔄 Análisis ABC</h3>
                        <div class="abc-box antecedente" style="margin-bottom: 1rem;">
                            <h4>A: Antecedentes</h4>
                            ${caso.situacionExterna ? `<p><strong>Situación:</strong> ${caso.situacionExterna}</p>` : ''}
                            ${caso.pensamientosAntecedentes ? `<p><strong>Pensamientos:</strong> ${caso.pensamientosAntecedentes}</p>` : ''}
                            ${caso.emocionesAntecedentes ? `<p><strong>Emociones:</strong> ${caso.emocionesAntecedentes}</p>` : ''}
                        </div>
                        <div class="abc-box conducta" style="margin-bottom: 1rem;">
                            <h4>B: Conducta</h4>
                            <p><strong>Motor:</strong> ${caso.componenteMotor}</p>
                            ${caso.componenteFisiologico ? `<p><strong>Fisiológico:</strong> ${caso.componenteFisiologico}</p>` : ''}
                            ${caso.componenteCognitivo ? `<p><strong>Cognitivo:</strong> ${caso.componenteCognitivo}</p>` : ''}
                        </div>
                        <div class="abc-box consecuencia">
                            <h4>C: Consecuencias</h4>
                            ${caso.consecuenciasExternas ? `<p><strong>Externas:</strong> ${caso.consecuenciasExternas}</p>` : ''}
                            <p><strong>Internas:</strong> ${caso.consecuenciasInternas}</p>
                        </div>
                    </div>
                    
                    <div class="resultado-section">
                        <h3>💡 Hipótesis de Mantenimiento</h3>
                        <p><strong>Función:</strong> ${obtenerNombreFuncion(caso.funcionPrincipal)}</p>
                        <div style="background: #f9fafb; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2563eb;">
                            <p style="margin: 0;">${caso.hipotesisMantenimiento}</p>
                        </div>
                        ${caso.conductasMantenimiento ? `
                            <h4 style="margin-top: 1rem;">Conductas problema:</h4>
                            <pre style="background: #f9fafb; padding: 1rem; border-radius: 8px; white-space: pre-wrap; font-family: inherit;">${caso.conductasMantenimiento}</pre>
                        ` : ''}
                    </div>
                    
                    <div class="no-print" style="margin-top: 2rem; display: flex; gap: 1rem;">
                        <button class="btn btn-primary" onclick="window.print()">🖨️ Imprimir</button>
                        <button class="btn btn-secondary" onclick="window.close()">Cerrar</button>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `);
}

function exportarCaso(id) {
    const casos = JSON.parse(localStorage.getItem('fleximap_casos') || '[]');
    const caso = casos.find(c => c.id === id);
    
    if (!caso) {
        alert('Caso no encontrado');
        return;
    }
    
    const dataStr = JSON.stringify(caso, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `caso_${caso.nombreCaso.replace(/\s+/g, '_')}_${caso.id}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
}

function eliminarCaso(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar este caso? Esta acción no se puede deshacer.')) {
        return;
    }
    
    let casos = JSON.parse(localStorage.getItem('fleximap_casos') || '[]');
    casos = casos.filter(c => c.id !== id);
    localStorage.setItem('fleximap_casos', JSON.stringify(casos));
    
    cargarCasos();
}

function exportarTodos() {
    const casos = JSON.parse(localStorage.getItem('fleximap_casos') || '[]');
    
    if (casos.length === 0) {
        alert('No hay casos para exportar');
        return;
    }
    
    const dataStr = JSON.stringify(casos, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `fleximap_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', cargarCasos);
