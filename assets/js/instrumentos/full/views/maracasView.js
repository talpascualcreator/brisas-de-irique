export class MaracasView {
    constructor(container) {
        this.container = container;
    }

    render(onShake) {
        const wrapper = document.createElement('div');
        wrapper.className = 'maracas-container';

        ['left', 'right'].forEach(side => {
            const maraca = document.createElement('div');
            maraca.className = 'maraca';
            maraca.innerHTML = `
                <div class="maraca__body"></div>
                <div class="maraca__handle"></div>
            `;
            maraca.addEventListener('pointerdown', () => {
                onShake();
                maraca.classList.add(`shake-${side}`);
                setTimeout(() => maraca.classList.remove(`shake-${side}`), 100);
            });
            wrapper.appendChild(maraca);
        });

        this.container.appendChild(wrapper);
    }
}
