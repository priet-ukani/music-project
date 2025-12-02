import React, { useEffect, useRef } from 'react';
import { createVisualizer } from '../utils/AudioVisualizer';

interface SpectrumAnalyzerProps {
    analyser: AnalyserNode | null;
    barCount?: number;
    colorScheme?: 'gradient' | 'frequency';
    width?: number;
    height?: number;
    className?: string;
}

const SpectrumAnalyzer: React.FC<SpectrumAnalyzerProps> = ({
    analyser,
    barCount = 64,
    colorScheme = 'frequency',
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
        visualizerRef.current.drawSpectrum(canvasRef.current, barCount, colorScheme);

        return () => {
            visualizerRef.current?.dispose();
        };
    }, [analyser, barCount, colorScheme]);

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

export default SpectrumAnalyzer;
