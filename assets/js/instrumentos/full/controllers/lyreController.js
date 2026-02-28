import { AudioEngine } from '../../utils/audioEngine.js';
import { LyreView } from '../views/lyreView.js';

/**
 * Controller linking User Interaction (Keyboard/Touch/Mouse),
 * Audio Synthesis, and View Rendering.
 */
export class LyreController {
    constructor(container) {
        this.audio = new AudioEngine();
        this.view = new LyreView(container);

        this.keyMap = new Map(); // Maps KeyboardEvent.key to Note ID
        this.activeKeys = new Set(); // Prevents auto-repeat holding triggers

        // Musical Layout Setup - 2 Octaves (C4 to C6)
        this.lowerKeys = [
            { id: 'C4', label: 'C', midi: 60, keyMap: 'q' },
            { id: 'D4', label: 'D', midi: 62, keyMap: 'w' },
            { id: 'E4', label: 'E', midi: 64, keyMap: 'e' },
            { id: 'F4', label: 'F', midi: 65, keyMap: 'r' },
            { id: 'G4', label: 'G', midi: 67, keyMap: 't' },
            { id: 'A4', label: 'A', midi: 69, keyMap: 'y' },
            { id: 'B4', label: 'B', midi: 71, keyMap: 'u' },
            { id: 'C5', label: 'C', midi: 72, keyMap: 'i' },
            { id: 'D5', label: 'D', midi: 74, keyMap: 'o' },
            { id: 'E5', label: 'E', midi: 76, keyMap: 'p' },
            { id: 'F5', label: 'F', midi: 77, keyMap: 'a' },
            { id: 'G5', label: 'G', midi: 79, keyMap: 's' },
            { id: 'A5', label: 'A', midi: 81, keyMap: 'd' },
            { id: 'B5', label: 'B', midi: 83, keyMap: 'f' },
            { id: 'C6', label: 'C', midi: 84, keyMap: 'g' },
        ];

        this.upperKeys = [
            { id: 'Cs4', label: 'C#', midi: 61, keyMap: '2' },
            { id: 'Ds4', label: 'D#', midi: 63, keyMap: '3' },
            { spacer: true },
            { id: 'Fs4', label: 'F#', midi: 66, keyMap: '5' },
            { id: 'Gs4', label: 'G#', midi: 68, keyMap: '6' },
            { id: 'As4', label: 'A#', midi: 70, keyMap: '7' },
            { spacer: true },
            { id: 'Cs5', label: 'C#', midi: 73, keyMap: '9' },
            { id: 'Ds5', label: 'D#', midi: 75, keyMap: '0' },
            { spacer: true },
            { id: 'Fs5', label: 'F#', midi: 78, keyMap: 'z' },
            { id: 'Gs5', label: 'G#', midi: 80, keyMap: 'x' },
            { id: 'As5', label: 'A#', midi: 82, keyMap: 'c' },
            { spacer: true },
            { id: 'Cs6', label: 'C#', midi: 85, keyMap: 'v' }
        ];

        this._buildKeyMap();
    }

    init() {
        this.view.render(this.upperKeys, this.lowerKeys, this._handleInteract.bind(this));
        this._setupKeyboardEvents();
    }

    _buildKeyMap() {
        const allKeys = [...this.upperKeys, ...this.lowerKeys];
        allKeys.forEach(k => {
            if (!k.spacer && k.keyMap && k.id) {
                this.keyMap.set(k.keyMap.toLowerCase(), {
                    id: k.id,
                    midi: k.midi
                });
            }
        });
    }

    _handleInteract(noteId) {
        const keyConfig = [...this.upperKeys, ...this.lowerKeys].find(k => k.id === noteId);
        if (keyConfig) {
            const freq = AudioEngine.midiToFreq(keyConfig.midi);
            this.audio.playTone(freq);
        }
    }

    _setupKeyboardEvents() {
        window.addEventListener('keydown', (e) => {
            if (e.repeat) return;
            const keyChar = e.key.toLowerCase();
            const mappedNote = this.keyMap.get(keyChar);

            if (mappedNote && !this.activeKeys.has(keyChar)) {
                this.activeKeys.add(keyChar);
                this.view.activateKey(mappedNote.id);
                this._handleInteract(mappedNote.id);
            }
        });

        window.addEventListener('keyup', (e) => {
            const keyChar = e.key.toLowerCase();
            const mappedNote = this.keyMap.get(keyChar);

            if (mappedNote) {
                this.activeKeys.delete(keyChar);
                this.view.deactivateKey(mappedNote.id);
            }
        });
    }
}
