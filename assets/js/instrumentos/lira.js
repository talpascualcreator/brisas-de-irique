import { AudioEngine } from './utils/audioEngine.js';

export class LiraInstrument {
    constructor() {
        this.audio = new AudioEngine();
        this.btn = document.querySelector('[data-instrument="lira"]');
        this.card = document.getElementById('card-lira');
        this.notes = [60, 64, 67, 72]; 
        this.currentNoteIndex = 0;
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
        const freq = AudioEngine.midiToFreq(this.notes[this.currentNoteIndex]);
        this.audio.playTone(freq);
        this.card.classList.add('active');
        setTimeout(() => this.card.classList.remove('active'), 300);
        this.currentNoteIndex = (this.currentNoteIndex + 1) % this.notes.length;
    }
}
