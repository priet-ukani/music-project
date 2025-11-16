/**
 * Analytics Helper Functions
 * Utilities for generating analytics data from the musical regions database
 */

import { musicalRegions } from '../data/regions.ts';
import type { MusicalRegion } from '../types/music';

export interface RegionDistribution {
  name: string;
  value: number;
  color: string;
}

export interface GenreData {
  genre: string;
  count: number;
  regions: string[];
}

export interface InstrumentData {
  instrument: string;
  count: number;
  regions: string[];
  category: 'melodic' | 'rhythmic' | 'unique';
}

export interface TempoData {
  tempoRange: string;
  count: number;
  regions: string[];
}

export interface SocialContextData {
  hereditaryCount: number;
  nonHereditaryCount: number;
  castes: { name: string; count: number }[];
  patronageTypes: { type: string; count: number }[];
}

/**
 * Get regional distribution data for pie/bar charts
 */
export function getRegionalDistribution(): RegionDistribution[] {
  return musicalRegions.map(region => ({
    name: region.name,
    value: 1, // Each region counts as 1 for distribution
    color: region.color,
  }));
}

/**
 * Extract and count unique genres/traditions across all regions
 */
export function getGenreDistribution(): GenreData[] {
  const genreMap = new Map<string, Set<string>>();

  musicalRegions.forEach(region => {
    // Extract genres from description, performance context, and lyrical themes
    const genres = [
      ...region.performance.performanceContext,
      ...region.language.poeticTraditions,
    ];

    genres.forEach(genre => {
      if (!genreMap.has(genre)) {
        genreMap.set(genre, new Set());
      }
      genreMap.get(genre)!.add(region.name);
    });
  });

  return Array.from(genreMap.entries())
    .map(([genre, regions]) => ({
      genre,
      count: regions.size,
      regions: Array.from(regions),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15); // Top 15 genres
}

/**
 * Get instrument popularity across regions
 */
export function getInstrumentDistribution(): InstrumentData[] {
  const instrumentMap = new Map<string, { regions: Set<string>; category: 'melodic' | 'rhythmic' | 'unique' }>();

  musicalRegions.forEach(region => {
    // Melodic instruments
    region.instruments.melodic.forEach(inst => {
      if (!instrumentMap.has(inst)) {
        instrumentMap.set(inst, { regions: new Set(), category: 'melodic' });
      }
      instrumentMap.get(inst)!.regions.add(region.name);
    });

    // Rhythmic instruments
    region.instruments.rhythmic.forEach(inst => {
      if (!instrumentMap.has(inst)) {
        instrumentMap.set(inst, { regions: new Set(), category: 'rhythmic' });
      }
      instrumentMap.get(inst)!.regions.add(region.name);
    });

    // Unique instruments
    region.instruments.unique.forEach(inst => {
      if (!instrumentMap.has(inst)) {
        instrumentMap.set(inst, { regions: new Set(), category: 'unique' });
      }
      instrumentMap.get(inst)!.regions.add(region.name);
    });
  });

  return Array.from(instrumentMap.entries())
    .map(([instrument, data]) => ({
      instrument,
      count: data.regions.size,
      regions: Array.from(data.regions),
      category: data.category,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20); // Top 20 instruments
}

/**
 * Get tempo distribution across regions
 */
export function getTempoDistribution(): TempoData[] {
  const tempoMap = new Map<string, Set<string>>();

  musicalRegions.forEach(region => {
    const tempo = region.musicalStructure.tempo;
    if (!tempoMap.has(tempo)) {
      tempoMap.set(tempo, new Set());
    }
    tempoMap.get(tempo)!.add(region.name);
  });

  return Array.from(tempoMap.entries())
    .map(([tempoRange, regions]) => ({
      tempoRange,
      count: regions.size,
      regions: Array.from(regions),
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get social context statistics
 */
export function getSocialContextStats(): SocialContextData {
  let hereditaryCount = 0;
  let nonHereditaryCount = 0;
  const casteMap = new Map<string, number>();
  const patronageMap = new Map<string, number>();

  musicalRegions.forEach(region => {
    if (region.socialContext.hereditaryTradition) {
      hereditaryCount++;
    } else {
      nonHereditaryCount++;
    }

    // Count castes/communities
    region.socialContext.musicianCaste?.forEach(caste => {
      casteMap.set(caste, (casteMap.get(caste) || 0) + 1);
    });

    // Count patronage types
    region.socialContext.patronage.forEach(patron => {
      // Extract key words from patronage descriptions
      if (patron.toLowerCase().includes('royal') || patron.toLowerCase().includes('court')) {
        patronageMap.set('Royal/Court', (patronageMap.get('Royal/Court') || 0) + 1);
      }
      if (patron.toLowerCase().includes('temple') || patron.toLowerCase().includes('religious')) {
        patronageMap.set('Temple/Religious', (patronageMap.get('Temple/Religious') || 0) + 1);
      }
      if (patron.toLowerCase().includes('tourism') || patron.toLowerCase().includes('commercial')) {
        patronageMap.set('Tourism/Commercial', (patronageMap.get('Tourism/Commercial') || 0) + 1);
      }
      if (patron.toLowerCase().includes('government') || patron.toLowerCase().includes('academy')) {
        patronageMap.set('Government/Academy', (patronageMap.get('Government/Academy') || 0) + 1);
      }
    });
  });

  return {
    hereditaryCount,
    nonHereditaryCount,
    castes: Array.from(casteMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10),
    patronageTypes: Array.from(patronageMap.entries())
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count),
  };
}

/**
 * Get vocal style distribution
 */
export function getVocalStyleDistribution() {
  const styleMap = new Map<string, number>();

  musicalRegions.forEach(region => {
    region.performance.vocalStyle.forEach(style => {
      styleMap.set(style, (styleMap.get(style) || 0) + 1);
    });
  });

  return Array.from(styleMap.entries())
    .map(([style, count]) => ({ style, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);
}

/**
 * Get linguistic family distribution
 */
export function getLinguisticDistribution() {
  const familyMap = new Map<string, Set<string>>();

  musicalRegions.forEach(region => {
    const family = region.language.linguisticFamily;
    if (!familyMap.has(family)) {
      familyMap.set(family, new Set());
    }
    familyMap.get(family)!.add(region.name);
  });

  return Array.from(familyMap.entries())
    .map(([family, regions]) => ({
      family,
      count: regions.size,
      regions: Array.from(regions),
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get scale type distribution
 */
export function getScaleDistribution() {
  const scaleMap = new Map<string, number>();

  musicalRegions.forEach(region => {
    const scale = region.musicalStructure.scaleType;
    scaleMap.set(scale, (scaleMap.get(scale) || 0) + 1);
  });

  return Array.from(scaleMap.entries())
    .map(([scale, count]) => ({ scale, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get comprehensive statistics summary
 */
export function getStatisticsSummary() {
  const totalRegions = musicalRegions.length;
  const allInstruments = new Set<string>();
  const allLanguages = new Set<string>();
  const allCastes = new Set<string>();

  musicalRegions.forEach(region => {
    region.instruments.melodic.forEach(i => allInstruments.add(i));
    region.instruments.rhythmic.forEach(i => allInstruments.add(i));
    region.instruments.unique.forEach(i => allInstruments.add(i));
    region.language.primary.forEach(l => allLanguages.add(l));
    region.socialContext.musicianCaste?.forEach(c => allCastes.add(c));
  });

  return {
    totalRegions,
    totalInstruments: allInstruments.size,
    totalLanguages: allLanguages.size,
    totalCommunities: allCastes.size,
    hereditaryTraditions: musicalRegions.filter(r => r.socialContext.hereditaryTradition).length,
  };
}
