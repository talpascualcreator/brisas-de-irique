/**
 * LyreView - Handles DOM, styling, and visual interactions
 */
export class LyreView {
    constructor(container) {
        this.container = container;
        this.keysDOM = new Map(); // Map noteId -> DOM Element
    }

    /**
     * Renders the complete HTML structure of the Lyre
     */
    render(upperKeys, lowerKeys, onKeyInteract) {
        const lyreEl = document.createElement('div');
        lyreEl.className = 'lyre';

        // Add decorative bars
        const topBar = document.createElement('div');
        topBar.className = 'lyre-top-bar';
        const handle = document.createElement('div');
        handle.className = 'lyre-handle';
        lyreEl.appendChild(topBar);
        lyreEl.appendChild(handle);

        const keyboardContainer = document.createElement('div');
        keyboardContainer.className = 'lyre__keyboard';

        // Add back rails
        const railTop = document.createElement('div');
        railTop.className = 'lyre__rail lyre__rail--top';
        const railBottom = document.createElement('div');
        railBottom.className = 'lyre__rail lyre__rail--bottom';
        keyboardContainer.appendChild(railTop);
        keyboardContainer.appendChild(railBottom);

        // Render Upper Row (Accidentals)
        const rowTop = document.createElement('div');
        rowTop.className = 'lyre__row lyre__row--top';
        upperKeys.forEach(keyConfig => {
            const keyEl = this._createKey(keyConfig, onKeyInteract);
            if (keyConfig.spacer) {
                keyEl.style.visibility = 'hidden';
                keyEl.style.pointerEvents = 'none';
            } else {
                this.keysDOM.set(keyConfig.id, keyEl);
            }
            rowTop.appendChild(keyEl);
        });

        // Render Lower Row (Naturals)
        const rowBottom = document.createElement('div');
        rowBottom.className = 'lyre__row lyre__row--bottom';
        lowerKeys.forEach(keyConfig => {
            const keyEl = this._createKey(keyConfig, onKeyInteract);
            this.keysDOM.set(keyConfig.id, keyEl);
            rowBottom.appendChild(keyEl);
        });

        keyboardContainer.appendChild(rowTop);
        keyboardContainer.appendChild(rowBottom);
        lyreEl.appendChild(keyboardContainer);

        // Clear and mount
        this.container.innerHTML = '';
        this.container.appendChild(lyreEl);
    }

    _createKey(config, interactCallback) {
        const el = document.createElement('div');
        el.className = 'lyre__key';
        el.dataset.id = config.id || '';

        if (config.label) {
            const lbl = document.createElement('span');
            lbl.className = 'lyre__label';
            lbl.textContent = config.label;
            el.appendChild(lbl);
        }

        if (config.keyMap) {
            const mapLbl = document.createElement('span');
            mapLbl.className = 'lyre__mapping';
            mapLbl.textContent = config.keyMap.toUpperCase();
            el.appendChild(mapLbl);
        }

        if (!config.spacer) {
            const heightReduce = (config.midi - 60) * 2;
            el.style.transform = `scaleY(${1 - (heightReduce / 200)})`;
            el.style.transformOrigin = 'bottom';
        }

        if (!config.spacer) {
            el.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                interactCallback(config.id);
                this.activateKey(config.id);
            });
            el.addEventListener('pointerup', () => this.deactivateKey(config.id));
            el.addEventListener('pointerleave', () => this.deactivateKey(config.id));
        }

        return el;
    }

    activateKey(id) {
        const key = this.keysDOM.get(id);
        if (key) {
            key.classList.add('lyre__key--active');
        }
    }

    deactivateKey(id) {
        const key = this.keysDOM.get(id);
        if (key) {
            key.classList.remove('lyre__key--active');
        }
    }
}
