#!/bin/bash

# Script to download placeholder images from Wikimedia Commons
# Run this from the project root directory: bash scripts/download-images.sh

echo "Downloading placeholder images for Musical Map of India..."
echo "Note: These are sample images from Wikimedia Commons (Public Domain/CC licenses)"

# Create images directory if it doesn't exist
mkdir -p public/images

cd public/images

# Function to download with wget or curl
download() {
    if command -v wget &> /dev/null; then
        wget -O "$1" "$2"
    elif command -v curl &> /dev/null; then
        curl -L -o "$1" "$2"
    else
        echo "Error: Neither wget nor curl found. Please install one of them."
        exit 1
    fi
}

echo "Downloading Rajasthan images..."
# Example URLs - replace with actual Wikimedia Commons URLs
# download "rajasthan-kamaycha.jpg" "https://upload.wikimedia.org/wikipedia/commons/..."
# download "rajasthan-sarangi.jpg" "https://upload.wikimedia.org/wikipedia/commons/..."

echo "Downloading Punjab images..."
# download "punjab-dhol.jpg" "https://upload.wikimedia.org/wikipedia/commons/..."
# download "punjab-tumbi.jpg" "https://upload.wikimedia.org/wikipedia/commons/..."

echo "Downloading Bengal images..."
# download "bengal-ektara.jpg" "https://upload.wikimedia.org/wikipedia/commons/..."
# download "bengal-baul.jpg" "https://upload.wikimedia.org/wikipedia/commons/..."

echo "Downloading Assam images..."
# download "assam-pepa.jpg" "https://upload.wikimedia.org/wikipedia/commons/..."
# download "assam-bihu.jpg" "https://upload.wikimedia.org/wikipedia/commons/..."

echo "Downloading Kerala images..."
# download "kerala-chenda.jpg" "https://upload.wikimedia.org/wikipedia/commons/..."
# download "kerala-temple.jpg" "https://upload.wikimedia.org/wikipedia/commons/..."

echo "Downloading Tamil Nadu images..."
# download "tamilnadu-veena.jpg" "https://upload.wikimedia.org/wikipedia/commons/..."
# download "tamilnadu-mridangam.jpg" "https://upload.wikimedia.org/wikipedia/commons/..."

echo "Downloading Maharashtra images..."
# download "maharashtra-dholki.jpg" "https://upload.wikimedia.org/wikipedia/commons/..."
# download "maharashtra-lavani.jpg" "https://upload.wikimedia.org/wikipedia/commons/..."

echo "Downloading Kashmir images..."
# download "kashmir-santoor.jpg" "https://upload.wikimedia.org/wikipedia/commons/..."
# download "kashmir-rabab.jpg" "https://upload.wikimedia.org/wikipedia/commons/..."

echo "Downloading Nagaland images..."
# download "nagaland-logdrum.jpg" "https://upload.wikimedia.org/wikipedia/commons/..."
# download "nagaland-festival.jpg" "https://upload.wikimedia.org/wikipedia/commons/..."

echo "Downloading Manipur images..."
# download "manipur-pung.jpg" "https://upload.wikimedia.org/wikipedia/commons/..."
# download "manipur-dance.jpg" "https://upload.wikimedia.org/wikipedia/commons/..."

echo ""
echo "Image download script template created!"
echo "To use this script:"
echo "1. Find appropriate images on Wikimedia Commons"
echo "2. Replace the commented URLs with actual image URLs"
echo "3. Run: bash scripts/download-images.sh"
echo ""
echo "Alternative: Manually download images and place them in public/images/"

cd ../..
