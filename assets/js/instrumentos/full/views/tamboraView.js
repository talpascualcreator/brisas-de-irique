export class TamboraView {
    constructor(container) {
        this.container = container;
    }

    render(onHit) {
        const tamboraEl = document.createElement('div');
        tamboraEl.className = 'tambora';

        const center = document.createElement('div');
        center.className = 'tambora__zone--center';

        tamboraEl.addEventListener('pointerdown', (e) => {
            const isCenter = e.target.classList.contains('tambora__zone--center');
            onHit(isCenter ? 'center' : 'rim');

            const animClass = isCenter ? 'hit-center' : 'hit-rim';
            tamboraEl.classList.add(animClass);
            setTimeout(() => tamboraEl.classList.remove(animClass), 100);
        });

        tamboraEl.appendChild(center);
        this.container.appendChild(tamboraEl);
    }
}
