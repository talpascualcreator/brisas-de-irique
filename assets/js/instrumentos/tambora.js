import { AudioEngine } from './utils/audioEngine.js';

export class TamboraInstrument {
    constructor() {
        this.audio = new AudioEngine();
        this.btn = document.querySelector('[data-instrument="tambora"]');
        this.card = document.getElementById('card-tambora');
        this.hitType = 0;
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
        if (this.hitType === 0) {
            this.audio.playKick();
            this.hitType = 1;
        } else {
            this.audio.playRimShot();
            this.hitType = 0;
        }
        this.card.classList.add('active');
        setTimeout(() => this.card.classList.remove('active'), 250);
    }
}
