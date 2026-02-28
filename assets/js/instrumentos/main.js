import { LiraInstrument } from './lira.js';
import { MaracasInstrument } from './maracas.js';
import { TamboraInstrument } from './tambora.js';

document.addEventListener('DOMContentLoaded', () => {
    const lira = new LiraInstrument();
    const maracas = new MaracasInstrument();
    const tambora = new TamboraInstrument();

    lira.init();
    maracas.init();
    tambora.init();

    const volumeSlider = document.getElementById('volume-slider');
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            const volume = parseFloat(e.target.value);
            [lira, maracas, tambora].forEach(inst => {
                if (inst.audio && inst.audio.masterGain) {
                    inst.audio.masterGain.gain.value = volume;
                }
            });
        });
    }

    console.log('Instrumentos Virtuales - Brisas de Irique: Initialized');
});
