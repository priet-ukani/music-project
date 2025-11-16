# Visual Enhancement Components

This document describes the new visual enhancement components added to the Musical Map of India project.

## Components Overview

### 1. ImageGallery Component

**Location:** `src/components/ImageGallery.tsx`

**Purpose:** Display collections of images with lightbox functionality, zoom, and download capabilities.

**Features:**
- Grid layout (2, 3, or 4 columns)
- Hover effects with overlay information
- Lightbox modal with full-screen viewing
- Keyboard navigation (Arrow keys, Escape)
- Zoom in/out functionality
- Image download capability
- Staggered entrance animations
- Responsive design

**Usage Example:**
```tsx
import ImageGallery from './components/ImageGallery';

const images = [
  {
    url: '/images/veena.jpg',
    title: 'Traditional Veena',
    description: 'South Indian classical string instrument',
    credit: 'Museum of Music'
  },
  {
    url: '/images/tabla.jpg',
    title: 'Tabla Set',
    description: 'North Indian percussion instrument',
    credit: 'National Archives'
  }
];

<ImageGallery 
  images={images}
  title="Instrument Gallery"
  columns={3}
/>
```

**Props:**
- `images`: Array of `GalleryImage` objects
  - `url`: Image URL (string)
  - `title`: Image title (string)
  - `description`: Optional description (string)
  - `credit`: Optional photo credit (string)
- `title`: Optional gallery title (string)
- `columns`: Grid columns - 2, 3, or 4 (number, default: 3)

---

### 2. VideoPlayer Component

**Location:** `src/components/VideoPlayer.tsx`

**Purpose:** Advanced video player with custom controls for performance videos and demonstrations.

**Features:**
- Custom styled controls
- Play/Pause with overlay
- Volume control with slider
- Skip forward/backward (10 seconds)
- Progress bar with seek functionality
- Fullscreen mode
- Auto-hide controls when playing
- Loading state with spinner
- Time display (current/total)
- Thumbnail poster support

**Usage Example:**
```tsx
import VideoPlayer from './components/VideoPlayer';

<VideoPlayer
  videoUrl="/videos/veena-performance.mp4"
  title="Veena Recital by Jayanthi Kumaresh"
  description="Classical Carnatic performance recorded at Chennai Music Academy"
  thumbnail="/images/veena-thumb.jpg"
  autoplay={false}
  loop={false}
  controls={true}
/>
```

**Props:**
- `videoUrl`: Video file URL (string, required)
- `title`: Video title (string, required)
- `description`: Optional video description (string)
- `thumbnail`: Optional poster image URL (string)
- `autoplay`: Auto-play video (boolean, default: false)
- `loop`: Loop video (boolean, default: false)
- `controls`: Show custom controls (boolean, default: true)

**Keyboard Shortcuts:**
- Space: Play/Pause
- Arrow Left: Seek backward 10s
- Arrow Right: Seek forward 10s
- F: Fullscreen toggle

---

### 3. Photo360Viewer Component

**Location:** `src/components/Photo360Viewer.tsx`

**Purpose:** Interactive 360° viewer for instruments and objects, allowing users to rotate and explore from all angles.

**Features:**
- Drag-to-rotate interaction (mouse and touch)
- Auto-rotation mode with adjustable speed
- Rotation angle indicator
- Fullscreen support
- Info overlay with instructions
- Loading state
- Smooth rotation animations
- Mobile-friendly touch controls

**Usage Example:**
```tsx
import Photo360Viewer from './components/Photo360Viewer';

<Photo360Viewer
  imageUrl="/images/sitar-360.jpg"
  title="Classical Sitar - 360° View"
  description="Explore this hand-crafted sitar from Varanasi"
  autoRotate={true}
  rotationSpeed={0.5}
/>
```

**Props:**
- `imageUrl`: 360° image URL (string, required)
- `title`: Viewer title (string, required)
- `description`: Optional description (string)
- `autoRotate`: Enable auto-rotation (boolean, default: false)
- `rotationSpeed`: Rotation speed in degrees per frame (number, default: 0.5)

**Interaction:**
- Desktop: Click and drag horizontally
- Mobile: Swipe left/right
- Auto-rotate: Toggle button in bottom controls
- Fullscreen: Button in bottom-right corner

**Technical Notes:**
- Uses CSS 3D transforms for rotation effect
- Rotation state is preserved when toggling auto-rotate
- Smooth transition between manual and auto modes

---

## Enhanced Animations

### Parallax Scrolling

The main App component now includes parallax scrolling effects on the header banner:

```tsx
// Header banner moves slower than scroll speed
style={{ transform: `translateY(${scrollY * 0.1}px)` }}
```

### Staggered Entrance Animations

Stats cards now have staggered entrance animations with spring physics:

```tsx
transition={{ 
  delay: 0.3 + index * 0.1, 
  type: 'spring', 
  stiffness: 100 
}}
```

### Hover Micro-interactions

- Stats cards: Scale up and lift on hover
- Gallery images: Scale up image inside container
- Buttons: Scale effects with Framer Motion
- Icons: Pulse and rotate animations

---

## Integration Guide

### Adding Gallery to RegionModal

Example integration in `RegionModal.tsx`:

```tsx
import ImageGallery from './ImageGallery';

// Inside instruments tab
{activeTab === 'instruments' && (
  <div className="space-y-6">
    <Section title="Instrument Photos" icon={<Camera />}>
      <ImageGallery
        images={region.instrumentImages || []}
        title="Regional Instruments"
        columns={3}
      />
    </Section>
  </div>
)}
```

### Adding Video Player to Performance Tab

```tsx
import VideoPlayer from './VideoPlayer';

{activeTab === 'performance' && (
  <div className="space-y-6">
    <Section title="Performance Videos" icon={<Video />}>
      {region.performanceVideos?.map((video, idx) => (
        <VideoPlayer
          key={idx}
          videoUrl={video.url}
          title={video.title}
          description={video.description}
          thumbnail={video.thumbnail}
        />
      ))}
    </Section>
  </div>
)}
```

### Adding 360° Viewer for Instruments

```tsx
import Photo360Viewer from './Photo360Viewer';

// In InstrumentSpotlight component
{instrument.has360View && (
  <Photo360Viewer
    imageUrl={instrument.image360}
    title={`${instrument.name} - 360° View`}
    description={instrument.description}
    autoRotate={true}
  />
)}
```

---

## CSS Utilities Added

New utility classes in `index.css`:

- `.animate-float`: Floating animation for decorative elements
- `.animate-pulse-slow`: Slower pulse animation
- `html { scroll-behavior: smooth }`: Smooth page scrolling
- `.slider-video`: Custom video player slider styles

---

## Performance Considerations

### Image Optimization
- Use appropriately sized images for galleries
- Implement lazy loading for images below the fold
- Consider WebP format for better compression
- Recommended sizes:
  - Gallery thumbnails: 600x600px
  - Lightbox images: 1920x1080px max
  - 360° views: 2048x1536px for smooth rotation

### Video Optimization
- Use H.264/MP4 format for maximum compatibility
- Provide poster images to reduce initial load
- Consider hosting on CDN for faster delivery
- Recommended bitrate: 2-4 Mbps for web
- Resolution: 1080p max, 720p for mobile

### Animation Performance
- Uses Framer Motion's optimized animations
- Hardware-accelerated CSS transforms
- Request animation frame for smooth 360° rotation
- Debounced scroll events for parallax effects

---

## Future Enhancements

Potential additions for next phase:

1. **VR Support**: WebXR integration for immersive 360° experiences
2. **Image Comparison**: Side-by-side instrument comparison slider
3. **Audio Sync**: Synchronized audio with video timeline markers
4. **AR Viewer**: Augmented reality instrument placement
5. **Social Sharing**: Direct share buttons for images/videos
6. **Annotations**: Interactive hotspots on 360° views
7. **Playlists**: Video playlist functionality
8. **Comments**: User comments on media items

---

## Accessibility

All components include:
- Keyboard navigation support
- ARIA labels where appropriate
- Focus management
- Screen reader friendly
- High contrast mode compatible
- Reduced motion support (respects `prefers-reduced-motion`)

---

## Browser Compatibility

Tested and supported on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 11+)

---

## Asset Requirements

To fully utilize these components, prepare the following assets:

### For Each Instrument:
- High-resolution photo (1920x1080px)
- 360° composite image or photo series
- Demonstration video (1-3 minutes)
- Thumbnail image (600x600px)

### For Each Artist:
- Profile photo (800x800px)
- Performance video clips
- Gallery of performance photos
- Archival/historical photos (if applicable)

### For Each Region:
- Landscape photos of typical venues
- Festival/performance photographs
- Instrument close-ups
- Cultural context images

---

## Example Integration: Complete Regional Page

```tsx
<RegionModal region={region} onClose={handleClose}>
  {/* Overview Tab - Gallery of regional photos */}
  <ImageGallery
    images={region.photos}
    title="Regional Landscapes"
    columns={3}
  />

  {/* Instruments Tab - 360° views */}
  {region.instruments.map(instrument => (
    <Photo360Viewer
      imageUrl={instrument.image360}
      title={instrument.name}
      autoRotate={true}
    />
  ))}

  {/* Performance Tab - Video demonstrations */}
  {region.performances.map(video => (
    <VideoPlayer
      videoUrl={video.url}
      title={video.title}
      description={video.description}
    />
  ))}

  {/* Artists Tab - Artist galleries */}
  {region.artists.map(artist => (
    <ImageGallery
      images={artist.photos}
      title={`${artist.name} - Photo Gallery`}
      columns={2}
    />
  ))}
</RegionModal>
```

---

## Troubleshooting

### Gallery images not loading
- Check image URLs are correct and accessible
- Verify CORS headers if loading from external domain
- Check browser console for network errors

### Video not playing
- Ensure video format is H.264 MP4
- Check that video file is properly encoded
- Verify browser supports the video codec
- Test autoplay policy (many browsers block autoplay with sound)

### 360° viewer not rotating smoothly
- Reduce image size if too large (>3MB)
- Check that image is properly loaded
- Verify no JavaScript errors in console
- Test on different devices for performance

### Animations stuttering
- Reduce number of simultaneous animations
- Check browser performance tab for bottlenecks
- Consider reducing parallax effect multiplier
- Disable animations for users with `prefers-reduced-motion`

---

For questions or issues, please refer to the main project documentation or create an issue in the repository.
