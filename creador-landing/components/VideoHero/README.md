# VideoHero Component

A full-width video hero section with a play button overlay, designed following the neo-brutalist minimalist style guide.

## Features

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
  videoSrc="/path/to/video.mp4" 
  posterSrc="/path/to/poster.jpg" 
/>
```

## Component Structure

The VideoHero component is composed of several sub-components:

- **VideoHero**: Main container component
- **VideoPlayer**: Handles video playback
- **VideoOverlay**: Displays the "Play reel" text and play button
- **VideoError**: Shows error messages when video fails to load/play

## Props

### VideoHero

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| videoSrc | string | Yes | Path to the video file (MP4 format) |
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

- `video_play_click`: User clicked the play button
- `video_playback_started`: Video successfully started playing
- `video_playback_completed`: Video played to completion
- `video_playback_error`: Error occurred during playback
- `video_loading_error`: Error occurred while loading the video
- `video_retry_attempt`: User clicked the retry button after an error

## Performance Considerations

- Video is lazy-loaded to avoid affecting initial page load time
- Preload is set to "none" to prevent unnecessary network requests
- Multiple video formats provided for cross-browser compatibility
- Connection speed detection for adaptive quality 