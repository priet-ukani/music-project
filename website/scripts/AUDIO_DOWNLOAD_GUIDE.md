# Audio Download Guide - Using spotdl

## ✅ Setup Complete!

- **spotdl:** Installed ✓
- **Script:** `download-audio-spotdl.py` ✓
- **Audio files needed:** 45 files

---

## Quick Start

### 1. Test Download (Single File)
First, test with just one file to make sure everything works:

```bash
cd "/mnt/d/Sem 7/MW/NEW/music-project/website/scripts"

# Test with one Gujarat file
python3 download-audio-spotdl.py
```

The script will automatically skip already downloaded files.

### 2. Monitor Progress

The script shows real-time progress:
```
======================================================================
[1/45] Processing: gujarat-garba.mp3
======================================================================
[gujarat-garba.mp3] Searching: 'Garba Gujarat traditional folk...'
  ✅ Downloaded successfully
  📝 Renamed to: gujarat-garba.mp3
```

### 3. Check Results

After download completes:
```bash
# View download log
cat audio_download_log.txt

# Check downloaded files
ls -lh ../public/audio/*.mp3 | wc -l
```

---

## Download Strategy

### Option A: Download All at Once (Recommended)
```bash
cd "/mnt/d/Sem 7/MW/NEW/music-project/website/scripts"
python3 download-audio-spotdl.py
```

- **Time:** ~2-3 hours (45 files × 2-4 min each)
- **Best for:** Leaving overnight
- **Resumable:** Yes! Re-run to continue

### Option B: Download in Batches

**Batch 1: Gujarat (Priority)** - 5 files
```bash
# Edit download-audio-spotdl.py and comment out other files
# Keep only Gujarat files in AUDIO_QUERIES dictionary
python3 download-audio-spotdl.py
```

**Batch 2: Featured Artists** - 7 files
**Batch 3: Major Regions** - Remaining files

---

## Troubleshooting

### Issue: "spotdl command not found"
```bash
# Check if spotdl is installed
which spotdl

# If not found, reinstall
pipx install spotdl
```

### Issue: "FFmpeg not found"
spotdl will attempt to download ffmpeg automatically, or:
```bash
# Install system ffmpeg
sudo apt install ffmpeg
```

### Issue: "Download failed" for specific songs
- **Cause:** Song not found on YouTube/Spotify
- **Solution:** The script will skip and continue
- **Manual fix:** Search YouTube manually for that specific audio

### Issue: Downloaded files have wrong names
- **Cause:** spotdl names files as "Artist - Title.mp3"
- **Solution:** Script automatically renames them
- **Manual fix:** Rename files manually to match required names

---

## What Happens During Download

1. **Search:** spotdl searches YouTube/Spotify for your query
2. **Select:** Picks the best quality match
3. **Download:** Downloads audio stream
4. **Convert:** Converts to MP3 (192kbps)
5. **Metadata:** Adds artist/title tags
6. **Rename:** Renames to match your website's naming

---

## File Quality

All downloads will be:
- **Format:** MP3
- **Bitrate:** 192 kbps (good quality, reasonable size)
- **Sample Rate:** 44.1 kHz
- **Size:** ~3-5 MB per file
- **Total:** ~150-225 MB for all 45 files

---

## After Download

1. **Reload website** - Audio players will automatically detect new files
2. **Test audio playback** - Click on regions/artists to verify
3. **Review quality** - Listen to samples, replace any low-quality ones
4. **Cleanup** - Keep backup of placeholders if needed

---

## Important Notes

⚠️ **Copyright:** 
- spotdl downloads from YouTube/Spotify
- Ensure usage complies with educational/fair use
- For commercial use, obtain proper licenses

⏱️ **Time:**
- Each file: 2-4 minutes
- Full download: 2-3 hours
- Includes automatic 2-second delay between downloads

💾 **Storage:**
- Placeholder files: ~7.5 MB total
- Real audio files: ~150-225 MB total
- Make sure you have ~250 MB free space

🔄 **Resumable:**
- Script automatically skips existing files
- Safe to Ctrl+C and resume later
- Progress logged to `audio_download_log.txt`

---

## Expected Output

```
🎵 Musical Map of India - Audio Downloader (spotdl)
======================================================================
Total files to download: 45

[1/45] Processing: gujarat-garba.mp3
  ✅ Downloaded successfully
  📝 Renamed to: gujarat-garba.mp3

[2/45] Processing: gujarat-dandiya.mp3
  ✅ Downloaded successfully
  📝 Renamed to: gujarat-dandiya.mp3

...

📊 DOWNLOAD SUMMARY
======================================================================
✅ Successful: 43
⏭️  Skipped (already exist): 0
❌ Failed: 2
📝 Total processed: 45/45
```

---

## Next Steps

Once download completes:

1. ✅ All 45 MP3 files will be in `public/audio/`
2. ✅ Website will automatically load them
3. ✅ Replace any failed downloads manually
4. ✅ Optionally replace low-quality files

**Ready to start?**
```bash
cd "/mnt/d/Sem 7/MW/NEW/music-project/website/scripts"
python3 download-audio-spotdl.py
```

Let it run and check back in 2-3 hours! ☕
