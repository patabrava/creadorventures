'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { trackEvent } from '@/core/analytics';
import CustomCursor from '@/components/CustomCursor';

export interface EventItem {
  id: string;
  title: string;
  date: string;
  previewImage: string;
  videoUrl?: string;
  vimeoId?: string;
  width: number;
  height: number;
  previewVideoSrc?: string; // Added for video preview
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
  // Static refs
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previewVideosRef = useRef<{[key: string]: HTMLVideoElement | null}>({});
  const [showCustomCursors, setShowCustomCursors] = useState<{[key: string]: boolean}>({});
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  // Calculate layout columns based on screen width
  const galleryRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(3);
  
  // Recalculate columns on resize
  useEffect(() => {
    const calculateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) return 1;
      if (width < 1024) return 2;
      return 3;
    };
    
    const handleResize = () => {
      const newColumns = calculateColumns();
      if (newColumns !== columns) {
        setColumns(newColumns);
      }
    };
    
    // Initial calculation
    setColumns(calculateColumns());
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [columns]);
  
  // Sort events by date (newest first)
  const sortedEvents = [...events].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Initialize preview videos
  useEffect(() => {
    // Initialize muted preview videos for events with vimeoId/videoUrl
    sortedEvents.forEach(event => {
      if ((event.videoUrl || event.vimeoId) && event.previewVideoSrc) {
        const videoElement = previewVideosRef.current[event.id];
        if (videoElement) {
          videoElement.muted = true;
          videoElement.loop = true;
          videoElement.playsInline = true;
          
          // Try to autoplay the preview
          videoElement.play().catch(error => {
            console.log(`Preview autoplay prevented for ${event.id}:`, error);
            // We don't show errors for preview autoplay restrictions
          });
        }
      }
    });
    
    // Cleanup on unmount
    return () => {
      sortedEvents.forEach(event => {
        const videoElement = previewVideosRef.current[event.id];
        if (videoElement) {
          videoElement.pause();
        }
      });
    };
  }, [sortedEvents]);

  // Handle opening video modal
  const openModal = (event: EventItem) => {
    setIsLoading(true);
    setSelectedEvent(event);
    setVideoError(false);
    setIsPlaying(true);
    
    // Track event view
    trackEvent('event_video_open', {
      event_title: event.title,
      event_date: event.date
    });
    
    // Lock scroll
    document.body.style.overflow = 'hidden';
    
    // Load Vimeo script if needed and not already loaded
    if (event.vimeoId && !document.querySelector('script[src="https://player.vimeo.com/api/player.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.onload = () => {
        console.log('Vimeo player script loaded successfully');
        setIsLoading(false);
        trackEvent('event_video_opened', { vimeoId: event.vimeoId });
      };
      script.onerror = () => {
        setVideoError(true);
        setIsLoading(false);
        console.error('Failed to load Vimeo player script');
        trackEvent('event_video_error', { vimeoId: event.vimeoId });
      };
      document.body.appendChild(script);
    } else {
      // Script already loaded or not needed
      setIsLoading(false);
      if (event.vimeoId) {
        trackEvent('event_video_opened', { vimeoId: event.vimeoId });
      }
    }
  };
  
  // Handle closing video modal
  const closeModal = () => {
    setSelectedEvent(null);
    setVideoError(false);
    setIsPlaying(false);
    
    // Release scroll lock
    document.body.style.overflow = '';
    
    // Pause video if playing
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };
  
  // Handle video error
  const handleVideoError = () => {
    setVideoError(true);
    setIsLoading(false);
    console.error(`Video failed to load: ${selectedEvent?.videoUrl}`);
    
    // Track error
    if (selectedEvent) {
      trackEvent('event_video_error', {
        event_title: selectedEvent.title,
        event_date: selectedEvent.date
      });
    }
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
  
  // Handle keyboard events for modal
  useEffect(() => {
    if (!selectedEvent) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEvent]);
  
  // Focus trap for modal
  useEffect(() => {
    if (!selectedEvent || !modalRef.current) return;
    
    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    // Focus first element when modal opens
    firstElement.focus();
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      // If shift+tab on first element, move to last
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } 
      // If tab on last element, cycle to first
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };
    
    window.addEventListener('keydown', handleTabKey);
    return () => window.removeEventListener('keydown', handleTabKey);
  }, [selectedEvent]);

  // Mouse enter/leave handlers for custom cursor
  const handleMouseEnter = (eventId: string) => {
    setShowCustomCursors(prev => ({
      ...prev,
      [eventId]: true
    }));
  };

  const handleMouseLeave = (eventId: string) => {
    setShowCustomCursors(prev => ({
      ...prev,
      [eventId]: false
    }));
  };

  // Handle play click
  const handlePlayClick = (event: EventItem) => {
    openModal(event);
  };

  // Arrange events into grid layout based on column count
  const createGrid = () => {
    const grid = Array.from({ length: columns }, () => [] as EventItem[]);
    
    // Insert sponsor card in first or second position for visibility
    const sponsorCard: EventItem = {
      id: 'sponsor-cta',
      title: sponsorCTA.title,
      date: '',
      previewImage: '',
      width: 1,
      height: 1
    };
    
    // Add sponsor card to middle column (or first if only one column)
    const sponsorColumn = Math.min(1, columns - 1);
    grid[sponsorColumn].push(sponsorCard);
    
    // Distribute remaining events across columns
    let columnIndex = 0;
    sortedEvents.forEach(event => {
      grid[columnIndex].push(event);
      columnIndex = (columnIndex + 1) % columns;
    });
    
    return grid;
  };
  
  const eventGrid = createGrid();
  
  // Main component styles to ensure visibility
  const visibleStyle = {
    opacity: 1,
    transform: 'none',
    visibility: 'visible' as const,
    color: 'var(--paper)',
    backgroundColor: 'var(--ink)'
  };
  
  return (
    <section 
      ref={sectionRef} 
      className="pt-6 pb-24 px-6 bg-ink text-paper"
      id="past-events"
      style={{
        opacity: 1,
        transform: 'none',
        visibility: 'visible',
        backgroundColor: 'var(--ink)',
        color: 'var(--paper)'
      }}
    >
      <div 
        className="container mx-auto max-w-[1440px]"
        style={visibleStyle}
      >
        <div 
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-paper pb-4"
          style={{ ...visibleStyle, borderColor: 'var(--paper)' }}
        >
          <div style={visibleStyle}>
            <h2 
              className="text-[48px] font-light leading-tight mb-4 text-paper"
              style={{ ...visibleStyle, color: 'var(--paper)' }}
            >Past Events</h2>
            <p 
              className="text-[18px] leading-[28px] max-w-[600px] text-paper"
              style={{ ...visibleStyle, color: 'var(--paper)' }}
            >
              Explore recordings from our archive of thought-provoking events and discussions.
            </p>
          </div>
        </div>
        
        {/* Event Gallery */}
        <div 
          ref={galleryRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
          style={visibleStyle}
        >
          {eventGrid.flat().map(item => 
            item.id === 'sponsor-cta' ? (
              // Sponsor CTA Card
              <div 
                key="sponsor-cta"
                className="relative bg-ink text-paper p-12 cursor-pointer transition-transform hover:translate-y-[-8px] hover:shadow-lg"
                onClick={handleCTAClick}
                style={{ 
                  ...visibleStyle
                }}
              >
                <h3 
                  className="text-[32px] font-light mb-6 text-paper"
                  style={{ ...visibleStyle, color: 'var(--paper)' }}
                >
                  {sponsorCTA.title}
                </h3>
                <p 
                  className="text-[18px] mb-8 text-paper"
                  style={{ ...visibleStyle, color: 'var(--paper)' }}
                >
                  {sponsorCTA.description}
                </p>
                <button 
                  className="bg-paper text-ink px-8 py-3 rounded-full inline-flex items-center"
                  style={{ 
                    ...visibleStyle, 
                    backgroundColor: 'var(--paper)', 
                    color: 'var(--ink)' 
                  }}
                >
                  <span 
                    className="mr-2"
                    style={{ color: 'var(--ink)' }}
                  >→</span>
                  Book a call
                </button>
              </div>
            ) : (
              // Event Card
              <div 
                key={item.id}
                className="group relative flex flex-col overflow-hidden transition-all duration-500 hover:translate-y-[-8px] hover:shadow-lg"
                style={{ 
                  ...visibleStyle,
                  cursor: showCustomCursors[item.id] ? 'none' : 'pointer'
                }}
                onMouseEnter={() => (item.videoUrl || item.vimeoId) ? handleMouseEnter(item.id) : null}
                onMouseLeave={() => (item.videoUrl || item.vimeoId) ? handleMouseLeave(item.id) : null}
                onClick={() => (item.videoUrl || item.vimeoId) && !showCustomCursors[item.id] ? handlePlayClick(item) : null}
              >
                {/* Custom cursor that follows the mouse */}
                {(item.videoUrl || item.vimeoId) && (
                  <CustomCursor 
                    isVisible={showCustomCursors[item.id] || false} 
                    onClick={() => handlePlayClick(item)}
                  />
                )}
                
                {/* Event Media Preview */}
                <div 
                  className="aspect-[16/9] relative overflow-hidden bg-ink"
                  style={{ ...visibleStyle, backgroundColor: 'var(--ink)' }}
                >
                  {/* Preview Video - silent autoplay when available */}
                  {(item.videoUrl || item.vimeoId) && item.previewVideoSrc ? (
                    <video 
                      ref={(el) => {
                        previewVideosRef.current[item.id] = el;
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 1,
                        transition: 'opacity var(--transition-medium)'
                      }}
                      poster={item.previewImage}
                      preload="auto"
                      muted
                      playsInline
                      loop
                    >
                      <source src={item.previewVideoSrc} type="video/mp4" />
                    </video>
                  ) : (
                    <Image 
                      src={item.previewImage}
                      alt={`${item.title} preview`}
                      className="object-cover w-full h-full"
                      style={visibleStyle}
                      fill
                      sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw`}
                      priority={false}
                    />
                  )}
                  
                  {/* Play button overlay - only show when custom cursor is not active */}
                  {(item.videoUrl || item.vimeoId) && !showCustomCursors[item.id] && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-ink bg-opacity-40"
                      style={{
                        ...visibleStyle,
                        backgroundColor: 'var(--ink)',
                        opacity: 0.4
                      }}
                    >
                      <div 
                        className="w-16 h-16 border border-paper rounded-full flex items-center justify-center bg-ink bg-opacity-70"
                        style={{ 
                          ...visibleStyle,
                          borderColor: 'var(--paper)',
                          backgroundColor: 'var(--ink)',
                          opacity: 0.7
                        }}
                      >
                        <span 
                          className="text-paper text-xl"
                          style={{ ...visibleStyle, color: 'var(--paper)' }}
                        >▶</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Event Info */}
                <div 
                  className="p-8 bg-ink flex-grow"
                  style={{ ...visibleStyle, backgroundColor: 'var(--ink)' }}
                >
                  <div 
                    className="text-graphite-40 text-[16px] mb-2"
                    style={visibleStyle}
                  >{item.date}</div>
                  <h3 
                    className="text-[28px] font-light mb-0 text-paper" 
                    style={{ ...visibleStyle, color: 'var(--paper)' }}
                  >{item.title}</h3>
                </div>
              </div>
            )
          )}  
        </div>
      </div>
      
      {/* Video Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-[9999] flex items-center justify-center p-4"
          onClick={closeModal}
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 9999,
            overflow: 'hidden'
          }}
        >
          <div 
            ref={modalRef}
            className="relative bg-black max-w-6xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              ...visibleStyle, 
              backgroundColor: 'black',
              position: 'relative',
              zIndex: 10000
            }}
          >
            <button 
              className="absolute top-4 right-4 z-[10001] w-12 h-12 flex items-center justify-center text-paper text-[24px] border border-paper rounded-full hover:bg-paper hover:text-ink transition-colors"
              onClick={closeModal}
              aria-label="Close video"
              style={{ 
                ...visibleStyle, 
                color: 'var(--paper)', 
                borderColor: 'var(--paper)',
                zIndex: 10001,
                position: 'absolute'
              }}
            >
              ×
            </button>
            
            {/* Loading state */}
            {isLoading && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-ink bg-opacity-90 z-[10002]"
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 10002,
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div className="loader"></div>
              </div>
            )}
            
            {videoError ? (
              <div 
                className="flex flex-col items-center justify-center p-16 text-center"
                style={visibleStyle}
              >
                <p 
                  className="text-paper text-[18px] mb-8" 
                  style={{ ...visibleStyle, color: 'var(--paper)' }}
                >Sorry, this video cannot be played.</p>
                <button 
                  className="bg-paper text-ink px-8 py-3 rounded-full"
                  onClick={closeModal}
                  style={{ 
                    ...visibleStyle, 
                    backgroundColor: 'var(--paper)', 
                    color: 'var(--ink)' 
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <div 
                className="w-full relative overflow-hidden"
                style={{ 
                  paddingBottom: '56.25%',
                  backgroundColor: 'black',
                  position: 'relative',
                  width: '100%',
                  overflow: 'hidden'
                }}
              >
                {selectedEvent.vimeoId ? (
                  <iframe 
                    src={`https://player.vimeo.com/video/${selectedEvent.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&transparent=0&background=0`}
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                    style={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      zIndex: 10000
                    }} 
                    title={selectedEvent.title}
                  />
                ) : (
                  <video
                    ref={videoRef}
                    src={selectedEvent.videoUrl}
                    style={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain', 
                      zIndex: 10000
                    }}
                    controls={true}
                    autoPlay={true}
                    onError={handleVideoError}
                  />
                )}
              </div>
            )}
            
            <div 
              className="p-8 bg-black"
              style={{ ...visibleStyle, backgroundColor: 'black' }}
            >
              <div 
                className="text-graphite-40 text-[16px] mb-2" 
                style={visibleStyle}
              >{selectedEvent.date}</div>
              <h3 
                className="text-[36px] font-light text-paper" 
                style={{ ...visibleStyle, color: 'var(--paper)' }}
              >{selectedEvent.title}</h3>
            </div>
          </div>
        </div>
      )}

      {/* CSS for loader */}
      <style jsx>{`
        .loader {
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 4px solid var(--paper);
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
} 