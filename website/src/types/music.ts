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

// Regional artist model - ENHANCED
export interface Award {
  name: string;
  year: number;
  category?: string;
}

export interface AudioSample {
  title: string;
  url: string;
  duration?: string;
  description: string;
  genre: string;
}

export interface SocialMedia {
  spotify?: string;
  youtube?: string;
  instagram?: string;
  facebook?: string;
  website?: string;
}

export interface RegionalArtist {
  id: string;
  name: string;
  nameLocal?: string; // In native script
  birthYear?: number;
  deathYear?: number;
  state: string;
  community?: string; // E.g., "Manganiyar", "Baul", etc.
  gharana?: string; // For classical musicians
  genres: string[];
  instruments: string[];
  languages: string[];
  awards: Award[];
  biography: string;
  notableWorks?: string[];
  audioSamples?: AudioSample[];
  images?: {
    profile: string;
    performance?: string[];
    historical?: string[];
  };
  socialMedia?: SocialMedia;
  status: 'living' | 'deceased';
  hereditaryTradition: boolean;
  activeYears: string; // "1970s-present"
  relatedArtists?: string[]; // IDs of related artists
  culturalContext?: string;
  modernChallenges?: string;
  // optional: id of region/state this artist is associated with
  regionId?: string;
  artForm?: string; // Keeping for backward compatibility
}

// Musical News and Events
export type NewsCategory = 'festival' | 'concert' | 'award' | 'cultural-event' | 'workshop' | 'release';

export interface MusicalNews {
  id: string;
  title: string;
  category: NewsCategory;
  region: string; // regionId
  date: string; // ISO date string
  endDate?: string; // For multi-day events
  description: string;
  venue?: string;
  city?: string;
  artists?: string[]; // Artist IDs or names
  organizer?: string;
  ticketUrl?: string;
  imageUrl?: string;
  tags?: string[];
  featured?: boolean;
}
