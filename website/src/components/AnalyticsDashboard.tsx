import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BarChart3, PieChart, TrendingUp, Music, Users, Globe } from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart as RechartsPie,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import {
  getRegionalDistribution,
  getInstrumentDistribution,
  getTempoDistribution,
  getSocialContextStats,
  getVocalStyleDistribution,
  getLinguisticDistribution,
  getScaleDistribution,
  getStatisticsSummary,
} from '../utils/analyticsHelpers';

interface AnalyticsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

type ChartView = 'overview' | 'instruments' | 'social' | 'musical';

const COLORS = [
  '#f39f37', '#00879b', '#e74c3c', '#9b59b6', '#27ae60',
  '#f39c12', '#3498db', '#e67e22', '#2ecc71', '#95a5a6',
  '#16a085', '#c0392b', '#8e44ad', '#d35400', '#2c3e50',
];

export default function AnalyticsDashboard({ isOpen, onClose }: AnalyticsDashboardProps) {
  const [currentView, setCurrentView] = useState<ChartView>('overview');

  // Get all analytics data
  const stats = getStatisticsSummary();
  const instruments = getInstrumentDistribution();
  const tempos = getTempoDistribution();
  const socialContext = getSocialContextStats();
  const vocalStyles = getVocalStyleDistribution();
  const linguistics = getLinguisticDistribution();
  const scales = getScaleDistribution();

  // Prepare data for charts
  const instrumentCategoryData = [
    { category: 'Melodic', count: instruments.filter(i => i.category === 'melodic').length },
    { category: 'Rhythmic', count: instruments.filter(i => i.category === 'rhythmic').length },
    { category: 'Unique', count: instruments.filter(i => i.category === 'unique').length },
  ];

  const hereditaryData = [
    { name: 'Hereditary', value: socialContext.hereditaryCount },
    { name: 'Non-Hereditary', value: socialContext.nonHereditaryCount },
  ];

  const topInstruments = instruments.slice(0, 10).map(i => ({
    name: i.instrument.length > 15 ? i.instrument.slice(0, 15) + '...' : i.instrument,
    count: i.count,
  }));

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

          {/* Dashboard Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-4/5 lg:w-3/4 xl:w-2/3 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md border-b border-purple-500/30 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-purple-400" />
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Analytics Dashboard
                  </h2>
                  <p className="text-sm text-slate-400">Musical Map of India - Data Insights</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="px-6 py-4 border-b border-slate-700/50">
              <div className="flex gap-2 flex-wrap">
                {[
                  { id: 'overview', label: 'Overview', icon: TrendingUp },
                  { id: 'instruments', label: 'Instruments', icon: Music },
                  { id: 'social', label: 'Social Context', icon: Users },
                  { id: 'musical', label: 'Musical Elements', icon: Globe },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentView(tab.id as ChartView)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      currentView === tab.id
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 space-y-6">
              {/* Overview Tab */}
              {currentView === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[
                      { label: 'Regions', value: stats.totalRegions, color: 'from-purple-500 to-pink-500' },
                      { label: 'Instruments', value: stats.totalInstruments, color: 'from-blue-500 to-cyan-500' },
                      { label: 'Languages', value: stats.totalLanguages, color: 'from-green-500 to-emerald-500' },
                      { label: 'Communities', value: stats.totalCommunities, color: 'from-orange-500 to-red-500' },
                      { label: 'Hereditary', value: stats.hereditaryTraditions, color: 'from-yellow-500 to-orange-500' },
                    ].map((stat, idx) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700/50 hover:border-purple-500/50 transition-all"
                      >
                        <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                          {stat.value}
                        </div>
                        <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Linguistic Families */}
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-400" />
                      Linguistic Families Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={linguistics}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="family" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                          labelStyle={{ color: '#e2e8f0' }}
                        />
                        <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Tempo Distribution */}
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                    <h3 className="text-xl font-bold mb-4">Tempo Ranges Across Regions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tempos.map((tempo, idx) => (
                        <div key={tempo.tempoRange} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${COLORS[idx % COLORS.length]} flex items-center justify-center text-lg font-bold`}>
                            {tempo.count}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{tempo.tempoRange}</div>
                            <div className="text-xs text-slate-400">{tempo.regions.slice(0, 2).join(', ')}...</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Instruments Tab */}
              {currentView === 'instruments' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Instrument Categories Pie Chart */}
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <PieChart className="w-5 h-5 text-purple-400" />
                      Instrument Categories
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPie>
                        <Pie
                          data={instrumentCategoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ category, count }) => `${category}: ${count}`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {instrumentCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                        />
                      </RechartsPie>
                    </ResponsiveContainer>
                  </div>

                  {/* Top 10 Instruments Bar Chart */}
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                    <h3 className="text-xl font-bold mb-4">Most Common Instruments (by regions)</h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={topInstruments} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis type="number" stroke="#94a3b8" />
                        <YAxis dataKey="name" type="category" width={120} stroke="#94a3b8" />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                        />
                        <Bar dataKey="count" fill="#a855f7" radius={[0, 8, 8, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Instrument Details Grid */}
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                    <h3 className="text-xl font-bold mb-4">Instrument Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {instruments.slice(0, 12).map((instrument) => (
                        <div
                          key={instrument.instrument}
                          className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/30 hover:border-purple-500/50 transition-all"
                        >
                          <div className="font-semibold text-purple-300">{instrument.instrument}</div>
                          <div className="text-xs text-slate-400 mt-1 capitalize">{instrument.category}</div>
                          <div className="text-sm text-slate-300 mt-2">Used in {instrument.count} regions</div>
                          <div className="text-xs text-slate-500 mt-1">
                            {instrument.regions.slice(0, 2).join(', ')}
                            {instrument.regions.length > 2 && ` +${instrument.regions.length - 2} more`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Social Context Tab */}
              {currentView === 'social' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Hereditary Traditions Pie Chart */}
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                    <h3 className="text-xl font-bold mb-4">Hereditary vs Non-Hereditary Traditions</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPie>
                        <Pie
                          data={hereditaryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          <Cell fill="#10b981" />
                          <Cell fill="#f59e0b" />
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                        />
                      </RechartsPie>
                    </ResponsiveContainer>
                  </div>

                  {/* Musician Castes/Communities */}
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                    <h3 className="text-xl font-bold mb-4">Traditional Musician Communities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {socialContext.castes.map((caste, idx) => (
                        <div
                          key={caste.name}
                          className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-4 border border-slate-700/50"
                        >
                          <div className={`text-2xl font-bold bg-gradient-to-r ${COLORS[idx % COLORS.length]} bg-clip-text text-transparent`}>
                            {caste.count}
                          </div>
                          <div className="text-sm text-slate-300 mt-1">{caste.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Patronage Systems */}
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                    <h3 className="text-xl font-bold mb-4">Patronage Systems</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={socialContext.patronageTypes}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="type" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                        />
                        <Bar dataKey="count" fill="#ec4899" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              )}

              {/* Musical Elements Tab */}
              {currentView === 'musical' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Vocal Styles Radar Chart */}
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                    <h3 className="text-xl font-bold mb-4">Vocal Style Distribution</h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <RadarChart data={vocalStyles}>
                        <PolarGrid stroke="#475569" />
                        <PolarAngleAxis dataKey="style" stroke="#94a3b8" />
                        <PolarRadiusAxis stroke="#94a3b8" />
                        <Radar name="Frequency" dataKey="count" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Scale Types */}
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                    <h3 className="text-xl font-bold mb-4">Scale Types Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={scales}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="scale" stroke="#94a3b8" angle={-15} textAnchor="end" height={100} />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                        />
                        <Bar dataKey="count" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
