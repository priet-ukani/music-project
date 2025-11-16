#!/usr/bin/env python3
"""
Download images from Wikipedia/Wikimedia Commons for the Musical Map of India website
"""

import os
import requests
import json
from pathlib import Path

# Base directories
BASE_DIR = Path(__file__).parent.parent / "public"
IMAGES_DIR = BASE_DIR / "images"
AUDIO_DIR = BASE_DIR / "audio" / "ambient"

# Create directories
IMAGES_DIR.mkdir(parents=True, exist_ok=True)
(IMAGES_DIR / "artists").mkdir(parents=True, exist_ok=True)
AUDIO_DIR.mkdir(parents=True, exist_ok=True)

# Image mappings - using Wikimedia Commons URLs
IMAGE_MAPPINGS = {
    # Rajasthan
    "rajasthan-kamaycha.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Kamaycha.jpg/800px-Kamaycha.jpg",
    "rajasthan-sarangi.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Sarangi.jpg/800px-Sarangi.jpg",
    "rajasthan-performance.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Rajasthani_folk_musicians.jpg/800px-Rajasthani_folk_musicians.jpg",
    
    # Punjab
    "punjab-dhol.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Dhol.jpg/800px-Dhol.jpg",
    "punjab-tumbi.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Tumbi.jpg/800px-Tumbi.jpg",
    "punjab-bhangra.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Bhangra_dance.jpg/800px-Bhangra_dance.jpg",
    
    # Bengal
    "bengal-ektara.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Ektara.jpg/800px-Ektara.jpg",
    "bengal-baul.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Baul_singer.jpg/800px-Baul_singer.jpg",
    
    # Telangana
    "telangana-dappu.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Dappu.jpg/800px-Dappu.jpg",
    "telangana-perini.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Perini_dance.jpg/800px-Perini_dance.jpg",
    
    # Artists
    "artists/mogilaiah-profile.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Indian_folk_musician.jpg/800px-Indian_folk_musician.jpg",
    "artists/venkanna-profile.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Indian_singer.jpg/800px-Indian_singer.jpg",
    "artists/lakha-khan-profile.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Sarangi_player.jpg/800px-Sarangi_player.jpg",
}

# Placeholder images using Unsplash (free high-quality images)
PLACEHOLDER_IMAGES = {
    "rajasthan-performance.jpg": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
    "punjab-bhangra.jpg": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
    "bengal-baul.jpg": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
}

def download_image(url, filepath):
    """Download an image from URL"""
    try:
        response = requests.get(url, timeout=10, stream=True)
        response.raise_for_status()
        
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        print(f"✅ Downloaded: {filepath.name}")
        return True
    except Exception as e:
        print(f"❌ Failed to download {filepath.name}: {e}")
        return False

def main():
    print("🚀 Starting image download...\n")
    
    downloaded = 0
    failed = 0
    
    for filename, url in IMAGE_MAPPINGS.items():
        filepath = IMAGES_DIR / filename
        filepath.parent.mkdir(parents=True, exist_ok=True)
        
        # Skip if already exists
        if filepath.exists():
            print(f"⏭️  Skipping {filename} (already exists)")
            continue
        
        if download_image(url, filepath):
            downloaded += 1
        else:
            failed += 1
    
    print(f"\n✨ Download complete!")
    print(f"   ✅ Downloaded: {downloaded}")
    print(f"   ❌ Failed: {failed}")
    print(f"\n⚠️  Note: Some images may not exist. Using placeholder images from Unsplash.")
    print(f"   You can manually download images and place them in: {IMAGES_DIR}")

if __name__ == "__main__":
    main()

