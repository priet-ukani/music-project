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
// Using ISO 3166-2:IN standard codes
const STATE_ID_TO_REGION: Record<string, string> = {
  'IN-RJ': 'rajasthan',
  'IN-PB': 'punjab',
  'IN-WB': 'bengal',
  'IN-TG': 'telangana',
  'IN-AS': 'assam',
  'IN-KL': 'kerala',
  'IN-TN': 'tamilnadu',
  'IN-MH': 'maharashtra',
  'IN-JK': 'kashmir', // Jammu & Kashmir
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
  // Additional mappings for regions that might span multiple states
  'IN-HR': 'punjab', // Haryana - culturally similar to Punjab
  'IN-DL': 'uttarpradesh', // Delhi - shares Hindustani classical tradition
  'IN-BR': 'uttarpradesh', // Bihar - shares cultural similarities
  'IN-MP': 'rajasthan', // Madhya Pradesh - shares some traditions
};

// Reverse mapping for fallback - if a region doesn't have direct state mapping
const REGION_TO_STATE_FALLBACK: Record<string, string[]> = {
  'rajasthan': ['IN-RJ'],
  'punjab': ['IN-PB', 'IN-HR'],
  'bengal': ['IN-WB'],
  'telangana': ['IN-TG'],
  'assam': ['IN-AS'],
  'kerala': ['IN-KL'],
  'tamilnadu': ['IN-TN'],
  'maharashtra': ['IN-MH'],
  'kashmir': ['IN-JK'],
  'nagaland': ['IN-NL'],
  'manipur': ['IN-MN'],
  'uttarpradesh': ['IN-UP', 'IN-DL', 'IN-BR'],
  'gujarat': ['IN-GJ'],
  'karnataka': ['IN-KA'],
  'odisha': ['IN-OR'],
  'uttarakhand': ['IN-UT'],
  'mizoram': ['IN-MZ'],
  'goa': ['IN-GA'],
  'meghalaya': ['IN-ML'],
  'chhattisgarh': ['IN-CT'],
  'jharkhand': ['IN-JH'],
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

  // Handle state clicks - map state ID to region and trigger modal
  const handleStateClick = (stateId: string) => {
    console.log('🎯 State clicked:', stateId);
    
    // Map the state ID to our region
    const region = STATE_ID_TO_REGION[stateId];
    
    if (region) {
      console.log('✅ Opening region modal for:', region);
      // Call parent handler with region ID
      onRegionSelect(region);
    } else {
      console.log('⚠️ No region mapping found for state:', stateId, '- Available mappings:', Object.keys(STATE_ID_TO_REGION));
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

  // Log when component updates to help debug
  useEffect(() => {
    console.log('📍 IndiaMapAccurate rendered - Region count:', musicalRegions.length, 'Selected:', selectedRegion);
  }, [selectedRegion]);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-amber-50 rounded-lg p-4">
      <div 
        ref={mapContainerRef}
        className="w-full max-w-4xl mx-auto"
        style={{ position: 'relative', isolation: 'isolate' }}
      >
        <style>
          {`
            /* Hide the library's default tooltip */
            div[style*="position: absolute"][style*="z-index"] {
              display: none !important;
            }
            
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
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            svg path:hover {
              filter: brightness(1.15) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
              transform: scale(1.02);
              transform-origin: center;
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
          <div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl z-[100] border-2 border-white/30 pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-300"
            style={{
              backdropFilter: 'blur(10px)',
              maxWidth: '500px',
              boxShadow: `0 20px 40px -10px ${hoveredRegionData.color}40, 0 0 0 1px ${hoveredRegionData.color}20`
            }}
          >
            {/* Region Header */}
            <div className="flex items-center space-x-3 mb-3">
              <div 
                className="w-4 h-4 rounded-full animate-pulse" 
                style={{ 
                  backgroundColor: hoveredRegionData.color,
                  boxShadow: `0 0 10px ${hoveredRegionData.color}80`
                }}
              />
              <p className="text-lg font-bold tracking-wide">{hoveredRegionData.name}</p>
            </div>
            
            {/* Description */}
            <p className="text-sm text-gray-200 leading-relaxed mb-3 line-clamp-2">
              {hoveredRegionData.description}
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 mb-3 text-xs">
              <div className="bg-white/10 rounded-lg px-2 py-1.5 text-center">
                <div className="font-bold text-amber-400">{hoveredRegionData.instruments.melodic.length + hoveredRegionData.instruments.rhythmic.length}</div>
                <div className="text-gray-400 text-[10px]">Instruments</div>
              </div>
              <div className="bg-white/10 rounded-lg px-2 py-1.5 text-center">
                <div className="font-bold text-blue-400">{hoveredRegionData.language.primary.length}</div>
                <div className="text-gray-400 text-[10px]">Languages</div>
              </div>
              <div className="bg-white/10 rounded-lg px-2 py-1.5 text-center">
                <div className="font-bold text-green-400">{hoveredRegionData.audioSamples?.length || 0}</div>
                <div className="text-gray-400 text-[10px]">Audio Samples</div>
              </div>
            </div>
            
            {/* Featured Instruments */}
            {hoveredRegionData.instruments.unique.length > 0 && (
              <div className="mb-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Unique Instruments</p>
                <div className="flex flex-wrap gap-1">
                  {hoveredRegionData.instruments.unique.slice(0, 3).map((instrument, idx) => (
                    <span 
                      key={idx} 
                      className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-200 border border-white/20"
                    >
                      {instrument}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Call to Action */}
            <div className="flex items-center justify-center space-x-2 pt-2 border-t border-white/10">
              <svg className="w-4 h-4 text-amber-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              <p className="text-xs text-amber-400 font-semibold">
                Click to explore full details
              </p>
            </div>
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
