import React, { useEffect, useRef } from 'react';
import { createVisualizer } from '../utils/AudioVisualizer';

interface WaveformDisplayProps {
    analyser: AnalyserNode | null;
    color?: string;
    backgroundColor?: string;
    width?: number;
    height?: number;
    className?: string;
}

const WaveformDisplay: React.FC<WaveformDisplayProps> = ({
    analyser,
    color = '#f97316',
    backgroundColor = 'transparent',
    width = 400,
    height = 100,
    className = '',
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const visualizerRef = useRef<ReturnType<typeof createVisualizer> | null>(null);

    useEffect(() => {
        if (!analyser || !canvasRef.current) return;

        // Create visualizer
        visualizerRef.current = createVisualizer(analyser);
        visualizerRef.current.drawWaveform(canvasRef.current, color, backgroundColor);

        return () => {
            visualizerRef.current?.dispose();
        };
    }, [analyser, color, backgroundColor]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className={`rounded-lg ${className}`}
            style={{ width: '100%', height: 'auto' }}
        />
    );
};

export default WaveformDisplay;
