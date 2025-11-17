#!/usr/bin/env python3
"""
Google Custom Search API Image Downloader
Downloads high-quality images for Indian musical instruments and artists
"""

import os
import sys
import json
import time
import requests
import argparse
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Optional
from urllib.parse import quote_plus

try:
    from dotenv import load_dotenv
    from PIL import Image
    import io
except ImportError:
    print("❌ Missing required libraries. Please install:")
    print("   pip install requests pillow python-dotenv")
    sys.exit(1)

# Load environment variables from .env file
load_dotenv()

# Configuration
API_KEY = os.getenv('GOOGLE_API_KEY')
SEARCH_ENGINE_ID = os.getenv('GOOGLE_SEARCH_ENGINE_ID')
BASE_URL = 'https://www.googleapis.com/customsearch/v1'

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
IMAGES_DIR = PROJECT_ROOT / 'public' / 'images'
LOG_FILE = SCRIPT_DIR / 'download_log.txt'

# Download settings
MAX_RETRIES = 3
TIMEOUT = 10
RATE_LIMIT_DELAY = 1  # Seconds between requests

# Search terms for better results
SEARCH_CONTEXT = {
    'instruments': 'indian musical instrument traditional',
    'artists': 'indian musician artist portrait',
    'performance': 'indian traditional music performance'
}

def log(message: str, level: str = 'INFO'):
    """Log message to console and file"""
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    log_message = f"[{timestamp}] [{level}] {message}"
    print(log_message)
    
    with open(LOG_FILE, 'a', encoding='utf-8') as f:
        f.write(log_message + '\n')

def check_credentials():
    """Verify API credentials are set"""
    if not API_KEY or not SEARCH_ENGINE_ID:
        log("❌ API credentials not found!", 'ERROR')
        log("Please create a .env file in the scripts/ directory with:")
        log("  GOOGLE_API_KEY=your_api_key_here")
        log("  GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id_here")
        log("\nSee GOOGLE_API_SETUP_GUIDE.md for detailed instructions.")
        sys.exit(1)
    
    log("✅ API credentials loaded successfully")

def search_image(query: str, context: str = '') -> Optional[str]:
    """
    Search for an image using Google Custom Search API
    Returns the URL of the best matching image
    """
    # Construct search query with context for better results
    full_query = f"{query} {context}".strip()
    
    params = {
        'key': API_KEY,
        'cx': SEARCH_ENGINE_ID,
        'q': full_query,
        'searchType': 'image',
        'num': 3,  # Get top 3 results to choose best one
        'imgSize': 'large',  # Prefer large images
        'safe': 'active',  # Safe search
        'fileType': 'jpg,png',
    }
    
    try:
        response = requests.get(BASE_URL, params=params, timeout=TIMEOUT)
        response.raise_for_status()
        data = response.json()
        
        if 'items' in data and len(data['items']) > 0:
            # Return the first result's image URL
            image_url = data['items'][0]['link']
            log(f"  Found image: {image_url[:80]}...")
            return image_url
        else:
            log(f"  No results found for: {query}", 'WARNING')
            return None
            
    except requests.exceptions.RequestException as e:
        log(f"  API request failed: {str(e)}", 'ERROR')
        return None
    except json.JSONDecodeError:
        log(f"  Invalid API response", 'ERROR')
        return None

def download_image(url: str, filepath: Path, max_size_mb: int = 5) -> bool:
    """
    Download image from URL and save to filepath
    Returns True if successful, False otherwise
    """
    try:
        response = requests.get(url, timeout=TIMEOUT, stream=True)
        response.raise_for_status()
        
        # Check file size
        content_length = response.headers.get('content-length')
        if content_length and int(content_length) > max_size_mb * 1024 * 1024:
            log(f"  Image too large ({int(content_length)/1024/1024:.1f}MB), skipping", 'WARNING')
            return False
        
        # Download image data
        image_data = response.content
        
        # Validate it's actually an image using PIL
        try:
            img = Image.open(io.BytesIO(image_data))
            
            # Convert RGBA to RGB if necessary
            if img.mode == 'RGBA':
                rgb_img = Image.new('RGB', img.size, (255, 255, 255))
                rgb_img.paste(img, mask=img.split()[3])
                img = rgb_img
            
            # Resize if too large (keep aspect ratio)
            max_width = 1920
            max_height = 1080
            if img.width > max_width or img.height > max_height:
                img.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)
                log(f"  Resized image to {img.width}x{img.height}")
            
            # Save as JPEG
            img.save(filepath, 'JPEG', quality=85, optimize=True)
            log(f"  ✅ Saved: {filepath.name}")
            return True
            
        except Exception as e:
            log(f"  Invalid image format: {str(e)}", 'ERROR')
            return False
            
    except requests.exceptions.RequestException as e:
        log(f"  Download failed: {str(e)}", 'ERROR')
        return False

def get_instrument_list() -> Dict[str, str]:
    """Get list of all instruments from our generated placeholders"""
    instruments_dir = IMAGES_DIR / 'instruments'
    instruments = {}
    
    if instruments_dir.exists():
        for file in instruments_dir.glob('*.jpg'):
            # Convert filename to readable name
            name = file.stem.replace('-', ' ').replace('_', ' ').title()
            instruments[file.name] = name
    
    return instruments

def get_artist_list() -> Dict[str, str]:
    """Get list of all artists from our generated placeholders"""
    artists_dir = IMAGES_DIR / 'artists'
    artists = {}
    
    if artists_dir.exists():
        for file in artists_dir.glob('*.jpg'):
            # Convert filename to readable name
            name = file.stem.replace('-profile', '').replace('-performance', '').replace('-', ' ').replace('_', ' ').title()
            artists[file.name] = name
    
    return artists

def download_instruments(limit: Optional[int] = None):
    """Download images for all instruments"""
    log("\n" + "="*60)
    log("DOWNLOADING INSTRUMENT IMAGES")
    log("="*60)
    
    instruments = get_instrument_list()
    context = SEARCH_CONTEXT['instruments']
    
    if limit:
        instruments = dict(list(instruments.items())[:limit])
    
    total = len(instruments)
    success = 0
    failed = []
    
    for idx, (filename, name) in enumerate(instruments.items(), 1):
        log(f"\n[{idx}/{total}] Processing: {name}")
        
        filepath = IMAGES_DIR / 'instruments' / filename
        
        # Skip if already exists and not a placeholder
        if filepath.exists() and filepath.stat().st_size > 50000:
            log(f"  ⏭️  Already exists, skipping")
            success += 1
            continue
        
        # Search for image
        query = f"{name} instrument"
        image_url = search_image(query, context)
        
        if image_url:
            # Try to download
            if download_image(image_url, filepath):
                success += 1
            else:
                failed.append(name)
                log(f"  ❌ Failed to download", 'ERROR')
        else:
            failed.append(name)
        
        # Rate limiting
        if idx < total:
            time.sleep(RATE_LIMIT_DELAY)
    
    log(f"\n{'='*60}")
    log(f"INSTRUMENTS COMPLETE: {success}/{total} successful")
    if failed:
        log(f"Failed: {', '.join(failed)}", 'WARNING')
    log(f"{'='*60}\n")

def download_artists(limit: Optional[int] = None):
    """Download images for all artists"""
    log("\n" + "="*60)
    log("DOWNLOADING ARTIST IMAGES")
    log("="*60)
    
    artists = get_artist_list()
    context = SEARCH_CONTEXT['artists']
    
    if limit:
        artists = dict(list(artists.items())[:limit])
    
    total = len(artists)
    success = 0
    failed = []
    
    for idx, (filename, name) in enumerate(artists.items(), 1):
        log(f"\n[{idx}/{total}] Processing: {name}")
        
        filepath = IMAGES_DIR / 'artists' / filename
        
        # Skip if already exists and not a placeholder
        if filepath.exists() and filepath.stat().st_size > 50000:
            log(f"  ⏭️  Already exists, skipping")
            success += 1
            continue
        
        # Search for image
        query = f"{name} musician india"
        image_url = search_image(query, context)
        
        if image_url:
            # Try to download
            if download_image(image_url, filepath):
                success += 1
            else:
                failed.append(name)
                log(f"  ❌ Failed to download", 'ERROR')
        else:
            failed.append(name)
        
        # Rate limiting
        if idx < total:
            time.sleep(RATE_LIMIT_DELAY)
    
    log(f"\n{'='*60}")
    log(f"ARTISTS COMPLETE: {success}/{total} successful")
    if failed:
        log(f"Failed: {', '.join(failed)}", 'WARNING')
    log(f"{'='*60}\n")

def estimate_quota(download_type: str, limit: Optional[int] = None):
    """Estimate API quota usage"""
    instruments = len(get_instrument_list())
    artists = len(get_artist_list())
    
    if download_type == 'instruments':
        total = instruments if not limit else min(limit, instruments)
    elif download_type == 'artists':
        total = artists if not limit else min(limit, artists)
    else:  # all
        total = instruments + artists
        if limit:
            total = min(limit, total)
    
    log(f"\n📊 Quota Estimate:")
    log(f"   Images to download: {total}")
    log(f"   Free daily quota: 100")
    log(f"   Cost after quota: $5 per 1000 queries")
    
    if total <= 100:
        log(f"   ✅ Within free quota!")
    else:
        cost = ((total - 100) / 1000) * 5
        log(f"   ⚠️  Will exceed quota by {total - 100} queries")
        log(f"   Estimated cost: ${cost:.2f}")
        log(f"\n   Options:")
        log(f"   1. Download in batches over multiple days")
        log(f"   2. Enable billing (very cheap for one-time use)")

def main():
    parser = argparse.ArgumentParser(
        description='Download images for Musical Map of India using Google Custom Search API',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python3 download-images-google-api.py --type instruments
  python3 download-images-google-api.py --type artists --limit 10
  python3 download-images-google-api.py --type all
  python3 download-images-google-api.py --estimate
        """
    )
    
    parser.add_argument(
        '--type',
        choices=['instruments', 'artists', 'all'],
        default='all',
        help='Type of images to download (default: all)'
    )
    
    parser.add_argument(
        '--limit',
        type=int,
        help='Limit number of images to download (useful for testing)'
    )
    
    parser.add_argument(
        '--estimate',
        action='store_true',
        help='Show quota estimate without downloading'
    )
    
    args = parser.parse_args()
    
    # Initialize
    log("\n🎵 Musical Map of India - Image Downloader")
    log("=" * 60)
    
    # Check credentials
    check_credentials()
    
    # Estimate quota
    estimate_quota(args.type, args.limit)
    
    if args.estimate:
        log("\n✅ Estimate complete. Run without --estimate to download.")
        return
    
    # Confirm before proceeding
    log("\n⚠️  This will use your Google API quota.")
    response = input("Continue? (yes/no): ").strip().lower()
    
    if response not in ['yes', 'y']:
        log("❌ Cancelled by user")
        return
    
    # Start downloading
    start_time = time.time()
    
    if args.type in ['instruments', 'all']:
        download_instruments(args.limit)
    
    if args.type in ['artists', 'all']:
        download_artists(args.limit)
    
    # Summary
    elapsed = time.time() - start_time
    log(f"\n{'='*60}")
    log(f"✅ DOWNLOAD COMPLETE")
    log(f"   Time elapsed: {elapsed/60:.1f} minutes")
    log(f"   Log saved to: {LOG_FILE}")
    log(f"{'='*60}\n")

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        log("\n\n❌ Interrupted by user", 'WARNING')
        sys.exit(1)
    except Exception as e:
        log(f"\n\n❌ Unexpected error: {str(e)}", 'ERROR')
        import traceback
        traceback.print_exc()
        sys.exit(1)
