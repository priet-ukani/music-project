import { useState } from 'react';
import { Music, Filter, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import IndiaMap from './components/IndiaMap';
import FilterPanel from './components/FilterPanel';
import RegionModal from './components/RegionModal';
import AudioPlayer from './components/AudioPlayer';
import { musicalRegions } from './data/regions';
import type { MusicalRegion, FilterCategory, MusicalAspect } from './types/music';

function App() {
  const [selectedRegion, setSelectedRegion] = useState<MusicalRegion | null>(null);
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const [highlightAspect, setHighlightAspect] = useState<MusicalAspect | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [instrumentQuery, setInstrumentQuery] = useState<string>('');
  const [rhythmFilter, setRhythmFilter] = useState<string>('');

  const handleRegionClick = (regionId: string) => {
    const region = musicalRegions.find(r => r.id === regionId);
    if (region) {
      setSelectedRegion(region);
    }
  };

  const handleCloseModal = () => {
    setSelectedRegion(null);
    setCurrentAudio(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Music className="w-8 h-8 text-primary-600" />
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Musical Map of India
              </h1>
            </motion.div>
            
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-primary flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="w-5 h-5" />
              <span className="hidden md:inline">Filters</span>
            </motion.button>
          </div>
          
          {/* Info Banner */}
          <motion.div 
            className="mt-4 flex items-start space-x-2 bg-primary-50 p-3 rounded-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Info className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">
              Explore the rich musical diversity of India across 10 regions. Click on any region to discover its unique instruments, rhythms, languages, and cultural traditions.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <FilterPanel
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                highlightAspect={highlightAspect}
                setHighlightAspect={setHighlightAspect}
                onInstrumentSearch={(q) => setInstrumentQuery(q)}
                instrumentQuery={instrumentQuery}
                onRhythmSelect={(v) => setRhythmFilter(v)}
                rhythmFilter={rhythmFilter}
              />
            </motion.div>
          )}

          {/* Map Container */}
          <motion.div
            className={`${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="card">
              <IndiaMap
                regions={musicalRegions}
                onRegionClick={handleRegionClick}
                selectedRegionId={selectedRegion?.id}
                filterCategory={filterCategory}
                highlightAspect={highlightAspect}
                instrumentQuery={instrumentQuery}
                rhythmFilter={rhythmFilter}
              />
            </div>

            {/* Region Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="card text-center">
                <div className="text-3xl font-bold text-primary-600">{musicalRegions.length}</div>
                <div className="text-sm text-gray-600">Regions</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-secondary-600">50+</div>
                <div className="text-sm text-gray-600">Instruments</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-primary-600">20+</div>
                <div className="text-sm text-gray-600">Languages</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-secondary-600">100+</div>
                <div className="text-sm text-gray-600">Traditions</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Audio Player */}
      {currentAudio && (
        <AudioPlayer
          audioUrl={currentAudio}
          onClose={() => setCurrentAudio(null)}
        />
      )}

      {/* Region Modal */}
      {selectedRegion && (
        <RegionModal
          region={selectedRegion}
          onClose={handleCloseModal}
          onPlayAudio={setCurrentAudio}
          onInstrumentSearch={(q) => setInstrumentQuery(q)}
          instrumentQuery={instrumentQuery}
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 Musical Map of India | Ethnomusicological Research Project
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Exploring the rich tapestry of Indian regional music traditions
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
