import { AudioEngine } from './utils/audioEngine.js';

export class MaracasInstrument {
    constructor() {
        this.audio = new AudioEngine();
        this.btn = document.querySelector('[data-instrument="maracas"]');
        this.card = document.getElementById('card-maracas');
    }

    init() {
        if (!this.btn) return;
        this.btn.addEventListener('click', () => this.play());
        this.btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.play();
        });
    }

    play() {
        this.audio.playMaracaShake();
        this.card.classList.add('active');
        setTimeout(() => this.card.classList.remove('active'), 200);
    }
}
