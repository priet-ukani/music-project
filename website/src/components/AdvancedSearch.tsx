import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Filter, Music, Globe, Clock, Scale, Users, ChevronDown, ChevronUp } from 'lucide-react';
import {
  searchRegions,
  getAllInstruments,
  getAllLinguisticFamilies,
  getAllTempoRanges,
  getAllScaleTypes,
  getAutocompleteSuggestions,
  type SearchFilters,
  type SearchResult,
} from '../utils/searchHelpers';
import { musicalRegions } from '../data/regions';

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onRegionSelect: (regionId: string) => void;
}

export default function AdvancedSearch({ isOpen, onClose, onRegionSelect }: AdvancedSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filters state
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    regions: [],
    instruments: [],
    genres: [],
    linguisticFamilies: [],
    hereditaryOnly: false,
    tempoRange: undefined,
    scaleType: undefined,
  });

  // Get all available options for filters
  const allInstruments = getAllInstruments();
  const allLinguisticFamilies = getAllLinguisticFamilies();
  const allTempoRanges = getAllTempoRanges();
  const allScaleTypes = getAllScaleTypes();

  // Load search history from localStorage
  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // Save search to history
  const saveToHistory = (query: string) => {
    if (!query.trim()) return;
    
    const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  // Handle search
  useEffect(() => {
    const updatedFilters = { ...filters, query: searchQuery };
    const results = searchRegions(updatedFilters);
    setSearchResults(results);
  }, [searchQuery, filters]);

  // Handle autocomplete
  useEffect(() => {
    if (searchQuery.trim()) {
      const suggestions = getAutocompleteSuggestions(searchQuery);
      setAutocompleteSuggestions(suggestions);
    } else {
      setAutocompleteSuggestions([]);
    }
  }, [searchQuery]);

  // Handle filter changes
  const toggleArrayFilter = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => {
      const currentArray = prev[key] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(v => v !== value)
        : [...currentArray, value];
      return { ...prev, [key]: newArray };
    });
  };

  const handleRegionClick = (regionId: string) => {
    onRegionSelect(regionId);
    saveToHistory(searchQuery);
    onClose();
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      regions: [],
      instruments: [],
      genres: [],
      linguisticFamilies: [],
      hereditaryOnly: false,
      tempoRange: undefined,
      scaleType: undefined,
    });
    setSearchQuery('');
  };

  const activeFilterCount = 
    filters.regions.length + 
    filters.instruments.length + 
    filters.genres.length + 
    filters.linguisticFamilies.length + 
    (filters.hereditaryOnly ? 1 : 0) + 
    (filters.tempoRange ? 1 : 0) + 
    (filters.scaleType ? 1 : 0);

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

          {/* Search Panel */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 right-0 h-[90vh] bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 text-white shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-slate-900/95 backdrop-blur-md border-b border-purple-500/30 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Search className="w-8 h-8 text-purple-400" />
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Advanced Search
                  </h2>
                  <p className="text-sm text-slate-400">Find regions by instruments, genres, and more</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Search Input */}
            <div className="px-6 py-4 border-b border-slate-700/50">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowAutocomplete(true)}
                  onBlur={() => setTimeout(() => setShowAutocomplete(false), 200)}
                  placeholder="Search by region, instrument, genre, community..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
                />

                {/* Autocomplete Dropdown */}
                {showAutocomplete && (autocompleteSuggestions.length > 0 || searchHistory.length > 0) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full mt-2 left-0 right-0 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl max-h-64 overflow-y-auto z-10"
                  >
                    {searchQuery.trim() ? (
                      <>
                        <div className="px-4 py-2 text-xs text-slate-400 font-medium">Suggestions</div>
                        {autocompleteSuggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setSearchQuery(suggestion);
                              setShowAutocomplete(false);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-slate-700 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-2 text-xs text-slate-400 font-medium">Recent Searches</div>
                        {searchHistory.map((query, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setSearchQuery(query);
                              setShowAutocomplete(false);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-slate-700 transition-colors flex items-center gap-2"
                          >
                            <Clock className="w-4 h-4 text-slate-500" />
                            {query}
                          </button>
                        ))}
                      </>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Filter Toggle */}
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg transition-all"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                  {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Clear all filters
                  </button>
                )}

                <div className="ml-auto text-sm text-slate-400">
                  {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
                </div>
              </div>
            </div>

            {/* Filters Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-b border-slate-700/50 overflow-hidden"
                >
                  <div className="px-6 py-4 space-y-4 max-h-64 overflow-y-auto">
                    {/* Region Filter */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                        <Globe className="w-4 h-4" />
                        Regions
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {musicalRegions.map(region => (
                          <button
                            key={region.id}
                            onClick={() => toggleArrayFilter('regions', region.id)}
                            className={`px-3 py-1 text-sm rounded-lg transition-all ${
                              filters.regions.includes(region.id)
                                ? 'bg-purple-600 text-white'
                                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                            }`}
                          >
                            {region.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Instrument Filter */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                        <Music className="w-4 h-4" />
                        Instruments (Top 15)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {allInstruments.slice(0, 15).map(instrument => (
                          <button
                            key={instrument}
                            onClick={() => toggleArrayFilter('instruments', instrument)}
                            className={`px-3 py-1 text-sm rounded-lg transition-all ${
                              filters.instruments.includes(instrument)
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                            }`}
                          >
                            {instrument}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Linguistic Family Filter */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                        <Globe className="w-4 h-4" />
                        Linguistic Families
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {allLinguisticFamilies.map(family => (
                          <button
                            key={family}
                            onClick={() => toggleArrayFilter('linguisticFamilies', family)}
                            className={`px-3 py-1 text-sm rounded-lg transition-all ${
                              filters.linguisticFamilies.includes(family)
                                ? 'bg-green-600 text-white'
                                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                            }`}
                          >
                            {family}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Hereditary Toggle */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                        <Users className="w-4 h-4" />
                        <input
                          type="checkbox"
                          checked={filters.hereditaryOnly}
                          onChange={(e) => setFilters(prev => ({ ...prev, hereditaryOnly: e.target.checked }))}
                          className="w-4 h-4 rounded border-slate-600 text-purple-600 focus:ring-purple-500"
                        />
                        Hereditary Traditions Only
                      </label>
                    </div>

                    {/* Tempo and Scale in one row */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Tempo Filter */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                          <Clock className="w-4 h-4" />
                          Tempo Range
                        </label>
                        <select
                          value={filters.tempoRange || ''}
                          onChange={(e) => setFilters(prev => ({ ...prev, tempoRange: e.target.value || undefined }))}
                          className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        >
                          <option value="">All Tempos</option>
                          {allTempoRanges.map(tempo => (
                            <option key={tempo} value={tempo}>{tempo}</option>
                          ))}
                        </select>
                      </div>

                      {/* Scale Filter */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                          <Scale className="w-4 h-4" />
                          Scale Type
                        </label>
                        <select
                          value={filters.scaleType || ''}
                          onChange={(e) => setFilters(prev => ({ ...prev, scaleType: e.target.value || undefined }))}
                          className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        >
                          <option value="">All Scales</option>
                          {allScaleTypes.map(scale => (
                            <option key={scale} value={scale}>{scale}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {searchResults.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">No results found. Try adjusting your filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map((result, idx) => (
                    <motion.div
                      key={result.region.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => handleRegionClick(result.region.id)}
                      className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700/50 hover:border-purple-500/50 cursor-pointer transition-all group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                            {result.region.name}
                          </h3>
                          {result.score > 0 && (
                            <div className="text-xs text-purple-400 mt-1">
                              Match score: {result.score.toFixed(1)}
                            </div>
                          )}
                        </div>
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: result.region.color }}
                        />
                      </div>

                      <p className="text-sm text-slate-300 line-clamp-2 mb-3">
                        {result.region.description}
                      </p>

                      {result.matchedFields.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {result.matchedFields.map(field => (
                            <span
                              key={field}
                              className="px-2 py-0.5 bg-purple-600/20 text-purple-300 text-xs rounded"
                            >
                              {field}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Music className="w-3 h-3" />
                        {result.region.instruments.melodic.length + result.region.instruments.rhythmic.length} instruments
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
