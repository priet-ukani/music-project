import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, SkipBack, SkipForward } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  description?: string;
  thumbnail?: string;
  autoplay?: boolean;
  loop?: boolean;
  controls?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title,
  description,
  thumbnail,
  autoplay = false,
  loop = false,
  controls = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = newVolume;
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const handleSeek = (time: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = time;
    setCurrentTime(time);
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
  };

  const toggleFullscreen = () => {
    const container = videoRef.current?.parentElement;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-3">
      {/* Title */}
      <div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
      </div>

      {/* Video Container */}
      <motion.div
        className="relative bg-black rounded-lg overflow-hidden group"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          poster={thumbnail}
          autoPlay={autoplay}
          loop={loop}
          className="w-full aspect-video object-contain"
          onClick={togglePlay}
        />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent" />
          </div>
        )}

        {/* Play Button Overlay (when paused) */}
        {!isPlaying && !isLoading && (
          <motion.button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-20 h-20 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors">
              <Play className="w-10 h-10 text-gray-800 ml-1" />
            </div>
          </motion.button>
        )}

        {/* Custom Controls */}
        {controls && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Progress Bar */}
            <div className="mb-3">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={(e) => handleSeek(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider-video"
                style={{
                  background: `linear-gradient(to right, #f97316 0%, #f97316 ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-white/80 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-orange-500 transition-colors"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>

                {/* Skip Controls */}
                <button
                  onClick={() => skip(-10)}
                  className="text-white/80 hover:text-white transition-colors"
                  title="Back 10s"
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                <button
                  onClick={() => skip(10)}
                  className="text-white/80 hover:text-white transition-colors"
                  title="Forward 10s"
                >
                  <SkipForward className="w-5 h-5" />
                </button>

                {/* Volume Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-orange-500 transition-colors"
                  >
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
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-orange-500 transition-colors"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-5 h-5" />
                ) : (
                  <Maximize2 className="w-5 h-5" />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default VideoPlayer;
