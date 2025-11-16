import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import React from 'react';

interface InstrumentSpotlightProps {
  name: string | null;
  image?: string;
  description?: string;
  onClose: () => void;
}

const InstrumentSpotlight: React.FC<InstrumentSpotlightProps> = ({ name, image, description, onClose }) => {
  return (
    <AnimatePresence>
      {name && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 relative flex flex-col md:flex-row gap-4"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-gray-800">
              <X className="w-5 h-5" />
            </button>

            {image && (
              <div className="w-full md:w-1/2 flex-shrink-0">
                <img src={image} alt={name || 'instrument'} className="w-full h-56 object-cover rounded-lg" />
              </div>
            )}

            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-2">{name}</h3>
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstrumentSpotlight;
