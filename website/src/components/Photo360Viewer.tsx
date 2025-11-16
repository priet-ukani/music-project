import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, RotateCw, Info, X } from 'lucide-react';

interface Photo360ViewerProps {
  imageUrl: string;
  title: string;
  description?: string;
  autoRotate?: boolean;
  rotationSpeed?: number;
}

const Photo360Viewer: React.FC<Photo360ViewerProps> = ({
  imageUrl,
  title,
  description,
  autoRotate = false,
  rotationSpeed = 0.5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotate);
  const [showInfo, setShowInfo] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  // Auto-rotation effect
  useEffect(() => {
    if (isAutoRotating && !isDragging) {
      const animate = () => {
        setRotation((prev) => (prev + rotationSpeed) % 360);
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAutoRotating, isDragging, rotationSpeed]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setIsAutoRotating(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX;
    setRotation((prev) => (prev + deltaX * 0.5) % 360);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setIsAutoRotating(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const deltaX = e.touches[0].clientX - startX;
    setRotation((prev) => (prev + deltaX * 0.5) % 360);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const toggleAutoRotate = () => {
    setIsAutoRotating(!isAutoRotating);
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      containerRef.current.requestFullscreen();
    }
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        </div>
      </div>

      {/* 360° Viewer Container */}
      <motion.div
        ref={containerRef}
        className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden aspect-video cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* 360° Image */}
        <div
          className="w-full h-full flex items-center justify-center transition-transform duration-100"
          style={{
            transform: `perspective(1000px) rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <img
            src={imageUrl}
            alt={title}
            className="max-w-full max-h-full object-contain"
            onLoad={() => setIsLoaded(true)}
            style={{
              backfaceVisibility: 'hidden',
            }}
          />
        </div>

        {/* Loading State */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent" />
          </div>
        )}

        {/* Info Overlay */}
        {showInfo && (
          <motion.div
            className="absolute top-4 left-4 right-4 bg-black/70 backdrop-blur-sm text-white p-4 rounded-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-orange-500" />
                <span className="font-semibold">360° Interactive View</span>
              </div>
              <button
                onClick={() => setShowInfo(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-white/80">
              🖱️ Drag to rotate • 📱 Swipe on mobile • 🔄 Auto-rotate available
            </p>
          </motion.div>
        )}

        {/* Control Bar */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Auto-rotate Toggle */}
            <button
              onClick={toggleAutoRotate}
              className={`p-2 rounded-lg backdrop-blur-sm transition-colors ${
                isAutoRotating
                  ? 'bg-orange-500 text-white'
                  : 'bg-black/70 text-white/80 hover:bg-black/80'
              }`}
              title={isAutoRotating ? 'Stop Auto-Rotate' : 'Start Auto-Rotate'}
            >
              <RotateCw className={`w-5 h-5 ${isAutoRotating ? 'animate-spin' : ''}`} />
            </button>

            {/* Info Toggle */}
            {!showInfo && (
              <button
                onClick={() => setShowInfo(true)}
                className="p-2 rounded-lg bg-black/70 text-white/80 hover:bg-black/80 backdrop-blur-sm transition-colors"
                title="Show Info"
              >
                <Info className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Rotation Indicator */}
          <div className="bg-black/70 backdrop-blur-sm text-white/80 px-3 py-2 rounded-lg text-sm font-mono">
            {Math.round(rotation)}°
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={handleFullscreen}
            className="p-2 rounded-lg bg-black/70 text-white/80 hover:bg-black/80 backdrop-blur-sm transition-colors"
            title="Fullscreen"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Instructions */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
        <p className="text-sm text-orange-800">
          <strong>💡 Tip:</strong> Drag horizontally to rotate the view 360°. Enable auto-rotate for a
          continuous spin effect. Perfect for viewing instruments from all angles!
        </p>
      </div>
    </div>
  );
};

export default Photo360Viewer;
