import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Music2, Mic2, Users, Award, Calendar, X, ChevronDown, ChevronUp, 
  Filter as FilterIcon, RotateCcw, Search 
} from 'lucide-react';
import regionalArtistsEnhanced from '../data/regionalArtistsEnhanced';
import { musicalRegions } from '../data/regions';

export interface AdvancedFilters {
  genres: string[];
  instruments: string[];
  artistStatus: 'all' | 'living' | 'deceased';
  awards: string[];
  communities: string[];
  timePeriods: string[];
  searchQuery: string;
}

interface AdvancedFilterPanelProps {
  filters: AdvancedFilters;
  onFiltersChange: (filters: AdvancedFilters) => void;
  onReset: () => void;
  matchCount: number;
}

const AdvancedFilterPanel: React.FC<AdvancedFilterPanelProps> = ({
  filters,
  onFiltersChange,
  onReset,
  matchCount,
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['genres', 'instruments', 'status'])
  );

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  // Extract unique values from data
  const allGenres = new Set<string>();
  const allInstruments = new Set<string>();
  const allAwards = new Set<string>();
  const allCommunities = new Set<string>();
  const allTimePeriods = new Set<string>();

  // Collect from artists
  Object.values(regionalArtistsEnhanced).forEach((stateArtists) => {
    stateArtists.forEach((artist) => {
      artist.genres?.forEach((g) => allGenres.add(g));
      artist.instruments?.forEach((i) => allInstruments.add(i));
      artist.awards?.forEach((a) => allAwards.add(a.name));
      if (artist.community) allCommunities.add(artist.community);
      if (artist.activeYears) {
        const years = artist.activeYears.split('-');
        const startYear = parseInt(years[0]);
        if (!isNaN(startYear)) {
          if (startYear < 1950) allTimePeriods.add('Before 1950');
          else if (startYear < 1980) allTimePeriods.add('1950-1980');
          else if (startYear < 2000) allTimePeriods.add('1980-2000');
          else allTimePeriods.add('2000-Present');
        }
      }
    });
  });

  // Collect from regions
  musicalRegions.forEach((region) => {
    region.instruments.melodic.forEach((i) => allInstruments.add(i));
    region.instruments.rhythmic.forEach((i) => allInstruments.add(i));
    region.instruments.unique.forEach((i) => allInstruments.add(i));
  });

  const genres = Array.from(allGenres).sort();
  const instruments = Array.from(allInstruments).sort();
  const awards = Array.from(allAwards).sort();
  const communities = Array.from(allCommunities).sort();
  const timePeriods = Array.from(allTimePeriods).sort();

  const handleToggleFilter = (
    category: keyof Pick<AdvancedFilters, 'genres' | 'instruments' | 'awards' | 'communities' | 'timePeriods'>,
    value: string
  ) => {
    const currentValues = filters[category];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    
    onFiltersChange({ ...filters, [category]: newValues });
  };

  const handleStatusChange = (status: 'all' | 'living' | 'deceased') => {
    onFiltersChange({ ...filters, artistStatus: status });
  };

  const handleSearchChange = (query: string) => {
    onFiltersChange({ ...filters, searchQuery: query });
  };

  const activeFilterCount = 
    filters.genres.length +
    filters.instruments.length +
    filters.awards.length +
    filters.communities.length +
    filters.timePeriods.length +
    (filters.artistStatus !== 'all' ? 1 : 0) +
    (filters.searchQuery ? 1 : 0);

  return (
    <motion.div
      className="card space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 pb-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FilterIcon className="w-5 h-5 text-primary-600" />
            <h2 className="text-xl font-bold text-gray-800">Advanced Filters</h2>
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary-600 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset All
            </button>
          )}
        </div>
        
        {/* Active Filter Count */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            {activeFilterCount > 0 ? (
              <span className="font-medium text-primary-600">
                {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
              </span>
            ) : (
              'No filters applied'
            )}
          </span>
          <span className="font-semibold text-secondary-600">
            {matchCount} match{matchCount !== 1 ? 'es' : ''}
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-400" />
          <label className="text-sm font-semibold text-gray-700">Search Artists/Regions</label>
        </div>
        <div className="relative">
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by name, genre, instrument..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          {filters.searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Artist Status Filter */}
      <FilterSection
        title="Artist Status"
        icon={<Users className="w-4 h-4" />}
        isExpanded={expandedSections.has('status')}
        onToggle={() => toggleSection('status')}
        count={filters.artistStatus !== 'all' ? 1 : 0}
      >
        <div className="space-y-2">
          {(['all', 'living', 'deceased'] as const).map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                filters.artistStatus === status
                  ? 'bg-primary-100 text-primary-800 font-medium'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {status === 'all' && '🌐 All Artists'}
              {status === 'living' && '🟢 Living Artists'}
              {status === 'deceased' && '⚪ Deceased Artists'}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Genres Filter */}
      <FilterSection
        title="Genres"
        icon={<Music2 className="w-4 h-4" />}
        isExpanded={expandedSections.has('genres')}
        onToggle={() => toggleSection('genres')}
        count={filters.genres.length}
      >
        <div className="space-y-1 max-h-60 overflow-y-auto">
          {genres.map((genre) => (
            <CheckboxItem
              key={genre}
              label={genre}
              checked={filters.genres.includes(genre)}
              onChange={() => handleToggleFilter('genres', genre)}
            />
          ))}
          {genres.length === 0 && (
            <p className="text-sm text-gray-500 italic">No genres available</p>
          )}
        </div>
      </FilterSection>

      {/* Instruments Filter */}
      <FilterSection
        title="Instruments"
        icon={<Mic2 className="w-4 h-4" />}
        isExpanded={expandedSections.has('instruments')}
        onToggle={() => toggleSection('instruments')}
        count={filters.instruments.length}
      >
        <div className="space-y-1 max-h-60 overflow-y-auto">
          {instruments.slice(0, 20).map((instrument) => (
            <CheckboxItem
              key={instrument}
              label={instrument}
              checked={filters.instruments.includes(instrument)}
              onChange={() => handleToggleFilter('instruments', instrument)}
            />
          ))}
          {instruments.length > 20 && (
            <p className="text-xs text-gray-500 mt-2">
              + {instruments.length - 20} more instruments (use search)
            </p>
          )}
        </div>
      </FilterSection>

      {/* Awards Filter */}
      <FilterSection
        title="Awards & Recognition"
        icon={<Award className="w-4 h-4" />}
        isExpanded={expandedSections.has('awards')}
        onToggle={() => toggleSection('awards')}
        count={filters.awards.length}
      >
        <div className="space-y-1 max-h-60 overflow-y-auto">
          {awards.map((award) => (
            <CheckboxItem
              key={award}
              label={award}
              checked={filters.awards.includes(award)}
              onChange={() => handleToggleFilter('awards', award)}
            />
          ))}
          {awards.length === 0 && (
            <p className="text-sm text-gray-500 italic">No awards data available</p>
          )}
        </div>
      </FilterSection>

      {/* Communities Filter */}
      <FilterSection
        title="Communities & Gharanas"
        icon={<Users className="w-4 h-4" />}
        isExpanded={expandedSections.has('communities')}
        onToggle={() => toggleSection('communities')}
        count={filters.communities.length}
      >
        <div className="space-y-1 max-h-60 overflow-y-auto">
          {communities.map((community) => (
            <CheckboxItem
              key={community}
              label={community}
              checked={filters.communities.includes(community)}
              onChange={() => handleToggleFilter('communities', community)}
            />
          ))}
          {communities.length === 0 && (
            <p className="text-sm text-gray-500 italic">No community data available</p>
          )}
        </div>
      </FilterSection>

      {/* Time Period Filter */}
      <FilterSection
        title="Time Period"
        icon={<Calendar className="w-4 h-4" />}
        isExpanded={expandedSections.has('timePeriod')}
        onToggle={() => toggleSection('timePeriod')}
        count={filters.timePeriods.length}
      >
        <div className="space-y-1">
          {timePeriods.map((period) => (
            <CheckboxItem
              key={period}
              label={period}
              checked={filters.timePeriods.includes(period)}
              onChange={() => handleToggleFilter('timePeriods', period)}
            />
          ))}
          {timePeriods.length === 0 && (
            <p className="text-sm text-gray-500 italic">No time period data available</p>
          )}
        </div>
      </FilterSection>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-lg space-y-2">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Database Stats</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600">Regions:</span>
            <span className="font-semibold">{musicalRegions.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Artists:</span>
            <span className="font-semibold">
              {Object.values(regionalArtistsEnhanced).reduce(
                (sum, arr) => sum + arr.length,
                0
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Genres:</span>
            <span className="font-semibold">{genres.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Instruments:</span>
            <span className="font-semibold">{instruments.length}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Helper Components
interface FilterSectionProps {
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  count: number;
  children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  icon,
  isExpanded,
  onToggle,
  count,
  children,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-gray-600">{icon}</span>
          <span className="font-semibold text-gray-800 text-sm">{title}</span>
          {count > 0 && (
            <span className="bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-3 bg-white">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface CheckboxItemProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
      />
      <span className="text-sm text-gray-700 group-hover:text-gray-900">{label}</span>
    </label>
  );
};

export default AdvancedFilterPanel;
