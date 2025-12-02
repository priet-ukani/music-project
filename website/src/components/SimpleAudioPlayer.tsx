import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, AlertCircle, Music } from 'lucide-react';

interface SimpleAudioPlayerProps {
  audioUrl: string;
  title: string;
  description?: string;
}

const SimpleAudioPlayer: React.FC<SimpleAudioPlayerProps> = ({
  audioUrl,
  title,
  description,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<string>('0:00');
  const [currentTime, setCurrentTime] = useState<string>('0:00');
  const [progress, setProgress] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState(false);
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
          const audioName = audioUrl.split('/').pop() || '';
          
          if (!audioName) return;

          const isPlaceholder = 
            (manifest.audio?.ambient?.[audioName]?.isPlaceholder === true) ||
            (manifest.audio?.instruments?.[audioName]?.isPlaceholder === true) ||
            (manifest.audio?.ensembles?.[audioName]?.isPlaceholder === true) ||
            (manifest.audio?.samples?.[audioName]?.isPlaceholder === true);
          
          if (isPlaceholder) {
            console.warn('Audio marked as placeholder:', audioName);
            setHasError(true);
            setErrorMessage('Audio file not available yet');
            setIsLoading(false);
            return;
          }
          
          console.log('Audio file check passed:', audioName);
        }
      } catch (error) {
        console.warn('Manifest check failed:', error);
      }
    };

    checkManifest();
  }, [audioUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      console.log('Audio metadata loaded:', audioUrl);
      setIsLoading(false);
      setDuration(formatTime(audio.duration));
      audio.volume = volume;
    };

    const handleTimeUpdate = () => {
      setCurrentTime(formatTime(audio.currentTime));
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime('0:00');
      setProgress(0);
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      console.error('Audio URL:', audioUrl);
      console.error('Error details:', audio.error);
      setHasError(true);
      setErrorMessage(`Failed to load audio: ${audio.error?.message || 'Unknown error'}`);
      setIsLoading(false);
    };

    const handleCanPlay = () => {
      console.log('Audio can play:', audioUrl);
      setIsLoading(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [audioUrl]);

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(error => {
        console.error('Play error:', error);
        setHasError(true);
        setErrorMessage('Failed to play audio');
      });
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleRestart = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setCurrentTime('0:00');
    setProgress(0);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    audio.currentTime = percentage * audio.duration;
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
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
      />

      {/* Title and Description */}
      <div className="mb-3">
        <h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
        {description && (
          <p className="text-xs text-gray-600 mt-1">{description}</p>
        )}
      </div>

      {/* Progress Bar */}
      <div className="relative mb-3">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded z-10">
            <div className="flex items-center space-x-2">
              <Music className="w-4 h-4 animate-pulse text-gray-400" />
              <span className="animate-pulse text-sm text-gray-500">Loading audio...</span>
            </div>
          </div>
        )}
        <div
          className="h-2 bg-gray-300 rounded-full cursor-pointer overflow-hidden"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-orange-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
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

export default SimpleAudioPlayer;
