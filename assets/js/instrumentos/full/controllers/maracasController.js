import { AudioEngine } from '../../utils/audioEngine.js';
import { MaracasView } from '../views/maracasView.js';

export class MaracasController {
    constructor(container) {
        this.audio = new AudioEngine();
        this.view = new MaracasView(container);
    }

    init() {
        this.view.render(() => {
            this.audio.playMaracaShake();
        });
    }
}
