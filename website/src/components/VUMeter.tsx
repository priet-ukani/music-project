import React, { useEffect, useState, useRef } from 'react';
import { createVisualizer } from '../utils/AudioVisualizer';

interface VUMeterProps {
    analyser: AnalyserNode | null;
    orientation?: 'vertical' | 'horizontal';
    width?: number;
    height?: number;
    className?: string;
}

const VUMeter: React.FC<VUMeterProps> = ({
    analyser,
    orientation = 'vertical',
    width = 20,
    height = 100,
    className = '',
}) => {
    const [level, setLevel] = useState(0);
    const [peak, setPeak] = useState(0);
    const visualizerRef = useRef<ReturnType<typeof createVisualizer> | null>(null);
    const animationRef = useRef<number | null>(null);
    const peakHoldRef = useRef<number>(0);
    const peakDecayRef = useRef<number>(0);

    useEffect(() => {
        if (!analyser) return;

        visualizerRef.current = createVisualizer(analyser);

        const updateMeter = () => {
            if (!visualizerRef.current) return;

            const currentLevel = visualizerRef.current.getPeakLevel();
            setLevel(currentLevel);

            // Peak hold logic
            if (currentLevel > peakHoldRef.current) {
                peakHoldRef.current = currentLevel;
                peakDecayRef.current = 0;
            } else {
                peakDecayRef.current += 1;
                if (peakDecayRef.current > 30) { // Hold for ~0.5s at 60fps
                    peakHoldRef.current = Math.max(0, peakHoldRef.current - 0.01);
                }
            }

            setPeak(peakHoldRef.current);
            animationRef.current = requestAnimationFrame(updateMeter);
        };

        updateMeter();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            visualizerRef.current?.dispose();
        };
    }, [analyser]);

    const getColor = (value: number): string => {
        if (value < 0.6) return '#22c55e'; // Green
        if (value < 0.85) return '#eab308'; // Yellow
        return '#ef4444'; // Red
    };

    const isVertical = orientation === 'vertical';
    const meterStyle = isVertical
        ? { width: `${width}px`, height: `${height}px` }
        : { width: `${height}px`, height: `${width}px` };

    return (
        <div
            className={`relative bg-gray-800 rounded overflow-hidden ${className}`}
            style={meterStyle}
        >
            {/* Level bar */}
            <div
                className="absolute transition-all duration-75 ease-out"
                style={
                    isVertical
                        ? {
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: `${level * 100}%`,
                              backgroundColor: getColor(level),
                          }
                        : {
                              left: 0,
                              top: 0,
                              bottom: 0,
                              width: `${level * 100}%`,
                              backgroundColor: getColor(level),
                          }
                }
            />

            {/* Peak indicator */}
            {peak > 0.1 && (
                <div
                    className="absolute bg-white"
                    style={
                        isVertical
                            ? {
                                  bottom: `${peak * 100}%`,
                                  left: 0,
                                  right: 0,
                                  height: '2px',
                              }
                            : {
                                  left: `${peak * 100}%`,
                                  top: 0,
                                  bottom: 0,
                                  width: '2px',
                              }
                    }
                />
            )}

            {/* Scale markers (vertical only) */}
            {isVertical && (
                <>
                    <div className="absolute left-0 right-0 h-px bg-gray-600" style={{ bottom: '60%' }} />
                    <div className="absolute left-0 right-0 h-px bg-gray-600" style={{ bottom: '85%' }} />
                </>
            )}
        </div>
    );
};

export default VUMeter;
