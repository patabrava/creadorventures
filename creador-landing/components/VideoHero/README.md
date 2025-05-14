# VideoHero Component

A full-width video hero section with interactive custom cursor, designed following the neo-brutalist minimalist style guide.

## Features

- Interactive custom cursor that follows mouse movement
- Click-to-play functionality with smooth transitions
- Error handling with friendly user messages
- Cross-browser compatibility with multiple video formats
- Responsive design for all device sizes
- Accessibility support with keyboard navigation
- Performance optimized with lazy loading
- Analytics event tracking
- Built-in error boundary

## Usage

```jsx
import VideoHero from '@/components/VideoHero';

// Basic usage
<VideoHero 
  previewVideoSrc="/path/to/video.mp4" 
  vimeoId="123456789"
  posterSrc="/path/to/poster.jpg" 
/>
```

## Component Structure

The VideoHero component is composed of several sub-components:

- **VideoHero**: Main container component
- **VideoPlayer**: Handles video playback
- **VideoOverlay**: Invisible overlay for click interactions
- **VideoError**: Shows error messages when video fails to load/play
- **CustomCursor**: Provides the interactive cursor that follows mouse movement

## Props

### VideoHero

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| previewVideoSrc | string | Yes | Path to the preview video file (MP4 format) |
| vimeoId | string | Yes | Vimeo video ID for the full video playback |
| posterSrc | string | No | Path to the poster/thumbnail image |

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Accessibility

- All interactive elements are keyboard navigable
- Appropriate ARIA attributes for screen readers
- Respects user's motion preferences

## Testing

### Automated Tests

Run the test suite:

```bash
npm test -- --testPathPattern=VideoHero
```

### Manual Testing

A manual test script is available at:

```bash
node scripts/test-video-hero.js
```

## Error Handling

The component handles various error scenarios:

1. Network failures (video fails to load)
2. Browser compatibility issues (format not supported)
3. Playback restrictions (autoplay blocked by browser)

## Analytics Events

The component tracks the following events:

- `video_play_click`: User clicked to play the video
- `video_playback_started`: Video successfully started playing
- `video_playback_completed`: Video played to completion
- `video_playback_error`: Error occurred during playback
- `video_loading_error`: Error occurred while loading the video
- `video_retry_attempt`: User clicked the retry button after an error

## Interaction Design

- Custom cursor replaces the standard cursor when hovering over the video
- Cursor animates when clicked to provide visual feedback
- Video plays at full opacity without filters for cleaner aesthetics
- Clicking anywhere on the video area starts playback

## Performance Considerations

- Video is lazy-loaded to avoid affecting initial page load time
- Preload is set to "none" to prevent unnecessary network requests
- Multiple video formats provided for cross-browser compatibility
- Connection speed detection for adaptive quality 