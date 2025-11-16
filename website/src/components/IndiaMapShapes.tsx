import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { MusicalRegion, FilterCategory, MusicalAspect } from '../types/music';
import { indiaStateShapes, type StateShapeData } from '../data/indiaMapShapes';

interface IndiaMapProps {
  regions: MusicalRegion[];
  onRegionClick: (regionId: string) => void;
  selectedRegionId?: string;
  filterCategory: FilterCategory;
  highlightAspect: MusicalAspect | null;
  instrumentQuery?: string;
  rhythmFilter?: string;
}

const IndiaMapShapes: React.FC<IndiaMapProps> = ({
  regions,
  onRegionClick,
  selectedRegionId,
  instrumentQuery = '',
  rhythmFilter = '',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Build a map of region ID to region object for quick lookup
  const regionMap = new Map(regions.map(r => [r.id, r]));

  // Find matching regions based on filters
  const normalizedQuery = instrumentQuery.trim().toLowerCase();
  const matchedRegionIds = new Set<string>();

  if (normalizedQuery) {
    regions.forEach(r => {
      const allInstruments = [
        ...(r.instruments?.melodic ?? []),
        ...(r.instruments?.rhythmic ?? []),
        ...(r.instruments?.unique ?? []),
      ].map(s => s.toLowerCase());

      if (allInstruments.some(name => name.includes(normalizedQuery))) {
        matchedRegionIds.add(r.id);
      }
    });
  }

  if (rhythmFilter) {
    regions.forEach(r => {
      const text = [
        r.musicalStructure.rhythmicSystem,
        r.musicalStructure.tempo,
        ...(r.musicalStructure.talas ?? []),
      ]
        .join(' ')
        .toLowerCase();
      const key = rhythmFilter.toLowerCase();

      if (
        text.includes(key) ||
        (rhythmFilter === 'Slow' && /slow|vilambit/.test(text)) ||
        (rhythmFilter === 'Moderate' && /moderate|madhya/.test(text)) ||
        (rhythmFilter === 'Fast' && /fast|drut|140|160|170|180/.test(text)) ||
        (rhythmFilter === 'Accelerating' && /accelerat/.test(text)) ||
        (rhythmFilter === 'Polyrhythmic' && /poly/.test(text)) ||
        (rhythmFilter === 'Complex talas' && /(tala|chapu|jhaptal|rupak|teental|adi)/.test(text))
      ) {
        matchedRegionIds.add(r.id);
      }
    });
  }

  const handleStateClick = (regionId: string | null) => {
    if (regionId) {
      onRegionClick(regionId);
    }
  };

  const handleStateHover = (regionId: string | null, event?: React.MouseEvent) => {
    setHoveredRegion(regionId);
    if (event && regionId) {
      const rect = svgRef.current?.getBoundingClientRect();
      if (rect) {
        setTooltipPos({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    }
  };

  // Get all states and create a lookup for clickable regions
  const stateEntries = Object.entries(indiaStateShapes);

  return (
    <div className="relative w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center"
      >
        <div className="relative w-full inline-block" style={{ maxWidth: '882px' }}>
          {/* Background India Map Image */}
          <img 
            src="/images/india-map.png"
            alt="India Map"
            className="w-full h-auto block"
            style={{ maxHeight: '90vh', objectFit: 'contain' }}
            onError={(e) => {
              // Fallback: show a blue background if image not found
              const target = e.currentTarget;
              target.style.backgroundColor = '#e3f2fd';
              target.style.minHeight = '1024px';
            }}
          />
          
          {/* SVG Overlay with clickable boundary boxes only - no background layers */}
          <svg
            ref={svgRef}
            viewBox="0 0 882 1024"
            className="absolute top-0 left-0 w-full h-full"
            style={{ pointerEvents: 'none' }}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Render clickable state boundaries using actual SVG paths */}
            {stateEntries.map(([stateKey, stateData]: [string, StateShapeData]) => {
              const isClickable = stateData.region !== null;
              if (!isClickable || !stateData.region) return null; // Skip non-musical states
              
              const regionId = stateData.region;
              const region = regionMap.get(regionId);
              if (!region) return null;

              const isHovered = hoveredRegion === regionId;
              const isSelected = selectedRegionId === regionId;
              
              // Show colored border on hover/select/filter
              const showBorder = isHovered || isSelected || (normalizedQuery && matchedRegionIds.has(regionId)) || (rhythmFilter && matchedRegionIds.has(regionId));
              
              return (
                <g key={stateKey}>
                  {/* Clickable path overlay with colored border following actual state boundaries */}
                  <path
                    d={stateData.path}
                    fill="transparent"
                    stroke={showBorder ? region.color : 'transparent'}
                    strokeWidth={isSelected ? 5 : isHovered ? 4 : matchedRegionIds.has(regionId) ? 3 : 0}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    className="cursor-pointer transition-all duration-200"
                    style={{
                      pointerEvents: 'all',
                      filter: isSelected ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' : isHovered ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none',
                    }}
                    onClick={() => handleStateClick(regionId)}
                    onMouseEnter={(e) => handleStateHover(regionId, e)}
                    onMouseLeave={() => setHoveredRegion(null)}
                  />
                  
                  {/* Region name label on hover or selection */}
                  {(isHovered || isSelected) && (
                    <text
                      x={stateData.center[0]}
                      y={stateData.center[1]}
                      textAnchor="middle"
                      dy="0.3em"
                      fill="#000"
                      fontSize="14"
                      fontWeight="900"
                      style={{
                        pointerEvents: 'none',
                        textShadow: '0 0 4px white, 0 0 4px white, 0 0 4px white',
                      }}
                    >
                      {region.name.toUpperCase()}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Tooltip on hover */}
          {hoveredRegion && regionMap.get(hoveredRegion) && tooltipPos && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-semibold pointer-events-none"
              style={{
                left: `${tooltipPos.x}px`,
                top: `${tooltipPos.y - 40}px`,
                zIndex: 50,
              }}
            >
              {regionMap.get(hoveredRegion)?.name}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Legend - Below Map */}
      <div className="mt-8 mx-auto bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-200" style={{ maxWidth: '700px' }}>
        <h3 className="text-lg font-bold mb-4 text-gray-900 pb-3 border-b-2 border-gray-300">Map Legend</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-8 rounded border-2 border-gray-400" style={{ backgroundColor: '#f97316' }}></div>
            <span className="text-gray-800 font-medium text-sm">Musical Regions (Clickable)</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-12 h-8 bg-gray-200 border-2 border-gray-400 rounded"></div>
            <span className="text-gray-700 text-sm">Other States/UTs</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-6 border-2 border-gray-800 rounded" style={{ backgroundColor: '#ec4899' }}></div>
            <span className="text-gray-800 text-sm font-medium">Selected State</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-6 border-4 border-orange-600 rounded" style={{ backgroundColor: '#fed7aa' }}></div>
            <span className="text-gray-700 text-sm">Hovered State</span>
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-gray-300">
          <p className="text-sm text-gray-600 leading-relaxed">
            🎵 <span className="font-semibold">Explore the Musical Map:</span> Click on any state/region to discover its unique musical traditions, traditional instruments, and regional artists. Use the filters above to find specific instruments or musical styles!
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndiaMapShapes;
