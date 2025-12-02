import React from 'react';
import { Sliders, RotateCcw } from 'lucide-react';
import type { EffectSettings } from '../types/music';

interface EffectsPanelProps {
    effects: EffectSettings;
    onEffectsChange: (effects: EffectSettings) => void;
    onReset: () => void;
    className?: string;
}

const EffectsPanel: React.FC<EffectsPanelProps> = ({
    effects,
    onEffectsChange,
    onReset,
    className = '',
}) => {
    const handleReverbChange = (param: 'roomSize' | 'decay' | 'mix', value: number) => {
        onEffectsChange({
            ...effects,
            reverb: {
                roomSize: effects.reverb?.roomSize ?? 0.5,
                decay: effects.reverb?.decay ?? 2.0,
                mix: effects.reverb?.mix ?? 0,
                [param]: value,
            },
        });
    };

    const handleDelayChange = (param: 'time' | 'feedback' | 'mix', value: number) => {
        onEffectsChange({
            ...effects,
            delay: {
                time: effects.delay?.time ?? 0.5,
                feedback: effects.delay?.feedback ?? 0.3,
                mix: effects.delay?.mix ?? 0,
                [param]: value,
            },
        });
    };

    const handleEQChange = (band: 'low' | 'mid' | 'high', value: number) => {
        onEffectsChange({
            ...effects,
            eq: {
                low: effects.eq?.low ?? 0,
                mid: effects.eq?.mid ?? 0,
                high: effects.eq?.high ?? 0,
                [band]: value,
            },
        });
    };

    return (
        <div className={`bg-gray-50 rounded-lg p-4 space-y-4 ${className}`}>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-gray-700" />
                    <h3 className="font-semibold text-gray-800">Audio Effects</h3>
                </div>
                <button
                    onClick={onReset}
                    className="text-gray-600 hover:text-gray-800 p-1.5 rounded hover:bg-gray-200 transition-colors"
                    title="Reset all effects"
                >
                    <RotateCcw className="w-4 h-4" />
                </button>
            </div>

            {/* Reverb Section */}
            <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Reverb</h4>
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="text-xs text-gray-600">Room Size</label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={effects.reverb?.roomSize ?? 0.5}
                            onChange={(e) => handleReverbChange('roomSize', parseFloat(e.target.value))}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-300"
                        />
                        <div className="text-xs text-gray-500 text-center">
                            {((effects.reverb?.roomSize ?? 0.5) * 100).toFixed(0)}%
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-gray-600">Decay</label>
                        <input
                            type="range"
                            min="0.1"
                            max="10"
                            step="0.1"
                            value={effects.reverb?.decay ?? 2.0}
                            onChange={(e) => handleReverbChange('decay', parseFloat(e.target.value))}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-300"
                        />
                        <div className="text-xs text-gray-500 text-center">
                            {(effects.reverb?.decay ?? 2.0).toFixed(1)}s
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-gray-600">Mix</label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={effects.reverb?.mix ?? 0}
                            onChange={(e) => handleReverbChange('mix', parseFloat(e.target.value))}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-orange-300"
                        />
                        <div className="text-xs text-gray-500 text-center">
                            {((effects.reverb?.mix ?? 0) * 100).toFixed(0)}%
                        </div>
                    </div>
                </div>
            </div>

            {/* Delay Section */}
            <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Delay</h4>
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="text-xs text-gray-600">Time</label>
                        <input
                            type="range"
                            min="0"
                            max="2"
                            step="0.01"
                            value={effects.delay?.time ?? 0.5}
                            onChange={(e) => handleDelayChange('time', parseFloat(e.target.value))}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-300"
                        />
                        <div className="text-xs text-gray-500 text-center">
                            {((effects.delay?.time ?? 0.5) * 1000).toFixed(0)}ms
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-gray-600">Feedback</label>
                        <input
                            type="range"
                            min="0"
                            max="0.9"
                            step="0.01"
                            value={effects.delay?.feedback ?? 0.3}
                            onChange={(e) => handleDelayChange('feedback', parseFloat(e.target.value))}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-300"
                        />
                        <div className="text-xs text-gray-500 text-center">
                            {((effects.delay?.feedback ?? 0.3) * 100).toFixed(0)}%
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-gray-600">Mix</label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={effects.delay?.mix ?? 0}
                            onChange={(e) => handleDelayChange('mix', parseFloat(e.target.value))}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-orange-300"
                        />
                        <div className="text-xs text-gray-500 text-center">
                            {((effects.delay?.mix ?? 0) * 100).toFixed(0)}%
                        </div>
                    </div>
                </div>
            </div>

            {/* EQ Section */}
            <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Equalizer</h4>
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="text-xs text-gray-600">Low (200Hz)</label>
                        <input
                            type="range"
                            min="-12"
                            max="12"
                            step="0.5"
                            value={effects.eq?.low ?? 0}
                            onChange={(e) => handleEQChange('low', parseFloat(e.target.value))}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-red-300"
                        />
                        <div className="text-xs text-gray-500 text-center">
                            {(effects.eq?.low ?? 0) > 0 ? '+' : ''}
                            {(effects.eq?.low ?? 0).toFixed(1)} dB
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-gray-600">Mid (1kHz)</label>
                        <input
                            type="range"
                            min="-12"
                            max="12"
                            step="0.5"
                            value={effects.eq?.mid ?? 0}
                            onChange={(e) => handleEQChange('mid', parseFloat(e.target.value))}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-green-300"
                        />
                        <div className="text-xs text-gray-500 text-center">
                            {(effects.eq?.mid ?? 0) > 0 ? '+' : ''}
                            {(effects.eq?.mid ?? 0).toFixed(1)} dB
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-gray-600">High (3kHz)</label>
                        <input
                            type="range"
                            min="-12"
                            max="12"
                            step="0.5"
                            value={effects.eq?.high ?? 0}
                            onChange={(e) => handleEQChange('high', parseFloat(e.target.value))}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-300"
                        />
                        <div className="text-xs text-gray-500 text-center">
                            {(effects.eq?.high ?? 0) > 0 ? '+' : ''}
                            {(effects.eq?.high ?? 0).toFixed(1)} dB
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EffectsPanel;
