'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { trackEvent } from '@/core/analytics';

export interface EventItem {
  id: string;
  title: string;
  date: string;
  previewImage: string;
  videoUrl?: string;
  vimeoId?: string;
  width: number;
  height: number;
  previewVideoSrc?: string;
}

interface SponsorCTA {
  title: string;
  description: string;
  calendlyUrl: string;
  fallbackEmail: string;
}

interface EventsArchiveProps {
  events: EventItem[];
  sponsorCTA: SponsorCTA;
  onOpenCalendly: (title: string, calendlyUrl: string, fallbackEmail: string) => void;
}

/**
 * Events Archive Component
 * Displays a masonry gallery of past events with video previews
 * Implements Neo-Brutalist Minimalism style guide
 */
export default function EventsArchive({ 
  events, 
  sponsorCTA, 
  onOpenCalendly 
}: EventsArchiveProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Sort events by date (newest first)
  const sortedEvents = [...events].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Force animation skip on mount
  useEffect(() => {
    // Skip all animations to fix white screen bug
    document.body.style.opacity = '1';
    document.body.style.animation = 'none';
    document.body.style.transition = 'none';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.style.opacity = '1';
      section.style.transform = 'none';
      section.style.animation = 'none';
      section.style.transition = 'none';
      section.classList.add('visible');
    });
    
    console.log('DEBUG: EventsArchive - Animation skip applied');
  }, []);

  // Play video handler
  const handlePlayClick = (event: EventItem) => {
    setIsLoading(true);
    setSelectedEvent(event);
    setVideoError(false);
    
    // Track event
    trackEvent('event_video_open', {
      event_title: event.title,
      event_date: event.date
    });
    
    // Lock scroll
    document.body.style.overflow = 'hidden';
    
    console.log('DEBUG: Opening video for event', event.id);
    
    // Load Vimeo script if needed
    if (event.vimeoId && !document.querySelector('script[src="https://player.vimeo.com/api/player.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.onload = () => {
        console.log('DEBUG: Vimeo script loaded successfully');
        setIsLoading(false);
      };
      script.onerror = () => {
        console.error('DEBUG: Failed to load Vimeo script');
        setVideoError(true);
        setIsLoading(false);
      };
      document.body.appendChild(script);
    } else {
      setIsLoading(false);
    }
  };
  
  // Close modal handler
  const handleCloseModal = () => {
    setSelectedEvent(null);
    setVideoError(false);
    document.body.style.overflow = '';
  };
  
  // Handle video error
  const handleVideoError = () => {
    setVideoError(true);
    setIsLoading(false);
  };
  
  // Handle CTA click
  const handleCTAClick = () => {
    onOpenCalendly(
      sponsorCTA.title,
      sponsorCTA.calendlyUrl,
      sponsorCTA.fallbackEmail
    );
    
    // Track click
    trackEvent('sponsor_call_booked', {
      cta_origin: 'events_archive'
    });
  };
  
  // Simple escape handler for modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCloseModal();
    }
  };

  return (
    <section 
      id="past-events"
      style={{ 
        backgroundColor: 'black', 
        color: 'white', 
        opacity: 1,
        transform: 'none',
        animation: 'none',
        transition: 'none'
      }} 
      className="py-16 px-6"
    >
      <div className="max-w-[1440px] mx-auto" style={{ backgroundColor: 'black', color: 'white' }}>
        {/* Header */}
        <div className="mb-16 border-b-2 border-white pb-4" style={{ backgroundColor: 'black', color: 'white' }}>
          <h2 className="text-5xl font-light mb-4">Past Events</h2>
          <p className="text-lg max-w-[600px]">
            Explore recordings from our archive of thought-provoking events and discussions.
          </p>
        </div>
        
        {/* Brutal Minimalist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedEvents.map(event => (
            <div 
              key={event.id} 
              className="flex flex-col border-2 border-white mb-8"
              style={{ backgroundColor: 'black', color: 'white' }}
            >
              {/* Video Preview with Play Button */}
              <div 
                className="relative aspect-video cursor-pointer"
                style={{ backgroundColor: 'black' }}
                onClick={() => handlePlayClick(event)}
              >
                {/* Show video preview if available, otherwise fallback image */}
                {event.previewVideoSrc ? (
                  <video
                    src={event.previewVideoSrc}
                    poster={event.previewImage}
                    className="object-cover w-full h-full absolute inset-0"
                    style={{ objectFit: 'cover', backgroundColor: 'black' }}
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <Image 
                    src={event.previewImage}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
                {/* Play Button - solid black overlay, no opacity/transition */}
                <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                  <div className="w-20 h-20 border-4 border-white rounded-full flex items-center justify-center" style={{ backgroundColor: 'black' }}>
                    <span className="text-white text-4xl">▶</span>
                  </div>
                </div>
              </div>
              {/* Event Information */}
              <div className="p-6 flex-grow" style={{ backgroundColor: 'black', color: 'white' }}>
                <p className="text-gray-400 mb-2">{event.date}</p>
                <h3 className="text-2xl font-light mb-0">{event.title}</h3>
              </div>
            </div>
          ))}
        </div>
        
        {/* Sponsor CTA */}
        <div className="mt-16 pt-16 border-t-2 border-white">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex-1">
              <h3 className="text-3xl font-light mb-4">{sponsorCTA.title}</h3>
              <p className="text-lg mb-4">{sponsorCTA.description}</p>
            </div>
            <button 
              onClick={handleCTAClick}
              className="border-2 border-white py-3 px-8 text-lg hover:bg-white hover:text-black"
              style={{ backgroundColor: 'black', color: 'white' }}
            >
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
      
      {/* Video Modal - Brutalist Version */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'black' }}
          onClick={handleCloseModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          ref={modalRef}
        >
          <div 
            className="relative max-w-6xl w-full border-2 border-white"
            style={{ backgroundColor: 'black', color: 'white' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 z-[60] w-12 h-12 flex items-center justify-center text-white text-3xl border-2 border-white bg-black hover:bg-white hover:text-black"
              style={{ backgroundColor: 'black', color: 'white' }}
              onClick={handleCloseModal}
              aria-label="Close video"
            >
              ×
            </button>
            
            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-[70]" style={{ backgroundColor: 'black' }}>
                <div className="w-12 h-12 border-t-2 border-white rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Error State */}
            {videoError ? (
              <div className="p-16 flex flex-col items-center justify-center text-center" style={{ backgroundColor: 'black', color: 'white' }}>
                <p className="text-xl mb-8">Sorry, this video cannot be played.</p>
                <button 
                  className="border-2 border-white py-3 px-8 hover:bg-white hover:text-black"
                  style={{ backgroundColor: 'black', color: 'white' }}
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="relative" style={{ paddingBottom: '56.25%', backgroundColor: 'black' }}>
                {selectedEvent.vimeoId ? (
                  <iframe 
                    src={`https://player.vimeo.com/video/${selectedEvent.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&transparent=0&background=0`}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'black' }}
                    title={selectedEvent.title}
                    onError={handleVideoError}
                  />
                ) : (
                  <video
                    src={selectedEvent.videoUrl}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'black' }}
                    controls
                    autoPlay
                    onError={handleVideoError}
                  />
                )}
              </div>
            )}
            
            {/* Event Info */}
            <div className="p-8" style={{ backgroundColor: 'black', color: 'white' }}>
              <p className="text-gray-400 mb-2">{selectedEvent.date}</p>
              <h3 className="text-3xl font-light">{selectedEvent.title}</h3>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
} 