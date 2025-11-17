import { motion, AnimatePresence } from 'framer-motion';
import { X, Music, MapPin, Languages, Drum, Mic2, Users, Play, BookOpen, Layers } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { MusicalRegion } from '../types/music';
import type { RegionalArtist } from '../types/music';
import regionalArtistsEnhanced from '../data/regionalArtistsEnhanced';
import ArtistCard from './ArtistCard';
import instrumentsMetadata from '../data/instrumentsMetadata';
import InstrumentSpotlight from './InstrumentSpotlight';
import SimpleAudioPlayer from './SimpleAudioPlayer';
import AudioPlayer from './AudioPlayer';
import WaveformPlayer from './WaveformPlayer';
import SoundscapeMixer from './SoundscapeMixer';

interface RegionModalProps {
  region: MusicalRegion;
  onClose: () => void;
  onPlayAudio: (audioUrl: string) => void;
}

type TabType = 'overview' | 'instruments' | 'structure' | 'performance' | 'social' | 'references';
// include 'artists' tab
type ExtendedTabType = TabType | 'artists';

const RegionModal: React.FC<RegionModalProps> = ({ region, onClose }) => {
  console.log('RegionModal rendering for:', region.name);
  const [activeTab, setActiveTab] = useState<ExtendedTabType>('overview');
  const [selectedArtist, setSelectedArtist] = useState<RegionalArtist | null>(null);
  const [selectedInstrument, setSelectedInstrument] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showSoundscapeMixer, setShowSoundscapeMixer] = useState(false);

  // Prevent immediate closing by delaying the click handler activation
  useEffect(() => {
    console.log('RegionModal mounted, starting 500ms guard');
    const timer = setTimeout(() => {
      console.log('Guard released - modal can now be closed via backdrop');
      setIsOpen(true);
    }, 500);
    return () => {
      console.log('RegionModal unmounting');
      clearTimeout(timer);
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    console.log('Backdrop click detected, isOpen:', isOpen);
    if (isOpen) {
      console.log('Backdrop clicked, closing modal');
      onClose();
    } else {
      console.log('Backdrop click ignored - modal just opened (guard active)');
      e.stopPropagation();
    }
  };

  const tabs: { id: ExtendedTabType; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <MapPin className="w-4 h-4" /> },
    { id: 'instruments', label: 'Instruments', icon: <Music className="w-4 h-4" /> },
    { id: 'structure', label: 'Structure', icon: <Drum className="w-4 h-4" /> },
    { id: 'performance', label: 'Performance', icon: <Mic2 className="w-4 h-4" /> },
    { id: 'artists', label: 'Regional Artists', icon: <Users className="w-4 h-4" /> },
    { id: 'social', label: 'Social', icon: <Users className="w-4 h-4" /> },
    ...(region.sources ? [{ id: 'references' as TabType, label: 'References', icon: <BookOpen className="w-4 h-4" /> }] : []),
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div 
            className="p-6 text-white relative overflow-hidden"
            style={{ backgroundColor: region.color }}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            <div className="relative">
              <button
                onClick={onClose}
                className="absolute top-0 right-0 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-3xl font-bold mb-2">{region.name}</h2>
              <p className="text-white/90">{region.description}</p>
              
              {/* Soundscape Mixer Button */}
              <button
                onClick={() => setShowSoundscapeMixer(true)}
                className="mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-semibold transition-all border border-white/40"
              >
                <Layers className="w-5 h-5" />
                Create Soundscape Mix
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 px-6">
            <div className="flex space-x-1 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.icon}
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 250px)' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <Section title="Geography & Climate" icon={<MapPin />}>
                      <div className="space-y-2">
                        <InfoItem label="Terrain" value={region.geography.terrain.join(', ')} />
                        <InfoItem label="Climate" value={region.geography.climate} />
                      </div>
                    </Section>

                    <Section title="Historical Influences" icon={<Music />}>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {region.geography.historicalInfluences.map((influence, idx) => (
                          <li key={idx}>{influence}</li>
                        ))}
                      </ul>
                    </Section>

                    <Section title="Language & Poetry" icon={<Languages />}>
                      <div className="space-y-2">
                        <InfoItem label="Primary Languages" value={region.language.primary.join(', ')} />
                        <InfoItem label="Linguistic Family" value={region.language.linguisticFamily} />
                        <div className="mt-3">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Lyrical Themes:</h4>
                          <div className="flex flex-wrap gap-2">
                            {region.language.lyricalThemes.map((theme, idx) => (
                              <span key={idx} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs">
                                {theme}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Section>

                    {/* Audio Samples with Waveform Visualization */}
                    {region.audioSamples.length > 0 && (
                      <Section title="Audio Samples" icon={<Play />}>
                        <div className="space-y-4">
                          {region.audioSamples.map((sample, idx) => (
                            <SimpleAudioPlayer
                              key={idx}
                              audioUrl={sample.file}
                              title={sample.title}
                              description={sample.description}
                            />
                          ))}
                        </div>
                      </Section>
                    )}

                    {/* Inline References for convenience */}
                    {region.sources && (
                      <Section title="References" icon={<BookOpen />}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          {region.sources.geographicHistorical && (
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-2">Geography & History</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {region.sources.geographicHistorical.map((s, i) => (
                                  <li key={i}>
                                    <span className="text-gray-700">{s.note} </span>
                                    <a href={s.url} target="_blank" rel="noreferrer" className="text-primary-700 underline">source</a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {region.sources.languageLyrics && (
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-2">Language & Lyrics</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {region.sources.languageLyrics.map((s, i) => (
                                  <li key={i}>
                                    <span className="text-gray-700">{s.note} </span>
                                    <a href={s.url} target="_blank" rel="noreferrer" className="text-primary-700 underline">source</a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {region.sources.instrumentation && (
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-2">Instrumentation</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {region.sources.instrumentation.map((s, i) => (
                                  <li key={i}>
                                    <span className="text-gray-700">{s.note} </span>
                                    <a href={s.url} target="_blank" rel="noreferrer" className="text-primary-700 underline">source</a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {region.sources.structure && (
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-2">Structure</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {region.sources.structure.map((s, i) => (
                                  <li key={i}>
                                    <span className="text-gray-700">{s.note} </span>
                                    <a href={s.url} target="_blank" rel="noreferrer" className="text-primary-700 underline">source</a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {region.sources.socialCultural && (
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-2">Social & Cultural</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {region.sources.socialCultural.map((s, i) => (
                                  <li key={i}>
                                    <span className="text-gray-700">{s.note} </span>
                                    <a href={s.url} target="_blank" rel="noreferrer" className="text-primary-700 underline">source</a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </Section>
                    )}
                  </div>
                )}

                {activeTab === 'instruments' && (
                  <div className="space-y-6">
                    <Section title="Melodic Instruments" icon={<Music />}>
                      <div className="grid grid-cols-2 gap-3">
                        {region.instruments.melodic.map((instrument, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedInstrument(instrument)}
                            className="p-3 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg text-left hover:shadow-md transition-shadow"
                          >
                            <p className="font-medium text-primary-800">{instrument}</p>
                          </button>
                        ))}
                      </div>
                    </Section>

                    <Section title="Rhythmic Instruments" icon={<Drum />}>
                      <div className="grid grid-cols-2 gap-3">
                        {region.instruments.rhythmic.map((instrument, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedInstrument(instrument)}
                            className="p-3 bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-lg text-left hover:shadow-md transition-shadow"
                          >
                            <p className="font-medium text-secondary-800">{instrument}</p>
                          </button>
                        ))}
                      </div>
                    </Section>

                    <Section title="Unique Instruments" icon={<Music />}>
                      <ul className="space-y-2">
                        {region.instruments.unique.map((instrument, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-primary-600 mt-1">•</span>
                            <button className="text-gray-700 underline" onClick={() => setSelectedInstrument(instrument)}>
                              {instrument}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </Section>

                    <Section title="Materials" icon={<MapPin />}>
                      <div className="flex flex-wrap gap-2">
                        {region.instruments.materials.map((material, idx) => (
                          <span key={idx} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
                            {material}
                          </span>
                        ))}
                      </div>
                    </Section>
                    {/* Instrument spotlight modal */}
                    <InstrumentSpotlight
                      name={selectedInstrument}
                      image={selectedInstrument ? (instrumentsMetadata[selectedInstrument]?.image ?? `https://via.placeholder.com/640x420?text=${encodeURIComponent(selectedInstrument)}`) : undefined}
                      description={selectedInstrument ? (instrumentsMetadata[selectedInstrument]?.description ?? '') : undefined}
                      onClose={() => setSelectedInstrument(null)}
                    />
                  </div>
                )}

                {activeTab === 'artists' && (
                  <div className="space-y-4">
                    <Section title="Regional Artists" icon={<Users />}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {(regionalArtistsEnhanced[region.id] || []).map((artist, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedArtist(artist)}
                            className="text-left p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all bg-white hover:border-orange-500 group"
                          >
                            <div className="flex items-start gap-2">
                              <div className="flex-1">
                                <div className="font-semibold text-gray-800 group-hover:text-orange-600 transition">{artist.name}</div>
                                {artist.genres && artist.genres.length > 0 && (
                                  <div className="text-xs text-gray-500 mt-1">{artist.genres[0]}</div>
                                )}
                                {artist.awards && artist.awards.length > 0 && (
                                  <div className="mt-2 flex items-center gap-1">
                                    <span className="text-yellow-600 text-xs">🏆</span>
                                    <span className="text-xs text-yellow-700 font-medium">{artist.awards[0].name}</span>
                                  </div>
                                )}
                              </div>
                              {artist.status === 'living' && (
                                <span className="text-green-500 text-xs mt-1">●</span>
                              )}
                            </div>
                          </button>
                        ))}
                        {(!(regionalArtistsEnhanced[region.id] || []).length) && (
                          <div className="text-sm text-gray-600 col-span-full">No artist data available for this region.</div>
                        )}
                      </div>
                    </Section>
                    {/* Artist detail modal */}
                    <ArtistCard artist={selectedArtist} onClose={() => setSelectedArtist(null)} />
                  </div>
                )}

                {activeTab === 'structure' && (
                  <div className="space-y-6">
                    <Section title="Rhythmic System" icon={<Drum />}>
                      <p className="text-gray-700">{region.musicalStructure.rhythmicSystem}</p>
                      {region.musicalStructure.talas && (
                        <div className="mt-3">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Talas:</h4>
                          <div className="flex flex-wrap gap-2">
                            {region.musicalStructure.talas.map((tala, idx) => (
                              <span key={idx} className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm">
                                {tala}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </Section>

                    <Section title="Melodic System" icon={<Music />}>
                      <InfoItem label="System" value={region.musicalStructure.melodicSystem} />
                      {region.musicalStructure.ragas && (
                        <div className="mt-3">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Common Ragas:</h4>
                          <div className="flex flex-wrap gap-2">
                            {region.musicalStructure.ragas.map((raga, idx) => (
                              <span key={idx} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                                {raga}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </Section>

                    <Section title="Scale & Harmony" icon={<Music />}>
                      <div className="space-y-2">
                        <InfoItem label="Scale Type" value={region.musicalStructure.scaleType} />
                        <InfoItem label="Harmonic Approach" value={region.musicalStructure.harmonicApproach} />
                        <InfoItem label="Typical Tempo" value={region.musicalStructure.tempo} />
                      </div>
                    </Section>
                  </div>
                )}

                {activeTab === 'performance' && (
                  <div className="space-y-6">
                    <Section title="Vocal Style" icon={<Mic2 />}>
                      <ul className="space-y-2">
                        {region.performance.vocalStyle.map((style, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-primary-600 mt-1">•</span>
                            <span className="text-gray-700">{style}</span>
                          </li>
                        ))}
                      </ul>
                    </Section>

                    <Section title="Ornamentation" icon={<Music />}>
                      <ul className="space-y-2">
                        {region.performance.ornamentation.map((orn, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-secondary-600 mt-1">•</span>
                            <span className="text-gray-700">{orn}</span>
                          </li>
                        ))}
                      </ul>
                    </Section>

                    <Section title="Improvisation" icon={<Music />}>
                      <p className="text-gray-700">{region.performance.improvisation}</p>
                    </Section>

                    <Section title="Performance Context" icon={<Users />}>
                      <ul className="space-y-2">
                        {region.performance.performanceContext.map((context, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-primary-600 mt-1">•</span>
                            <span className="text-gray-700">{context}</span>
                          </li>
                        ))}
                      </ul>
                      <InfoItem label="Typical Duration" value={region.performance.typicalDuration} className="mt-4" />
                    </Section>
                  </div>
                )}

                {activeTab === 'social' && (
                  <div className="space-y-6">
                    <Section title="Musical Communities" icon={<Users />}>
                      {region.socialContext.musicianCaste && region.socialContext.musicianCaste.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {region.socialContext.musicianCaste.map((caste, idx) => (
                            <span key={idx} className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg">
                              {caste}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600 italic">No specific hereditary musician castes</p>
                      )}
                      <InfoItem 
                        label="Hereditary Tradition" 
                        value={region.socialContext.hereditaryTradition ? 'Yes' : 'No'} 
                        className="mt-3"
                      />
                    </Section>

                    <Section title="Social Dynamics" icon={<Users />}>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-1">Gender Dynamics:</h4>
                          <p className="text-gray-700">{region.socialContext.genderDynamics}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-1">Patronage:</h4>
                          <ul className="space-y-1">
                            {region.socialContext.patronage.map((p, idx) => (
                              <li key={idx} className="text-gray-700 text-sm">• {p}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Section>

                    <Section title="Religious Context" icon={<Music />}>
                      <ul className="space-y-2">
                        {region.socialContext.religiousContext.map((context, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-secondary-600 mt-1">•</span>
                            <span className="text-gray-700">{context}</span>
                          </li>
                        ))}
                      </ul>
                    </Section>

                    <Section title="Modern Challenges" icon={<Users />}>
                      <ul className="space-y-2">
                        {region.socialContext.modernChallenges.map((challenge, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-red-600 mt-1">•</span>
                            <span className="text-gray-700">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </Section>
                  </div>
                )}

                {activeTab === 'references' && region.sources && (
                  <div className="space-y-6">
                    <Section title="References" icon={<BookOpen />}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        {region.sources.geographicHistorical && (
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Geography & History</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {region.sources.geographicHistorical.map((s, i) => (
                                <li key={i}>
                                  <span className="text-gray-700">{s.note} </span>
                                  <a href={s.url} target="_blank" rel="noreferrer" className="text-primary-700 underline">source</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {region.sources.languageLyrics && (
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Language & Lyrics</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {region.sources.languageLyrics.map((s, i) => (
                                <li key={i}>
                                  <span className="text-gray-700">{s.note} </span>
                                  <a href={s.url} target="_blank" rel="noreferrer" className="text-primary-700 underline">source</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {region.sources.instrumentation && (
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Instrumentation</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {region.sources.instrumentation.map((s, i) => (
                                <li key={i}>
                                  <span className="text-gray-700">{s.note} </span>
                                  <a href={s.url} target="_blank" rel="noreferrer" className="text-primary-700 underline">source</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {region.sources.structure && (
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Structure</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {region.sources.structure.map((s, i) => (
                                <li key={i}>
                                  <span className="text-gray-700">{s.note} </span>
                                  <a href={s.url} target="_blank" rel="noreferrer" className="text-primary-700 underline">source</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {region.sources.socialCultural && (
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Social & Cultural</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {region.sources.socialCultural.map((s, i) => (
                                <li key={i}>
                                  <span className="text-gray-700">{s.note} </span>
                                  <a href={s.url} target="_blank" rel="noreferrer" className="text-primary-700 underline">source</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </Section>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Soundscape Mixer Modal */}
        {showSoundscapeMixer && (
          <SoundscapeMixer
            regionId={region.id}
            regionName={region.name}
            regionColor={region.color}
            onClose={() => setShowSoundscapeMixer(false)}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

// Helper Components
const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="flex items-center space-x-2 mb-3">
      <div className="text-primary-600">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    {children}
  </div>
);

const InfoItem: React.FC<{ label: string; value: string; className?: string }> = ({ label, value, className = '' }) => (
  <div className={`flex flex-col space-y-1 ${className}`}>
    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</span>
    <span className="text-gray-800">{value}</span>
  </div>
);

export default RegionModal;
