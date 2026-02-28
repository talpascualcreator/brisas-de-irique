/**
 * Audio Engine for Lyre, Tambora and Maracas synthesis
 * Uses Web Audio API to generate tones mathematically.
 */
export class AudioEngine {
    constructor() {
        this.audioCtx = null;
        this.masterGain = null;
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();

        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.value = 0.6;
        this.masterGain.connect(this.audioCtx.destination);

        this.initialized = true;
    }

    playTone(frequency) {
        if (!this.initialized) this.init();
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

        const time = this.audioCtx.currentTime;

        const osc = this.audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, time);

        const attackOsc = this.audioCtx.createOscillator();
        attackOsc.type = 'triangle';
        attackOsc.frequency.setValueAtTime(frequency * 2.5, time);

        const gainNode = this.audioCtx.createGain();
        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(1, time + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 2);

        const attackGain = this.audioCtx.createGain();
        attackGain.gain.setValueAtTime(0, time);
        attackGain.gain.linearRampToValueAtTime(0.3, time + 0.005);
        attackGain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);

        osc.connect(gainNode);
        attackOsc.connect(attackGain);

        gainNode.connect(this.masterGain);
        attackGain.connect(this.masterGain);

        osc.start(time);
        attackOsc.start(time);
        osc.stop(time + 2);
        attackOsc.stop(time + 0.1);
    }

    playKick(frequency = 60) {
        if (!this.initialized) this.init();
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();
        const time = this.audioCtx.currentTime;

        const osc = this.audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency * 2.5, time);
        osc.frequency.exponentialRampToValueAtTime(frequency, time + 0.1);

        const gainNode = this.audioCtx.createGain();
        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(1, time + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

        const filter = this.audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 400;

        osc.connect(gainNode);
        gainNode.connect(filter);
        filter.connect(this.masterGain);

        osc.start(time);
        osc.stop(time + 0.5);
    }

    playRimShot() {
        if (!this.initialized) this.init();
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();
        const time = this.audioCtx.currentTime;

        const osc = this.audioCtx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, time);

        const gainNode = this.audioCtx.createGain();
        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(0.7, time + 0.005);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

        osc.connect(gainNode);
        gainNode.connect(this.masterGain);

        osc.start(time);
        osc.stop(time + 0.05);
    }

    playMaracaShake() {
        if (!this.initialized) this.init();
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();
        const bufferSize = this.audioCtx.sampleRate * 0.1;
        const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.audioCtx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 5000;
        filter.Q.value = 2;

        const time = this.audioCtx.currentTime;

        const gainNode = this.audioCtx.createGain();
        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(1, time + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.masterGain);

        noise.start(time);
    }

    static midiToFreq(midiNote) {
        return 440 * Math.pow(2, (midiNote - 69) / 12);
    }
}
