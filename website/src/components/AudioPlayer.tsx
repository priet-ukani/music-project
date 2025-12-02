import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, X, AlertCircle, Music } from 'lucide-react';
import { Howl } from 'howler';

interface AudioPlayerProps {
  audioUrl: string;
  onClose: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const soundRef = useRef<Howl | null>(null);
  const animationRef = useRef<number | undefined>(undefined);

  // Check if audio file exists in manifest
  useEffect(() => {
    const checkAudioManifest = async () => {
      try {
        const response = await fetch('/audio/manifest.json');
        if (response.ok) {
          const manifest = await response.json();
          const audioName = audioUrl.split('/').pop() || '';
          
          if (!audioName) return;

          // Check ambient, instruments, ensembles, or samples

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
        // Manifest check failed, continue with normal loading
        console.warn('Audio manifest check failed:', error);
      }
    };

    checkAudioManifest();
  }, [audioUrl]);

  useEffect(() => {
    if (hasError) return;

    // Create Howler instance
    soundRef.current = new Howl({
      src: [audioUrl],
      format: ['wav', 'mp3', 'ogg'], // Try multiple formats - files may have wrong extension
      html5: false, // Use Web Audio API instead of HTML5 for better format support
      volume: volume,
      onload: function() {
        setDuration(soundRef.current?.duration() || 0);
        setIsLoading(false);
      },
      onloaderror: function(_id, error) {
        console.error('Audio load error:', error);
        console.error('Audio URL:', audioUrl);
        console.error('File exists check - try accessing:', window.location.origin + audioUrl);
        setHasError(true);
        setErrorMessage(`Failed to load audio file. URL: ${audioUrl}`);
        setIsLoading(false);
      },
      onplay: function() {
        setIsPlaying(true);
        updateProgress();
      },
      onpause: function() {
        setIsPlaying(false);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      },
      onend: function() {
        setIsPlaying(false);
        setCurrentTime(0);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      },
    });

    return () => {
      soundRef.current?.unload();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioUrl]);

  const updateProgress = () => {
    if (soundRef.current && soundRef.current.playing()) {
      setCurrentTime(soundRef.current.seek() as number);
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const togglePlay = () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    soundRef.current?.volume(newVolume);
    if (newVolume > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    if (!soundRef.current) return;
    
    if (isMuted) {
      soundRef.current.volume(volume);
      setIsMuted(false);
    } else {
      soundRef.current.volume(0);
      setIsMuted(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    soundRef.current?.seek(newTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Show error state
  if (hasError) {
    return (
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-red-600 to-red-700 text-white shadow-2xl z-40"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <AlertCircle className="w-6 h-6 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold">Audio Coming Soon</p>
              <p className="text-sm text-white/80">{errorMessage || 'This audio file is not available yet'}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 hover:text-white/80 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-2xl z-40"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
    >
      <div className="container mx-auto px-4 py-4">
        {isLoading && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <Music className="w-5 h-5 animate-pulse" />
              <span className="text-sm">Loading audio...</span>
            </div>
          </div>
        )}
        <div className="flex items-center space-x-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="flex-shrink-0 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" fill="currentColor" />
            ) : (
              <Play className="w-6 h-6" fill="currentColor" />
            )}
          </button>

          {/* Progress Bar */}
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, white 0%, white ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) 100%)`,
                }}
              />
              <span className="text-xs font-mono">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="hidden md:flex items-center space-x-2">
            <button onClick={toggleMute} className="hover:text-white/80 transition-colors">
              {isMuted || volume === 0 ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-24 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex-shrink-0 hover:text-white/80 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AudioPlayer;
