import { useState } from 'react';
import { motion } from 'framer-motion';
import type { MusicalRegion, FilterCategory, MusicalAspect } from '../types/music';

interface IndiaMapProps {
  regions: MusicalRegion[];
  onRegionClick: (regionId: string) => void;
  selectedRegionId?: string;
  filterCategory: FilterCategory;
  highlightAspect: MusicalAspect | null;
  instrumentQuery?: string;
  rhythmFilter?: string;
}

// Mapping of musical regions to their representative states/areas
// Based on the actual coordinates from our regions data
const regionalStateMapping: Record<string, { cx: number; cy: number; name: string }> = {
  rajasthan: { cx: 250, cy: 320, name: 'Rajasthan' },
  punjab: { cx: 270, cy: 180, name: 'Punjab' },
  bengal: { cx: 520, cy: 350, name: 'Bengal' },
  telangana: { cx: 395, cy: 465, name: 'Telangana' },
  assam: { cx: 580, cy: 295, name: 'Assam' },
  kerala: { cx: 285, cy: 690, name: 'Kerala' },
  tamilnadu: { cx: 395, cy: 700, name: 'Tamil Nadu' },
  maharashtra: { cx: 300, cy: 470, name: 'Maharashtra' },
  kashmir: { cx: 290, cy: 110, name: 'Kashmir' },
  nagaland: { cx: 640, cy: 310, name: 'Nagaland' },
  manipur: { cx: 640, cy: 345, name: 'Manipur' },
  uttarpradesh: { cx: 360, cy: 250, name: 'Uttar Pradesh' },
  gujarat: { cx: 205, cy: 375, name: 'Gujarat' },
  karnataka: { cx: 325, cy: 575, name: 'Karnataka' },
  odisha: { cx: 480, cy: 415, name: 'Odisha' },
  uttarakhand: { cx: 320, cy: 170, name: 'Uttarakhand' },
  mizoram: { cx: 615, cy: 380, name: 'Mizoram' },
  goa: { cx: 250, cy: 515, name: 'Goa' },
  meghalaya: { cx: 575, cy: 320, name: 'Meghalaya' },
  chhattisgarh: { cx: 385, cy: 375, name: 'Chhattisgarh' },
  jharkhand: { cx: 440, cy: 345, name: 'Jharkhand' },
};

const IndiaMap: React.FC<IndiaMapProps> = ({
  regions,
  onRegionClick,
  selectedRegionId,
  instrumentQuery = '',
  rhythmFilter = '',
}) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const normalizedQuery = instrumentQuery.trim().toLowerCase();
  const matchedRegionIds = new Set(
    normalizedQuery
      ? regions
          .filter(r =>
            [
              ...(r.instruments?.melodic ?? []),
              ...(r.instruments?.rhythmic ?? []),
              ...(r.instruments?.unique ?? []),
            ]
              .map(s => s.toLowerCase())
              .some(name => name.includes(normalizedQuery))
          )
          .map(r => r.id)
      : []
  );

  // Rhythm/tempo selection matching
  if (rhythmFilter) {
    regions.forEach(r => {
      const text = [
        r.musicalStructure.rhythmicSystem,
        r.musicalStructure.tempo,
        ...(r.musicalStructure.talas ?? []),
      ]
        .join(' ').toLowerCase();
      const key = rhythmFilter.toLowerCase();
      if (text.includes(key)) matchedRegionIds.add(r.id);
      // convenience categories
      if (rhythmFilter === 'Slow' && /slow|vilambit/.test(text)) matchedRegionIds.add(r.id);
      if (rhythmFilter === 'Moderate' && /moderate|madhya/.test(text)) matchedRegionIds.add(r.id);
      if (rhythmFilter === 'Fast' && /fast|drut|140|160|170|180/.test(text)) matchedRegionIds.add(r.id);
      if (rhythmFilter === 'Accelerating' && /accelerat/.test(text)) matchedRegionIds.add(r.id);
      if (rhythmFilter === 'Polyrhythmic' && /poly/.test(text)) matchedRegionIds.add(r.id);
      if (rhythmFilter === 'Complex talas' && /(tala|chapu|jhaptal|rupak|teental|adi)/.test(text)) matchedRegionIds.add(r.id);
    });
  }

  const getRegionOpacity = (regionId: string) => {
    // Instrument/rhythm search highlighting
    if (normalizedQuery || rhythmFilter) {
      return matchedRegionIds.has(regionId) ? 1 : 0.3;
    }

    if (selectedRegionId === regionId) return 1;
    if (hoveredRegion === regionId) return 0.85;
    
    return 0.7;
  };

  return (
    <div className="relative w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center"
      >
        {/* Map container with India map image as background */}
        <div className="relative w-full max-w-4xl">
          <svg
            viewBox="0 0 900 1000"
            className="w-full h-auto"
            style={{ maxHeight: '88vh' }}
          >
            {/* Background gradient */}
            <defs>
              <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#bfdbfe', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#93c5fd', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="900" height="1000" fill="url(#oceanGradient)" />
            
            {/* Ocean labels */}
            <text x="80" y="500" fill="#0369a1" fontSize="14" opacity="0.4" fontStyle="italic">
              Arabian Sea
            </text>
            <text x="750" y="500" fill="#0369a1" fontSize="14" opacity="0.4" fontStyle="italic">
              Bay of Bengal
            </text>
            
            {/* Map Title */}
            <text x="450" y="50" textAnchor="middle" fill="#dc2626" fontSize="36" fontWeight="900" letterSpacing="4">
              INDIA
            </text>
            <text x="450" y="80" textAnchor="middle" fill="#1f2937" fontSize="16" fontWeight="600">
              Musical Regions
            </text>
            
            {/* Draw India outline (simplified) */}
            <path
              d="M 250,100 L 300,90 L 350,100 L 380,130 L 420,150 L 480,170 L 540,180 L 600,200 L 650,250 L 670,300 L 680,350 L 680,400 L 670,450 L 640,500 L 600,550 L 550,600 L 500,650 L 450,700 L 400,750 L 350,780 L 300,790 L 250,780 L 220,750 L 200,700 L 180,650 L 170,600 L 160,550 L 150,500 L 145,450 L 150,400 L 160,350 L 180,300 L 200,250 L 220,200 L 240,150 Z"
              fill="#f5f5f5"
              stroke="#666"
              strokeWidth="2"
              opacity="0.4"
            />
            
            {/* Clickable regions as circles */}
            {regions.map((region) => {
              const regionData = regionalStateMapping[region.id];
              if (!regionData) return null;
              
              const isHovered = hoveredRegion === region.id;
              const isSelected = selectedRegionId === region.id;
              const opacity = getRegionOpacity(region.id);
              
              // Calculate radius based on name length
              const labelLength = region.name.length;
              const rx = Math.max(50, Math.min(110, labelLength * 5));
              const ry = 30;
              
              return (
                <g key={region.id}>
                  {/* Ellipse for region */}
                  <ellipse
                    cx={regionData.cx}
                    cy={regionData.cy}
                    rx={rx}
                    ry={ry}
                    fill={region.color}
                    fillOpacity={opacity}
                    stroke={isSelected ? '#000' : isHovered ? '#374151' : '#666'}
                    strokeWidth={isSelected ? 3 : isHovered ? 2.5 : 1.5}
                    className="cursor-pointer transition-all duration-200"
                    style={{
                      filter: isSelected ? 'drop-shadow(0 6px 8px rgba(0,0,0,0.4))' : isHovered ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                    }}
                    onMouseEnter={() => setHoveredRegion(region.id)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    onClick={() => onRegionClick(region.id)}
                  />
                  
                  {/* Region label */}
                  <text
                    x={regionData.cx}
                    y={regionData.cy + 5}
                    textAnchor="middle"
                    fill="#000"
                    fontSize={labelLength > 12 ? "10" : "12"}
                    fontWeight="800"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                    className="drop-shadow-sm"
                  >
                    {region.name.toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </motion.div>

      {/* Legend - Below Map, centered */}
      <div className="mt-6 bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-200 mx-auto" style={{ maxWidth: '700px' }}>
        <h3 className="text-lg font-bold mb-4 text-gray-900 pb-3 border-b-2 border-gray-300">Musical Regions of India</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          {regions.map(region => (
            <div key={region.id} className="flex items-center space-x-2">
              <div 
                className="w-6 h-6 border-2 border-gray-400 rounded flex-shrink-0" 
                style={{ backgroundColor: region.color }}
              ></div>
              <span className="text-gray-800 font-medium text-xs">{region.name}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-300">
          <p className="text-sm text-gray-600 leading-relaxed">
            💡 <span className="font-semibold">Explore:</span> Click on any colored region to discover its unique musical traditions, instruments, and cultural heritage!
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndiaMap;
