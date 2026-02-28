import { LyreController } from './controllers/lyreController.js';
import { TamboraController } from './controllers/tamboraController.js';
import { MaracasController } from './controllers/maracasController.js';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('tipo') || 'lira';
    const container = document.getElementById('instrument-app');
    const titleEl = document.getElementById('instrument-title');

    if (!container) return;

    let controller;

    switch (type) {
        case 'lira':
            titleEl.textContent = 'Lira Virtual - Alta Fidelidad';
            controller = new LyreController(container);
            break;
        case 'tambora':
            titleEl.textContent = 'Tambora Virtual - Alta Fidelidad';
            controller = new TamboraController(container);
            break;
        case 'maracas':
            titleEl.textContent = 'Maracas Virtuales - Alta Fidelidad';
            controller = new MaracasController(container);
            break;
        default:
            container.innerHTML = '<p>Instrumento no encontrado.</p>';
            return;
    }

    controller.init();
});
