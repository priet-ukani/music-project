import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Gauge, AlertCircle, Music } from 'lucide-react';

interface WaveformPlayerProps {
  audioUrl: string;
  title: string;
  description?: string;
  onPlay?: () => void;
  onPause?: () => void;
  height?: number;
  waveColor?: string;
  progressColor?: string;
}

const WaveformPlayer: React.FC<WaveformPlayerProps> = ({
  audioUrl,
  title,
  description,
  onPlay,
  onPause,
  height = 80,
  waveColor = '#94a3b8',
  progressColor = '#f97316',
}) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<string>('0:00');
  const [currentTime, setCurrentTime] = useState<string>('0:00');
  const [volume, setVolume] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Check audio manifest
  useEffect(() => {
    const checkManifest = async () => {
      try {
        const response = await fetch('/audio/manifest.json');
        if (response.ok) {
          const manifest = await response.json();
          const audioName = audioUrl.split('/').pop();
          const isPlaceholder = 
            (manifest.audio?.ambient?.[audioName]?.isPlaceholder) ||
            (manifest.audio?.instruments?.[audioName]?.isPlaceholder) ||
            (manifest.audio?.ensembles?.[audioName]?.isPlaceholder) ||
            (manifest.audio?.samples?.[audioName]?.isPlaceholder);
          
          if (isPlaceholder) {
            setHasError(true);
            setErrorMessage('Audio file not available');
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.warn('Manifest check failed:', error);
      }
    };

    checkManifest();
  }, [audioUrl]);

  useEffect(() => {
    if (!waveformRef.current || hasError) return;

    // Create WaveSurfer instance
    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: waveColor,
      progressColor: progressColor,
      cursorColor: '#f97316',
      barWidth: 2,
      barRadius: 3,
      cursorWidth: 1,
      height: height,
      barGap: 2,
      normalize: true,
      hideScrollbar: true,
    });

    wavesurferRef.current = ws;

    // Load audio
    ws.load(audioUrl);

    // Event listeners
    ws.on('ready', () => {
      setIsLoading(false);
      const dur = ws.getDuration();
      setDuration(formatTime(dur));
      ws.setVolume(volume);
    });

    ws.on('audioprocess', () => {
      const time = ws.getCurrentTime();
      setCurrentTime(formatTime(time));
    });

    ws.on('play', () => {
      setIsPlaying(true);
      onPlay?.();
    });

    ws.on('pause', () => {
      setIsPlaying(false);
      onPause?.();
    });

    ws.on('finish', () => {
      setIsPlaying(false);
      setCurrentTime('0:00');
    });

    ws.on('error', (error) => {
      console.error('WaveSurfer error:', error);
      setHasError(true);
      setErrorMessage('Failed to load audio');
      setIsLoading(false);
    });

    // Cleanup
    return () => {
      ws.destroy();
    };
  }, [audioUrl, height, waveColor, progressColor]);

  useEffect(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(isMuted ? 0 : volume);
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setPlaybackRate(playbackSpeed);
    }
  }, [playbackSpeed]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleRestart = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.seekTo(0);
      setCurrentTime('0:00');
    }
  };

  const cyclePlaybackSpeed = () => {
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

  // Show error state
  if (hasError) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 shadow-md border border-red-200">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-red-800 text-sm mb-1">{title}</h4>
            <p className="text-xs text-red-600 mb-2">Audio Coming Soon</p>
            {description && (
              <p className="text-xs text-red-500 mt-1">{description}</p>
            )}
            <p className="text-xs text-red-500 mt-2">{errorMessage || 'This audio file is not available yet'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 shadow-md">
      {/* Title and Description */}
      <div className="mb-3">
        <h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
        {description && (
          <p className="text-xs text-gray-600 mt-1">{description}</p>
        )}
      </div>

      {/* Waveform */}
      <div className="relative mb-3">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded z-10">
            <div className="flex items-center space-x-2">
              <Music className="w-4 h-4 animate-pulse text-gray-400" />
              <span className="animate-pulse text-sm text-gray-500">Loading audio...</span>
            </div>
          </div>
        )}
        <div ref={waveformRef} className="rounded overflow-hidden" />
      </div>

      {/* Time Display */}
      <div className="flex justify-between text-xs text-gray-600 mb-3">
        <span>{currentTime}</span>
        <span>{duration}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Play/Pause */}
        <button
          onClick={togglePlayPause}
          disabled={isLoading}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white p-2 rounded-full transition-colors"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-0.5" />
          )}
        </button>

        {/* Restart */}
        <button
          onClick={handleRestart}
          disabled={isLoading}
          className="text-gray-600 hover:text-orange-600 disabled:text-gray-300 transition-colors"
          title="Restart"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Playback Speed */}
        <button
          onClick={cyclePlaybackSpeed}
          disabled={isLoading}
          className="flex items-center gap-1 text-gray-600 hover:text-orange-600 disabled:text-gray-300 transition-colors text-xs font-medium"
          title="Playback Speed"
        >
          <Gauge className="w-4 h-4" />
          <span>{playbackSpeed}x</span>
        </button>

        {/* Volume Control */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={toggleMute}
            className="text-gray-600 hover:text-orange-600 transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #f97316 0%, #f97316 ${volume * 100}%, #d1d5db ${volume * 100}%, #d1d5db 100%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WaveformPlayer;
