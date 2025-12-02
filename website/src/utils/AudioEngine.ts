import { Howler } from 'howler';
import type { EffectSettings } from '../types/music';

/**
 * AudioEngine - Manages Web Audio API for advanced audio processing
 * Provides reverb, delay, EQ, and master controls for the soundscape mixer
 */
export class AudioEngine {
    private audioContext: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private reverbNode: ConvolverNode | null = null;
    private reverbGain: GainNode | null = null;
    private delayNode: DelayNode | null = null;
    private delayFeedback: GainNode | null = null;
    private delayMix: GainNode | null = null;
    private eqLow: BiquadFilterNode | null = null;
    private eqMid: BiquadFilterNode | null = null;
    private eqHigh: BiquadFilterNode | null = null;
    private compressor: DynamicsCompressorNode | null = null;
    private analyser: AnalyserNode | null = null;

    /**
     * Initialize the audio context and create effect nodes
     * Must be called after user interaction (browser requirement)
     */
    async initialize(): Promise<void> {
        if (this.audioContext) return; // Already initialized

        try {
            // Use Howler's existing audio context
            this.audioContext = Howler.ctx;

            if (!this.audioContext) {
                console.warn('Howler context not found, attempting to resume...');
                // Force Howler to initialize context if it hasn't
                new (window as any).Howl({ src: ['data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA'] });
                this.audioContext = Howler.ctx;
            }

            // Create master gain node
            this.masterGain = this.audioContext.createGain();
            this.masterGain.gain.value = 1.0;

            // CRITICAL: Route Howler's master output through our engine
            // Disconnect Howler's master gain from destination
            Howler.masterGain.disconnect();
            // Connect Howler's master gain to our engine's master gain
            Howler.masterGain.connect(this.masterGain);

            // Create analyser for visualizations
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 2048;
            this.analyser.smoothingTimeConstant = 0.8;

            // Create reverb (convolver)
            this.reverbNode = this.audioContext.createConvolver();
            this.reverbGain = this.audioContext.createGain();
            this.reverbGain.gain.value = 0;
            await this.createReverbImpulse(2.0, 0.5); // Default: 2s decay, 0.5 room size

            // Create delay
            this.delayNode = this.audioContext.createDelay(2.0); // Max 2 seconds
            this.delayNode.delayTime.value = 0.5;
            this.delayFeedback = this.audioContext.createGain();
            this.delayFeedback.gain.value = 0.3;
            this.delayMix = this.audioContext.createGain();
            this.delayMix.gain.value = 0;

            // Create 3-band EQ
            this.eqLow = this.audioContext.createBiquadFilter();
            this.eqLow.type = 'lowshelf';
            this.eqLow.frequency.value = 200;
            this.eqLow.gain.value = 0;

            this.eqMid = this.audioContext.createBiquadFilter();
            this.eqMid.type = 'peaking';
            this.eqMid.frequency.value = 1000;
            this.eqMid.Q.value = 1.0;
            this.eqMid.gain.value = 0;

            this.eqHigh = this.audioContext.createBiquadFilter();
            this.eqHigh.type = 'highshelf';
            this.eqHigh.frequency.value = 3000;
            this.eqHigh.gain.value = 0;

            // Create compressor (limiter)
            this.compressor = this.audioContext.createDynamicsCompressor();
            this.compressor.threshold.value = -10;
            this.compressor.knee.value = 10;
            this.compressor.ratio.value = 12;
            this.compressor.attack.value = 0.003;
            this.compressor.release.value = 0.25;

            // Connect the signal chain
            this.connectNodes();

            console.log('AudioEngine initialized successfully');
        } catch (error) {
            console.error('Failed to initialize AudioEngine:', error);
            throw error;
        }
    }

    /**
     * Connect all audio nodes in the proper signal chain
     */
    private connectNodes(): void {
        if (!this.audioContext || !this.masterGain || !this.analyser || !this.compressor) return;

        // Reverb chain: reverbNode -> reverbGain
        this.reverbNode?.connect(this.reverbGain!);

        // Delay chain: delayNode -> delayFeedback -> delayNode (feedback loop)
        //                        -> delayMix
        this.delayNode?.connect(this.delayFeedback!);
        this.delayFeedback?.connect(this.delayNode!);
        this.delayNode?.connect(this.delayMix!);

        // Main chain: masterGain -> EQ -> compressor -> analyser -> destination
        this.masterGain.connect(this.eqLow!);
        this.eqLow!.connect(this.eqMid!);
        this.eqMid!.connect(this.eqHigh!);
        this.eqHigh!.connect(this.compressor);
        this.compressor.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);

        // Effects send: masterGain -> reverb/delay -> compressor
        this.reverbGain!.connect(this.compressor);
        this.delayMix!.connect(this.compressor);
    }

    /**
     * Create an impulse response for the reverb effect
     */
    private async createReverbImpulse(decay: number, roomSize: number): Promise<void> {
        if (!this.audioContext || !this.reverbNode) return;

        const sampleRate = this.audioContext.sampleRate;
        const length = sampleRate * decay;
        const impulse = this.audioContext.createBuffer(2, length, sampleRate);
        const impulseL = impulse.getChannelData(0);
        const impulseR = impulse.getChannelData(1);

        for (let i = 0; i < length; i++) {
            const n = i / length;
            const envelope = Math.pow(1 - n, 3 * roomSize);
            impulseL[i] = (Math.random() * 2 - 1) * envelope;
            impulseR[i] = (Math.random() * 2 - 1) * envelope;
        }

        this.reverbNode.buffer = impulse;
    }



    /**
     * Apply effect settings
     */
    applyEffects(settings: EffectSettings): void {
        if (!this.audioContext) return;

        // Apply reverb
        if (settings.reverb && this.reverbGain) {
            this.reverbGain.gain.setValueAtTime(
                settings.reverb.mix,
                this.audioContext.currentTime
            );
            if (settings.reverb.decay !== undefined || settings.reverb.roomSize !== undefined) {
                this.createReverbImpulse(
                    settings.reverb.decay ?? 2.0,
                    settings.reverb.roomSize ?? 0.5
                );
            }
        }

        // Apply delay
        if (settings.delay && this.delayNode && this.delayFeedback && this.delayMix) {
            this.delayNode.delayTime.setValueAtTime(
                settings.delay.time,
                this.audioContext.currentTime
            );
            this.delayFeedback.gain.setValueAtTime(
                settings.delay.feedback,
                this.audioContext.currentTime
            );
            this.delayMix.gain.setValueAtTime(
                settings.delay.mix,
                this.audioContext.currentTime
            );
        }

        // Apply EQ
        if (settings.eq) {
            if (this.eqLow) {
                this.eqLow.gain.setValueAtTime(
                    settings.eq.low,
                    this.audioContext.currentTime
                );
            }
            if (this.eqMid) {
                this.eqMid.gain.setValueAtTime(
                    settings.eq.mid,
                    this.audioContext.currentTime
                );
            }
            if (this.eqHigh) {
                this.eqHigh.gain.setValueAtTime(
                    settings.eq.high,
                    this.audioContext.currentTime
                );
            }
        }
    }

    /**
     * Set master volume
     */
    setMasterVolume(volume: number): void {
        if (!this.audioContext || !this.masterGain) return;
        this.masterGain.gain.setValueAtTime(
            Math.max(0, Math.min(1, volume)),
            this.audioContext.currentTime
        );
    }

    /**
     * Set reverb send amount
     */
    setReverbSend(amount: number): void {
        if (!this.audioContext || !this.reverbGain) return;
        this.reverbGain.gain.setValueAtTime(
            Math.max(0, Math.min(1, amount)),
            this.audioContext.currentTime
        );
    }

    /**
     * Set delay send amount
     */
    setDelaySend(amount: number): void {
        if (!this.audioContext || !this.delayMix) return;
        this.delayMix.gain.setValueAtTime(
            Math.max(0, Math.min(1, amount)),
            this.audioContext.currentTime
        );
    }

    /**
     * Enable/disable compressor (limiter)
     */
    setLimiter(enabled: boolean): void {
        if (!this.compressor || !this.audioContext) return;

        if (enabled) {
            this.compressor.threshold.value = -10;
            this.compressor.ratio.value = 12;
        } else {
            this.compressor.threshold.value = 0;
            this.compressor.ratio.value = 1;
        }
    }

    /**
     * Get analyser node for visualizations
     */
    getAnalyser(): AnalyserNode | null {
        return this.analyser;
    }

    /**
     * Get audio context
     */
    getContext(): AudioContext | null {
        return this.audioContext;
    }

    /**
     * Resume audio context (required after user interaction)
     */
    async resume(): Promise<void> {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }
    }

    /**
     * Cleanup and dispose of all audio nodes
     */
    dispose(): void {
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
        this.masterGain = null;
        this.reverbNode = null;
        this.reverbGain = null;
        this.delayNode = null;
        this.delayFeedback = null;
        this.delayMix = null;
        this.eqLow = null;
        this.eqMid = null;
        this.eqHigh = null;
        this.compressor = null;
        this.analyser = null;
    }
}

// Singleton instance
let audioEngineInstance: AudioEngine | null = null;

/**
 * Get the singleton AudioEngine instance
 */
export function getAudioEngine(): AudioEngine {
    if (!audioEngineInstance) {
        audioEngineInstance = new AudioEngine();
    }
    return audioEngineInstance;
}
