/**
 * Musical Timeline Data
 * Historical events, periods, and milestones in Indian music history
 */

export interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  category: 'tradition' | 'artist' | 'instrument' | 'period' | 'festival' | 'patronage' | 'movement';
  region?: string;
  importance: 'high' | 'medium' | 'low';
  relatedRegions?: string[];
  imageUrl?: string;
  sources?: string[];
}

export const musicalTimeline: TimelineEvent[] = [
  // Ancient Period (Pre-1000 CE)
  {
    id: 'vedic-music',
    year: -1500,
    title: 'Vedic Musical Traditions',
    description: 'Sama Veda establishes earliest documented musical practices in India with systematic use of swaras (notes) and chanting techniques.',
    category: 'period',
    importance: 'high',
    relatedRegions: ['punjab', 'uttar-pradesh'],
  },
  {
    id: 'natya-shastra',
    year: 200,
    title: 'Bharata Muni\'s Natya Shastra',
    description: 'Comprehensive treatise on performing arts compiled, establishing rasa theory, tala systems, and theatrical music principles.',
    category: 'period',
    importance: 'high',
  },
  {
    id: 'carnatic-roots',
    year: 500,
    title: 'Early Carnatic Traditions',
    description: 'Development of Carnatic music system in South India with temple music and devotional compositions gaining prominence.',
    category: 'tradition',
    importance: 'high',
    relatedRegions: ['tamil-nadu', 'kerala', 'karnataka', 'andhra-pradesh'],
  },

  // Medieval Period (1000-1700 CE)
  {
    id: 'sufi-arrival',
    year: 1200,
    title: 'Sufi Musical Traditions Arrive',
    description: 'Sufi saints bring qawwali and devotional music traditions, influencing North Indian musical practices.',
    category: 'movement',
    importance: 'high',
    relatedRegions: ['rajasthan', 'punjab', 'uttar-pradesh'],
  },
  {
    id: 'bhakti-movement',
    year: 1300,
    title: 'Bhakti Movement Flourishes',
    description: 'Devotional music becomes central to religious practice. Saints like Kabir, Meera, and Tulsidas compose devotional poetry.',
    category: 'movement',
    importance: 'high',
    relatedRegions: ['rajasthan', 'uttar-pradesh', 'maharashtra', 'tamil-nadu'],
  },
  {
    id: 'hindustani-divergence',
    year: 1400,
    title: 'Hindustani-Carnatic Divergence',
    description: 'Persian and Afghan influences in North India lead to distinct Hindustani classical tradition, separate from Carnatic system.',
    category: 'period',
    importance: 'high',
    relatedRegions: ['punjab', 'uttar-pradesh', 'rajasthan'],
  },
  {
    id: 'tansen',
    year: 1506,
    title: 'Birth of Tansen',
    description: 'Tansen born in Gwalior, later becomes one of Akbar\'s Navratnas (nine jewels) and legendary figure in Hindustani classical music.',
    category: 'artist',
    importance: 'high',
    region: 'uttar-pradesh',
  },
  {
    id: 'mughal-patronage',
    year: 1550,
    title: 'Mughal Court Patronage',
    description: 'Emperor Akbar establishes elaborate musical patronage system at Mughal court, fostering Hindustani classical development.',
    category: 'patronage',
    importance: 'high',
    relatedRegions: ['uttar-pradesh', 'rajasthan'],
  },

  // Early Modern Period (1700-1900)
  {
    id: 'carnatic-trinity',
    year: 1750,
    title: 'Carnatic Trinity Era Begins',
    description: 'Syama Sastri, Tyagaraja, and Muthuswami Dikshitar (Carnatic Trinity) revolutionize South Indian classical music with thousands of compositions.',
    category: 'artist',
    importance: 'high',
    relatedRegions: ['tamil-nadu', 'andhra-pradesh', 'karnataka'],
  },
  {
    id: 'baul-tradition',
    year: 1800,
    title: 'Baul Tradition Documented',
    description: 'Wandering Baul mystics of Bengal gain recognition for their syncretic musical-spiritual tradition combining Vaishnava and Sufi elements.',
    category: 'tradition',
    importance: 'medium',
    region: 'bengal',
  },
  {
    id: 'rabindranath-tagore',
    year: 1861,
    title: 'Birth of Rabindranath Tagore',
    description: 'Tagore born in Bengal, later creates Rabindra Sangeet tradition merging classical, folk, and Western influences.',
    category: 'artist',
    importance: 'high',
    region: 'bengal',
  },

  // Colonial and Independence Era (1900-1950)
  {
    id: 'gramophone-recording',
    year: 1902,
    title: 'First Gramophone Recordings',
    description: 'Gauhar Jaan becomes first Indian artist to record music, revolutionizing preservation and dissemination of musical traditions.',
    category: 'period',
    importance: 'high',
  },
  {
    id: 'all-india-radio',
    year: 1927,
    title: 'All India Radio Founded',
    description: 'Broadcasting service established, becoming crucial platform for classical and folk music dissemination across India.',
    category: 'patronage',
    importance: 'high',
  },
  {
    id: 'ravi-shankar',
    year: 1920,
    title: 'Birth of Ravi Shankar',
    description: 'Sitar virtuoso born who later popularizes Indian classical music globally and collaborates with Western musicians.',
    category: 'artist',
    importance: 'high',
    region: 'uttar-pradesh',
  },
  {
    id: 'lata-mangeshkar',
    year: 1929,
    title: 'Birth of Lata Mangeshkar',
    description: 'Legendary playback singer born, later becoming the "Nightingale of India" with over 25,000 recorded songs.',
    category: 'artist',
    importance: 'high',
    region: 'maharashtra',
  },

  // Post-Independence (1950-2000)
  {
    id: 'sangeet-natak-akademi',
    year: 1952,
    title: 'Sangeet Natak Akademi Established',
    description: 'National academy for music, dance, and drama founded to preserve and promote Indian performing arts.',
    category: 'patronage',
    importance: 'high',
  },
  {
    id: 'alla-rakha',
    year: 1955,
    title: 'Alla Rakha Popularizes Tabla',
    description: 'Tabla maestro gains international fame through collaborations, elevating tabla from accompaniment to solo instrument.',
    category: 'instrument',
    importance: 'medium',
    region: 'punjab',
  },
  {
    id: 'film-music-golden',
    year: 1960,
    title: 'Golden Age of Film Music',
    description: 'Hindi film music reaches artistic peak with composers like S.D. Burman, Naushad, and Shankar-Jaikishan blending classical and folk traditions.',
    category: 'period',
    importance: 'medium',
  },
  {
    id: 'bhimsen-joshi',
    year: 1960,
    title: 'Bhimsen Joshi\'s Rise',
    description: 'Kirana gharana vocalist gains prominence with powerful voice and emotional depth in Hindustani classical music.',
    category: 'artist',
    importance: 'high',
    region: 'karnataka',
  },
  {
    id: 'ilayaraja',
    year: 1976,
    title: 'Ilaiyaraaja Revolutionizes South Indian Film Music',
    description: 'Composer debuts with innovative fusion of Western classical orchestration and Carnatic music in Tamil cinema.',
    category: 'artist',
    importance: 'medium',
    relatedRegions: ['tamil-nadu', 'kerala'],
  },
  {
    id: 'zakir-hussain',
    year: 1970,
    title: 'Zakir Hussain Emerges',
    description: 'Tabla virtuoso son of Alla Rakha begins international career, later becomes global ambassador of Indian percussion.',
    category: 'artist',
    importance: 'high',
    region: 'maharashtra',
  },

  // Contemporary Era (2000-Present)
  {
    id: 'coke-studio',
    year: 2011,
    title: 'Coke Studio India Launches',
    description: 'Platform for fusion collaborations between classical, folk, and contemporary artists, reaching millions online.',
    category: 'movement',
    importance: 'medium',
  },
  {
    id: 'ar-rahman-oscar',
    year: 2009,
    title: 'A.R. Rahman Wins Oscars',
    description: 'Composer wins two Academy Awards for Slumdog Millionaire, bringing global attention to Indian film music.',
    category: 'artist',
    importance: 'high',
    region: 'tamil-nadu',
  },
  {
    id: 'indian-idol',
    year: 2004,
    title: 'Indian Idol Popularizes Music Reality TV',
    description: 'Television singing competition democratizes music opportunities and introduces regional artists to national audiences.',
    category: 'movement',
    importance: 'low',
  },
  {
    id: 'spotify-india',
    year: 2019,
    title: 'Spotify Launches in India',
    description: 'Global streaming platform enters India, transforming music consumption and providing data-driven insights into listening patterns.',
    category: 'period',
    importance: 'low',
  },
  {
    id: 'padma-vibhushan-2024',
    year: 2024,
    title: 'Traditional Artists Receive Padma Awards',
    description: 'Folk artists from marginalized communities receive India\'s highest civilian honors, recognizing hereditary musical traditions.',
    category: 'patronage',
    importance: 'medium',
  },
  {
    id: 'digital-preservation',
    year: 2020,
    title: 'Digital Archiving Initiatives',
    description: 'Multiple projects digitize rare recordings and field recordings, preserving endangered musical traditions for future generations.',
    category: 'movement',
    importance: 'medium',
  },

  // Festivals (Recurring Annual Events)
  {
    id: 'dover-lane',
    year: 1952,
    title: 'Dover Lane Music Conference Founded',
    description: 'Annual all-night classical music festival in Kolkata becomes premier showcase for Hindustani classical artists.',
    category: 'festival',
    importance: 'medium',
    region: 'bengal',
  },
  {
    id: 'madras-music-season',
    year: 1927,
    title: 'Madras Music Season Tradition Begins',
    description: 'Annual December-January cultural festival in Chennai becomes world\'s largest classical music festival with 1000+ concerts.',
    category: 'festival',
    importance: 'high',
    region: 'tamil-nadu',
  },
  {
    id: 'sawai-gandharva',
    year: 1953,
    title: 'Sawai Gandharva Festival Started',
    description: 'Annual Hindustani classical music festival in Pune honoring legendary vocalist Sawai Gandharva.',
    category: 'festival',
    importance: 'medium',
    region: 'maharashtra',
  },
  {
    id: 'riff-jodhpur',
    year: 2007,
    title: 'RIFF Jodhpur Festival Established',
    description: 'Rajasthan International Folk Festival celebrates indigenous music traditions at Mehrangarh Fort.',
    category: 'festival',
    importance: 'medium',
    region: 'rajasthan',
  },
  {
    id: 'hornbill-festival',
    year: 2000,
    title: 'Hornbill Festival Launched',
    description: 'Festival showcases Naga tribes\' musical traditions, promoting Northeast India\'s cultural heritage.',
    category: 'festival',
    importance: 'medium',
    region: 'nagaland',
  },
];

// Helper functions for timeline filtering
export function getEventsByCategory(category: TimelineEvent['category']): TimelineEvent[] {
  return musicalTimeline.filter(event => event.category === category);
}

export function getEventsByPeriod(startYear: number, endYear: number): TimelineEvent[] {
  return musicalTimeline.filter(event => event.year >= startYear && event.year <= endYear);
}

export function getEventsByRegion(regionId: string): TimelineEvent[] {
  return musicalTimeline.filter(
    event => event.region === regionId || event.relatedRegions?.includes(regionId)
  );
}

export function getEventsByImportance(importance: TimelineEvent['importance']): TimelineEvent[] {
  return musicalTimeline.filter(event => event.importance === importance);
}

// Get events sorted by year
export function getTimelineSorted(): TimelineEvent[] {
  return [...musicalTimeline].sort((a, b) => a.year - b.year);
}

// Get year range for timeline visualization
export function getYearRange(): { min: number; max: number } {
  const years = musicalTimeline.map(e => e.year);
  return {
    min: Math.min(...years),
    max: Math.max(...years),
  };
}
