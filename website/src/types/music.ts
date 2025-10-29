export interface MusicalRegion {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  color: string;
  description: string;
  
  // Geographic and Historical
  geography: {
    terrain: string[];
    climate: string;
    historicalInfluences: string[];
  };
  
  // Language and Lyrics
  language: {
    primary: string[];
    linguisticFamily: string;
    lyricalThemes: string[];
    poeticTraditions: string[];
  };
  
  // Instrumentation
  instruments: {
    melodic: string[];
    rhythmic: string[];
    unique: string[];
    materials: string[];
  };
  
  // Rhythmic, Melodic, Harmonic Structure
  musicalStructure: {
    rhythmicSystem: string;
    talas?: string[];
    melodicSystem: string;
    ragas?: string[];
    scaleType: string;
    harmonicApproach: string;
    tempo: string;
  };
  
  // Singing Style and Performance
  performance: {
    vocalStyle: string[];
    ornamentation: string[];
    improvisation: string;
    performanceContext: string[];
    typicalDuration: string;
  };
  
  // Social and Cultural Context
  socialContext: {
    musicianCaste?: string[];
    hereditaryTradition: boolean;
    genderDynamics: string;
    patronage: string[];
    religiousContext: string[];
    modernChallenges: string[];
  };
  
  // Audio samples (paths to audio files)
  audioSamples: {
    title: string;
    file: string;
    description: string;
  }[];
  
  // Images
  images: {
    instruments: string[];
    performance: string[];
    map: string;
  };

  // Optional scholarly/authoritative references per factor
  sources?: {
    geographicHistorical?: { note: string; url: string }[];
    languageLyrics?: { note: string; url: string }[];
    instrumentation?: { note: string; url: string }[];
    structure?: { note: string; url: string }[];
    socialCultural?: { note: string; url: string }[];
  };
}

export type FilterCategory =
  | 'all'
  | 'instruments'
  | 'rhythm'
  | 'vocal'
  | 'social'
  | 'language';

export type MusicalAspect =
  | 'melodic'
  | 'rhythmic'
  | 'scales'
  | 'ornamentation'
  | 'performance'
  | 'heritage';

// Optional global map highlight query for instruments
export type InstrumentQuery = string;
