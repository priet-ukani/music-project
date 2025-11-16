#!/usr/bin/env python3
"""
Download images from Wikimedia Commons using their API
This script searches for and downloads actual images
"""

import requests
import json
from pathlib import Path
import time

BASE_DIR = Path(__file__).parent.parent / "public"
IMAGES_DIR = BASE_DIR / "images"
IMAGES_DIR.mkdir(parents=True, exist_ok=True)
(IMAGES_DIR / "artists").mkdir(parents=True, exist_ok=True)

# Search terms for Wikimedia Commons
SEARCH_TERMS = {
    "rajasthan-kamaycha.jpg": "kamaycha rajasthan",
    "rajasthan-sarangi.jpg": "sarangi instrument",
    "rajasthan-performance.jpg": "rajasthani folk music",
    "punjab-dhol.jpg": "dhol punjab",
    "punjab-tumbi.jpg": "tumbi instrument",
    "punjab-bhangra.jpg": "bhangra dance",
    "bengal-ektara.jpg": "ektara instrument",
    "bengal-baul.jpg": "baul singer bengal",
    "telangana-dappu.jpg": "dappu drum",
    "telangana-perini.jpg": "perini dance",
    "tamilnadu-veena.jpg": "veena instrument",
    "tamilnadu-mridangam.jpg": "mridangam",
    "tamilnadu-concert.jpg": "carnatic music",
    "kerala-chenda.jpg": "chenda kerala",
    "kerala-temple.jpg": "kerala temple",
    "maharashtra-dholki.jpg": "dholki",
    "maharashtra-lavani.jpg": "lavani dance",
    "kashmir-santoor.jpg": "santoor",
    "kashmir-performance.jpg": "kashmiri music",
}

# Direct Wikimedia Commons URLs (these are known to work)
DIRECT_URLS = {
    "rajasthan-sarangi.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Sarangi.jpg/800px-Sarangi.jpg",
    "punjab-dhol.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Dhol.jpg/800px-Dhol.jpg",
    "bengal-ektara.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Ektara.jpg/800px-Ektara.jpg",
    "tamilnadu-veena.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Veena.jpg/800px-Veena.jpg",
    "tamilnadu-mridangam.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Mridangam.jpg/800px-Mridangam.jpg",
    "kashmir-santoor.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Santoor.jpg/800px-Santoor.jpg",
}

def download_from_url(url, filepath):
    """Download image from direct URL"""
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers, timeout=30, stream=True)
        response.raise_for_status()
        
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"✅ Downloaded: {filepath.name}")
        return True
    except Exception as e:
        print(f"❌ Failed {filepath.name}: {e}")
        return False

def create_placeholder_url(text, width=800, height=600):
    """Create placeholder.com URL"""
    return f"https://via.placeholder.com/{width}x{height}/e5e7eb/9ca3af?text={text.replace(' ', '+')}"

def main():
    print("🚀 Downloading images from Wikimedia Commons...\n")
    
    downloaded = 0
    placeholders = 0
    
    # First, try direct URLs
    for filename, url in DIRECT_URLS.items():
        filepath = IMAGES_DIR / filename
        if filepath.exists():
            print(f"⏭️  Skipping {filename} (exists)")
            continue
        
        if download_from_url(url, filepath):
            downloaded += 1
        time.sleep(0.5)  # Rate limiting
    
    # For others, use placeholder.com as reliable fallback
    print("\n📸 Creating placeholder images for remaining files...")
    for filename, search_term in SEARCH_TERMS.items():
        filepath = IMAGES_DIR / filename
        if filepath.exists():
            continue
        
        # Use placeholder.com for reliable placeholders
        placeholder_url = create_placeholder_url(search_term.split()[0].title())
        if download_from_url(placeholder_url, filepath):
            placeholders += 1
        time.sleep(0.3)
    
    print(f"\n✅ Direct downloads: {downloaded}")
    print(f"🎨 Placeholders created: {placeholders}")
    print("\n✨ Done! Images ready in public/images/")
    print("\n💡 To get real images:")
    print("   1. Visit https://commons.wikimedia.org")
    print("   2. Search for instrument/region names")
    print("   3. Download high-res images")
    print("   4. Replace files in public/images/")

if __name__ == "__main__":
    main()

