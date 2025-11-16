import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Tag, Users, ExternalLink, Filter, X } from 'lucide-react';
import type { NewsCategory } from '../types/music';
import musicalNewsData from '../data/musicalNews';

interface MusicalNewsProps {
  selectedRegion?: string;
  limit?: number;
}

const categoryColors: Record<NewsCategory, string> = {
  festival: 'bg-purple-500',
  concert: 'bg-blue-500',
  award: 'bg-yellow-500',
  'cultural-event': 'bg-green-500',
  workshop: 'bg-orange-500',
  release: 'bg-pink-500'
};

const categoryIcons: Record<NewsCategory, string> = {
  festival: '🎊',
  concert: '🎵',
  award: '🏆',
  'cultural-event': '🎭',
  workshop: '📚',
  release: '💿'
};

export const MusicalNewsSection: React.FC<MusicalNewsProps> = ({ 
  selectedRegion, 
  limit 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('all');

  // Filter and sort news
  const filteredNews = useMemo(() => {
    let filtered = musicalNewsData;

    // Filter by selected region prop (from map click)
    if (selectedRegion) {
      filtered = filtered.filter(news => news.region === selectedRegion);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(news => news.category === selectedCategory);
    }

    // Filter by region dropdown
    if (selectedRegionFilter !== 'all') {
      filtered = filtered.filter(news => news.region === selectedRegionFilter);
    }

    // Sort by date (upcoming first, then featured)
    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      // Featured items first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // Then by date (upcoming events first)
      return dateA.getTime() - dateB.getTime();
    });

    // Apply limit if specified
    if (limit) {
      filtered = filtered.slice(0, limit);
    }

    return filtered;
  }, [selectedRegion, selectedCategory, selectedRegionFilter, limit]);

  // Get unique regions for filter
  const regions = useMemo(() => {
    const regionSet = new Set(musicalNewsData.map(news => news.region));
    return Array.from(regionSet).sort();
  }, []);

  // Format date
  const formatDate = (dateStr: string, endDateStr?: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    };
    
    if (endDateStr) {
      const endDate = new Date(endDateStr);
      return `${date.toLocaleDateString('en-IN', options)} - ${endDate.toLocaleDateString('en-IN', options)}`;
    }
    
    return date.toLocaleDateString('en-IN', options);
  };

  // Check if event is upcoming
  const isUpcoming = (dateStr: string) => {
    const eventDate = new Date(dateStr);
    const today = new Date();
    return eventDate >= today;
  };

  // Get region display name
  const getRegionName = (regionId: string) => {
    return regionId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Musical News & Events
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Stay updated with festivals, concerts, awards, and cultural events across India
        </motion.p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            {/* Category filters */}
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {(Object.keys(categoryColors) as NewsCategory[]).map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === category
                    ? `${categoryColors[category]} text-white`
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <span>{categoryIcons[category]}</span>
                {category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </button>
            ))}
          </div>

          {/* Region filter toggle */}
          {!selectedRegion && (
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filter by Region
            </button>
          )}
        </div>

        {/* Region dropdown */}
        <AnimatePresence>
          {showFilters && !selectedRegion && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex gap-2 items-center mb-4">
                <select
                  value={selectedRegionFilter}
                  onChange={(e) => setSelectedRegionFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Regions</option>
                  {regions.map(region => (
                    <option key={region} value={region}>
                      {getRegionName(region)}
                    </option>
                  ))}
                </select>
                {selectedRegionFilter !== 'all' && (
                  <button
                    onClick={() => setSelectedRegionFilter('all')}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results count */}
      <div className="mb-6 text-sm text-gray-600">
        Showing {filteredNews.length} {filteredNews.length === 1 ? 'event' : 'events'}
        {selectedRegion && ` in ${getRegionName(selectedRegion)}`}
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredNews.map((news, index) => (
            <motion.div
              key={news.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Category badge */}
              <div className="relative">
                <div className={`absolute top-4 left-4 ${categoryColors[news.category]} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 z-10`}>
                  <span>{categoryIcons[news.category]}</span>
                  {news.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </div>
                
                {news.featured && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold z-10">
                    ⭐ Featured
                  </div>
                )}

                {/* Upcoming badge */}
                {isUpcoming(news.date) && (
                  <div className="absolute bottom-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
                    Upcoming
                  </div>
                )}

                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
                  {news.imageUrl && (
                    <img 
                      src={news.imageUrl} 
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {news.title}
                </h3>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(news.date, news.endDate)}</span>
                  </div>
                  
                  {news.city && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{news.city}, {getRegionName(news.region)}</span>
                    </div>
                  )}

                  {news.artists && news.artists.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="line-clamp-1">{news.artists.join(', ')}</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {news.description}
                </p>

                {/* Tags */}
                {news.tags && news.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {news.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action button */}
                {news.ticketUrl && (
                  <a
                    href={news.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <span>Get Tickets</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filteredNews.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 text-lg mb-4">No events found matching your filters.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedRegionFilter('all');
            }}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Clear Filters
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default MusicalNewsSection;
