import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ReactNode } from 'react';
import { X } from 'lucide-react';
import { useIsMobile, useLockBodyScroll } from '../utils/mobileOptimizations';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  height?: 'half' | 'full' | 'auto';
  showHandle?: boolean;
}

export default function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  height = 'auto',
  showHandle = true,
}: BottomSheetProps) {
  const isMobile = useIsMobile();
  useLockBodyScroll(isOpen && isMobile);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // If dragged down more than 100px, close the sheet
    if (info.offset.y > 100) {
      onClose();
    }
  };

  const heightClass = {
    half: 'h-[50vh]',
    full: 'h-[90vh]',
    auto: 'max-h-[85vh]',
  }[height];

  // Desktop: Use regular modal
  if (!isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
            >
              <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">{children}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Mobile: Use bottom sheet
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={handleDragEnd}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed bottom-0 left-0 right-0 ${heightClass} bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl z-50 flex flex-col`}
          >
            {/* Drag Handle */}
            {showHandle && (
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-gray-300 dark:bg-slate-600 rounded-full" />
              </div>
            )}

            {/* Header */}
            <div className="px-6 py-3 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between flex-shrink-0">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
