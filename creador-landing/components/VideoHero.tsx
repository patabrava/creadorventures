'use client';

import { useRef, useState, useEffect } from 'react';
import { useAnimatedVisibility } from '@/hooks/useAnimatedVisibility';
import VideoOverlay from './VideoOverlay';
import VideoError from './VideoError';
import CustomCursor from './CustomCursor';

interface VideoHeroProps {
  previewVideoSrc: string;
  vimeoId: string;
  posterSrc?: string;
}

// Analytics event tracking function (placeholder)
const trackEvent = (eventName: string, eventData: any = {}) => {
  // In a real implementation, this would send data to your analytics service
  console.log(`Analytics Event: ${eventName}`, eventData);
  
  // Example implementation with Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventData);
  }
};

export default function VideoHero({ previewVideoSrc, vimeoId, posterSrc }: VideoHeroProps) {
  const { ref, isVisible } = useAnimatedVisibility<HTMLDivElement>();
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Sorry, there was an error playing the video.');
  const [showCustomCursor, setShowCustomCursor] = useState(false);

  // Start playing the preview video silently in the background
  useEffect(() => {
    const previewVideo = previewVideoRef.current;
    if (!previewVideo) return;
    
    previewVideo.muted = true;
    previewVideo.loop = true;
    previewVideo.playsInline = true;
    
    // Try to play the preview video
    previewVideo.play().catch(error => {
      console.log('Preview autoplay prevented:', error);
      // We don't show errors for preview autoplay restrictions
    });
    
    return () => {
      // Clean up
      if (previewVideo) {
        previewVideo.pause();
      }
    };
  }, []);

  // Handle play button click - load Vimeo player
  const handlePlayClick = () => {
    if (isPlaying) return;
    
    setIsLoading(true);
    trackEvent('video_play_click', { vimeoId });
    
    try {
      // Load Vimeo script if not already loaded
      if (!document.querySelector('script[src="https://player.vimeo.com/api/player.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://player.vimeo.com/api/player.js';
        script.onload = () => {
          setIsPlaying(true);
          setIsLoading(false);
          trackEvent('video_playback_started', { vimeoId });
        };
        script.onerror = () => {
          setIsLoading(false);
          setHasError(true);
          setErrorMessage('Failed to load Vimeo player.');
          trackEvent('video_loading_error', { vimeoId });
        };
        document.body.appendChild(script);
      } else {
        // Script already loaded
        setIsPlaying(true);
        setIsLoading(false);
        trackEvent('video_playback_started', { vimeoId });
      }
    } catch (error) {
      console.error('Error loading Vimeo player:', error);
      setIsLoading(false);
      setHasError(true);
      setErrorMessage('Sorry, there was an error loading the video player.');
      trackEvent('video_loading_error', { vimeoId });
    }
  };

  // Retry loading the Vimeo player
  const handleRetry = () => {
    setHasError(false);
    trackEvent('video_retry_attempt');
    
    setTimeout(() => {
      handlePlayClick();
    }, 100);
  };

  // Mouse enter/leave handlers for cursor
  const handleMouseEnter = () => {
    setShowCustomCursor(true);
  };

  const handleMouseLeave = () => {
    setShowCustomCursor(false);
  };

  return (
    <>
      {/* Custom cursor that follows the mouse */}
      <CustomCursor 
        isVisible={showCustomCursor} 
        onClick={handlePlayClick}
      />
      
      <section 
        id="video-hero"
        ref={ref}
        className={`${isVisible ? 'visible' : ''}`}
        style={{
          padding: 0,
          margin: 0,
          width: '100%',
          height: '80vh',
          position: 'relative',
          backgroundColor: 'var(--ink)',
          color: 'var(--paper)',
          overflow: 'hidden',
          cursor: showCustomCursor ? 'none' : 'auto' // Hide default cursor when custom cursor is visible
        }}
        data-custom-cursor={showCustomCursor ? "true" : "false"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Preview video - always plays silently in the background */}
        {!isPlaying && (
          <video 
            ref={previewVideoRef}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.5,
              transition: 'opacity var(--transition-medium)'
            }}
            poster={posterSrc}
            preload="auto"
            muted
            playsInline
            loop
          >
            <source src={previewVideoSrc} type="video/mp4" />
          </video>
        )}

        {/* Vimeo player - shown after clicking play */}
        {isPlaying && (
          <div 
            style={{
              padding: '56.25% 0 0 0',
              position: 'relative',
              width: '100%',
              height: '100%'
            }}
          >
            <iframe 
              src={`https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1`}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }}
              title="Creador Ventures Video"
            />
          </div>
        )}

        {/* Video overlay with play button - hidden when custom cursor is active */}
        {!isPlaying && !showCustomCursor && (
          <VideoOverlay 
            isPlaying={isPlaying} 
            isLoading={isLoading} 
            onPlayClick={handlePlayClick} 
          />
        )}

        {/* Error message */}
        {hasError && (
          <VideoError
            onRetry={handleRetry}
            message={errorMessage}
          />
        )}
      </section>
    </>
  );
} 