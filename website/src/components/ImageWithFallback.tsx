import { useState, useEffect } from 'react';
import { ImageOff, Loader2 } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackText?: string;
  width?: number;
  height?: number;
  onLoad?: () => void;
  onError?: () => void;
  lazy?: boolean;
}

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackText,
  width = 800,
  height = 600,
  onLoad,
  onError,
  lazy = true,
}: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [manifestChecked, setManifestChecked] = useState(false);

  // Check manifest to see if image exists
  useEffect(() => {
    const checkManifest = async () => {
      try {
        const response = await fetch('/images/manifest.json');
        if (response.ok) {
          const manifest = await response.json();
          const imageName = src.split('/').pop();
          if (imageName && manifest.images && manifest.images[imageName]) {
            if (!manifest.images[imageName].exists) {
              setHasError(true);
              setIsLoading(false);
              setManifestChecked(true);
              return;
            }
          }
        }
      } catch (error) {
        // Manifest check failed, continue with normal loading
        console.warn('Manifest check failed:', error);
      }
      setManifestChecked(true);
    };

    checkManifest();
  }, [src]);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    
    // Generate placeholder image URL
    const placeholderText = fallbackText || alt || 'Image';
    const placeholderUrl = `https://via.placeholder.com/${width}x${height}/e5e7eb/9ca3af?text=${encodeURIComponent(placeholderText)}`;
    setImageSrc(placeholderUrl);
    
    if (onError) onError();
  };

  const handleLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  // Generate placeholder if we know image doesn't exist
  const placeholderUrl = `https://via.placeholder.com/${width}x${height}/e5e7eb/9ca3af?text=${encodeURIComponent(fallbackText || alt || 'Image')}`;

  if (hasError && !isLoading) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <div className="text-center p-4">
          <ImageOff className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">{fallbackText || alt || 'Image not available'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        loading={lazy ? 'lazy' : 'eager'}
        style={{ width, height }}
      />
    </div>
  );
}

