import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Music2, MapPin, Users, Calendar, Heart, ExternalLink, Play, Pause } from 'lucide-react';
import React, { useState, useRef } from 'react';
import type { RegionalArtist } from '../types/music';

interface ArtistCardProps {
  artist: RegionalArtist | null;
  onClose: () => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onClose }) => {
  const [activeTab, setActiveTab] = useState<'bio' | 'music' | 'awards'>('bio');
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleAudioToggle = (url: string) => {
    if (playingAudio === url) {
      audioRef.current?.pause();
      setPlayingAudio(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.play();
      setPlayingAudio(url);
      audio.onended = () => setPlayingAudio(null);
    }
  };

  if (!artist) return null;

  const getLifeYears = () => {
    if (artist.birthYear && artist.deathYear) {
      return `${artist.birthYear} - ${artist.deathYear}`;
    } else if (artist.birthYear) {
      return `Born ${artist.birthYear}`;
    }
    return null;
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full my-8 relative overflow-hidden"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with gradient */}
          <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 p-6 text-white">
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
              {/* Profile Image */}
              {artist.images?.profile ? (
                <img 
                  src={artist.images.profile} 
                  alt={artist.name}
                  className="w-24 h-24 rounded-lg object-cover border-2 border-white shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 rounded-lg bg-white/20 flex items-center justify-center">
                  <Music2 className="w-12 h-12" />
                </div>
              )}

              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-1">{artist.name}</h3>
                {artist.nameLocal && (
                  <p className="text-white/90 text-sm mb-2">{artist.nameLocal}</p>
                )}
                
                <div className="flex flex-wrap gap-2 text-sm">
                  {getLifeYears() && (
                    <span className="bg-white/20 px-2 py-1 rounded-full flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {getLifeYears()}
                    </span>
                  )}
                  {artist.status === 'deceased' && (
                    <span className="bg-black/30 px-2 py-1 rounded-full">✝ Deceased</span>
                  )}
                  {artist.hereditaryTradition && (
                    <span className="bg-white/20 px-2 py-1 rounded-full flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Hereditary
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Top Awards Banner */}
            {artist.awards && artist.awards.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {artist.awards.map((award, idx) => (
                  <span 
                    key={idx}
                    className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
                  >
                    <Award className="w-3 h-3" />
                    {award.name} {award.year}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex border-b">
            <button
              className={`flex-1 py-3 px-4 font-medium transition-colors ${
                activeTab === 'bio' 
                  ? 'text-orange-600 border-b-2 border-orange-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('bio')}
            >
              Biography
            </button>
            {artist.audioSamples && artist.audioSamples.length > 0 && (
              <button
                className={`flex-1 py-3 px-4 font-medium transition-colors ${
                  activeTab === 'music' 
                    ? 'text-orange-600 border-b-2 border-orange-600' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab('music')}
              >
                Music
              </button>
            )}
            {artist.awards && artist.awards.length > 0 && (
              <button
                className={`flex-1 py-3 px-4 font-medium transition-colors ${
                  activeTab === 'awards' 
                    ? 'text-orange-600 border-b-2 border-orange-600' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab('awards')}
              >
                Recognition
              </button>
            )}
          </div>

          {/* Content Area */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {activeTab === 'bio' && (
              <div className="space-y-4">
                {/* Key Info */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {artist.state && (
                    <div>
                      <span className="text-gray-500 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        State
                      </span>
                      <p className="font-medium">{artist.state}</p>
                    </div>
                  )}
                  {artist.community && (
                    <div>
                      <span className="text-gray-500">Community</span>
                      <p className="font-medium">{artist.community}</p>
                    </div>
                  )}
                  {artist.gharana && (
                    <div>
                      <span className="text-gray-500">Gharana</span>
                      <p className="font-medium">{artist.gharana}</p>
                    </div>
                  )}
                  {artist.activeYears && (
                    <div>
                      <span className="text-gray-500">Active Years</span>
                      <p className="font-medium">{artist.activeYears}</p>
                    </div>
                  )}
                </div>

                {/* Genres */}
                {artist.genres && artist.genres.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Genres</h4>
                    <div className="flex flex-wrap gap-2">
                      {artist.genres.map((genre, idx) => (
                        <span 
                          key={idx}
                          className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Instruments */}
                {artist.instruments && artist.instruments.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Instruments</h4>
                    <div className="flex flex-wrap gap-2">
                      {artist.instruments.map((instrument, idx) => (
                        <span 
                          key={idx}
                          className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs flex items-center gap-1"
                        >
                          <Music2 className="w-3 h-3" />
                          {instrument}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Biography */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Biography</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {artist.biography}
                  </p>
                </div>

                {/* Notable Works */}
                {artist.notableWorks && artist.notableWorks.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Notable Works</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {artist.notableWorks.map((work, idx) => (
                        <li key={idx}>{work}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Cultural Context */}
                {artist.culturalContext && (
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 text-amber-900">Cultural Context</h4>
                    <p className="text-sm text-amber-800 leading-relaxed">
                      {artist.culturalContext}
                    </p>
                  </div>
                )}

                {/* Social Media Links */}
                {artist.socialMedia && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Connect</h4>
                    <div className="flex flex-wrap gap-2">
                      {artist.socialMedia.spotify && (
                        <a 
                          href={artist.socialMedia.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-500 text-white px-3 py-2 rounded-lg text-xs flex items-center gap-1 hover:bg-green-600 transition"
                        >
                          <Music2 className="w-3 h-3" />
                          Spotify
                        </a>
                      )}
                      {artist.socialMedia.youtube && (
                        <a 
                          href={artist.socialMedia.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-red-500 text-white px-3 py-2 rounded-lg text-xs flex items-center gap-1 hover:bg-red-600 transition"
                        >
                          <ExternalLink className="w-3 h-3" />
                          YouTube
                        </a>
                      )}
                      {artist.socialMedia.instagram && (
                        <a 
                          href={artist.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-lg text-xs flex items-center gap-1 hover:from-purple-600 hover:to-pink-600 transition"
                        >
                          <Heart className="w-3 h-3" />
                          Instagram
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'music' && artist.audioSamples && (
              <div className="space-y-3">
                {artist.audioSamples.map((sample, idx) => (
                  <div 
                    key={idx}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{sample.title}</h4>
                        {sample.description && (
                          <p className="text-xs text-gray-600 mb-2">{sample.description}</p>
                        )}
                        <div className="flex gap-2 text-xs">
                          {sample.genre && (
                            <span className="bg-gray-100 px-2 py-1 rounded">{sample.genre}</span>
                          )}
                          {sample.duration && (
                            <span className="text-gray-500">{sample.duration}</span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleAudioToggle(sample.url)}
                        className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition"
                      >
                        {playingAudio === sample.url ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'awards' && artist.awards && (
              <div className="space-y-3">
                {artist.awards.map((award, idx) => (
                  <div 
                    key={idx}
                    className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded-r-lg"
                  >
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-yellow-900">{award.name}</h4>
                        <p className="text-sm text-yellow-800">
                          {award.year} {award.category && `• ${award.category}`}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ArtistCard;
