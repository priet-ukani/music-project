#!/usr/bin/env python3
"""
Add images field to all artists in regionalArtistsEnhanced.ts
that have downloaded profile images
"""

import os
import re
from pathlib import Path

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
DATA_FILE = PROJECT_ROOT / 'src' / 'data' / 'regionalArtistsEnhanced.ts'
IMAGES_DIR = PROJECT_ROOT / 'public' / 'images' / 'artists'

def get_downloaded_images():
    """Get list of all downloaded artist images"""
    if not IMAGES_DIR.exists():
        print(f"❌ Images directory not found: {IMAGES_DIR}")
        return {}
    
    images = {}
    for img_file in IMAGES_DIR.glob('*-profile.jpg'):
        # Extract artist ID from filename (e.g., 'kirtidan-gadhvi-profile.jpg' -> 'kirtidan-gadhvi')
        artist_id = img_file.stem.replace('-profile', '')
        images[artist_id] = f'/images/artists/{img_file.name}'
    
    print(f"✅ Found {len(images)} downloaded artist images")
    return images

def add_images_to_data():
    """Add images field to artists that don't have it"""
    
    # Get downloaded images
    downloaded_images = get_downloaded_images()
    if not downloaded_images:
        print("⚠️  No images found to add")
        return
    
    # Read the data file
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    added_count = 0
    skipped_count = 0
    
    # Strategy: Find each artist block and insert images field before socialMedia or status
    # Split content into lines for easier processing
    lines = content.split('\n')
    result_lines = []
    i = 0
    
    while i < len(lines):
        line = lines[i]
        result_lines.append(line)
        
        # Check if this line contains an artist ID
        id_match = re.match(r"\s+id:\s+'([^']+)',\s*$", line)
        if id_match:
            artist_id = id_match.group(1)
            
            # Look ahead to find if images field already exists
            has_images = False
            insert_before_line = None
            indent = len(line) - len(line.lstrip())
            
            # Scan forward to find socialMedia or status
            j = i + 1
            while j < len(lines) and j < i + 100:  # Look ahead max 100 lines
                forward_line = lines[j]
                
                # Check if we found images field
                if re.match(r"\s+images:\s*\{", forward_line):
                    has_images = True
                    break
                
                # Check for socialMedia or status fields (where we should insert)
                if re.match(r"\s+(socialMedia|status):", forward_line):
                    insert_before_line = j
                    break
                
                # Stop if we hit the next artist or end of region
                if re.match(r"\s+\{\s*$", forward_line) or re.match(r"\s+\},?\s*$", forward_line):
                    if j > i + 10:  # Only break if we've gone far enough
                        break
                
                j += 1
            
            # If we have a downloaded image and no existing images field, insert it
            if artist_id in downloaded_images and not has_images and insert_before_line:
                image_path = downloaded_images[artist_id]
                
                # Get artist name for logging (look ahead a bit)
                artist_name = artist_id
                for k in range(i+1, min(i+5, len(lines))):
                    name_match = re.match(r"\s+name:\s+'([^']+)',", lines[k])
                    if name_match:
                        artist_name = name_match.group(1)
                        break
                
                # Insert images field
                images_lines = [
                    f"{' ' * indent}images: {{",
                    f"{' ' * indent}  profile: '{image_path}',",
                    f"{' ' * indent}  performance: []",
                    f"{' ' * indent}}},"
                ]
                
                # Add all lines up to insert point
                for k in range(i + 1, insert_before_line):
                    result_lines.append(lines[k])
                
                # Add images field
                result_lines.extend(images_lines)
                
                added_count += 1
                print(f"  ✅ Adding image for: {artist_name} ({artist_id})")
                
                # Continue from insert point
                i = insert_before_line - 1
            elif artist_id in downloaded_images and has_images:
                skipped_count += 1
        
        i += 1
    
    # Join lines back
    content = '\n'.join(result_lines)
    
    # Write back if changes were made
    if content != original_content:
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"\n✅ Updated {DATA_FILE.name}")
        print(f"   Added images field to {added_count} artists")
        if skipped_count > 0:
            print(f"   Skipped {skipped_count} artists (already have images)")
    else:
        print("\n⚠️  No changes needed")

if __name__ == '__main__':
    print("🎵 Adding images to artists data...")
    print("=" * 50)
    add_images_to_data()
    print("=" * 50)
    print("✅ Done!")
