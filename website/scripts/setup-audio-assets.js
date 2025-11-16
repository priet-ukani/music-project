#!/usr/bin/env node

/**
 * Setup audio assets - create placeholder files and download from free sources
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const baseDir = path.join(__dirname, '..', 'public', 'audio');
const ambientDir = path.join(baseDir, 'ambient');
const instrumentsDir = path.join(baseDir, 'instruments');
const ensemblesDir = path.join(baseDir, 'ensembles');

// Create directories
[ambientDir, instrumentsDir, ensemblesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Free audio sources (Freesound.org, Archive.org, etc.)
// Note: These are placeholder URLs - replace with actual free audio files
const audioSources = {
  ambient: {
    'desert_wind.mp3': 'https://archive.org/download/ambient_desert_wind/desert_wind.mp3',
    'river_flowing.mp3': 'https://archive.org/download/ambient_river/river_flowing.mp3',
    'temple_bells.mp3': 'https://archive.org/download/temple_bells/temple_bells.mp3',
    'village_ambience.mp3': 'https://archive.org/download/village_ambience/village_ambience.mp3',
    'tropical_rain.mp3': 'https://archive.org/download/tropical_rain/tropical_rain.mp3',
    'coastal_waves.mp3': 'https://archive.org/download/coastal_waves/coastal_waves.mp3',
    'monsoon_rain.mp3': 'https://archive.org/download/monsoon_rain/monsoon_rain.mp3',
    'rural_evening.mp3': 'https://archive.org/download/rural_evening/rural_evening.mp3',
    'mountain_breeze.mp3': 'https://archive.org/download/mountain_breeze/mountain_breeze.mp3',
    'river_forest.mp3': 'https://archive.org/download/river_forest/river_forest.mp3',
    'temple_courtyard.mp3': 'https://archive.org/download/temple_courtyard/temple_courtyard.mp3',
    'beach_waves.mp3': 'https://archive.org/download/beach_waves/beach_waves.mp3',
    'city_temple.mp3': 'https://archive.org/download/city_temple/city_temple.mp3',
  }
};

// Create a README with instructions
const readme = `# Audio Assets

## Current Status
Audio files are not included in the repository due to size and licensing constraints.

## Setup Instructions

### Option 1: Use External URLs (Recommended for Development)
Update the audio URLs in \`src/contexts/AudioContext.tsx\` to point to external sources:
- Archive.org
- Freesound.org (requires attribution)
- YouTube audio (with proper licensing)

### Option 2: Download Free Audio Files
1. Visit https://freesound.org and search for:
   - Desert wind
   - River flowing
   - Temple bells
   - Village ambience
   - etc.

2. Download files with Creative Commons licenses
3. Place them in the appropriate directories:
   - \`public/audio/ambient/\` - Background ambient sounds
   - \`public/audio/instruments/\` - Instrument samples
   - \`public/audio/ensembles/\` - Full ensemble recordings

### Option 3: Generate Placeholder Audio
Use online tools or audio software to create short loops:
- 1-2 minute seamless loops for ambient sounds
- 10-30 second samples for instruments
- Full songs (2-5 minutes) for ensembles

## Attribution
Remember to attribute audio sources properly in \`ATTRIBUTIONS.md\`
`;

fs.writeFileSync(path.join(baseDir, 'README.md'), readme);

// Create audio-sources.json for reference
fs.writeFileSync(
  path.join(baseDir, 'audio-sources.json'),
  JSON.stringify(audioSources, null, 2)
);

console.log('✅ Audio asset structure created!');
console.log('📝 See public/audio/README.md for setup instructions');

