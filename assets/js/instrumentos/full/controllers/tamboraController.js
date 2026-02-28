import { AudioEngine } from '../../utils/audioEngine.js';
import { TamboraView } from '../views/tamboraView.js';

export class TamboraController {
    constructor(container) {
        this.audio = new AudioEngine();
        this.view = new TamboraView(container);
    }

    init() {
        this.view.render((type) => {
            if (type === 'center') {
                this.audio.playKick();
            } else {
                this.audio.playRimShot();
            }
        });
    }
}
