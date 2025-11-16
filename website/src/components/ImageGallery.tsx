import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Download, Maximize2 } from 'lucide-react';

interface GalleryImage {
  url: string;
  title: string;
  description?: string;
  credit?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  title?: string;
  columns?: 2 | 3 | 4;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  title = 'Gallery',
  columns = 3 
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsZoomed(false);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    setIsZoomed(false);
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
      setIsZoomed(false);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
      setIsZoomed(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename.replace(/\s+/g, '_').toLowerCase() + '.jpg';
      link.click();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  return (
    <div className="space-y-4">
      {/* Gallery Header */}
      {title && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <span className="text-sm text-gray-500">{images.length} photos</span>
        </div>
      )}

      {/* Gallery Grid */}
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-lg bg-gray-100 aspect-square"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                // Fallback to placeholder image
                const target = e.currentTarget;
                target.src = `https://via.placeholder.com/800x600/cccccc/666666?text=${encodeURIComponent(image.title)}`;
                target.onerror = null; // Prevent infinite loop
              }}
            />
            
            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="text-white font-semibold text-sm mb-1">{image.title}</h4>
                {image.description && (
                  <p className="text-white/80 text-xs line-clamp-2">{image.description}</p>
                )}
              </div>
              <div className="absolute top-2 right-2">
                <ZoomIn className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-[10000] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                  className="absolute left-4 text-white/80 hover:text-white transition-colors z-10"
                >
                  <ChevronLeft className="w-12 h-12" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goToNext(); }}
                  className="absolute right-4 text-white/80 hover:text-white transition-colors z-10"
                >
                  <ChevronRight className="w-12 h-12" />
                </button>
              </>
            )}

            {/* Top Controls */}
            <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
              <button
                onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
                className="text-white/80 hover:text-white transition-colors p-2 bg-black/50 rounded-lg"
                title={isZoomed ? 'Zoom Out' : 'Zoom In'}
              >
                <Maximize2 className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { 
                  e.stopPropagation(); 
                  handleDownload(images[selectedIndex].url, images[selectedIndex].title);
                }}
                className="text-white/80 hover:text-white transition-colors p-2 bg-black/50 rounded-lg"
                title="Download"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>

            {/* Image Container */}
            <motion.div
              className="max-w-7xl max-h-[90vh] mx-auto px-4"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <img
                src={images[selectedIndex].url}
                alt={images[selectedIndex].title}
                className={`max-w-full max-h-[80vh] object-contain mx-auto transition-transform duration-300 ${
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />

              {/* Image Info */}
              <motion.div
                className="mt-4 text-center text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-bold mb-2">{images[selectedIndex].title}</h3>
                {images[selectedIndex].description && (
                  <p className="text-white/80 text-sm mb-1">{images[selectedIndex].description}</p>
                )}
                {images[selectedIndex].credit && (
                  <p className="text-white/60 text-xs">Photo: {images[selectedIndex].credit}</p>
                )}
                <p className="text-white/60 text-xs mt-2">
                  {selectedIndex + 1} / {images.length}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery;
