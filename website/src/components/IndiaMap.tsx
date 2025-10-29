import { useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import type { MusicalRegion, FilterCategory, MusicalAspect } from '../types/music';
import { indiaStatesGeoData } from '../data/indiaGeoData';

interface IndiaMapProps {
  regions: MusicalRegion[];
  onRegionClick: (regionId: string) => void;
  selectedRegionId?: string;
  filterCategory: FilterCategory;
  highlightAspect: MusicalAspect | null;
  instrumentQuery?: string;
  rhythmFilter?: string;
}

// Use the accurate geographical data from indiaGeoData.ts
const indiaStates = indiaStatesGeoData;

const IndiaMap: React.FC<IndiaMapProps> = ({
  regions,
  onRegionClick,
  selectedRegionId,
  instrumentQuery = '',
  rhythmFilter = '',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);

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

  const getStateColor = (stateRegion: string | null) => {
    if (!stateRegion) return '#e5e7eb'; // Gray for non-clickable states
    
    const region = regions.find(r => r.id === stateRegion);
    if (!region) return '#e5e7eb';
    
    // Instrument search highlighting: only emphasize matching regions
    if (normalizedQuery || rhythmFilter) {
      if (matchedRegionIds.has(stateRegion)) {
        return region.color;
      }
      return '#d1d5db';
    }

    if (selectedRegionId === stateRegion) return region.color;
    if (hoveredState && indiaStates[hoveredState as keyof typeof indiaStates]?.region === stateRegion) {
      return region.color;
    }
    
    return d3.color(region.color)?.copy({ opacity: 0.6 })?.toString() || region.color;
  };

  const handleStateClick = (stateRegion: string | null) => {
    if (stateRegion) {
      onRegionClick(stateRegion);
    }
  };

  // Equal-sized circles drawn at original state centers (positions unchanged)
  const statesArray = Object.entries(indiaStates);
  const circleRadius = 22; // base vertical radius for oval

  return (
    <div className="relative w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center"
      >
        <svg
          ref={svgRef}
          viewBox="100 0 900 850"
          className="w-full h-auto"
          style={{ maxHeight: '88vh' }}
        >
          {/* Background - Ocean blue */}
          <defs>
            <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#bfdbfe', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#93c5fd', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <rect x="100" y="0" width="900" height="850" fill="url(#oceanGradient)" />
          
          {/* Ocean and country labels */}
          <text x="125" y="450" fill="#0369a1" fontSize="16" opacity="0.5" fontStyle="italic" fontWeight="500">
            Arabian Sea
          </text>
          <text x="850" y="450" fill="#0369a1" fontSize="16" opacity="0.5" fontStyle="italic" fontWeight="500">
            Bay of Bengal
          </text>
          <text x="460" y="820" fill="#0369a1" fontSize="15" opacity="0.5" fontStyle="italic" fontWeight="500">
            Indian Ocean
          </text>
          
          {/* Neighboring countries (faded labels) */}
          <text x="180" y="80" fill="#64748b" fontSize="13" opacity="0.4">PAKISTAN</text>
          <text x="420" y="50" fill="#64748b" fontSize="13" opacity="0.4">CHINA</text>
          <text x="530" y="150" fill="#64748b" fontSize="13" opacity="0.4">NEPAL</text>
          <text x="605" y="190" fill="#64748b" fontSize="13" opacity="0.4">BHUTAN</text>
          <text x="620" y="280" fill="#64748b" fontSize="13" opacity="0.4">BANGLADESH</text>
          <text x="720" y="350" fill="#64748b" fontSize="13" opacity="0.4">MYANMAR</text>
          <text x="420" y="800" fill="#64748b" fontSize="13" opacity="0.4">SRI LANKA</text>
          
          {/* Border decoration */}
          <rect x="100" y="0" width="900" height="850" fill="none" stroke="#475569" strokeWidth="2" opacity="0.4" />
          
          {/* Map Title */}
          <text x="550" y="30" textAnchor="middle" fill="#dc2626" fontSize="28" fontWeight="900" letterSpacing="4">
            INDIA
          </text>
          <text x="550" y="52" textAnchor="middle" fill="#1f2937" fontSize="13" fontWeight="600">
            States and Union Territories
          </text>
          
          {/* India States as equal-sized circles at original centers */}
          {statesArray.map(([stateName, stateData]) => {
            const cx = stateData.center[0];
            const cy = stateData.center[1];
            const isClickable = stateData.region !== null;
            const isHovered = hoveredState === stateName;
            const isSelected = selectedRegionId === stateData.region;
            const fill = getStateColor(stateData.region);
            const labelLength = stateData.name.length;
            const rx = Math.max(circleRadius + 6, Math.min(90, Math.round(labelLength * 4.3))); // cap max width
            const ry = circleRadius; // keep vertical radius constant for uniform height
            return (
              <g key={stateName}>
                <ellipse
                  cx={cx}
                  cy={cy}
                  rx={rx}
                  ry={ry}
                  fill={fill}
                  stroke="#374151"
                  strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1.2}
                  className={isClickable ? 'cursor-pointer transition-all duration-200' : ''}
                  onMouseEnter={() => isClickable && setHoveredState(stateName)}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={() => handleStateClick(stateData.region)}
                  style={{
                    filter: isSelected ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' : isHovered ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none'
                  }}
                />
                <text
                  x={cx}
                  y={cy + 3}
                  textAnchor="middle"
                  fill="#000000"
                  fontSize={10}
                  fontWeight="800"
                  style={{ pointerEvents: 'none' }}
                >
                  {stateData.name.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* Legend - Below Map, centered */}
      <div className="mt-6 bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-200 mx-auto" style={{ maxWidth: '600px' }}>
        <h3 className="text-lg font-bold mb-4 text-gray-900 pb-3 border-b-2 border-gray-300">Map Legend</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-6 border-2 border-gray-400 rounded" style={{ backgroundColor: '#f97316' }}></div>
            <span className="text-gray-800 font-medium">Musical Regions (Clickable)</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-6 bg-gray-200 border-2 border-gray-600 rounded"></div>
            <span className="text-gray-700">Other States/UTs</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative w-6 h-6 bg-red-600 border-2 border-white">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="text-gray-800 font-medium">National Capital</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 rounded-full bg-gray-900 border-2 border-white"></div>
            <span className="text-gray-800">State/UT Capitals</span>
          </div>
          <div className="flex items-center space-x-3 col-span-2">
            <div className="w-10 h-px bg-gray-700"></div>
            <span className="text-gray-700">State/UT Boundaries</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-300">
          <p className="text-sm text-gray-600 leading-relaxed">
            💡 <span className="font-semibold">Explore:</span> Click on colored states to discover their unique musical traditions!
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndiaMap;
