import React, { useState, useRef, useEffect } from 'react';
import { Howl } from 'howler';
import { Play, Pause, Volume2, Download, Share2, RotateCcw, Save, Layers, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InstrumentTrack {
  id: string;
  name: string;
  audioUrl: string;
  volume: number;
  isMuted: boolean;
  isLoaded: boolean;
  color: string;
  category: 'string' | 'percussion' | 'wind' | 'unique';
}

interface SoundscapePreset {
  name: string;
  description: string;
  tracks: Array<{ id: string; volume: number }>;
}

interface SoundscapeMixerProps {
  regionId: string;
  regionName: string;
  regionColor: string;
  onClose: () => void;
}

// Available instruments per region
const REGIONAL_INSTRUMENTS: Record<string, InstrumentTrack[]> = {
  rajasthan: [
    { id: 'raj_kamaycha', name: 'Kamaycha', audioUrl: '/audio/instruments/kamaycha_track.mp3', volume: 0.7, isMuted: false, isLoaded: false, color: '#d97706', category: 'string' },
    { id: 'raj_dholak', name: 'Dholak', audioUrl: '/audio/instruments/dholak_track.wav', volume: 0.6, isMuted: false, isLoaded: false, color: '#dc2626', category: 'percussion' },
    { id: 'raj_algoza', name: 'Algoza', audioUrl: '/audio/instruments/algoza_loop.mp3', volume: 0.5, isMuted: false, isLoaded: false, color: '#16a34a', category: 'wind' },
    { id: 'raj_morchang', name: 'Morchang', audioUrl: '/audio/instruments/morchang_loop.mp3', volume: 0.4, isMuted: false, isLoaded: false, color: '#9333ea', category: 'unique' },
  ],
  bengal: [
    { id: 'ben_ektara', name: 'Ektara', audioUrl: '/audio/instruments/ektara_loop.mp3', volume: 0.7, isMuted: false, isLoaded: false, color: '#0891b2', category: 'string' },
    { id: 'ben_tabla', name: 'Tabla', audioUrl: '/audio/instruments/tabla_isolated_beat.wav', volume: 0.6, isMuted: false, isLoaded: false, color: '#dc2626', category: 'percussion' },
    { id: 'ben_bansuri', name: 'Bansuri', audioUrl: '/audio/instruments/bansuri_alap.mp3', volume: 0.5, isMuted: false, isLoaded: false, color: '#16a34a', category: 'wind' },
    { id: 'ben_dotara', name: 'Dotara', audioUrl: '/audio/instruments/dotara_track.mp3', volume: 0.6, isMuted: false, isLoaded: false, color: '#ea580c', category: 'string' },
  ],
  punjab: [
    { id: 'pun_tumbi', name: 'Tumbi', audioUrl: '/audio/instruments/tumbi_loop.mp3', volume: 0.7, isMuted: false, isLoaded: false, color: '#d97706', category: 'string' },
    { id: 'pun_dhol', name: 'Dhol', audioUrl: '/audio/instruments/dhol_beat.mp3', volume: 0.7, isMuted: false, isLoaded: false, color: '#dc2626', category: 'percussion' },
    { id: 'pun_chimta', name: 'Chimta', audioUrl: '/audio/instruments/chimta_track.mp3', volume: 0.4, isMuted: false, isLoaded: false, color: '#9333ea', category: 'percussion' },
  ],
  tamilnadu: [
    { id: 'tn_veena', name: 'Veena', audioUrl: '/audio/instruments/veena_sample.mp3', volume: 0.7, isMuted: false, isLoaded: false, color: '#d97706', category: 'string' },
    { id: 'tn_mridangam', name: 'Mridangam', audioUrl: '/audio/instruments/mridangam_pattern.mp3', volume: 0.6, isMuted: false, isLoaded: false, color: '#dc2626', category: 'percussion' },
    { id: 'tn_nadaswaram', name: 'Nadaswaram', audioUrl: '/audio/instruments/nadaswaram_phrase.mp3', volume: 0.5, isMuted: false, isLoaded: false, color: '#16a34a', category: 'wind' },
    { id: 'tn_ghatam', name: 'Ghatam', audioUrl: '/audio/instruments/ghatam_beat.mp3', volume: 0.5, isMuted: false, isLoaded: false, color: '#0891b2', category: 'percussion' },
  ],
  kerala: [
    { id: 'ker_chenda', name: 'Chenda', audioUrl: '/audio/instruments/chenda_melam.mp3', volume: 0.7, isMuted: false, isLoaded: false, color: '#dc2626', category: 'percussion' },
    { id: 'ker_maddalam', name: 'Maddalam', audioUrl: '/audio/instruments/maddalam_track.mp3', volume: 0.6, isMuted: false, isLoaded: false, color: '#ea580c', category: 'percussion' },
    { id: 'ker_kombu', name: 'Kombu', audioUrl: '/audio/instruments/kombu_call.mp3', volume: 0.5, isMuted: false, isLoaded: false, color: '#16a34a', category: 'wind' },
  ],
};

// Preset templates
const PRESETS: Record<string, SoundscapePreset[]> = {
  rajasthan: [
    {
      name: 'Desert Evening',
      description: 'Traditional Manganiyar ensemble sound',
      tracks: [
        { id: 'raj_kamaycha', volume: 0.8 },
        { id: 'raj_dholak', volume: 0.5 },
        { id: 'raj_morchang', volume: 0.3 },
      ],
    },
    {
      name: 'Folk Festival',
      description: 'Energetic folk celebration',
      tracks: [
        { id: 'raj_kamaycha', volume: 0.7 },
        { id: 'raj_dholak', volume: 0.8 },
        { id: 'raj_algoza', volume: 0.6 },
      ],
    },
  ],
  bengal: [
    {
      name: 'Baul Wanderer',
      description: 'Mystical Baul singer setup',
      tracks: [
        { id: 'ben_ektara', volume: 0.8 },
        { id: 'ben_tabla', volume: 0.4 },
      ],
    },
  ],
  tamilnadu: [
    {
      name: 'Temple Concert',
      description: 'Classical Carnatic performance',
      tracks: [
        { id: 'tn_veena', volume: 0.8 },
        { id: 'tn_mridangam', volume: 0.6 },
        { id: 'tn_ghatam', volume: 0.4 },
      ],
    },
  ],
};

const SoundscapeMixer: React.FC<SoundscapeMixerProps> = ({ regionId, regionName, regionColor, onClose }) => {
  const [tracks, setTracks] = useState<InstrumentTrack[]>(REGIONAL_INSTRUMENTS[regionId] || []);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [mixName, setMixName] = useState(`${regionName} Mix`);
  const howlInstancesRef = useRef<Map<string, Howl>>(new Map());

  // Initialize Howl instances
  useEffect(() => {
    tracks.forEach((track) => {
      if (!howlInstancesRef.current.has(track.id)) {
        const howl = new Howl({
          src: [track.audioUrl],
          loop: true,
          volume: track.volume,
          onload: () => {
            setTracks((prev) =>
              prev.map((t) => (t.id === track.id ? { ...t, isLoaded: true } : t))
            );
          },
          onloaderror: () => {
            console.error(`Failed to load: ${track.name}`);
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
  }, [tracks]);

  const handlePlayPause = () => {
    if (isPlaying) {
      // Stop all tracks
      howlInstancesRef.current.forEach((howl) => howl.pause());
      setIsPlaying(false);
    } else {
      // Play all non-muted tracks
      tracks.forEach((track) => {
        if (!track.isMuted) {
          const howl = howlInstancesRef.current.get(track.id);
          howl?.play();
        }
      });
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (trackId: string, newVolume: number) => {
    setTracks((prev) =>
      prev.map((t) => (t.id === trackId ? { ...t, volume: newVolume } : t))
    );
    const howl = howlInstancesRef.current.get(trackId);
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
          } else if (isPlaying) {
            howl?.play();
          }
          return { ...t, isMuted: newMuted };
        }
        return t;
      })
    );
  };

  const handleReset = () => {
    howlInstancesRef.current.forEach((howl) => howl.stop());
    setIsPlaying(false);
    setTracks(REGIONAL_INSTRUMENTS[regionId] || []);
    setSelectedPreset(null);
  };

  const handleLoadPreset = (preset: SoundscapePreset) => {
    setSelectedPreset(preset.name);
    setMixName(preset.name);
    
    // Update track volumes based on preset
    setTracks((prev) =>
      prev.map((track) => {
        const presetTrack = preset.tracks.find((pt) => pt.id === track.id);
        if (presetTrack) {
          const howl = howlInstancesRef.current.get(track.id);
          howl?.volume(presetTrack.volume);
          return { ...track, volume: presetTrack.volume, isMuted: false };
        }
        return { ...track, isMuted: true };
      })
    );
  };

  const handleSaveMix = () => {
    const mixData = {
      name: mixName,
      region: regionId,
      tracks: tracks
        .filter((t) => !t.isMuted)
        .map((t) => ({ id: t.id, name: t.name, volume: t.volume })),
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
        .map((t) => ({ name: t.name, volume: Math.round(t.volume * 100) + '%' })),
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
    const shareText = `🎵 Check out my ${regionName} soundscape mix: ${mixName}\n\nInstruments:\n${tracks
      .filter((t) => !t.isMuted)
      .map((t) => `• ${t.name} (${Math.round(t.volume * 100)}%)`)
      .join('\n')}`;
    
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
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
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

          {/* Content */}
          <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
            {/* Presets */}
            {presets.length > 0 && (
              <div className="mb-6">
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
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Instrument Tracks */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700">Instrument Layers</h3>
              
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className={`border-2 rounded-lg p-4 transition-all ${
                    track.isMuted ? 'border-gray-200 bg-gray-50' : 'border-gray-300 bg-white shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggleMute(track.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          track.isMuted
                            ? 'bg-gray-200 text-gray-400'
                            : 'bg-orange-500 text-white hover:bg-orange-600'
                        }`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <div>
                        <h4 className={`font-semibold ${track.isMuted ? 'text-gray-400' : 'text-gray-800'}`}>
                          {track.name}
                        </h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[track.category]}`}>
                          {track.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-sm font-medium text-gray-600">
                      {Math.round(track.volume * 100)}%
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
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: track.isMuted
                        ? '#e5e7eb'
                        : `linear-gradient(to right, ${track.color} 0%, ${track.color} ${track.volume * 100}%, #e5e7eb ${track.volume * 100}%, #e5e7eb 100%)`,
                    }}
                  />
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
                  disabled={tracks.every((t) => t.isMuted)}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold transition-colors"
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
