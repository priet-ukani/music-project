import { useState, useRef, useEffect } from 'react';
import { IndiaMap } from '@vishalvoid/react-india-map';
import type { StateData } from '@vishalvoid/react-india-map';
import { musicalRegions } from '../data/regions';

interface IndiaMapAccurateProps {
  selectedRegion: string | null;
  onRegionSelect: (region: string | null) => void;
  matchedRegions: Set<string>;
}

// Map state IDs to our musical regions
const STATE_ID_TO_REGION: Record<string, string> = {
  'IN-RJ': 'rajasthan',
  'IN-PB': 'punjab',
  'IN-WB': 'bengal',
  'IN-TG': 'telangana',
  'IN-AS': 'assam',
  'IN-KL': 'kerala',
  'IN-TN': 'tamilnadu',
  'IN-MH': 'maharashtra',
  'IN-JK': 'kashmir',
  'IN-NL': 'nagaland',
  'IN-MN': 'manipur',
  'IN-UP': 'uttarpradesh',
  'IN-GJ': 'gujarat',
  'IN-KA': 'karnataka',
  'IN-OR': 'odisha',
  'IN-UT': 'uttarakhand',
  'IN-MZ': 'mizoram',
  'IN-GA': 'goa',
  'IN-ML': 'meghalaya',
  'IN-CT': 'chhattisgarh',
  'IN-JH': 'jharkhand',
};

export default function IndiaMapAccurate({
  selectedRegion,
  onRegionSelect,
  matchedRegions,
}: IndiaMapAccurateProps) {
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const handleStateHover = (stateId: string) => {
    // Only update if it's a different state to prevent log spam
    if (hoveredStateId !== stateId) {
      setHoveredStateId(stateId);
    }
  };

  // SOLUTION 1: Use the library's built-in onStateClick handler
  const handleStateClick = (stateId: string) => {
    console.log('🎯 State clicked via onStateClick:', stateId);
    
    // Map the state ID to our region
    const region = STATE_ID_TO_REGION[stateId];
    
    if (region) {
      console.log('✅ Opening region modal for:', region);
      onRegionSelect(region);
    } else {
      console.log('⚠️ No region mapping found for state:', stateId);
    }
  };

  // Prepare state data with region information and styling
  const stateData: StateData[] = Object.keys(STATE_ID_TO_REGION).map((stateId) => {
    const region = STATE_ID_TO_REGION[stateId];
    const regionData = musicalRegions.find((r) => r.id === region);
    const isSelected = selectedRegion === region;
    const isHovered = hoveredStateId === stateId;
    const isMatched = matchedRegions.has(region);
    const isFiltering = matchedRegions.size > 0;

    // Get the base color
    const baseColor = regionData?.color || '#94a3b8';

    return {
      id: stateId,
      customData: {
        region,
        regionName: regionData?.name,
        color: baseColor,
        fill: isSelected 
          ? baseColor
          : isHovered
          ? `${baseColor}ee` 
          : isFiltering && !isMatched
          ? '#e2e8f0'
          : `${baseColor}dd`,
        stroke: isSelected || isHovered ? baseColor : '#64748b',
        strokeWidth: isSelected ? 2.5 : isHovered ? 2 : 1,
        opacity: isFiltering && !isMatched ? 0.4 : 1,
      },
    };
  });

  const hoveredRegion = hoveredStateId ? STATE_ID_TO_REGION[hoveredStateId] : null;
  const hoveredRegionData = hoveredRegion
    ? musicalRegions.find((r) => r.id === hoveredRegion)
    : null;

  // Apply dynamic styling to states
  const getStateStyle = (stateId: string) => {
    const state = stateData.find((s) => s.id === stateId);
    if (!state?.customData) return {};

    return {
      fill: state.customData.fill,
      stroke: state.customData.stroke,
      strokeWidth: state.customData.strokeWidth,
      opacity: state.customData.opacity,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    };
  };

  // Add useEffect to attach click handlers directly to SVG paths after render
  useEffect(() => {
    const attachClickHandlers = () => {
      // Find all SVG paths with state IDs
      stateData.forEach((state) => {
        const paths = document.querySelectorAll(`path[id="${state.id}"]`);
        paths.forEach((path) => {
          // Remove existing listeners to avoid duplicates
          const newPath = path.cloneNode(true) as SVGPathElement;
          path.parentNode?.replaceChild(newPath, path);
          
          // Attach click handler directly
          newPath.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('🎯 Direct click on path:', state.id);
            const region = STATE_ID_TO_REGION[state.id];
            if (region) {
              onRegionSelect(region);
            }
          });
          
          // Ensure pointer events are enabled
          newPath.style.pointerEvents = 'all';
          newPath.style.cursor = 'pointer';
        });
      });
    };

    // Wait for map to render
    const timer = setTimeout(attachClickHandlers, 100);
    return () => clearTimeout(timer);
  }, [stateData, selectedRegion, matchedRegions, onRegionSelect]);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-amber-50 rounded-lg p-4">
      <div 
        ref={mapContainerRef}
        className="w-full max-w-4xl mx-auto"
        style={{ pointerEvents: 'auto', position: 'relative', zIndex: 1 }}
      >
        <style>
          {`
            /* Ensure all SVG paths are clickable */
            svg {
              pointer-events: all !important;
              position: relative;
              z-index: 1;
            }
            
            svg path {
              cursor: pointer !important;
              pointer-events: all !important;
              user-select: none;
              -webkit-user-select: none;
              position: relative;
              z-index: 2;
            }
            
            svg path:hover {
              filter: brightness(1.1);
            }
            
            /* Ensure no overlays block clicks */
            svg g {
              pointer-events: none;
            }
            
            svg g path {
              pointer-events: all !important;
            }
            
            ${stateData.map((state) => {
              const styles = getStateStyle(state.id);
              return `
                path[id="${state.id}"],
                path[data-state-id="${state.id}"] {
                  fill: ${styles.fill} !important;
                  stroke: ${styles.stroke} !important;
                  stroke-width: ${styles.strokeWidth} !important;
                  opacity: ${styles.opacity} !important;
                  cursor: pointer !important;
                  pointer-events: all !important;
                  transition: all 0.2s ease;
                  z-index: 10 !important;
                }
                
                path[id="${state.id}"]:hover,
                path[data-state-id="${state.id}"]:hover {
                  fill: ${styles.fill}ee !important;
                  stroke-width: ${(styles.strokeWidth || 1) + 0.5} !important;
                }
              `;
            }).join('\n')}
          `}
        </style>
        <IndiaMap
          mapStyle={{
            backgroundColor: 'transparent',
            hoverColor: '#fde047',
            stroke: '#64748b',
            strokeWidth: 1,
          }}
          stateData={stateData}
          onStateHover={handleStateHover}
          onStateClick={handleStateClick}
        />
        
        {/* Enhanced Region tooltip */}
        {hoveredRegionData && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-3 rounded-xl shadow-2xl z-10 border-2 border-white/20 pointer-events-none">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: hoveredRegionData.color }}
              />
              <p className="text-base font-bold">{hoveredRegionData.name}</p>
            </div>
            <p className="text-xs text-gray-300 mt-1 max-w-md">
              {hoveredRegionData.description}
            </p>
            <p className="text-xs text-amber-400 mt-2 font-medium">
              Click to explore instruments, artists & traditions
            </p>
          </div>
        )}
        
        {/* Legend */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 text-xs pointer-events-none">
          <p className="font-bold text-gray-700 mb-2">Musical Regions</p>
          <div className="space-y-1">
            {musicalRegions.slice(0, 5).map((region) => (
              <div key={region.id} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-sm border border-gray-400" 
                  style={{ backgroundColor: `${region.color}cc` }}
                />
                <span className="text-gray-600">{region.name}</span>
              </div>
            ))}
            <p className="text-gray-400 text-[10px] mt-2">+ {musicalRegions.length - 5} more regions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
