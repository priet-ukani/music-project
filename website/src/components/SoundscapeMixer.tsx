import React, { useState, useRef, useEffect } from 'react';
import { Howl } from 'howler';
import { Play, Pause, Volume2, Download, Share2, RotateCcw, Save, Layers, X, Sliders, Wind } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { InstrumentTrack, AmbientTrack, EffectSettings, SoundscapePreset } from '../types/music';
import { getAudioEngine } from '../utils/AudioEngine';
import SpectrumAnalyzer from './SpectrumAnalyzer';
import VUMeter from './VUMeter';
import EffectsPanel from './EffectsPanel';

interface SoundscapeMixerProps {
    regionId: string;
    regionName: string;
    regionColor: string;
    initialTracks?: InstrumentTrack[];
    onClose: () => void;
}

// Enhanced preset templates with effects
const PRESETS: Record<string, SoundscapePreset[]> = {
    rajasthan: [
        {
            name: 'Desert Evening',
            description: 'Traditional Manganiyar ensemble sound',
            category: 'traditional',
            tracks: [
                { id: 'raj_kamaycha', volume: 0.8 },
                { id: 'raj_maand', volume: 0.6 },
            ],
            ambientTracks: [{ id: 'desert_wind', volume: 0.3 }],
            effects: {
                reverb: { roomSize: 0.7, decay: 3.0, mix: 0.3 },
                eq: { low: 2, mid: 0, high: -1 },
            },
        },
        {
            name: 'Folk Festival',
            description: 'Energetic folk celebration',
            category: 'energetic',
            tracks: [
                { id: 'raj_kamaycha', volume: 0.7 },
                { id: 'raj_maand', volume: 0.8 },
                { id: 'raj_sufi', volume: 0.5 },
            ],
            effects: {
                delay: { time: 0.375, feedback: 0.2, mix: 0.15 },
                eq: { low: 3, mid: 1, high: 2 },
            },
        },
    ],
    bengal: [
        {
            name: 'Baul Wanderer',
            description: 'Mystical Baul singer setup',
            category: 'meditative',
            tracks: [
                { id: 'ben_baul', volume: 0.8 },
                { id: 'ben_tagore', volume: 0.4 },
            ],
            ambientTracks: [{ id: 'river_flowing', volume: 0.25 }],
            effects: {
                reverb: { roomSize: 0.6, decay: 4.0, mix: 0.4 },
                eq: { low: 0, mid: -1, high: 1 },
            },
        },
    ],
    tamilnadu: [
        {
            name: 'Temple Concert',
            description: 'Classical Carnatic performance',
            category: 'traditional',
            tracks: [
                { id: 'tn_kriti', volume: 0.8 },
                { id: 'tn_nadaswaram', volume: 0.6 },
            ],
            ambientTracks: [{ id: 'temple_bells', volume: 0.2 }],
            effects: {
                reverb: { roomSize: 0.8, decay: 5.0, mix: 0.35 },
                eq: { low: -2, mid: 1, high: 3 },
            },
        },
    ],
    punjab: [
        {
            name: 'Bhangra Celebration',
            description: 'High-energy harvest festival',
            category: 'energetic',
            tracks: [
                { id: 'pun_bhangra', volume: 0.9 },
                { id: 'pun_tumbi', volume: 0.7 },
                { id: 'pun_apna', volume: 0.5 },
            ],
            effects: {
                eq: { low: 4, mid: 0, high: 2 },
            },
        },
    ],
    kerala: [
        {
            name: 'Temple Procession',
            description: 'Massive percussion ensemble',
            category: 'traditional',
            tracks: [
                { id: 'ker_panchavadyam', volume: 0.8 },
                { id: 'ker_sopanam', volume: 0.5 },
            ],
            ambientTracks: [{ id: 'temple_courtyard', volume: 0.3 }],
            effects: {
                reverb: { roomSize: 0.9, decay: 6.0, mix: 0.4 },
                eq: { low: 3, mid: -1, high: 0 },
            },
        },
    ],
    telangana: [
        {
            name: 'Perini Dance',
            description: 'Martial dance with vigorous drums',
            category: 'energetic',
            tracks: [
                { id: 'tel_perini', volume: 0.85 },
                { id: 'tel_oggu', volume: 0.6 },
                { id: 'tel_venkanna', volume: 0.5 },
            ],
            effects: {
                delay: { time: 0.5, feedback: 0.25, mix: 0.1 },
                eq: { low: 5, mid: 0, high: 1 },
            },
        },
    ],
};

// Ambient soundscape library
const AMBIENT_LIBRARY: AmbientTrack[] = [
    { id: 'desert_wind', name: 'Desert Wind', audioUrl: '/audio/ambient/desert_wind.wav', volume: 0.3, isMuted: true, isLoaded: false, category: 'nature', icon: 'Wind', color: '#d97706' },
    { id: 'monsoon_rain', name: 'Monsoon Rain', audioUrl: '/audio/ambient/monsoon_rain.wav', volume: 0.3, isMuted: true, isLoaded: false, category: 'nature', icon: 'CloudRain', color: '#0891b2' },
    { id: 'temple_bells', name: 'Temple Bells', audioUrl: '/audio/ambient/temple_bells.wav', volume: 0.2, isMuted: true, isLoaded: false, category: 'temple', icon: 'Bell', color: '#ea580c' },
    { id: 'river_flowing', name: 'River Flowing', audioUrl: '/audio/ambient/river_flowing.wav', volume: 0.25, isMuted: true, isLoaded: false, category: 'nature', icon: 'Waves', color: '#06b6d4' },
    { id: 'temple_courtyard', name: 'Temple Courtyard', audioUrl: '/audio/ambient/temple_courtyard.wav', volume: 0.3, isMuted: true, isLoaded: false, category: 'temple', icon: 'Building', color: '#c2410c' },
    { id: 'village_ambience', name: 'Village Ambience', audioUrl: '/audio/ambient/village_ambience.wav', volume: 0.25, isMuted: true, isLoaded: false, category: 'urban', icon: 'Home', color: '#65a30d' },
];

const SoundscapeMixer: React.FC<SoundscapeMixerProps> = ({ regionId, regionName, regionColor, initialTracks = [], onClose }) => {
    const [tracks, setTracks] = useState<InstrumentTrack[]>(
        initialTracks.map(t => ({ ...t, pan: 0, reverbSend: 0, delaySend: 0, solo: false }))
    );
    const [ambientTracks, setAmbientTracks] = useState<AmbientTrack[]>(AMBIENT_LIBRARY);
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
    const [mixName, setMixName] = useState(`${regionName} Mix`);
    const [showEffects, setShowEffects] = useState(false);
    const [showAmbient, setShowAmbient] = useState(false);
    const [masterVolume, setMasterVolume] = useState(1.0);
    const [effects, setEffects] = useState<EffectSettings>({
        reverb: { roomSize: 0.5, decay: 2.0, mix: 0 },
        delay: { time: 0.5, feedback: 0.3, mix: 0 },
        eq: { low: 0, mid: 0, high: 0 },
    });
    
    const howlInstancesRef = useRef<Map<string, Howl>>(new Map());
    const audioEngineRef = useRef(getAudioEngine());
    const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
    const [audioInitialized, setAudioInitialized] = useState(false);

    // Initialize audio engine
    const initializeAudio = async () => {
        if (audioInitialized) return;
        
        try {
            await audioEngineRef.current.initialize();
            const analyserNode = audioEngineRef.current.getAnalyser();
            setAnalyser(analyserNode);
            setAudioInitialized(true);
            console.log('Audio engine initialized');
        } catch (error) {
            console.error('Failed to initialize audio:', error);
        }
    };

    // Initialize Howl instances for instrument tracks
    useEffect(() => {
        // Use a local reference to the current tracks to avoid dependency issues
        // We only want to initialize audio once on mount
        tracks.forEach((track) => {
            if (!howlInstancesRef.current.has(track.id)) {
                console.log(`Creating Howl instance for: ${track.name}`, track.audioUrl);
                const howl = new Howl({
                    src: [track.audioUrl],
                    loop: true,
                    volume: track.volume,
                    onload: () => {
                        console.log(`✅ Loaded: ${track.name}`);
                        setTracks((prev) =>
                            prev.map((t) => (t.id === track.id ? { ...t, isLoaded: true } : t))
                        );
                    },
                    onloaderror: (_id, error) => {
                        // Ignore decoding errors which are common when unloading quickly (React Strict Mode)
                        if (typeof error === 'string' && error.includes('Decoding audio data failed')) {
                            return;
                        }
                        console.warn(`⚠️ Warning loading ${track.name}:`, error);
                    },
                    onplay: () => {
                        console.log(`▶️ Playing: ${track.name}`);
                    },
                    onpause: () => {
                        console.log(`⏸️ Paused: ${track.name}`);
                    },
                });
                howlInstancesRef.current.set(track.id, howl);
            }
        });

        return () => {
            // Cleanup on unmount
            howlInstancesRef.current.forEach((howl) => {
                howl.stop();
                howl.unload();
            });
            howlInstancesRef.current.clear();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Initialize Howl instances for ambient tracks
    useEffect(() => {
        ambientTracks.forEach((track) => {
            const ambientId = `ambient_${track.id}`;
            if (!howlInstancesRef.current.has(ambientId)) {
                console.log(`Creating ambient Howl instance for: ${track.name}`, track.audioUrl);
                const howl = new Howl({
                    src: [track.audioUrl],
                    loop: true,
                    volume: track.volume,
                    onload: () => {
                        console.log(`✅ Loaded ambient: ${track.name}`);
                        setAmbientTracks((prev) =>
                            prev.map((t) => (t.id === track.id ? { ...t, isLoaded: true } : t))
                        );
                    },
                    onloaderror: (_id, error) => {
                        // Ignore decoding errors which are common when unloading quickly (React Strict Mode)
                        if (typeof error === 'string' && error.includes('Decoding audio data failed')) {
                            return;
                        }
                        console.warn(`⚠️ Warning loading ambient ${track.name}:`, error);
                    },
                });
                howlInstancesRef.current.set(ambientId, howl);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Apply effects when changed
    useEffect(() => {
        if (audioInitialized) {
            audioEngineRef.current.applyEffects(effects);
        }
    }, [effects, audioInitialized]);

    // Apply master volume
    useEffect(() => {
        if (audioInitialized) {
            audioEngineRef.current.setMasterVolume(masterVolume);
        }
    }, [masterVolume, audioInitialized]);

    const handlePlayPause = async () => {
        console.log('🎵 Play/Pause button clicked');
        console.log('Audio initialized:', audioInitialized);
        console.log('Currently playing:', isPlaying);
        
        if (!audioInitialized) {
            console.log('Initializing audio engine...');
            await initializeAudio();
        }

        if (isPlaying) {
            // Stop all tracks
            console.log('Pausing all tracks...');
            howlInstancesRef.current.forEach((howl, id) => {
                console.log(`Pausing: ${id}`);
                howl.pause();
            });
            setIsPlaying(false);
        } else {
            // Resume audio context if needed
            console.log('Resuming audio context...');
            await audioEngineRef.current.resume();
            
            // Check if any tracks are soloed
            const soloedTracks = tracks.filter(t => t.solo);
            const hasSolo = soloedTracks.length > 0;
            console.log('Solo tracks:', soloedTracks.length, 'Has solo:', hasSolo);

            // Play instrument tracks
            console.log('Playing instrument tracks...');
            let playedCount = 0;
            tracks.forEach((track) => {
                const shouldPlay = hasSolo ? track.solo : !track.isMuted;
                console.log(`Track ${track.name}: shouldPlay=${shouldPlay}, muted=${track.isMuted}, solo=${track.solo}`);
                if (shouldPlay) {
                    const howl = howlInstancesRef.current.get(track.id);
                    if (howl) {
                        console.log(`▶️ Playing: ${track.name}`);
                        howl.play();
                        playedCount++;
                    } else {
                        console.error(`❌ No Howl instance found for: ${track.name}`);
                    }
                }
            });
            console.log(`Played ${playedCount} instrument tracks`);

            // Play ambient tracks
            console.log('Playing ambient tracks...');
            let ambientPlayedCount = 0;
            ambientTracks.forEach((track) => {
                if (!track.isMuted) {
                    const howl = howlInstancesRef.current.get(`ambient_${track.id}`);
                    if (howl) {
                        console.log(`▶️ Playing ambient: ${track.name}`);
                        howl.play();
                        ambientPlayedCount++;
                    }
                }
            });
            console.log(`Played ${ambientPlayedCount} ambient tracks`);

            setIsPlaying(true);
            console.log('✅ Playback started');
        }
    };

    const handleVolumeChange = (trackId: string, newVolume: number) => {
        setTracks((prev) =>
            prev.map((t) => (t.id === trackId ? { ...t, volume: newVolume } : t))
        );
        const howl = howlInstancesRef.current.get(trackId);
        howl?.volume(newVolume);
    };

    const handlePanChange = (trackId: string, newPan: number) => {
        setTracks((prev) =>
            prev.map((t) => (t.id === trackId ? { ...t, pan: newPan } : t))
        );
        const howl = howlInstancesRef.current.get(trackId);
        howl?.stereo(newPan);
    };

    const handleAmbientVolumeChange = (trackId: string, newVolume: number) => {
        setAmbientTracks((prev) =>
            prev.map((t) => (t.id === trackId ? { ...t, volume: newVolume } : t))
        );
        const howl = howlInstancesRef.current.get(`ambient_${trackId}`);
        howl?.volume(newVolume);
    };

    const handleToggleMute = (trackId: string) => {
        setTracks((prev) =>
            prev.map((t) => {
                if (t.id === trackId) {
                    const newMuted = !t.isMuted;
                    const howl = howlInstancesRef.current.get(trackId);
                    if (newMuted) {
                        howl?.pause();
                    } else if (isPlaying && !tracks.some(track => track.solo && track.id !== trackId)) {
                        howl?.play();
                    }
                    return { ...t, isMuted: newMuted };
                }
                return t;
            })
        );
    };

    const handleToggleAmbientMute = (trackId: string) => {
        setAmbientTracks((prev) =>
            prev.map((t) => {
                if (t.id === trackId) {
                    const newMuted = !t.isMuted;
                    const howl = howlInstancesRef.current.get(`ambient_${trackId}`);
                    if (newMuted) {
                        howl?.pause();
                    } else if (isPlaying) {
                        howl?.play();
                    }
                    return { ...t, isMuted: newMuted };
                }
                return t;
            })
        );
    };

    const handleToggleSolo = (trackId: string) => {
        setTracks((prev) => {
            const newTracks = prev.map((t) => ({
                ...t,
                solo: t.id === trackId ? !t.solo : t.solo,
            }));

            // Update playback state if playing
            if (isPlaying) {
                const soloedTracks = newTracks.filter(t => t.solo);
                const hasSolo = soloedTracks.length > 0;

                newTracks.forEach((track) => {
                    const howl = howlInstancesRef.current.get(track.id);
                    const shouldPlay = hasSolo ? track.solo : !track.isMuted;
                    
                    if (shouldPlay && !howl?.playing()) {
                        howl?.play();
                    } else if (!shouldPlay && howl?.playing()) {
                        howl?.pause();
                    }
                });
            }

            return newTracks;
        });
    };

    const handleReset = () => {
        howlInstancesRef.current.forEach((howl) => howl.stop());
        setIsPlaying(false);
        setTracks(initialTracks.map(t => ({ ...t, pan: 0, reverbSend: 0, delaySend: 0, solo: false })));
        setAmbientTracks(AMBIENT_LIBRARY);
        setSelectedPreset(null);
        setEffects({
            reverb: { roomSize: 0.5, decay: 2.0, mix: 0 },
            delay: { time: 0.5, feedback: 0.3, mix: 0 },
            eq: { low: 0, mid: 0, high: 0 },
        });
        setMasterVolume(1.0);
    };

    const handleLoadPreset = (preset: SoundscapePreset) => {
        setSelectedPreset(preset.name);
        setMixName(preset.name);

        // Update track volumes
        setTracks((prev) =>
            prev.map((track) => {
                const presetTrack = preset.tracks.find((pt) => pt.id === track.id);
                if (presetTrack) {
                    const howl = howlInstancesRef.current.get(track.id);
                    howl?.volume(presetTrack.volume);
                    return { ...track, volume: presetTrack.volume, isMuted: false, pan: presetTrack.pan ?? 0 };
                }
                return { ...track, isMuted: true };
            })
        );

        // Update ambient tracks
        if (preset.ambientTracks) {
            setAmbientTracks((prev) =>
                prev.map((track) => {
                    const presetAmbient = preset.ambientTracks?.find((pt) => pt.id === track.id);
                    if (presetAmbient) {
                        const howl = howlInstancesRef.current.get(`ambient_${track.id}`);
                        howl?.volume(presetAmbient.volume);
                        return { ...track, volume: presetAmbient.volume, isMuted: false };
                    }
                    return { ...track, isMuted: true };
                })
            );
        }

        // Apply effects
        if (preset.effects) {
            setEffects(preset.effects);
        }
    };

    const handleSaveMix = () => {
        const mixData = {
            name: mixName,
            region: regionId,
            tracks: tracks
                .filter((t) => !t.isMuted)
                .map((t) => ({ id: t.id, name: t.name, volume: t.volume, pan: t.pan })),
            ambientTracks: ambientTracks
                .filter((t) => !t.isMuted)
                .map((t) => ({ id: t.id, name: t.name, volume: t.volume })),
            effects,
            timestamp: new Date().toISOString(),
        };

        // Save to localStorage
        const savedMixes = JSON.parse(localStorage.getItem('soundscapeMixes') || '[]');
        savedMixes.push(mixData);
        localStorage.setItem('soundscapeMixes', JSON.stringify(savedMixes));

        alert(`✅ Mix "${mixName}" saved successfully!`);
    };

    const handleExport = () => {
        const mixData = {
            name: mixName,
            region: regionName,
            tracks: tracks
                .filter((t) => !t.isMuted)
                .map((t) => ({ name: t.name, volume: Math.round(t.volume * 100) + '%', pan: t.pan })),
            ambientTracks: ambientTracks
                .filter((t) => !t.isMuted)
                .map((t) => ({ name: t.name, volume: Math.round(t.volume * 100) + '%' })),
            effects,
        };

        const dataStr = JSON.stringify(mixData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${mixName.replace(/\s+/g, '_').toLowerCase()}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleShare = () => {
        const activeTracks = tracks.filter((t) => !t.isMuted);
        const activeAmbient = ambientTracks.filter((t) => !t.isMuted);
        
        const shareText = `🎵 Check out my ${regionName} soundscape mix: ${mixName}\n\nInstruments:\n${activeTracks
            .map((t) => `• ${t.name} (${Math.round(t.volume * 100)}%)`)
            .join('\n')}${activeAmbient.length > 0 ? '\n\nAmbient:\n' + activeAmbient.map((t) => `• ${t.name} (${Math.round(t.volume * 100)}%)`).join('\n') : ''}`;

        if (navigator.share) {
            navigator.share({
                title: mixName,
                text: shareText,
            });
        } else {
            navigator.clipboard.writeText(shareText);
            alert('✅ Mix details copied to clipboard!');
        }
    };

    const categoryColors = {
        string: 'bg-amber-100 text-amber-800 border-amber-300',
        percussion: 'bg-red-100 text-red-800 border-red-300',
        wind: 'bg-green-100 text-green-800 border-green-300',
        unique: 'bg-purple-100 text-purple-800 border-purple-300',
    };

    const presets = PRESETS[regionId] || [];

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div
                        className="p-6 text-white relative"
                        style={{ backgroundColor: regionColor }}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <Layers className="w-8 h-8" />
                                    <div>
                                        <h2 className="text-2xl font-bold">Soundscape Mixer</h2>
                                        <p className="text-white/90 text-sm">{regionName} Traditional Instruments</p>
                                    </div>
                                </div>

                                <input
                                    type="text"
                                    value={mixName}
                                    onChange={(e) => setMixName(e.target.value)}
                                    className="mt-3 w-full max-w-md bg-white/20 text-white placeholder-white/60 px-4 py-2 rounded-lg border border-white/30 focus:outline-none focus:border-white/50"
                                    placeholder="Name your mix..."
                                />
                            </div>

                            {/* Master Visualizations */}
                            <div className="flex flex-col gap-2 items-end">
                                <div className="bg-black/20 rounded-lg p-2">
                                    <SpectrumAnalyzer
                                        analyser={analyser}
                                        width={200}
                                        height={60}
                                        barCount={32}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-white/80">Master</span>
                                    <VUMeter analyser={analyser} width={8} height={60} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {/* Master Controls */}
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex-1">
                                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                        Master Volume
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={masterVolume}
                                        onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
                                        className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                                        style={{
                                            background: `linear-gradient(to right, ${regionColor} 0%, ${regionColor} ${masterVolume * 100}%, #e5e7eb ${masterVolume * 100}%, #e5e7eb 100%)`,
                                        }}
                                    />
                                    <div className="text-sm text-gray-600 text-center mt-1">
                                        {Math.round(masterVolume * 100)}%
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowEffects(!showEffects)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                                        showEffects
                                            ? 'bg-orange-500 text-white shadow-md'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    <Sliders className="w-4 h-4" />
                                    Effects
                                </button>
                            </div>
                        </div>

                        {/* Effects Panel */}
                        {showEffects && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <EffectsPanel
                                    effects={effects}
                                    onEffectsChange={setEffects}
                                    onReset={() => setEffects({
                                        reverb: { roomSize: 0.5, decay: 2.0, mix: 0 },
                                        delay: { time: 0.5, feedback: 0.3, mix: 0 },
                                        eq: { low: 0, mid: 0, high: 0 },
                                    })}
                                />
                            </motion.div>
                        )}

                        {/* Presets */}
                        {presets.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Preset Templates</h3>
                                <div className="flex flex-wrap gap-2">
                                    {presets.map((preset) => (
                                        <button
                                            key={preset.name}
                                            onClick={() => handleLoadPreset(preset)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                                selectedPreset === preset.name
                                                    ? 'bg-orange-500 text-white shadow-md'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            <div>{preset.name}</div>
                                            {preset.category && (
                                                <div className="text-xs opacity-75 capitalize">{preset.category}</div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Ambient Layers */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Wind className="w-4 h-4" />
                                    Ambient Soundscape Layers
                                </h3>
                                <button
                                    onClick={() => setShowAmbient(!showAmbient)}
                                    className="text-xs text-gray-600 hover:text-gray-800"
                                >
                                    {showAmbient ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            
                            {showAmbient && (
                                <div className="grid grid-cols-2 gap-3">
                                    {ambientTracks.map((track) => (
                                        <div
                                            key={track.id}
                                            className={`border-2 rounded-lg p-3 transition-all ${
                                                track.isMuted ? 'border-gray-200 bg-gray-50' : 'border-gray-300 bg-white'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleToggleAmbientMute(track.id)}
                                                        className={`p-1.5 rounded transition-colors ${
                                                            track.isMuted
                                                                ? 'bg-gray-200 text-gray-400'
                                                                : 'bg-orange-500 text-white hover:bg-orange-600'
                                                        }`}
                                                    >
                                                        <Volume2 className="w-3 h-3" />
                                                    </button>
                                                    <span className={`text-sm font-medium ${track.isMuted ? 'text-gray-400' : 'text-gray-800'}`}>
                                                        {track.name}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-gray-500">
                                                    {Math.round(track.volume * 100)}%
                                                </span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.01"
                                                value={track.volume}
                                                onChange={(e) => handleAmbientVolumeChange(track.id, parseFloat(e.target.value))}
                                                disabled={track.isMuted}
                                                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
                                                style={{
                                                    background: track.isMuted
                                                        ? '#e5e7eb'
                                                        : `linear-gradient(to right, ${track.color} 0%, ${track.color} ${track.volume * 100}%, #e5e7eb ${track.volume * 100}%, #e5e7eb 100%)`,
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Instrument Tracks */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-gray-700">Instrument Layers</h3>
                            
                            {tracks.length === 0 && (
                                <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200 text-sm">
                                    ⚠️ No instrument tracks available for this region yet.
                                </div>
                            )}

                            {tracks.map((track) => (
                                <div
                                    key={track.id}
                                    className={`border-2 rounded-lg p-4 transition-all ${
                                        track.isMuted && !track.solo
                                            ? 'border-gray-200 bg-gray-50'
                                            : track.solo
                                            ? 'border-orange-400 bg-orange-50 shadow-md'
                                            : 'border-gray-300 bg-white shadow-sm'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => handleToggleMute(track.id)}
                                                    className={`p-2 rounded-lg transition-colors ${
                                                        track.isMuted
                                                            ? 'bg-gray-200 text-gray-400'
                                                            : 'bg-orange-500 text-white hover:bg-orange-600'
                                                    }`}
                                                    title="Mute/Unmute"
                                                >
                                                    <Volume2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleToggleSolo(track.id)}
                                                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                                                        track.solo
                                                            ? 'bg-orange-500 text-white'
                                                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                                    }`}
                                                    title="Solo"
                                                >
                                                    S
                                                </button>
                                            </div>
                                            <div>
                                                <h4 className={`font-semibold ${track.isMuted && !track.solo ? 'text-gray-400' : 'text-gray-800'}`}>
                                                    {track.name}
                                                </h4>
                                                <span className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[track.category]}`}>
                                                    {track.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <VUMeter analyser={analyser} width={6} height={40} />
                                            <div className="text-sm font-medium text-gray-600">
                                                {Math.round(track.volume * 100)}%
                                            </div>
                                        </div>
                                    </div>

                                    {/* Volume Slider */}
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={track.volume}
                                        onChange={(e) => handleVolumeChange(track.id, parseFloat(e.target.value))}
                                        disabled={track.isMuted}
                                        className="w-full h-2 rounded-lg appearance-none cursor-pointer slider mb-3"
                                        style={{
                                            background: track.isMuted
                                                ? '#e5e7eb'
                                                : `linear-gradient(to right, ${track.color} 0%, ${track.color} ${track.volume * 100}%, #e5e7eb ${track.volume * 100}%, #e5e7eb 100%)`,
                                        }}
                                    />

                                    {/* Pan Control */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-medium text-gray-500 w-8">Pan</span>
                                        <input
                                            type="range"
                                            min="-1"
                                            max="1"
                                            step="0.1"
                                            value={track.pan || 0}
                                            onChange={(e) => handlePanChange(track.id, parseFloat(e.target.value))}
                                            disabled={track.isMuted}
                                            className="flex-1 h-1.5 rounded-lg appearance-none cursor-pointer bg-gray-200"
                                            style={{
                                                background: `linear-gradient(to right, #e5e7eb 0%, #e5e7eb 50%, ${track.color} 50%, ${track.color} ${(track.pan ? (track.pan + 1) / 2 : 0.5) * 100}%, #e5e7eb ${(track.pan ? (track.pan + 1) / 2 : 0.5) * 100}%, #e5e7eb 100%)`
                                            }}
                                        />
                                        <span className="text-xs text-gray-400 w-6 text-right">
                                            {track.pan === 0 ? 'C' : track.pan! < 0 ? 'L' : 'R'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer Controls */}
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handlePlayPause}
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold transition-colors"
                                >
                                    {isPlaying ? (
                                        <>
                                            <Pause className="w-5 h-5" />
                                            Pause Mix
                                        </>
                                    ) : (
                                        <>
                                            <Play className="w-5 h-5 ml-0.5" />
                                            Play Mix
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={handleReset}
                                    className="text-gray-600 hover:text-gray-800 p-3 transition-colors"
                                    title="Reset"
                                >
                                    <RotateCcw className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleSaveMix}
                                    className="text-gray-600 hover:text-gray-800 p-3 transition-colors"
                                    title="Save Mix"
                                >
                                    <Save className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleExport}
                                    className="text-gray-600 hover:text-gray-800 p-3 transition-colors"
                                    title="Export as JSON"
                                >
                                    <Download className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="text-gray-600 hover:text-gray-800 p-3 transition-colors"
                                    title="Share Mix"
                                >
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SoundscapeMixer;
