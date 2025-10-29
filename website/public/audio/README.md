# Audio Directory

This directory should contain audio samples for the Musical Map of India project.

## Required Audio Files

### Rajasthan
- `rajasthan-maand.mp3` - Traditional Rajasthani raga with characteristic nasal timbre
- `rajasthan-kamaycha.mp3` - Kamaycha performance by Manganiyar musician

### Punjab
- `punjab-bhangra.mp3` - Traditional Bhangra with powerful dhol rhythms
- `punjab-tumbi.mp3` - Single-string tumbi creating high-pitched melodic drone

### Bengal
- `bengal-baul.mp3` - Traditional Baul song with ektara and philosophical lyrics
- `bengal-tagore.mp3` - Rabindra Sangeet composition blending classical and folk

### Assam
- `assam-bihu.mp3` - Energetic Bihu song with dhol, pepa, and communal singing

### Kerala
- `kerala-panchavadyam.mp3` - Massive temple percussion ensemble with geometric acceleration
- `kerala-sopanam.mp3` - Meditative temple singing with nasal timbre

### Tamil Nadu
- `tamilnadu-kriti.mp3` - Classical Carnatic composition with veena and mridangam
- `tamilnadu-nadaswaram.mp3` - Auspicious temple music with nadaswaram and thavil

### Maharashtra
- `maharashtra-lavani.mp3` - Energetic Lavani with dholki, ghungroo bells, and theatrical vocals

### Kashmir
- `kashmir-sufiana.mp3` - Classical santoor performance with Persian-influenced raga

### Nagaland
- `nagaland-chant.mp3` - Traditional communal chant with log drums and call-response

### Manipur
- `manipur-pung.mp3` - Classical pung drum performance for Manipuri dance

## Audio Specifications

- **Format**: MP3 (recommended for web compatibility)
- **Bitrate**: 128-192 kbps (balance between quality and file size)
- **Duration**: 30-90 seconds per sample (short clips for web experience)
- **Sample Rate**: 44.1 kHz
- **File Size**: Aim for <3MB per file

## Sourcing Audio

Audio samples can be sourced from:
1. **Public Domain**: Archive.org, Musopen
2. **Creative Commons**: Freesound.org, ccMixter (with attribution)
3. **Academic Archives**: Ethnomusicology collections
4. **Field Recordings**: Original recordings with artist permission
5. **Cultural Organizations**: Government cultural ministries, museums

## Processing Recommendations

1. Trim to 30-90 second representative clips
2. Normalize audio levels
3. Remove background noise (gently)
4. Fade in/out for smooth playback
5. Add ID3 tags with proper attribution

## Copyright Notice

⚠️ **IMPORTANT**: Ensure all audio has appropriate licenses and permissions.

For commercial use or public distribution, obtain:
- Artist permissions
- Publishing rights
- Proper attribution information
- License documentation

This project is for educational/research purposes. All audio should include:
- Artist/ensemble name
- Recording date and location
- License type
- Attribution requirements

## Attribution Template

```
Title: [Song/Piece Name]
Artist: [Performer/Ensemble]
Region: [Geographic region]
Recording: [Year, Location]
License: [CC BY-SA 4.0 / Public Domain / etc.]
Source: [URL or archive reference]
```

## Placeholder Usage

Currently, the application references these audio files but they are not included in the repository. To use the application:

1. Add audio files to this directory
2. Ensure filenames match those in `src/data/regions.ts`
3. Or update the file references in the data file to match your audio files

The player will gracefully handle missing files by showing an error message.