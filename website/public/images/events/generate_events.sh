#!/bin/bash

# Event images with category-specific colors and styling

# Festivals - Purple/Pink gradient
convert -size 800x400 xc:"#8B5CF6" \
  \( -size 800x400 xc:"#EC4899" \) -compose blend -define compose:args=50x50 -composite \
  -gravity center -pointsize 56 -font "DejaVu-Sans-Bold" -fill white -annotate +0-20 "NAVRATRI" \
  -pointsize 28 -annotate +0+30 "Festival 2025" \
  navratri.jpg

convert -size 800x400 xc:"#8B5CF6" \
  \( -size 800x400 xc:"#EC4899" \) -compose blend -define compose:args=50x50 -composite \
  -gravity center -pointsize 48 -font "DejaVu-Sans-Bold" -fill white -annotate +0-20 "RONGALI BIHU" \
  -pointsize 28 -annotate +0+30 "Festival" \
  rongali-bihu.jpg

convert -size 800x400 xc:"#8B5CF6" \
  \( -size 800x400 xc:"#EC4899" \) -compose blend -define compose:args=50x50 -composite \
  -gravity center -pointsize 48 -font "DejaVu-Sans-Bold" -fill white -annotate +0-20 "THRISSUR POORAM" \
  -pointsize 28 -annotate +0+30 "Temple Festival" \
  thrissur-pooram.jpg

convert -size 800x400 xc:"#8B5CF6" \
  \( -size 800x400 xc:"#EC4899" \) -compose blend -define compose:args=50x50 -composite \
  -gravity center -pointsize 56 -font "DejaVu-Sans-Bold" -fill white -annotate +0-20 "RIFF 2025" \
  -pointsize 28 -annotate +0+30 "Rajasthan Folk Festival" \
  rajasthan-riff.jpg

convert -size 800x400 xc:"#8B5CF6" \
  \( -size 800x400 xc:"#EC4899" \) -compose blend -define compose:args=50x50 -composite \
  -gravity center -pointsize 48 -font "DejaVu-Sans-Bold" -fill white -annotate +0-20 "KONARK FESTIVAL" \
  -pointsize 28 -annotate +0+30 "Dance & Music" \
  konark-festival.jpg

convert -size 800x400 xc:"#8B5CF6" \
  \( -size 800x400 xc:"#EC4899" \) -compose blend -define compose:args=50x50 -composite \
  -gravity center -pointsize 44 -font "DejaVu-Sans-Bold" -fill white -annotate +0-20 "TYAGARAJA ARADHANA" \
  -pointsize 28 -annotate +0+30 "Carnatic Festival" \
  tyagaraja-aradhana.jpg

convert -size 800x400 xc:"#8B5CF6" \
  \( -size 800x400 xc:"#EC4899" \) -compose blend -define compose:args=50x50 -composite \
  -gravity center -pointsize 44 -font "DejaVu-Sans-Bold" -fill white -annotate +0-20 "HORNBILL FESTIVAL" \
  -pointsize 28 -annotate +0+30 "Naga Heritage" \
  hornbill-festival.jpg

# Concerts - Blue gradient
convert -size 800x400 xc:"#3B82F6" \
  \( -size 800x400 xc:"#1D4ED8" \) -compose blend -define compose:args=50x50 -composite \
  -gravity center -pointsize 44 -font "DejaVu-Sans-Bold" -fill white -annotate +0-20 "ZAKIR HUSSAIN" \
  -pointsize 28 -annotate +0+30 "Tabla Maestro Concert" \
  zakir-hussain-concert.jpg

convert -size 800x400 xc:"#3B82F6" \
  \( -size 800x400 xc:"#1D4ED8" \) -compose blend -define compose:args=50x50 -composite \
  -gravity center -pointsize 48 -font "DejaVu-Sans-Bold" -fill white -annotate +0-20 "T.M. KRISHNA" \
  -pointsize 28 -annotate +0+30 "Carnatic Vocal Concert" \
  carnatic-concert.jpg

convert -size 800x400 xc:"#3B82F6" \
  \( -size 800x400 xc:"#1D4ED8" \) -compose blend -define compose:args=50x50 -composite \
  -gravity center -pointsize 56 -font "DejaVu-Sans-Bold" -fill white -annotate +0-20 "PAPON LIVE" \
  -pointsize 28 -annotate +0+30 "Homecoming Concert" \
  papon-concert.jpg

convert -size 800x400 xc:"#3B82F6" \
  \( -size 800x400 xc:"#1D4ED8" \) -compose blend -define compose:args=50x50 -composite \
  -gravity center -pointsize 44 -font "DejaVu-Sans-Bold" -fill white -annotate +0-20 "REMO FERNANDES" \
  -pointsize 28 -annotate +0+30 "New Year's Eve Goa" \
  goa-concert.jpg

# Awards - Yellow/Orange gradient
convert -size 800x400 xc:"#F59E0B" \
  \( -size 800x400 xc:"#EF4444" \) -compose blend -define compose:args=50x50 -composite \
  -gravity center -pointsize 48 -font "DejaVu-Sans-Bold" -fill white -annotate +0-20 "PADMA AWARDS" \
  -pointsize 28 -annotate +0+30 "Music Category 2025" \
  padma-awards.jpg

convert -size 800x400 xc:"#F59E0B" \
  \( -size 800x400 xc:"#EF4444" \) -compose blend -define compose:args=50x50 -composite \
  -gravity center -pointsize 40 -font "DejaVu-Sans-Bold" -fill white -annotate +0-20 "SANGEET NATAK AKADEMI" \
  -pointsize 28 -annotate +0+30 "Awards 2024" \
  akademi-awards.jpg

convert -size 800x400 xc:"#F59E0B" \
  \( -size 800x400 xc:"#EF4444" \) -compose blend -define compose:args=50x50 -composite \
  -gravity center -pointsize 44 -font "DejaVu-Sans-Bold" -fill white -annotate +0-20 "TANSEN SAMAROH" \
  -pointsize 28 -annotate +0+30 "Award Ceremony" \
  tansen-samaroh.jpg

# Cultural Events - Green/Teal gradient
convert -size 800x400 xc:"#10B981" \
  \( -size 800x400 xc:"#06B6D4" \) -compose blend -define compose:args=50x50 -composite \
  -gravity center -pointsize 44 -font "DejaVu-Sans-Bold" -fill white -annotate +0-20 "DOVER LANE" \
  -pointsize 28 -annotate +0+30 "Music Conference" \
  dover-lane.jpg

convert -size 800x400 xc:"#10B981" \
  \( -size 800x400 xc:"#06B6D4" \) -compose blend -define compose:args=50x50 -composite \
  -gravity center -pointsize 44 -font "DejaVu-Sans-Bold" -fill white -annotate +0-20 "SURAJKUND MELA" \
  -pointsize 28 -annotate +0+30 "Crafts & Music" \
  surajkund-mela.jpg

convert -size 800x400 xc:"#10B981" \
  \( -size 800x400 xc:"#06B6D4" \) -compose blend -define compose:args=50x50 -composite \
  -gravity center -pointsize 48 -font "DejaVu-Sans-Bold" -fill white -annotate +0-20 "HAMPI UTSAV" \
  -pointsize 28 -annotate +0+30 "Heritage Festival" \
  hampi-utsav.jpg

# Workshops - Orange gradient
convert -size 800x400 xc:"#F97316" \
  \( -size 800x400 xc:"#EA580C" \) -compose blend -define compose:args=50x50 -composite \
  -gravity center -pointsize 44 -font "DejaVu-Sans-Bold" -fill white -annotate +0-20 "GURU-SHISHYA" \
  -pointsize 28 -annotate +0+30 "Parampara Conference" \
  guru-shishya.jpg

convert -size 800x400 xc:"#F97316" \
  \( -size 800x400 xc:"#EA580C" \) -compose blend -define compose:args=50x50 -composite \
  -gravity center -pointsize 48 -font "DejaVu-Sans-Bold" -fill white -annotate +0-20 "SWARA & TALA" \
  -pointsize 28 -annotate +0+30 "Fundamentals Workshop" \
  swara-tala-workshop.jpg

convert -size 800x400 xc:"#F97316" \
  \( -size 800x400 xc:"#EA580C" \) -compose blend -define compose:args=50x50 -composite \
  -gravity center -pointsize 48 -font "DejaVu-Sans-Bold" -fill white -annotate +0-20 "TABLA WORKSHOP" \
  -pointsize 28 -annotate +0+30 "Advanced Techniques" \
  tabla-workshop.jpg

convert -size 800x400 xc:"#F97316" \
  \( -size 800x400 xc:"#EA580C" \) -compose blend -define compose:args=50x50 -composite \
  -gravity center -pointsize 44 -font "DejaVu-Sans-Bold" -fill white -annotate +0-20 "ODISSI WORKSHOP" \
  -pointsize 28 -annotate +0+30 "Vocal Music Training" \
  odissi-workshop.jpg

convert -size 800x400 xc:"#F97316" \
  \( -size 800x400 xc:"#EA580C" \) -compose blend -define compose:args=50x50 -composite \
  -gravity center -pointsize 40 -font "DejaVu-Sans-Bold" -fill white -annotate +0-20 "FOLK INSTRUMENTS" \
  -pointsize 28 -annotate +0+30 "Northeast Music Camp" \
  folk-instruments-camp.jpg

# Releases - Pink gradient
convert -size 800x400 xc:"#EC4899" \
  \( -size 800x400 xc:"#BE185D" \) -compose blend -define compose:args=50x50 -composite \
  -gravity center -pointsize 44 -font "DejaVu-Sans-Bold" -fill white -annotate +0-20 "PANDAVANI ALBUM" \
  -pointsize 28 -annotate +0+30 "Teejan Bai Release" \
  pandavani-album.jpg

convert -size 800x400 xc:"#EC4899" \
  \( -size 800x400 xc:"#BE185D" \) -compose blend -define compose:args=50x50 -composite \
  -gravity center -pointsize 44 -font "DejaVu-Sans-Bold" -fill white -annotate +0-20 "PENA REVIVAL" \
  -pointsize 28 -annotate +0+30 "Documentary Album" \
  pena-revival.jpg

echo "All event images generated!"
