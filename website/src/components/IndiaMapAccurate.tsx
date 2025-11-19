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

    // Manual event delegation to handle clicks if the library fails
    useEffect(() => {
        const container = mapContainerRef.current;
        if (!container) return;

        const handleManualClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            console.log('🖱️ Raw click target:', target.tagName, target);

            // Check if we clicked a path or a child of a path
            // Also check for 'g' elements as some maps group paths
            const element = target.closest('path') || target.closest('g');

            if (element) {
                console.log('👆 Click detected on SVG element:', element.tagName, element);

                // Try to get ID from various possible attributes on the element or its parent
                const stateId = element.getAttribute('id') ||
                    element.getAttribute('data-id') ||
                    element.getAttribute('name') ||
                    element.parentElement?.getAttribute('id'); // Check parent group

                if (stateId) {
                    console.log('📍 Found state ID:', stateId);

                    // Direct mapping check
                    if (STATE_ID_TO_REGION[stateId]) {
                        console.log('✅ Direct match found, triggering select');
                        handleStateClick(stateId);
                        e.stopPropagation();
                        return;
                    }

                    // Case-insensitive check
                    const upperId = stateId.toUpperCase();
                    if (STATE_ID_TO_REGION[upperId]) {
                        console.log('✅ Case-insensitive match found, triggering select');
                        handleStateClick(upperId);
                        e.stopPropagation();
                        return;
                    }

                    // Partial match check (e.g. if ID is "IN-RJ-path")
                    const partialMatch = Object.keys(STATE_ID_TO_REGION).find(key => stateId.includes(key));
                    if (partialMatch) {
                        console.log('✅ Partial match found:', partialMatch);
                        handleStateClick(partialMatch);
                        e.stopPropagation();
                        return;
                    }
                } else {
                    console.log('⚠️ Element clicked but no ID found. Attributes:', {
                        id: element.id,
                        class: element.className,
                        name: element.getAttribute('name')
                    });
                }
            }
        };

        container.addEventListener('click', handleManualClick);
        return () => container.removeEventListener('click', handleManualClick);
    }, [selectedRegion]); // Re-bind if needed, though refs are stable

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

    // MutationObserver to remove the persistent library tooltip
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node instanceof HTMLElement) {
                        // Check if this looks like the library tooltip
                        // It's usually a div with absolute/fixed position, white background, and high z-index
                        // We avoid hiding our own UI elements
                        const isTooltip =
                            (node.style.position === 'absolute' || node.style.position === 'fixed') &&
                            (node.style.backgroundColor === 'white' || node.style.backgroundColor === 'rgb(255, 255, 255)') &&
                            !node.classList.contains('map-legend') &&
                            !node.id.includes('modal'); // Avoid hiding modals

                        if (isTooltip) {
                            // Double check content - usually contains state name
                            const hasStateName = stateData.some(s => node.textContent?.includes(STATE_ID_TO_REGION[s.id]));
                            // Or just hide it if it's suspicious and we are hovering the map
                            if (hoveredStateId || hasStateName || node.textContent?.includes('State:')) {
                                node.style.display = 'none';
                                node.style.visibility = 'hidden';
                                node.style.opacity = '0';
                                node.style.pointerEvents = 'none';
                            }
                        }
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, [hoveredStateId, stateData]);

    return (
        <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-amber-50 rounded-lg p-4">
            <div
                ref={mapContainerRef}
                className="w-full max-w-4xl mx-auto map-container"
                style={{ position: 'relative', isolation: 'isolate' }}
                onClick={(e) => console.log('📦 Container clicked:', e.target)}
            >
                <style>
                    {`
/* Hide tooltips by class or role */
.map-container div[class*="tooltip"],
.map-container div[role="tooltip"] {
    display: none !important;
    pointer-events: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
}

/* Global tooltip override - targeting body children that might be the tooltip */
body > div[class*="tooltip"] {
    display: none !important; 
    opacity: 0 !important;
    pointer-events: none !important;
}

/* Hide foreignObject if used for tooltip */
svg foreignObject {
    display: none !important;
}

/* Ensure SVG and all children are clickable */
.map-container {
  pointer-events: none !important; /* Let clicks pass through the container */
}

.map-container > div {
  pointer-events: none !important; /* Let clicks pass through any wrapper divs */
}

svg {
  pointer-events: auto !important; /* Re-enable clicks on the SVG itself */
  z-index: 10;
  position: relative;
}

svg * {
  pointer-events: auto !important; /* Re-enable clicks on SVG contents */
}

svg path {
  cursor: pointer !important;
  pointer-events: auto !important;
  user-select: none;
  -webkit-user-select: none;
  position: relative;
  z-index: 10;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

svg path:hover {
  filter: brightness(1.15) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  transform: scale(1.02);
  transform-origin: center;
  z-index: 20;
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
                  pointer-events: auto !important;
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
                        tooltipConfig: { backgroundColor: 'transparent', textColor: 'transparent' },
                    }}
                    stateData={stateData}
                    onStateHover={handleStateHover}
                    onStateClick={handleStateClick}
                />



                {/* Legend */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 text-xs pointer-events-none map-legend">
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
