#!/bin/bash

# Download India state boundaries from DataMeet (official source)
# These are accurate GeoJSON files with proper state boundaries

echo "Downloading India state boundaries from DataMeet repository..."

# Create temp directory
mkdir -p /tmp/india-maps
cd /tmp/india-maps

# Download the states GeoJSON file
wget https://raw.githubusercontent.com/datameet/maps/master/States/Admin2.geojson -O states.geojson

echo "Downloaded! File saved to: /tmp/india-maps/states.geojson"
echo ""
echo "This GeoJSON file contains accurate state boundaries for all Indian states."
echo "You can convert this to SVG paths using online tools like:"
echo "1. https://mapshaper.org/ - Upload the GeoJSON and export as SVG"
echo "2. Use geojson-to-svg-path npm package"
echo ""
echo "Next steps:"
echo "1. Open mapshaper.org"
echo "2. Upload states.geojson"
echo "3. Simplify if needed (optional)"
echo "4. Export as SVG"
echo "5. Extract the path coordinates for each state"
