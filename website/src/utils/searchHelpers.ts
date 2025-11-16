/**
 * Search Helper Functions
 * Utilities for advanced search with fuzzy matching and multi-criteria filtering
 */

import { musicalRegions } from '../data/regions.ts';
import type { MusicalRegion } from '../types/music';

export interface SearchFilters {
  query: string;
  regions: string[];
  instruments: string[];
  genres: string[];
  linguisticFamilies: string[];
  hereditaryOnly: boolean;
  tempoRange?: string;
  scaleType?: string;
}

export interface SearchResult {
  region: MusicalRegion;
  score: number;
  matchedFields: string[];
}

/**
 * Simple fuzzy matching function
 * Returns a score between 0 and 1 based on character matches
 */
function fuzzyMatch(search: string, target: string): number {
  search = search.toLowerCase();
  target = target.toLowerCase();

  // Exact match
  if (target.includes(search)) {
    return 1.0;
  }

  let score = 0;
  let searchIndex = 0;

  for (let i = 0; i < target.length && searchIndex < search.length; i++) {
    if (target[i] === search[searchIndex]) {
      score++;
      searchIndex++;
    }
  }

  return searchIndex === search.length ? score / target.length : 0;
}

/**
 * Search regions based on query and filters
 */
export function searchRegions(filters: SearchFilters): SearchResult[] {
  const results: SearchResult[] = [];

  musicalRegions.forEach(region => {
    let score = 0;
    const matchedFields: string[] = [];

    // Region name filter
    if (filters.regions.length > 0 && !filters.regions.includes(region.id)) {
      return; // Skip if region doesn't match
    }

    // Hereditary filter
    if (filters.hereditaryOnly && !region.socialContext.hereditaryTradition) {
      return;
    }

    // Tempo filter
    if (filters.tempoRange && region.musicalStructure.tempo !== filters.tempoRange) {
      return;
    }

    // Scale type filter
    if (filters.scaleType && region.musicalStructure.scaleType !== filters.scaleType) {
      return;
    }

    // Linguistic family filter
    if (filters.linguisticFamilies.length > 0 && 
        !filters.linguisticFamilies.includes(region.language.linguisticFamily)) {
      return;
    }

    // Instrument filter
    if (filters.instruments.length > 0) {
      const regionInstruments = [
        ...region.instruments.melodic,
        ...region.instruments.rhythmic,
        ...region.instruments.unique,
      ];
      const hasMatchingInstrument = filters.instruments.some(inst =>
        regionInstruments.some(ri => ri.toLowerCase().includes(inst.toLowerCase()))
      );
      if (!hasMatchingInstrument) {
        return;
      }
    }

    // Genre/context filter
    if (filters.genres.length > 0) {
      const regionGenres = [
        ...region.performance.performanceContext,
        ...region.language.poeticTraditions,
      ];
      const hasMatchingGenre = filters.genres.some(genre =>
        regionGenres.some(rg => rg.toLowerCase().includes(genre.toLowerCase()))
      );
      if (!hasMatchingGenre) {
        return;
      }
    }

    // Text query matching (if provided)
    if (filters.query.trim()) {
      const query = filters.query.trim();

      // Search in region name
      const nameScore = fuzzyMatch(query, region.name);
      if (nameScore > 0.5) {
        score += nameScore * 10;
        matchedFields.push('name');
      }

      // Search in description
      const descScore = fuzzyMatch(query, region.description);
      if (descScore > 0.3) {
        score += descScore * 5;
        matchedFields.push('description');
      }

      // Search in instruments
      const allInstruments = [
        ...region.instruments.melodic,
        ...region.instruments.rhythmic,
        ...region.instruments.unique,
      ].join(' ');
      const instScore = fuzzyMatch(query, allInstruments);
      if (instScore > 0.3) {
        score += instScore * 8;
        matchedFields.push('instruments');
      }

      // Search in languages
      const languages = region.language.primary.join(' ');
      const langScore = fuzzyMatch(query, languages);
      if (langScore > 0.3) {
        score += langScore * 6;
        matchedFields.push('languages');
      }

      // Search in performance context
      const contexts = region.performance.performanceContext.join(' ');
      const contextScore = fuzzyMatch(query, contexts);
      if (contextScore > 0.3) {
        score += contextScore * 7;
        matchedFields.push('context');
      }

      // Search in vocal styles
      const vocalStyles = region.performance.vocalStyle.join(' ');
      const vocalScore = fuzzyMatch(query, vocalStyles);
      if (vocalScore > 0.3) {
        score += vocalScore * 6;
        matchedFields.push('vocal style');
      }

      // Search in musician castes/communities
      const castes = (region.socialContext.musicianCaste || []).join(' ');
      const casteScore = fuzzyMatch(query, castes);
      if (casteScore > 0.3) {
        score += casteScore * 5;
        matchedFields.push('communities');
      }

      // Only include if there's at least some match
      if (score < 1 && filters.query.trim()) {
        return;
      }
    } else {
      // If no query, give base score for filter matches
      score = 5;
    }

    results.push({
      region,
      score,
      matchedFields: [...new Set(matchedFields)],
    });
  });

  // Sort by score (highest first)
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Get all unique instruments across regions for autocomplete
 */
export function getAllInstruments(): string[] {
  const instruments = new Set<string>();

  musicalRegions.forEach(region => {
    region.instruments.melodic.forEach(i => instruments.add(i));
    region.instruments.rhythmic.forEach(i => instruments.add(i));
    region.instruments.unique.forEach(i => instruments.add(i));
  });

  return Array.from(instruments).sort();
}

/**
 * Get all unique genres/contexts for autocomplete
 */
export function getAllGenres(): string[] {
  const genres = new Set<string>();

  musicalRegions.forEach(region => {
    region.performance.performanceContext.forEach(g => genres.add(g));
    region.language.poeticTraditions.forEach(g => genres.add(g));
  });

  return Array.from(genres).sort();
}

/**
 * Get all linguistic families
 */
export function getAllLinguisticFamilies(): string[] {
  const families = new Set<string>();

  musicalRegions.forEach(region => {
    families.add(region.language.linguisticFamily);
  });

  return Array.from(families).sort();
}

/**
 * Get all tempo ranges
 */
export function getAllTempoRanges(): string[] {
  const tempos = new Set<string>();

  musicalRegions.forEach(region => {
    tempos.add(region.musicalStructure.tempo);
  });

  return Array.from(tempos).sort();
}

/**
 * Get all scale types
 */
export function getAllScaleTypes(): string[] {
  const scales = new Set<string>();

  musicalRegions.forEach(region => {
    scales.add(region.musicalStructure.scaleType);
  });

  return Array.from(scales).sort();
}

/**
 * Get autocomplete suggestions based on partial query
 */
export function getAutocompleteSuggestions(query: string, limit: number = 10): string[] {
  if (!query.trim()) return [];

  const suggestions = new Set<string>();
  const lowerQuery = query.toLowerCase();

  // Add matching region names
  musicalRegions.forEach(region => {
    if (region.name.toLowerCase().includes(lowerQuery)) {
      suggestions.add(region.name);
    }
  });

  // Add matching instruments
  getAllInstruments().forEach(inst => {
    if (inst.toLowerCase().includes(lowerQuery)) {
      suggestions.add(inst);
    }
  });

  // Add matching genres
  getAllGenres().forEach(genre => {
    if (genre.toLowerCase().includes(lowerQuery)) {
      suggestions.add(genre);
    }
  });

  // Add matching communities
  musicalRegions.forEach(region => {
    region.socialContext.musicianCaste?.forEach(caste => {
      if (caste.toLowerCase().includes(lowerQuery)) {
        suggestions.add(caste);
      }
    });
  });

  return Array.from(suggestions).slice(0, limit);
}
