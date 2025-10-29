import { useState } from 'react';
import { motion } from 'framer-motion';
import { Music2, Mic2, Drum, Globe, Users, BookOpen } from 'lucide-react';
import type { FilterCategory, MusicalAspect } from '../types/music';
import { musicalRegions } from '../data/regions';

interface FilterPanelProps {
  filterCategory: FilterCategory;
  setFilterCategory: (category: FilterCategory) => void;
  highlightAspect: MusicalAspect | null;
  setHighlightAspect: (aspect: MusicalAspect | null) => void;
  onInstrumentSearch?: (query: string) => void;
  instrumentQuery?: string;
  onRhythmSelect?: (value: string) => void;
  rhythmFilter?: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filterCategory,
  setFilterCategory,
  highlightAspect,
  setHighlightAspect,
  onInstrumentSearch,
  instrumentQuery,
  onRhythmSelect,
  rhythmFilter = '',
}) => {
  const [localInstr, setLocalInstr] = useState<string>('');
  const instrumentVal = instrumentQuery !== undefined ? instrumentQuery : localInstr;
  const handleSearch = () => {
    if (onInstrumentSearch) onInstrumentSearch(instrumentVal.trim());
  };
  const handleClear = () => {
    setLocalInstr('');
    if (onInstrumentSearch) onInstrumentSearch('');
  };

  const categories: { id: FilterCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Regions', icon: <Globe className="w-5 h-5" /> },
    { id: 'instruments', label: 'Instruments', icon: <Music2 className="w-5 h-5" /> },
    { id: 'rhythm', label: 'Rhythm & Tempo', icon: <Drum className="w-5 h-5" /> },
    { id: 'vocal', label: 'Vocal Style', icon: <Mic2 className="w-5 h-5" /> },
    { id: 'social', label: 'Social Context', icon: <Users className="w-5 h-5" /> },
    { id: 'language', label: 'Language', icon: <BookOpen className="w-5 h-5" /> },
  ];

  const aspects: { id: MusicalAspect; label: string }[] = [
    { id: 'melodic', label: 'Melodic Instruments' },
    { id: 'rhythmic', label: 'Rhythmic Patterns' },
    { id: 'scales', label: 'Scale Systems' },
    { id: 'ornamentation', label: 'Ornamentation' },
    { id: 'performance', label: 'Performance Context' },
    { id: 'heritage', label: 'Cultural Heritage' },
  ];

  return (
    <motion.div
      className="card space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Filter by Category</h2>
        <div className="space-y-2">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setFilterCategory(category.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                filterCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {category.icon}
              <span className="font-medium">{category.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* --- Instrument Search for Instruments tab only --- */}
      {filterCategory === 'instruments' && (
        <div className="sticky top-6 z-10 bg-white rounded-xl p-3 mt-3 mb-4 border border-gray-200 shadow-sm flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              value={instrumentVal}
              onChange={e => {
                setLocalInstr(e.target.value);
                if (onInstrumentSearch && instrumentQuery !== undefined) onInstrumentSearch(e.target.value);
              }}
              onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
              placeholder="Search instrument (e.g., dhol, veena, algoza)"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Instrument search"
            />
            <button
              onClick={handleSearch}
              className="px-3 py-2 bg-primary-600 text-white rounded-lg text-sm"
              aria-label="Find instrument on map"
            >Search</button>
            {instrumentVal && (
              <button
                onClick={handleClear}
                className="px-3 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm"
                aria-label="Clear search"
              >Clear</button>
            )}
          </div>
          <div className="text-xs text-gray-500 mt-1 ml-1">Highlight all states using this instrument</div>
        </div>
      )}

      {/* --- Rhythm & Tempo Select --- */}
      {filterCategory === 'rhythm' && (
        <div className="sticky top-6 z-10 bg-white rounded-xl p-3 mt-3 mb-4 border border-gray-200 shadow-sm flex flex-col gap-2">
          <label className="text-sm text-gray-700">Highlight by rhythm/tempo</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary-500"
            value={rhythmFilter}
            onChange={(e) => onRhythmSelect && onRhythmSelect(e.target.value)}
          >
            <option value="">All</option>
            <option>Slow</option>
            <option>Moderate</option>
            <option>Fast</option>
            <option>Accelerating</option>
            <option>Polyrhythmic</option>
            <option>Complex talas</option>
            <option>Teental</option>
            <option>Jhaptal</option>
            <option>Rupak</option>
            <option>Adi Tala</option>
            <option>Misra Chapu</option>
            <option>Khanda Chapu</option>
          </select>
          {rhythmFilter && (
            <button
              className="px-3 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm self-start"
              onClick={() => onRhythmSelect && onRhythmSelect('')}
            >Clear</button>
          )}
        </div>
      )}

      <div className="border-t pt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Musical Aspects</h2>
        <div className="space-y-2">
          {aspects.map((aspect) => (
            <motion.button
              key={aspect.id}
              onClick={() => setHighlightAspect(highlightAspect === aspect.id ? null : aspect.id)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all text-sm ${
                highlightAspect === aspect.id
                  ? 'bg-secondary-600 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {aspect.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Stats</h3>
        {(() => {
          const regions = musicalRegions;
          const terrainHas = (keyword: string) =>
            regions.filter(r => r.geography.terrain.some(t => t.toLowerCase().includes(keyword))).length;
          const desert = terrainHas('desert');
          const coastal = regions.filter(r => r.geography.terrain.some(t => t.toLowerCase().includes('coast')) || r.geography.terrain.some(t => t.toLowerCase().includes('coastal'))).length;
          const himalayan = regions.filter(r => r.geography.terrain.some(t => t.toLowerCase().includes('himalaya'))).length;
          const neIds = new Set(['assam','nagaland','manipur','mizoram','meghalaya','arunachalpradesh','tripura','sikkim']);
          const northeastern = regions.filter(r => neIds.has(r.id)).length;
          return (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Desert Regions:</span>
                <span className="font-semibold text-primary-600">{desert}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Coastal Regions:</span>
                <span className="font-semibold text-secondary-600">{coastal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Himalayan:</span>
                <span className="font-semibold text-primary-600">{himalayan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Northeastern:</span>
                <span className="font-semibold text-secondary-600">{northeastern}</span>
              </div>
            </div>
          );
        })()}
      </div>

      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-lg">
        <p className="text-xs text-gray-600 leading-relaxed">
          <strong>Tip:</strong> Click on any region to explore detailed information about its musical traditions, instruments, and cultural context.
        </p>
      </div>
    </motion.div>
  );
};

export default FilterPanel;
