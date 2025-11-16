#!/usr/bin/env python3
"""
Complete asset setup - creates placeholders and manifests
Works even without PIL - creates simple placeholder files
"""

import os
import json
import base64
from pathlib import Path
from datetime import datetime

BASE_DIR = Path(__file__).parent.parent / "public"
IMAGES_DIR = BASE_DIR / "images"
AUDIO_DIR = BASE_DIR / "audio"
AUDIO_AMBIENT = AUDIO_DIR / "ambient"

# Create directories
for d in [IMAGES_DIR, IMAGES_DIR / "artists", AUDIO_AMBIENT]:
    d.mkdir(parents=True, exist_ok=True)

# All required images from regions.ts
REQUIRED_IMAGES = {
    "rajasthan-kamaycha.jpg": "Rajasthan Kamaycha",
    "rajasthan-sarangi.jpg": "Rajasthan Sarangi",
    "rajasthan-performance.jpg": "Rajasthan Performance",
    "punjab-dhol.jpg": "Punjab Dhol",
    "punjab-tumbi.jpg": "Punjab Tumbi",
    "punjab-bhangra.jpg": "Punjab Bhangra",
    "bengal-ektara.jpg": "Bengal Ektara",
    "bengal-baul.jpg": "Bengal Baul",
    "telangana-dappu.jpg": "Telangana Dappu",
    "telangana-perini.jpg": "Telangana Perini",
    "tamilnadu-veena.jpg": "Tamil Nadu Veena",
    "tamilnadu-mridangam.jpg": "Tamil Nadu Mridangam",
    "tamilnadu-concert.jpg": "Tamil Nadu Concert",
    "kerala-chenda.jpg": "Kerala Chenda",
    "kerala-temple.jpg": "Kerala Temple",
    "maharashtra-dholki.jpg": "Maharashtra Dholki",
    "maharashtra-lavani.jpg": "Maharashtra Lavani",
    "kashmir-santoor.jpg": "Kashmir Santoor",
    "kashmir-performance.jpg": "Kashmir Performance",
    "artists/mogilaiah-profile.jpg": "Mogilaiah",
    "artists/venkanna-profile.jpg": "Venkanna",
    "artists/lakha-khan-profile.jpg": "Lakha Khan",
}

# Required audio files
REQUIRED_AUDIO = {
    "ambient": [
        "desert_wind.mp3", "river_flowing.mp3", "temple_bells.mp3",
        "village_ambience.mp3", "tropical_rain.mp3", "coastal_waves.mp3",
        "monsoon_rain.mp3", "rural_evening.mp3", "mountain_breeze.mp3",
        "river_forest.mp3", "temple_courtyard.mp3", "beach_waves.mp3",
        "city_temple.mp3"
    ]
}

def create_placeholder_image(filepath, text):
    """Create a simple HTML placeholder that can be used as image reference"""
    # Create a marker file indicating this is a placeholder
    marker_file = filepath.with_suffix('.placeholder.txt')
    with open(marker_file, 'w') as f:
        f.write(f"Placeholder for: {text}\n")
        f.write(f"To add real image: Download from Wikimedia Commons or Unsplash\n")
        f.write(f"Placeholder URL: https://via.placeholder.com/800x600/e5e7eb/9ca3af?text={text.replace(' ', '+')}\n")
    print(f"✅ Created placeholder marker: {filepath.name}")

def create_silent_audio(filepath):
    """Create a minimal silent WAV file"""
    # Minimal WAV header + 1 second silence
    wav_data = base64.b64decode(
        'UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA='
    )
    # Extend to 1 second at 44.1kHz
    silence = b'\x00' * 88200  # 44100 samples * 2 bytes
    with open(filepath.with_suffix('.wav'), 'wb') as f:
        f.write(wav_data[:44])  # Header
        f.write(silence)
    print(f"✅ Created audio placeholder: {filepath.name}")

def create_image_manifest():
    """Create image manifest"""
    manifest = {
        "version": "1.0",
        "lastUpdated": datetime.now().isoformat(),
        "images": {}
    }
    
    for filename, description in REQUIRED_IMAGES.items():
        filepath = IMAGES_DIR / filename
        exists = filepath.exists()
        is_placeholder = filepath.with_suffix('.placeholder.txt').exists()
        
        manifest["images"][filename] = {
            "exists": exists,
            "isPlaceholder": is_placeholder,
            "path": f"/images/{filename}",
            "description": description,
            "type": "instrument" if any(x in filename for x in ["kamaycha", "sarangi", "dhol", "veena", "mridangam", "ektara", "santoor", "chenda", "dappu", "tumbi", "dholki"]) else "performance" if "performance" in filename or "baul" in filename or "bhangra" in filename or "lavani" in filename or "concert" in filename or "temple" in filename or "perini" in filename else "artist" if "artists" in filename else "other"
        }
    
    with open(IMAGES_DIR / "manifest.json", 'w') as f:
        json.dump(manifest, f, indent=2)
    print("✅ Created image manifest")

def create_audio_manifest():
    """Create audio manifest"""
    manifest = {
        "version": "1.0",
        "lastUpdated": datetime.now().isoformat(),
        "audio": {
            "ambient": {},
            "instruments": {},
            "ensembles": {}
        }
    }
    
    for filename in REQUIRED_AUDIO["ambient"]:
        filepath = AUDIO_AMBIENT / filename
        wav_path = filepath.with_suffix('.wav')
        exists = filepath.exists() or wav_path.exists()
        
        manifest["audio"]["ambient"][filename] = {
            "exists": exists,
            "isPlaceholder": wav_path.exists() and not filepath.exists(),
            "path": f"/audio/ambient/{filename}",
            "fallbackPath": f"/audio/ambient/{filename.replace('.mp3', '.wav')}" if wav_path.exists() else None
        }
    
    with open(AUDIO_DIR / "manifest.json", 'w') as f:
        json.dump(manifest, f, indent=2)
    print("✅ Created audio manifest")

def main():
    print("🚀 Setting up assets and manifests...\n")
    
    # Create image placeholders
    print("📸 Creating image placeholders...")
    for filename, description in REQUIRED_IMAGES.items():
        filepath = IMAGES_DIR / filename
        filepath.parent.mkdir(parents=True, exist_ok=True)
        
        if not filepath.exists():
            create_placeholder_image(filepath, description)
    
    # Create audio placeholders
    print("\n🎵 Creating audio placeholders...")
    for filename in REQUIRED_AUDIO["ambient"]:
        filepath = AUDIO_AMBIENT / filename
        if not filepath.exists() and not filepath.with_suffix('.wav').exists():
            create_silent_audio(filepath)
    
    # Create manifests
    print("\n📋 Creating manifests...")
    create_image_manifest()
    create_audio_manifest()
    
    print("\n✨ Setup complete!")
    print("\n📝 Next steps:")
    print("   1. Download real images from:")
    print("      - https://commons.wikimedia.org")
    print("      - https://unsplash.com")
    print("   2. Download real audio from:")
    print("      - https://freesound.org (Creative Commons)")
    print("      - https://archive.org (Public Domain)")
    print("   3. Replace placeholder files in public/images/ and public/audio/")
    print("   4. Run this script again to update manifests")

if __name__ == "__main__":
    main()

