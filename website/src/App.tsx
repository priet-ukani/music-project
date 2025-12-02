import { useState, useMemo, useEffect } from 'react';
import { Music, Filter, Sparkles, BookOpen, BarChart3, Search, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import IndiaMapAccurate from './components/IndiaMapAccurate';
import AdvancedFilterPanel, { type AdvancedFilters } from './components/AdvancedFilterPanel';
import RegionModal from './components/RegionModal';
import AudioPlayer from './components/AudioPlayer';
import MusicalNewsSection from './components/MusicalNewsSection';
import EducationalOverlay from './components/EducationalOverlay';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import AdvancedSearch from './components/AdvancedSearch';
import TimelineViewer from './components/TimelineViewer';
import { musicalRegions } from './data/regions';
import regionalArtistsEnhanced from './data/regionalArtistsEnhanced';
import type { MusicalRegion } from './types/music';
import { useIsMobile } from './utils/mobileOptimizations';

function App() {
  const [selectedRegion, setSelectedRegion] = useState<MusicalRegion | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [showEducational, setShowEducational] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  
  // Mobile detection
  const isMobile = useIsMobile();
  
  // Auto-hide filters on mobile
  useEffect(() => {
    if (isMobile) {
      setShowFilters(false);
    } else {
      setShowFilters(true);
    }
  }, [isMobile]);
  
  // Advanced Filters State
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({
    genres: [],
    instruments: [],
    artistStatus: 'all',
    awards: [],
    communities: [],
    timePeriods: [],
    searchQuery: '',
  });

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Log when selectedRegion changes
  console.log('Current selectedRegion:', selectedRegion?.name || 'null');

  // Calculate matched regions and artists based on advanced filters
  const { matchedRegions, matchedArtistCount } = useMemo(() => {
    const matched = new Set<string>();
    let artistCount = 0;
    const hasFilters = 
      advancedFilters.genres.length > 0 ||
      advancedFilters.instruments.length > 0 ||
      advancedFilters.awards.length > 0 ||
      advancedFilters.communities.length > 0 ||
      advancedFilters.timePeriods.length > 0 ||
      advancedFilters.artistStatus !== 'all' ||
      advancedFilters.searchQuery.trim() !== '';

    if (!hasFilters) {
      return { matchedRegions: new Set<string>(), matchedArtistCount: 0 };
    }

    const searchLower = advancedFilters.searchQuery.toLowerCase();

    // Check each region
    musicalRegions.forEach((region) => {
      let regionMatches = false;

      // Search query match (region name, description, instruments)
      if (searchLower) {
        const nameMatch = region.name.toLowerCase().includes(searchLower);
        const descMatch = region.description.toLowerCase().includes(searchLower);
        const instrMatch = 
          region.instruments.melodic.some(i => i.toLowerCase().includes(searchLower)) ||
          region.instruments.rhythmic.some(i => i.toLowerCase().includes(searchLower)) ||
          region.instruments.unique.some(i => i.toLowerCase().includes(searchLower));
        
        if (nameMatch || descMatch || instrMatch) {
          regionMatches = true;
        }
      }

      // Instrument filter
      if (advancedFilters.instruments.length > 0) {
        const hasInstrument = advancedFilters.instruments.some((filterInstr) =>
          region.instruments.melodic.some(i => i.toLowerCase().includes(filterInstr.toLowerCase())) ||
          region.instruments.rhythmic.some(i => i.toLowerCase().includes(filterInstr.toLowerCase())) ||
          region.instruments.unique.some(i => i.toLowerCase().includes(filterInstr.toLowerCase()))
        );
        if (hasInstrument) {
          regionMatches = true;
        }
      }

      // Check artists in this region
      const regionArtists = regionalArtistsEnhanced[region.id] || [];
      const matchingArtists = regionArtists.filter((artist) => {
        let matches = true;

        // Search query
        if (searchLower) {
          const nameMatch = artist.name.toLowerCase().includes(searchLower);
          const genreMatch = artist.genres?.some(g => g.toLowerCase().includes(searchLower)) || false;
          const instrMatch = artist.instruments?.some(i => i.toLowerCase().includes(searchLower)) || false;
          if (!nameMatch && !genreMatch && !instrMatch) {
            matches = false;
          }
        }

        // Genre filter
        if (matches && advancedFilters.genres.length > 0) {
          matches = artist.genres?.some(g => advancedFilters.genres.includes(g)) || false;
        }

        // Instrument filter
        if (matches && advancedFilters.instruments.length > 0) {
          matches = artist.instruments?.some(i => advancedFilters.instruments.includes(i)) || false;
        }

        // Status filter
        if (matches && advancedFilters.artistStatus !== 'all') {
          matches = artist.status === advancedFilters.artistStatus;
        }

        // Awards filter
        if (matches && advancedFilters.awards.length > 0) {
          matches = artist.awards?.some(a => advancedFilters.awards.includes(a.name)) || false;
        }

        // Community filter
        if (matches && advancedFilters.communities.length > 0) {
          matches = artist.community ? advancedFilters.communities.includes(artist.community) : false;
        }

        // Time period filter
        if (matches && advancedFilters.timePeriods.length > 0) {
          if (artist.activeYears) {
            const years = artist.activeYears.split('-');
            const startYear = parseInt(years[0]);
            if (!isNaN(startYear)) {
              let period = '';
              if (startYear < 1950) period = 'Before 1950';
              else if (startYear < 1980) period = '1950-1980';
              else if (startYear < 2000) period = '1980-2000';
              else period = '2000-Present';
              matches = advancedFilters.timePeriods.includes(period);
            } else {
              matches = false;
            }
          } else {
            matches = false;
          }
        }

        return matches;
      });

      if (matchingArtists.length > 0) {
        regionMatches = true;
        artistCount += matchingArtists.length;
      }

      if (regionMatches) {
        matched.add(region.id);
      }
    });

    return { matchedRegions: matched, matchedArtistCount: artistCount };
  }, [advancedFilters]);

  const handleRegionSelect = (regionId: string | null) => {
    console.log('handleRegionSelect called with:', regionId);
    if (regionId) {
      const region = musicalRegions.find((r) => r.id === regionId);
      console.log('Found region:', region);
      if (region) {
        console.log('Setting selectedRegion to:', region.name);
        setSelectedRegion(region);
      }
    } else {
      console.log('Clearing selectedRegion');
      setSelectedRegion(null);
    }
  };

  const handleCloseModal = () => {
    console.log('handleCloseModal called');
    console.trace('Close modal stack trace');
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
            
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => setShowAdvancedSearch(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-5 h-5" />
                <span className="hidden md:inline">Search</span>
              </motion.button>

              <motion.button
                onClick={() => setShowAnalytics(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BarChart3 className="w-5 h-5" />
                <span className="hidden md:inline">Analytics</span>
              </motion.button>

              <motion.button
                onClick={() => setShowTimeline(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Clock className="w-5 h-5" />
                <span className="hidden md:inline">Timeline</span>
              </motion.button>

              <motion.button
                onClick={() => setShowEducational(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen className="w-5 h-5" />
                <span className="hidden md:inline">Learn</span>
              </motion.button>

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
          </div>
          
          {/* Info Banner with Parallax Effect */}
          <motion.div 
            className="mt-4 flex items-start space-x-2 bg-gradient-to-r from-primary-50 via-orange-50 to-secondary-50 p-4 rounded-lg border border-orange-200 shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          >
            <Sparkles className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5 animate-pulse" />
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-1">
                🎵 Discover India's Musical Heritage
              </p>
              <p className="text-xs text-gray-600">
                Explore 13+ regions • 42+ artists • 50+ instruments • Interactive filtering • Soundscape mixer • 360° views
              </p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Advanced Filter Panel */}
          {showFilters && (
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <AdvancedFilterPanel
                filters={advancedFilters}
                onFiltersChange={setAdvancedFilters}
                onReset={() => setAdvancedFilters({
                  genres: [],
                  instruments: [],
                  artistStatus: 'all',
                  awards: [],
                  communities: [],
                  timePeriods: [],
                  searchQuery: '',
                })}
                matchCount={matchedRegions.size + matchedArtistCount}
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
              <IndiaMapAccurate
                selectedRegion={selectedRegion?.id || null}
                onRegionSelect={handleRegionSelect}
                matchedRegions={matchedRegions}
              />
            </div>

            {/* Region Stats with Staggered Animation */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {[
                { value: musicalRegions.length, label: 'Regions', color: 'primary', icon: '🗺️' },
                { value: '50+', label: 'Instruments', color: 'secondary', icon: '🎸' },
                { value: '42+', label: 'Artists', color: 'primary', icon: '🎤' },
                { value: '100+', label: 'Traditions', color: 'secondary', icon: '✨' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="card text-center hover:shadow-lg transition-shadow cursor-pointer group"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 100 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className={`text-3xl font-bold ${
                    stat.color === 'primary' ? 'text-primary-600' : 'text-secondary-600'
                  } group-hover:scale-110 transition-transform`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
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
      <AnimatePresence>
        {selectedRegion && (
          <RegionModal
            region={selectedRegion}
            onClose={handleCloseModal}
            onPlayAudio={setCurrentAudio}
          />
        )}
      </AnimatePresence>

      {/* Musical News Section */}
      <section className="bg-gray-50 py-16">
        <MusicalNewsSection selectedRegion={selectedRegion?.id} limit={6} />
      </section>

      {/* Educational Overlay */}
      <EducationalOverlay
        isOpen={showEducational}
        onClose={() => setShowEducational(false)}
      />

      {/* Analytics Dashboard */}
      <AnalyticsDashboard
        isOpen={showAnalytics}
        onClose={() => setShowAnalytics(false)}
      />

      {/* Advanced Search */}
      <AdvancedSearch
        isOpen={showAdvancedSearch}
        onClose={() => setShowAdvancedSearch(false)}
        onRegionSelect={handleRegionSelect}
      />

      {/* Timeline Viewer */}
      <TimelineViewer
        isOpen={showTimeline}
        onClose={() => setShowTimeline(false)}
        onRegionSelect={handleRegionSelect}
      />

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
