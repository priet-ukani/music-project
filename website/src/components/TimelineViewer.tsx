import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Award, Music, TrendingUp, Users, Clock, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { musicalTimeline, getTimelineSorted, type TimelineEvent } from '../data/musicalTimeline';

interface TimelineViewerProps {
  isOpen: boolean;
  onClose: () => void;
  onRegionSelect?: (regionId: string) => void;
}

type CategoryFilter = TimelineEvent['category'] | 'all';
type ImportanceFilter = TimelineEvent['importance'] | 'all';

const categoryIcons = {
  tradition: Music,
  artist: Award,
  instrument: Music,
  period: Calendar,
  festival: Users,
  patronage: TrendingUp,
  movement: Users,
};

const categoryColors = {
  tradition: 'from-purple-500 to-pink-500',
  artist: 'from-yellow-500 to-orange-500',
  instrument: 'from-blue-500 to-cyan-500',
  period: 'from-green-500 to-emerald-500',
  festival: 'from-red-500 to-pink-500',
  patronage: 'from-indigo-500 to-purple-500',
  movement: 'from-teal-500 to-green-500',
};

export default function TimelineViewer({ isOpen, onClose, onRegionSelect }: TimelineViewerProps) {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [importanceFilter, setImportanceFilter] = useState<ImportanceFilter>('all');
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [currentPeriodIndex, setCurrentPeriodIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Filter events
  const filteredEvents = getTimelineSorted().filter(event => {
    if (categoryFilter !== 'all' && event.category !== categoryFilter) return false;
    if (importanceFilter !== 'all' && event.importance !== importanceFilter) return false;
    return true;
  });

  // Group events by historical periods
  const periods = [
    { name: 'Ancient Period', range: 'Pre-1000 CE', start: -2000, end: 1000 },
    { name: 'Medieval Period', range: '1000-1700 CE', start: 1000, end: 1700 },
    { name: 'Early Modern', range: '1700-1900', start: 1700, end: 1900 },
    { name: 'Colonial & Independence', range: '1900-1950', start: 1900, end: 1950 },
    { name: 'Post-Independence', range: '1950-2000', start: 1950, end: 2000 },
    { name: 'Contemporary', range: '2000-Present', start: 2000, end: 2030 },
  ];

  const currentPeriod = periods[currentPeriodIndex];
  const periodEvents = filteredEvents.filter(
    e => e.year >= currentPeriod.start && e.year < currentPeriod.end
  );

  // Auto-scroll to selected event
  useEffect(() => {
    if (selectedEvent && timelineRef.current) {
      const eventElement = document.getElementById(`event-${selectedEvent.id}`);
      if (eventElement) {
        eventElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedEvent]);

  const formatYear = (year: number) => {
    if (year < 0) return `${Math.abs(year)} BCE`;
    return `${year} CE`;
  };

  const handleRegionClick = (regionId: string) => {
    if (onRegionSelect) {
      onRegionSelect(regionId);
      onClose();
    }
  };

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

          {/* Timeline Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 h-[85vh] bg-gradient-to-t from-slate-900 via-indigo-900/20 to-slate-900 text-white shadow-2xl z-50 overflow-hidden flex flex-col rounded-t-3xl"
          >
            {/* Header */}
            <div className="bg-slate-900/95 backdrop-blur-md border-b border-indigo-500/30 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-indigo-400" />
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      Musical Timeline of India
                    </h2>
                    <p className="text-sm text-slate-400">Journey through 3,500+ years of musical heritage</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Period Navigation */}
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={() => setCurrentPeriodIndex(Math.max(0, currentPeriodIndex - 1))}
                  disabled={currentPeriodIndex === 0}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex-1 bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                  <div className="text-lg font-bold text-indigo-300">{currentPeriod.name}</div>
                  <div className="text-sm text-slate-400">{currentPeriod.range}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {periodEvents.length} events in this period
                  </div>
                </div>

                <button
                  onClick={() => setCurrentPeriodIndex(Math.min(periods.length - 1, currentPeriodIndex + 1))}
                  disabled={currentPeriodIndex === periods.length - 1}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-4 mt-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-400">Category:</span>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
                    className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="tradition">Traditions</option>
                    <option value="artist">Artists</option>
                    <option value="instrument">Instruments</option>
                    <option value="period">Periods</option>
                    <option value="festival">Festivals</option>
                    <option value="patronage">Patronage</option>
                    <option value="movement">Movements</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400">Importance:</span>
                  <select
                    value={importanceFilter}
                    onChange={(e) => setImportanceFilter(e.target.value as ImportanceFilter)}
                    className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="all">All Levels</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div className="ml-auto text-sm text-slate-400">
                  Showing {filteredEvents.length} of {musicalTimeline.length} events
                </div>
              </div>
            </div>

            {/* Timeline Content */}
            <div className="flex-1 overflow-hidden flex">
              {/* Timeline Scroll Area */}
              <div ref={timelineRef} className="flex-1 overflow-y-auto px-6 py-6">
                {periodEvents.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">No events in this period match your filters.</p>
                    <p className="text-sm text-slate-500 mt-2">Try adjusting your filters or navigating to a different period.</p>
                  </div>
                ) : (
                  <div className="relative">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500" />

                    {/* Events */}
                    <div className="space-y-8">
                      {periodEvents.map((event, idx) => {
                        const Icon = categoryIcons[event.category];
                        const isSelected = selectedEvent?.id === event.id;

                        return (
                          <motion.div
                            key={event.id}
                            id={`event-${event.id}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="relative pl-20"
                          >
                            {/* Timeline Node */}
                            <div className={`absolute left-5 top-4 w-6 h-6 rounded-full border-4 border-slate-900 bg-gradient-to-br ${categoryColors[event.category]} shadow-lg z-10`} />

                            {/* Event Card */}
                            <motion.div
                              onClick={() => setSelectedEvent(isSelected ? null : event)}
                              className={`bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border cursor-pointer transition-all ${
                                isSelected
                                  ? 'border-indigo-500 shadow-lg shadow-indigo-500/20'
                                  : 'border-slate-700/50 hover:border-slate-600'
                              }`}
                              whileHover={{ scale: 1.02 }}
                            >
                              {/* Header */}
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-3">
                                  <div className={`p-2 rounded-lg bg-gradient-to-br ${categoryColors[event.category]}`}>
                                    <Icon className="w-5 h-5 text-white" />
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-bold text-white">{event.title}</h3>
                                    <div className="flex items-center gap-3 mt-1">
                                      <span className="text-indigo-400 font-semibold">{formatYear(event.year)}</span>
                                      <span className="text-xs px-2 py-0.5 bg-slate-700/50 rounded capitalize">
                                        {event.category}
                                      </span>
                                      {event.importance === 'high' && (
                                        <span className="text-xs px-2 py-0.5 bg-yellow-600/20 text-yellow-400 rounded">
                                          ⭐ High Importance
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Description */}
                              <p className="text-sm text-slate-300 leading-relaxed">{event.description}</p>

                              {/* Related Regions */}
                              {(event.region || event.relatedRegions) && (
                                <div className="flex items-center gap-2 mt-3 flex-wrap">
                                  <MapPin className="w-4 h-4 text-slate-500" />
                                  <div className="flex gap-2 flex-wrap">
                                    {event.region && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleRegionClick(event.region!);
                                        }}
                                        className="text-xs px-2 py-1 bg-indigo-600/20 text-indigo-300 rounded hover:bg-indigo-600/30 transition-colors"
                                      >
                                        {event.region}
                                      </button>
                                    )}
                                    {event.relatedRegions?.map(regionId => (
                                      <button
                                        key={regionId}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleRegionClick(regionId);
                                        }}
                                        className="text-xs px-2 py-1 bg-slate-700/50 text-slate-400 rounded hover:bg-slate-600/50 transition-colors"
                                      >
                                        {regionId}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Period Overview Sidebar (Desktop) */}
              <div className="hidden lg:block w-80 bg-slate-900/50 border-l border-slate-700/50 p-6 overflow-y-auto">
                <h3 className="text-lg font-bold mb-4 text-indigo-300">All Periods</h3>
                <div className="space-y-3">
                  {periods.map((period, idx) => {
                    const count = filteredEvents.filter(
                      e => e.year >= period.start && e.year < period.end
                    ).length;

                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentPeriodIndex(idx)}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          idx === currentPeriodIndex
                            ? 'bg-indigo-600/20 border border-indigo-500/50'
                            : 'bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="font-semibold text-white text-sm">{period.name}</div>
                        <div className="text-xs text-slate-400 mt-1">{period.range}</div>
                        <div className="text-xs text-indigo-400 mt-1">{count} events</div>
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-8">
                  <h4 className="text-sm font-bold mb-3 text-slate-400">Categories</h4>
                  <div className="space-y-2">
                    {Object.entries(categoryColors).map(([category, color]) => (
                      <div key={category} className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${color}`} />
                        <span className="text-xs text-slate-400 capitalize">{category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
