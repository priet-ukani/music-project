#!/usr/bin/env python3
"""
Simple script to download images using working URLs from Unsplash and other sources
"""

import os
import requests
import json
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent / "public"
IMAGES_DIR = BASE_DIR / "images"
IMAGES_DIR.mkdir(parents=True, exist_ok=True)
(IMAGES_DIR / "artists").mkdir(parents=True, exist_ok=True)

# Use Unsplash Source API (free, no key needed) for high-quality images
# Format: https://source.unsplash.com/WIDTHxHEIGHT/?KEYWORD

IMAGE_MAPPINGS = {
    # Rajasthan - using Unsplash with Indian music keywords
    "rajasthan-kamaycha.jpg": "https://source.unsplash.com/800x600/?indian+musical+instrument",
    "rajasthan-sarangi.jpg": "https://source.unsplash.com/800x600/?indian+string+instrument",
    "rajasthan-performance.jpg": "https://source.unsplash.com/1200x800/?rajasthani+folk+music",
    
    # Punjab
    "punjab-dhol.jpg": "https://source.unsplash.com/800x600/?indian+drum",
    "punjab-tumbi.jpg": "https://source.unsplash.com/800x600/?indian+musical+instrument",
    "punjab-bhangra.jpg": "https://source.unsplash.com/1200x800/?bhangra+dance",
    
    # Bengal
    "bengal-ektara.jpg": "https://source.unsplash.com/800x600/?indian+string+instrument",
    "bengal-baul.jpg": "https://source.unsplash.com/1200x800/?baul+music+india",
    
    # Telangana
    "telangana-dappu.jpg": "https://source.unsplash.com/800x600/?indian+drum",
    "telangana-perini.jpg": "https://source.unsplash.com/1200x800/?indian+classical+dance",
    
    # Tamil Nadu
    "tamilnadu-veena.jpg": "https://source.unsplash.com/800x600/?veena+instrument",
    "tamilnadu-mridangam.jpg": "https://source.unsplash.com/800x600/?mridangam+drum",
    "tamilnadu-concert.jpg": "https://source.unsplash.com/1200x800/?carnatic+music",
    
    # Kerala
    "kerala-chenda.jpg": "https://source.unsplash.com/800x600/?indian+drum",
    "kerala-temple.jpg": "https://source.unsplash.com/1200x800/?kerala+temple",
    
    # Maharashtra
    "maharashtra-dholki.jpg": "https://source.unsplash.com/800x600/?indian+drum",
    "maharashtra-lavani.jpg": "https://source.unsplash.com/1200x800/?indian+folk+dance",
    
    # Kashmir
    "kashmir-santoor.jpg": "https://source.unsplash.com/800x600/?santoor+instrument",
    "kashmir-performance.jpg": "https://source.unsplash.com/1200x800/?kashmiri+music",
    
    # Artists (generic musician photos)
    "artists/mogilaiah-profile.jpg": "https://source.unsplash.com/800x800/?indian+musician+portrait",
    "artists/venkanna-profile.jpg": "https://source.unsplash.com/800x800/?indian+singer",
    "artists/lakha-khan-profile.jpg": "https://source.unsplash.com/800x800/?indian+musician",
}

def download_image(url, filepath):
    """Download image with retry"""
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers, timeout=30, stream=True, allow_redirects=True)
        response.raise_for_status()
        
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"✅ Downloaded: {filepath.name}")
        return True
    except Exception as e:
        print(f"❌ Failed {filepath.name}: {e}")
        return False

def main():
    print("🚀 Downloading images from Unsplash...\n")
    
    downloaded = 0
    failed = 0
    
    for filename, url in IMAGE_MAPPINGS.items():
        filepath = IMAGES_DIR / filename
        filepath.parent.mkdir(parents=True, exist_ok=True)
        
        if filepath.exists():
            print(f"⏭️  Skipping {filename} (exists)")
            continue
        
        if download_image(url, filepath):
            downloaded += 1
        else:
            failed += 1
    
    print(f"\n✅ Downloaded: {downloaded}")
    print(f"❌ Failed: {failed}")
    print("\n✨ Done! Images are in public/images/")

if __name__ == "__main__":
    main()

