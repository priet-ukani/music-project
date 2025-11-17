#!/bin/bash

# Script to generate placeholder images for instruments and artists
# Uses ImageMagick to create text-based placeholder images

set -e

IMAGES_DIR="/mnt/d/Sem 7/MW/NEW/music-project/website/public/images"

# Create directories if they don't exist
mkdir -p "$IMAGES_DIR/instruments"
mkdir -p "$IMAGES_DIR/artists"
mkdir -p "$IMAGES_DIR/performance"

# Color palette
INST_BG="#f39f37"     # Orange (primary color)
ARTIST_BG="#00879b"   # Teal (secondary color)
PERF_BG="#8b5cf6"     # Purple

# Function to create an instrument placeholder
create_instrument() {
    local name="$1"
    local filename="$2"
    
    convert -size 800x600 \
        -background "$INST_BG" \
        -fill white \
        -gravity center \
        -font "DejaVu-Sans-Bold" \
        -pointsize 48 \
        label:"$name" \
        "$IMAGES_DIR/instruments/$filename"
    
    echo "Created: instruments/$filename"
}

# Function to create an artist placeholder
create_artist() {
    local name="$1"
    local filename="$2"
    
    convert -size 400x500 \
        -background "$ARTIST_BG" \
        -fill white \
        -gravity center \
        -font "DejaVu-Sans-Bold" \
        -pointsize 36 \
        label:"$name" \
        "$IMAGES_DIR/artists/$filename"
    
    echo "Created: artists/$filename"
}

# Function to create a performance placeholder
create_performance() {
    local name="$1"
    local filename="$2"
    
    convert -size 1200x800 \
        -background "$PERF_BG" \
        -fill white \
        -gravity center \
        -font "DejaVu-Sans-Bold" \
        -pointsize 52 \
        label:"$name\nPerformance" \
        "$IMAGES_DIR/performance/$filename"
    
    echo "Created: performance/$filename"
}

echo "=== Generating Instrument Placeholders ==="

# MELODIC INSTRUMENTS
create_instrument "Sarangi" "sarangi.jpg"
create_instrument "Kamaycha" "kamaycha.jpg"
create_instrument "Ravanhatha" "ravanhatha.jpg"
create_instrument "Algoza" "algoza.jpg"
create_instrument "Tumbi" "tumbi.jpg"
create_instrument "Ektara" "ektara.jpg"
create_instrument "Dotara" "dotara.jpg"
create_instrument "Harmonium" "harmonium.jpg"
create_instrument "Nadaswaram" "nadaswaram.jpg"
create_instrument "Pavana" "pavana.jpg"
create_instrument "Pepa" "pepa.jpg"
create_instrument "Gogona" "gogona.jpg"
create_instrument "Veena" "veena.jpg"
create_instrument "Violin" "violin.jpg"
create_instrument "Flute (Venu)" "flute-venu.jpg"
create_instrument "Santoor" "santoor.jpg"
create_instrument "Rabab" "rabab.jpg"
create_instrument "Sitar" "sitar.jpg"
create_instrument "Pena" "pena.jpg"
create_instrument "Sarod" "sarod.jpg"
create_instrument "Bansuri" "bansuri.jpg"
create_instrument "Shehnai" "shehnai.jpg"
create_instrument "Pavo" "pavo.jpg"
create_instrument "Mandolin" "mandolin.jpg"
create_instrument "Guitar" "guitar.jpg"

# RHYTHMIC INSTRUMENTS
create_instrument "Dholak" "dholak.jpg"
create_instrument "Khartal" "khartal.jpg"
create_instrument "Morchang" "morchang.jpg"
create_instrument "Dhol" "dhol.jpg"
create_instrument "Chimta" "chimta.jpg"
create_instrument "Dholki" "dholki.jpg"
create_instrument "Dugi" "dugi.jpg"
create_instrument "Khamak" "khamak.jpg"
create_instrument "Tabla" "tabla.jpg"
create_instrument "Dappu" "dappu.jpg"
create_instrument "Dol" "dol.jpg"
create_instrument "Tasha" "tasha.jpg"
create_instrument "Toka" "toka.jpg"
create_instrument "Chenda" "chenda.jpg"
create_instrument "Maddalam" "maddalam.jpg"
create_instrument "Mridangam" "mridangam.jpg"
create_instrument "Thavil" "thavil.jpg"
create_instrument "Ghatam" "ghatam.jpg"
create_instrument "Ghungroo" "ghungroo.jpg"
create_instrument "Tumbaknari" "tumbaknari.jpg"
create_instrument "Pung" "pung.jpg"
create_instrument "Kartal" "kartal.jpg"
create_instrument "Pakhawaj" "pakhawaj.jpg"
create_instrument "Damru" "damru.jpg"
create_instrument "Manjira" "manjira.jpg"
create_instrument "Chande" "chande.jpg"
create_instrument "Mardala" "mardala.jpg"
create_instrument "Damau" "damau.jpg"
create_instrument "Hurki" "hurki.jpg"
create_instrument "Khuang" "khuang.jpg"
create_instrument "Ghumot" "ghumot.jpg"
create_instrument "Padiah" "padiah.jpg"
create_instrument "Mandar" "mandar.jpg"
create_instrument "Timki" "timki.jpg"

# UNIQUE INSTRUMENTS
create_instrument "Kinnera" "kinnera.jpg"
create_instrument "Oggu" "oggu.jpg"
create_instrument "Burra (tambura)" "burra-tambura.jpg"
create_instrument "Dubki" "dubki.jpg"
create_instrument "Edakka" "edakka.jpg"
create_instrument "Kanjira" "kanjira.jpg"
create_instrument "Log Drums" "log-drums.jpg"
create_instrument "Ransingha" "ransingha.jpg"
create_instrument "Mashakbeen" "mashakbeen.jpg"
create_instrument "Cheraw Sticks" "cheraw-sticks.jpg"
create_instrument "Duitara" "duitara.jpg"
create_instrument "Besli" "besli.jpg"
create_instrument "Mohri" "mohri.jpg"
create_instrument "Bamli" "bamli.jpg"
create_instrument "Phet Banam" "phet-banam.jpg"

echo ""
echo "=== Generating Artist Placeholders ==="

# TELANGANA ARTISTS
create_artist "Darshanam Mogilaiah" "mogilaiah-profile.jpg"
create_artist "Darshanam Mogilaiah\nPerformance" "mogilaiah-performance.jpg"
create_artist "Goreti Venkanna" "venkanna-profile.jpg"

# GUJARAT ARTISTS
create_artist "Osman Mir" "osman-mir-profile.jpg"
create_artist "Hemant Chauhan" "hemant-chauhan-profile.jpg"
create_artist "Kirtidan Gadhvi" "kirtidan-gadhvi-profile.jpg"
create_artist "Geeta Rabari" "geeta-rabari-profile.jpg"
create_artist "Praful Dave" "praful-dave-profile.jpg"

# RAJASTHAN ARTISTS
create_artist "Mame Khan" "mame-khan-profile.jpg"
create_artist "Lakha Khan" "lakha-khan-profile.jpg"
create_artist "Sawan Khan" "sawan-khan-profile.jpg"
create_artist "Barmer Boys" "barmer-boys-profile.jpg"
create_artist "Asin Khan Langa" "asin-khan-profile.jpg"

# PUNJAB ARTISTS
create_artist "Gurdas Maan" "gurdas-maan-profile.jpg"
create_artist "Hans Raj Hans" "hans-raj-hans-profile.jpg"
create_artist "Surinder Kaur" "surinder-kaur-profile.jpg"
create_artist "Alam Lohar" "alam-lohar-profile.jpg"
create_artist "Bhai Nirmal Singh" "bhai-nirmal-singh-profile.jpg"

# DELHI/UTTAR PRADESH ARTISTS
create_artist "Pandit Birju Maharaj" "birju-maharaj-profile.jpg"
create_artist "Ustad Bismillah Khan" "bismillah-khan-profile.jpg"
create_artist "Malini Awasthi" "malini-awasthi-profile.jpg"

# BENGAL ARTISTS
create_artist "Pandit Ajoy Chakrabarty" "ajoy-chakrabarty-profile.jpg"
create_artist "Parvathy Baul" "parvathy-baul-profile.jpg"
create_artist "Purna Das Baul" "purna-das-baul-profile.jpg"
create_artist "Rashid Khan" "rashid-khan-profile.jpg"

# MAHARASHTRA ARTISTS
create_artist "Pandit Bhimsen Joshi" "bhimsen-joshi-profile.jpg"
create_artist "Kishori Amonkar" "kishori-amonkar-profile.jpg"
create_artist "Sulochana Chavan" "sulochana-chavan-profile.jpg"
create_artist "Suresh Wadkar" "suresh-wadkar-profile.jpg"

# TAMIL NADU ARTISTS
create_artist "M.S. Subbulakshmi" "ms-subbulakshmi-profile.jpg"
create_artist "T.M. Krishna" "tm-krishna-profile.jpg"
create_artist "Bombay Jayashri" "bombay-jayashri-profile.jpg"
create_artist "Gaana Bala" "gaana-bala-profile.jpg"
create_artist "Mandolin Srinivas" "mandolin-srinivas-profile.jpg"

# KARNATAKA ARTISTS
create_artist "Chittani R. Hegde" "chittani-hegde-profile.jpg"

# KERALA ARTISTS
create_artist "K.J. Yesudas" "kj-yesudas-profile.jpg"
create_artist "Peruvanam Kuttan Marar" "peruvanam-kuttan-marar-profile.jpg"

# ASSAM ARTISTS
create_artist "Bhupen Hazarika" "bhupen-hazarika-profile.jpg"
create_artist "Zubeen Garg" "zubeen-garg-profile.jpg"

# ODISHA ARTISTS
create_artist "Pandit Raghunath Panigrahi" "raghunath-panigrahi-profile.jpg"

# TELANGANA ARTISTS (continued)
create_artist "Balamuralikrishna" "balamuralikrishna-profile.jpg"
create_artist "Nedunuri Krishnamurthy" "nedunuri-krishnamurthy-profile.jpg"
create_artist "Vangapandu Prasada Rao" "vangapandu-prasada-rao-profile.jpg"

# MANIPUR ARTISTS
create_artist "Laishram Birachandra" "laishram-birachandra-profile.jpg"
create_artist "Mangka Mayanglambam" "mangka-mayanglambam-profile.jpg"
create_artist "Mohen Naorem" "mohen-naorem-profile.jpg"

# NAGALAND ARTISTS
create_artist "Nise Meruno" "nise-meruno-profile.jpg"
create_artist "Tetseo Sisters" "tetseo-sisters-profile.jpg"
create_artist "Mount Olive Collective" "mount-olive-collective-profile.jpg"

# MIZORAM ARTISTS
create_artist "Lalhmingliani Sailo" "lalhmingliani-sailo-profile.jpg"
create_artist "Vanlalfaka" "vanlalfaka-profile.jpg"

# MEGHALAYA ARTISTS
create_artist "Raphael Warjri" "raphael-warjri-profile.jpg"
create_artist "Silvia Lyngdoh" "silvia-lyngdoh-profile.jpg"
create_artist "Soulmate Band" "soulmate-band-profile.jpg"

# ARUNACHAL PRADESH ARTISTS
create_artist "Oyang Taki" "oyang-taki-profile.jpg"

echo ""
echo "=== Generating Performance Placeholders ==="

# REGIONAL PERFORMANCE IMAGES
create_performance "Rajasthan" "rajasthan-performance.jpg"
create_performance "Punjab" "punjab-performance.jpg"
create_performance "Bengal" "bengal-performance.jpg"
create_performance "Telangana" "telangana-performance.jpg"
create_performance "Assam" "assam-performance.jpg"
create_performance "Kerala" "kerala-performance.jpg"
create_performance "Tamil Nadu" "tamilnadu-performance.jpg"
create_performance "Maharashtra" "maharashtra-performance.jpg"
create_performance "Kashmir" "kashmir-performance.jpg"
create_performance "Nagaland" "nagaland-performance.jpg"
create_performance "Manipur" "manipur-performance.jpg"
create_performance "Gujarat" "gujarat-performance.jpg"
create_performance "Karnataka" "karnataka-performance.jpg"
create_performance "Odisha" "odisha-performance.jpg"
create_performance "Uttarakhand" "uttarakhand-performance.jpg"
create_performance "Mizoram" "mizoram-performance.jpg"
create_performance "Goa" "goa-performance.jpg"
create_performance "Meghalaya" "meghalaya-performance.jpg"
create_performance "Chhattisgarh" "chhattisgarh-performance.jpg"
create_performance "Jharkhand" "jharkhand-performance.jpg"

echo ""
echo "=== Image Generation Complete ==="
echo ""
echo "Total images created:"
echo "  Instruments: $(ls "$IMAGES_DIR/instruments" | wc -l)"
echo "  Artists: $(ls "$IMAGES_DIR/artists" | wc -l)"
echo "  Performance: $(ls "$IMAGES_DIR/performance" | wc -l)"
echo ""
echo "All placeholder images have been generated in $IMAGES_DIR"
echo "Replace these with actual photos/images for production."
