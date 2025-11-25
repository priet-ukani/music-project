#!/usr/bin/env python3
"""
Download authentic audio files for Musical Map of India using spotdl
This script downloads real Indian classical and folk music from YouTube/Spotify
"""

import subprocess
import os
import sys
import time
from pathlib import Path
from datetime import datetime, timedelta

# Audio file mappings: filename -> search query
# Each search query is crafted to find the most authentic recording
AUDIO_QUERIES = {
    # === REGIONAL MUSIC SAMPLES (37 files) ===
    
    # Rajasthan
    "rajasthan-maand.mp3": "Rajasthani Maand traditional folk music Mame Khan Langa Manganiyar",
    "rajasthan-kamaycha.mp3": "Kamaycha Rajasthani folk instrument Manganiyar traditional",
    
    # Punjab
    "punjab-bhangra.mp3": "Traditional Punjabi Bhangra dhol dance music authentic",
    "punjab-tumbi.mp3": "Tumbi ektara traditional Punjabi folk instrument",
    
    # West Bengal
    "bengal-baul.mp3": "Baul folk song Bengal ektara dotara traditional mystic",
    "bengal-tagore.mp3": "Rabindra Sangeet Tagore song Bengali classical",
    
    # Telangana
    "telangana-perini.mp3": "Perini Shivatandavam Telugu traditional drum dance",
    "telangana-oggu.mp3": "Oggu Katha Telugu folk ballad narrative traditional",
    
    # Assam
    "assam-bihu.mp3": "Bihu song Assamese folk music Pepa traditional festival",
    
    # Kerala
    "kerala-panchavadyam.mp3": "Panchavadyam Kerala temple percussion ensemble",
    "kerala-sopanam.mp3": "Sopanam Kerala devotional temple music",
    
    # Tamil Nadu
    "tamilnadu-kriti.mp3": "Carnatic kriti Tamil classical vocal M S Subbulakshmi",
    "tamilnadu-nadaswaram.mp3": "Nadaswaram Tamil temple music Shehnai South Indian",
    
    # Maharashtra
    "maharashtra-lavani.mp3": "Lavani traditional Maharashtra dance music dholki",
    
    # Jammu & Kashmir
    "kashmir-sufiana.mp3": "Sufiana Kalam Kashmir Sufi music Santoor",
    
    # Nagaland
    "nagaland-chant.mp3": "Nagaland tribal folk music chant Northeast India",
    
    # Manipur
    "manipur-pung.mp3": "Pung Cholom Manipuri drum dance traditional",
    
    # Uttar Pradesh
    "up-thumri.mp3": "Thumri light classical Hindustani vocal North Indian",
    "up-shehnai.mp3": "Shehnai Bismillah Khan instrumental classical",
    
    # Gujarat
    "gujarat-garba.mp3": "Garba Gujarat traditional folk devotional dhol Navratri",
    "gujarat-dandiya.mp3": "Dandiya Raas Gujarat folk dance music sticks",
    
    # Karnataka
    "karnataka-kriti.mp3": "Karnataka Carnatic kriti classical South Indian vocal",
    "karnataka-yakshagana.mp3": "Yakshagana Karnataka traditional dance drama music",
    
    # Odisha
    "odisha-odissi.mp3": "Odissi classical dance music Odisha traditional",
    "odisha-geetagovinda.mp3": "Geeta Govinda Odisha devotional Jayadeva",
    
    # Uttarakhand
    "uttarakhand-jagar.mp3": "Jagar Uttarakhand ritual folk music mountain",
    "uttarakhand-folk.mp3": "Uttarakhand folk song Garhwali Kumaoni traditional",
    
    # Mizoram
    "mizoram-cheraw.mp3": "Cheraw bamboo dance Mizoram traditional music",
    "mizoram-hymn.mp3": "Mizo Christian hymn traditional Northeast India",
    
    # Goa
    "goa-mando.mp3": "Mando Goa traditional love ballad Konkani",
    "goa-fugdi.mp3": "Fugdi Goa women folk dance music Konkani",
    
    # Meghalaya
    "meghalaya-khasi.mp3": "Khasi tribal folk music Meghalaya traditional",
    "meghalaya-nongkrem.mp3": "Nongkrem dance festival Khasi Meghalaya music",
    
    # Chhattisgarh
    "chhattisgarh-pandavani.mp3": "Pandavani Chhattisgarh folk narrative ballad",
    "chhattisgarh-raut.mp3": "Raut Nacha Chhattisgarh tribal dance music",
    
    # Jharkhand
    "jharkhand-jhumair.mp3": "Jhumair Jharkhand tribal harvest festival dance",
    "jharkhand-karma.mp3": "Karma dance Jharkhand tribal folk music festival",
    
    # === ARTIST SAMPLES (7 files) ===
    
    # Gujarat Artists
    "osman-har-har-gange.mp3": "Osman Mir Har Har Gange Gujarati devotional Sufi",
    "hemant-shrinathji.mp3": "Hemant Chauhan Shrinathji aarti Gujarati bhajan",
    "kirtidan-thai.mp3": "Kirtidan Gadhvi Thai Thai Thai Gujarati folk fusion",
    
    # Rajasthan Artists
    "mame-sufi.mp3": "Mame Khan Rajasthani Sufi folk Langa Manganiyar",
    
    # Punjab Artists
    "gurdas-apna-punjab.mp3": "Gurdas Maan Apna Punjab Punjabi folk anthem",
    
    # Telangana Artists
    "venkanna-okatante.mp3": "Goreti Venkanna Okatante Telugu folk song",
    "vimalakka-telangana.mp3": "Gaddar Vimalakka Telugu revolutionary folk song",
    
    # === ENSEMBLE RECORDINGS (1 file) ===
    "tyagaraja-jagadananda-pallavi.mp3": "Tyagaraja kriti Jagadananda Karaka Carnatic pallavi classical",
}

# Instrument specific queries
INSTRUMENT_QUERIES = {
    # Rajasthan
    "kamaycha_track.mp3": "Kamaycha instrument solo performance audio",
    "dholak_track.mp3": "Dholak drum rhythm solo audio",
    "algoza_loop.mp3": "Algoza double flute solo instrumental",
    "morchang_loop.mp3": "Morchang jaw harp solo instrumental",

    # Punjab
    "tumbi_loop.mp3": "Tumbi Punjabi folk instrument solo",
    "dhol_beat.mp3": "Dhol Punjabi bhangra beat solo",
    "chimta_track.mp3": "Chimta Punjabi folk instrument solo",

    # Bengal
    "ektara_loop.mp3": "Ektara Baul instrument solo",
    "tabla_isolated_beat.mp3": "Tabla solo rhythm loop",
    "bansuri_alap.mp3": "Bansuri flute alap solo",
    "dotara_track.mp3": "Dotara Bengal folk instrument solo",

    # Telangana
    "nadaswaram_phrase.mp3": "Nadaswaram south indian instrument solo",
    "dappu_beat.mp3": "Dappu drum Telangana folk beat",
    "dol_rhythm.mp3": "Dol drum rhythm solo",

    # Kerala
    "chenda_melam.mp3": "Chenda melam solo drum",
    "maddalam_track.mp3": "Maddalam drum solo",
    "kombu_call.mp3": "Kombu horn Kerala solo",

    # Tamil Nadu
    "veena_sample.mp3": "Veena Carnatic classical solo",
    "mridangam_pattern.mp3": "Mridangam solo thani avartanam",
    "ghatam_beat.mp3": "Ghatam percussion solo",

    # Gujarat
    "dandiya_sticks.mp3": "Dandiya Raas sticks rhythm sound",
    "manjira_loop.mp3": "Manjira cymbals rhythm loop",
}

# Directories
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
AUDIO_DIR = PROJECT_ROOT / "public" / "audio"
ENSEMBLE_DIR = AUDIO_DIR / "ensembles"
INSTRUMENTS_DIR = AUDIO_DIR / "instruments"
LOG_FILE = SCRIPT_DIR / "audio_download_log.txt"

# Ensure directories exist
AUDIO_DIR.mkdir(parents=True, exist_ok=True)
ENSEMBLE_DIR.mkdir(parents=True, exist_ok=True)
INSTRUMENTS_DIR.mkdir(parents=True, exist_ok=True)

def log_message(message, to_file=True):
    """Log message to console and file"""
    print(message)
    if to_file:
        with open(LOG_FILE, 'a', encoding='utf-8') as f:
            timestamp = time.strftime('%Y-%m-%d %H:%M:%S')
            f.write(f"[{timestamp}] {message}\n")

def print_progress_bar(current, total, start_time, successful, failed):
    """Print a fancy progress bar with statistics"""
    percentage = (current / total) * 100
    filled = int(percentage / 2)  # 50 chars wide bar
    bar = '█' * filled + '░' * (50 - filled)
    
    # Calculate time estimates
    elapsed = time.time() - start_time
    if current > 0:
        avg_time_per_file = elapsed / current
        remaining_files = total - current
        eta_seconds = avg_time_per_file * remaining_files
        eta = str(timedelta(seconds=int(eta_seconds)))
    else:
        eta = "calculating..."
    
    elapsed_str = str(timedelta(seconds=int(elapsed)))
    
    # Print progress bar
    print(f"\n{'='*70}")
    print(f"📊 PROGRESS: [{bar}] {percentage:.1f}%")
    print(f"{'='*70}")
    print(f"  📥 Downloaded: {current}/{total} files")
    print(f"  ✅ Successful: {successful}")
    print(f"  ❌ Failed: {failed}")
    print(f"  ⏱️  Elapsed: {elapsed_str}")
    print(f"  ⏳ ETA: {eta}")
    print(f"{'='*70}\n")

def download_audio(filename, query, output_dir):
    """Download audio using spotdl"""
    try:
        log_message(f"\n[{filename}] Searching: '{query}'")
        
        # spotdl command with output directory
        command = [
            "spotdl",
            query,
            "--output", str(output_dir),
            "--format", "mp3",
            "--bitrate", "192k",
        ]
        
        # Run spotdl
        result = subprocess.run(
            command,
            check=True,
            capture_output=True,
            text=True,
            timeout=120  # 2 minute timeout per song
        )
        
        # spotdl saves with its own naming - we need to find and rename the file
        # It typically saves as "Artist - Title.mp3"
        # We'll look for the most recently created mp3 file
        
        log_message(f"  ✅ Downloaded successfully", to_file=True)
        return True
        
    except subprocess.TimeoutExpired:
        log_message(f"  ⏱️  Timeout - skipping", to_file=True)
        return False
    except subprocess.CalledProcessError as e:
        log_message(f"  ❌ Error: {e.stderr[:200]}", to_file=True)
        return False
    except FileNotFoundError:
        log_message(f"  ❌ ERROR: 'spotdl' command not found!", to_file=True)
        log_message("  Please install: pipx install spotdl", to_file=True)
        return False
    except Exception as e:
        log_message(f"  ❌ Unexpected error: {str(e)[:200]}", to_file=True)
        return False

def rename_downloaded_file(output_dir, target_filename):
    """Find most recently downloaded file and rename it"""
    try:
        # Find all mp3 files in directory
        mp3_files = list(output_dir.glob("*.mp3"))
        if not mp3_files:
            return False
        
        # Get the most recently modified file
        latest_file = max(mp3_files, key=lambda p: p.stat().st_mtime)
        
        # If it's already the target name, skip
        if latest_file.name == target_filename:
            return True
        
        # Rename to target filename
        target_path = output_dir / target_filename
        if target_path.exists():
            # Backup existing file
            backup_path = output_dir / f"{target_filename}.backup"
            target_path.rename(backup_path)
        
        latest_file.rename(target_path)
        log_message(f"  📝 Renamed to: {target_filename}", to_file=True)
        return True
        
    except Exception as e:
        log_message(f"  ⚠️  Could not rename: {e}", to_file=True)
        return False

def main():
    """Main download script"""
    log_message("=" * 70)
    log_message("🎵 Musical Map of India - Audio Downloader (spotdl)")
    log_message("=" * 70)
    log_message(f"Audio directory: {AUDIO_DIR}")
    log_message(f"Instruments directory: {INSTRUMENTS_DIR}")
    
    # Prepare tasks
    tasks = []
    for filename, query in AUDIO_QUERIES.items():
        if filename.startswith("tyagaraja"):
            output_dir = ENSEMBLE_DIR
        else:
            output_dir = AUDIO_DIR
        tasks.append((filename, query, output_dir))
        
    for filename, query in INSTRUMENT_QUERIES.items():
        tasks.append((filename, query, INSTRUMENTS_DIR))
        
    log_message(f"Total files to download: {len(tasks)}")
    log_message(f"Log file: {LOG_FILE}\n")
    
    # Check if spotdl is installed
    try:
        subprocess.run(["spotdl", "--version"], capture_output=True, check=True)
        log_message("✅ spotdl is installed\n")
    except (subprocess.CalledProcessError, FileNotFoundError):
        log_message("❌ ERROR: spotdl is not installed!")
        log_message("Please install it first:")
        log_message("  pipx install spotdl")
        log_message("  spotdl --download-ffmpeg")
        sys.exit(1)
    
    # Download statistics
    successful = 0
    failed = 0
    skipped = 0
    start_time = time.time()
    
    # Create checkpoint file for resume capability
    checkpoint_file = SCRIPT_DIR / ".download_checkpoint.txt"
    completed_files = set()
    if checkpoint_file.exists():
        with open(checkpoint_file, 'r') as f:
            completed_files = set(line.strip() for line in f)
        log_message(f"📂 Resuming from checkpoint: {len(completed_files)} files already processed\n")
    
    # Process each audio file
    for idx, (filename, query, output_dir) in enumerate(tasks, 1):
        # Show progress bar every file
        print_progress_bar(idx - 1, len(tasks), start_time, successful, failed)
        
        log_message(f"[{idx}/{len(tasks)}] Processing: {filename}")
        log_message(f"{'='*70}")
        
        # Skip if already in checkpoint
        if filename in completed_files:
            log_message(f"  ✓ Already processed (from checkpoint), skipping")
            skipped += 1
            continue
        
        # Check if file already exists and is a real audio file (not placeholder)
        # Placeholders are ~172KB, real audio should be much larger (>300KB)
        target_path = output_dir / filename
        if target_path.exists() and target_path.stat().st_size > 300000:  # > 300KB
            log_message(f"  ⏭️  Already exists ({target_path.stat().st_size // 1024}KB), skipping")
            skipped += 1
            # Add to checkpoint
            with open(checkpoint_file, 'a') as f:
                f.write(f"{filename}\n")
            continue
        
        # Download the audio
        success = download_audio(filename, query, output_dir)
        
        if success:
            # Try to rename the downloaded file
            if rename_downloaded_file(output_dir, filename):
                successful += 1
                log_message(f"  ✅ SUCCESS: {filename}")
                # Add to checkpoint
                with open(checkpoint_file, 'a') as f:
                    f.write(f"{filename}\n")
            else:
                log_message(f"  ⚠️  Downloaded but couldn't rename to {filename}")
                successful += 1
                # Add to checkpoint anyway
                with open(checkpoint_file, 'a') as f:
                    f.write(f"{filename}\n")
        else:
            failed += 1
            log_message(f"  ❌ FAILED: {filename}")
        
        # Rate limiting - be nice to services
        time.sleep(2)
    
    # Final progress bar
    print_progress_bar(len(tasks), len(tasks), start_time, successful, failed)
    
    # Final summary
    log_message("\n" + "=" * 70)
    log_message("📊 DOWNLOAD SUMMARY")
    log_message("=" * 70)
    log_message(f"✅ Successful: {successful}")
    log_message(f"⏭️  Skipped (already exist): {skipped}")
    log_message(f"❌ Failed: {failed}")
    log_message(f"📝 Total processed: {successful + failed + skipped}/{len(tasks)}")
    log_message(f"📄 Log saved to: {LOG_FILE}")
    
    # Clean up checkpoint if all complete
    if successful + skipped == len(tasks):
        if checkpoint_file.exists():
            checkpoint_file.unlink()
            log_message(f"🗑️  Checkpoint file removed (all files complete)")
    
    log_message("=" * 70)
    
    if successful > 0:
        log_message("\n✅ Audio files downloaded successfully!")
        log_message("🔄 Reload your website to hear the new audio samples!")
    
    if failed > 0:
        log_message(f"\n⚠️  {failed} downloads failed. Check the log for details.")
        log_message("You can re-run this script - it will resume from where it left off.")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        log_message("\n\n⚠️  Download interrupted by user")
        log_message("Progress saved to checkpoint file!")
        log_message("You can re-run the script to continue - already downloaded files will be skipped")
        sys.exit(1)
