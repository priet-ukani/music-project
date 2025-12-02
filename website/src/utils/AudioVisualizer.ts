/**
 * AudioVisualizer - Handles real-time audio visualization
 * Provides waveform and frequency spectrum analysis
 */
export class AudioVisualizer {
    private analyser: AnalyserNode;
    private dataArray: Uint8Array;
    private bufferLength: number;
    private animationId: number | null = null;

    constructor(analyser: AnalyserNode) {
        this.analyser = analyser;
        this.bufferLength = analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
    }

    /**
     * Draw waveform visualization on canvas
     */
    drawWaveform(
        canvas: HTMLCanvasElement,
        color: string = '#f97316',
        backgroundColor: string = 'transparent'
    ): void {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const draw = () => {
            this.animationId = requestAnimationFrame(draw);

            this.analyser.getByteTimeDomainData(this.dataArray as Uint8Array<ArrayBuffer>);

            // Clear canvas
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw waveform
            ctx.lineWidth = 2;
            ctx.strokeStyle = color;
            ctx.beginPath();

            const sliceWidth = canvas.width / this.bufferLength;
            let x = 0;

            for (let i = 0; i < this.bufferLength; i++) {
                const v = this.dataArray[i] / 128.0;
                const y = (v * canvas.height) / 2;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            ctx.lineTo(canvas.width, canvas.height / 2);
            ctx.stroke();
        };

        draw();
    }

    /**
     * Draw frequency spectrum visualization on canvas
     */
    drawSpectrum(
        canvas: HTMLCanvasElement,
        barCount: number = 64,
        colorScheme: 'gradient' | 'frequency' = 'frequency'
    ): void {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const draw = () => {
            this.animationId = requestAnimationFrame(draw);

            this.analyser.getByteFrequencyData(this.dataArray as Uint8Array<ArrayBuffer>);

            // Clear canvas
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const barWidth = canvas.width / barCount;
            const binSize = Math.floor(this.bufferLength / barCount);

            for (let i = 0; i < barCount; i++) {
                // Average frequency data for this bar
                let sum = 0;
                for (let j = 0; j < binSize; j++) {
                    sum += this.dataArray[i * binSize + j];
                }
                const barHeight = (sum / binSize / 255) * canvas.height;

                // Color based on frequency range
                if (colorScheme === 'frequency') {
                    if (i < barCount / 3) {
                        // Bass - Red
                        ctx.fillStyle = `rgba(239, 68, 68, ${0.6 + barHeight / canvas.height * 0.4})`;
                    } else if (i < (barCount * 2) / 3) {
                        // Mid - Green
                        ctx.fillStyle = `rgba(34, 197, 94, ${0.6 + barHeight / canvas.height * 0.4})`;
                    } else {
                        // Treble - Blue
                        ctx.fillStyle = `rgba(59, 130, 246, ${0.6 + barHeight / canvas.height * 0.4})`;
                    }
                } else {
                    // Gradient
                    const hue = (i / barCount) * 360;
                    ctx.fillStyle = `hsla(${hue}, 80%, 60%, ${0.6 + barHeight / canvas.height * 0.4})`;
                }

                ctx.fillRect(
                    i * barWidth,
                    canvas.height - barHeight,
                    barWidth - 1,
                    barHeight
                );
            }
        };

        draw();
    }

    /**
     * Get current volume level (0-1)
     */
    getVolumeLevel(): number {
        this.analyser.getByteTimeDomainData(this.dataArray as Uint8Array<ArrayBuffer>);

        let sum = 0;
        for (let i = 0; i < this.bufferLength; i++) {
            const normalized = (this.dataArray[i] - 128) / 128;
            sum += normalized * normalized;
        }

        const rms = Math.sqrt(sum / this.bufferLength);
        return Math.min(1, rms * 2); // Scale to 0-1 range
    }

    /**
     * Get peak frequency data for VU meter
     */
    getPeakLevel(): number {
        this.analyser.getByteFrequencyData(this.dataArray as Uint8Array<ArrayBuffer>);

        let max = 0;
        for (let i = 0; i < this.bufferLength; i++) {
            if (this.dataArray[i] > max) {
                max = this.dataArray[i];
            }
        }

        return max / 255; // Normalize to 0-1
    }

    /**
     * Stop visualization animation
     */
    stop(): void {
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    /**
     * Cleanup
     */
    dispose(): void {
        this.stop();
    }
}

/**
 * Create a visualizer from an AnalyserNode
 */
export function createVisualizer(analyser: AnalyserNode): AudioVisualizer {
    return new AudioVisualizer(analyser);
}
