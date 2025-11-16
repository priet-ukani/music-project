# Musical News Section - Documentation

## Overview
The Musical News Section is a comprehensive feature that displays upcoming and recent musical events, festivals, concerts, awards, and cultural activities across India.

## Features

### 1. **Event Categories** (6 types)
- 🎊 **Festivals**: Navratri, Bihu, Thrissur Pooram, Rajasthan Folk Festival, Hornbill Festival
- 🎵 **Concerts**: Classical, folk, and contemporary performances
- 🏆 **Awards**: Padma Awards, Sangeet Natak Akademi Awards
- 🎭 **Cultural Events**: Dover Lane Music Conference, Hampi Utsav, Surajkund Mela
- 📚 **Workshops**: Tabla, Odissi, folk instruments training programs
- 💿 **Releases**: New albums and documentation projects

### 2. **Filtering System**
- **Category Filter**: Filter by event type (all 6 categories)
- **Region Filter**: Filter events by Indian state/region
- **Smart Highlighting**: 
  - Featured events marked with ⭐
  - Upcoming events marked with green badge
  - Past events shown for reference

### 3. **Event Information Displayed**
- Title and description
- Date (single or multi-day events)
- Venue and city
- Featured artists
- Category badge with emoji
- Tags for quick identification
- Ticket booking links (where available)

### 4. **Integration with Map**
- When a region is selected on the map, news section automatically filters to show events from that region
- Seamless context switching between map exploration and event discovery

## Data Structure

### File: `src/data/musicalNews.ts`
Contains 25+ pre-populated events covering:
- Major festivals across 10+ states
- Classical and folk concerts
- National and regional awards
- Workshops and learning opportunities
- Album releases and cultural projects

### Type Definition: `src/types/music.ts`
```typescript
export type NewsCategory = 'festival' | 'concert' | 'award' | 'cultural-event' | 'workshop' | 'release';

export interface MusicalNews {
  id: string;
  title: string;
  category: NewsCategory;
  region: string;
  date: string;
  endDate?: string;
  description: string;
  venue?: string;
  city?: string;
  artists?: string[];
  organizer?: string;
  ticketUrl?: string;
  imageUrl?: string;
  tags?: string[];
  featured?: boolean;
}
```

## Component: `MusicalNewsSection.tsx`

### Props
```typescript
interface MusicalNewsProps {
  selectedRegion?: string;  // Auto-filter by region when map is clicked
  limit?: number;            // Limit number of events shown
}
```

### Key Features
1. **Responsive Grid Layout**: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
2. **Animated Transitions**: Framer Motion for smooth filtering and layout changes
3. **Smart Sorting**: Featured events first, then by date (upcoming events prioritized)
4. **Empty State Handling**: Clear messaging when no events match filters
5. **Accessibility**: Semantic HTML, keyboard navigation, ARIA labels

## Sample Events Included

### Festivals (9 events)
- Navratri 2025 (Gujarat) - Oct 3-11
- Rongali Bihu (Assam) - Apr 14-20
- Thrissur Pooram (Kerala) - Apr 21
- Rajasthan International Folk Festival - Oct 24-28
- Konark Dance Festival (Odisha) - Dec 1-5
- Hornbill Festival (Nagaland) - Dec 1-10
- Hampi Utsav (Karnataka) - Jan 15-17, 2026
- Dover Lane Music Conference (Bengal) - Jan 23-27, 2026
- Surajkund Mela (Haryana) - Feb 1-15

### Concerts (4 events)
- Ustad Zakir Hussain Tabla Solo - Nov 25
- T.M. Krishna Carnatic Concert - Dec 15
- Papon Homecoming Tour (Assam) - Dec 20
- Remo Fernandes New Year Concert (Goa) - Dec 31

### Awards (3 events)
- Padma Awards 2025 - Jan 25
- Sangeet Natak Akademi Awards - Feb 15
- Tansen Samaroh (Madhya Pradesh) - Nov 18-22

### Workshops (3 events)
- Advanced Tabla Workshop (Delhi) - Nov 10-15
- Odissi Music Vocal Workshop - Dec 5-12
- Northeast Folk Instruments Camp - Jan 20-25, 2026

### Releases (2 events)
- Teejan Bai Pandavani Album - Nov 30
- Pena Revival Project (Manipur) - Dec 10

## Usage in Application

The component is integrated into `App.tsx` as a section below the map:

```tsx
<section className="bg-gray-50 py-16">
  <MusicalNewsSection 
    selectedRegion={selectedRegion?.id} 
    limit={6} 
  />
</section>
```

## Future Enhancements (Possible)

1. **Real-time Updates**: Connect to a CMS or API for live event data
2. **User Submissions**: Allow artists/organizers to submit events
3. **Calendar Integration**: Export events to Google Calendar/iCal
4. **Location-based Sorting**: Show nearby events based on user location
5. **Favorites**: Let users bookmark events they're interested in
6. **Social Sharing**: Share events on social media
7. **Email Notifications**: Subscribe to event updates by region/category
8. **Past Events Archive**: Separate view for historical events with photos/videos

## Bundle Impact

- **CSS**: +2.61 KB (48.99 KB → 51.60 KB)
- **JS**: +15.70 KB (752.28 KB → 767.98 KB)
- **Gzipped JS**: +4.80 KB (240.00 KB → 244.80 KB)
- Total increase: ~18 KB uncompressed, ~5 KB gzipped

## Technologies Used

- React 18 with TypeScript
- Framer Motion (animations)
- Lucide React (icons)
- Tailwind CSS (styling)
- Date formatting with native Intl API

---

**Created**: November 16, 2025  
**Last Updated**: November 16, 2025  
**Status**: ✅ Production Ready
